"use client"

// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Getstarted error")
    console.error(error)
  }, [error])

  return (
    <div className="flex mx-auto justify-center items-center flex-col gap-5 text-white">
      <p className="text-2xl font-mtn">Oops! Something went wrong!</p>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
