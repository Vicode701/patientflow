import { IconFileExport, IconSettings, IconLogout, IconUser, IconLayoutDashboard, IconTemplate } from '@tabler/icons-react';
import { useContext, useState } from 'react';
//import { useRouter } from 'next/router';
import HomeContext from '@/types/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import { SidebarButton } from '../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar/Chatbar.context';
import { signOut, useSession } from 'next-auth/react';

export const Dashboard = () => {
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const { data: session, status } = useSession();
  
  const {
    state: {
      conversationSubsets,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleApiKeyChange,
  } = useContext(ChatbarContext);
  //const router = useRouter();

  function handleShowDashboard() {
    //throw new Error('Function not implemented.');
  }

  return (
    <div className='flex flex-col items-center'>
      <button
        className='flex gap-4 w-3/4 h-[35px] mb-[10px] items-center mr-5 rounded-md pl-2 text-white bg-[#5c77da]'
        onClick={() => {
          handleShowDashboard();
        }}
      >
        <IconLayoutDashboard size={20} />
        Dashboard
      </button>
    </div>
  );
};
