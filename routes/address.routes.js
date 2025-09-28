const express = require('express');
const router = express.Router();
const { getAddresses,
    getAddressById,
    postAddress,
    updateAddress,
    deleteAddress
} = require('../controllers/address.controller');

router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.post('/', postAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
