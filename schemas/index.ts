import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  passwordConfirmation: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password",
  }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  passwordConfirmation: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

const ColorRgbSchema = z.object({
  r: z.number().min(0).max(255),
  g: z.number().min(0).max(255),
  b: z.number().min(0).max(255),
  a: z.number().min(0).max(1),
});

const ColorHsvSchema = z.object({
  h: z.number().min(0).max(360),
  s: z.number().min(0).max(100),
  v: z.number().min(0).max(100),
  a: z.number().min(0).max(1),
});

export const ChatbotSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  welcomeMessage: z.string().min(1, {
    message: "Welcome Message is required",
  }),
  colorScheme: z.object({
    hex: z.string(),
    rgb: ColorRgbSchema,
    hsv: ColorHsvSchema,
  }),
//   logo: z.string().min(1, {
//     message: "Logo is required",
//   }),
  knowledgeBase: z.string().min(1, {
    message: "Knowledge Base is required",
  }),
});
