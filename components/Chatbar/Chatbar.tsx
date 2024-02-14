import { useCallback, useContext, useEffect } from 'react';
import { useCreateReducer } from '@/hooks/useCreateReducer';
import { deleteConversationsHistory, deleteConversation, getConversation, saveItemLocal } from '@/utils/app/conversation';
import { CaseConversationSubset } from '@/types/chat';
import { PluginKey } from '@/types/plugin';

import HomeContext from '../../types/home.context';
import { ChatFolders } from './components/ChatFolders';
import { ChatbarSettings } from './components/ChatbarSettings';
import { Conversations } from './components/Conversations';

import Sidebar from '../Sidebar';
import ChatbarContext from './Chatbar.context';
import { ChatbarInitialState, initialState } from './Chatbar.state';
import { Dashboard } from '../Dashboard/Dashboard';
import { CaseTemplateSide } from '../CaseTemplateSider/CaseTemplateSide';
import { CaseArchive } from '../CaseArchive/CaseArchive';

interface ChatBarProp {
  userId: string;
  onCaseTemplate :  (data: any) => void ;
}

export const Chatbar = ({ userId,  onCaseTemplate}: ChatBarProp) => {

  const chatBarContextValue = useCreateReducer<ChatbarInitialState>({
    initialState,
  });

  const {
    state: { searchTerm, filteredConversations },
    dispatch: chatDispatch,
  } = chatBarContextValue;

  const {
    state: { conversationSubsets, showChatbar, defaultModelId, pluginKeys },
    dispatch: homeDispatch,
    handleNewConversation,
    handleCreateFolder,
    handleUpdateConversation,
  } = useContext(HomeContext);


  const handleApiKeyChange = useCallback(
    (apiKey: string) => {
      homeDispatch({ field: 'apiKey', value: apiKey });

      localStorage.setItem('apiKey', apiKey);
    },
    [homeDispatch],
  );

  const handlePluginKeyChange = (pluginKey: PluginKey) => {
    if (pluginKeys.some((key) => key.pluginId === pluginKey.pluginId)) {
      const updatedPluginKeys = pluginKeys.map((key) => {
        if (key.pluginId === pluginKey.pluginId) {
          return pluginKey;
        }

        return key;
      });

      homeDispatch({ field: 'pluginKeys', value: updatedPluginKeys });

      localStorage.setItem('pluginKeys', JSON.stringify(updatedPluginKeys));
    } else {
      homeDispatch({ field: 'pluginKeys', value: [...pluginKeys, pluginKey] });

      localStorage.setItem(
        'pluginKeys',
        JSON.stringify([...pluginKeys, pluginKey]),
      );
    }
  };

  const handleClearPluginKey = (pluginKey: PluginKey) => {
    const updatedPluginKeys = pluginKeys.filter(
      (key) => key.pluginId !== pluginKey.pluginId,
    );

    if (updatedPluginKeys.length === 0) {
      homeDispatch({ field: 'pluginKeys', value: [] });
      localStorage.removeItem('pluginKeys');
      return;
    }

    homeDispatch({ field: 'pluginKeys', value: updatedPluginKeys });

    localStorage.setItem('pluginKeys', JSON.stringify(updatedPluginKeys));
  };


  const handleClearConversations = () => {
    // defaultModelId &&
    //   homeDispatch({
    //     field: 'selectedConversation',
    //     value: {
    //       _id: uuidv4(),
    //       name: t('New Case'),
    //       userId: userId,
    //       messages: [],
    //       model: OpenAIModels[defaultModelId],
    //       prompt: DEFAULT_SYSTEM_PROMPT,
    //       temperature: DEFAULT_TEMPERATURE,
    //       folderId: null,
    //     },
    //   });

    homeDispatch({ field: 'conversationSubsets', value: [] });
    chatDispatch({ field: 'filteredConversations', value: [] });
    deleteConversationsHistory(userId);
    localStorage.removeItem(`selectedConversation_${userId}`);
    localStorage.removeItem(`conversationSubsets_${userId}`);
  };

  const handleDeleteConversation = async (conversationSubset: CaseConversationSubset) => {
    const updatedConversationSubsets = conversationSubsets.filter(
      (c) => c._id !== conversationSubset._id,
    );

    homeDispatch({ field: 'conversationSubsets', value: updatedConversationSubsets });
    chatDispatch({ field: 'searchTerm', value: '' });
    chatDispatch({ field: 'filteredConversations', value: updatedConversationSubsets });
    if (updatedConversationSubsets.length > 0) {
      const selectedConvSubet = updatedConversationSubsets[updatedConversationSubsets.length - 1];
      const selectedConv = await getConversation(userId, selectedConvSubet._id);
            homeDispatch({
        field: 'selectedConversation',
        value: selectedConv,
      });

      saveItemLocal('selectedConversation', userId, selectedConv);
    } else {

      /*****Consider uncommenting this */
      // defaultModelId &&
      //   homeDispatch({
      //     field: 'selectedConversation',
      //     value: {
      //       _id: uuidv4(),
      //       name: t('New Case'),
      //       userId: userId,
      //       messages: [],
      //       model: OpenAIModels[defaultModelId],
      //       prompt: DEFAULT_SYSTEM_PROMPT,
      //       temperature: DEFAULT_TEMPERATURE,
      //       folderId: null,
      //     },
      //   });
      // saveItemLocal('selectedConversation', userId, newConv);
    }
    deleteConversation(conversationSubset);
  };

  const handleToggleChatbar = () => {
    console.log(`filteredConversations len is ${filteredConversations.length}`);
    homeDispatch({ field: 'showChatbar', value: !showChatbar });
    localStorage.setItem('showChatbar', JSON.stringify(!showChatbar));
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData('conversation'));
      //handleUpdateConversation(conversation, { key: 'folderId', value: 0 });
      chatDispatch({ field: 'searchTerm', value: '' });
      e.target.style.background = 'none';
    }
  };

  const handleOnCaseTemplate =(value: any) => {

    onCaseTemplate(value)

  }
  useEffect(() => {
    if (searchTerm) {
      chatDispatch({
        field: 'filteredConversations',
        value: conversationSubsets.filter((conversationSubset) => {
          const searchable =
            conversationSubset.name.toLocaleLowerCase();

          return searchable.toLowerCase().includes(searchTerm.toLowerCase());
        }),
      });
    } else {
      chatDispatch({
        field: 'filteredConversations',
        value: conversationSubsets,
      });
    }
  }, [searchTerm, filteredConversations, conversationSubsets]);

  return (
    <ChatbarContext.Provider
      value={{
        ...chatBarContextValue,
        handleDeleteConversation,
        handleClearConversations,
        handlePluginKeyChange,
        handleClearPluginKey,
        handleApiKeyChange,
      }}
    >
      <Sidebar<CaseConversationSubset>
        side={'left'}
        otherButtons={true}
        isOpen={showChatbar}
        addItemButtonTitle={'Create Case'}
        itemComponent={filteredConversations.length > 0 && <Conversations conversationSubsets={filteredConversations.slice(filteredConversations.length-1)} />}
        caseArchiveComponent={<CaseArchive  dispatch={chatDispatch}/>}
        // dashboardComponent={<Dashboard />}
        caseTemplateComponent={<CaseTemplateSide onCaseTemplate={handleOnCaseTemplate} />}
        folderComponent={<ChatFolders searchTerm={searchTerm} />}
        items={filteredConversations.slice(filteredConversations.length-1)}
        searchTerm={searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          chatDispatch({ field: 'searchTerm', value: searchTerm })
        } 
        toggleOpen={handleToggleChatbar}
        handleCreateItem={handleNewConversation}
        handleCreateFolder={() => handleCreateFolder('New folder', 'chat')}
        handleDrop={handleDrop}
        footerComponent={<ChatbarSettings />}
      />
    </ChatbarContext.Provider>
  );
};
