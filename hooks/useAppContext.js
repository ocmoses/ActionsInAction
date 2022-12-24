'use client'
import { createContext, useContext } from 'react'

const AppContext = createContext()

export function AppContextProvider({ children }) {
  console.log('AppContextProvider')
  const data = 'Sample data'

  return (
    <AppContext.Provider
      value={{
        data
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
