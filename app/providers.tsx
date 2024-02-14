'use client'

import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function Providers({children}: {children: React.ReactNode}) {
  const queryClient = new QueryClient();
  return (
    <div className={inter.className}>
      <Toaster /> 
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}

export default Providers;
