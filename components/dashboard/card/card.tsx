import { LineChart, Users, Users2 } from "lucide-react";
import Link from "next/link";

interface Props {
    title: string
    number: number
    link: string
}

function Card({title, number, link}:Props) {
    return (
        <Link href={link} className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 grow p-2 rounded-sm flex cursor-pointer">
            
            <LineChart size={18}/>
            <div className="text-sm pl-3 flex flex-col">
                {title}
                <div className="my-2 font-semibold text-lg">
                    {number}
                </div>
            </div>
        </Link>
    );
}

export default Card;