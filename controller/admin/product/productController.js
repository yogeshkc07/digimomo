const Product = require("../../../model/productModel");

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
    productImage: `http://localhost:${process.env.PORT}` + filepath,
  });
  res.status(201).json({
    message: "Product created successfully",
  });
};
//name,description,stockqty,status,price

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    res.status(400).json({
      message: "No products found",
      products: [],
    });
  } else {
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "please provide product Id",
    });
  }
  const product = await Product.findById(id);
  if (!product) {
    res.status(400).json({
      message: "No product found with that product id",
      product: [],
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  }
};
