const jwt = require('jsonwebtoken');
const { dbQueryError } = require('../errors');
const { passwordUtil } = require('../utils');
const { client } = require('../db');

const login = async (req, res) => {
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
  res.send({
    email: user.email,
    id: user.id,
    token,
  });
};

const logout = (req, res) => {
  res.sendStatus(200);
};

module.exports = {
  login,
  logout,
};
