"use client"
import { useStoreActions, useStoreState } from "easy-peasy"

export default function useAdmins() {
  const states = useStoreState((action) => action.admins)
  const actions = useStoreActions((action) => action.admins)

  return { ...states, ...actions }
}
