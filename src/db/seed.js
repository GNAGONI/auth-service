const fs = require('fs');
const path = require('path');
const { client } = require('./index');
const { passwordUtil } = require('../utils');

const seed = async () => {
  try {
    const numberOfUsers = 1000;
    const defaultUserPassword = '1234';
    const hash = await passwordUtil.convertToHash(defaultUserPassword);
    const seedSQL = fs.readFileSync(
      path.resolve(__dirname, './seed.sql'),
      'utf8',
    );
    const functionsSQL = fs.readFileSync(
      path.resolve(__dirname, './functions.sql'),
      'utf8',
    );

    await client.connect();
    await client.query(seedSQL);
    await client.query(`SELECT fill_data(${numberOfUsers}, '${hash}');`);
    await client.query(functionsSQL);
    await client.end();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

seed();
