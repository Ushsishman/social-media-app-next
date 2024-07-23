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
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {

        token.id = (profile as any).id || user?.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
