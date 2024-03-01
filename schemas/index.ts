import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }),
    passwordConfirmation: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(1, {
        message: 'Please enter a valid password'
    })
})

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    })
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }),
    passwordConfirmation: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    })
})

export const ChatbotSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    colorScheme: z.string().min(1, {
        message: 'Color Scheme is required'
    }),
    logo: z.string().min(1, {
        message: 'Logo is required'
    }),
    knowledgeBase: z.string().min(1, {
        message: 'Knowledge Base is required'
    }),
    })