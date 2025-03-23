import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    try {
        const conn = await connect('mongodb+srv://root:Bs_48x$T15@cluster0.7qgvr.mongodb.net/ceylone-creation?retryWrites=true&w=majority&appName=Cluster0',);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
