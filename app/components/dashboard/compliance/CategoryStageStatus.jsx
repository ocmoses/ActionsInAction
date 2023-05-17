import { fieldsCounts, fieldCounts } from "@/app/modules/constants"
import { getStatuses, partnerApprovals } from "@/app/modules/utilities"

import useAdmins from "@/hooks/useAdmins"
import useRoles from "@/hooks/useRoles"
import { useEffect, useState } from "react"

export default function CategoryStageStatus({ stage, category, partner }) {
  const { isSuperadmin } = useRoles()
  const { admin } = useAdmins()
  const [ApprovalStages, setApprovalStages] = useState(null)
  const [Approvals, setApproval] = useState(null)

  useEffect(() => {
    fieldsCounts()
    const _approvals = partnerApprovals(partner, category)
    const _approvalStages = partner.approvalStages
    setApproval(_approvals)
    setApprovalStages(_approvalStages[category.category_uuid])
  }, [partner.approvalStages, category])

  let dept
  let counts
  if (Approvals) {
    if (!isSuperadmin() && admin && admin.department_code) {
      dept = admin.department_code
      counts =
        stage in Approvals && Approvals[stage][dept]?.counts
          ? Approvals[stage][dept].counts
          : null
    } else {
      counts = Approvals[stage].counts
    }
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
