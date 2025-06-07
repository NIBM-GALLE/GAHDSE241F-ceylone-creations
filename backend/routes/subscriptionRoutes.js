const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controller/subscriptionController');

router.post('/', createSubscription);

module.exports = router;