const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const keys = require("./config/keys");
const Post = require("./models/Post");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require("passport");




/**
 * @description
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * @description
 */
const db = require("./config/database");
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

  // db.sync({force:true}); 
// User.sync({force:true});
// automatically sync all models.
// db.sync();

/**
 *@description Passport Middleware
 */
app.use(passport.initialize());
require("./config/passport")(passport);

/**
 * @deprecated Routes
 */
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/pages", require("./routes/api/pages"));

/**
 * @deprecated Define ports
 */
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
