const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));

router.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;