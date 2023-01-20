"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
const useProcessing = () => {
  const { setProcessing, setForm } = useStoreActions((action) => action.app)
  const { processing, form } = useStoreState((state) => state.app)
  return { processing, setProcessing, form, setForm }
}

export default useProcessing
