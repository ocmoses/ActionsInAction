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
    <div className="flex mx-auto py-20 justify-center items-center flex-col gap-5 text-white">
      <p className="text-2xl font-mtn">Oops! Something went wrong!</p>
      <div className="text-red-500 p-4 my-4 max-w-[480px]">
        <pre>{error.toString()}</pre>
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
