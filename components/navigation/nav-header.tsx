"use client"

import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"


function NavHeader() {
    const {data: session} = useSession()

    if (!session) return

    return (
        <nav>
               <Link href={"/portal"}
                className="flex"
                >
                
                <Image 
                src={session?.user.municipality === "Bergen kommune" ? "/bergen.png" : "/voss.png"} 
                width={28} 
                height={28} 
                alt="Kommunelogo" 
                className="mx-3 w-[28px] h-[28px]"
                />
                <div className="mx-1 text-lg font-semibold">{session?.user?.municipality ? `${session?.user?.school}` :"Metid.io"}</div>

                </Link>
        </nav>
    );
}

export default NavHeader;