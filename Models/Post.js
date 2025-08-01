const mongoose = require('mongoose');

// No need to import the Comment model here unless used directly
// const Comment = require('./comment');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: String,
  author: String,
  description: String,
  date: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model('Post', postSchema);
