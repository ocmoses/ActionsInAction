"use client"

import { useStoreState } from "easy-peasy"
export default function LayoutClient({ children }) {
  const state = useStoreState((state) => state)
  return <>{children}</>
}
