export default function FormErrors({ error, success, align }) {
  return (
    <>
      {(error || success) && (
        <div
          className={`flex gap-3  items-center ${
            align === "center" ? "justify-center" : "justify-start"
          } text-[14px] ${error ? "text-red-600" : "text-green-600"} mt-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          {error ? <span>{error}</span> : <span>{success}</span>}
        </div>
      )}
    </>
  )
}
