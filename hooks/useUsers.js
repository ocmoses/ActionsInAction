"use client"
import { useStoreActions, useStoreState } from "easy-peasy"

export default function useUsers() {
  // const session = useStoreState(
  //   (state) => state.users?.session,
  //   (prev, next) => prev === next
  // )
  // const fullname = useStoreState(
  //   (state) => state.users?.fullname,
  //   (prev, next) => prev === next
  // )
  // const user = useStoreState(
  //   (state) => state.users?.user,
  //   (prev, next) => prev === next
  // )
  // const users = useStoreState(
  //   (state) => state.users?.users,
  //   (prev, next) => prev === next
  // )
  // const isLoggedIn = useStoreState(
  //   (state) => state.users?.isLoggedIn,
  //   (prev, next) => prev === next
  // )
  const states = useStoreState((action) => action.users)
  const actions = useStoreActions((action) => action.users)

  return { ...states, ...actions }
  // return { users, user, isLoggedIn, fullname, session, ...actions }
}
