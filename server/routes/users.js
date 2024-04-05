const express = require("express");
const router = express.Router();
const User = require("../models/UserModel"); // Importuj model User
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with username, email, password, gender, and age
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - gender
 *               - age
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: The gender of the user
 *               age:
 *                 type: integer
 *                 description: The age of the user
 *     responses:
 *       '201':
 *         description: Successfully created the user
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal Server Error
 */
router.post("/", async (req, res) => {
  const { username, email, password, gender, age } = req.body;

  // Validation
  if (!username || !email || !password || !gender || !age) {
    return res.status(400).json({
      message: "Username, email, password, gender, and age are required",
    });
  }

  try {
    const existingUser = await User.findByUsernameOrEmail(username, email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already in use" });
    }

    // Create a new user
    const newUser = await User.create(username, email, password, gender, age);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the user.
 *                   username:
 *                     type: string
 *                     description: The username of the user.
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                   gender:
 *                     type: string
 *                     description: The gender of the user.
 *                   age:
 *                     type: integer
 *                     description: The age of the user.
 *       '500':
 *         description: Internal Server Error.
 */

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.getAllUsers();

    // Send the retrieved users as a response
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /users/settings:
 *   put:
 *     summary: Update user settings
 *     description: Update user settings such as username, email, password, gender, and age
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: User's gender
 *               age:
 *                 type: integer
 *                 description: User's age
 *     responses:
 *       '200':
 *         description: Successfully updated user settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.put("/settings", verifyToken, async (req, res) => {
  const { username, email, password, gender, age } = req.body;
  const userId = req.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save the updated user data
    const updatedUser = await User.update(userId, {
      username,
      email,
      password,
      gender,
      age,
    });

    res.status(200).json({
      message: "User settings have been successfully updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
