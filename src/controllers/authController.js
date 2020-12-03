const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { validationError, dbQueryError } = require('../errors');
const { passwordUtil } = require('../utils');
const { client } = require('../db');

const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw validationError(errors.array());
  }
  const { email, password } = req.body;
  const result = await client.query(
    `SELECT * FROM get_users_by_email('${email}');`,
  );
  const user = result.rows[0];
  if (!user) {
    throw dbQueryError('User not found');
  }

  if (!passwordUtil.compareHash(password, user.password_hash)) {
    throw dbQueryError('Invalid credentials');
  }

  res.send({ user });
};

module.exports = {
  signIn,
};
