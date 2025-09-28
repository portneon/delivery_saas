const express = require('express');
const router = express.Router();
const {
    getTenants,
    getTenantById,
    postTenant,
    updateTenant,
    deleteTenant
} = require('../controllers/tenants.controller');

router.get('/', getTenants);
router.get('/:id', getTenantById);
router.post('/', postTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);  

module.exports = router;
