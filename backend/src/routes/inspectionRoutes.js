const express = require("express");

const {
    analyzeInspection,
    getInspections,
    getInspectionById
} = require("../controllers/inspectionController");

const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Analyze product package
router.post(
    "/analyze",
    authenticateToken,
    upload.single("image"),
    analyzeInspection
);

// Get all inspections
router.get(
    "/",
    authenticateToken,
    getInspections
);

// Get one inspection
router.get(
    "/:id",
    authenticateToken,
    getInspectionById
);

module.exports = router;


