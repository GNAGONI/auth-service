const errorTypes = require('./errorTypes');

const validationError = cause => {
  const error = new Error();
  error.type = errorTypes.validationError;
  error.cause = cause;
  return error;
};

module.exports = validationError;
