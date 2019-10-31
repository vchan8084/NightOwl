// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).

const Sequelize = require('sequelize');

// create the database instance that can be used in other database files
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker',
  {
    logging: false, // unless you like the logs
    //'false' so we don't see all the SQL queries getting made
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;
