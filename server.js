const express = require('express');
const path = require('path');
const app = express();


const db = require("./config/db");
// Sync DB by Sequelize for test mode
//You can sync all database by below command
// db.sync();
// db.sync({force:true});
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

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api',require('./routes/api'))


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
