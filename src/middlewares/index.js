const errorMiddleware = require('./errorMiddleware');
const authCheckMiddleware = require('./authCheckMiddleware');
const validationMiddleware = require('./validationMiddleware');

module.exports = {
  errorMiddleware,
  authCheckMiddleware,
  validationMiddleware,
};
