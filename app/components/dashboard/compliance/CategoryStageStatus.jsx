import Image from "next/image"
import { departments, fieldCounts } from "@/app/modules/constants"
import { getStatuses, partnerApprovals } from "@/app/modules/utilities"

import useAdmins from "@/hooks/useAdmins"
import useRoles from "@/hooks/useRoles"

export default function CategoryStageStatus({ stage, category, partner }) {
  const { isSuperadmin } = useRoles()
  const { admin } = useAdmins()

  const Approvals = partnerApprovals(partner, category)
  // console.log({ ApprovalsStatus: Approvals })
  let dept
  let counts
  if (!isSuperadmin() && admin && admin.department_code) {
    dept = admin.department_code
    counts = Approvals[stage][dept]?.counts
  } else {
    counts = Approvals[stage].counts
  }

  const { bg, textcolor, iconcolor, icon, text } = getStatuses(
    counts?.status,
    counts
  )
  return (
    <div
      className={`inline-flex gap-1 items-center rounded-2xl ${bg} py-[3px] pl-[10px] pr-[14px]`}
    >
      <span className={`${iconcolor}`}>{icon}</span>
      <span className={`${textcolor} text-[11px]`}>{text}</span>
    </div>
  )
}
