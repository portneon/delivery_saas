const express = require('express');
const router = express.Router();
const { getPayments,
    getPaymentById,
    postPayment,
    updatePaymentStatus
} = require('../controllers/payment.controller');

router.get('/', getPayments);
router.get('/:id', getPaymentById);
router.post('/', postPayment);
router.put('/:id', updatePaymentStatus);

module.exports = router;
