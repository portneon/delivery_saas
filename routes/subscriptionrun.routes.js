const express = require('express');
const router = express.Router();
const { getSubscriptionRuns,
    getSubscriptionRunById,
    getOrdersBySubscriptionRun,
    generateSubscriptionRunsToday
} = require('../controllers/subscriptionrun.controller');

router.get('/', getSubscriptionRuns);
router.get('/:id', getSubscriptionRunById);
router.get('/:id/orders', getOrdersBySubscriptionRun);
router.post('/generate-today', generateSubscriptionRunsToday);

module.exports = router;
