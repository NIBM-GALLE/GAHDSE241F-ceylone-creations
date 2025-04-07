import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import artisansRoutes from './routers/artisansrouters.js';
import buyersRoutes from './routers/buyersrouters.js';
import authRoutes from './routers/authrouters.js';
import productRoutes from './routers/productrouters.js';
import categoryRoutes from './routers/pdcategory.js';
import reviewRoutes from './routers/reviewratings.js';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
connectDB();

// Use Artisans Routes
app.use('/api/artisans', artisansRoutes);

// Use Buyers Routes
app.use('/api/buyers', buyersRoutes);

//Use Auth Routes(Sign-in)
app.use('/api/auth', authRoutes);

//Use Product Routers
app.use('/api/products', productRoutes);

//Use product Category
app.use('/api/categories', categoryRoutes);

//Use Review and Ratings
app.use('/api/review', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));