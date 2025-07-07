import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stockQuantity: Number,
  imageURL: String,
});

export default mongoose.model('Product', productSchema);
