"use client"
import { useStoreActions } from "easy-peasy"

export default function Session({ children, serverSession }) {
  console.log({ serverSession })
  const actions = useStoreActions((action) => action.users)
  if (serverSession?.user) actions.updateUser(serverSession?.user)

  return <>{children}</>
}

// "use client"
// import useUsers from "@/hooks/useUsers"
// export default function Session({ children, serverSession }) {
//   if (serverSession?.user) {
//     const { updateUser } = useUsers()
//     // updateUser(serverSession?.user)
//   }

//   return <>{children}</>
// }
