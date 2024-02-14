'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, signIn, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import { z } from "zod";

const Login = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCredentialsLogin = async (e: any) => {
    e.preventDefault();
    setBusy(true);
    //console.log('Handling credentials login');
    const formData = new FormData(e.target);

    //validate inputs here
    // Sign-in logic with email, password
    try{
        const result = await signIn("credentials", {
            callbackUrl: '/staging',//`/home/${session?.user.userId}`, // where to redirect the user after successful sign-in
            email: formData.get("email"),
            password: formData.get("password")
        });
    
        if (result?.ok) {
          setBusy(false);
        }
        
    } catch (error) {
        setError('An unexpected error occurred.');
        setBusy(false);
        throw error;
    }
  };

  const handleEmailLogin = async (e: any) => {
    e.preventDefault();
    setBusy(true);
    // Sign-in logic with email, password
    const formData = new FormData(e.target);
    try{
        const updatedSession = await getSession();
        const userId = updatedSession?.user.userId!;
        //console.log(`userId: ${userId}`);
        const result = await signIn("email", {
            callbackUrl: '/staging', // where to redirect the user after successful sign-in
            email: formData.get("email")
        });

        setBusy(false);
    } catch (error) {
        setError('An unexpected error occurred.');
        setBusy(false);
        throw error;
    }
  };

  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();
    setBusy(true);
    //console.log('Handling google login');
    const updatedSession = await getSession();
    const userId = updatedSession?.user.userId!;
    //console.log(`userId: ${userId}`);
    // Sign-in logic with email, password
    try{
        const result = await signIn('google',
        {
            callbackUrl: `/staging`, // where to redirect the user after successful sign-in
        });

    setBusy(false);
    } catch (error) {
        // if (error.message === 'OAuthAccountNotLinked') {

        // }

        setError('An unexpected error occurred.');
        setBusy(false);
        //console.log(`${error}`);
        throw error;
    }
  };

  return (
  <div>
  {busy && <Spinner size="30px" className="mx-auto" />}  
  {!session?.user.token && (
    <Layout disableFooter={false} disableLoginBtn={true} disableSignupBtn={false}>
      <div className='flex flex-col mx-auto gap-0 justify-center bg-[#566CB0] w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-lg px-4 sm:px-6 md:p-16 pt-6 pb-8 my-8'>
          {error && <p className='text-red-500'>{error}</p>}
        <p className='text-white mb-6 text-xl'>Login</p>

          <form className='w-full' onSubmit={handleCredentialsLogin}>
            <div className="mb-4">
              <input
                name='email'
                type='email'
                placeholder="Enter Your Email Address"
                className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
              />
            </div>
            <div className="mb-2">
              <input
                name="password"
                type="password"
                placeholder="Enter your Password"
                autoComplete="current-password"
                className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
              />
            </div>
            <div className="mb-4 text-right">
              <Link href="/passwordresetrequest">
              <button
                className="link-btn text-white text-xs hover:text-white-500 hover:underline w-full text-right"
              >
                Forgot password?
              </button>
              </Link>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button 
                className='bg-[#EA5B7B] w-full text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out' 
                type="submit"
                disabled={busy} 
                style={{opacity: busy ? 0.5 : 1}}
              >
                Login
              </button>
            </div>
            <Link href="/signup">
              <button
                className="link-btn text-white text-xs hover:text-white-500 hover:underline"
              >
                Don't have an account? <span className='link-color'>Signup</span>
              </button>
            </Link>

          </form>
         
        </div>
    </Layout>
    )}
  </div>
  );
};

export default Login;
