const Sequelize = require("sequelize");
const db = require("../config/database");

const Category = db.define("cat", {
  // subject,body,published,auther,keyWords,categories
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  parent: {
    type: Sequelize.INTEGER,
    references: {
      model: "cats",
      key: "id"
    }
  }
},
{
  // paranoid: true,
  // timestamp:false, //this setting remove updatedAt and createdAt

}
);

module.exports = Category;
