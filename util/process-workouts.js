const csv = require('csv-parser')
const fs = require('fs')
const fsPromises = fs.promises
const results = [];

const axios = require('axios');

const config = require('../config.js')

const { DateTime } = require('luxon')

let strava = require('strava-v3');

const parseNumber = (num) => {
    if (num == "0")
    return Number(num)
}

const processRuns = data => {
    return data.filter(item => {
        return item.Type == 'Run'
    }).map(run => {
        return {
            date: run.Date,
            movingTime: run["Moving Time"],
            distanceKm: parseNumber(run["Distance (km)"]),
            averagePacePerKm: run["Avg Pace (/km)"],
        }
    })
}

const processWorkouts = data => {
    return data.filter(item => {
        return item.Type == 'Workout'
    }).map(workout => {
        return {}
    })
}
const processWalks = data => {
    return data.filter(item => {
        return item.Type == 'Walk'
    }).map(walk => {
        return {}
    })
}

const fetchRunsFromStrava = async () => {
    let continueFetching = true, runs = [], 
    page = 1, per_page = 100, access_token = config.get('strava.personal_access_token'), before = (new Date()).valueOf()
    while (continueFetching) {

        let opts = { 
            before, // {Integer} An epoch timestamp to use for filtering activities that have taken place before a certain time.
            
            page, // {Integer} Page number. Defaults to 1.
            per_page, // {Integer} Number of items per page. Defaults to 30.,
            access_token
        };
        try {
            let data = await strava.athlete.listActivities(opts)
            data.filter(activity => activity.type == "Run").forEach(run => {
                runs.push({
                    kudosCount: run.kudos_count, 
                    distanceM: run.distance, // meters
                    movingTime: run.moving_time,
                    startDate: DateTime.fromISO(run.start_date),
                    averageHeartrate: run.average_heartrate,
                    maxHeartrate: run.max_heartrate
                })   
            })
            if (data.length == 0) {
                continueFetching = false
            } else {
                page++
            }
        } catch (e) {
            console.log(e);
        }

    }
    return runs
}
    
    
const run = async () => {
    let runs = await fetchRunsFromStrava()
    runs.sort((a, b) => {
        return a.startDate.valueOf() - b.startDate.valueOf()
    })
    let data = {
        runs,
    }
    await fsPromises.writeFile("./static/workout-training-log.json", JSON.stringify(data))
}

run()