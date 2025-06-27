const Product = require("../../../model/productModel");
const fs = require("fs");

exports.createProduct = async (req, res) => {
  const file = req.file;
  let filepath;
  if (!file) {
    filepath =
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-madebymath-90946.jpg&fm=jpg";
  } else {
    filepath = file.filename;
  }
  const {
    productName,
    productDescription,
    productStockQty,
    productStatus,
    productPrice,
  } = req.body;
  if (
    !productName ||
    !productDescription ||
    !productStockQty ||
    !productStatus ||
    !productPrice
  ) {
    return res.status(400).json({
      message:
        "Please enter product name,product description,product stock quantity,product status and product price ",
    });
  }
  await Product.create({
    productName,
    productDescription,
    productStockQty,
    productStatus,
    productPrice,
    productImage: process.env.BACKEND_URL + filepath,
  });
  res.status(201).json({
    message: "Product created successfully",
  });
};
//name,description,stockqty,status,price

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "please provide product Id",
    });
  }
  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No products found with that id",
    });
  }
  const oldProductImage = oldData.productImage;
  const lengthToCut = process.env.BACKEND_URL.length;
  const finalPathAfterCut = oldProductImage.slice(lengthToCut);

  fs.unlink("./uploads/" + finalPathAfterCut, (err) => {
    if (err) {
      console.log("error deleting file", err);
    } else {
      console.log("file deleted successfully");
    }
  });

  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product deleted successfully",
  });
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productStockQty,
    productStatus,
    productPrice,
  } = req.body;
  if (
    !productName ||
    !productDescription ||
    !productStockQty ||
    !productStatus ||
    !productPrice
  ) {
    return res.status(400).json({
      message:
        "Please enter product name,product description,product stock quantity,product status,id and product price ",
    });
  }

  const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(400).json({
      message: "No products found with that id",
    });
  }
  const oldProductImage = oldData.productImage;
  const lengthToCut = process.env.BACKEND_URL.length;
  const finalPathAfterCut = oldProductImage.slice(lengthToCut);
  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + finalPathAfterCut, (err) => {
      if (err) {
        console.log("error deleting file", err);
      } else {
        console.log("file deleted successfully");
      }
    });
  }
  const product = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productStockQty,
      productStatus,
      productPrice,
      productImage:
        req.file && req.file.filename
          ? process.env.BACKEND_URL + req.file.filename
          : oldProductImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Product updated successfully",
    data: product,
  });
};
