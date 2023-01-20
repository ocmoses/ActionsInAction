"use client"
import { useStoreActions } from "easy-peasy"

export default function Session({ children, serverSession }) {
  const actions = useStoreActions((action) => action.users)
  if (serverSession?.status === "authenticated" && serverSession?.User)
    actions.setUser(serverSession?.User.user)

  return <>{children}</>
}
