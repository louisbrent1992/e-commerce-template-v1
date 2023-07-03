import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  reviewer_name: { type: String, required: true },
  review_text: { type: String, required: true },
  product_id: { type: Schema.Types.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Review', ReviewSchema);
