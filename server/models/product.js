import mongoose from 'mongoose';


const productschema = new mongoose.Schema({

    title: { type: String},
    price: { type: Number},
    description: { type: String},
    itemadded_date:{ type: Date },
    image: { type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    quantity: { type: Number},
    rating: { type: Number },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    
     
})

const Product = mongoose.model('Product', productschema);
export default Product;



