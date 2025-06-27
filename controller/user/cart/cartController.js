const Product = require("../../../model/productModel");
const User = require("../../../model/userModel");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({
      message: "please provide ProductId",
    });
  }
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(404).json({
      message: "No product with that product Id",
    });
  }
  const user = await User.findById(userId);
  user.cart.push(productId);
  await user.save();
  res.status(200).json({
    message: "Product added to cart",
  });
};

exports.getMyCartItems = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate({
    path: "cart",
    select: "-produtStatus",
  });
  res.status(200).json({
    message: "Cart Item fetched successfully",
    data: userData.cart,
  });
};

exports.deletItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({
      message: "No product with that product ID",
    });
  }

  //get user cart
  const user = await User.findById(userId);
  user.cart = user.cart.filter((pId) => pId != productId);
  await user.save();
  res.status(200).json({
    message: "Item removed from cart",
  });
};
