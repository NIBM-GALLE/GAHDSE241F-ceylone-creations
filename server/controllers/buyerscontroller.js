import Buyer from '../models/buyers.js'; // Correct the path to the Buyer model
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Register Buyer
export const registerBuyer = async (req, res) => {
  console.log("Received POST request at /signupb");
  try {
    // Check if buyer already exists
    const existingBuyer = await Buyer.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingBuyer) {
      return res.status(400).json({ message: "Buyer already exists" });
    }

    // Create a new buyer
    const buyer = new Buyer(req.body);
    const result = await buyer.save();

    if (!result) {
      return res.status(500).json({ message: "User registration failed" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: buyer._id, email: buyer.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: "Registration successful", token });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


