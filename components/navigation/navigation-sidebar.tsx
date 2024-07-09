import { ModeToggle } from "../buttons/modeToggle"
import { auth, signOut } from "@/auth"
import { Separator } from "../ui/separator"
import { NavigationItem } from "./navigation-item"
import { NavItems, iconClass } from "./nav-management"
import {  LogOut } from "lucide-react"

export const NavigationSidebar = async () => {
    const session = await auth()
    if (!session) return ( <div>Access denied</div> )

    return (
        <>
            <div className="flex flex-col items-center">
                <Separator 
                    className="h-1px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-6 mb-1"
                />
                {NavItems.map((module) => {
                    if(module.minAccessLevel > session?.user?.accessLevel) return
                    
                    return(
                    <div key={module.id}>
                <NavigationItem 
                    id={module.id}
                    href={module.href}
                    name={module.name}
                    icon={module.icon}
                    tooltip={module.tooltip}
                    side="right"
                />
                    </div>
                )})}

            </div>
            
            
            <div className="flex flex-col items-center">
            <ModeToggle />

            <NavigationItem 
                id={"logOut"}
                name="logout"
                href={"/"}
                icon={
                    <LogOut 
                    className={iconClass}
                    />
                }
                tooltip="Logg ut"
                side="right"
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: '/' })
                  }}
            />
            </div>
            </>
    )

}
