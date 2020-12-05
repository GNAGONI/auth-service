const express = require('express');
const { userController } = require('../controllers');
const { authCheckMiddleware } = require('../middlewares');

const userRouter = express.Router();

userRouter.get('/me', authCheckMiddleware, userController.getMe);

module.exports = userRouter;
