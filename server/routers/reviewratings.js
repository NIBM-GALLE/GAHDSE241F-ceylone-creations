import express from 'express';
import {addReview,getReviews} from '../controllers/reviewratingscontroller.js';
const router = express.Router();



router.post("/products/:id/review", addReview);
router.get('/products/:id/review', getReviews);

export default router;