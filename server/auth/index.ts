import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { database } from "@/database";
import { accounts, users, verificationTokens } from "@/database/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database, {
    accountsTable: accounts,
    usersTable: users,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ResendProvider({
      from: "damriabdellah@gmail.com",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.picture = token.picture;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: { strategy: "jwt" },
});
