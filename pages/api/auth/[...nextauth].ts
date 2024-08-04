import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "../../../lib/firestore";
import type { Adapter } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import type { Account, Profile, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter(firestore) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
     session.user = token;
      return session;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: any;
      isNewUser?: boolean;
      trigger?: "update" | "signIn" | "signUp";
      session?: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.id || user?.id;
      }
      if (trigger === "update") {
        return {...token, ...session.user}
      }
      return token;
      
    },
  },
};

export default NextAuth(authOptions);
