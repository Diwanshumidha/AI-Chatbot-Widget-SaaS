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

function isFileObject(obj: any): obj is File {
  return (
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    "name" in obj[0] &&
    "size" in obj[0] &&
    "type" in obj[0] &&
    "lastModified" in obj[0]
  );
}

// Custom schema for the file object
const FileObjectSchema = z
  .custom<File[]>(
    (value) => {
      if (isFileObject(value)) {
        return value;
      } else {
        return false;
      }
    },
    { message: "Logo is Required" }
  )
  .refine(
    (val) => val[0]?.type?.startsWith("image/"),
    "Only Images are supported"
  );
function isKnowledgebaseObject(obj: any): obj is File {
  return (
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    "name" in obj[0] &&
    "size" in obj[0] &&
    "type" in obj[0] &&
    "lastModified" in obj[0]
  );
}

// Custom schema for the file object
const KnowObjectSchema = z
  .custom<File[]>(
    (value) => {
      if (isFileObject(value)) {
        return value;
      } else {
        return false;
      }
    },
    { message: "Logo is Required" }
  )
  .refine((val) => {
    const allowedTypes = [
      "text/x-c",
      "text/x-c++",
      "application/csv",
      "text/html",
      "text/x-java",
      "application/json",
      "text/markdown",
      "application/pdf",
      "text/x-php",
      "text/x-python",
      "text/x-script.python",
      "text/x-ruby",
      "text/x-tex",
      "text/plain",
  ];
  return allowedTypes.some(type => val[0]?.type === type);
}, "Only Images, PDFs, CSVs, and text files are supported");

  
export const ChatbotSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  instructions: z.string().min(1, {
    message: "Instructions are required",
  }),
  welcomeMessage: z.string().min(1, {
    message: "Welcome Message is required",
  }),
  colorScheme: z.object({
    hex: z.string(),
    rgb: ColorRgbSchema,
    hsv: ColorHsvSchema,
  }),
  logo: FileObjectSchema,
  knowledgeBase: KnowObjectSchema
});