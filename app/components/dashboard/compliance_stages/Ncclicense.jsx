import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Ncclicense({ category, stage }) {
  return (
    category && (
      <>
        {approvalFields.vas_license_id?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="vas_license_id"
            type="text"
          />
        )}
        {approvalFields.ncc_issue_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="ncc_issue_date"
            type="date"
          />
        )}
        {approvalFields.ncc_expiry_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="ncc_expiry_date"
            type="date"
          />
        )}
        {approvalFields.ncc_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="ncc_doc"
            type="file"
          />
        )}
      </>
    )
  )
}
