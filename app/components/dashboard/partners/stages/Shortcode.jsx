import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners"
import { approvalFields } from "@/app/modules/constants"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-6 w-full">
        {category.shortcodes.length > 0 &&
          category.shortcodes.map((shtcd, index) => (
            <div
              key={shtcd.uuid}
              className={`flex flex-col items-start gap-4 w-full ${
                category.shortcodes.length > 0 &&
                index < category.shortcodes.length - 1 &&
                "border-b-2 border-b-white/40 pb-10 mb-6"
              } `}
            >
              {shtcd.shortcode?.shortcodes?.length > 0 && (
                <>
                  {approvalFields.nlrc_license_type?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="shortcodes"
                      type="shortcodes"
                    />
                  )}
                  {approvalFields.shortcode_doc?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="shortcode_doc"
                      type="shortcode_doc"
                    />
                  )}
                  {approvalFields.shortcode_issue_date?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="shortcode_issue_date"
                      type="shortcode_issue_date"
                    />
                  )}
                  {approvalFields.shortcode_expiry_date?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="shortcode_expiry_date"
                      type="shortcode_expiry_date"
                    />
                  )}
                  {approvalFields.pricing_shortcodes?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="pricing_shortcodes"
                      type="pricing_shortcodes"
                    />
                  )}
                  {approvalFields.pricing_issue_date?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="pricing_doc"
                      type="pricing_doc"
                    />
                  )}
                  {approvalFields.pricing_issue_date?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="pricing_issue_date"
                      type="pricing_issue_date"
                    />
                  )}
                  {approvalFields.nlrc_license_type?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field="pricing_expiry_date"
                      type="pricing_expiry_date"
                    />
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    )
  )
}
