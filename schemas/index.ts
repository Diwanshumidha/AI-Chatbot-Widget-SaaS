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