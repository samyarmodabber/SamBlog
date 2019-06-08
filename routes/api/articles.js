const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Article = require('../../models/Article');
const User = require('../../models/User');

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/articles
 * @description Create an articles
 * @access   Private
 */

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      if (user.role !== 'admin') {
        return res.status(400).json({ msg: 'You are not admin' });
      }

      const NewArticle = {
        title: req.body.title,
        content: req.body.content,
        userId,
        isPublished: req.body.isPublished
      };

      const article = await Article.create(NewArticle);
      await article.save();
      res.json(article);
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/articles
 * @description Get all articles for Admin
 * @access   Private
 */

router.get('/all', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (user.role !== 'admin') {
      return res.status(400).json({ msg: 'You are not admin' });
    }
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']]
    });
    if (articles.length === 0) {
      res.status(400).send({
        msg: `There is not any article`
      });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/articles
 * @description Get all published articles for Blog
 * @access   Public
 */

router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { isPublished: true },
      order: [['createdAt', 'DESC']]
    });
    if (articles.length === 0) {
      res.status(400).send({
        msg: `There is not any article`
      });
    }
    res.json(articles);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.1
 * @author Samyar Modabber
 * @route  POST api/articles/:id
 * @description Get an article by id
 * @access   Public
 */

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  UPDATE api/articles/:id
 * @description  Update an article by id
 * @access   Private
 */

router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const article = await Article.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      // Check user
      if (article.userId !== userId) {
        return res
          .status(401)
          .json({ msg: 'You can not delete another Article' });
      }

      await article.update(req.body).then(article => {
        res.json({ msg: `Article with id: ${article.id} updated` });
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
    const userId = req.user.id;
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Check user
    if (article.userId !== userId) {
      return res
        .status(401)
        .json({ msg: 'You can not delete another Article' });
    }

    await article.destroy().then(article => {
      res.json({ msg: `Article with id: ${article.id} removed` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});


module.exports = router;
