import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [
    {
      url: String,
      alt: String,
      index: Number,
    },
  ],
});

export const ProductModel = mongoose.model("product", ProductSchema);
