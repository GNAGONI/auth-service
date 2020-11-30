const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
