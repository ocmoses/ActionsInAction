import Image from "next/image"

export default function CategoryStageStatus({ stage, category, partner }) {
  //   console.log({ partner })
  const status =
    stage && stage in partner?.compliance_status[category.category_uuid]
      ? partner?.compliance_status[stage]
      : {}
  let bg =
    status?.status === "approved"
      ? "bg-[#18291F]"
      : status?.status === "processing"
      ? "bg-[#2D200A]"
      : status?.status === "rejected"
      ? "bg-[#361513]"
      : "bg-white/10"
  let textcolor =
    status?.status === "approved"
      ? "text-[#97CDAD]"
      : status?.status === "processing"
      ? "text-[#F9D89A]"
      : status?.status === "rejected"
      ? "text-[#FF9897]"
      : "text-white"
  let iconcolor =
    status?.status === "approved"
      ? "text-[#2C9958]"
      : status?.status === "processing"
      ? "text-[#F3AF33]"
      : status?.status === "rejected"
      ? "text-[#FE2E2D]"
      : "text-[#999999]"
  let icon =
    status?.status === "approved" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ) : status?.status === "processing" ? (
      <Image src="/assets/icons/processing.svg" width={12} height={12} alt="" />
    ) : status?.status === "rejected" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[12px] h-[12px]"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>
    )

  let text =
    status?.status === "approved"
      ? "Approved"
      : status?.status === "processing"
      ? "In review"
      : status?.status === "rejected"
      ? `${status?.rejected} issues`
      : "Pending"

  return (
    <div
      className={`inline-flex gap-1 items-center rounded-2xl ${bg} py-[3px] pl-[10px] pr-[14px]`}
    >
      <span className={`${iconcolor}`}>{icon}</span>
      <span className={`${textcolor} text-[11px]`}>{text}</span>
    </div>
  )
}
