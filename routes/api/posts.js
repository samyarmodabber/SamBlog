const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

router.get("/test", (req, res) => res.json({ msg: "Posts" }));

/**
 * @description Create a post for blog
 * @route /api/posts
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 * @access Private
 */

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      Post.create({
        title: req.body.title,
        body: req.body.body,
        auther: req.user.id
      })
        .then(post => res.json(post))
        .catch(err => res.json(err));
    }
  }
);

/**
 * @description Read all posts of blog
 * @route /api/posts
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 * @access Public
 */

router.get("/", (req, res) => {
  Post.findAll()
    .then(posts => {
      return res.json(posts);
    })
    .catch(err => res.status(404).json({ noPosts: "There is not any post" }));
});

/**
 * @description Read a post of blog
 * @route /api/posts/:id
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 * @access Public
 */

router.get("/:id", (req, res) => {
  Post.findByPk(req.params.id)
    .then(post => {
      return res.json(post);
    })
    .catch(err => res.status(404).json({ noPost: "No post with this id " }));
});

/**
 * @description Delete a post for blog
 * @route /api/posts
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 * @access Private
 */

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      Post.destroy({ where: { id: req.params.id } })
        .then(post => {
          return res.json({ deletPost: "A post delete just now" });
        })
        .catch(err =>
          res.status(404).json({ noPost: "No post with this id " })
        );
    }
  }
);

/**
 * @description Update a post for blog
 * @route /api/posts
 * @returns JWT token
 * @version 1.0.0
 * @author Samyar Modabber
 * @access Private
 */

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Post.findByPk(req.params.id).then(post => {
    //   const {title,body}=req.body
    //   post.dataValues.title = title;
    //   post.dataValues.body = body;
    //   post.save().then(() => {
    //     console.log(post);

    //     return res.json({ updatePost: "A post update just now" });
    //   });
    // });

    if (req.user.role === "admin") {
      Post.update(
        { title: req.body.title, body: req.body.body },
        { where: { id: req.params.id } }
      )
        .then(() => {
          return res.json({ updatePost: "A post update just now" });
        })
        .catch(err => {
          return res
            .status(404)
            .json({ unUpdatePost: "Can not ppdate the post" });
        });
    }

    // Post.update(
    //   { title: req.body.title, body: req.body.body },
    //   { where: { id: req.params.id } }
    // )
    //   .then(post => {
    //     return res.json({ updatePost: "A post update just now" });
    //   })
    //   .catch(err => res.status(404).json({ noPost: "No post with this id " }));
    // }
  }
);

module.exports = router;
