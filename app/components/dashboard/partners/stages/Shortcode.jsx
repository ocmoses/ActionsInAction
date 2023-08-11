import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners";
import { approvalFields } from "@/app/modules/constants";

export default function Shortcode({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-6 w-full">
        {category.shortcodes.length > 0 &&
          category.shortcodes.map((shtcd, index) => (
            <div
              key={shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid}
              className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]"
            >
              {shtcd.shortcode?.shortcodes?.length > 0 && (
                <>
                  {approvalFields[
                    `shortcodes-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <>
                      <ComplianceLabelPartners
                        category={category}
                        category_shortcode={shtcd}
                        stage={stage}
                        field={`shortcodes-${
                          shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                        }`}
                        type="shortcodes"
                      />
                    </>
                  )}
                  {approvalFields[
                    `shortcode_doc-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_doc-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="shortcode_doc"
                    />
                  )}
                  {approvalFields[
                    `shortcode_issue_date-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_issue_date-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="shortcode_issue_date"
                    />
                  )}
                  {approvalFields[
                    `shortcode_expiry_date-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`shortcode_expiry_date-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="shortcode_expiry_date"
                    />
                  )}
                  {approvalFields[
                    `pricing_shortcodes-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_shortcodes-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="pricing_shortcodes"
                    />
                  )}
                  {approvalFields[
                    `pricing_issue_date-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_issue_date-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="pricing_issue_date"
                    />
                  )}
                  {approvalFields[
                    `pricing_expiry_date-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_expiry_date-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="pricing_expiry_date"
                    />
                  )}
                  {approvalFields[
                    `pricing_doc-${
                      shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                    }`
                  ]?.approval && (
                    <ComplianceLabelPartners
                      category={category}
                      category_shortcode={shtcd}
                      stage={stage}
                      field={`pricing_doc-${
                        shtcd.uuid ? shtcd.uuid : shtcd.shortcode_uuid
                      }`}
                      type="pricing_doc"
                    />
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    )
  );
}
