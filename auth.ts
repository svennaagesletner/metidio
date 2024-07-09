import db from "@/lib/prismadb"
import NextAuth from "next-auth"
import GoogleProvider from "@auth/core/providers/google"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";
import { PrismaAdapter} from "@auth/prisma-adapter"


export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [ 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: 'email', type: 'text' },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials) {
  
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string
          },
          include: {
            municipality: true,
            school: true
          }
        });

        if (!user || !user?.hashedPassword) return null

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        ); 

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
    
  ],
},

)

