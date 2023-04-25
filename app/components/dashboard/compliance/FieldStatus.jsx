import { getFieldStatus, partnerApprovals } from "@/app/modules/utilities"

export default function CategoryStageStatus({ status }) {
  const { bg, textcolor, iconcolor, icon, text } = getFieldStatus(status)
  return (
    <div
      className={`inline-flex gap-1 items-center rounded-2xl ${bg} py-[3px] pl-[10px] pr-[14px]`}
    >
      <span className={`${iconcolor}`}>{icon}</span>
      <span className={`${textcolor} text-[11px]`}>{text}</span>
    </div>
  )
}
