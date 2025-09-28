const express = require('express');
const router = express.Router();
const { getInventoryBatches,
    getInventoryBatchById,
    postInventoryBatch,
    updateInventoryBatch,
    deleteInventoryBatch
} = require('../controllers/inventory.controller');

router.get('/products/:productId/inventory', getInventoryBatches);
router.get('/inventory/:id', getInventoryBatchById);

router.post('/products/:productId/inventory', postInventoryBatch);
router.put('/inventory/:id', updateInventoryBatch);
router.delete('/inventory/:id', deleteInventoryBatch);

module.exports = router;
