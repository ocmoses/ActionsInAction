import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { apiURL } from '@/app/modules/constants'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        partnerid: { label: 'Partner ID', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { partnerid, password } = credentials as any
        const res = await fetch(
          `${apiURL}/v1/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({ partnerid, password }),
            headers: { 'Content-Type': 'application/json' }
          }
        )
        const user = await res.json()
        if (res.ok && user) {
          if (user.success) {
            // const user = result.user
            // user.regStatus = result.profile_status
            // user.regPercent = result.percent_complete
            console.log('user.user', user.user)
            return user.user
          } else {
            throw new Error('Sorry! An error was encountered during authenotication')
          }
        }
        throw new Error(user.data.message)
      },
     
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, user, token }) {
      console.log('session token', token)
      session.user = token
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
        console.log('jwt token', token)
        delete token.user
        token = {...token, ...user}
        console.log('jwt token', token)
     return token
    }
  },
  pages: {
    signIn: '/onboarding/login'
  }
}

export default NextAuth(authOptions)
