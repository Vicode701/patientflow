import PasswordReset from "./passwordreset";
import { verifyToken } from "./passwordresetaction";
import { notFound } from "next/navigation";

const Page = async ({
    searchParams,
  }:  { searchParams: {token?: string }}) => {

    const { token } = searchParams; 
    
    if (token && !await verifyToken(token)) {
        notFound()
    }
    return (

        <PasswordReset token={token!}></PasswordReset>
    )
  };
  
export default Page;