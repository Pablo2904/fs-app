const express = require("express");
const router = express.Router();
const articles = require("../mocks/articles");
const verifyToken = require("../middleware/authMiddleware");

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

// Endpoint do pobierania wszystkich artykułów
router.get("/", (req, res) => {
  setTimeout(() => {
    res.status(200).json(articles);
  }, 1500); // 1000 milliseconds (1 second) delay
});

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
