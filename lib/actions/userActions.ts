"use server"

import { auth } from "@/auth"
import db from "../prismadb"
import { revalidatePath } from "next/cache"
import { User } from "@prisma/client"
import { AuthError } from 'next-auth';
import { ZodError, boolean, z } from 'zod';
import bcrypt from "bcryptjs"
import { Prisma, Role } from '@prisma/client';
import { TranslateKeyToLanguage, TranslateLanguageToKey } from '../misc/languageMapping';


type UserWithSchoolAndMunicipality = User & {
    school: {
        name: string
    } | null,
    municipality: {
        name: string
    } | null
}

export const getUsers = async (): Promise<UserWithSchoolAndMunicipality[]> => {
    const session = await auth()

    if (!session) throw new Error("No session")
    if (!session.user?.isActive) throw new Error("User not active")

    try {
        const users = await db.user.findMany({
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
                school: {
                    select: {
                        name: true,
                    },
                },
              },
        })

        return users
    } catch (error: any) {
        return error?.message
    }
   
}

export const countUsers = async () => {
    try {
      const countUsers = await db.user.count({})
      return countUsers
    } catch (error: any) {
      return error?.message
    }
}

export const getUser = async(id:string) => {

    try {
        const user = await db.user.findUnique({
            where: {
                id
            }, 
            include: {
                municipality: {
                    select: {
                        name: true
                    }
                },
                school: {
                    select: {
                        name: true
                    }
                },
            },
        })
        return {
            message: "success",
            data: user
        }
        
    } catch (error: any) {
        return {
            message: "error",
            errorMessage: error.message
        }
    }   
}

export async function registerUser(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const type = formData.get("type") as string
    const id = formData.get("id") as string | undefined
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const municipality = formData.get("municipality") as string
    const school = formData.get("school") as string   
    let role = formData.get("role") as string
    const isActive = JSON.parse(formData.get("isActive")as string) as boolean


    const roleTrans = TranslateLanguageToKey(role, "norwegian")
    if (roleTrans) role = roleTrans as Role

    const schools = await db.school.findMany({
      select: {
        name: true,
        id: true,
        municipalityId: true
      },
    })

    const municipalities = await db.municipality.findMany({
      select: {
        name: true,
        id: true
      }
    }
    )
    const userSchema = z.object({
      name: z.string().min(5, 'Navn må være minst 5 tegn').max(30, 'Navn må være mindre enn 30 tegn'),
      email: z.string().email('Ugylid e-post'),
      password: z.string().min(8, 'Passord må være minst 8 tegn').max(99),
      confirmPassword: z.string().min(8, 'Passord må være minst 8 tegn').max(99),
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
      school: z.string().superRefine((value, ctx) => {
        const matchedSchool = schools.find((e) => e.name === value)
        const matchedMunicipality = municipalities.find((e) => e.name === municipality)
        
        if (!matchedSchool) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Uglydig skolenavn",
          })
        }

        if (matchedMunicipality && matchedSchool && matchedSchool.municipalityId !== matchedMunicipality?.id) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Skolen finnes ikke i valgt kommune",
          })
        }
    
      }),
      role: z.nativeEnum(Role, {
        errorMap: (issue, ctx) => {
          return {message: 'Ugyldig rolle'};
        }}), 
      isActive: z.boolean().refine(value => typeof value === 'boolean', {
        message: 'isActive må være en boolean'
      }),
    }).superRefine(({password, confirmPassword}, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 3,
          type: "array",
          inclusive: true,
          message: "Begge passord må være like"
        });
      }
    })

    const updateUserSchema = z.object({
      name: z.string().min(5, 'Navn må være minst 5 tegn').max(30, 'Navn må være mindre enn 30 tegn'),
      email: z.string().email('Ugylid e-post'),
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
      school: z.string().superRefine((value, ctx) => {
        const matchedSchool = schools.find((e) => e.name === value)
        const matchedMunicipality = municipalities.find((e) => e.name === municipality)
        
        if (!matchedSchool) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Uglydig skolenavn",
          })
        }

        if (matchedMunicipality && matchedSchool && matchedSchool.municipalityId !== matchedMunicipality?.id) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: "array",
            inclusive: true,
            message: "Skolen finnes ikke i valgt kommune",
          })
        }
    
      }),
      role: z.nativeEnum(Role, {
        errorMap: (issue, ctx) => {
          return {message: 'Ugyldig rolle'};
        }}), 
        isActive: z.boolean().refine(value => typeof value === 'boolean', {
          message: 'isActive må være en boolean'
        }),
    }
    )

    try {
      //ADD NEW USER
      if (type === "add") {
        userSchema.parse({
          name,
          email,
          password,
          confirmPassword,
          role,
          municipality,
          school,
          isActive,
        })

        const hashedPassword = await bcrypt.hash(password, 12)

        const currentSchool = schools.filter((e) => e.name === school)
        const currentMunicipality = municipalities.filter((e) => e.name === municipality)
   
   
     
       const user = await db.user.create({
         data: {
             name: name,
             email: email,
             hashedPassword: hashedPassword,
             role: role as Role,
             municipalityId: currentMunicipality[0].id,
             schoolId: currentSchool[0].id,
             isActive: isActive,
           }
       })
   
         return {
           message: "success",
           fieldValues: {
             name: name,
             email: email,
             role,
             password: "",
             municipality: currentMunicipality[0].name,
             school: currentSchool[0].name,
           }
         }
    
      } 
      //EDIT USER
      if (type === "edit") {
        updateUserSchema.parse({
          name,
          email,
          role,
          municipality,
          school,
          isActive,
        })

        const currentSchool = schools.filter((e) => e.name === school)
        const currentMunicipality = municipalities.filter((e) => e.name === municipality)
        
        console.log(id)
        //CHANGE TO ID
        const user = await db.user.update({
          where: {
            id
          },
          data: {
            name,
            email,
            role: role as Role,
            isActive,
            municipality: {
              connect: {
                id: currentMunicipality[0].id
              }
            },
            school: {
              connect: {
                id: currentSchool[0].id
              }
            },
            
          }
        })

        revalidatePath("/portal/dashboard/users")

        return {
          message: "success",
          successMessage: `Lagret bruker: ${name}`,
          fieldValues: {
            name: name,
            email: email,
            role,
            password: "",
            municipality: currentMunicipality[0].name,
            school: currentSchool[0].name,
          }
        }

      }

      return {
        message: "errorMessage",
        errorMessage: "Data received, but no valid method was defined"
      }
   

    } catch (error) {  
        //Error from auth
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return {message: "errorMessage", errorMessage: "Feil ved opprettelse av ny bruker" }
            default:
              return {
                message: "errorMessage", errorMessage: "Noe gikk galt!"
              }
          } 
        }

        //Error from Zod
        if (error instanceof ZodError) {
          const zodError = error as ZodError
          const errorMap = zodError.flatten().fieldErrors
          if (!errorMap && zodError.errors[0].message) {
            return {
              message: "errorMessage",
              errorMessage: zodError.errors[0].message
            }

          }
          return {
            message: "errorMessage",
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
              email,
              password,
              confirmPassword,
              role,
              municipality,
              school,
              isActive
            }
    
          }
        }
        
        //Error from Primsa
        if (error instanceof Prisma.PrismaClientKnownRequestError) { 
          if (error.code === 'P2002') {
          return {
            message: "errorMessage", errorMessage: "Bruker allerede registrert"
          }
        }
        }

      if (error instanceof Error) {
          return {
            message: "errorMessage", errorMessage: error.message
          }
        }

        return {
          message: "errorMessage", errorMessage: "Noe gikk galt!"
        }
    
    }
}

export const deleteUser = async(id:string) => {
    try {
        await db.user.delete({
            where: {
                id
            }
        })
        revalidatePath("/portal/dashboard/users")

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

