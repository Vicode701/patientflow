'use client'

import { useEffect, useRef } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCreateReducer } from '@/hooks/useCreateReducer';
import { DEFAULT_TEMPERATURE } from '@/utils/app/const';
import {
  getConversation,
  getConversationSubsets,
  getItemLocal,
  saveConversation,
  saveItemLocal,
  updateConversation,
} from '@/utils/app/conversation';
import { getSettings } from '@/utils/app/settings';

import { CaseConversation, CaseConversationSubset } from '@/types/chat';
import { KeyValuePair } from '@/types/data';
import { OpenAIModelID, OpenAIModels, fallbackModelID } from '@/types/openai';
import { Chat } from '@/components/Chat/Chat';
import { Chatbar } from '@/components/Chatbar/Chatbar';
import { Navbar } from '@/components/Mobile/Navbar';
import HomeContext from '../../../types/home.context';
import { HomeInitialState, initialState } from '../../../types/home.state';
import { v4 as uuidv4 } from 'uuid';
import { getDateString } from '@/utils/app/helpers';
import Spinner from '@/components/Spinner';
import { FolderInterface, FolderType } from '@/types/folder';
import { saveFolders } from '@/utils/app/folders';
import { Prompt } from '@/types/prompt';
import { savePrompts } from '@/utils/app/prompts';
import Head from 'next/head';

interface Props {
  userId: string;
}

export interface UserProps {
    userId: string;
}

const User = ({
  userId
}:  UserProps ) => {

  //const { getModels } = useApiService();
  //const { getModelsError } = useErrorService();
  const { data: session, status } = useSession();
  let serverSideApiKeyIsSet = true;
  let serverSidePluginKeysSet = true;
  let defaultModelId = OpenAIModelID.GPT_3_5;
  const contextValue = useCreateReducer<HomeInitialState>({initialState,});

  const {
    state: {
      lightMode,
      apiKey,
      folders,
      conversationSubsets,
      selectedConversation,
      prompts,
      temperature,
    },
    dispatch,
  } = contextValue;

  const stopConversationRef = useRef<boolean>(false);

  useEffect(() => {
    const setInitialConversation = async () => {
      if (session && status === "authenticated") {
        // credentials authenticated users
        const caseSubsets: CaseConversationSubset[] | null | undefined  = session?.user.caseSubsets; 
        if (caseSubsets && caseSubsets.length > 0) {
          // set latest conversation as selected
          const latestConversation = await getConversation(userId, caseSubsets[caseSubsets.length - 1]._id);
          //console.log('saving conversationSubsets');
          saveItemLocal('conversationSubsets', userId, caseSubsets);
          saveItemLocal('selectedConversation', userId, latestConversation);
          dispatch({ field: 'selectedConversation', value: latestConversation });
          dispatch({ field: 'conversationSubsets', value: caseSubsets });
        }
        // This is likely a new user or user authenticated with OAuth or email
        // try get case subsets from DB
      } else {
        const caseSubsets = await getConversationSubsets(userId);
        if (caseSubsets && caseSubsets.length > 0 ) {
          const latestConversation = await getConversation(userId, caseSubsets[caseSubsets.length - 1]._id);
          //console.log('saving conversationSubsets');
          saveItemLocal('conversationSubsets', userId, caseSubsets);
          saveItemLocal('selectedConversation', userId, latestConversation);
          dispatch({ field: 'selectedConversation', value: latestConversation });
          dispatch({ field: 'conversationSubsets', value: caseSubsets });
        } else {
          //console.log('Not setting conversation states this time');
        }
      }
      
    }
    setInitialConversation();

  }, [session, status]);

  useEffect(() => {
    const selectedConversation: CaseConversation = getItemLocal('selectedConversation', userId);
    let allConversationSubsets: CaseConversationSubset[] = getItemLocal('conversationSubsets', userId);
    let convSubsets = Array<CaseConversationSubset>();
    const newConversation: CaseConversation = {
      _id: uuidv4(),
      userId: userId,
      name: 'New Case',
      messages: [],
      model: {
        id: OpenAIModels[defaultModelId].id,
        name: OpenAIModels[defaultModelId].name,
        maxLength: OpenAIModels[defaultModelId].maxLength,
        tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
      },
      temperature: DEFAULT_TEMPERATURE,
      createdDate: getDateString(),
    };

    const newConversationSubset: CaseConversationSubset = {
      _id: newConversation._id,
      userId: newConversation.userId,
      name: newConversation.name,
      messagesCount: 1,
      createdDate: newConversation?.createdDate,
    };

    // If we find none of selectedConv or allConvSubset we create new ones and update states
    if (!selectedConversation && !allConversationSubsets) {
      convSubsets.push(newConversationSubset);
      dispatch({
        field: 'selectedConversation',
        value: newConversation,
      });

      dispatch({
        field: 'conversationSubsets',
        value: convSubsets,
      });
      saveItemLocal('selectedConversation', userId, newConversation);
      saveItemLocal('conversationSubsets', userId, convSubsets);
    } else if (selectedConversation && allConversationSubsets) {
      dispatch({
        field: 'selectedConversation',
        value: selectedConversation,
      });

      dispatch({
        field: 'conversationSubsets',
        value: allConversationSubsets,
      });
    } else if (allConversationSubsets) {
      // if we find allConversationSubsets and no selectedConv, create a new conv and set as selected
      dispatch({
        field: 'selectedConversation',
        value: newConversation,
      });

      allConversationSubsets.push(newConversationSubset);
      dispatch({
        field: 'conversationSubsets',
        value: allConversationSubsets,
      });
      saveItemLocal('selectedConversation', userId, newConversation);
      saveItemLocal('conversationSubsets', userId, allConversationSubsets);
    } else {
      // we found selectedConversation and no allConversationSubsets, create a new allConversationSubsets and add the selectedConv
      const innerNewConversationSubset: CaseConversationSubset = {
        _id: selectedConversation._id,
        userId: selectedConversation.userId,
        name: selectedConversation.name,
        messagesCount: 1,
        createdDate: selectedConversation?.createdDate,
      };
      convSubsets.push(innerNewConversationSubset);
      dispatch({
        field: 'selectedConversation',
        value: selectedConversation,
      });

      dispatch({
        field: 'conversationSubsets',
        value: convSubsets,
      });

      saveItemLocal('conversationSubsets', userId, allConversationSubsets);
    }
  }, [dispatch]);

  const handleSelectConversation = async (conversationSubset: CaseConversationSubset) => {
      try {
        let selectedConvo = await getConversation(userId, conversationSubset._id);
        dispatch({
          field: 'selectedConversation',
          value: selectedConvo,
          });
        saveItemLocal('selectedConversation', conversationSubset.userId, selectedConvo);
      } catch (error) {

      }
  };


  const handleCreateFolder = (name: string, type: FolderType) => {
    const newFolder: FolderInterface = {
      id: uuidv4(),
      name,
      type,
    };

    const updatedFolders = [...folders, newFolder];

    dispatch({ field: 'folders', value: updatedFolders });
    saveFolders(updatedFolders);
  };

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((f) => f.id !== folderId);
    dispatch({ field: 'folders', value: updatedFolders });
    saveFolders(updatedFolders);

    const updatedConversations: CaseConversationSubset[] = conversationSubsets.map((c) => {
      if (c._id === folderId) {
        return {
          ...c,
          folderId: null,
        };
      }

      return c;
    });

    dispatch({ field: 'conversationSubsets', value: updatedConversations });

    const updatedPrompts: Prompt[] = prompts.map((p) => {
      if (p.folderId === folderId) {
        return {
          ...p,
          folderId: null,
        };
      }

      return p;
    });

    dispatch({ field: 'prompts', value: updatedPrompts });
    savePrompts(updatedPrompts);
  };

  const handleUpdateFolder = (folderId: string, name: string) => {
    const updatedFolders = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          name,
        };
      }

      return f;
    });

    dispatch({ field: 'folders', value: updatedFolders });

    saveFolders(updatedFolders);
  };


  // CONVERSATION OPERATIONS  --------------------------------------------

  const handleNewConversation = () => {
    const lastConversationSubset = conversationSubsets[conversationSubsets.length - 1];

    const newConversation: CaseConversation = {
      _id: uuidv4(),
      userId: userId,
      name: 'New Case',
      messages: [],
      model: {
        id: OpenAIModels[defaultModelId].id,
        name: OpenAIModels[defaultModelId].name,
        maxLength: OpenAIModels[defaultModelId].maxLength,
        tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
      },
      temperature: DEFAULT_TEMPERATURE,
      createdDate: getDateString(),
    };

    const newConversationSubset: CaseConversationSubset = {
      _id: newConversation._id,
      userId: newConversation.userId,
      name: newConversation.name,
      messagesCount: newConversation.messages.length,
      createdDate: newConversation.createdDate
    };

    const updatedConversationSubsets = [...conversationSubsets, newConversationSubset];

    dispatch({ field: 'selectedConversation', value: newConversation });
    dispatch({ field: 'conversationSubsets', value: updatedConversationSubsets });

    saveConversation(newConversation);

    dispatch({ field: 'loading', value: false });
  };

  const handleUpdateConversation = (
    conversation: CaseConversation,
    data: KeyValuePair,
  ) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversationSubsets,
    );

    dispatch({ field: 'selectedConversation', value: single });
    dispatch({ field: 'conversationSubsets', value: all });
    saveItemLocal('selectedConversation', userId, single);
    saveItemLocal('conversationSubsets', userId, all);
  };



  useEffect(() => {
    if (window.innerWidth < 640) {
      dispatch({ field: 'showChatbar', value: false });
    }
  }, [selectedConversation]);

  useEffect(() => {
    defaultModelId &&
      dispatch({ field: 'defaultModelId', value: defaultModelId });
    serverSideApiKeyIsSet &&
      dispatch({
        field: 'serverSideApiKeyIsSet',
        value: serverSideApiKeyIsSet,
      });
    serverSidePluginKeysSet &&
      dispatch({
        field: 'serverSidePluginKeysSet',
        value: serverSidePluginKeysSet,
      });
  }, [defaultModelId, serverSideApiKeyIsSet, serverSidePluginKeysSet]);


  useEffect(() => {
    const settings = getSettings();
    if (settings.theme) {
      dispatch({
        field: 'lightMode',
        value: settings.theme,
      });
    }

    const apiKey = localStorage.getItem('apiKey');

    if (serverSideApiKeyIsSet) {
      dispatch({ field: 'apiKey', value: '' });

      localStorage.removeItem('apiKey');
    } else if (apiKey) {
      dispatch({ field: 'apiKey', value: apiKey });
    }

    const pluginKeys = localStorage.getItem('pluginKeys');
    if (serverSidePluginKeysSet) {
      dispatch({ field: 'pluginKeys', value: [] });
      localStorage.removeItem('pluginKeys');
    } else if (pluginKeys) {
      dispatch({ field: 'pluginKeys', value: pluginKeys });
    }

    if (window.innerWidth < 640) {
      dispatch({ field: 'showChatbar', value: false });
      dispatch({ field: 'showPromptbar', value: false });
    }

    const showChatbar = localStorage.getItem('showChatbar');
    if (showChatbar) {
      dispatch({ field: 'showChatbar', value: showChatbar === 'true' });
    }

    const showPromptbar = localStorage.getItem('showPromptbar');
    if (showPromptbar) {
      dispatch({ field: 'showPromptbar', value: showPromptbar === 'true' });
    }

    const folders = localStorage.getItem('folders');
    if (folders) {
      dispatch({ field: 'folders', value: JSON.parse(folders) });
    }

    const prompts = localStorage.getItem('prompts');
    if (prompts) {
      dispatch({ field: 'prompts', value: JSON.parse(prompts) });
    }
  }, [
    dispatch
  ]);

  let element;
  if (status === "authenticated") {
    element = (<HomeContext.Provider
      value={{
        ...contextValue,
        handleNewConversation,
        handleSelectConversation,
        handleUpdateConversation,
        handleCreateFolder,
        handleDeleteFolder,
        handleUpdateFolder
      }}
    >
      <Head>
        <title>PatientFlow HQ</title>
        <meta name="description" content="ChatGPT but better." />
        <meta
          name="viewport"
          content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      {selectedConversation && (
        <main
          className={`flex h-screen w-screen flex-col text-sm text-white ${lightMode}`}
        >
          <div className="fixed top-0 w-full sm:hidden">
            <Navbar
              selectedConversation={selectedConversation}
              onNewConversation={handleNewConversation}
            />
          </div>

          <div className="flex h-full w-full pt-[48px] sm:pt-0">
            {/* <Chatbar userId={userId} /> */}

            <div className="flex flex-1">
              {/* <Chat stopConversationRef={stopConversationRef} userId={userId} /> */}
            </div>
          </div>
        </main>
      )}
    </HomeContext.Provider>);
  } else if (status === "loading") {
    element = (<Spinner size="20px" className="mx-auto" />);
  } else {
    return redirect("/login");
  }

  return (
    <div>{element}</div>
  );
};

export default User;
