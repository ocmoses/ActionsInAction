export default function ComplianceNavigator({ next, previous, navlabels }) {
  return (
    <>
      <div className="flex justify-between items-center gap-6 mx-2 mb-2">
        <div
          onClick={previous}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex justify-center items-center rounded-full bg-white/10 group-hover:bg-white/20 w-[40px] h-[40px] text-[#FAFAFA]">
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#666666] group-hover:text-white/30 text-[12px] leading-[10px]">
              Previous
            </span>
            <span className="text-white text-[14px] leading-[12px]">
              {navlabels.prev}
            </span>
          </div>
        </div>
        <div
          onClick={next}
          className="flex items-center justify-end gap-2 group cursor-pointer"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[#666666] group-hover:text-white/30 text-[12px] leading-[10px]">
              Next
            </span>
            <span className="text-white text-[14px] leading-[12px]">
              {navlabels.next}
            </span>
          </div>
          <div className="flex justify-center items-center rounded-full bg-white/10 group-hover:bg-white/20 w-[40px] h-[40px] text-[#FAFAFA]">
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
