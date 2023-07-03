import mongoose, { Document, Schema } from 'mongoose';

export interface ProductDocument extends Document {
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String] },
    size: { type: [String] },
    color: { type: [String] },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model<ProductDocument>(
  'Product',
  ProductSchema
);
