import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Required"),
  password: z.string().min(8, "Password Should have minimum 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Email is Required"),
  password: z.string().min(1, "Password is Required"),
  lastLoginAddress: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email is Required"),
});

export type TRegisterAdmin = z.infer<typeof registerSchema>;
export type TLoginAdmin = z.infer<typeof loginSchema>;
