const pool = require("../db");

const Article = {};

Article.create = async (title, content, authorId) => {
  const query = {
    text: "INSERT INTO articles(title, content, author) VALUES($1, $2, $3) RETURNING *",
    values: [title, content, authorId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating article:", error);
    throw error; // Propagate the error for handling in the controller or service layer
  }
};

Article.getAll = async () => {
  const query = "SELECT * FROM articles";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Propagate the error for handling in the controller or service layer
  }
};

Article.deleteById = async (id) => {
  const query = {
    text: "DELETE FROM articles WHERE id = $1",
    values: [id],
  };

  try {
    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error; // Propagate the error for handling in the controller or service layer
  }
};

module.exports = Article;
