"use client"
import { useStoreActions, useStoreState } from "easy-peasy"
const useApp = () => {
  const errors = useStoreState(
    (state) => state.app.errors,
    (prev, next) => prev === next
  )
  const success = useStoreState(
    (state) => state.app.success,
    (prev, next) => prev === next
  )
  const processing = useStoreState(
    (state) => state.app.processing,
    (prev, next) => prev === next
  )
  const loading = useStoreState(
    (state) => state.app.loading,
    (prev, next) => prev === next
  )
  const form = useStoreState(
    (state) => state.app.form,
    (prev, next) => prev === next
  )

  const actions = useStoreActions((action) => action.app)

  return { errors, success, processing, loading, form, ...actions }
}

export default useApp
