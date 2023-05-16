import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        {approvalFields.audited_account_1_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="audited_account_1_doc"
            type="file"
          />
        )}
        {approvalFields.audited_account_2_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="audited_account_2_doc"
            type="file"
          />
        )}
        {approvalFields.audited_account_3_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="audited_account_3_doc"
            type="file"
          />
        )}
        {approvalFields.job_evidence_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="job_evidence_doc"
            type="file"
          />
        )}
      </div>
    )
  )
}
