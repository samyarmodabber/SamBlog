const Sequelize = require("sequelize");
const db = require("../config/database");


const User = db.define(
  "user",
  {
    //id will be create automaticly
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      //It will be done latter
      // validate: {
      //   len: {
      //     args:[5, 25],
      //     msg:"Username must be between 5 and 25 characters"
      //   }
      // }
    },
    firstName: {
      type: Sequelize.STRING,
      // validate: {
      //   len: {
      //     arg:[3, 30],
      //     msg:"First Name must be between 3 and 30 characters"
      //   }
      // }
    },
    lastName: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.ENUM("m", "f", "n"),
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM("admin", "writer", "user"),
      allowNull: false,
      defaultValue:'user'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    avatar: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
    // friends: {
    //   type: Sequelize.ARRAY
    // }
  },
  {
    paranoid: true
    // timestamp:false, //this setting remove updatedAt and createdAt
  }
  // see:http://docs.sequelizejs.com/manual/models-definition.html#configuration
);

module.exports = User;
