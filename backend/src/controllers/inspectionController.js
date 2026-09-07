const pool = require("../config/database");

// ANALYZE INSPECTION
const analyzeInspection = async (req, res) => {
    try {
        // Check whether image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product package image is required"
            });
        }

        // Create inspection record
        const result = await pool.query(
            `INSERT INTO inspections
             (user_id, image_filename, status)
             VALUES ($1, $2, $3)
             RETURNING id, user_id, image_filename, status, created_at`,
            [
                req.user.id,
                req.file.filename,
                "pending"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Image uploaded and inspection created",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Inspection error:", error.message);

        res.status(500).json({
            success: false,
            message: "Inspection failed"
        });
    }
};


// GET ALL INSPECTIONS
const getInspections = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, image_filename, status, created_at
             FROM inspections
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error("Get inspections error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch inspections"
        });
    }
};


// GET SINGLE INSPECTION
const getInspectionById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT id, image_filename, status, created_at
             FROM inspections
             WHERE id = $1 AND user_id = $2`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Inspection not found"
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Get inspection error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch inspection"
        });
    }
};


module.exports = {
    analyzeInspection,
    getInspections,
    getInspectionById
};