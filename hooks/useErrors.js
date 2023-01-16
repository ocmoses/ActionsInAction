"use client"
import { useState } from "react"
import { useStoreActions, useStoreState } from "easy-peasy"
const useErrors = (data) => {
  const { setError, removeError, clearErrors } = useStoreActions(
    (action) => action.app
  )
  const errors = useStoreState((state) => state.app.errors)
  return [{ errors, setError, removeError, clearErrors }]
}

export default useErrors
