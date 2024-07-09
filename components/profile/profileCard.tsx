import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";


export default function profileCard({name , image}: {name: string | undefined, image: string | undefined}) {
    return (
        <div className="flex gap-4 items-center">
            <Avatar showFallback name={name} src={image} />
      </div>
    );
}