const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

// Add a comment
router.post('/posts/:id/comments', async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comment = new Comment({ content: req.body.comment });
  await comment.save();
  post.comments.push(comment);
  await post.save();
  res.redirect('/posts/' + req.params.id);
});

module.exports = router;
