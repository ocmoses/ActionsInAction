"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
const useUsers = () => {
  const session = useStoreState(
    (state) => state.users.session,
    (prev, next) => prev.uuid === next.uuid
  )
  const fullname = useStoreState(
    (state) => state.users.fullname,
    (prev, next) => prev === next
  )
  const user = useStoreState(
    (state) => state.users.user,
    (prev, next) => prev.uuid === next.uuid
  )
  const users = useStoreState(
    (state) => state.users.users,
    (prev, next) => prev === next
  )
  const isLoggedIn = useStoreState(
    (state) => state.users.isLoggedIn,
    (prev, next) => prev === next
  )
  const updateUser = useStoreActions((action) => action.users.updateUser)

  return { users, user, isLoggedIn, fullname, session, updateUser }
}

export default useUsers
