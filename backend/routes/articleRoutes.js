const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  createArticle,
  getArticles
} = require('../controller/articleController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    try {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    } catch (err) {
        console.error("Multer: Error ensuring uploads directory exists:", err);
        cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes + '. Max size 5MB.'));
  }
});

router.post('/', upload.single('image'), createArticle);
router.get('/', getArticles);

module.exports = router;