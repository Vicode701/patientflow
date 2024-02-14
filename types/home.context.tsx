import { Dispatch, createContext } from 'react';

import { ActionType } from '@/hooks/useCreateReducer';

import { CaseConversation, CaseConversationSubset } from '@/types/chat';
import { KeyValuePair } from '@/types/data';
import { FolderType } from '@/types/folder';

import { initialState, HomeInitialState } from './home.state';

export interface HomeContextProps {
  state: HomeInitialState;
  dispatch: Dispatch<ActionType<HomeInitialState>>;
  handleNewConversation: () => void;
  handleSelectConversation: (conversationSubset: CaseConversationSubset) => void;
  handleCreateFolder: (name: string, type: FolderType) => void;
  handleDeleteFolder: (folderId: string) => void;
  handleUpdateFolder: (folderId: string, name: string) => void;
  handleUpdateConversation: (
    conversation: CaseConversation,
    data: KeyValuePair,
  ) => void;
}


// const HomeContext = createContext<HomeContextProps>({
//   state: initialState,
//   dispatch: () => {},
//   handleNewConversation: () => {},
//   handleSelectConversation: () => {},
//   handleCreateFolder: () => {},
//   handleDeleteFolder: () => {},
//   handleUpdateConversation: () => {}
// });


const HomeContext = createContext<HomeContextProps>(undefined!);

export default HomeContext;