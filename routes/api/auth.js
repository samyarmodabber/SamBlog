const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {check, validationResult} = require('express-validator/check');

const User = require('../../models/User');

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route GET api/auth
 * @access Public
 * @description Check authenticate (token)
 */

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {exclude: ['password']}
    });
    res.json(user);
  } catch (err) {
    // console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route POST api/auth
 * @access Public
 * @description Login and get token
 */

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
      const user = await User.findOne(
        {where: {email}},
        {attributes: {exclude: ['password']}}
      );

      if (!user) {
        return res
          .status(400)
          .json({errors: [{msg: 'Not find email or invalid password!'}]});
      }
      if (!user.isActive) {
        return res
          .status(400)
          .json({errors: [{msg: 'You did not active by admin yet!'}]});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({errors: [{msg: 'Not find email or invalid password!'}]});
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {expiresIn: 360000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
