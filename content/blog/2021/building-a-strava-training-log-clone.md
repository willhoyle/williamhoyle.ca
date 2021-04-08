---
title: building a Strava training log clone for my runs
---
# building a Strava training log clone for my runs
[[date]]



I logged in to Strava one day to find that the Training Log page is now only available to paying users. I've had notions of building a dashboard for my fitness program for a while now so this seems like a good place to start.

For reference, here is the page I want to recreate:

![Image of Strava Training Log](/strava-training-log.png)

It's funny. When I started this project, the page above was hidden behind a paywall. Now it's been a couple months since I've worked on this project. They replaced it with the following (free) page:

![New Strava Training Log](/strava-new-log.png)

I think this is a pretty nice way of visualizing the training log. I'll still go ahead and finish this project since I'm pretty much already done.

## Step 1: Strava Tokens

The first step is to head over to [the strava api page](https://www.strava.com/settings/api) and register your app. It should look similar to this when you're done: 

![Strava API Page](/strava-api-page.png)

## Step 2: Generate a Strava Code and Personal Access Token

To get these examples working, you need to install the following dependencies:

```shell
npm install express axios convict strava-v3 opener dotenv
```

I wrote the following script to generate the tokens we need to query the API.

```js
const express = require('express');
const axios = require('axios');

const config = require('../config.js');

let app = express()

let server

app.get("/", async function (req, res) {
    
    let params = req.query
    let code = params.code
    let data = await axios.post(`https://www.strava.com/oauth/token?client_id=${config.get('strava.client_id')}&client_secret=${config.get('strava.client_secret')}&code=${code}&grant_type=authorization_code`)
    console.log(`\nSTRAVA_CODE=${code}\nSTRAVA_PERSONAL_ACCESS_TOKEN=${data.data.access_token}\n`)

    server.close()
})




const go = async () => {
    server = app.listen({port: 3001})
    var strava = require('strava-v3');
    try {
        let url = strava.oauth.getRequestAccessURL({scope:"activity:write,profile:write,read_all,profile:read_all,activity:read_all"
        })
        require('opener')(url)
    } catch(e) {
        console.log(e);
    }
}

go()
```
The config file:
```js
var convict = require('convict');

const path = require('path');
const results = require('dotenv').config({
    path: path.resolve(__dirname, ".env")
})

// Define a schema
var config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
      },
    strava: {

        access_token: {
              format: String,
              default: '',
        env: 'STRAVA_ACCESS_TOKEN'
    },
    client_id: {
        format: String,
        default: '',
        env: 'STRAVA_CLIENT_ID'
    },
    client_secret: {
        format: String,
        default: '',
        env: 'STRAVA_CLIENT_SECRET'
    },
    refresh_token: {
        format: String,
        default: '',
        env: 'STRAVA_REFRESH_TOKEN'
    },
    redirect_uri: {
        format: String,
        default: '',
        env: 'STRAVA_REDIRECT_URI'
    },
    code: {
        format: String,
        default: '',
        env: 'STRAVA_CODE'
    },
    personal_access_token: {
        format: String,
        default: '',
        env: 'STRAVA_PERSONAL_ACCESS_TOKEN'
    }
}
});


// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;    
```
You will also need to create a `.env` file that looks similar to this. Fill in the values (except for the last two which we'll generate soon) from the API page of `Step 1`.
```shell
STRAVA_ACCESS_TOKEN=
STRAVA_REFRESH_TOKEN=
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REDIRECT_URI=http://localhost:3001
STRAVA_CODE=
STRAVA_PERSONAL_ACCESS_TOKEN=
```

Once you run the script, it will open a new tab in your default browser and ask you if you want to authorize access to your Strava data. Once you accept, check your terminal for the `STRAVA_CODE` and `STRAVA_PERSONAL_ACCESS_TOKEN`. Paste them into your `.env` file.

## Step 3: Query the API for your data!

This step all depends on your specific needs. In my case, I want to query the API for all my runs logged in Strava.

The top level function looks like this:
```js
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
```

I fetch the runs, sort them and write the structure to my static folder (since I'll be serving it to this website).

Here is `fetchRunsFromStrava()`:

```js
const fetchRunsFromStrava = async () => {
    let continueFetching = true, 
        runs = [], 
        page = 1, 
        per_page = 100, 
        access_token = config.get('strava.personal_access_token'), 
        before = (new Date()).valueOf()

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
```

In the interest of completion, you can see the actual files here: [https://github.com/willhoyle/williamhoyle.ca/tree/master/util](https://github.com/willhoyle/williamhoyle.ca/tree/master/util).

Again, everyone will have different use-cases here. In my case, I just query all the runs and process the data into my own format but the possibilities are endless.

## Step 4: Final Result

Head over to my page [fitness page here](/fitness). 

I use `workout-training-log.json` generated earlier and create a simple interface to display my training log. 

## Closing thoughts
It was fun to experiment with a different charting library too. I used [Charts.css](chartscss.org) which is a pure-css solution for charts. This is exactly why I started this personal blog in the first place, to experiment with new ideas and work with different libraries and languages outside my comfort zone.

Working on this has also motivated me to ramp up my running again - the charts are looking a little sparse. I've been rowing throughout the winter but now that the weather is nicer, it's time to get back to my old mileage!