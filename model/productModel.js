//name,description,stockqty,status,price

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    productDescription: {
      type: String,
      required: [true, "Product Description must be provided"],
    },
    productStockQty: {
      type: Number,
      required: [true, "Product Stock Quantity must be selected"],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
    },
    productPrice: {
      type: Number,
      required: [true, "Product price must be provided"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
