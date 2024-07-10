const router = require("express").Router();
const {
  fetchProducts,
  createProduct,
} = require("../controllers/productControllers");

router.get("/all", fetchProducts);
router.post("/new", createProduct);
module.exports = router;
