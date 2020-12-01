const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers');

const authRouter = express.Router();

authRouter.get(
  '/signIn',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage('Password must be between 4 and 10 symbols'),
  ],
  authController.signIn,
);

module.exports = authRouter;
