import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  email: z.email({ error: "Email must be a valid email address" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters long" }),
});
