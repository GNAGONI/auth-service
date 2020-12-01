const { randomBytes, createHmac } = require('crypto');

const convertToHash = async password => {
  const salt = randomBytes(16).toString('hex');
  const hash = createHmac('sha512', salt)
    .update(password)
    .digest('hex');
  return `${hash}.${salt}`;
};

const compareHash = async (password, hashedPassword) => {
  const [hash, salt] = hashedPassword.split('.');
  const data = createHmac('sha512', salt)
    .update(password)
    .digest('hex');
  return hash === data;
};

module.exports = {
  convertToHash,
  compareHash,
};
