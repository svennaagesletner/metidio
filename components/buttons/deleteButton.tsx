import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from '@heroicons/react/20/solid';


export function DeleteButton<T>({buttonTitle, id, deletefunction, confirmStr, redirect}: {buttonTitle: string, id: string, deletefunction: (id: string) => Promise<T | {message: string, errorMessage: string}>, confirmStr: string, redirect?: string}) {
    const router = useRouter()
  
    const handleDelete = async () => {
      if (confirm(confirmStr)) {
       try {
        await deletefunction(id)
        if (redirect) router.push(redirect)
        } catch (error) {
          alert("Kunne ikke slette skole")
        }
     
      }
    }
    return (
      <Button 
      className="mt-4 h-[40px] bg-neutral-800 hover:bg-red-600 group"
      onClick={handleDelete}
      type='button'
      >
  
    <>
      {buttonTitle} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500 transform transition-transform group-hover:translate-x-1 "/>
    </>
  
  
      </Button>
    )
}
  
  