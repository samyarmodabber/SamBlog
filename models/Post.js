const Sequelize = require("sequelize");
const db = require("../config/database");

const Post = db.define("post", {
  // subject,body,published,auther
  title: {
    type: Sequelize.STRING,
    allowNull:false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  published:{
    type:Sequelize.BOOLEAN,
    defaultValue:true
  },
  auther: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  }

},
// {
//   // paranoid: true,
//   // timestamp:false, //this setting remove updatedAt and createdAt

// }
);

module.exports = Post;
