import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

interface SignupRequest {
    name: string;
    email: string ;
    password: string;
}

export const POST = async (req: NextRequest) => {
    const body = await req.json() as SignupRequest;

    await startDb();
    try {
        const oldUser = await UserModel.findOne({email: body.email});
        if (oldUser) {
            return NextResponse.json({ error: 'email is already in use!' }, { status: 422 });
        }

        // Disable signup for now
        // const user = await UserModel.create({...body });
        // console.log(`Successfully created use ${user.email}`);

        //   const res = NextResponse.json(
        //     {
        //         userId: user._id,
        //         email: user.email,
        //         name: user.name,
        //         role: user.role },
        //     {
        //         status: 200
        //     });
        // console.log(`Sending response ${res}`);        
        //return res;

        return NextResponse.json({ error: 'Sign up not supported at moment.' }, { status: 500 });

    } catch (error) {
        return NextResponse.json({ error: 'Sign up not supported at moment.' }, { status: 500 });
    }
}