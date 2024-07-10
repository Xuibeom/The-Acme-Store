const router = require("express").Router();
const {
  fetchFavorites,
  createFavorite,
  destroyFavorite,
} = require("../controllers/favoriteControllers");

router.get("/all", fetchFavorites);
router.post("/new", createFavorite);
router.delete("/delete", destroyFavorite);
module.exports = router;
