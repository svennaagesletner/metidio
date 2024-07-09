import { ModeToggle } from "../buttons/modeToggle"
import { signOut } from "@/auth"
import { NavItems, iconClass } from "./nav-management"
import { NavigationItem } from "./navigation-item"
import { LogOut } from "lucide-react"

export const NavigationBottombar = async () => {
    return (
        <nav className="main-bottombar"> 
            <div className="flex items-center h-full">

                {NavItems.map((module) => (
                <div key={module.id}>
               <NavigationItem 
                id={module.id}
                href={module.href}
                name={module.name}
                icon={module.icon}
                tooltip={module.tooltip}
                side="top"
            />
                </div>
            ))}
        <div className="flex w-full justify-end items-center ">

        <ModeToggle />

        <NavigationItem 
                id={"logOut"}
                name="logout"
                href={""}
                icon={
                    <LogOut 
                    className={iconClass}
                    />
                }
                tooltip="Logg ut"
                side="top"
                action={async () => {
                    "use server"
                    await signOut({redirectTo: "/"})
                  }}
            />
        </div>
            </div>

        </nav>
    )

}
