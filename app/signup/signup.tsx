'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Spinner from '@/components/Spinner/Spinner';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

interface SignupProp {
  onFormSwitch(formName: string): void;
}

const Signup = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);


  const { data: session } = useSession();

  const handleCredentialSignup = async (e: any) => {
    // Handle signup logic here
    e.preventDefault();
    setBusy(true);

    const formData = new FormData(e.target);
    try {

      // const result = await signIn("credentials", {
      //   //callbackUrl: `/home/${session?.user.userId}`, // where to redirect the user after successful sign-in
      //   name: formData.get("name"),
      //   email: formData.get("email"),
      //   password: formData.get("password"),
      // });

      // if (result?.error) {
      //   setError('Login Failed. Email/Password mismatch');
      //   setBusy(false);
      // }

      const userId = session?.user.userId!;
      setError('Sign up not supported at moment');
      setBusy(false);

      //Disable sign  up for now
      //router.push(`/home/${userId}`);
    } catch (error) {
      setError('An unexpected error occurred.');
      setBusy(false);
      throw error;
    }
  };

  const handleEmailSignup = async (e: any) => {
    e.preventDefault();
    setBusy(true);
    //console.log('Handling email login');
    // Sign-in logic with email, password
    const formData = new FormData(e.target);
    try {
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
  return (
    <div>
      {busy && <Spinner size="20px" className="mx-auto" />}
      {!session?.user.token && (
        <Layout disableFooter={false} disableLoginBtn={false} disableSignupBtn={true}>
          <div className='flex flex-col mx-auto gap-0 justify-center bg-[#566CB0]  w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-lg px-4 sm:px-6 md:p-10 pt-6 pb-8 my-8'>
            {error && <p className='text-red-500'>{error}</p>}
            <p className='text-white mb-4 text-lg'>Create an Account with PatientflowHQ</p>
            <p className='text-white mb-6 text-xs'>Write Better Notes and Organize Your patient care Work-Flow
              Enter Details below to  Signup</p>


            <form className='w-full' onSubmit={handleCredentialSignup}>
              <div className='flex flex-col md:flex-row justify-between'>
                <div className="md:w-[48%] mb-4">
                  <input
                    name='fname'
                    type='name'
                    placeholder="First Name *"
                    className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                  />
                </div>
                <div className=" md:w-[48%] mb-4">
                  <input
                    name='lname'
                    type='name'
                    placeholder="Last Name *"
                    className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  name='email'
                  type='email'
                  placeholder="Enter Email Address *"
                  className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
              </div>
              <div className="mb-4">
                <input
                  name='clinical-role'
                  type='name'
                  placeholder="Clinical Role *"
                  className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
              </div>
              <div className="mb-4">
                <input
                  name='title'
                  type='name'
                  placeholder="Title"
                  className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
              </div>
          


              <div className="border-t my-8 border-white/30 flex-grow"></div>

              <div className="mb-4">
                <input
                  name="password"
                  type="password"
                  placeholder="Password *"
                  className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
              </div>

              <div className="mb-2">
                <input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password *"
                  className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                />
              </div>

              <div className='mt-8 flex flex-col gap-4'>

                <div className="flex items-center mb-4">
                  <input
                    id="agreeTos"
                    name="agreeTos"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    onChange={() => setAgreeTos(!agreeTos)}
                  />
                  <label
                    htmlFor="agreeTos"
                    className="ml-2 block text-xs text-white/80"
                  >
                    I agree to PatientflowHQ
                    Policy
                    <Link className="mx-1" href="/privacy-policy">
                      <span className="text-primary link-color">Terms of Services,</span>
                    </Link>
                    and
                    <Link className="ml-1" href="/terms-condition">
                      <span className="text-primary link-color">Privacy Policy</span>
                    </Link>
                    .
                  </label>
                </div>


                <div className="flex  mb-4">
                  <input
                    id="agreeTos"
                    name="agreeTos"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    onChange={() => setAgreeTos(!agreeTos)}
                  />
                  <label
                    htmlFor="agreeTos"
                    className="ml-2 block text-xs text-white/80"
                  >
                    I attest that I am a clinician and or Clinical Team Member
                    and I attest that PatientflowHQ is not responsible for use
                    without clinician oversight.
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-center my-4 pt-4">
                <button
                  className='bg-[#EA5B7B] w-full text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out'
                  type="submit"
                  disabled={busy}
                  style={{ opacity: busy ? 0.5 : 1 }}
                >
                  Create a PatientflowHQ Account                    </button>
              </div>

            </form>

          </div>
        </Layout>
      )}
    </div>
  );
};

export default Signup;
