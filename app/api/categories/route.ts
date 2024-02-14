import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAICategoriesCompletion } from '@/utils/server';
import { ChatBody, Message } from '@/types/chat';

export const runtime = 'edge';

export const POST = async (req: Request): Promise<Response> => {
  try {
    let { model, messages, key, temperature } = (await req.json()) as ChatBody;
    console.log(`Handling request in /api/categories route`);
    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }
    
    const apiKey: string = process.env.OPENAI_KEY!;
   
    let tokenCount = 0;
    let messagesToSend: Message[] = [];
    let combinedMsg: string;
    for (let i = messages.length - 1; i >= 0; i--) {
      let message = messages[i];

      if (i == messages.length -1) {
        message.content = message.content + '\n####';
      }
      
      messagesToSend = [message, ...messagesToSend];
    }
       
    let promptTS: string = combinedMsg!;
    console.log(`Calling OpenAICategoriesCompletion with ${JSON.stringify(messagesToSend)}`);
    const res  = await OpenAICategoriesCompletion(model, temperatureToUse, apiKey, messagesToSend);
    console.log(`Sending response: ${JSON.stringify(res)}`);
    return res;

  } catch (error) {
    console.log(`Error occured :  ${error}`);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      console.log(`Error: ${error}`);
      return new Response('Error', { status: 500 });
    }
  }
};