/**
 * @version 2.0.0
 * @author Samyar modabber
 */
const Sequelize = require('sequelize');
require('dotenv').config()

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  dialect: 'mysql',
  // operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
