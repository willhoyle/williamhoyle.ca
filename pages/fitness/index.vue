<template lang="pug">
div
  .text-4xl.text-gray-800.leading-none fitness
    .text-lg.text-gray-600 tracking my fitness goals and progress
  .flex.flex-wrap
    .w-full
    .w-full
      .grid.grid-cols-9.text-gray-500
        .col-span-9.mb-1.stick-bar-1
          hr.stick
        .col-span-2.stick

        template(v-if='dense')
          .text-center.stick M
          .text-center.stick Tu
          .text-center.stick W
          .text-center.stick Thu
          .text-center.stick F
          .text-center.stick Sat
          .text-center.stick Sun
        template(v-else)
          .text-center.stick Monday
          .text-center.stick Tuesday
          .text-center.stick Wednesday
          .text-center.stick Thursday
          .text-center.stick Friday
          .text-center.stick Saturday
          .text-center.stick Sunday

        .col-span-9.mt-1.mb-1.stick-bar-2
          hr

        template(v-for='week in weeks')
          template(v-if='week.year')
            .col-span-9.stick-year
              | {{ week.year }}
            .col-span-9.mt-1.mb-3.stick-year-bar-2
              hr
          .col-span-2.h-48.leading-none(v-if='!dense')
            .text-black.font-black.text-lg {{ week.label }}
            .mt-8.text-gray-500.text-sm Total Distance
            .mt-1.text-lg.font-bold.text-black
              span {{ week.totalDistance | km }}
              span.ml-2 km
          .col-span-2.h-2(v-else)
          template(v-for='day in week.week')
            template(v-if='day')
              .bg-green-300(:style='styles(day.totalDistance)')
            template(v-else)
              .flex

    .w-full
      hr
</template>

<script>
import axios from 'axios'
import { DateTime, Duration, Interval } from 'luxon'

export default {
  data() {
    return {
      weeks: [],
      dense: false,
    }
  },
  computed: {
    max() {
      let max = 0
      this.weeks.forEach((week) => {
        week.week
          .filter((d) => d)
          .forEach((day) => {
            day.runs.forEach((run) => {
              max = Math.max(run.distanceM, max)
            })
          })
      })
      return max
    },
  },
  methods: {
    scale(num) {
      let scale = (num / this.max) * 100
      if (this.dense) {
        return scale * 2
      }
      return scale
    },
    styles(num) {
      let scale = this.scale(num)
      if (scale > 100) {
        scale = 100
      }
      return {
        width: `100%`,
        height: `${scale}%`,
      }
    },
  },
  filters: {
    label(interval) {
      if (this.dense) {
        return `${interval.start.toFormat('MMM dd')} - ${interval.end.toFormat(
          'MMM dd'
        )}`
      } else {
        return `${interval.start.toFormat('MMM dd')} - ${interval.end.toFormat(
          'MMM dd'
        )}`
      }
    },
    km(meters) {
      if (!meters) {
        return 0
      }
      //   return Math.round(meters / 10) / 100
      return Math.round(meters / 1000)
    },
  },
  async beforeMount() {
    let {
      data: { runs },
    } = await axios.get('/workout-training-log.json')
    /**
     * I want to split the runs into weekly arrays for the ui
     *
     * 1. first find the date of the first workout and move back to a monday
     *
     * 2. then find today's date, move it to a sunday
     *
     * 3. now I get a nice interval for all my workouts from monday to sunday
     *
     * ill transform the runs array (which are sorted from old to new)
     * into a nice little structure that my UI will eat up:
     *
     * weeks: [
     *  {
     *      label: "Nov 23 - Nov 29",
     *      totalDistance: 10000, // in meters
     *      week: [
     *          // all 7 days
     *          {
     *              totalDistance: 10000, // in meters
     *              runs: [run1, run2]
     *          },
     *          etc... for the other 6 days of the week
     *      ]
     *  }
     * ]
     */
    let firstDate = DateTime.fromISO(runs[0].startDate).set({
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    let lastDate = DateTime.local().set({
      weekday: 7,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    })
    let interval = Interval.fromDateTimes(firstDate, lastDate)

    let weekIntervals = interval.splitBy(Duration.fromObject({ weeks: 1 }))

    let runIdx = 0
    let weeks = weekIntervals.map((interval) => {
      let week = new Array(7),
        totalDistance = 0

      let loop = true
      while (loop && runIdx < runs.length) {
        const run = runs[runIdx++]
        let startDate = DateTime.fromISO(run.startDate)
        if (interval.contains(startDate)) {
          let weekday = startDate.weekday
          if (week[weekday - 1]) {
            week[weekday - 1].runs.push({
              ...run,
              startDate, // overwrite this so we can use DateTime in the template
            })
            week[weekday - 1].totalDistance += run.distanceM || 0
          } else {
            week[weekday - 1] = {
              totalDistance: run.distanceM || 0,
              runs: [
                {
                  ...run,
                  startDate, // overwrite this so we can use DateTime in the template
                },
              ],
            }
          }

          totalDistance += run.distanceM || 0
        } else {
          loop = false
        }
      }
      return {
        totalDistance, // in meters
        week,
        interval,
      }
    })
    weeks.reverse()

    let year = weeks[0].interval.end.year
    weeks = weeks.map((week) => {
      if (week.interval.end.year == year) {
        week.year = year
        year--
        return week
      }
      console.log(week.totalDistance)
      return week
    })
    console.log(weeks.length)
    this.weeks = weeks
  },
}
</script>


<style>
.stick {
  position: sticky;
  top: 10px;
}
.stick-bar-1 {
  position: sticky;
  top: 5px;
}
.stick-bar-2 {
  position: sticky;
  top: 37px;
}
</style>