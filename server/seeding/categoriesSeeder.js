const Category = require("../models/product_categories")
const connectDB = require('../config/db');

// Connect to MongoDB
connectDB();

// Define all categories
const categories = [
  { name: "Handwoven Textiles & Clothing" },
  { name: "Handmade Jewelry & Accessories" },
  { name: "Woodcraft & Furniture" },
  { name: "Pottery & Ceramics" },
  { name: "Traditional Sri Lankan Masks & Sculptures" },
  { name: "Hand-painted & Artistic Items" },
  { name: "Natural & Herbal Products" },
  { name: "Cane, Rattan & Coconut Shell Products" },
  { name: "Hand-stitched & Embroidered Goods" },
  { name: "Recycled & Upcycled Crafts" },
  { name: "Handmade Leather Goods" },
  { name: "Traditional Batik & Dyed Fabrics" },
  { name: "Eco-friendly & Sustainable Products" },
  { name: "Metal & Brass Handicrafts" },
  { name: "Bamboo & Palm Leaf Creations" },
  { name: "Hand-carved Wooden Utensils" },
  { name: "Paper & Stationery Crafts" },
  { name: "Cultural & Ethnic Accessories" },
  { name: "Custom Artwork & Illustrations" },
  { name: "Handcrafted Home Décor Items" }
];

// Function to insert categories
async function insertCategories() {
  try {
    await Category.deleteMany(); // Optional: Clears existing categories
    await Category.insertMany(categories);
    console.log("Categories inserted successfully");
  } catch (error) {
    console.error("Error inserting categories:", error);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
}

// Run the seeding function
insertCategories();
