"use client";

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.toString())
  }, [error])
  const [showError, setShowError] = useState(false)
  return (
    <div className="flex p-20 justify-center items-center flex-col gap-5 text-white mx-auto h-screen">
      <span className="flex justify-center items-center text-mtn-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[90px] h-[90px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </span>
      <p className="text-2xl font-mtn text-mtn-600 text-center">
        Oops! Something went wrong!
      </p>

      <div className="text-red-500 text-center mb-4 max-w-[480px] break-words">
        <div className="text-center">
          An error was encountered while processing your request.
        </div>
        {showError ? (
          <div
            onClick={() => {
              setShowError(false);
            }}
            className="relative z-10 bg-[#111111] hover:bg-[#313131] inline-flex justify-center items-center rounded-full p-1 border border-white/30 cursor-pointer my-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        ) : (
          <div
            onClick={() => {
              setShowError(true);
            }}
            className="relative z-10 bg-[#111111] hover:bg-[#313131] inline-flex justify-center items-center rounded-full p-1 border border-white/30 cursor-pointer my-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        )}
        {showError && (
          <div className="mt-[-15px] text-[12px] px-4 py-2 bg-white/80 rounded-xl border border-white/30">
            {error.toString()}
          </div>
        )}
      </div>
      <button
        className="bg-red-600 hover:bg-red-900 rounded-full text-white/50 px-4 py-2"
        onClick={reset}
      >
        Retry
      </button>
    </div>
  );
}
