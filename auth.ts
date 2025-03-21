import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser } from "@/lib/userService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // session: {
  //   strategy: "jwt", // Use JWT-based session
  //   maxAge: 60 * 15, // Expire in 5 seconds
  // },
  callbacks: {
    async signIn({ user }) {
      try {
        await findOrCreateUser(user.email!, user.name!);
      } catch (error) {
        console.error("Error saving user:", error);
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      // Only store user data that is available in the `user` object
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image; // If image is available
      }
      return token;
    },

    async session({ session, token }) {
      // Override values in session.user with token data
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    },
  },
});
