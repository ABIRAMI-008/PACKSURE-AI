const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");


// =========================
// SIGNUP
// =========================
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            `INSERT INTO users
                (name, email, password_hash)
             VALUES
                ($1, $2, $3)
             RETURNING
                id, name, email, account_type, created_at`,
            [name, email, passwordHash]
        );

        res.status(201).json({
            success: true,
            message: "Signup successful",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Signup error:", error.message);

        res.status(500).json({
            success: false,
            message: "Signup failed"
        });
    }
};


// =========================
// LOGIN
// =========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                password_hash,
                account_type
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                account_type: user.account_type
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Send response
        res.json({
            success: true,
            message: "Login successful",
            token: token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                account_type: user.account_type
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};


module.exports = {
    signup,
    login
};