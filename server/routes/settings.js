const express = require("express");
const router = express.Router();
const users = require("../mocks/users");
const verifyToken = require("../middleware/authMiddleware");

// Endpoint do zmiany opcji konta użytkownika
router.put("/", verifyToken, (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.userId;
  // Znalezienie użytkownika w pamięci RAM
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: "Użytkownik nie został znaleziony" });
  }
  // Aktualizacja danych użytkownika
  users[userIndex].firstName = firstName || users[userIndex].firstName;
  users[userIndex].lastName = lastName || users[userIndex].lastName;
  res.status(200).json({
    message: "Opcje konta zostały pomyślnie zaktualizowane",
    user: users[userIndex],
  });
});

module.exports = router;
