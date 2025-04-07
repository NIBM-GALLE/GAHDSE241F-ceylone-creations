import express from 'express';
import { signIn } from '../controllers/authcontroller.js';

const router = express.Router();

// Sign-in Route
router.post('/signin', signIn);

export default router;