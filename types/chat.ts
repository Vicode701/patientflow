import { OpenAIModel } from './openai';

export interface Message {
  role: Role;
  content: string;
}

export type Role = 'assistant' | 'user';

export interface ChatBody {
  messages: Message[];
  key: string;
  model: OpenAIModel;
  temperature: number;
  billableCategories: string[] | undefined;
  // productId: string | undefined;
}

export interface CaseConversation {
  _id: string;
  userId: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  temperature: number;
  createdDate: string | undefined;
  // productId: string | undefined;
  
}

export interface CaseConversationSubset {
  _id: string;
  userId: string;
  name: string;
  messagesCount: number;
  createdDate: string | undefined;
  // productId: string | undefined
}
