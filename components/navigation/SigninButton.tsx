"use client"

import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'


const SigninButton = () => {    
    const router = useRouter()

    return (
            <div>
             <Button onClick={() => router.push('/auth/login')
                }>Logg inn</Button>
            </div>
     );
}

export default SigninButton