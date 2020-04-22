// Require dependencies
const _ = require('lodash')
const axios = require('axios')
const cheerio = require('cheerio')
const PhoneNumber = require('awesome-phonenumber')
const lang = require('./lang')

///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 _ Enforces the scheme of the URL is https
 _ and returns the new URL
**/
const enforceHttpsUrl = (url) =>
  _.isString(url) ? url.replace(/^(https?:)?\/\//, "https://") : null

/**
 _ Strips number of all non-numeric characters
 _ and returns the sanitized number
**/
const sanitizeNumber = (number) =>
  _.isString(number)
    ? number.replace(/[^0-9-.]/g, "")
    : _.isNumber(number) ? number : null

/**
 _ Filters null values from array
 _ and returns an array without nulls
**/
const withoutNulls = (arr) =>
  _.isArray(arr) ? arr.filter(val => !_.isNull(val)) : _[_]

/**
 _ Compose function arguments starting from right to left
 _ to an overall function and returns the overall function
**/
const compose = (...fns) => (arg) => {
  return _.flattenDeep(fns).reduceRight((current, fn) => {
    if (_.isFunction(fn)) return fn(current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg)
}

/**
 _ Compose async function arguments starting from right to left
 _ to an overall async function and returns the overall async function
**/
const composeAsync = (...fns) => arg => {
  return _.flattenDeep(fns).reduceRight(async (current, fn) => {
    if (_.isFunction(fn)) return fn(await current)
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg)
}

/**
 _ Handles the request(Promise) when it is fulfilled
 _ and sends a JSON response to the HTTP response stream(res).
**/
const sendResponse = (res) => async (request) => {
  return await request
    .then(data => res.json({ status: "success", code: res.statusCode, data }))
    .catch(({ status: code = 500 }) =>
      res.status(code).json({ status: "failure", code, message: code == 404 ? `${lang.PT.ERROR_NOT_FOUND}`: `${lang.PT.ERROR_REQUEST_FAILED}` })
    )
}

/**
 _ Loads the html string returned for the given URL
 _ and sends a Cheerio parser instance of the loaded HTML
**/
const fetchHtmlFromUrl = async (url) => {
  return await axios
    .get(enforceHttpsUrl(url))
    .then(response => cheerio.load(response.data))
    .catch(error => {
      error.status = (error.response && error.response.status) || 500;
      throw error;
    })
}

/**
 _ Return the status of the API
**/
const fetchStatus = () => {
    const message = `${lang.PT.SERVER_ALIVE}`
    return Promise.resolve((message)).then((message) => message)
}

/**
 _ Validate the contact
 _ and return state (true or false) and value on e164 format
**/

const fetchMozambicanPhoneNumber = (contact) => {
  const country_code = 'MZ'
  const pn = new PhoneNumber(contact, country_code)
  const number = {'state': pn.isValid(), 'value': pn.getNumber('e164')}
  return number
}

///////////////////////////////////////////////////////////////////////////////
// HTML PARSING HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 _ Fetches the inner text of the element
 _ and returns the trimmed text
**/
const fetchElemInnerText = (elem) => (elem.text && elem.text().trim()) || null


/**
 _ Fetches the specified attribute from the element
 _ and returns the attribute value
**/
const fetchElemAttribute = (attribute) => (elem) =>
  (elem.attr && elem.attr(attribute)) || null

/**
 _ Extract an array of values from a collection of elements
 _ using the extractor function and returns the array
 _ or the return value from calling transform() on array
**/
const extractFromElems = (extractor) => (transform) => (elems) => ($) => {
  const results = elems.map((i, element) => extractor($(element))).get();
  return _.isFunction(transform) ? transform(results) : results
}

module.exports = {
  compose,
  composeAsync,
  enforceHttpsUrl,
  sanitizeNumber,
  withoutNulls,
  sendResponse,
  fetchStatus,
  fetchMozambicanPhoneNumber,
  fetchHtmlFromUrl,
  fetchElemInnerText,
  fetchElemAttribute,
  extractFromElems
}
