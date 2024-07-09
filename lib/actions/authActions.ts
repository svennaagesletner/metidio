"use server"

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { ZodError, boolean, z } from 'zod';
import { isRedirectError } from 'next/dist/client/components/redirect';



const loginSchema = z.object({
  email: z.string().email('Ugylid e-post'),
  password: z.string().min(8, 'Passord må være minst 8 tegn').max(99)
})

export async function authenticate(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      loginSchema.parse({
        email,
        password
      })

      await signIn('credentials', formData);

      return {
        message: "success",
        errors: undefined,
        fieldValues: {
          email: "",
          password: ""
        }
      }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {message: "errorMessage", errorMessage: "Feil brukernavn eller passord" }
          default:
            return {
              message: "errorMessage", errorMessage: "Noe gikk galt!"
            }
        } 
      }

      if(isRedirectError(error)) throw error;

      const zodError = error as ZodError
      const errorMap = zodError?.flatten().fieldErrors
      
      return {
        message: "error",
        errors: {
          type: "",
          name: "",
          email: errorMap["email"]?.[0] ?? "",
          password: errorMap["password"]?.[0] ??"",
          confirmPassword: errorMap["password"]?.[0] ??"",
          role: errorMap["school"]?.[0] ??"",
          municipality: errorMap["municipality"]?.[0] ??"",
          school: errorMap["school"]?.[0] ??"",
          isActive: errorMap["school"]?.[0] ??"",
        },
        fieldValues: {
          email,
          password
        }

      }
    }
  }

  
export async function authenticateWithPorvider(props: string) {
  await signIn(props)
}
