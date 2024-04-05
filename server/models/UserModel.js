const pool = require("../db");
const bcrypt = require("bcrypt");

const User = {};

User.create = async (username, email, password, gender, age) => {
  try {
    const query = {
      text: "INSERT INTO users(username, email, password, gender, age) VALUES($1, $2, $3, $4, $5) RETURNING *",
      values: [username, email, password, gender, age],
    };

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

User.findByUsernameOrEmail = async (username, email) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE username = $1 OR email = $2",
      values: [username, email],
    };

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

User.findById = async (id) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

User.update = async (id, { username, email, password, gender, age }) => {
  try {
    let updateValues = [];
    let updateQuery = "UPDATE users SET";

    if (username !== undefined) {
      updateQuery += " username = $1,";
      updateValues.push(username);
    }
    if (email !== undefined) {
      updateQuery += " email = $2,";
      updateValues.push(email);
    }
    if (password !== undefined) {
      updateQuery += " password = $3,";
      updateValues.push(password);
    }
    if (gender !== undefined) {
      updateQuery += " gender = $4,";
      updateValues.push(gender);
    }
    if (age !== undefined) {
      updateQuery += " age = $5,";
      updateValues.push(age);
    }

    // Remove the trailing comma and add WHERE condition
    updateQuery = updateQuery.slice(0, -1) + " WHERE id = $6 RETURNING *";
    updateValues.push(id);

    const query = {
      text: updateQuery,
      values: updateValues,
    };

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

User.login = async (usernameOrEmail, password) => {
  try {
    const user = await User.findByUsernameOrEmail(
      usernameOrEmail,
      usernameOrEmail
    );

    if (!user) {
      throw new Error("User not found");
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

User.getAllUsers = async () => {
  try {
    const query = "SELECT * FROM users";

    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
