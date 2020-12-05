require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { authRouter } = require('./src/routes');
const { errorMiddleware } = require('./src/middlewares');
const { dbConnect } = require('./src/db');

const app = express();
dotenv.config();
app.use(
  cookieSession({
    signed: false,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', authRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.use(errorMiddleware);

dbConnect(() => {
  app.listen(process.env.AUTH_SERVICE_PORT, () => {
    console.log(`Server is running on port ${process.env.AUTH_SERVICE_PORT}`);
  });
});
