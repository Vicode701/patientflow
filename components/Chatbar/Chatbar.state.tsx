import { CaseConversationSubset } from '@/types/chat';

export interface ChatbarInitialState {
  searchTerm: string;
  filteredConversations: CaseConversationSubset[];
}

export const initialState: ChatbarInitialState = {
  searchTerm: '',
  filteredConversations: [],
};
