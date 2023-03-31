const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/new', userController.newUserForm);

router.post('/new', userController.createUser);

router.get('/login', userController.loginForm);

router.post('/login', userController.login);

router.get('/profile', userController.viewProfile);

router.post('/logout', userController.logout);

module.exports = router;