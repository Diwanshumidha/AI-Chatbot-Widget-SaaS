import { database } from "@/lib/prismadb";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await database.verificationToken.findFirst({
            where: {
                email,
            },
        })

        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await database.verificationToken.findFirst({
            where: {
                token,
            },
        })

        return verificationToken;
    } catch (error) {
        return null;
    }
}