/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');

const Experience = db.define('experience', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING
  },
  from: {
    type: Sequelize.DATE,
    allowNull: false
  },
  to: {
    type: Sequelize.DATE
  },
  current: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.STRING
  }
});

module.exports = Experience;
