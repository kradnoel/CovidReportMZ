// Require dependencies
const _ = require('lodash');
const config = require('./config')

// Import helper functions
const {
    composeAsync,
    enforceHttpsUrl,
    sanitizeNumber,
    withoutNulls,
    sendResponse,
    fetchHtmlFromUrl,
    fetchElemInnerText,
    fetchElemAttribute,
    extractFromElems
  } = require("./helpers");

// covid19.ins.gov.mz (Base URL)
const COVID19MZ = config.COVID19MZ

///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 _ Extract a single stats from span element
**/
const extractStatsElement = (elem) => {
    const title = elem.find('span.kd_counter_units')
    //const total = elem.find('span.kd_number_string')
    const total = elem.find('span.kd_number_string')
    const fetchTotal = fetchElemAttribute('data-to');

    return {
      title: fetchElemInnerText(title),
      total: fetchTotal(total)
    }
  }

/**
 _ Extract a single qa from the page
**/
const extractQAElement = (elem) => {
   const question = elem.find('div.vc_toggle_title h4')
   const answer = elem.find('div.vc_toggle_content p')
   const answer1 = elem.find('div.vc_toggle_content div.eapps-faq-content-category-item-answer-text')

    return {
      question: fetchElemInnerText(question),
      answer: (fetchElemInnerText(answer)=== null) ? fetchElemInnerText(answer1) : fetchElemInnerText(answer)
    }
}

/**
 _ Extract the group of stats from the page
 _ and returns the stats object
**/

const extractCovid19mzStats =  ($) => {

    const mainContent = $('#main > #inicio > div.container > div.row')
    const StatsElements = mainContent.find('h4.kd_counter_number')
    const extractStatsDateTime = $('div.vc_message_box p')

    const extractStatsElements = extractFromElems(extractStatsElement)()

    return Promise.all([
      fetchElemInnerText(extractStatsDateTime),
      extractStatsElements(StatsElements)($)
    ]).then(([date, stats]) => ({date, stats}))
}

/**
_ Extract q&a's from the page
 _ and returns a random q&a object
**/

const extractCovid19mzQAs =  ($) => {
    const mainContent = $('#main > #inicio > div.container > div.row')
    const QA = mainContent.find('div.vc_toggle')

    const extractQAElements = extractFromElems(extractQAElement)()

    return Promise.all([
      extractQAElements(QA)($)
    ]).then(([faqs]) => ({faqs}))
}

/**
 _ Recieve a list of QA
 _ and return a single random QA
**/
const fetchRandomQAValue = (items)  => {
  const values = items.faqs
  return Promise.resolve(
    values[Math.floor(Math.random() * (values.length - 1))]
  ).then((value) => (value))
}

/**
 _ Extract the group of stats from the page
 _ and returns the stats object
**/

const fetchStats = items => {
    return composeAsync(extractCovid19mzStats, fetchHtmlFromUrl)(COVID19MZ)
  }

/**
 _ Extract q&a's from the page
 _ and returns a random q&a object
**/

const fetchFaqs = items => {
   return composeAsync(extractCovid19mzQAs, fetchHtmlFromUrl)(COVID19MZ)
}

/**
 _ Extract the group of stats from the page
 _ and returns single random value
**/

const fetchSingleQA = () => {
  return composeAsync(fetchRandomQAValue ,fetchFaqs)()
}

/**

**/

module.exports = {
    fetchStats,
    fetchFaqs,
    fetchSingleQA
}
