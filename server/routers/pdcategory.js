import express from 'express';
import { getAllCategories } from '../controllers/categorycontroller.js';

const router = express.Router();

// Route to fetch all categories
router.get('/', getAllCategories);

export default router;