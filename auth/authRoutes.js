const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe
} = require("./authController");

const authenticateToken = require("./authMiddleware");

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Current logged-in user
router.get("/me", authenticateToken, getMe);

module.exports = router;