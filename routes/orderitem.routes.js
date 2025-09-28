const express = require('express');
const router = express.Router();
const { getOrderItems,
    postOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require('../controllers/orderitem.controller');

router.get('/orders/:orderId/items', getOrderItems);
router.post('/orders/:orderId/items', postOrderItem);
router.put('/order-items/:id', updateOrderItem);
router.delete('/order-items/:id', deleteOrderItem);

module.exports = router;
