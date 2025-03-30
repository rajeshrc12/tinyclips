import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser } from "./lib/user-create";
import { User } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        // Assuming findOrCreateUser returns the user object with an id
        const dbUser = (await findOrCreateUser(user.email!, user.name!)) as User;
        // Store the user ID in the user object for JWT callback
        user.id = dbUser.id;
      } catch (error) {
        console.error("Error saving user:", error);
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to token
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.id = token.id as string; // Add user ID to session
      return session;
    },
  },
});
