const express = require('express');
const { header } = require('express-validator');
const {
  validationMiddleware,
  sessionCheckMiddleware,
} = require('../middlewares');
const { authController } = require('../controllers');

const authRouter = express.Router();

authRouter.post(
  '/auth',
  [
    header('basic')
      .matches(/\S+\/\S+/, 'g')
      .withMessage('Invalid Basic'),
  ],
  validationMiddleware,
  sessionCheckMiddleware,
  authController.auth,
);

module.exports = authRouter;
