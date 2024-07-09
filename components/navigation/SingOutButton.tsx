"use client"

import { Button } from "../ui/button";
import { signOut } from "@/auth";


const SignOutButton = async ({signOut} : {signOut: () => void}) => {    
    return (
             <Button onClick={() => {
                signOut()}}>Logg ut</Button>
     );
}

export default SignOutButton