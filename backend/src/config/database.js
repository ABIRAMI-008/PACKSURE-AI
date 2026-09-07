const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
    console.log("PostgreSQL database connected successfully");
});

pool.on("error", (err) => {
    console.error("PostgreSQL error:", err.message);
});

module.exports = pool;