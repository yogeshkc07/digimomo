const Product = require("../../model/productModel");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    res.status(400).json({
      message: "No products found",
      data: [],
    });
  } else {
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
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
  const productReviews = await Review.find({ productId: id })
    .populate("userId")
    .populate("productId");
  if (!product) {
    res.status(400).json({
      message: "No product found with that product id",
      dat: { data: [], data2: [] },
    });
  } else {
    res.status(200).json({
      message: "Product fetched successfully",
      data: { product, productReviews },
    });
  }
};
