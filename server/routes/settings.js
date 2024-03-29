const express = require("express");
const router = express.Router();
const users = require("../mocks/users");
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Operations related to user settings
 */

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update user settings
 *     description: Update user settings such as first name and last name
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *     responses:
 *       '200':
 *         description: Successfully updated user settings
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
router.put("/", verifyToken, (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.userId;
  // Find the user in the mock users data
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  // Update user data
  users[userIndex].firstName = firstName || users[userIndex].firstName;
  users[userIndex].lastName = lastName || users[userIndex].lastName;
  res.status(200).json({
    message: "User settings have been successfully updated",
    user: users[userIndex],
  });
});

module.exports = router;
