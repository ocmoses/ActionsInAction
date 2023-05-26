import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        {approvalFields.nlrc_license_type?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="nlrc_license_type"
            type="text"
          />
        )}
        {approvalFields.nlrc_license_id?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="nlrc_license_id"
            type="text"
          />
        )}
        {approvalFields.nlrc_issue_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="nlrc_issue_date"
            type="date"
          />
        )}
        {approvalFields.nlrc_expiry_date?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="nlrc_expiry_date"
            type="date"
          />
        )}
        {approvalFields.nlrc_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="nlrc_doc"
            type="file"
          />
        )}
      </div>
    )
  )
}
