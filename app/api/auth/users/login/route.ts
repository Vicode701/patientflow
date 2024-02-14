import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

interface LoginRequest {
    email: string ;
    password: string;
}

export const POST = async (req: NextRequest) => {
    let body;
    try {
        body = (await req.json()) as LoginRequest;
    } catch(err) {
        console.log("Error parsing JSON:", err);
    }

    await startDb();
    try {
        const user = await UserModel.findOne({email: body?.email}).select('+password');
        console.log(`Finding user ${body?.email}`);

        if (!user) {
            return NextResponse.json({ error: 'email/password mismatch' }, { status: 400 });
        }

        console.log(`Found user in DB ${user.email}`);
        const passwordMatch = await user.comparePassword(body?.password!);
        if(!passwordMatch) {
            return NextResponse.json({ error: 'email/password mismatch' }, { status: 401 });
        }

        await UserModel.findOneAndUpdate(
            { _id: user._id }, // Filter condition
            { isLoggedIn: true }, // Update operation
        );

        const res = NextResponse.json(
            {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role },
            {
                status: 200
            });
        console.log(`Sending response ${JSON.stringify(res)}`);
        
        return res;
    } catch (error) {
        console.log(`Error: Failed to login user. Internal Error: ${error}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}