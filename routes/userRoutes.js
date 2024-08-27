const express = require('express');
const fs = require('fs');
const config = require('../config/config')
const userController = require('../controllers/userController')
// const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.findAllUsers);
router.post('/', userController.validateCreateUser, userController.createUser);
router.put('/:id', userController.validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;