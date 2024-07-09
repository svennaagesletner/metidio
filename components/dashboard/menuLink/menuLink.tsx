"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    title: string
    path: string
    icon: React.ReactNode
}

function MenuLink(item: Props) {
    const pathname = usePathname()

    return (
        <Link href={item.path}
        className={`${pathname == item.path ? "bg-neutral-200 dark:bg-neutral-800" : ""} flex py-[1px] px-2 text-sm font-light dark:hover:bg-emerald-600 hover:bg-emerald-500`}
        >   <span className="pr-2">
            {item.icon}
        </span>
            {item.title}
        </Link>
    );
}

export default MenuLink;