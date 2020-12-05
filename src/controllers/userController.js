const getMe = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  getMe,
};
