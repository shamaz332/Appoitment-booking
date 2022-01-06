const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/auth");

// Post model
const Post = require("../../models/Post");

// @route api/posts
// @descrption Get all posts
// @access Public
router.get("/", (req, res) => {
  const id = req.header("author");
  console.log("id")
  const filter = {};
  if (id) filter["sellerId"] = id;
  Post.find(filter)
    .sort({ updatedAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

// @route api/posts
// @descrption Post a blogpost
// @access Private
router.post("/", (req, res) => {
  const { description, senderName, slot, status, sellerId } = req.body;
  const newpost = new Post({
    sellerId,
    description,
    senderName,
    slot,
    status,
  });
  newpost
    .save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// @route api/posts
// @descrption Put/Update a post
// @access Private
router.put("/", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { upsert: true },
    (err, post) => {
      if (err) throw err;
      res.json(post);
    }
  );
});


module.exports = router;
