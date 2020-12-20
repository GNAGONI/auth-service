const { authError } = require('../errors');

const sessionCheckMiddleware = (req, res, next) => {
  const { authenticated } = req.session;
  if (!authenticated) {
    throw authError('Invalid session');
  }
  next();
};

module.exports = sessionCheckMiddleware;
