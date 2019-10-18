const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

/**
 * @version 3.0.0
 * @author Samyar Modabber
 * @route POST api/users
 * @access Public
 * @description Register user
 */

 router.post(
  '/register',
  [
    check('name', 'Name is required field')
      .not()
      .isEmpty(),
    check('email', 'Please input a valid email').isEmail(),
    check(
      'password',
      'Please input a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const userRegister = await User.findOne({ where: { email } });
      if (userRegister) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({msg:"You register!"})
    } catch (err) {
      console.error("ERROR", err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
