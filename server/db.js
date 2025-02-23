const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://root:Bs_48x$T@cluster0.nleyw.mongodb.net/ceylone-creationsdb?retryWrites=true&w=majority&appName=Cluster0',);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
