const { z } = require("zod");

const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must not exceed 120 characters"),

  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  accountType: z.enum(["User", "Compliance Officer"]),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  signupSchema,
  loginSchema,
};