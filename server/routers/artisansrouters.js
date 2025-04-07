import express from 'express';
import { registerArtist } from '../controllers/artisanscontroller.js'; // Ensure the correct path and extension

const router = express.Router();
router.post('/register', registerArtist);

export default router;