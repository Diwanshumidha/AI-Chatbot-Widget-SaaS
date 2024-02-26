import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { database } from './prismadb';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';


export const generateVerificationToken = async (email: string) => {
      const token = uuidv4();
      const expires = new Date().getTime() + 1000 * 15 * 60 * 1; // 15 minutes

      const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await database.verificationToken.delete({
                where: {
                        id: existingToken.id
                }
        });
    }

    const verificationToken = await database.verificationToken.create({
        data: {
                email,
                token,
                expires: new Date(expires) // Convert expires to a Date object
        }
    })

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
      const token = uuidv4();
        const expires = new Date().getTime() + 1000 * 15 * 60 * 1; // 15 minutes

        const existingToken = await getPasswordResetTokenByEmail(email)

        if(existingToken) {
                await database.passwordResetToken.delete({
                        where: {
                                id: existingToken.id
                        }
                });
        }

        const passwordResetToken = await database.passwordResetToken.create({
                data: {
                        email,
                        token,
                        expires: new Date(expires) // Convert expires to a Date object
                }
        })

        return passwordResetToken;
}