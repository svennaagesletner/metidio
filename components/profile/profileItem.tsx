import Link from "next/link";

function profileItem({name, icon, href}: {name: string, icon: any, href: string}) {
    return (
        <Link href={href}>
        <div className="flex gap-2 mt-0.5  hover:dark:bg-neutral-700 hover:bg-neutral-200 cursor-pointer rounded-sm items-center p-1">
            <div className="flex items-center w-4 h-4">
                {icon}
            </div>
            <div className="flex flex-col">
                <div className="text-sm">{name}</div>
            </div>
        </div>
        </Link>
    );
}

export default profileItem;