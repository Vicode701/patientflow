'use client'

import Spinner from "@/components/Spinner/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Staging() {
    const {data: session, status } = useSession();
    const router = useRouter();
    //@ts-ignore
    const userId = session?.user.userId || session?.user.id;

    useEffect(() => {
        if ( status === "authenticated" && userId) {
            router.push(`/home/${userId}`);
        }
    }, [session]);

    return (
        <div>
            <Spinner size="20px" className="mx-auto" />
        </div>
    );
}
