const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['artisan-story', 'craft-technique', 'cultural-heritage', 'sustainability', 'other'],
    default: 'other'
  },
  content: { type: String, required: [true, 'Content is required'] },
  image: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);