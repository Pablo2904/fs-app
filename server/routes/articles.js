const express = require("express");
const router = express.Router();
const articles = require("../mocks/articles");
const verifyToken = require("../middleware/authMiddleware");

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
 *     description: Create a new article with a title and content
 *     tags: [Articles]
 *     parameters:
 *       - in: body
 *         name: article
 *         description: The article to create
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - content
 *           properties:
 *             title:
 *               type: string
 *               description: The title of the article
 *             content:
 *               type: string
 *               description: The content of the article
 *     responses:
 *       '201':
 *         description: Successfully created the article
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */

// Endpoint do dodawania artykułu
router.post("/", verifyToken, (req, res) => {
  const { title, content } = req.body;
  // Walidacja danych - tutaj możesz dodać bardziej zaawansowaną walidację
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Tytuł i treść artykułu są wymagane" });
  }
  // Tworzenie nowego artykułu
  const newArticle = {
    id: articles.length + 1,
    title,
    content,
    author: req.userId,
  };
  articles.push(newArticle);
  res
    .status(201)
    .json({ message: "Artykuł został pomyślnie dodany", article: newArticle });
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

// Endpoint do pobierania wszystkich artykułów
router.get("/", (req, res) => {
  setTimeout(() => {
    res.status(200).json(articles);
  }, 1500); // 1000 milliseconds (1 second) delay
});

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

// Endpoint do usuwania artykułu
router.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex((article) => article.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Artykuł nie został znaleziony" });
  }
  // Usunięcie artykułu
  articles.splice(index, 1);
  res.status(200).json({ message: "Artykuł został pomyślnie usunięty" });
});

module.exports = router;
