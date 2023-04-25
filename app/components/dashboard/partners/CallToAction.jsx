export default function CallToAction({ message, label, onclick }) {
  return (
    <div className="flex justify-between gap-6 items-center p-[24px] border border-[#621E1E] rounded-lg">
      <div className="flex justify-start items-center gap-6">
        <div className="flex justify-center p-0 items-center bg-[#FE2E2D] text-black rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-[28px] h-[28px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-3 px-2 py-3">
          <p className="font-bold my-0">{message}</p>
        </div>
      </div>
      {label && (
        <p
          onClick={() => onclick}
          className="text-[#999999] my-0 text-sm cursor-pointer hover:text-white/70"
        >
          {label}
        </p>
      )}
    </div>
  )
}
