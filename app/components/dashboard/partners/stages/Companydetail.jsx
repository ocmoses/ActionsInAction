import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners"
import { approvalFields } from "@/app/modules/constants"

export default function Companydetail({ category, stage }) {
  return (
    category && (
      <>
        {approvalFields.company_name?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="company_name"
            type="text"
          />
        )}
        {approvalFields.company_address?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="company_address"
            type="text"
          />
        )}
        {approvalFields.company_city?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="company_city"
            type="text"
          />
        )}
        {approvalFields.company_state?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="company_state"
            type="company_state"
          />
        )}
        {approvalFields.country?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="country"
            type="country"
          />
        )}
        {approvalFields.company_postcode?.approval && (
          <ComplianceLabelPartners
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
