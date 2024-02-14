'use server'

import startDb from "@/lib/db";
//import TokenModel, { TokenDocument } from "@/models/resetTokenModel";
import UserModel from "@/models/userModel";
import crypto from "crypto";
import { string } from "zod";

export const verifyToken = async (token: string) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const foundUser = await UserModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date() }
    });

    if (!foundUser) {
        console.log(`Did not find user with token ${token}`);
        return null;
    }
    return foundUser;
}

export async function resetPassword(password: string, confirmPassword: string, token: string) {
    startDb();
    const foundUser = await verifyToken(token);
    if (foundUser) {
        console.log(`Updating password for ${foundUser.email}`);

        console.log(`Successfully updated password for ${foundUser.email}`);
        const expiresAt = new Date();
        foundUser.password = password;
        foundUser.passwordResetToken = '';
        foundUser.passwordResetExpires = new Date(expiresAt.getTime() - 48 * 60 * 60 * 1000); // Set expiration to 2 days prior
        foundUser.passwordChangedAt = new Date();
        foundUser.save();

        return true;
    }
    
    return false;
}
