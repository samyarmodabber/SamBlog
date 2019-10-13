/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db'); 
const Profile = require('./Profile');
const Article = require('./Article');
const Like = require('./Like');


const User = db.define('user', {
  //id, updatedAt, createdAt will add automaticly and the name of table will be pulural
  name: {
    type: Sequelize.STRING,
    allowNull: false 
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING
  },
  sex: {
    type: Sequelize.ENUM('male', 'female', 'notgiven'),
    allowNull: false,
    defaultValue: 'notgiven'
  },
  role: {
    type: Sequelize.ENUM('admin', 'writer', 'user'),
    allowNull: false, //for test mode
    defaultValue: 'user'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

User.hasOne(Profile);
User.hasMany(Article);
User.hasMany(Like);

module.exports = User;
