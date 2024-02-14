import { IconArchive, IconMistOff, IconBriefcase, IconArrowLeft, IconArrowDown, IconPlus, IconMinus } from '@tabler/icons-react';
import { Dispatch, ReactNode, useContext, useEffect, useState } from 'react';
//import { useRouter } from 'next/router';
import HomeContext from '@/types/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import { SidebarButton } from '../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar/Chatbar.context';
import { signOut, useSession } from 'next-auth/react';
import { CaseConversationSubset } from '@/types/chat';
import { Action, useCreateReducer } from '@/hooks/useCreateReducer';
import { ChatbarInitialState, initialState } from '../Chatbar/Chatbar.state';
import { Conversations } from '../Chatbar/components/Conversations';

export interface CaseArchiveProps {
    dispatch: Dispatch<Action<ChatbarInitialState>>;
}
export const CaseArchive = ({ dispatch }: CaseArchiveProps) => {
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  
  const {
    state: {
      conversationSubsets,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    state: {
        filteredConversations
    },
  } = useContext(ChatbarContext);

//   const chatBarContextValue = useCreateReducer<ChatbarInitialState>({
//     initialState,
//   });
    
//   const {
//     state: { searchTerm, filteredConversations },
//     dispatch: chatDispatch,
//   } = chatBarContextValue;

  const {
    handleClearConversations,
    handleApiKeyChange,
  } = useContext(ChatbarContext);
  //const router = useRouter();

  function handleShowCaseArchive() {
    //throw new Error('Function not implemented.');
  }
      //console.log(`filteredConversations len is ${filteredConversations.length}`);

  const handleToggleDropdown = () => {
    //console.log(`filteredConversations len is ${filteredConversations.length}`);
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData('conversation'));
      //handleUpdateConversation(conversation, { key: 'folderId', value: 0 });
      dispatch({ field: 'searchTerm', value: '' });
      e.target.style.background = 'none';
    }
  };

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (event.target.closest('.dropdown-container') === null) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);
  
  return (
    <div className="flex flex-col items-center">
      <button
        className="flex gap-4 w-3/4 h-[35px] mb-[10px] items-center mr-5 rounded-md pl-2 text-white bg-[#5c77da]"
        onClick={() => {
          handleToggleDropdown();
        }}
      >
        {isDropdownOpen ? (
            <IconBriefcase className='h-5' />
            ) : (
            <IconBriefcase className='w-5 h-5 text-white' />
        )}
        {/* <IconArchive size={20} /> */}
        Cases Archive
      </button>
      {isDropdownOpen && (
        // <div className="dropdown-container flex flex-col">
            <div className="flex-grow overflow-auto mb-5 pl-3">
                {filteredConversations?.length > 0 ? (
                    <div
                    className="pt-2"
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                    onDragEnter={highlightDrop}
                    onDragLeave={removeHighlight}
                    >
                    <Conversations conversationSubsets={filteredConversations} />
                    </div>
                ) : (
                    <div className="mt-8 select-none text-center text-white opacity-50">
                    <IconMistOff className="mx-auto mb-3" />
                    <span className="text-[14px] leading-normal">
                        {'No data.'}
                    </span>
                    </div>
                )}
            </div>
        // </div>
      )}
    </div>
  );
};
