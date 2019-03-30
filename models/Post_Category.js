const Sequelize = require("sequelize");
const db = require("../config/database");

const Post_Category = db.define("post_cat", {
  // subject,body,published,auther,keyWords,categories
  postId: {
    type: Sequelize.STRING,
    references: {
        model: "posts",
        key: "id"
      }
  },
  categoryId: {
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

module.exports = Post_Category;
