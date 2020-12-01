const { validationResult } = require('express-validator');
const { validationError } = require('../errors');
const { passwordUtil } = require('../utils');

const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(validationError(errors.array()));
  } else {
    const { email, password } = req.body;
    const hash = await passwordUtil.convertToHash(password);
    res.send({ email, password, hash });
  }
};

module.exports = {
  signIn,
};
