import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  // session: {
  //   strategy: "jwt", // Use JWT-based session
  //   maxAge: 60 * 15, // Expire in 5 seconds
  // },
});
