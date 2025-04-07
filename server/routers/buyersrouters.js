import express from 'express';
import { registerBuyer } from '../controllers/buyerscontroller.js';
const router = express.Router();
router.post('/signupb', registerBuyer);

export default router;