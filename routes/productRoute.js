const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRestrictTo = require("../middleware/isRestrictTo");

const router = require("express").Router();

router
  .route("/product")
  .post(isAuthenticated, isRestrictTo("admin"), createProduct);

module.exports = router;
