const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Mongoose Schema
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  date: String,
  category: String,
});

const Post = mongoose.model('Post', postSchema);

// GET: Show all posts on homepage
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

// GET: New post form
router.get('/posts/new', (req, res) => {
  res.render('new');
});

// POST: Create a new blog post
router.post('/posts', async (req, res) => {
  const { title, author, image, description, date, category } = req.body;
  await Post.create({ title, author, image, description, date, category });
  res.redirect('/');
});

// GET: Edit post form
router.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('edit', { post });
});

// PUT: Update a blog post
router.put('/posts/:id', async (req, res) => {
  const { title, author, image, description, date, category } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, author, image, description, date, category });
  res.redirect('/');
});

// DELETE: Remove a post
router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// GET: Read full blog post
router.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('read', { post }); // Make sure views/read.ejs exists
});

module.exports = router;
