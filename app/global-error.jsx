"use client"

import { useEffect } from "react"

export default function GlobalError({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error)
  }, [error])
  const reset = () => {
    location.reload()
  }
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex p-20 justify-center items-center flex-col gap-5 text-white mx-auto my-auto h-screen">
          <span className="flex justify-center items-center text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[180px] h-[180px] text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </span>
          <p className="text-2xl font-mtn">Oops! Something went wrong!</p>
          <div className="text-red-500 text-center mb-4 max-w-[480px] break-words">
            An error was encountered while processing your request.
            <div className="mt-3 px-4 py-2 bg-white/80 rounded-xl border border-white/30">
              {error}
            </div>
          </div>
          <button
            className="bg-red-600 hover:bg-red-900 rounded-full text-white/50 px-4 py-2"
            onClick={reset}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  )
}
