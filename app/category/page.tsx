
import { Metadata, Viewport } from 'next';
import Category from './categoryName';
import Layout from '@/components/Layout/Layout';


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
   // Decode the categoryName if it exists
  // const decodedCategoryName = categoryName ? decodeURIComponent(categoryName.toString()) : '';

    
    console.log(`UserId from page.tsx is ${params.id}`);
    return (
      <Layout disableFooter={true} disableLoginBtn={false} disableSignupBtn={false} >

    
        <Category userId={ params.id } />
      </Layout>
  );
};

export default Page;

