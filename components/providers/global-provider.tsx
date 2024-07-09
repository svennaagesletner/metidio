"use client"

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"


type AccessContext =  {
    role?: string
    school?: string
    municipality?: string    
}

interface ContextProps {
    showMenu: boolean,
    setShowMenu: Dispatch<SetStateAction<boolean>>,
    accessContext: AccessContext,
    setAccessContext: Dispatch<SetStateAction<AccessContext>>,
}

const GlobalContext = createContext<ContextProps>({
    showMenu: true,
    setShowMenu: (): boolean => true,
    accessContext: {
        role: "guest",
        school: "",
        municipality: "",
    }, 
    setAccessContext: () => {},
})

export const GlobalContextProvider = ({children}:any) => {
    const [showMenu, setShowMenu] = useState(true);
    const [accessContext, setAccessContext] = useState<AccessContext>({});

    return (
        <GlobalContext.Provider value={{showMenu, setShowMenu, accessContext, setAccessContext}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)