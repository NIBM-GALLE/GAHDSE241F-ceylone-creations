import mongoose from 'mongoose';


const productschema = new mongoose.Schema({

    title: { type: String},
    price: { type: Number},
    description: { type: String},
    itemadded_date:{ type: Date },
    images: [
        {
          color: { type: String, required: true }, // Store hex code or color name
          urls: [{ type: String, required: true }], // List of image URLs for this color
        }
      ],
    // additionalImages: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    categoryname: { type: String},
    quantity: { type: Number},
    reviews: [{ 
        rating: Number,
        user: String,
        reviewtitle: String,
        comment:String,

    }],
  shippingDetails:{
    profileName:String,
    country: String,
    postalCode: String,
    processingTime: {
      min: Number,
      max: Number,
      unit: String,
    },
    shippingService: String,
    deliveryTime: {
      min: Number,
      max: Number,
    },
    cost: String,
  },     

  renewalOption: {
    type: String,
    enum: ["automatic", "manual"], // Restricts value to "automatic" or "manual"
    required: true, // Ensures it's always provided
    default: "manual", // Default value if not specified
  },
})

const Product = mongoose.model('Product', productschema);
export default Product;



