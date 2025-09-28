const express = require('express');
const router = express.Router();
const { getOrders,
    getOrderById,
    postOrder,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orders.controller.js');

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', postOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
