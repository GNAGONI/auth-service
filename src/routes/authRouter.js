const express = require('express');
const { authController } = require('../controllers');

const authRouter = express.Router();

authRouter.get('/signIn', authController.signIn);

module.exports = authRouter;
