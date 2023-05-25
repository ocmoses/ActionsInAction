"use client"
import useApp from "@/hooks/useApp"
export default function FormErrors({ error, success, align }) {
  const { globalerrors, removeGlobalError } = useApp()
  return (
    <>
      {globalerrors.length > 0 &&
        globalerrors.map((error, index) => (
          <div
            key={`${error}-${index}`}
            className={`flex gap-3 max-w-[480px] m-auto items-center justify-between mt-2`}
          >
            <div
              className={`flex gap-3 py-2 items-center text-[14px] text-red-600`}
            >
              <span className="h-[16px] w-[16px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  // className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </span>
              <span>{error}</span>
            </div>
            <span
              onClick={() => removeGlobalError(index)}
              className="h-[16px] w-[16px] text-red-600 hover:text-red-900 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        ))}
    </>
  )
}
