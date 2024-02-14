
import { Metadata, Viewport } from 'next';
import HomeDetails from './id';

export const metadata: Metadata = {
  title: 'PatientFlow HQ: Create Cases',
  description: 'PatientFlow HQ, Your Clinical Reasoning Assistant',
  icons: '/logo.png'
}

export const viewport: Viewport = {
  height:"device-height",
  width: "device-width",
  initialScale: 1,
  userScalable: false
}

const Page = ({
  params
}:  { params: { id: string }}) => {
    
    console.log(`UserId from page.tsx is ${params.id}`);
    return (
        <HomeDetails userId={ params.id } />
  );
};

export default Page;
