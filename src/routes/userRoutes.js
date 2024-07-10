const router = require("express").Router();
const {
  fetchUsers,
  createUser,
  hashPassword,
} = require("../controllers/userControllers");

router.get("/all", fetchUsers);
router.post("/new", createUser);
module.exports = router;
