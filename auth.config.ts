
import { AdapterUser } from '@auth/core/adapters';
import { JWT } from '@auth/core/jwt';
import type { NextAuthConfig, Session } from 'next-auth';
 
export const authConfig = {
  callbacks: {
    jwt: ({token, user, trigger, session}: any) => {
      if (user) {
        token.id = user?.id
        token.role = user?.role
        token.municipality = user.municipality?.name
        token.municipalityId = user.municipalityId
        token.school = user.school.name
        token.isActive = user?.isActive

        if (user.role == "SuperAdmin") token.accessLevel = 6
        if (user.role == "MunicipalityAdmin") token.accessLevel = 5
        if (user.role == "SchoolAdmin") token.accessLevel = 4
        if (user.role == "SchoolLeader") token.accessLevel = 3
        if (user.role == "Adviser") token.accessLevel = 2
        if (user.role == "Teacher") token.accessLevel = 1
        if (user.role == "Guest") token.accessLevel = 0
      }

      if (trigger == "update" && token.accessLevel >= 6) {
        console.log("Trigger update")
        if (session?.name) token.name = session?.name
        if (session?.email) token.email = session?.email
        if (session?.school) token.school = session?.school
        if (session?.municipality) token.municipality = session?.municipality
        if (session?.hasOwnProperty("municipalityId")) token.municipalityId = session?.municipalityId
        if (session?.hasOwnProperty("selectionFilter")) token.selectionFilter = session.selectionFilter
      }

      return token
  
    },
   session: ({ session, user, token}: {
      session: Session, 
      user: AdapterUser, 
      token: JWT
    }): any => {

      console.log("user", user)

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token?.id,
          name: token?.name,
          email: token?.email,
          role: token?.role,
          municipality: token?.municipality,
          municipalityId: token?.municipalityId,
          school: token?.school,
          isActive: token.isActive,
          accessLevel: token.accessLevel || 0,
          selectionFilter: token?.selectionFilter
        }
      }

      return updatedSession
    },
    async authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user
      const paths = [ "/portal", "/portal"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin)
          redirectUrl.searchParams.append("callbackUrl", "/portal")
          return Response.redirect(redirectUrl)
      }

      return true
    }, 
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl + "/portal"
    }
  },
  pages: { 
    signIn: "/portal",
    signOut: "/",
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 1,
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;