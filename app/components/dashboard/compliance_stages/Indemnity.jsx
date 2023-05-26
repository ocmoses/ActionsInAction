import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        {approvalFields.indemnity_no?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="indemnity_no"
            type="text"
          />
        )}
        {approvalFields.indemnity_issue_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="indemnity_issue_date"
            type="date"
          />
        )}
        {approvalFields.indemnity_expiry_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="indemnity_expiry_date"
            type="date"
          />
        )}
        {approvalFields.indemnity_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="indemnity_doc"
            type="file"
          />
        )}
      </div>
    )
  )
}
