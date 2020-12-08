const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers');
const { validationMiddleware } = require('../middlewares');

const authRouter = express.Router();

authRouter.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Password must be between 4 and 10 symbols'),
  ],
  validationMiddleware,
  authController.login,
);

authRouter.post('/logout', authController.logout);

module.exports = authRouter;
