"use server"

import { auth } from "@/auth"
import db from "../prismadb"
import { ZodError, z } from 'zod';
import { revalidatePath } from "next/cache"



export const getSchools = async () => {
    const session = await auth()

    if (!session) throw new Error("No session")
    if (!session.user?.isActive) throw new Error("User not active")

    if (session.user.accessLevel >= 6) {
      //Fetch all schools when accessLevel is above 6
      try {
            //Selection specific fetch
            if (!session.user?.selectionFilter) {
                const schools = await db.school.findMany({
                    where: {
                        municipalityId: session.user.municipalityId
                    },
                    orderBy: [
                        {
                        name: 'asc',
                        },
                    ],
                    include: {
                        municipality: {
                            select: {
                                name: true,
                            },
                        },
                        users: true
                    }
    
                })
                return schools
            }

            //Return all schools
            const schools = await db.school.findMany({
                orderBy: [
                    {
                    name: 'asc',
                    },
                ],
                include: {
                    municipality: {
                        select: {
                            name: true,
                        },
                    },
                    users: true
                }

            })
  
            return schools
        } catch (error: any) {
            return error?.message
        }

    } else if(session.user.accessLevel >= 5) {
        //Fetch all schools when accessLevel is l
        if (!session.user.municipalityId) return []
        
        try {
            const schools = await db.school.findMany({
                where: {
                    municipalityId: session?.user.municipalityId
                },
                orderBy: [
                    {
                      name: 'asc',
                    },
                  ],
                include: {
                    municipality: {
                        select: {
                            name: true,
                        },
                    },
                    users: true
                  }
            })
            return schools
            
        } catch (error: any) {
            return error?.message
        }
    } else {
        try {
            const school = await db.school.findUnique({
                where: {
                    name: session?.user.school
                },
                include: {
                    municipality: {
                        select: {
                            name: true,
                        },
                    },
                    users: true
                  }
            })
            return [school]

        } catch (error: any) {
            return error?.message
        }



    }
   
}

export const getSchoolsByMunicipalityId= async (municipalityId : string) => {
    try {
        const schools = await db.school.findMany({
            where: {
                municipalityId 
            }
        })
    return {
        message: "success",
        data: schools
    }
        
    } catch (error: any) {
        return error?.message
    }

}

export const countUsersInSchool = async (name: string) => {
    try {
      const school = await db.school.findUnique({
        where: {
            name
        },
        include: {
            users: {
                select: {
                    id: true
                }
            }
        },
      })
      return school?.users.length
    } catch (error: any) {
      return error?.message
    }
  }

export async function registerSchool(PrevState: FormState,
    formData: FormData,
  ): Promise<FormState> {

    const type = formData.get("type") as string
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const municipality = formData.get("municipality") as string
    const isActive = JSON.parse(formData.get("isActive")as string) as boolean
  
  
    const municipalities = await db.municipality.findMany({
      select: {
        name: true,
        id: true
      }
    })
  
    const currentMunicipality = municipalities.filter((e) => e.name === municipality)
  
    const registerSchoolSchema = z.object({
      name: z.string().min(5, 'Skolenavn må ha minst 5 tegn').max(40, 'Skolenavn må være mindre enn 40 tegn'),
      municipality: z.string().superRefine((value, ctx) => {
        const matchingMunicipality = municipalities.some((e) => e.name === value)
        if (!matchingMunicipality) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Uglydig kommunenavn",
          })
        }
  
      }),
      isActive: z.boolean().refine(value => typeof value === 'boolean', {
        message: 'isActive må være en boolean'
      }),
    })
  
    try {

        registerSchoolSchema.parse({
            name,
            municipality,
            isActive,
          })
    
        if (type === "add"){
      
              const school = await db.school.create({
                data: {
                  name: name,
                  municipalityId: currentMunicipality[0].id,
                  isActive
                }
              })
        
        
              revalidatePath("/portal/dashboard/schools")
        }

        if (type === "edit") {
                const school = await db.school.update({
                  where: {
                     id: id
                  },
                  data: {
                    name: name,
                    municipalityId: currentMunicipality[0].id,
                    isActive
                  }
               
                })
          
                revalidatePath("/portal/dashboard/schools")
        }

      return {
        message: "success",
        ...(type === "add" && { successMessage: `Opprettet skole: ${name}` }),
        ...(type === "edit" && { successMessage: `Lagret skole: ${name}` }),
        fieldValues: {
            type,
            name,
            municipality,
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
                  municipality,
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

export const deleteSchool = async(id:string) => {
    try {
        await db.school.delete({
            where: {
                id
            }
        })
        revalidatePath("/portal/dashboard/schools")

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