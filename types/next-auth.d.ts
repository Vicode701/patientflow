import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { CaseConversationSubset } from "./chat";

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
      idToken?: string;
      token: string;
    }
  }

declare module "next-auth" {
  interface Session {
    user: {
        userId: string;
        name: string;
        token: string;
        caseSubsets: CaseConversationSubset[] | null;
        provider: string;
    } & DefaultSession["user"]
  }
}
