  const { Pool } = require("pg");

  const pgtools = require('pgtools');

  const config = {
    user: process.env.USER,
    password: 'some pass',
    port: 5432,
    host: 'localhost'
  }


  try {  
  pgtools.createdb(config, 'test-db', function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);


  });
} catch (error) {
  console.error('ERROR CREATING DATABASE');
}
const pool = new Pool();

module.exports = {
  query: (text, params) => {
    console.log({
      req: text,
      time: new Date().toLocaleTimeString(),
    });
    return pool.query(text, params);
  },
};