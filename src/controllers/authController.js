const jwt = require('jsonwebtoken');
const { dbQueryError, passwordUtil } = require('@microservices-inc/common');
const { dbQuery } = require('../db');

const auth = async (req, res) => {
  const { basic } = req.headers;
  const [userType, credentials] = basic.split('/');
  const result = await dbQuery(
    `SELECT * FROM get_credentials_by_user_type('${userType}');`,
  );
  const userTypeData = result.rows[0];
  if (!passwordUtil.compareHash(credentials, userTypeData.password_hash)) {
    throw dbQueryError('Invalid credentials');
  }

  const token = jwt.sign(
    {
      email: req.session.userEmail,
      id: req.session.userId,
      scope: userTypeData.scope,
    },
    process.env.JWT_SECRET,
    { expiresIn: userTypeData.ttl },
  );
  res.send({
    token,
  });
};

module.exports = {
  auth,
};
