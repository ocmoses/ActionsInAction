import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <>
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
      </>
    )
  )
}
