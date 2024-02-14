import startDb from '@/lib/db';
import CaseConversationModel from '../../../models/caseModel';
import { Message } from '@/types/chat';
import { OpenAIModel } from '@/types/openai';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from "next/server";

interface CaseRequest {
  _id: string;
  userId: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  temperature: number;
  createdDate: String;
}

const ValidateAndInitDB = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'You must sign in.' }, { status: 401 });
    }
    await startDb();
}


export const GET = async (req: NextRequest) => {
    await ValidateAndInitDB();
    const caseId = req.nextUrl.searchParams.get('caseId') as string;
    const userId = req.nextUrl.searchParams.get('userId') as string;
    console.log(`Handling GET Request: caseId=${caseId}, userId= ${userId}`);
    if (!caseId) {
        // If no caseId then get all cases for user
        const conversations = await CaseConversationModel.find({ userId: userId }, '-__v');
        return NextResponse.json({ data: JSON.stringify(conversations) }, { status: 200 });
    }
    else {
        const conversation = await CaseConversationModel.find({ _id: caseId, userId: userId }, '-__v');
        return NextResponse.json({ data: JSON.stringify(conversation) }, { status: 200 });
    }
}

export const POST = async (req: NextRequest) => {
    await ValidateAndInitDB();
    console.log(`Handling POST Request: ${JSON.stringify(req)}`);
    const { _id, userId, name, messages, model, temperature, createdDate } = await req.json() as CaseRequest;
    console.log(`caseId: ${_id}`);
    console.log(`userId: ${userId}`);
    console.log(`name: ${name}`);
    console.log(`messages: ${JSON.stringify(messages)}`);
    const willRename = req.nextUrl.searchParams.get('rename') as string;
    if (willRename && willRename === 'true') {
      await CaseConversationModel.findOneAndUpdate(
        { _id }, // Filter condition
        { name }, // Update operation
      );
      console.log('New conversation created.');
      return NextResponse.json({ data: 'New conversation created.' }, { status: 201 });
    }
    else {        
      await CaseConversationModel.findOneAndUpdate(
        { _id }, // Filter condition
        { userId, name, messages, model, temperature, createdDate }, // Update operation
        { upsert: true } // Options
      );

      console.log('New conversation created.');
      return NextResponse.json({ data: 'New conversation created.' }, { status: 201 });
    }
}

export const PUT = async (req: NextRequest) => {
    await ValidateAndInitDB();
    console.log(`Handling PUT Request: ${JSON.stringify(req)}`);
    const { _id,  messages } = await req.json() as CaseRequest;
    console.log(`caseId: ${_id}`);
    console.log(`messages: ${JSON.stringify(messages)}`);
    const message = messages[messages.length - 1] as Message;
        const updatedConversation = await CaseConversationModel.findOneAndUpdate(
        { _id: _id },
        { $push: { messages: message } },
        { new: true }
    );

    return NextResponse.json({ data: JSON.stringify(updatedConversation) }, { status: 201 });
}
export const DELETE = async (req: NextRequest) => {
    // Handle DELETE request
    // Maybe delete a conversation
    // if caseConversationId is provided in request body, delete the associated caseConversation
    // if only userId is provided, delete all caseCOnversations belonging to the user.
    await ValidateAndInitDB();
    console.log(`Handling DELETE Request: ${JSON.stringify(req)}`);
    const { _id,  userId } = await req.json() as CaseRequest;

    if (_id) {
        await CaseConversationModel.deleteOne({_id: _id});
    }
    if (userId) {
        await CaseConversationModel.deleteMany({userId: userId});
    }

    return NextResponse.json({ data: 'Conversation deleted.' }, { status: 200 });
}
