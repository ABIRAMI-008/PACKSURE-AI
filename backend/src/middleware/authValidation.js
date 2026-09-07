const { z } = require("zod");

const signupSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),

    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long")
});

const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(1, "Password is required")
});

module.exports = {
    signupSchema,
    loginSchema
};