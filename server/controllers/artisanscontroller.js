
import jwt from 'jsonwebtoken';
import Artist from '../models/artisians.js';
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Register Artist
export const registerArtist = async (req, res) => {
  console.log("Received POST request at /register");
  try {
    // Check if artist already exists
    const existingArtist = await Artist.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
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
    const token = jwt.sign(
      { id: artist._id, email: artist.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: "Registration successful", token });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
