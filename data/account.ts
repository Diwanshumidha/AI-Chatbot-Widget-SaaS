import { database } from "@/lib/prismadb";

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await database.account.findFirst({
            where: {
                userId,
            },
        });

        return account;
    } catch (error) {
        return null;
    }
}