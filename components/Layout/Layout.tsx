'use client';

import React, { ReactNode, useState } from 'react';

import { Viewport } from 'next';
import Link from 'next/link';

export const viewport: Viewport = {
  height: 'device-height',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

interface LayoutProps {
  children: ReactNode;
  disableFooter: boolean;
  disableLoginBtn: boolean;
  disableSignupBtn: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  disableFooter,
  disableLoginBtn,
  disableSignupBtn,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    //     <div className="flex flex-col bg-[#EBF0FF] h-full">
    // <nav className="bg-white text-black py-4 px-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.20)] sticky top-0 z-50">
    //         <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
    //           <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0 md:ml-[-35px] xl:ml-[-10px] 2xl:ml-[-330px]">
    //             <Link href="/">
    //               <img src="/logo.png" alt="Your Logo" className="h-6 w-auto mr-4" />
    //             </Link>

    //           </div>
    //           <div className="flex gap-x-6 sm:space-x-4 h-6">

    //             <Link href="/features"
    //               className="hover:text-gray-300 h-6 text-sm font-bold">H&P Admin Note

    //             </Link>
    //             <Link href="/pricing"
    //               className="hover:text-gray-300 h-6 text-sm font-bold">LOSHQ
    //             </Link>
    //             <Link href="/more"
    //               className="hover:text-gray-300 h-6 text-sm font-bold">Hospitalist Insight
    //             </Link>
    //             <Link href="/more"
    //               className="hover:text-gray-300 h-6 text-sm font-bold">Contact Us
    //             </Link>
    //             {!disableLoginBtn && (
    //               <Link href="/login">
    //                 <button className="bg-[#EC5A7B] border border-[#EC5A7B] hover:bg-[#722a3b] text-white py-1 px-2 sm:px-4 rounded">Login</button>
    //               </Link>
    //             )}
    //             {/* {!disableSignupBtn && (
    //               <Link href="/signup">
    //                 <button className="bg-[#EC5A7B] hover:bg-[#556BB1] text-white py-1 px-2 sm:px-4 rounded">Create Account</button>
    //               </Link>
    //             )} */}
    //           </div>
    //         </div>
    //       </nav>
    //       {/* <div className="border-t-2 border-gray-300 my-auto"></div> */}
    //       <main className="flex-grow ">
    //       {/* p-2 sm:p-4 */}
    //         {children}
    //       </main>

    //       {!disableFooter && (<footer className="bg-transparent text-black p-4 text-center mb-0 text-xs">
    //         <div>
    //         <p>By clicking 'Login' or 'Create Account' above, you acknowledge that you have read</p>
    //         <p>and understood, and agree to PatientflowHQ's Terms & Conditions and Privacy Policy © 2023</p>
    //         </div>
    //       </footer>)
    //       }
    //     </div>

    <div className="flex flex-col bg-[#EBF0FF] h-full">
      <nav className="bg-white text-black xl:py-8 py-4 px-4 sm:px-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.20)] sticky top-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0 md:ml-[-35px] xl:ml-[-10px]">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Your Logo"
                className="h-6 w-auto mr-4"
              />
            </Link>
          </div>
          <div
            className={` md:hidden flex gap-x-6 sm:space-x-4 h-6 ${
              isNavOpen ? 'flex-col items-end' : 'items-center'
            }`}
          >
            {isNavOpen ? (
              <>
                <Link
                  href="/features"
                  className="hover:text-gray-300 h-6 text-sm xl:text-lg font-bold"
                  onClick={toggleNav}
                >
                  H&P Admin Note
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-gray-300 h-6 text-sm xl:text-lg font-bold"
                  onClick={toggleNav}
                >
                  LOSHQ
                </Link>
                <Link
                  href="/more"
                  className="hover:text-gray-300 h-6 text-sm xl:text-lg font-bold"
                  onClick={toggleNav}
                >
                  Hospitalist Insight
                </Link>
                <Link
                  href="/more"
                  className="hover:text-gray-300 h-6 text-sm xl:text-lg font-bold"
                  onClick={toggleNav}
                >
                  Contact Us
                </Link>
              </>
            ) : (
              <div className="flex gap-x-6 sm:space-x-4 h-6">
                {!disableLoginBtn && (
                  <Link href="/login">
                    <button
                      className="bg-[#EC5A7B] border border-[#EC5A7B] hover:bg-[#722a3b] text-white py-1 px-2 sm:px-4 rounded"
                      onClick={toggleNav}
                    >
                      Login
                    </button>
                  </Link>
                )}
                {!disableSignupBtn && (
                  <Link href="/signup">
                    <button
                      className="bg-[#EC5A7B] hover:bg-[#556BB1] text-white py-1 px-2 sm:px-4 rounded"
                      onClick={toggleNav}
                    >
                      Create Account
                    </button>
                  </Link>
                )}
              </div>
            )}
            <button className="md:hidden" onClick={toggleNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {isNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>

          <div className=" hidden md:flex gap-x-6 sm:space-x-4 h-6">
            <Link
              href="/features"
              className="hover:text-gray-300 h-6 text-sm xl:text-xl font-bold"
            >
              H&P Admin Note
            </Link>
            <Link
              href="/pricing"
              className="hover:text-gray-300 h-6 text-sm xl:text-xl font-bold"
            >
              LOSHQ
            </Link>
            <Link
              href="/more"
              className="hover:text-gray-300 h-6 text-sm xl:text-xl font-bold"
            >
              Hospitalist Insight
            </Link>
            <Link
              href="/more"
              className="hover:text-gray-300 h-6 text-sm xl:text-xl font-bold"
            >
              Contact Us
            </Link>
            {!disableLoginBtn && (
              <Link href="/login">
                <button className="bg-[#EC5A7B] border border-[#EC5A7B] hover:bg-[#722a3b] text-white py-1 px-2 sm:px-4 xl:px-8 xl:py-2 rounded xl:text-lg">
                  Login
                </button>
              </Link>
            )}
            {!disableSignupBtn && (
              <Link href="/signup">
                <button
                  className="bg-[#EC5A7B] hover:bg-[#556BB1] text-white py-1 px-2 sm:px-4 text-sm  xl:px-8 xl:py-2 rounded xl:text-lg "
                  onClick={toggleNav}
                >
                  Create Account
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="flex h-full w-full pt-[48px] sm:pt-0">
          {/* <Chatbar userId={userId} /> */}
        </div>
        {children}
      </main>
      {!disableFooter && (
        <footer className="bg-transparent text-black p-4 text-center mb-0 text-xs">
          <div>
            <p>
              By clicking 'Login' or 'Create Account' above, you acknowledge
              that you have read
            </p>
            <p>
              and understood, and agree to PatientflowHQ's Terms & Conditions
              and Privacy Policy © 2023
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
