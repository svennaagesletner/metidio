"use server"

import { auth } from "@/auth"
import db from "../prismadb"
import { ZodError, z } from 'zod';
import { revalidatePath } from "next/cache"


export const getMunicipalities = async () => {
    const session = await auth()

    if (!session) throw new Error("No session")
    if (!session.user?.isActive) throw new Error("User not active")

    if (session.user.accessLevel >= 6) {
      //Fetch all municipalities when accessLevel is above 6
      try {
        const municipalities = await db.municipality.findMany({
            orderBy: [
                {
                  name: 'asc',
                },
              ],
            include: {
                schools: true,
                users: true
              }
        })
        
        return municipalities

      } catch (error: any) {
          return error?.message
      }
    } else {
      //Fetch current municipality when accessLevel is lower than 6
      try {
        const municipalities = await db.municipality.findUnique({
            where: {
              name: session?.user.municipality
            },
            include: {
                schools: true,
                users: true
              }
        })
        return [municipalities]
      } catch (error: any) {
          return error?.message
      }
    }

}

export const CountMunicipalities = async () => {
  try {
    const countMunicipalities = await db.municipality.count({})
    return countMunicipalities
  } catch (error: any) {
    return error?.message
  }

}

export async function registerMunicipality(PrevState: FormState,
  formData: FormData,
): Promise<FormState> {

  const type = formData.get("type") as string
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const isActive = JSON.parse(formData.get("isActive")as string) as boolean


  const registerMunicipalitySchema = z.object({
    name: z.string().min(5, 'Skolenavn må ha minst 5 tegn').max(40, 'Skolenavn må være mindre enn 40 tegn'),
    isActive: z.boolean().refine(value => typeof value === 'boolean', {
      message: 'isActive må være en boolean'
    }),
  })

  try {

      registerMunicipalitySchema.parse({
          name,
          isActive,
        })
  
      if (type === "add"){
    
            const school = await db.municipality.create({
              data: {
                name: name,
                isActive
              }
            })
      
      
            revalidatePath("/portal/dashboard/schools")
      }

      if (type === "edit") {
              const school = await db.municipality.update({
                where: {
                   id: id
                },
                data: {
                  name: name,
                  isActive
                }
             
              })
        
              revalidatePath("/portal/dashboard/schools")
      }

    return {
      message: "success",
      ...(type === "add" && { successMessage: `Opprettet kommune: ${name}` }),
      ...(type === "edit" && { successMessage: `Lagret kommune: ${name}` }),
      fieldValues: {
          type,
          name,
          isActive
      }
      
    }



  } catch (error: ZodError | any) {

          //Error from Zod
          if (error instanceof ZodError) {
            const zodError = error as ZodError
            const errorMap = zodError.flatten().fieldErrors
            return {
              message: "error",
              errors: {
                type: errorMap["name"]?.[0] ?? "",
                name: errorMap["name"]?.[0] ?? "",
                email: errorMap["email"]?.[0] ?? "",
                password: errorMap["password"]?.[0] ??"",
                confirmPassword: errorMap["confirmPassword"]?.[0] ??"",
                role: errorMap["role"]?.[0] ??"",
                municipality: errorMap["municipality"]?.[0] ??"",
                school: errorMap["school"]?.[0] ??"",
                isActive: errorMap["active"]?.[0] ??"",
              },
              fieldValues: {
                name,
                isActive
              }
      
            }
          }
          return {
            message: "error",
            errorMessage: error.message
          }
    
  }




}

export const deleteMunicipality = async(id:string) => {
  try {
      await db.municipality.delete({
          where: {
              id
          }
      })
      revalidatePath("/portal/dashboard/municipalities")

      return {
          message: "success"
      }

  } catch (error: any) {
      return {
          message: "error",
          errorMessage: error.message
      }
  }
}