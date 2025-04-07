import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Buyer from '../models/buyers.js';
import Artist from '../models/artisians.js';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Sign-in Controller
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Buyer.findOne({ email });
    let role = "Buyer";

    // Check if the user is an Artist if not found as a Buyer
    if (!user) {
      user = await Artist.findOne({ email });
      role = "Artist";
    }

    // If no user is found
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token, role, username: user.firstname });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};