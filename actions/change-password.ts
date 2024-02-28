"use server";

import { getPasswordResetTokenbyToken } from "@/data/password-reset-token";
import { database } from "@/lib/prismadb";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const changePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  // If token doesn't exist, return an error
  if (!token) {
    return { error: "No token found." };
  }

  // Check to see if token exists in database
  const passwordResetTokenExists = await getPasswordResetTokenbyToken(token);

  // If the token doesn't exist, return an error
  if (!passwordResetTokenExists) {
    return { error: "This token doesn't exists." };
  }

  // If the token exists, check if it's expired
  const hasExpired =
    new Date(passwordResetTokenExists.expires).getTime() < new Date().getTime();

  // If the token has expired, return an error
  if (hasExpired) {
    return {
      error: "This token has expired, please resend a password reset email.",
    };
  }

  // Check to see if input fields are both valid
  const validatedPassword = NewPasswordSchema.safeParse(values);

  // If the input fields are invalid, return an error
  if (!validatedPassword.success) {
    return { error: "Please type in a valid password." };
  }

  // Destructure the 'password' and 'passwordConfirmation' property from the 'validatedPassword.data' object
  const { password, passwordConfirmation } = validatedPassword.data;

  // See if password and passwordConfirmation match
  if (password !== passwordConfirmation) {
    return { error: "Passwords do not match." };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password
  await database.user.update({
    where: {
      email: passwordResetTokenExists.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  // Delete the password reset token
  await database.passwordResetToken.delete({
    where: {
      id: passwordResetTokenExists.id,
    },
  });

  // Return a success message
  return { success: "Your password has been updated." };
};
