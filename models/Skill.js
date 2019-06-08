/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');

const Skill = db.define('skill', {
  //id, updatedAt, createdAt will add automaticly and the name of table will be pulural
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Skill;
