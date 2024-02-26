import {database} from "@/lib/prismadb";


export const getPasswordResetTokenbyToken = async (token: string) => {
    try {
        const passwordResetToken = await database.passwordResetToken.findFirst({
            where: {
                token,
            },
        })

        return passwordResetToken;
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await database.passwordResetToken.findFirst({
            where: {
                email,
            },
        })

        return passwordResetToken;
    } catch (error) {
        return null;
    }
}