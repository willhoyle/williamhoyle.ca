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