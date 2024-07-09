import { auth } from "@/auth"
import { ReactNode } from "react"

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


const Layout = async ({children}: {children: ReactNode}) => {
    const session = await auth()

    if (session?.user.isActive && session?.user.accessLevel >= 4 ) {
       return ( <>  {children} </> )
    } else {
        return ( <div>Access denied</div>  )
    }
}

export default Layout