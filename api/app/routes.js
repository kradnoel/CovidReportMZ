// Required dependencies
const express = require('express')
const router = express.Router()

// Require the needed functions
const {sendResponse, fetchStatus} = require('./helpers')
const {SubscribeUser, UnSubscribeUser} = require('./parse')
const {fetchStats, fetchFaqs, fetchSingleQA} = require('./covid19mz')

//Routes

router.get('/', async(req, res) =>
  res.render('index.html')
)

router.get('/stats', async(req, res) =>
    sendResponse(res)(fetchStats())
)

router.get('/faqs', async(req, res) =>
    sendResponse(res)(fetchFaqs())
)

router.get('/faqs/1', async(req, res) =>
    sendResponse(res)(fetchSingleQA())
)

router.post('/subscribe', async(req, res) => {
  var contact = req.body.contact
  sendResponse(res)(SubscribeUser(contact))
})

router.post('/unsubscribe', async(req, res) => {
  var contact = req.body.contact
  sendResponse(res)(UnSubscribeUser(contact))
})

router.get('/health', async(req, res) =>
    sendResponse(res)(fetchStatus())
)

module.exports = router
