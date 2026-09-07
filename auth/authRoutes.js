const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe
} = require("./authController");

const authenticateToken = require("./authMiddleware");

const validate = require("./validationMiddleware");

const {
  signupSchema,
  loginSchema
} = require("./authValidation");

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authenticateToken,
  getMe
);

module.exports = router;