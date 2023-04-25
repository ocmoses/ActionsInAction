import ComplianceLabel from "../ComplianceLabel"
import { approvalFields } from "@/app/modules/constants"

export default function Shortcode({ category, stage }) {
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
                  {approvalFields[`shortcodes-${shtcd.uuid}`]?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcodes-${shtcd.uuid}`}
                      type="shortcodes"
                    />
                  )}
                  {approvalFields[`shortcode_doc-${shtcd.uuid}`]?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_doc-${shtcd.uuid}`}
                      type="shortcode_doc"
                    />
                  )}
                  {approvalFields[`shortcode_issue_date-${shtcd.uuid}`]
                    ?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_issue_date-${shtcd.uuid}`}
                      type="shortcode_issue_date"
                    />
                  )}
                  {approvalFields[`shortcode_expiry_date-${shtcd.uuid}`]
                    ?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_expiry_date-${shtcd.uuid}`}
                      type="shortcode_expiry_date"
                    />
                  )}
                  {approvalFields[`pricing_shortcodes-${shtcd.uuid}`]
                    ?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_shortcodes-${shtcd.uuid}`}
                      type="pricing_shortcodes"
                    />
                  )}
                  {approvalFields[`pricing_issue_date-${shtcd.uuid}`]
                    ?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_issue_date-${shtcd.uuid}`}
                      type="pricing_issue_date"
                    />
                  )}
                  {approvalFields[`pricing_expiry_date-${shtcd.uuid}`]
                    ?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_expiry_date-${shtcd.uuid}`}
                      type="pricing_expiry_date"
                    />
                  )}
                  {approvalFields[`pricing_doc-${shtcd.uuid}`]?.approval && (
                    <ComplianceLabel
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_doc-${shtcd.uuid}`}
                      type="pricing_doc"
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
