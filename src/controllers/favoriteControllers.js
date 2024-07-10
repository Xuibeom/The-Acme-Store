const client = require("../../server/db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// FAVORITES
const fetchFavorites = async (req, res) => {
  const SQL = `
            SELECT * FROM favorites
            `;
  const response = await client.query(SQL);
  console.log(response);
  res.send(response.rows);
};

const createFavorite = async (req, res, next) => {
  const SQL = `
        INSERT INTO favorites(id, user_id, product_id) VALUES($1, $2, $3) RETURNING *
        `;
  const response = await client.query(SQL, [
    uuid.v4(),
    req.body.user_id,
    req.body.product_id,
  ]);
  console.log(response.rows);
  res.send(response.rows);
};

const destroyFavorite = async (req, res, next) => {
  const SQL = `
  DELETE FROM favorites
  WHERE id = $1 AND user_id = $2 AND product_id = $3
  RETURNING *
`;
  await client.query(SQL, [uuid.v4(), req.body.user_id, req.body.product_id]);
  res.sendStatus(204);
};

module.exports = {
  fetchFavorites,
  createFavorite,
  destroyFavorite,
};
