// Require dependencies
const dotenv = require('dotenv')
const config = {}
//const compression = {}
//const bodyParse = {}
//const hemlet = {}
const servue = {}
const parser = {}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    dotenv.config({path: '.env'})
} else {
    dotenv.config({path: '.env.example', silent: true })
}

// Compression Options
//compression.level = process.env.COMPRESSION_LEVEL

// BodyParse Options

// Hemlet Options

// Servue Variables
servue.MODE = process.env.SERVUE_MODE

// App Variables
config.PORT = process.env.PORT || 3000
config.COVID19MZ = process.env.COVID19MZ
config.LOGGER = process.env.LOGGER
//config.COMPRESSION = compression
//config.BODYPARSE = bodyParse
//config.HEMLET = hemlet
config.SERVUE = servue

// Twilio Variables
config.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
config.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
config.TWILIO_NUMBER = process.env.TWILIO_NUMBER

// Parser Variables config
parser.APP_ID = process.env.PARSE_APP_ID
parser.JS_KEY = process.env.PARSE_JS_KEY
parser.SERVER_URL = process.env.PARSE_SERVER_URL

config.PARSER = parser

const requiredConfig = [
    config.LOGGER,
    config.COVID19MZ,
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_AUTH_TOKEN,
    config.TWILIO_NUMBER
]

var isConfigured = requiredConfig.every(function(value) {
    return value || false
})

if (!isConfigured) {
    const errorMessage = 'LOGGER, COVID19MZ, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER must be set.'
    throw new Error(errorMessage)
}

module.exports = config
