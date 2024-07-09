"use client"

import { useSession } from "next-auth/react"

import DashboardNavbar from "@/components/dashboard/dashboard-navbar"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { useGlobalContext } from "@/components/providers/global-provider"
import { ReactNode} from "react"



/*
session.user.accesLevel
    SuperAdmin = 6
    MunicipalityAdmin = 5
    SchoolAdmin = 4
    SchoolLeader = 3
    Adviser = 2
    Teacher = 1
    Guest = 0   
*/

const DashboardLayout =  ({children}: {children: ReactNode}) => {

    const {data: session} = useSession()
    const {showMenu} = useGlobalContext()

    if (!session) return

    if (session?.user.isActive && session?.user.accessLevel >= 4 ) { 
        return (
            <>  
                <DashboardSidebar />
                <div className={`${showMenu ? "flex w-[calc(100%-155px)]" : "flex w-full"} flex-col`}>
                    <DashboardNavbar />
                    <div className="flex flex-col overflow-scroll grow">
                    {children}
                    </div>

                </div>
    
            </>
        )
    } else {
            return ( <div>Access denied</div>  )
    }
  

}

export default DashboardLayout