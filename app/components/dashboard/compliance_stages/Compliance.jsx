import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Compliance({ category, stage }) {
  return (
    category && (
      <>
        {approvalFields.company_type?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_type"
            type="text"
          />
        )}
        {approvalFields.rc_no?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="rc_no"
            type="text"
          />
        )}
        {approvalFields.tin_no?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="tin_no"
            type="text"
          />
        )}
        {approvalFields.tin_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="tin_doc"
            type="file"
          />
        )}
        {approvalFields.memart_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="memart_doc"
            type="file"
          />
        )}
        {approvalFields.cac_doc?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="cac_doc"
            type="file"
          />
        )}
      </>
    )
  )
}
