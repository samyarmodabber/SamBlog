/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');

const Like = db.define(
  'like',
  {
    //id, updatedAt, createdAt will add automaticly and the name of table will be pulural 
    
  }

);


module.exports = Like;
