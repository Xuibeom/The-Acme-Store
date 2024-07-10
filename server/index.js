const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});

const userRoutes = require("../src/routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("../src/routes/productRoutes");
app.use("/api/products", productRoutes);
