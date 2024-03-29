/**
 * @version 2.0.0
 * @author Samyar modabber
 */
const Sequelize = require('sequelize');
require('dotenv').config()

const db=new Sequelize(process.env.DATABASE_URL)
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = db;


//  Connect to DB in detail way
// module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'mysql',
//   // operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });
