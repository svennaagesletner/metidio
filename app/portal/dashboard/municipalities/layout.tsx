import { auth } from "@/auth"
import { ReactNode } from "react"


const Layout = async ({children}: {children: ReactNode}) => {
    
    const session = await auth()

    const grant = ["SuperAdmin"]

    if (session?.user.isActive && grant.includes(session?.user.role) ) {
       return ( <>  {children} </> )
    } else {
        return ( <div>Access denied</div>  )
    }
  
}

export default Layout