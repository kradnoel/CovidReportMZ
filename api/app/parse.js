// Required dependencies

const config = require('./config')
const lang = require('./lang')
const {fetchMozambicanPhoneNumber, composeAsync} = require('./helpers')
const Parse = require('parse/node')

Parse.initialize(config.PARSER.APP_ID, config.PARSER.JS_KEY)
Parse.serverURL = config.PARSER.SERVER_URL

const Subscriber = Parse.Object.extend("Subscriber")
const Log = Parse.Object.extend("Log")

///////////////////////////////////////////////////////////////////////////////
// PARSE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 _ Check if the contact is already registered on the platform
 _ and returns Object with value {null or id} and contact {Phone Number}
**/
const isUserSubscribed = async (contact) => {
  var Subscriber = Parse.Object.extend("Subscriber")
  var number = fetchMozambicanPhoneNumber(contact)
  var query = new Parse.Query(Subscriber)

  return query.equalTo('contact', number.value).first().then((r) => {
    var message = {}
    message.contact = number

    if(r === undefined) {
      message.value = null
    }else{
      message.value = `${r.id}`
    }
    return message
  })
}

/**
 _ Subscribe the user
 _ and returns message (with or without error)
**/
const subscribeUser = async (value) => {
  var message = ''
  var values = await value

  console.log(values)

  if(values.value == null) {

    if(values.contact.state == true) {
      var subscriber = new Subscriber()
      var log = new Log()

      subscriber.set('contact', values.contact.value)
      subscriber.save()

      log.set('message', `${values.contact.value} ${lang.PT.SUBSCRIBED_SUCESS}`)
      log.set('error', false)
      log.save()

      message = {
        "error": false,
        "message": `${values.contact.value} ${lang.PT.SUBSCRIBED_SUCESS}`
      }
    } else {
      message = {
        "error": true,
        "message": `${values.contact.value} ${lang.PT.SUBSCRIBED_FAILURE}`
      }
    }
  }else{
    message = {
      "error": true,
      "message": `${lang.PT.ALREADY_SUBSCRIBED}`
    }
  }

  return message
}

/**
 _ Unsubscribe the user
 _ and returns message (with or without error)
**/
const unsubscribeUser = async (value) => {
  var message = ''
  var values = await value

  if(values.value != null) {
    var log = new Log()
    var query = new Parse.Query(Subscriber)

    var subscriber = await query.equalTo('objectId', values.value).first()
    subscriber.destroy()

    log.set('message', `${values.contact.value} ${lang.PT.UNSUBSCRIBED_SUCESS}`)
    log.set('error', false)
    log.save()

    message = {
      "error": false,
      "message": `${values.contact.value} ${lang.PT.UNSUBSCRIBED_SUCESS}`
    }

  }else{
    message = {
      "error": true,
      "message": `${lang.PT.NOT_SUBSCRIBED}`
    }
  }

  return message

}

/**
 _ Subscribe the user
 _ and returns message (with or without error)
**/
const SubscribeUser = (contact) => {
  return composeAsync(subscribeUser, isUserSubscribed)(contact)
}

/**
 _ Unsubscribe the user
 _ and returns message (with or without error)
**/
const UnSubscribeUser = (contact) => {
  return composeAsync(unsubscribeUser, isUserSubscribed)(contact)
}


module.exports = { SubscribeUser, UnSubscribeUser }
