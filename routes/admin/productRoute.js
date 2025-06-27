const {
  deleteProduct,
  editProduct,
  createProduct,
} = require("../../controller/admin/product/productController");
const {
  getProducts,
  getProduct,
} = require("../../controller/global/globalController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const isRestrictTo = require("../../middleware/isRestrictTo");
const upload = require("../../middleware/multerConfig");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

router
  .route("/")
  .post(
    isAuthenticated,
    isRestrictTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(getProducts));

router
  .route("/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, isRestrictTo("admin"), catchAsync(deleteProduct))
  .patch(
    isAuthenticated,
    isRestrictTo("admin"),
    upload.single("productImage"),
    catchAsync(editProduct)
  );

module.exports = router;
