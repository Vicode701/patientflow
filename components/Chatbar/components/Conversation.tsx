import {
  IconCheck,
  IconMessage,
  IconBriefcase,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import {
  DragEvent,
  KeyboardEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CaseConversation, CaseConversationSubset } from '@/types/chat';

import HomeContext from '../../../types/home.context';

import SidebarActionButton from '@/components/Buttons/SidebarActionButton';
import ChatbarContext from '@/components/Chatbar/Chatbar.context';

interface Props {
  conversationSubset: CaseConversationSubset;
}

export const ConversationComponent = ({ conversationSubset }: Props) => {
  const {
    state: { selectedConversation, messageIsStreaming },
    handleSelectConversation,
    handleUpdateConversation,
  } = useContext(HomeContext);

  const { handleDeleteConversation } = useContext(ChatbarContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  
  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (conversationSubset._id === selectedConversation?._id && e.key === 'Enter') {
      e.preventDefault();
      selectedConversation && handleRename(conversationSubset);
    }
  };

  const handleDragStart = (
    e: DragEvent<HTMLButtonElement>,
    conversationSubset: CaseConversationSubset,
  ) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('conversation', JSON.stringify(conversationSubset));
    }
  };

  const handleRename = (conversationSubset: CaseConversationSubset) => {
    if (conversationSubset._id === selectedConversation?._id && renameValue.trim().length > 0) {
      handleUpdateConversation(selectedConversation, {
        key: 'name',
        value: renameValue,
      });
      setRenameValue('');
      setIsRenaming(false);
    }
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isDeleting) {
      handleDeleteConversation(conversationSubset);
    } else if (isRenaming) {
      handleRename(conversationSubset);
    }
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleOpenRenameModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    selectedConversation && setRenameValue(selectedConversation.name);
  };
  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  return (
    <div className="relative flex items-center">
      {isRenaming && selectedConversation?._id === conversationSubset._id ? (
        <div className=" flex w-full items-center gap-3 rounded-lg bg-[#556BB1]/90 p-3">
          <IconMessage size={18} />
          <input
            className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        </div>
      ) : (
        <button
  className={`flex w-3/4 ml-5 cursor-pointer items-center gap-2 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#556BB1]/90 ${
    messageIsStreaming ? 'disabled:cursor-not-allowed' : ''
  } ${
    selectedConversation?._id === conversationSubset._id
      ? 'bg-[#475792]'
      : 'bg-[#5c77da]'
  }`}
  onClick={() => handleSelectConversation(conversationSubset)}
  disabled={messageIsStreaming}
  draggable="true"
  onDragStart={(e) => handleDragStart(e, conversationSubset)}
>
  <IconBriefcase size={18} />
  <div className="gap-4 flex">
    <div className="overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] ">
      {conversationSubset.name}
    </div>
    {conversationSubset.createdDate && (
      <div className="text-right text-[8px]">
        {conversationSubset.createdDate}
      </div>
    )}
  </div>
</button>

      )}

      {/* {(isDeleting || isRenaming) &&
        selectedConversation?._id === conversationSubset._id && (
          <div className="absolute right-1 z-10 flex text-gray-300">
            <SidebarActionButton handleClick={handleConfirm}>
              <IconCheck size={15} />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleCancel}>
              <IconX size={15} />
            </SidebarActionButton>
          </div>
        )}

      {selectedConversation?._id === conversationSubset._id &&
        !isDeleting &&
        !isRenaming && (
          <div className="absolute right-0 z-10 flex text-gray-300">
            <SidebarActionButton handleClick={handleOpenRenameModal}>
              <IconPencil size={15} />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleOpenDeleteModal}>
              <IconTrash size={15} />
            </SidebarActionButton>
          </div>
        )} */}
    </div>
  );
};
