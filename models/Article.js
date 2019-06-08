/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');
const Like=require('./Like')

const Article = db.define(
  'article',
  {
    //id, updatedAt, createdAt will add automaticly and the name of table will be pulural 
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }
  // {
  //   // paranoid: true,
  //   // timestamp:false, //this setting remove updatedAt and createdAt

  // }
);

Article.hasMany(Like);

module.exports = Article;
