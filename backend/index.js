const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

const contactRoutes = require('./routes/contactRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const articleRoutes = require('./routes/articleRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined.');
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Ceylon Creations API');
});

app.use('/api', contactRoutes);
app.use('/api', reviewRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/subscribe', subscriptionRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
    console.error("Global error handler caught an error:");
    console.error("Error Message:", err.message);
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        console.error("Error Stack:", err.stack);
    }

    if (res.headersSent) {
      return next(err);
    }

    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || 'An unexpected internal server error occurred.';

    if (err instanceof multer.MulterError) {
        statusCode = 400;
        message = `File upload error: ${err.message}`;
        if (err.code === 'LIMIT_FILE_SIZE') {
            message = 'File is too large. Max 5MB allowed.';
        }
    } else if (err.message && err.message.startsWith('Error: File upload only supports')) {
        statusCode = 400;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    res.status(statusCode).json({
        message: message,
        ...( (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) && { errorType: err.name, errorCode: err.code })
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});