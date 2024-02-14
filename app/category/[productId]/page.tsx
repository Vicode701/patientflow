
import { Metadata, Viewport } from 'next';
import DeseaseItem from './diseaseItem';
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
}:  { params: { productId: string }}) => {
    
    console.log(`ProductId from page.tsx is ${params.productId}`);
    return (
        <>

      <Layout disableFooter={true} disableLoginBtn={false} disableSignupBtn={false} >
        <DeseaseItem userId={ params.productId } caseTitle='Test' />
      </Layout>
      </>
  );
};

export default Page;

