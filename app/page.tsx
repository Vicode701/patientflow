import React, { useEffect, useState } from 'react';

import { Metadata, Viewport } from 'next';
// import VideoThumbnail from '../components/Video/VideoThumbnail';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import LineChart from '@/components/Bars/LineChart';
import ProgressBar from '@/components/Bars/ProgressBar';
import Footer from '@/components/Footer/Footer';
import Layout from '@/components/Layout/Layout';
import TestimonialSection from '@/components/Testemonial/TestimonialSection';

import arrowDownLeft from '../assets/images/arrow-down-left.png';
import arrowDown from '../assets/images/arrow-down.png';
import arrowRight from '../assets/images/arrow-right.png';
import fullDashboard from '../assets/images/full-dashboard.png';
import homeImage from '../assets/images/home-image.png';
import usersAction from '../assets/images/users-action.png';

const VideoThumbnail = dynamic(
  () => import('../components/Video/VideoThumbnail'),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'PatientFlow HQ',
  description: 'PatientFlow HQ, Your Clinical Reasoning Assistant',
  icons: '/logo.png',
};

export const viewport: Viewport = {
  height: 'device-height',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

const Page = () => {
  const handleVideoClick = () => {
    // Implement your logic to redirect or play the video
    console.log('Video clicked!');
  };

  return (
    <>
      <Layout
        disableFooter={true}
        disableLoginBtn={false}
        disableSignupBtn={false}
      >
        <main>
          <div className="px-4 md:px-[42px] xl:px-32 max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm  before:content-[''] before:w-full before:h-px before:block">
            <div className="grid grid-cols-12 md:gap-16 gap-6 mt-10">
              <div className="col-span-12 intro-y box lg:col-span-6">
                <div className="flex flex-col space-y-8">
                  <Image
                    className=" w-16 h-16   -ml-5 rounded-full"
                    src={arrowDown}
                    // width={24}
                    // height={16}
                    alt={` avatar`}
                  />
                  <h2 className="md:w-2/3 text-center md:text-start xl:text-6xl tracking-wide text-4xl font-bold ">
                    Better Admission Notes in Less Time
                  </h2>

                  <div className="mt-2 text-black text-lg md:w-4/5 xl:text-2xl text-center md:text-start ">
                    Our Clinician built AI Platform enables comprehensive H&P
                    Notes with billable diagnosis and case advisory in record
                    time.
                  </div>

                  <Image
                    className=" w-16 h-16   -ml-5 rotate-180"
                    src={arrowDown}
                    // width={24}
                    // height={16}
                    alt={` avatar`}
                  />

                  <div className="flex intro-x space-x-4 place-self-center md:place-self-start">
                    <Link
                      className="text-white shadow-md place-self-center text-[13px] xl:text-2xl xl:px-16 font-mono bg-red-500 hover:bg-red-700 transition-all rounded-md w-[120px] h-10 flex items-center justify-center whitespace-nowrap"
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Login
                    </Link>

                    <Link
                      className="text-sky-800 xl:text-2xl xl:px-12 xl:w-full xl:py-6 shadow-md place-self-center text-[13px] font-mono bg-white hover:bg-slate-100 transition-all rounded-md w-[120px] h-10 flex items-center justify-center whitespace-nowrap"
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Schedule a demo
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-span-12 intro-y box lg:col-span-6 pt-10 ">
                <div className="relative">
                  <Image
                    className=" w-16 h-16   absolute top-0 -left-16  "
                    src={arrowRight}
                    // width={24}
                    // height={16}
                    alt={` avatar`}
                  />

                  {/* <Image
              className=" w-16 h-16   absolute top-0   left-1/2 "
              src={arrowDownLeft}
             
              alt={` avatar`}
            /> */}
                </div>
                {/* <h2 className="mr-auto text-base font-medium">
              Top Categories
            </h2> */}
                <Image
                  className="xl:w-full "
                  src={homeImage}
                  width={500} // Set the width of the displayed image
                  height={200} // Set the height of the displayed image
                  alt="home image"
                />
              </div>
            </div>

            {/* <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">FAQ Layout</h2>
        </div> */}
          </div>
        </main>

        <div className="grid grid-cols-12 md:space-x-16 md:px-10 px-6  session">
          {/* BEGIN: FAQ Menu */}
          <a
            href=""
            className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" rx="16" fill="#EC5A7B" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="white"
              />
            </svg>
            <div className="md:w-3/4 mt-3 text-white xl:text-2xl font-medium ">
              Better Reimbursement with optimized assessment and Diagnosis
            </div>
            <div className=" md:w-full mx-auto md:mx-0 mt-2  text-slate-300 xl:text-xl">
              Our integrated repository of billable diagnosis ensures our
              generated notes capture the right clinical picture to ensure
              adequate reimbursement for services offered.
            </div>
          </a>

          <a
            href=""
            className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
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
              <rect width="100%" height="100%" rx="16" fill="#EC5A7B" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="white"
              />
            </svg>
            <div className="md:w-3/4 mt-3 text-white font-medium xl:text-2xl ">
              Decreased Length of Stay and optimized resource utilization
            </div>
            <div className=" md:w-full mx-auto md:mx-0 mt-2  text-slate-300 xl:text-xl">
              Our inbuilt clinical advisory tools help clinicians construct
              clinical plans that ensure patient safety while optimizing
              disposition and limiting unnecessary resource utilization
            </div>
          </a>
          <a
            href=""
            className="col-span-12 px-6 py-10  intro-y lg:col-span-4 box text-center md:text-start"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-gray-100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" rx="16" fill="#EC5A7B" />
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
            <div className="md:w-3/4 mt-3 text-white font-medium xl:text-2xl">
              Decreased Physician Burnout and Increase in Satisfaction and
              Retention
            </div>
            <div className="md:w-full mx-auto mt-2 md:mx-0 text-slate-300 xl:text-xl">
              Improving well-being and productivity by limiting unnecessary time
              spent documenting using our powerful clinician oriented natural
              language processing platform
            </div>
          </a>
          {/* END: FAQ Menu */}

          {/* END: FAQ Content */}
        </div>

        <div className="px-4 md:px-[42px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm  before:content-[''] before:w-full before:h-px before:block">
          <div className="grid grid-cols-12 md:gap-16 gap-6 mt-10">
            <div className="col-span-12 flex-col intro-y justify-center item-center">
              {/* <div className="col-span-12 intro-y box "> */}

              <div className="flex flex-col col-span-12 items-center justify-center md:px-32  ">
                <Image
                  className=" w-16 h-16   rounded-full place-self-start"
                  src={arrowDown}
                  // width={24}
                  // height={16}
                  alt={` avatar`}
                />

                <h1 className="text-2xl font-medium mb-8">
                  PatientflowHQ in Action
                </h1>

                <div
                  // text-center bg-cover bg-center bg-no-repeat
                  className=""
                  style={{
                    backgroundImage: `linear-gradient(181deg, #D30635 -68.47%, rgba(217, 217, 217, 0.00) 201.81%), url(${usersAction.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50vw',
                    height: '50vh',
                  }}
                >
                  <VideoThumbnail videoUrl="/assets/images/users-action.png" />
                </div>

                <Image
                  className=" w-16 h-16   place-self-end  rotate-180"
                  src={arrowDown}
                  // width={24}
                  // height={16}
                  alt={` avatar`}
                />
              </div>

              {/* </div> */}

              <div className="flex flex-col col-span-12 items-center my-8 justify-center md:px-32  ">
                <h1 className="text-2xl font-medium mb-8">
                  What the data shows
                </h1>

                <ProgressBar />

                {/* <h2 className="mr-auto text-base font-medium">
      Top Categories
    </h2> */}
              </div>
            </div>

            {/* 
  <div className='col-span-12'>
  <div className="grid grid-cols-12 gap-6  mt-5">
  <div className='lg:flex  col-span-12 justify-between items-center lg:px-28'>
  <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
    <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
  </div>

  <div className='lg:flex col-span-12 justify-between items-center lg:px-28'>

  <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
    <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
</div>
  </div>
  </div> */}
          </div>

          {/* <div className="flex items-center mt-8 intro-y">
  <h2 className="mr-auto text-lg font-medium">FAQ Layout</h2>
</div> */}
        </div>

        <div className="grid grid-cols-12 md:space-x-16 md:px-10 px-6  session">
          <div className="col-span-12 px-6 py-10  intro-y lg:col-span-7 box text-center md:text-start">
            <Image className=" " src={fullDashboard} alt="home image" />
          </div>

          <div className="col-span-12 px-6 py-10  intro-y lg:col-span-5 box text-center md:text-start">
            <div className="flex-col  gap-y-2">
              <h2 className="text-white text-center md:text-start xl:text-6xl tracking-wide text-3xl font-bold ">
                Happy Team, Better Work!{' '}
              </h2>

              <Image
                className=" w-16 h-16 ml-auto "
                src={arrowDownLeft}
                // width={24}
                // height={16}
                alt={` avatar`}
              />

              <div className="md:w-4/5 text-start">
                <div className="md:w-3/4 mt-3 text-white font-medium  xl:text-3xl ">
                  Decreased Physician Burnout and Increase in Satisfaction and
                  Retention
                </div>
                <div className=" md:w-full text-sm md:mx-0 mt-2  xl:mt-6 text-slate-300 xl:text-xl">
                  Improving well-being and productivity by limiting unnecessary
                  time spent documenting using our powerful clinician oriented
                  natural language processing platform
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 intro-y lg:p-16 p-8">
          <TestimonialSection />

          {/* <div className="grid grid-cols-12 gap-6  mt-5">
  <div className='lg:flex  col-span-12 justify-between items-center lg:px-28'>
  <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
    <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
  </div>

  <div className='lg:flex col-span-12 justify-between items-center lg:px-28'>

  <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
    <div
      className=" p-6 text-6xl  flex  bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
       <LineChart height={200} />
    </div>
</div>
  </div> */}
        </div>

        <Footer />
      </Layout>
    </>
  );
};

export default Page;

// {/* <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 h-full gap-0 bg-transparent bg-no-repeat">

// <div className="w-full p-4 text-left text-black lg:col-span-2">
//  <div className="my-1 mt-10 font-[400] text-5xl sm:text-3xl md:text-4xl lg:text-6xl text-black font-noto-sans">
//     <p>
//       Get better reimbursement
//       <br />
//     </p>
//     <p>
//       with optimized Assessments
//       <br />
//     </p>
//     <p>
//       and {" "}
//       <span className="font-[500] leading-[70px] text-[#556BB1] text-6xl sm:text-3xl md:text-4xl lg:text-6xl inline">
//         Diagnosis
//       </span>
//     </p>
//   </div>
// </div>

// Image Section
// <div className="w-full lg:w-1/2 order-last lg:order-none lg:row-span-2 lg:self-end">
//   <Image
//     src='/OKR0RO1.png'
//     width={800}
//     height={500} alt={'Picture of PC With opened'}
//     style={{objectFit: 'contain'}}
//     quality={100}
//     sizes=""
//   />
// </div>

// {/* Buttons Section */}
// <div className="flex flex-col items-center w-full order-last mt-5 lg:mt-auto lg:ml-5 lg:row-span-2 lg:self-end">
//   <div className="mb-3 lg:mb-0">
//     <Link href="/signup">
//       <button
//           className="w-[198px] md:w-[190px] sm:w-1/3 text-xl h-8 bg-[#EC5A7B] hover:bg-[#556BB1] text-white py-1 px-3 mr-3 rounded"
//           type="button"
//      >
//          Create Account
//       </button>
//     </Link>

//    <Link href="/signup">
//      <button
//           className="w-[70px] md:w-[98px] sm:w-1/3 text-xl h-8 bg-white border border-[#556BB1] hover:bg-[#EC5A7B] text-[#556BB1] py-1 px-2 rounded"
//           type="button"
//       >
//           demo
//       </button>
//     </Link>
//     <div className="text-xs text-gray-600 mt-3">Get up to 150 responses a month for free</div>
//   </div>
// </div>

// </div>

// <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-2 h-full gap-0 bg-transparent bg-no-repeat">

// <div className="w-full p-4 text-left text-black lg:col-span-2">
// <div className="my-1 mt-10 font-[400] text-5xl sm:text-3xl md:text-4xl lg:text-6xl text-black font-noto-sans">
//    <p>
//      Get better reimbursement
//      <br />
//    </p>
//    <p>
//      with optimized Assessments
//      <br />
//    </p>
//    <p>
//      and {" "}
//      <span className="font-[500] leading-[70px] text-[#556BB1] text-6xl sm:text-3xl md:text-4xl lg:text-6xl inline">
//        Diagnosis
//      </span>
//    </p>
//  </div>
// </div>

// {/* Image Section */}
// <div className="w-full lg:w-1/2 order-last lg:order-none lg:row-span-2 lg:self-end">
//  <Image
//    src='/OKR0RO1.png'
//    width={800}
//    height={500} alt={'Picture of PC With opened'}
//    style={{objectFit: 'contain'}}
//    quality={100}
//    sizes=""
//  />
// </div>

// {/* Buttons Section */}
// <div className="flex flex-col items-center w-full order-last mt-5 lg:mt-auto lg:ml-5 lg:row-span-2 lg:self-end">
//  <div className="mb-3 lg:mb-0">
//    <Link href="/signup">
//      <button
//          className="w-[198px] md:w-[190px] sm:w-1/3 text-xl h-8 bg-[#EC5A7B] hover:bg-[#556BB1] text-white py-1 px-3 mr-3 rounded"
//          type="button"
//     >
//         Create Account
//      </button>
//    </Link>

//   <Link href="/signup">
//     <button
//          className="w-[70px] md:w-[98px] sm:w-1/3 text-xl h-8 bg-white border border-[#556BB1] hover:bg-[#EC5A7B] text-[#556BB1] py-1 px-2 rounded"
//          type="button"
//      >
//          demo
//      </button>
//    </Link>
//    <div className="text-xs text-gray-600 mt-3">Get up to 150 responses a month for free</div>
//  </div>
// </div>

// </div> */}
