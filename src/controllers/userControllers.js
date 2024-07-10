const client = require("../../server/db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// USERS
const fetchUsers = async (req, res) => {
  const SQL = `
          SELECT * FROM users
          `;
  const response = await client.query(SQL);
  console.log(response);
  res.send(response.rows);
};

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const SQL = `
  INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *;
`;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    hashedPassword,
  ]);
  res.send(response.rows);
};

module.exports = {
  fetchUsers,
  createUser,
};
