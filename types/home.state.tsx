import { CaseConversation, CaseConversationSubset, Message } from '@/types/chat';
import { ErrorMessage } from '@/types/error';
import { FolderInterface } from '@/types/folder';
import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { PluginKey } from '@/types/plugin';
import { Prompt } from '@/types/prompt';

export interface HomeInitialState {
  uId: string;
  apiKey: string;
  pluginKeys: PluginKey[];
  loading: boolean;
  lightMode: 'light' | 'dark';
  messageIsStreaming: boolean;
  messageDoneStreaming: boolean;
  feedbackSent: boolean;
  modelError: ErrorMessage | null;
  isErrorOccurred: boolean;
  models: OpenAIModel[];
  folders: FolderInterface[];
  conversationSubsets: CaseConversationSubset[];
  selectedConversation: CaseConversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  temperature: number;
  showChatbar: boolean;
  showPromptbar: boolean;
  currentFolder: FolderInterface | undefined;
  messageError: boolean;
  searchTerm: string;
  defaultModelId: OpenAIModelID | undefined;
  assessmentModelId: OpenAIModelID | undefined;
  diseaseIdentifierModelId: OpenAIModelID | undefined;
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
}

export const initialState: HomeInitialState = {
  uId: '',
  apiKey: '',
  loading: false,
  pluginKeys: [],
  lightMode: 'dark',
  messageIsStreaming: false,
  messageDoneStreaming: false,
  feedbackSent: false,
  modelError: null,
  models: [],
  folders: [],
  conversationSubsets: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  isErrorOccurred: false,
  temperature: 1,
  showPromptbar: true,
  showChatbar: true,
  currentFolder: undefined,
  messageError: false,
  searchTerm: '',
  defaultModelId: OpenAIModelID.GPT_3_5,
  assessmentModelId: OpenAIModelID.GPT_3_5,
  diseaseIdentifierModelId: OpenAIModelID.GPT_3_5,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
