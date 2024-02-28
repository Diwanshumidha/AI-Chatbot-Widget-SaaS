"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { database } from "@/lib/prismadb";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";

export const resetPassword = async (
  value: z.infer<typeof ResetPasswordSchema>
) => {
//   Check to see if the email is valid
    const validatedEmail = ResetPasswordSchema.safeParse(value);

    // If the email is invalid, return an error
    if (!validatedEmail.success) {
      return { error: "Please type in a valid email address." };
    }

    // Access the 'email' property from the 'validatedEmail.data' object
    const { email } = validatedEmail.data;

    // Check if the email exists in our database
    const userExists = await database.user.findFirst({
        where: {
            email
        },
    });

    // If the email doesn't exist, return an error
    if (!userExists) {
        return { error: "This email address is associated with an account." };
    }

    // Generate a reset password token
    const passwordResetToken = await generatePasswordResetToken(email)

    // Send a reset password email
    await sendPasswordResetEmail(email, passwordResetToken.token)

    //  Return a success message
    return { success: "A password reset email has been sent to your email address." };

};
