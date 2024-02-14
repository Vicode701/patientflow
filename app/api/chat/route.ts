import { DEFAULT_TEMPERATURE, MODEL_MAX_LENGTH } from '@/utils/app/const';
import { OpenAIError, OpenAICompletion } from '@/utils/server';
import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';

export const runtime = 'edge';


export const POST = async (req: Request): Promise<Response> => {
  try {
    let { model, messages, key, temperature, billableCategories } = (await req.json()) as ChatBody;

    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

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
      const tokens = encoding.encode(message.content);
      if (i == messages.length -1) {
        message.content = message.content + '\n####';
      }
      
      if (tokens.length + 1000 > MODEL_MAX_LENGTH) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }
    
    encoding.free();
    
    let promptTS: string = combinedMsg!;
    console.log(`Calling OpenAICompletion with ${JSON.stringify(messagesToSend)}`);
    const stream  = await OpenAICompletion(model, temperatureToUse, apiKey, messagesToSend, billableCategories!);
    const res = new Response(stream);
    console.log(`Sending response: ${JSON.stringify(res)}`);
    return res;

  } catch (error) {
    console.log(`Error occured while initializing web assembly:  ${error}`);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      console.log(`Error: ${error}`);
      return new Response('Error', { status: 500 });
    }
  }
};