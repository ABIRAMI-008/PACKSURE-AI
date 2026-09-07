const express = require("express");

const {
    signup,
    login
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
    signupSchema,
    loginSchema
} = require("../middleware/authValidation");

const router = express.Router();

// Signup
router.post(
    "/signup",
    validate(signupSchema),
    signup
);

// Login
router.post(
    "/login",
    validate(loginSchema),
    login
);

// Get current logged-in user
router.get(
    "/me",
    authenticateToken,
    (req, res) => {
        res.json({
            success: true,
            message: "Authentication successful",
            user: req.user
        });
    }
);

module.exports = router;