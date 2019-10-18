const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
require('dotenv').config()
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
    ).isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      const userRegister = await User.findOne({where: {email}});
      if (userRegister) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
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
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({msg: `You register ${name}!`});
    } catch (err) {
      console.error('ERROR', err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/users
 * @description Create an users
 * @access   Private
 */

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required field')
        .not()
        .isEmpty(),
      check('email', 'Please input a valid email').isEmail(),
      check(
        'password',
        'Please input a password with 6 or more characters'
      ).isLength({min: 6})
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password, isActive, sex, role} = req.body;

    try {
      const reqUser = await User.findByPk(req.user.id, {
        attributes: {exclude: ['password']}
      });
      if (reqUser.role !== 'admin') {
        return res.status(400).json({msg: 'You are not admin'});
      }

      const userRegister = await User.findOne({where: {email}});
      if (userRegister) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
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
        isActive,
        sex,
        role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({msg: 'You add a new user!'});
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/users
 * @description Get all users for Admin
 * @access   Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const reqUser = await User.findByPk(req.user.id, {
      attributes: {exclude: ['password']}
    });
    if (reqUser.role !== 'admin') {
      return res.status(400).json({msg: 'You are not admin'});
    }
    const users = await User.findAll({
      attributes:{exclude:['password']},
      order: [['createdAt', 'DESC']]
    });
    if (users.length === 0) {
      res.status(400).json({
        msg: `There is not any User`
      });
    }
    res.json(users);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.1
 * @author Samyar Modabber
 * @route  POST api/users/:id
 * @description Get an users by id
 * @access   Private
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const reqUser = await User.findByPk(req.user.id, {
      attributes: {exclude: ['password']}
    });
    if (reqUser.role !== 'admin') {
      return res.status(400).json({msg: 'You are not admin'});
    }

    const user = await User.findByPk(req.params.id, {
      attributes: {exclude: ['password']}
    });
    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  UPDATE api/users/:id
 * @description  Update an user by id
 * @access   Private
 */

router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required field')
        .not()
        .isEmpty(),
      check(
        'password',
        'Please input a password with 6 or more characters'
      ).isLength({min: 6})
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const {name, password, isActive, sex, role} = req.body;
      // check Admin
      const reqUser = await User.findByPk(req.user.id, {
        attributes: {exclude: ['password']}
      });
      if (reqUser.role !== 'admin') {
        return res.status(400).json({msg: 'You are not admin'});
      }
      // Check DB
      const user = await User.findByPk(req.params.id, {
        attributes: {exclude: ['password']}
      });
      if (!user) {
        return res.status(404).json({msg: 'User not found'});
      }else if (user.email === process.env.superAdmin) {
        return res.status(404).json({msg: 'You can not update the superAdmin of website ;)'});
      }

      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);

      updateFields = {
        name: name ? name : user.name,
        password: password ? hashPassword : user.password,
        isActive: isActive ? isActive : user.isActive,
        sex: sex ? sex : user.sex,
        role: role ? role : user.role
      };
      await user.update(updateFields).then(user => {
        res.json({msg: `User with id: ${user.id} updated`});
      });
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  DELETE api/articles/:id
 * @description  Delete an article by id
 * @access   Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    // check Admin
    console.log(process.env.superAdmin);
    const reqUser = await User.findByPk(req.user.id, {
      attributes: {exclude: ['password']}
    });
    if (reqUser.role !== 'admin') {
      return res.status(400).json({msg: 'You are not admin'});
    }
    // Check DB
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({msg: 'User not found'});
    } else if (user.role === 'admin') {
      return res.status(404).json({msg: 'You can not delete an admin user'});
    } else if (user.email === process.env.superAdmin) {
      return res.status(404).json({msg: 'You can not delete the superAdmin of website ;)'});
    }

    await user.destroy().then(user => {
      res.json({
        msg: `User with id: ${user.id} and email ${user.email} removed`
      });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

module.exports = router;
