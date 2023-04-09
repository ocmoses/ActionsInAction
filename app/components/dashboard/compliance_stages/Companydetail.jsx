import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Companydetail({ category, stage }) {
  return (
    category && (
      <>
        {approvalFields.company_name?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_name"
            type="text"
          />
        )}
        {approvalFields.country?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="country"
            type="text"
          />
        )}
        {approvalFields.company_address?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_address"
            type="text"
          />
        )}
        {approvalFields.company_city?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_city"
            type="text"
          />
        )}
        {approvalFields.company_state?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_state"
            type="text"
          />
        )}
        {approvalFields.company_postcode?.approval && (
          <ComplianceLabel
            category={category}
            stage={stage}
            field="company_postcode"
            type="text"
          />
        )}
      </>
    )
  )
}
