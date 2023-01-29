"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
const useProcessing = () => {
  const actions = useStoreActions((action) => action.app)
  const states = useStoreState((state) => state.app)
  return { ...states, ...actions }
}

export default useProcessing
