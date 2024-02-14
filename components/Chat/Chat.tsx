import { IconClearAll, IconSettings } from '@tabler/icons-react';
import {
  MutableRefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  saveConversation,
  saveItemLocal,
} from '@/utils/app/conversation';
import { throttle } from '@/utils/data/throttle';
import { ChatBody, CaseConversation, Message, CaseConversationSubset } from '@/types/chat';
import { Plugin } from '@/types/plugin';
import HomeContext from '../../types/home.context';
import Spinner from '../Spinner';
import { ChatInput } from './ChatInput';
import { ChatLoader } from './ChatLoader';
import { ErrorMessageDiv } from './ErrorMessageDiv';
import { ModelSelect } from './ModelSelect';
import { TemperatureSlider } from './Temperature';
import { MemoizedChatMessage } from './MemoizedChatMessage';
import { FeedbackForm } from '../Feedback/Feedback';
import { ErrorMessageContent } from '@/utils/app/const';
import {LandingMessage} from './LandingMessage'
import { OpenAIModelID, OpenAIModels } from '@/types/openai';

interface Props {
  stopConversationRef: MutableRefObject<boolean>;
  userId: string;
  caseTemplateValue: String
}

export const Chat = memo(({ stopConversationRef, userId, caseTemplateValue }: Props) => {

  const {
    state: {
      selectedConversation,
      conversationSubsets,
      isErrorOccurred,
      messageIsStreaming,
      messageDoneStreaming,
      feedbackSent,
      apiKey,
      modelError,
      loading,
    },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chiefComplaintTextareaRef = useRef<HTMLTextAreaElement>(null);
  const clinicalSumTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [currentPage, setCurrentPage] = useState('casecategory');


  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      if (selectedConversation) {
        let updatedConversation: CaseConversation;
        if (deleteCount) {
          const updatedMessages = [...selectedConversation.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ...selectedConversation,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
          };
        }

        homeDispatch({
          field: 'selectedConversation',
          value: updatedConversation,
        });
        homeDispatch({ field: 'loading', value: true });
        homeDispatch({ field: 'messageIsStreaming', value: true });
        const chatBody: ChatBody = {
          messages: updatedConversation.messages,
          model: updatedConversation.model,
          key: apiKey,
          temperature: updatedConversation.temperature,
          billableCategories: undefined
        };
        let body;
        if (!plugin) {
          body = JSON.stringify(chatBody);
        } else {
          body = JSON.stringify({
            ...chatBody,
          });
        }
        const controller = new AbortController();

        const categoriesResponse = await fetch('../api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body,
        });
        if (!categoriesResponse.ok) {
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          homeDispatch({ field: 'isErrorOccurred', value: true });

          //Display error in a user friendly way.          
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: 'assistant', content: ErrorMessageContent,  },
          ];
          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };


          console.log(`Updating selectedConversation to ${JSON.stringify(updatedConversation)}`);
          homeDispatch({
            field: 'selectedConversation',
            value: updatedConversation,
          });
        }
        const categoriesResponseData = await categoriesResponse.json();

        if (categoriesResponseData.data) {
          chatBody.billableCategories = JSON.parse(categoriesResponseData.data) as string[];  
        }

        body = JSON.stringify({
          ...chatBody,
        });
        const response = await fetch('../api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body,
        });
        if (!response.ok) {
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          homeDispatch({ field: 'isErrorOccurred', value: true });
          
          //Display error in a user friendly way
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: 'assistant', content: ErrorMessageContent,  },
          ];
          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };


          console.log(`1 Updating selectedConversation to ${JSON.stringify(updatedConversation)}`);
          homeDispatch({
            field: 'selectedConversation',
            value: updatedConversation,
          });


        }
        const data = response.body;

        if (!data) {
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          homeDispatch({ field: 'isErrorOccurred', value: true });
          return;
        }
        if (!plugin) {
          if (updatedConversation.messages.length === 1) {
            const { content } = message;
            const startingLineLength = 'Chief complaint:'.length;
            const customName =
            content.length > 30 ? content.substring(startingLineLength,  startingLineLength + 30) + '...' : content.substring(startingLineLength, startingLineLength + 30);
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            };
          }
          homeDispatch({ field: 'loading', value: false });
          const reader = data.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let isFirst = true;
          let text = '';
          while (!done) {
            if (stopConversationRef.current === true) {
              controller.abort();
              done = true;
              break;
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            text += chunkValue;
            if (isFirst) {
              isFirst = false;
              const updatedMessages: Message[] = [
                ...updatedConversation.messages,
                { role: 'assistant', content: chunkValue,  },
              ];
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              });
            } else {
              const updatedMessages: Message[] =
                updatedConversation.messages.map((message, index) => {
                  if (index === updatedConversation.messages.length - 1) {
                    return {
                      ...message,
                      content: text,
                    };
                  }
                  return message;
                });
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              });
            }
          }
          saveConversation(updatedConversation);

          const updatedConversationSubset: CaseConversationSubset = {
            _id: updatedConversation._id,
            name: updatedConversation.name,
            userId: updatedConversation.userId,
            messagesCount: updatedConversation.messages.length,
            createdDate: updatedConversation?.createdDate
          };

          const updatedConversationSubsets: CaseConversationSubset[] = conversationSubsets.map(
            (conversationSubset) => {
              if (selectedConversation && conversationSubset._id === selectedConversation._id) {
                return updatedConversationSubset;
              }
              return conversationSubset;
            },
          );

          if (updatedConversationSubsets.length === 0) {
            updatedConversationSubsets.push(updatedConversationSubset);
          }

          homeDispatch({ field: 'conversationSubsets', value: updatedConversationSubsets });
          saveItemLocal('conversationSubsets', userId, updatedConversationSubsets);
          homeDispatch({ field: 'messageIsStreaming', value: false });
          homeDispatch({ field: 'messageDoneStreaming', value: true });
        }
      }
    },
    [
      apiKey,
      selectedConversation,
      stopConversationRef,
    ],
  );

  const scrollToBottom = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      chiefComplaintTextareaRef.current?.focus();
    }
  }, [autoScrollEnabled]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
        setShowScrollDownButton(true);
      } else {
        setAutoScrollEnabled(true);
        setShowScrollDownButton(false);
      }
    }
  };

  const handleScrollDown = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const onClearAll = () => {
    // if (
    //   confirm(t<string>('Are you sure you want to clear all messages?')) &&
    //   selectedConversationSubset
    // ) {
    //   // handleUpdateConversation(selectedConversationSubset, {
    //   //   key: 'messages',
    //   //   value: [],
    //   // });
    // }
  };

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  // useEffect(() => {
  //   console.log('currentMessage', currentMessage);
  //   if (currentMessage) {
  //     handleSend(currentMessage);
  //     homeDispatch({ field: 'currentMessage', value: undefined });
  //   }
  // }, [currentMessage]);

  useEffect(() => {
    throttledScrollDown();
      selectedConversation && selectedConversation.messages && selectedConversation.messages.length >= 2 &&
      setCurrentMessage(
        selectedConversation.messages[selectedConversation.messages.length - 2],
      );
  }, [selectedConversation, throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          chiefComplaintTextareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef]);

  const defaultComponent = () => {
    return (
      <>
      {/* Remove Chat input after a case has been processed */}
      { !messageIsStreaming && selectedConversation && selectedConversation.messages && selectedConversation.messages.length !== 2 &&
        (
        <ChatInput
          stopConversationRef={stopConversationRef}
          chiefComplaintTextareaRef={chiefComplaintTextareaRef}
          clinicalSumTextareaRef={clinicalSumTextareaRef}
          onSend={(message, plugin) => {
            setCurrentMessage(message);
            handleSend(message, 0, plugin);
          }}
          onScrollDownClick={handleScrollDown}
          onRegenerate={() => {
            if (currentMessage) {
              handleSend(currentMessage, 2, null);
            }
          }}
          showScrollDownButton={showScrollDownButton}
        />
        )}
      <div
        className="max-h-full overflow-x-hidden"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {selectedConversation && selectedConversation.messages && selectedConversation.messages.length === 0 ? (
          <>
            <div className="mx-auto flex flex-col space-y-5 md:space-y-10 px-3 pt-5 md:pt-12 sm:max-w-[600px]">
            </div>
          </>
        ) : (
          <>
            {selectedConversation && selectedConversation.messages && selectedConversation?.messages.map((message, index) => (
              <MemoizedChatMessage
                key={index}
                message={message}
                userId={userId}
                messageIndex={index}
                onEdit={(editedMessage) => {
                  setCurrentMessage(editedMessage);
                  // discard edited message and the ones that come after then resend
                  handleSend(
                    editedMessage,
                    selectedConversation?.messages.length - index,
                  );
                }}
              />
            ))}

            {loading && <ChatLoader />}

            <div
              className="h-[162px] bg-white"
              ref={messagesEndRef}
            />
          </>
        )
      }
      </div>
      {/* Display Feedback form*/}
      <div>                  
        { !feedbackSent && messageDoneStreaming && selectedConversation?._id && selectedConversation.userId &&
          ( 
            <div className='flex mb-10 mt-10'>
              {/* <div className='text-black text-lg  md:py-[120px] md:mx-5'>
                What do you think?
              </div> */}
              {/* <div className='text-black mx-auto flex flex-col px-3 py-5 md:px-5 sm:max-w-[600px]'> */}
              <div className='text-black mx-auto px-3'>
                <FeedbackForm caseId={selectedConversation?._id} userId={selectedConversation?.userId} />
              </div>
            </div>
          )
        }
      </div>
    </>
    )
  }

  const handleCurrentPage = (page: String) => {
    switch (page) {
      case 'casetemplate':
        return (
        <LandingMessage label='Test Label' onChangeTemperature = {() => {}}/>
        )
        
        default : return defaultComponent()
    }
  }

  return (
    <div className="relative overflow-auto flex-1  bg-white">
      { modelError ? (
        <ErrorMessageDiv error={modelError} />
      ) : (
        handleCurrentPage(caseTemplateValue)
      )}
    </div>
  );
});
Chat.displayName = 'Chat';

export default Chat;