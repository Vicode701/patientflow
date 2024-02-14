import UserModel from "@/models/userModel";
import { CaseConversationSubset } from "@/types/chat";
import NextAuth, { Account, NextAuthOptions, Profile, Theme, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
//@ts-ignore
import clientPromise from "@/lib/mongoclient";
import { MongoDBAdapter, MongoDBAdapterOptions } from '@auth/mongodb-adapter';
import { type } from "os";
import { z } from "zod";
import CaseConversationModel from "@/models/caseModel";
import { AdapterUser } from "next-auth/adapters";
import nodemailer from 'nodemailer';
import startDb from "@/lib/db";

type LogedInUser = {
    userId: string;
    name: string;
    email: string;
    caseSubsets: CaseConversationSubset[] | null;
    provider: string | undefined;
  } | null;

interface Credentials extends Record<"name" | "email" | "password", string> {}

const credentialSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: MongoDBAdapter(clientPromise, ),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Email", type: "email", placeholder: "jsmith@domain.com" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "name" },
            },
            //@ts-ignore
            async authorize(credentials?: Credentials, req): Promise<LogedInUser | null> {
                if (!credentials) {
                    console.log(`credentials is null: ${credentials}`);
                    return null;
                }
                let user: LogedInUser = null;

                const email = credentials?.email;
                const password = credentials?.password;
                const name = credentials?.name;
                console.log(`email is ${JSON.stringify(email)}`);
                console.log(`name is ${JSON.stringify(name)}`);

                
                let response: Response;
                if (credentials?.name) {
                    console.log('Handling Login request');
                    await startDb();
                    try {
                        const foundUser = await UserModel.findOne({email: email});
                   
                        if (foundUser) {
                            console.log(`user ${email} already exists`);
                            return null;
                        }

                        const newUser = await UserModel.create({ email: email, password: password, name: name });
                        console.log(`Successfully created user ${newUser.email}`);
                                            
                        user =  {
                            userId: newUser._id,
                            email: newUser.email,
                            name: newUser.name,
                            caseSubsets: null,
                            provider: 'credentials'
                        }
                    } catch(err) {
                        console.log(`Failed to handle signup request ${err}`);
                    }
                } else {
                    console.log('Handling Login request');
                    await startDb();
                    try {
                        const foundUser = await UserModel.findOne({email: email}).select('+password');
                        console.log(`Finding user ${email}`);

                        if (!foundUser) {
                            return null;
                        }

                        console.log(`Found user in DB ${foundUser.email}`);
                        const passwordMatch = await foundUser.comparePassword(password!);
                        if(!passwordMatch) {
                            console.log(`password mismatch for user ${email}`);
                            return null
                        }

                        await UserModel.findOneAndUpdate(
                            { _id: foundUser._id }, // Filter condition
                            { isLoggedIn: true }, // Update operation
                        );

                        user =  {
                            userId: foundUser._id,
                            name: foundUser.name,
                            email: foundUser.email,
                            caseSubsets: null,
                            provider: 'credentials'
                        }
                        
                    } catch(err) {
                        console.log(`Error: Failed to handle login request ${err}`);
                    }
                }   
      
                if (!user) {
                throw new Error("User was not found and could not be created.")
                }
        
                return user      
            }
        }),
        Email({
            server: {
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT),
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest: async ({ identifier: email, url, theme, provider: { server, from } }) => {
                const { host } = new URL(url);
                const whitelist = ['jedidiahesther@gmail.com','foluyadi@gmail.com', 'sunkanmi.laplace@gmail.com', 'oluyadikhalid@gmail.com', 'christopher.pun26@gmail.com', 'ooluwadeyi@gmail.com', 'sekhonrosie@hotmail.com'];
                if (!whitelist.includes(email.toLowerCase())) {
                    throw new Error('Email not on whitelist');
                }

                console.log(`Attempting login for user ${email}`);
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT),
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                const result = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,  // sender address
                    to: email,  // receiver address
                    subject: `Sign in to ${host}`,
                    text: text({ url, host }),
                    html: html({ url, host, theme }),
                })
                const failed = result.rejected.concat(result.pending).filter(Boolean)
                if (failed.length) {
                    console.log(`Failed to send magic link for user ${email}`);
                    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
                }

                console.log(`Sent magic link for user ${email}`);
            }
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
        // AppleProvider({
        //     clientId: process.env.APPLE_CLIENT_ID!,
        //     clientSecret: process.env.APPLE_CLIENT_SECRET!
        // })
    ],
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    callbacks: {
        async signIn({user, account, profile, email}) {
            // const userEmail = user.email || "";
            // console.log(`Finding user ${userEmail}`);
            // console.log(`Provider is ${account?.provider}`);
            // console.log(`Profile name is   ${profile?.name}`);
            // await startDb();
            // const existingUser = await UserModel.findOne({email: user.email});
            // if (existingUser) {
            //     console.log(`Found user ${user.email}`);
            //     return true;
            // } else {
            //     console.log(`Did not find user ${user.email}`);
            //     return '/signup'
            // }

            if (account?.provider === "google") {
                // const user = await UserModel.findOne({email: userEmail});
                // if (user) {
                //     console.log(`Found user ${userEmail} in DB`);
                //     return true;
                // }
                // else {
                //     console.log(`Did not find user ${userEmail} in DB`);
                // }
                return true;
            }
            if (account?.provider === "email") {
                console.log(`Login successful for user ${user?.email}`);
                return true;
            }
            if (account?.provider === "credentials") {
                return true;
            }

            return false;
        },
        async jwt({token, user, account }) {
            if (account?.provider === "google") {
                token.emailVerified = new Date().toISOString();
            }
            const tok = { ...token, ...user };
            return tok;
        },

        async session({ session, token, user}) {
            const sess = { ...session,
                user: {
                    ...session.user,
                    ...token,
                }
            };
            return sess;
        }
    },
    session: {
        strategy: "jwt",
    },
    debug: false
};

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string; host: string; theme: Theme }) {
    const { url, host, theme } = params
  
    const escapedHost = host.replace(/\./g, "&#8203;.")
  
    const brandColor = theme.brandColor || "#346df1"
    const color = {
      background: "#f9f9f9",
      text: "#444",
      mainBackground: "#fff",
      buttonBackground: brandColor,
      buttonBorder: brandColor,
      buttonText: theme.buttonText || "#fff",
    }
  
    return `
        <body style="background: ${color.background};">
            <table width="100%" border="0" cellspacing="20" cellpadding="0"
            style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
            <tr>
                <td align="center"
                style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                Sign in to <strong>${escapedHost}</strong>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px 0;">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                        target="_blank"
                        style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                        in</a></td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td align="center"
                style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
                If you did not request this email you can safely ignore it.
                </td>
            </tr>
            </table>
        </body>
        `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}

export const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST }