import { auth} from "@/auth"
import { ModeToggle } from "@/components/buttons/modeToggle"
import SigninButton from "@/components/navigation/SigninButton"
import { redirect } from 'next/navigation'
import Link from "next/link";


export default async function Home() {
  const session = await auth()

  if (session?.user) { 
    redirect("/portal/dashboard")
  }

  return (
    <div className="flex flex-col items-center mt-[50px]">
      <div className="">
      <h2>Velkommen til Metid.io</h2>
          <div className="w-full">
        { !session?.user &&
    
    <SigninButton/>        }
          </div>
          <ModeToggle />

      </div>
    
    </div>

  )
}
