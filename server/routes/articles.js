const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Article = require("../models/ArticleModel");
const User = require("../models/UserModel");
/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Operations related to articles
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     description: Create a new article with a title, content, and author
 *     tags: [Articles]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the article
 *                 content:
 *                   type: string
 *                   description: The content of the article
 *                 author:
 *                   type: integer
 *                   description: The ID of the author
 *     responses:
 *       '201':
 *         description: Successfully created the article
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

// Endpoint to create a new article
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  // Validation
  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ message: "Tytuł, treść artykułu oraz autor są wymagane" });
  }

  try {
    const authorExists = await User.findById(author);
    if (!authorExists) {
      return res
        .status(400)
        .json({ message: "Autor o podanym ID nie istnieje, stwórz autora!" });
    }

    const newArticle = await Article.create(title, content, author);
    res.status(201).json({
      message: "Artykuł został pomyślnie dodany",
      article: newArticle,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve a list of all articles
 *     tags: [Articles]
 *     responses:
 *       '200':
 *         description: A list of articles
 */
router.get("/", async (req, res) => {
  try {
    const articles = await Article.getAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Endpoint do usuwania artykułu
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     description: Delete an article by its ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the article to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted the article
 *       '404':
 *         description: Article not found
 */
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Article.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ message: "Artykuł nie został znaleziony" });
    }
    res.status(200).json({ message: "Artykuł został pomyślnie usunięty" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//DETAILS ENDPOINT
/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article details by ID
 *     description: Retrieve details of an article by its ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the article to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the article
 *       '404':
 *         description: Article not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.getById(id);
    if (!article) {
      return res.status(404).json({ message: "Artykuł nie został znaleziony" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
