import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string | undefined
      role: string
      municipality: string
      municipalityId: string
      selectionFilter: boolean
      school: string
      isActive: boolean
      accessLevel: number
  }
  expires: string
  }
}