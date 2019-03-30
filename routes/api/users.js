const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

/**
 * @description Load validation
 */
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");


/**
 * @description Register an user
 * @route /api/register
 * @returns JSON
 * @version 1.0.0
 * @author Samyar Modabber
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    username,
    firstName,
    lastName,
    sex,
    email,
    password,
    role
  } = req.body;

  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        errors.email = "This email registered before";
        return res.status(400).json({ errors });
      } else {
        const newUser = new User({
          username,
          firstName,
          lastName,
          email,
          sex,
          password,
          avatar,
          role
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(error => {
      console.log(error.validationErrorItem.path);
      return res.json(error);
    });
});

/**
 * @description login an user
 * @route /api/users/login
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 */

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then(user => {
    if (!user) {
      errors.email = "User does not exist";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id:user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          sex: user.sex,
          role: user.role,
        };

        jwt.sign(
          payload,
          keys.jwtSecrete,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});



module.exports = router;
