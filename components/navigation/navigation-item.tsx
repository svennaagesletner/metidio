"use client"

import Image from "next/image"
import {useParams, usePathname, useRouter} from "next/navigation"

import { ActionTooltip } from "@/components/action-tooltip"
import Link from "next/link"

interface NavigationItemProps {
    id: string
    icon: React.ReactNode
    name: string
    tooltip: string
    side?: "top" | "right" | "bottom" | "left"
    href?: any
    action?: () => void
}

export const NavigationItem = ({
    id,
    icon,
    name,
    tooltip,
    side,
    href,
    action
}: NavigationItemProps ) => {

    const pathname = usePathname()

    const handleClick = async () => {
        if (action && typeof action === "function") {
          action();
        }
      };

    return (
     <div className="my-1">
        <ActionTooltip
            side={side}
            align="center"
            label={tooltip}
        >
            
       {typeof action === "function" ? ( 
        <button
        key={name}
        onClick={handleClick}
        className="group flex items-center"
        >
            <div className={`${pathname == href ? "bg-emerald-600" : "bg-background dark: bg-neutral-700"} flex mx-1 my-1 h-[40px] w-[40px] rounded-[20px] group-hover:rounded-[12px] transion-all overflow-hidden items-center justify-center group-hover:bg-emerald-500`}>
                {icon}
            </div>
        </button>
       
       ) : (  
       <Link
        key={name}
        href={href}
        className="group flex items-center"
        >
            <div className={`${pathname === href || pathname.startsWith(href) ? "bg-emerald-600" : "bg-background dark: bg-neutral-700"} flex mx-1 my-1 h-[40px] w-[40px] rounded-[20px] group-hover:rounded-[12px] transion-all overflow-hidden items-center justify-center group-hover:bg-emerald-500`}>
                {icon}
            </div>
        </Link>
        )}
      </ActionTooltip>
      
    </div>
    )
}