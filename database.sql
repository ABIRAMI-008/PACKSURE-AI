-- PackSure AI Database Schema
-- PostgreSQL

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ============================================
-- 1. USERS TABLE
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    account_type VARCHAR(30) DEFAULT 'User',
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 2. INSPECTIONS TABLE
-- ============================================

CREATE TABLE inspections (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT,
    product_name TEXT,
    brand TEXT,
    manufacturer TEXT,
    batch_number TEXT,
    mrp NUMERIC(10,2),
    net_quantity TEXT,
    manufacturing_date DATE,
    expiry_date DATE,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    status VARCHAR(30),
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 3. INGREDIENTS TABLE
-- ============================================

CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    inspection_id BIGINT NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    purpose TEXT,
    details TEXT,
    allergen TEXT,
    status VARCHAR(30)
);


-- ============================================
-- 4. COMPLIANCE CHECKS TABLE
-- ============================================

CREATE TABLE compliance_checks (
    id BIGSERIAL PRIMARY KEY,
    inspection_id BIGINT NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
    requirement TEXT NOT NULL,
    detected_information TEXT,
    status VARCHAR(30) NOT NULL,
    details TEXT
);


-- ============================================
-- 5. ISSUES TABLE
-- ============================================

CREATE TABLE issues (
    id BIGSERIAL PRIMARY KEY,
    inspection_id BIGINT NOT NULL REFERENCES inspections(id) ON DELETE CASCADE,
    issue_type TEXT,
    description TEXT NOT NULL,
    severity VARCHAR(20),
    recommendation TEXT
);


-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_inspections_user_id
ON inspections(user_id);

CREATE INDEX IF NOT EXISTS idx_inspections_created_at
ON inspections(created_at);

CREATE INDEX IF NOT EXISTS idx_inspections_status
ON inspections(status);

CREATE INDEX IF NOT EXISTS idx_ingredients_inspection_id
ON ingredients(inspection_id);

CREATE INDEX IF NOT EXISTS idx_compliance_checks_inspection_id
ON compliance_checks(inspection_id);

CREATE INDEX IF NOT EXISTS idx_issues_inspection_id
ON issues(inspection_id);