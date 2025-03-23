import 'dotenv/config.js';
import express, { json, static as serveStatic } from 'express';
import connectDB from './config/db.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Buyer from './models/buyers.js';
import Artist from './models/artisians.js';
import Product from './models/product.js';
import Category from './models/product_categories.js';


// Calculate __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { sign } = jwt;
const { compare } = bcrypt;
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";


// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connectDB();


// Register Artist
app.post('/register', async (req, res) => {
    console.log("Received POST request at /artistregister");
    try {
        // Check if artist already exists
        const existingArtist = await Artist.findOne({ 
            $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });

        if (existingArtist) {
            return res.status(400).json({ message: "Artist already exists" });
        }

        const artist = new Artist(req.body);
        const result = await artist.save();

        if (!result) {
            return res.status(500).json({ message: "User registration failed" });
        }

        // Generate JWT token
        const token = sign(
            { id: artist._id, email: artist.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ message: "Registration successful", token });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Register Buyer
app.post('/signupb', async (req, res) => {
    console.log("Received POST request at /Buyers");
    try {
        // Check if buyer already exists
        const existingBuyer = await Buyer.findOne({ 
            $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });

        if (existingBuyer) {
            return res.status(400).json({ message: "Buyer already exists" });
        }

        const buyer = new Buyer(req.body);
        const result = await buyer.save();

        if (!result) {
            return res.status(500).json({ message: "User registration failed" });
        }

        // Generate JWT token
        const token = sign(
            { id: buyer._id, email: buyer.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Registration successful", token });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Sign-in Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Buyer.findOne({ email });
        let role = "Buyer";

        if (!user) {
            user = await Artist.findOne({ email });
            role = "Artist";
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = sign(
            { id: user._id, email: user.email, role: role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Signin successful", token, role, username: user.firstname });
    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Create Product with Image Upload
// Configure Multer for file upload
// Static directory for serving uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

// Add the route with file upload
app.post("/listproduct", upload.single("image"), async (req, res) => {
    try {
        const { title, description, price, artistId, itemadded_date, stock_quantity, category } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        
        
        const product = new Product({
            title,
            description,
            price,
            itemadded_date,
            stock_quantity,
            category,
            artist: artistId._id,
            image: imagePath
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
});


// Fetch All Buyers
app.get('/', async (req, res) => {
    console.log("Received GET request at /");
    try {
        const response = await Buyer.find();
        return res.json({ Buyers: response });
    } catch (err) {
        console.error("Error fetching buyers:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Fetch All Product Categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


//Fetch product Grid

app.get("/productgrid", async (req, res) => {
    try {
      const products = await Product.find() ;
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });

//Fetich All products
app.get("/allproducts", async (req, res) => {
    try {
      const products = await Product.find() ;
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });


// Fetch products by category name
app.get('/api/products/:categoryName', async (req, res) => {
    const { categoryName } = req.params; // Get category name from URL
  
    try {
      const products = await Product.find({ category: categoryName });
  
      if (!products.length) {
        return res.status(404).json({ message: "No products found for this category" });
      }
  
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  });

// Start Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
