import express from 'express';
import multer from 'multer';
import {
  createProduct,
  getAllProducts,
  getProductGrid,
  getProductsByCategory,
  getMyProducts,
  updateProductById,
  deleteProductById,
  getProductById,
} from '../controllers/productcontroller.js';

const router = express.Router();

// Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Use `.any()` to accept multiple fields dynamically
const upload = multer({ storage: storage }).any();

// Routes
router.post("/listproduct", upload, createProduct);
router.get('/allproducts', getAllProducts);
router.get('/productgrid', getProductGrid);
router.get('/products/category/:category', getProductsByCategory); // Find products by category
router.put('/editproduct/:id', updateProductById);
router.delete('/listproduct/:id', deleteProductById);
router.get('/myproducts', getMyProducts);
router.get('/:id', getProductById);

export default router;