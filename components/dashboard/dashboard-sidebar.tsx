"use client"

import {GraduationCap, Menu,  School, Users, X } from "lucide-react"
import MenuLink from "./menuLink/menuLink";
import { useGlobalContext } from "../providers/global-provider";
import { useSession } from "next-auth/react";
import Link from "next/link";

const iconClass = "group-hover:text-white transition dark:text-neutral-100 h-[18px] w-[18px]"

export const menuItems = [
    {
        title: "Brukeradministrasjon",
        path: "/portal/dashboard/",
        list: [
            {
                title: "Brukere",
                path: "/portal/dashboard/users",
                icon: <Users className={iconClass}/>,
                role: ["SchoolAdmin", "MunicipalityAdmin", "SuperAdmin"],
                accessLevel: 4

            },
            {
                title: "Skoler",
                path: "/portal/dashboard/schools",
                icon: <School className={iconClass}/>,
                role: ["MunicipalityAdmin", "SuperAdmin"],
                accessLevel: 5
            },
            {
                title: "Kommuner",
                path: "/portal/dashboard/municipalities",
                icon: <GraduationCap className={iconClass}/>,
                role: ["SuperAdmin"],
                accessLevel: 6
            },
        ]
    },
    {
        title: "Ressurser",
        path: "/portal/dashboard/",
        list: [
            {
                title: "Tildele",
                path: "/portal/dashboard/schools",
                icon: <School className={iconClass}/>,
                role: ["MunicipalityAdmin", "SuperAdmin"],
                accessLevel: 5
            },
            {
                title: "Lærernorm",
                path: "/portal/dashboard/schools",
                icon: <School className={iconClass}/>,
                role: ["MunicipalityAdmin", "SuperAdmin"],
                accessLevel: 5
            },
        ]
    },


]

const DashboardSidebar = () => {
    const {showMenu, setShowMenu} = useGlobalContext()

    const {data: session} = useSession()

    return (
        <div className="dashboard-sidebar">
            <div className={`${!showMenu && "absolute"} pt-2 px-2`}>
                <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className={`text-neutral-600`}
                    >
                    {!showMenu ? <Menu /> : <X />}
                </button>
            </div>
      
  
        <div className={`${!showMenu && "hidden"} grow px-1`}>
           
          
             <ul>
             {menuItems.map(cat => {             
             return (
                <li key={cat.title} className="">
                    <span className="text-sm pl-2"><Link href={cat.path}>{cat.title}</Link></span>
                    {cat.list.map(item=> {

                    if (session && !item.role.includes(session.user.role)) return
                    
                    return (
                        <MenuLink key={item.title} title={item.title} path={item.path} icon={item.icon}/>
                    )})}
                </li>
            )})}
            </ul>
            
        </div>
        </div>
    );
}

export default DashboardSidebar;