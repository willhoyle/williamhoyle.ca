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