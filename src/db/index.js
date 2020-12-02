const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const initSQLFunctions = async () => {
  const functionsSQL = fs.readFileSync(
    path.resolve(__dirname, './functions.sql'),
    'utf8',
  );
  await client.query(functionsSQL);
};

const dbConnect = cb => {
  (async () => {
    try {
      await client.connect();
      await initSQLFunctions();
      cb();
    } catch (e) {
      console.error(e);
      process.exit();
    }
  })();
};

module.exports = {
  client,
  dbConnect,
};
