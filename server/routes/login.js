const express = require("express");
const router = express.Router();
const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to user authentication
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate a user by email and password and generate a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successfully authenticated
 *       '401':
 *         description: Unauthorized
 */
router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // Search for the user in the mock users data
    const user = await Users.login(email || username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

module.exports = router;
