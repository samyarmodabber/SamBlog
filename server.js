const express = require('express');
const path = require('path');
const app = express();


const db = require("./config/db");
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Sync DB by Sequelize for test mode
// const User = require("./models/User");
// // User.sync({force:true});
// const Profile = require("./models/Profile");
// // Profile.sync({force:true});
// const Article = require("./models/Article");
// // Article.sync({force:true});
// const Experience = require("./models/Experience");
// // Experience.sync({force:true});
// const Education = require("./models/Education");
// // Education.sync({force:true});
// const Skill = require("./models/Skill");
// Skill.sync({force:true});
//You can sync all database by below command
// db.sync();
// db.sync({force:true});

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
