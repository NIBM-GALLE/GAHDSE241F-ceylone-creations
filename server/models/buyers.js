const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String   
});

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;