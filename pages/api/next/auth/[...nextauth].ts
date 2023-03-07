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
        loginID: { label: 'Partner ID', type: 'text', placeholder: '' },
        partnerid: { label: 'Partner ID', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { loginID, partnerid, password } = credentials as any
        let res = null
        // console.log('Auth')
        // console.log({ loginID, partnerid, password })
        // const loginID = null
        if (loginID) {
          // console.log('Auth loginID')
          res = await fetch(`${apiURL}/v1/auth/partner-info/${loginID}`, {
            headers: {
              'Content-Type': 'application/json',
              apikey: `${process.env.APIKEY}`
            }
          })
        } else {
          // console.log('Auth partnerid')
          res = await fetch(`${apiURL}/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ partnerid, password }),
            headers: { 'Content-Type': 'application/json' }
          })
        }

        const result = await res?.json()

        if (res.ok && result) {
          if (result.success) {
            const user = {
              ...result.data.user,
              progress: {
                status: result.data.profile_status,
                percent: result.data.percent_complete,
                stages: { ...result.data.profile_stage }
              }
            }
            // console.log({ user })
            return user
          } else {
            throw new Error(
              'Sorry! An error was encountered during authenotication'
            )
          }
        }
        throw new Error(result.data.message)
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user = token
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      delete token.user
      token = { ...token, ...user }
      // console.log({ token })
      return token
    }
  },
  pages: {
    signIn: '/login'
  }
}

export default NextAuth(authOptions)
