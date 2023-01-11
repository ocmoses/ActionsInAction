import ProfileLayoutClient from './ProfileLayoutClient'
// import { unstable_getServerSession } from 'next-auth'
// import { getSession } from 'next-auth/react'

// const getsessions = async () => {
//   const unstable_session = await unstable_getServerSession()
//   console.log('unstable session', unstable_session?.data)
//   const session = await getSession()
//   console.log('session', session?.data)
// }

export default async function ProfileLayoutClientPage({ children }) {
  // await getsessions()

  return <ProfileLayoutClient>{children}</ProfileLayoutClient>
}
