const errorTypes = require('./errorTypes');

const authError = cause => {
  const error = new Error();
  error.type = errorTypes.authError;
  error.cause = [cause];
  return error;
};

module.exports = authError;
