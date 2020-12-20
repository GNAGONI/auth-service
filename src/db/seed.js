const fs = require('fs');
const path = require('path');
const { dbQuery } = require('./index');
const { passwordUtil } = require('../utils');

const seed = async () => {
  try {
    const defaultUserTypePassword = '1234';
    const hash = passwordUtil.convertToHash(defaultUserTypePassword);
    const seedSQL = fs.readFileSync(
      path.resolve(__dirname, './seed.sql'),
      'utf8',
    );
    const functionsSQL = fs.readFileSync(
      path.resolve(__dirname, './functions.sql'),
      'utf8',
    );

    await dbQuery(seedSQL);
    await dbQuery(`SELECT fill_data('${hash}');`);
    await dbQuery(functionsSQL);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
};

seed();
