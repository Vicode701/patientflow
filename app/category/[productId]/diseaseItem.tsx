'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { diseaseData } from './diseaseData';

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
import { saveFolders } from '@/utils/app/folders';
import { getDateString } from '@/utils/app/helpers';
import { savePrompts } from '@/utils/app/prompts';
import { getSettings } from '@/utils/app/settings';

import HomeContext from '../../../types/home.context';
import { HomeInitialState, initialState } from '../../../types/home.state';
import { CaseConversation, CaseConversationSubset } from '@/types/chat';
import { KeyValuePair } from '@/types/data';
import { FolderInterface, FolderType } from '@/types/folder';
import { OpenAIModelID, OpenAIModels, fallbackModelID } from '@/types/openai';
import { Prompt } from '@/types/prompt';

import { Chat } from '@/components/Chat/Chat';
import { Chatbar } from '@/components/Chatbar/Chatbar';
import { Navbar } from '@/components/Mobile/Navbar';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';
const VideoThumbnail = dynamic(() => import('../../../components/Video/VideoThumbnail'), { ssr: false });


import { v4 as uuidv4 } from 'uuid';

import {
 
  IconChevronLeft
} from '@tabler/icons-react';
import fullDashboard from '../../../assets/images/dashboard-mini.png';

interface Props {
  userId: string;
}

export interface UserProps {
  userId: string;
  caseTitle: string;
}

const DiseaseItem = ({ userId, caseTitle }: UserProps) => {
  //const { getModels } = useApiService();
  //const { getModelsError } = useErrorService();
  const { data: session, status } = useSession();
  let serverSideApiKeyIsSet = true;
  let serverSidePluginKeysSet = true;
  let defaultModelId = OpenAIModelID.GPT_3_5;
  const contextValue = useCreateReducer<HomeInitialState>({ initialState });

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
  const [caseTemplateVal, setCaseTemplateVal] = useState('');
  const decodedCategoryName = userId ? decodeURIComponent(userId.toString()) : '';

  const [isDataAvailable, setIsDataAvailable] = useState(true)

  let categoryData = diseaseData.find((category) => category.categoryId === decodedCategoryName);

  useEffect(() => {
    if(!categoryData) {
      setIsDataAvailable(false);
    }
  },[]);

  useEffect(() => {
    const setInitialConversation = async () => {
      if (session && status === 'authenticated') {
        // credentials authenticated users
        const caseSubsets: CaseConversationSubset[] | null | undefined =
          session?.user.caseSubsets;
        if (caseSubsets && caseSubsets.length > 0) {
          // set latest conversation as selected
          const latestConversation = await getConversation(
            userId,
            caseSubsets[caseSubsets.length - 1]._id,
          );
          //console.log('saving conversationSubsets');
          saveItemLocal('conversationSubsets', userId, caseSubsets);
          saveItemLocal('selectedConversation', userId, latestConversation);
          dispatch({
            field: 'selectedConversation',
            value: latestConversation,
          });
          dispatch({ field: 'conversationSubsets', value: caseSubsets });
        }
        // This is likely a new user or user authenticated with OAuth or email
        // try get case subsets from DB
      } else {
        const caseSubsets = await getConversationSubsets(userId);
        if (caseSubsets && caseSubsets.length > 0) {
          const latestConversation = await getConversation(
            userId,
            caseSubsets[caseSubsets.length - 1]._id,
          );
          //console.log('saving conversationSubsets');
          saveItemLocal('conversationSubsets', userId, caseSubsets);
          saveItemLocal('selectedConversation', userId, latestConversation);
          dispatch({
            field: 'selectedConversation',
            value: latestConversation,
          });
          dispatch({ field: 'conversationSubsets', value: caseSubsets });
        } else {
          //console.log('Not setting conversation states this time');
        }
      }
    };
    setInitialConversation();
  }, [session, status]);

  useEffect(() => {
    const selectedConversation: CaseConversation = getItemLocal(
      'selectedConversation',
      userId,
    );
    let allConversationSubsets: CaseConversationSubset[] = getItemLocal(
      'conversationSubsets',
      userId,
    );
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

  const handleSelectConversation = async (
    conversationSubset: CaseConversationSubset,
  ) => {
    try {
      let selectedConvo = await getConversation(userId, conversationSubset._id);
      dispatch({
        field: 'selectedConversation',
        value: selectedConvo,
      });
      saveItemLocal(
        'selectedConversation',
        conversationSubset.userId,
        selectedConvo,
      );
    } catch (error) {}
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

    const updatedConversations: CaseConversationSubset[] =
      conversationSubsets.map((c) => {
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
    const lastConversationSubset =
      conversationSubsets[conversationSubsets.length - 1];

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
      createdDate: newConversation.createdDate,
    };

    const updatedConversationSubsets = [
      ...conversationSubsets,
      newConversationSubset,
    ];

    dispatch({ field: 'selectedConversation', value: newConversation });
    dispatch({
      field: 'conversationSubsets',
      value: updatedConversationSubsets,
    });

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
  }, [dispatch]);

  const handleCaseTemplate = (value: any) => {
    setCaseTemplateVal(value);
    console.log(value);
  };



  let element;
  // if (status === "authenticated") {
  element = (
    <HomeContext.Provider
      value={{
        ...contextValue,
        handleNewConversation,
        handleSelectConversation,
        handleUpdateConversation,
        handleCreateFolder,
        handleDeleteFolder,
        handleUpdateFolder,
      }}
    >
      <Head>
        <title>{caseTitle}</title>
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
            <Chatbar userId={userId} onCaseTemplate={handleCaseTemplate} />

            <div className="flex flex-1">
              <div className="relative overflow-auto flex-1 bg-white">
                <div className="flex items-center justify-start px-10 pb-2 border-b  border-gray-200">
                  <div className=" flex items-center text-base text-black  mt-2">
                <Link href="/category"
              className="hover:text-gray-300 h-6 text-sm font-bold mr-2">
                <IconChevronLeft  color='#EC5A7B'/>

            </Link>
                   <span>All / {categoryData?.title}</span> 
                  </div>
                </div>


                <div className=" border-t border-white/20 p-10 grid grid-cols-12 grid-rows-2 gap-12 text-sm">
                 {isDataAvailable? (<div className='flex flex-col col-span-8 border-r border-base gap-y-16'>
                  <div className="">
                    <label className=" text-left text-black font-bold ">
                      {categoryData?.title}
                    </label>
                    <ul className="max-w-md space-y-1 mt-8 md:ml-8 text-black list-disc list-inside ">
                    
                      {categoryData?.diseaseList.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
                    </ul>
                   
                  </div>

                  <div className=''>
                      <div className='flex justify-start gap-x-6 items-center'>
                      <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded">
          Edit Template
        </button>
        <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded">
          Save Template
        </button>
        <button className=" mt-2 bg-[#6186F9] border border-[#6186F9] hover:bg-[#495b92] text-white py-1 px-2 sm:px-4 rounded">
          Generate Custom
        </button>
                      </div>
                  </div>
                  </div>) : (<div className='flex items-center justify-center col-span-8 border-r border-base gap-y-16'>
    <div className="">
      <label className=" text-left text-black font-bold text-3xl">
       No content for this disease yet!
      </label>
    
     
    </div>

    
    </div>)}

                  <div className=' flex flex-col col-span-4 gap-y-8'>
               
                 <div className='flex flex-col gap-y-2'>
                 <p className='text-black '>clinical plan explained</p>

                 <div
                  // text-center bg-cover bg-center bg-no-repeat
                  className=""
                  style={{

                    backgroundImage: ` url(${fullDashboard.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20vw',
                    height: '20vh',
                  }}
                >
                  <VideoThumbnail videoUrl="/assets/images/users-action.png" />
                </div>
                <p className='text-black '>clinical plan explained</p>

                 </div>
                
                 <div className="">
                    <label className=" text-left text-black font-bold ">
                      More {caseTitle}
                    </label>
                    <ul className="max-w-md space-y-1 mt-4 text-black list-none list-inside ">
                      <li>Acute Hypoxic Respiratory Failure</li>
                      <li>COPD Exacerbation</li>
                      <li>Asthma Exacerbation</li>
                      <li>Community Acquired Pnuemonia</li>
                      <li>Healthcare associated Pneumonia</li>
                    </ul>
                   
                  </div>
              
                  </div>


                  <div className='col-span-12  intro-y font-bold'>
     <p className='text-gray-600 mb-4'>other consideration for {caseTitle}</p>
       <div
         className={`card p-6 rounded-md shadow-md md:transform md:scale-125}`}
       >
         <p className="text-gray-600 mb-4 italic font-bold ">
             
         Ensure to take thorough history that rules our other serious casues of chest pain. 
History of recent upper respiratory tract infections or Pneumonia may also help
guide diagnosis.
         
         </p>
        
       </div>
     </div>
                </div>



               
              </div>

              {/* <Chat stopConversationRef={stopConversationRef} userId={userId} caseTemplateValue={caseTemplateVal}/> */}
            </div>
          </div>
        </main>
      )}
    </HomeContext.Provider>
  );
  // } else if (status === "loading") {
  //   element = (<Spinner size="20px" className="mx-auto" />);
  // } else {
  //   return redirect("/login");
  // }

  return <div>{element}</div>;
};

export default DiseaseItem;
