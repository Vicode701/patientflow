import { Metadata, Viewport } from "next"
import '@/styles/globals.css';
import Providers from './providers';
import GlobalLayout from "@/components/Layout/GlobalLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
    title: 'PatientFlowHQ',
    description: 'Welcome to PatientFlowHQ',
    appleWebApp: true,
    applicationName: 'PatientFlowHQ',
}

export const viewport: Viewport = {
  height:"device-height",
  width: "device-width",
  initialScale: 1,
  userScalable: false
}

export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) 
{
    const session = await getServerSession(authOptions);

    return (
      <html lang="en">
        <body>
            <Providers>
                {children}              
            </Providers>            
        </body>
      </html>
    )
}

