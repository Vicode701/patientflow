'use server'

import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import crypto from "crypto";
import EmailSender from "@/utils/email/email";

// Function to store the token in the database
export const sendTokenEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/password-reset?token=${token}`;
    console.log(`Sending reset link ${resetLink} for email: ${email}`);
    await EmailSender.sendPasswordReset(email, resetLink);
};

export async function submitTokenResetRequest(email: string) {
  startDb();
  const foundUser = await UserModel.findOne({email: email});
  if (foundUser) {
    console.log(`Found user: ${email}`);
    const token = await foundUser.createPasswordResetToken();
    // save password rest token on user in the DB
    // validatebeforeSave helps to avoid error because other required fields not supplied
    await foundUser.save({ validateBeforeSave: false });
    await sendTokenEmail(email, token);
  }
}
