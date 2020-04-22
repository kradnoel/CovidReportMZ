// Require dependencies
const config = require('./app/config')
const routes = require('./app/routes')
const {SendSmsToSubscribedUsers} = require('./app/parse')
const logger = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
const cron = require('node-cron')

// Create an Express application
const app = express()

// Configuring engine
app.engine('html', require('ejs').renderFile);

// Load middlewares
app.use(logger(config.LOGGER))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(routes)

// Send sms to subscribed users daily
cron.schedule('00 08 * * *', () => {
	SendSmsToSubscribedUsers()
},{
	"schedule": true,
	"timezone": "Africa/Harare"
})

module.exports = app
