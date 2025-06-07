const Article = require('../model/article');
const path = require('path');
const fs = require('fs');

const createArticle = async (req, res, next) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
        const err = new Error('Title, category, and content are required.');
        err.statusCode = 400;
        return next(err);
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const newArticle = new Article({
      title,
      category,
      content,
      image: imageUrl || null,
      status: 'pending'
    });

    await newArticle.save();
    res.status(201).json({ message: 'Article submitted successfully and is pending review.', article: newArticle });
  } catch (error) {
    console.error('Error in createArticle:', error.message);
    if (req.file && req.file.path) {
        if (fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error("Error deleting orphaned file after DB save failure:", unlinkErr);
            });
        }
    }
    next(error);
  }
};

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error in getArticles:', error.message);
    next(error);
  }
};

module.exports = {
  createArticle,
  getArticles
};