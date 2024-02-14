'use client'

import { useState } from 'react';
import { getSession, signIn, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import Layout from '@/components/Layout/Layout';
import { resetPassword } from "./passwordresetaction"; 
import { z } from "zod";

export interface PasswordResetProp {
    token: string;
};

const PasswordReset = ({ token }: PasswordResetProp) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { data: session } = useSession();

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updated = await resetPassword(password, confirmPassword, token);
    if (updated) {
       setMessage("Successfully changed password. Please login with the new password");
    } else {
        setError("Failed to update password");
    }

};

  return (
  <div>
    {busy && <Spinner size="30px" className="mx-auto" />}  
    {!session?.user.token && (
        <Layout disableFooter={false} disableLoginBtn={true} disableSignupBtn={false}>
        <div className='flex flex-col mb-5px mx-auto gap-0 justify-center bg-[#566CB0] opacity-75 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-lg px-4 sm:px-6 md:px-8 pt-6 pb-8 mb-8'>
            {error && <p className='text-red-500 mb-5px'>{error}</p>}
            {message && <p className='text-whitemb-5px'>{message}</p>}
            <form className='w-full mt-10px' onSubmit={handleReset}>
                <div className="mb-4">
                <input
                    name='password'
                    type='password'
                    placeholder="New password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
                </div>
                <div className="mb-4">
                <input
                    name='confirmPassword'
                    type='password'
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
                </div>
                <div className="flex items-center justify-between pt-4">
                <button 
                    className='bg-[#EA5B7B] w-[40%] text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out' 
                    type="submit"
                    disabled={busy} 
                    style={{opacity: busy ? 0.5 : 1}}
                >
                    Change password
                </button>
                </div>            
            </form>
        </div>
    </Layout>
    )}
</div>
  );
};

export default PasswordReset;
