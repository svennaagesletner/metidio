import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

export function RegisterButton({title}: {title: string}) {
    const { pending } = useFormStatus();
    const pathName = usePathname()
   
    return (
      <Button 
      className="mt-4 h-[40px] w-full" aria-disabled={pending}
      >
         {pending ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
           </svg>
           {pathName.includes("edit") ? "Lagrer..." : "Oppretter..."} 
          </>
         )
         : (
    <>
      {pathName.includes("edit") ? `Lagre ${title}` : `Opprett ${title}`} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500" />
    </>
  )}

      </Button>
    );
}

