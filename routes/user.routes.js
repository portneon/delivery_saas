const express = require('express');
const router = express.Router();
const { getUser,
    getUserById,
    PostUser,
    UpdateUser,
    DeleteUser
} = require('../controllers/users.controller');

router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/', PostUser);
router.put('/:id', UpdateUser);
router.delete('/:id', DeleteUser);

module.exports = router;