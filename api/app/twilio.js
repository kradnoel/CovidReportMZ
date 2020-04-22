// require dependencies
const config = require('./config')
const lang = require('./lang')
const twilio = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)


///////////////////////////////////////////////////////////////////////////////
// TWILIO HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

const SendSMS = (sento_to, message) => {
	return twilio.api.messages
		.create({
			body: message,
			to: sento_to,
			from: config.TWILIO_NUMBER
		}).then((r) => {
			var message = `${lang.PT.SMS_SEND_SUCCESS} ${sento_to}`
			return message
		}).catch((e) => {
			var message = `${lang.PT.SMS_SEND_FAILURE} ${sento_to}`
			return message
		})
}

module.exports = {
	SendSMS
}
