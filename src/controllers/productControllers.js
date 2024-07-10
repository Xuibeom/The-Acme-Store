const client = require("../../server/db");
const uuid = require("uuid");

// PRODUCTS
const fetchProducts = async (req, res) => {
  const SQL = `
            SELECT * FROM products
            `;
  const response = await client.query(SQL);
  console.log(response);
  res.send(response.rows);
};

const createProduct = async (req, res) => {
  const name = req.body.name;
  const SQL = `
      INSERT INTO products(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  res.send(response.rows);
};

module.exports = {
  fetchProducts,
  createProduct,
};
