import { CaseConversation, CaseConversationSubset } from '@/types/chat';

export const updateConversation = (
  updatedConversation: CaseConversation,
  allConversationSubsets: CaseConversationSubset[],
) => {
  const updatedConversationSubsets = allConversationSubsets.map((c) => {
    if (c._id === updatedConversation._id) {
      const conversationSubset: CaseConversationSubset = {
        _id: updatedConversation._id,
        name: updatedConversation.name,
        userId: updatedConversation.userId,
        messagesCount: updatedConversation.messages.length,
        createdDate: updatedConversation?.createdDate
      }

      return conversationSubset;
    }

    return c;
  });

  updateConversationName(updatedConversation);

  return {
    single: updatedConversation,
    all: updatedConversationSubsets,
  };
};

export const saveConversation = async (conversation: CaseConversation) => {
  // Save selected conversations in localStorage
  //console.log(`Saving conversation ${conversation._id} in DB`)
  saveItemLocal('selectedConversation', conversation.userId, conversation);
  //const body = JSON.stringify(conversation);
  const controller = new AbortController();

  const response = await fetch('/api/case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
    body: JSON.stringify(conversation),
  });
  
};

// Only support updating the caseConversation name since users may prefer another name
export const updateConversationName = async (caseConversation: CaseConversation) => {
  // Save selected conversations in localStorage
  const controller = new AbortController();
  //console.log(`U[dating case ${caseConversation._id} in DB`);

  const response = await fetch('/api/case?rename=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
    body: JSON.stringify(caseConversation),
  });
  
};

  export const deleteConversationsHistory = async (userId: string) => {
    const controller = new AbortController();
    //console.log(`Deleting all cases for user ${userId} from DB`);
    
    const response = await fetch('/api/case', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        userId: userId
      }),
    });
};

export const deleteConversation = async (caseConversationSubset: CaseConversationSubset) => {
  // This may update existing conversations or create new ones in the DB 
  const controller = new AbortController();
  //console.log('Calling DELETE on rote api/case');
  //console.log(`Deleting case ${caseConversationSubset._id} from DB`);
  const response = await fetch('/api/case', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
    body: JSON.stringify({
    _id: caseConversationSubset._id,
    }),
  });
};

export const getConversation = async ( userId: string, caseId: string): Promise<CaseConversation | null> => {
  // Get conversation history from DB
  const controller = new AbortController();
  //console.log(`Getting case ${caseId} for user ${userId} from DB`);
  const response = await fetch(`/api/case?userId=${userId}&caseId=${caseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get conversation. HTTP Status: ${response.status}`);
  }

  const res = await response.json();
  if (res.data) {
    const conversations: CaseConversation[] = JSON.parse(res.data);
    return conversations[0];
  }

  return null;
};

export const getConversationSubsets = async ( userId: string) => {
  // Get conversation history from DB
  //console.log(`Getting all conversations for user ${userId}`);
  const controller = new AbortController();
  const response = await fetch(`/api/case?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
  });

  const res = await response.json();
  if (res.data){
    const conversations = JSON.parse(res.data) as CaseConversation[];
  
    //Create conversationSubsets
    let caseSubsets = Array<CaseConversationSubset>();

    conversations.map(
        conversation => {
          const newConversationSubset: CaseConversationSubset = {
            _id: conversation._id,
            userId: conversation.userId,
            name: conversation.name,
            messagesCount: conversation.messages.length,
            createdDate: conversation?.createdDate
          };
          caseSubsets.push(newConversationSubset);
        }
    );
    
    return caseSubsets;
  }
};


export const saveItemLocal = ( itemName: string, userId: string, item: any) => {
  // Save in localStorage
  localStorage.setItem(`${itemName}_${userId}`, JSON.stringify(item));
};

export const getItemLocal = ( itemName: string, userId: string) => {
  // Get from localStorage
  //console.log(`Getting ${itemName}_${userId} from local storage`);
  const item = localStorage.getItem(`${itemName}_${userId}`);
  
  if (item) {
    //console.log(`item is ${JSON.stringify(item)}`);
    return JSON.parse(item);
  } else {
    return null;
  }
};