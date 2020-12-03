const csv = require('csv-parser')
const fs = require('fs')
const fsPromises = fs.promises
const results = [];

const { DateTime } = require('luxon')

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

const run = async () => {
    fs.createReadStream('/home/will/Downloads/elevate_activities_export.2020.11.22-21.08.30.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        let data = {
            runs: processRuns(results),
            workouts: processWorkouts(results),

            
        }
        await fsPromises.writeFile("./static/workout-training-log.json", JSON.stringify(data))
    })
}

run()