import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";


export default function profileCard({name, role, image}: {name: string | undefined, role: string | undefined, image: string | undefined}) {
    return (
        <div className="flex gap-2 items-center">
            <Avatar showFallback name={name} src={image} />
            <div className="flex flex-col">
                <div className="font-semibold text-xs">{name}</div>
                <div className=" text-xs text-neutral-500 dark:text-neutral-400">{role}</div>
            </div>
      </div>
    );
}