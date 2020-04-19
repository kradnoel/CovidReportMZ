// Required dependencies
const express = require('express')
const router = express.Router()

// Require the needed functions
const {sendResponse, fetchStatus} = require('./helpers')
const {fetchStats, fetchFaqs, fetchSingleQA} = require('./covid19mz')

//Routes
router.get('/stats', async(req, res) => 
    sendResponse(res)(fetchStats())
)

router.get('/faqs', async(req, res) =>
    sendResponse(res)(fetchFaqs())
)

router.get('/faqs/1', async(req, res) =>
    sendResponse(res)(fetchSingleQA())
)

router.get('/health', async(req, res) =>
    sendResponse(res)(fetchStatus())
)

module.exports = router