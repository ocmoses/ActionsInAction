'use client'
import { useStoreActions } from 'easy-peasy'

export default function Session({ children, serverSession }) {
  const actions = useStoreActions((action) => action.users)
  if (serverSession?.user) actions.updateUser(serverSession?.user)

  return <>{children}</>
}
