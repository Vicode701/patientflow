import {
  IconArrowDown,
  IconBolt,
  IconBrandGoogle,
  IconPlayerStop,
  IconRepeat,
  IconSend
} from '@tabler/icons-react';
import {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Message } from '@/types/chat';
import { Plugin } from '@/types/plugin';
import HomeContext from '../../types/home.context';
import { MODEL_MAX_LENGTH } from '@/utils/app/const';
import ChipTextarea from '../ChipTextArea/ChipTextArea';
import { VariableModal } from './VariableModal';
import Tooltip from '../Tooltip/Tooltip';
import toast from 'react-hot-toast';
import { CommonWorkupOptions, CommonHistoryOptions } from '@/utils/app/const';

interface Props {
  onSend: (message: Message, plugin: Plugin | null) => void;
  onRegenerate: () => void;
  onScrollDownClick: () => void;
  stopConversationRef: MutableRefObject<boolean>;
  chiefComplaintTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  clinicalSumTextareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showScrollDownButton: boolean;
}

export const ChatInput = ({
  onSend,
  onRegenerate,
  onScrollDownClick,
  stopConversationRef,
  chiefComplaintTextareaRef,
  clinicalSumTextareaRef,
  showScrollDownButton,
}: Props) => {

  const {
    state: { selectedConversation, messageIsStreaming, prompts },

    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>('');
  const [chiefComplaintContent, setChiefComplaintContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [promptInputValue, setPromptInputValue] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  //const [problemsChips, setProblemsChips] = useState<string[]>([]);
  const [workupChips, setWorkupChips] = useState<string[]>([]);
  const [medicalHistoryChips, setMedicalHistoryChips] = useState<string[]>([]);

  const promptListRef = useRef<HTMLUListElement | null>(null);

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(promptInputValue.toLowerCase()),
  );

  const createHandleChange = (setInternalContent: React.Dispatch<React.SetStateAction<string | undefined>>, setFinalContent: boolean) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const maxLength = MODEL_MAX_LENGTH;

      if (maxLength && value.length > maxLength) {
        //alert(`Message limit is ${maxLength} characters. You have entered ${value.length} characters.`);
        toast(`Message limit is ${maxLength} characters. You have entered ${value.length} characters.`);
        return;
      }

      setInternalContent(value);
    };
  };

  const handleSend = () => {
    if (messageIsStreaming) {
      //console.log("Message is Streaming");
      return;
    }

    if (!chiefComplaintContent || medicalHistoryChips.length === 0) {
      toast('Please enter chief complaint and some history about patient');
      return;
    }

    //setContent('Chief complaint: ' + chiefComplaintContent + '\n' + 'Clinical summary: ' + medicalHistoryChips);
    let cont = 'Chief complaint: ' + chiefComplaintContent + '\n';
    if (medicalHistoryChips.length !== 0) {
      cont = cont + 'Medical History: \n';
      medicalHistoryChips.map( chip => cont = cont + '-' + chip + '\n');
    }

    if (workupChips.length !== 0) {
      cont = cont + '\n' + 'Important workup: \n';
      workupChips.map( chip => cont = cont + '-' + chip + '\n');
    }
    // if (problemsChips.length !== 0) {
    //   cont = cont + '\n' + 'The following medical problems have also been identified:' + '\n';
    //   problemsChips.map( chip => cont = '- ' + cont + chip + '\n');
    // }

    onSend({ role: 'user', content: cont }, plugin);
    setChiefComplaintContent('');
    setMedicalHistoryChips([]);
    //setProblemsChips([]);
    setWorkupChips([]);
    //setContent('');
    setPlugin(null);

    if (window.innerWidth < 640 && chiefComplaintTextareaRef && chiefComplaintTextareaRef.current) {
      chiefComplaintTextareaRef.current.blur();
    }
    // if (window.innerWidth < 640 && clinicalSumTextareaRef && clinicalSumTextareaRef.current) {
    //   clinicalSumTextareaRef.current.blur();
    // }
  };

  const handleStopConversation = () => {
    stopConversationRef.current = true;
    //console.log('Setting stopConversationRef to true');
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  };

  const isMobile = () => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isTyping && !isMobile() && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  useEffect(() => {
    if (chiefComplaintTextareaRef && chiefComplaintTextareaRef.current) {
      chiefComplaintTextareaRef.current.style.height = 'inherit';
      chiefComplaintTextareaRef.current.style.height = `${chiefComplaintTextareaRef.current?.scrollHeight}px`;
      chiefComplaintTextareaRef.current.style.overflow = `${
        chiefComplaintTextareaRef?.current?.scrollHeight > 400 ? 'auto' : 'hidden'
      }`;
    }

  }, [chiefComplaintContent]);

  return (
    <div className="absolute top-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 md:pt-2 ">
      <div className="stretch mx-2 mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:mt-[52px] md:last:mb-6 lg:mx-auto lg:max-w-3xl ">
      {messageIsStreaming && (
          <button
            className="absolute top-0 left-0 right-0 mx-auto mb-3 flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 md:mb-0 md:mt-2"
            onClick={handleStopConversation}
          >
            <IconPlayerStop size={16} /> {'Stop Generating'}
          </button>
        )}

        <div className="relative mx-2 pb-10 flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          {/*<Tooltip content='Chief complaint'>*/}
            <textarea
              ref={chiefComplaintTextareaRef}
              className="outline-none m-0 w-full resize-y border-0 bg-transparent p-0 py-2 mt-4 pr-8 pl-10 text-black md:py-3 md:pl-10"
              style={{
                resize: 'none',
                bottom: `${chiefComplaintTextareaRef?.current?.scrollHeight}px`,
                maxHeight: '200px',
                overflow: `${
                  chiefComplaintTextareaRef.current && chiefComplaintTextareaRef.current.scrollHeight > 100
                    ? 'auto'
                    : 'hidden'
                }`,
              }}
              placeholder={
                'Enter Chief Complaint' || ''
              }
              value={chiefComplaintContent}
              rows={1}
              onCompositionStart={() => setIsTyping(true)}
              onCompositionEnd={() => setIsTyping(false)}
              onChange={createHandleChange(setChiefComplaintContent, false)}
              onKeyDown={handleKeyDown}
            />
          {/*</Tooltip> */}
        {/* <Tooltip content='Type a comma to insert an entry'> */}
          <ChipTextarea 
            placeHolder='List important information and problems from patient history. Double click here to see common options'
            chips={medicalHistoryChips}
            onChipsChange={setMedicalHistoryChips}
            name="history"
          />
        {/* </Tooltip> */}
          {/* <Tooltip content='Type a comma to insert and entry'> */}
            <ChipTextarea 
              placeHolder='List important workups. Double click here to see common options'
              chips={workupChips}
              onChipsChange={setWorkupChips}
              name="workup"
            />
          {/* </Tooltip> */}          
          <button
            className="bg-[#556BB1] w-1/5 self-center text-white px-4 py-2 mt-12 rounded-md hover:bg-blue-100 flex justify-between items-center"
            onClick={handleSend}
          >
            <span>Submit</span>
            {messageIsStreaming ? (
              <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60"></div>
            ) : (
              <IconSend size={18} />
            )}
          </button>

          {showScrollDownButton && (
            <div className="absolute bottom-12 right-0 lg:bottom-0 lg:-right-10">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onScrollDownClick}
              >
                <IconArrowDown size={18} />
              </button>
            </div>
          )}

          {/* {isModalVisible && (
            <VariableModal
              prompt={filteredPrompts[activePromptIndex]}
              variables={variables}
              onSubmit={handleSubmit}
              onClose={() => setIsModalVisible(false)}
            />
          )} */}
        </div>
      </div>
      <div className="px-3 pt-2 pb-3 text-center text-[12px] text-black/50 md:px-4 md:pt-3 md:pb-6">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          PatientFlowHQ
        </a>
        .{' '}
        {"is your Clinical Work-Flow Assistant. "}
      </div>
    </div>
  );
};