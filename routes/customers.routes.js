const express = require('express');
const router = express.Router();
const {
    getCustomers,
    getCustomerById,
    PostCustomer,
    UpdateCustomer,
    deleteCustomer
} = require('../controllers/customers.controller');

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/', PostCustomer);
router.put('/:id', UpdateCustomer);
router.delete('/:id', deleteCustomer);  

module.exports = router;
