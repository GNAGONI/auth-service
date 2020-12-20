require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { authRouter } = require('./src/routes');
const { errorMiddleware } = require('./src/middlewares');
const { sessionStorage } = require('./src/sessionStorage');

dotenv.config();

const app = express();
app.use(sessionStorage);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', authRouter);
app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.use(errorMiddleware);

app.listen(process.env.AUTH_SERVICE_PORT, () => {
  console.log(`Server is running on port ${process.env.AUTH_SERVICE_PORT}`);
});
