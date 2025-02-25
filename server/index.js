//mongodb+srv://atlas-sample-dataset-load-67bd601aa245aa28dec407bd:<db_password>@cluster0.7qgvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require('express');
const connectDB = require('./db');
const Buyer = require('./models/buyers');
const core = require('cors');


const app = express();
app.use(core());
app.use(express.json());
connectDB();

app.get('/', async (req, res) => {
    const response = await Buyer.find();
    return res.json({ Buyer: response });
});


app.listen(3000, () => {
    console.log('Server is running on port 3001');
});
