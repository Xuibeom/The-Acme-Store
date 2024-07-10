// Functionally works as createTables
const pg = require("pg");
const uuid = require("uuid");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost/the_acme_store"
);
module.exports = client;

const init = async () => {
  client.connect();
  const SQL = `
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS favorites CASCADE;
      CREATE TABLE users(
          id UUID PRIMARY KEY,
          username VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL
      );
      CREATE TABLE products(
          id UUID PRIMARY KEY,
          name VARCHAR(255) NOT NULL
      );
      CREATE TABLE favorites(
          id UUID PRIMARY KEY,
          user_id UUID REFERENCES users(id) NOT NULL,
          product_id UUID REFERENCES products(id) NOT NULL,
          CONSTRAINT unique_user_id_product_id UNIQUE (user_id, product_id)
      );
  `;
  client.query(SQL);
};

const seedTable = async () => {
  try {
    const usersCheck = await client.query("SELECT COUNT(*) FROM users");
    const productsCheck = await client.query("SELECT COUNT(*) FROM products");
    const favoritesCheck = await client.query("SELECT COUNT(*) FROM favorites");

    console.log(favoritesCheck.rows[0]);
    if (
      usersCheck.rows[0].count == 0 &&
      productsCheck.rows[0].count == 0 &&
      favoritesCheck.rows[0].count == 0
    ) {
      console.log("Seeding tables...");

      const userId = uuid.v4();
      const insertUserSQL = `
          INSERT INTO users(id, username, password)
          VALUES ($1, $2, $3)
        `;
      await client.query(insertUserSQL, [userId, "testuser", "password123"]);

      const productId = uuid.v4();
      const insertProductSQL = `
          INSERT INTO products(id, name)
          VALUES ($1, $2)
        `;
      await client.query(insertProductSQL, [productId, "Sample Product"]);

      const favoriteId = uuid.v4();
      const insertFavoriteSQL = `
          INSERT INTO favorites(id, user_id, product_id)
          VALUES ($1, $2, $3)
        `;
      await client.query(insertFavoriteSQL, [favoriteId, userId, productId]);

      console.log("Seeding complete.");
    } else {
      console.log("Tables are not empty. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding tables:", error.message);
  }
};

// seedTable();
// init();
