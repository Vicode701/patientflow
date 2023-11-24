import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import arrowDown from '../assets/images/arrow-down.png';
import arrowRight from '../assets/images/arrow-right.png';
import arrowDownLeft from '../assets/images/arrow-down-left.png';

import homeImage from '../assets/images/home-image.png';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  // const search = searchParams.q ?? '';
  // const result = await sql`
  //   SELECT id, name, username, email 
  //   FROM users 
  //   WHERE name ILIKE ${'%' + search + '%'};
  // `;
  // const users = result.rows as User[];

  return (
    // <main className="p-4 md:p-10 mx-auto max-w-7xl">
    //   <Title>Users</Title>
    //   <Text>A list of users retrieved from a Postgres database.</Text>
    //   <Search />
    //   <Card className="mt-6">
    //     {/* <UsersTable users={users} /> */}
    //   </Card>
    // </main>
    <main>
      <div className="px-4 md:px-[42px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm  before:content-[''] before:w-full before:h-px before:block">





        <div className="grid grid-cols-12 md:gap-16 gap-6 mt-10">
          <div className="col-span-12 intro-y box lg:col-span-6">

            <div className='flex flex-col space-y-8'>
              <Image
                className=" w-16 h-16   -ml-5 rounded-full"
                src={arrowDown}
                // width={24}
                // height={16}
                alt={` avatar`}
              />
              <h2 className="md:w-2/3 text-center md:text-start  tracking-wide text-4xl font-bold ">
                Better Admission Notes in Less Time
              </h2>

              <div className="mt-2 text-black text-lg md:w-4/5 text-center md:text-start ">
                Our Clinician built AI Platform enables comprehensive
                H&P Notes with billable diagnosis and case advisory in
                record time.
              </div>

              <Image
                className=" w-16 h-16   -ml-5 rotate-180"
                src={arrowDown}
                // width={24}
                // height={16}
                alt={` avatar`}
              />

              <div className='flex intro-x space-x-4 place-self-center md:place-self-start'>
                <Link
                  className="text-white shadow-md place-self-center text-[13px] font-mono bg-red-500 hover:bg-red-700 transition-all rounded-md w-[120px] h-10 flex items-center justify-center whitespace-nowrap"
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Login
                </Link>

                <Link
                  className="text-sky-800 shadow-md place-self-center text-[13px] font-mono bg-white hover:bg-slate-100 transition-all rounded-md w-[120px] h-10 flex items-center justify-center whitespace-nowrap"
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Schedule a demo
                </Link>
              </div>
            </div>

          </div>

          <div className='col-span-12 intro-y box lg:col-span-6 pt-10 relative'>

            <Image
              className=" w-16 h-16   absolute top-6 -left-16  "
              src={arrowRight}
              // width={24}
              // height={16}
              alt={` avatar`}
            />

            <Image
              className=" w-16 h-16   absolute -bottom-16   left-1/2 "
              src={arrowDownLeft}
              // width={24}
              // height={16}
              alt={` avatar`}
            />
            {/* <h2 className="mr-auto text-base font-medium">
              Top Categories
            </h2> */}
            <Image
              className=" "

              src={homeImage}
              width={500}  // Set the width of the displayed image
              height={200} // Set the height of the displayed image
              alt='home image'
            />
          </div>

        </div>




        {/* <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">FAQ Layout</h2>
        </div> */}


      </div>




      <div className="grid grid-cols-12 md:space-x-16 md:px-10 px-6 mt-5 session">
        {/* BEGIN: FAQ Menu */}
        <a
          href=""
          className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
        >
          {/* <Lucide
        icon="Shield"
        className="block w-12 h-12 mx-auto text-primary"
      /> */}
        <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="100%"
                      height="100%"
                      rx="16"
                      fill="#EC5A7B"
                    
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                      fill="white"
                    />
                  </svg>
          <div className="md:w-3/4 mt-3 text-white font-medium ">
            Better Reimbursement
            with optimized assessment
            and Diagnosis
          </div>
          <div className=" md:w-full mx-auto md:mx-0 mt-2  text-slate-300">
            Our integrated repository of billable diagnosis ensures our generated notes capture the right clinical picture to ensure adequate reimbursement for services offered.
          </div>
        </a>


        <a href=""  className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
>
          {/* <Lucide
        icon="Send"
        className="block w-12 h-12 mx-auto text-primary"
      /> */}
      <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="100%"
                      height="100%"
                      rx="16"
                      fill="#EC5A7B"
                    
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                      fill="white"
                    />
                  </svg>
          <div className="md:w-3/4 mt-3 text-white font-medium ">
            Decreased Length of Stay
            and optimized resource utilization
          </div>
          <div className=" md:w-full mx-auto md:mx-0 mt-2  text-slate-300">
            Our inbuilt clinical advisory tools help clinicians
            construct clinical plans that ensure patient safety while optimizing disposition and limiting unnecessary resource utilization
          </div>
        </a>
        <a href="" className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
>
        <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="100%"
                      height="100%"
                      rx="16"
                      fill="#EC5A7B"
                    
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                      fill="white"
                    />
                  </svg>
          {/* <Lucide
        icon="TrendingUp"
        className="block w-12 h-12 mx-auto text-primary"
      /> */}
          <div className="md:w-3/4 mt-3 text-white font-medium ">
            Decreased Physician Burnout
            and Increase in Satisfaction
            and Retention
          </div>
          <div className="md:w-full mx-auto mt-2 md:mx-0 text-slate-300">
            Improving well-being and productivity by limiting
            unnecessary time spent documenting using
            our powerful clinician oriented natural language processing platform
          </div>
        </a>
        {/* END: FAQ Menu */}


        {/* END: FAQ Content */}
      </div>
    </main>

  );
}
