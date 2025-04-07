import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const buyerSchema = new mongoose.Schema({
    firstname: { type: String, },
    lastname: { type: String, },
    email: { type: String, unique: true, }, // Enforce unique email
    password: { type: String,}, // Ensure password is required
    phone: { type: String, unique: true, }, // Enforce unique phone
    address: { type: String },
    dob: { type: Date },
    location: { type: String },
    alternateMobile:{ type: String },
    gender: { type: String },
    role: { type: String, default: 'buyer' },
    profilepicture: { type: String } // Optional, remove if not needed

});

//  Hash password before saving only when modified
buyerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

// Add a method to compare passwords during login
buyerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
