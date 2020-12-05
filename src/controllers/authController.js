const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { validationError, dbQueryError } = require('../errors');
const { passwordUtil } = require('../utils');
const { client } = require('../db');

const login = async (req, res) => {
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
  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION },
  );
  req.session = {
    token,
  };
  res.send({
    email: user.email,
    id: user.id,
  });
};

const logout = (req, res) => {
  req.session = null;
  res.sendStatus(200);
};

module.exports = {
  login,
  logout,
};
