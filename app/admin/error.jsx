"use client"
// 'use client' marks this page as a Client Component
// https://beta.nextjs.org/docs/rendering/server-and-client-components

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex p-20 justify-center items-start flex-col gap-5 text-white">
      <p className="text-2xl font-mtn">Oops! Something went wrong!</p>
      <div className="text-red-500 px-0 my-4 max-w-[480px] break-words">
        An error was encountered while processing your request. We are sorry for
        this. The error have been logged and will be fixed in no time
        {/* <div className="mt-3">{error.toString()}</div> */}
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
