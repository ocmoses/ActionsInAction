import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <>
        {approvalFields.nlrc_license_type?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="nlrc_license_type"
            type="text"
          />
        )}
        {approvalFields.nlrc_license_id?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="nlrc_license_id"
            type="text"
          />
        )}
        {approvalFields.nlrc_issue_date?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="nlrc_issue_date"
            type="date"
          />
        )}
        {approvalFields.nlrc_expiry_date?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="nlrc_expiry_date"
            type="date"
          />
        )}
        {approvalFields.nlrc_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="nlrc_doc"
            type="file"
          />
        )}
      </>
    )
  )
}
