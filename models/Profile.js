/**
 * @version 2.0.0
 * @author Samyar Modabber
 */
const Sequelize = require('sequelize');
const db = require('../config/db');
const Education = require('./Education');
const Experience = require('./Experience');
const Skill = require('./Skill');

const Profile = db.define('profile', {
  company: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.STRING
  },
  youtube: {
    type: Sequelize.STRING
  },
  twitter: {
    type: Sequelize.STRING
  },
  facebook: {
    type: Sequelize.STRING
  },
  linkedin: {
    type: Sequelize.STRING
  },
  instagram: {
    type: Sequelize.STRING
  },
  githubusername: {
    type: Sequelize.STRING
  }
});

Profile.hasMany(Education);
Profile.hasMany(Experience);
Profile.hasMany(Skill);

module.exports = Profile;
