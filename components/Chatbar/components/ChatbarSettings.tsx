import { IconFileExport, IconSettings, IconLogout, IconUser } from '@tabler/icons-react';
import { useContext, useState } from 'react';
//import { useRouter } from 'next/router';
import HomeContext from '../../../types/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import { signOut, useSession } from 'next-auth/react';

export const ChatbarSettings = () => {
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const { data: session, status } = useSession();
  
  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversationSubsets,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleApiKeyChange,
  } = useContext(ChatbarContext);
  //const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-2 border-t border-white/20 text-sm">
      {/* <div className='flex mt-8 gap-4 w-3/4 h-[35px] items-center mr-5 rounded-md text-white bg-[#9ED5C0]'>
      {conversationSubsets.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}
      </div> */}

      <div className='flex mt-8 gap-4 w-3/4 h-[35px]  items-center mr-5 rounded-md text-white bg-[#9ED5C0]'>
        <SidebarButton
          text={'Settings'}
          icon={<IconSettings color='black' size={18} />}
          onClick={() => setIsSettingDialog(true)}
        />
      </div>
      
      <div  className='flex gap-4 w-3/4 h-[35px] mb-[10px] items-center mr-5 rounded-md text-white bg-[#9ED5C0]'>
        <SidebarButton
          text={'Log out'}
          icon={<IconLogout color='black' size={18} />}
          onClick={() => signOut({callbackUrl: `${window.location.origin}/login`})}
        />
      </div>     
      
      <div  className='flex gap-4 w-3/4 h-[35px] mb-[10px] items-center mr-5 rounded-md text-white overflow-hidden text-ellipsis overflow-ellipsis bg-[#9ED5C0]'>
        <SidebarButton
          text={session?.user ? session?.user.email! : 'Profile'}
          icon={<IconUser color='black' size={18} />}
          onClick={() => {} /*signOut({callbackUrl: `${window.location.origin}/auth/login`})*/}
        />
      </div>


      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}
      
      <SettingDialog
          open={isSettingDialogOpen}
          onClose={() => {
          setIsSettingDialog(false);
        }}
      />
    
      
    </div>
  );
};
