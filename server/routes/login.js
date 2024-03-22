const express = require("express");
const router = express.Router();
const users = require("../mocks/users");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

// Endpoint do logowania użytkownika
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // Wyszukiwanie użytkownika w pamięci RAM
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Nieprawidłowy email lub hasło" });
  }
  // Generowanie tokena JWT
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ message: "Zalogowano pomyślnie", token });
});

module.exports = router;
