const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const inspectionRoutes = require("./routes/inspectionRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/inspections", inspectionRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PACKSURE AI Backend is running"
    });
});

// Database test route
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "PostgreSQL connection successful",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// Central Error Handler
app.use((error, req, res, next) => {
    console.error("Server error:", error.message);

    // Multer file size error
    if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "File size must be less than 5 MB"
        });
    }

    // Multer file type error
    if (
        error.message ===
        "Only JPG, PNG and WEBP images are allowed"
    ) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    // General error
    return res.status(500).json({
        success: false,
        message: "Something went wrong on the server"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `PACKSURE AI Backend running on port ${PORT}`
    );
});