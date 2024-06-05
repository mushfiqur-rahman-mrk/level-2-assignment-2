
import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

// Define Inventory Schema
const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
});

// Define Product Schema
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    text:true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  variants: [variantSchema],
  inventory: inventorySchema
});

export const ProductModel = model<Product>('Student', productSchema);