import Link from "next/link"

export default function ReviewTitle({ isMaster, title, onClick }) {
  return (
    <div className="md:col-span-1 flex md:flex-col justify-between items-start mb-3 md:mb-0">
      <span className=" text-[#999999] text-[18px] md:max-w-[164px]">
        {title}
      </span>
      {!isMaster && (
        <div
          onClick={onClick}
          className="cursor-pointer px-2 py-0 text-sm text-white/25 inline-block rounded-full border-[1px] border-white/25  hover:text-white/60 hover:border-white/60"
        >
          Edit
        </div>
      )}
    </div>
  )
}
