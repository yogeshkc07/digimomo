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
  console.log(req.file);
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
