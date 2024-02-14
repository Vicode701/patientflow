// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';

// function withAuthentication<I extends {}>(BaseComponent: React.ComponentType<I>) {
//     return function AuthComponent(props: I): React.ReactElement | null {
//         const router = useRouter();
//         let isAuthenticated = false;
//         useEffect(() => {
//             // Replace this with your authentication logic
//             isAuthenticated = true;

//             if (!isAuthenticated) {
//                 router.push('/login');
//             }
//         }, []);

//         // Always return a React element or null.
//         return isAuthenticated ? React.createElement(BaseComponent, props) : null;
//     };
// }

// export default withAuthentication;

export {}