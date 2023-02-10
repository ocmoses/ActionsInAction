"use client"
import { useStoreActions, useStoreState } from "easy-peasy"

export default function useUsers() {
  const states = useStoreState((action) => action.users)
  const actions = useStoreActions((action) => action.users)
  return { ...states, ...actions }
}
