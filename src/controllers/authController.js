const { validationResult } = require('express-validator');
const { validationError } = require('../errors');

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw validationError(errors.array());
  }

  const { email, password } = req.body;
  res.send({ email, password });
};

module.exports = {
  signIn,
};
