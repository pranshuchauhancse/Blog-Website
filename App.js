const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Schema
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', async (req, res) => {
  const { title, description, image } = req.body;
  await Post.create({ title, description, image });
  res.redirect('/');
});

app.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

app.put('/posts/:id', async (req, res) => {
  const { title, description, image } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, description, image });
  res.redirect('/');
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
