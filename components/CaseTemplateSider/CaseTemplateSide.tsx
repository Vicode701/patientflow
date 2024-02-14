import { IconFileExport, IconSettings, IconLogout, IconUser, IconLayoutDashboard, IconTemplate, IconCalendarTime } from '@tabler/icons-react';
import { useContext, useState } from 'react';
//import { useRouter } from 'next/router';
import HomeContext from '@/types/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';
import { CaseTemplate } from '../CaseTemplates/CaseTemplates'
import { SidebarButton } from '../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar/Chatbar.context';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const CaseTemplateSide = ({onCaseTemplate }: { onCaseTemplate: (data: any) => void }) => {
  const [isCaseOpen, setIsCaseOpen] = useState<boolean>(false);
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

  function handleShowNoteTemplates() {
    //throw new Error('Function not implemented.');
    onCaseTemplate('casetemplate');
  }

  return (
    <div className="flex flex-col items-center">
      <Link
      href={'/category'}
        className="flex gap-4 w-3/4 h-[35px] mb-[10px] items-center mr-5 rounded-md pl-2 text-white bg-[#5c77da]"
        // onClick={() => {
        //   handleShowNoteTemplates();
        // }}
      >
        <IconCalendarTime size={20} />
        Case templates
      </Link>

      {/* <CaseTemplate
          open={isCaseOpen}
          onClose={() => {
            setIsCaseOpen(false);
        }}
      /> */}
    </div>
  );
};
