import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IconActivityHeartbeat } from '@tabler/icons-react';
import { signOut } from 'next-auth/react'; 
import { DefaultUser, Session } from 'next-auth';

interface GlobalLayoutProps {
  children: ReactNode;
  token: string;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, token }) => {
  return (
    <div className="flex flex-col bg-[#EBF0FF] w-full">
      <nav className="bg-white w-full text-black p-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.20)] sticky top-0">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-2 sm:space-x-4 h-6">
            {token && (
              <button className="bg-white border border-[#556BB1] hover:bg-[#EC5A7B] text-[#556BB1] py-1 px-2 sm:px-4 rounded"
              onClick={() => signOut({callbackUrl: `${window.location.origin}/login`})}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* <div className="border-t-2 border-gray-300 my-auto"></div> */}
      <main className="flex-grow p-2 sm:p-4">
        {children}
      </main>
    </div>
  );
}

export default GlobalLayout;
