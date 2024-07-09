"use server"

import { auth } from "@/auth"
import db from "../prismadb"
import { Municipality, School } from "@prisma/client"

export const getDashboardData = async () => {
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
                schools: {
                  select: {
                    id: true,
                    name: true,
                    municipalityId: true,
                    isActive: true,
                    municipality: {
                      select: {
                        name: true
                      }
                    },
                    users: {
                      select: {
                        id: true
                      }
                    }
                  }                  
                }
              }
        })
        
        const allSchools = [] as School[]
          municipalities.forEach((e: any) => {
              for (const school of e.schools) {
                  allSchools.push(school)
              }
          })
        
          const allUsers = [] as any
          allSchools.forEach((school: any) => {
          for (const user of school.users) {
            if (!user) return
            allUsers.push(user)
          }
        })

        const counts = {
          municipalities: municipalities.length,
          schools: allSchools.length,
          users: allUsers.length
        }

        const calculateUsersInMunicipality = (name: string, index: number) => {
          const usersInMunicipality = []
          if (!municipalities[index].schools) return
          municipalities[index].schools.forEach(e => {
            for (const user of e.users) {
              if (!user) return
              usersInMunicipality.push(user)
            }
          })
          return usersInMunicipality.length
        }

        municipalities.forEach((e, index) => {
          counts[e.name.trim() as keyof typeof counts] = {
            users: calculateUsersInMunicipality(e.name, index),
            schools: municipalities[index].schools.length
          }
          for (const school of e.schools) {
            counts[e.name as keyof typeof counts][school.name.trim()] = {
              users: school.users.length
            }
          }
        })

        return {municipalities, allSchools, counts}
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
              }
        })
        return [municipalities]
      } catch (error: any) {
          return error?.message
      }
    }

}

export const countMunicipalities = async () => {
  try {
    const countMunicipalities = await db.municipality.count({})
    return countMunicipalities
  } catch (error: any) {
    return error?.message
  }
}

export const countUsersInMunicipality = async (id: string) => {
  try {
    const municipality = await db.municipality.findUnique({
      where: {
          id
      },
      include: {
          users: true
      }
    })
    const count = municipality?.users.length
    return count

  } catch (error: any) {
    return error?.message
  }
}

