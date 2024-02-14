import {
  IconCheck,
  IconCopy,
  IconEdit,
  IconRobot,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { FC, memo, useContext, useEffect, useRef, useState } from 'react';
import { updateConversation } from '@/utils/app/conversation';
import { CaseConversationSubset, Message } from '@/types/chat';
import HomeContext from '../../types/home.context';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';


export interface Props {
  message: Message;
  messageIndex: number;
  userId: string;
  onEdit?: (editedMessage: Message) => void
}

export const ChatMessage: FC<Props> = memo(({ message, messageIndex, userId, onEdit }) => {

  const {
    state: { selectedConversation, conversationSubsets, messageIsStreaming },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState(message.content); 
  const [messagedCopied, setMessageCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    if (message.content != messageContent) {
      if (selectedConversation && onEdit) {
        onEdit({ ...message, content: messageContent });
      }
    }
    setIsEditing(false);
  };

  const handleDeleteMessage = () => {
    if (!selectedConversation) return;
    const { messages } = selectedConversation;
    const findIndex = messages.findIndex((elm) => elm === message);

    if (findIndex < 0) return;

    if (
      findIndex < messages.length - 1 &&
      messages[findIndex + 1].role === 'assistant'
    ) {
      messages.splice(findIndex, 2);
    } else {
      messages.splice(findIndex, 1);
    }
    const updatedConversation = {
      ...selectedConversation,
      messages,
    };

    const updatedConversationSubset: CaseConversationSubset = {
      _id: updatedConversation._id,
      userId: updatedConversation.userId,
      name: updatedConversation.name,
      messagesCount: updatedConversation.messages.length,
      createdDate: updatedConversation?.createdDate
    }

    const { all } = updateConversation(
      updatedConversation,
      conversationSubsets,
    );

    homeDispatch({ field: 'selectedConversation', value: updatedConversation });
    homeDispatch({ field: 'conversationSubsets', value: all });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isTyping && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
  };

  const copyOnClick = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(message.content!).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    setMessageContent(message.content);
  }, [message.content]);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  return (
    <div
      className={`group md:px-4 ${
        message.role === 'assistant'
          ? 'border-b border-black/10 bg-gray-50 text-red-500'
          : 'border-b border-black/10 bg-white text-gray-800'
      }`}
      style={{ overflowWrap: 'anywhere' }}
    > 
      <div className="relative m-auto flex p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] text-right font-bold">
          {message.role === 'assistant' ? (
            <IconRobot size={30} />
          ) : (
            <IconUser size={30} />
          )}
        </div>

        <div className="prose mt-[-2px] w-full">
          {message.role === 'user' ? (
            <div className="flex w-full">
              {isEditing ? (
                <div className="flex w-full flex-col">
                  <textarea
                    ref={textareaRef}
                    className="w-full resize-none whitespace-pre-wrap border-none"
                    value={messageContent}
                    onChange={handleInputChange}
                    onKeyDown={handlePressEnter}
                    onCompositionStart={() => setIsTyping(true)}
                    onCompositionEnd={() => setIsTyping(false)}
                    style={{
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      padding: '0',
                      margin: '0',
                      overflow: 'hidden',
                    }}
                  />

                  {/* Message to users while model is generating  */}

                  {/* {message.role === 'user' && messageIsStreaming &&  selectedConversation && selectedConversation.messages.length < 2 && (
                    // <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60">
                      <p>Hey Doc! hang in tight while I help you generate the best response </p>
                    // </div>
                  )} */}
                  
                  <div className="mt-10 flex justify-center space-x-4">
                    <button
                      className="h-[40px] rounded-md bg-blue-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-blue-600 disabled:opacity-50"
                      onClick={handleEditMessage}
                      disabled={messageContent!.trim().length <= 0}
                    >
                      {'Save & Submit'}
                    </button>
                    <button
                      className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                      onClick={() => {
                        // if (message.role === 'user') {
                        //   setChiefComplaintContent(message.chiefComplaintContent!);
                        //   setChiefComplaintContent(message.clinicalSummaryContent!);
                        // } else {
                        // setModelResponseContent(message.modelResponse!);
                        // }
                        setMessageContent(message.content);
                        setIsEditing(false);
                      }}
                    >
                      {'Cancel'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose whitespace-pre-wrap flex-1">
                  {message.content}
                </div>
              )}

              {!isEditing && (
                <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700"
                    onClick={toggleEditing}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700"
                    onClick={handleDeleteMessage}
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-row'
            >
              <MemoizedReactMarkdown
                className='prose flex-1'
                components={{
                  table({ children }) {
                    return (
                      <table className="border-collapse border border-black px-3 py-1">
                        {children}
                      </table>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="break-words border border-black px-3 py-1">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {`${message.content}${
                  messageIsStreaming && messageIndex == (selectedConversation?.messages.length ?? 0) - 1 ? '`▍`' : ''
                }`}
              </MemoizedReactMarkdown>

              <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                {messagedCopied ? (
                  <IconCheck
                    size={20}
                    className="text-green-500"
                  />
                ) : (
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700"
                    onClick={copyOnClick}
                  >
                    <IconCopy size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer message */}
      {message.role === 'assistant' && (<div className="px-3 pt-2 pb-3 text-center text-[12px] text-black/50 md:px-4 md:pt-3 md:pb-6">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          PatientFlowHQ
        </a>
        .{' '}
        {"may produce inaccurate information about diagnosis and management of medical conditions. Please ensure adequate clinician oversight while using this platform. See further"}
        {' '}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          disclaimer
        </a>
      </div>)}
    </div>
  );
});
ChatMessage.displayName = 'ChatMessage';
