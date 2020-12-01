const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { authRouter } = require('./src/routes');
const { errorMiddleware } = require('./src/middlewares');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', authRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
