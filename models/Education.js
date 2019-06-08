/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');

const Education = db.define('education', {
  school: {
    type: Sequelize.STRING,
    allowNull: false
  },
  degree: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fieldofstudy: {
    type: Sequelize.STRING,
    allowNull: false
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

module.exports = Education;
