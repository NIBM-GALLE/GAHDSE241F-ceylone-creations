import Product from "../models/product.js";

export const addReview = async (req, res) => {
try{
    const { id } = req.params;
    const { rating, user, reviewtitle, comment } = req.body;

    if (!rating || !user || !reviewtitle || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const newReview = { rating, user, reviewtitle, comment };
    product.reviews.push(newReview);

    await product.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const getReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ reviews: product.reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
