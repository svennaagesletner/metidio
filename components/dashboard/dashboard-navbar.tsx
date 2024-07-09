"use client"

import { usePathname } from "next/navigation";
import { menuItems } from "./dashboard-sidebar";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../providers/global-provider";
import { Search } from "lucide-react";

const DashboardNavbar = () => {
    const pathName = usePathname()
    const [title, setTitle] = useState("")
    const {showMenu} = useGlobalContext()

    useEffect(() => {
        let foundTitle = false
        menuItems.forEach(menuItem => {    
            menuItem.list.forEach(listItem => {
                if (listItem.path === pathName) {
                    foundTitle = true
                    setTitle(listItem.title)
                }
            });
        });
        if (!foundTitle) setTitle("Dashboard")
    }, [pathName])
 

    return (
        <div className={`${!showMenu && "ml-[48px]"} p-2 flex items-center`}>
            <div className={`capitalize`}>
                {title}
            </div>
            <div className="flex w-full justify-end items-center">
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-700 rounded-sm p-1">
                    <Search size={14} />
                    <input 
                    type="text" 
                    className="pl-2 text-sm bg-transparent focus:outline-none"
                    placeholder="Søk.." 
                    />
                </div>
            </div>
        </div>
    );
}

export default DashboardNavbar;