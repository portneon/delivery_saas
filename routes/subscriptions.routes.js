const express = require('express');
const router = express.Router();
const {
    getSubscriptions,
    getSubscriptionById,
    postSubscription,
    updateSubscription,
    deleteSubscription
} = require('../controllers/subscriptions.controller');

router.get('/', getSubscriptions);
router.get('/:id', getSubscriptionById);
router.post('/', postSubscription);
router.put('/:id', updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
