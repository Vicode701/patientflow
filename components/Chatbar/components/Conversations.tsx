import { CaseConversationSubset } from '@/types/chat';

import { ConversationComponent } from './Conversation';

interface Props {
  conversationSubsets: CaseConversationSubset[];
}

export const Conversations = ({ conversationSubsets }: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {conversationSubsets
        .slice()
        .reverse()
        .map((conversationSubset, index) => (
          <ConversationComponent key={index} conversationSubset={conversationSubset} />
        ))}
    </div>
  );
};
