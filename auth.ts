import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from "./lib/prismadb";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      //   Allow Google provider to sign in without verifying email
      if (account?.provider !== "credentials") {
        return true;
      }

      //  Find the existing user by ID if they used the credentials provider
      const existingUser = await getUserById(user.id ?? "");

      // prevent sign in if the user is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      // console.log("token in session", token);
      // console.log("session in session", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOAuth: token.isOauth,
        },
      };
    },
    async jwt({ token }) {
      // console.log("token in jwt", token);
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
  },
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(database),
});
