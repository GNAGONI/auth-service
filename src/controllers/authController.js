const { validationResult } = require('express-validator');
const { validationError, dbQueryError } = require('../errors');
const { passwordUtil } = require('../utils');
const { client } = require('../db');

const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(validationError(errors.array()));
  } else {
    const { email, password } = req.body;
    const hash = await passwordUtil.convertToHash(password);
    const result = await client.query(
      `SELECT * FROM get_users_by_email('${email}');`,
    );
    const user = result.rows[0];
    if (!user) {
      next(dbQueryError('User not found'));
    }
    res.send(user);
  }
};

module.exports = {
  signIn,
};
