const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('checked');
};

module.exports = {
  signIn,
};
