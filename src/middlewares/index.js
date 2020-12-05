const errorMiddleware = require('./errorMiddleware');
const authCheckMiddleware = require('./authCheckMiddleware');

module.exports = {
  errorMiddleware,
  authCheckMiddleware,
};
