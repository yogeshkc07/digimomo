const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
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
        "Please enter product name,product description,product stock quantity,product status and product price",
    });
  }
  await Product.create({
    productName,
    productDescription,
    productStockQty,
    productStatus,
    productPrice,
  });
  res.status(201).json({
    message: "Product created successfully",
  });
};
//name,description,stockqty,status,price
