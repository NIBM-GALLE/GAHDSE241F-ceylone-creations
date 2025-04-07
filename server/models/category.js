import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String },
}, { collection: 'category' });

const category = mongoose.model("category", categorySchema);
export default category;