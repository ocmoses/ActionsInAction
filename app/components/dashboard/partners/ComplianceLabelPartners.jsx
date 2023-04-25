import {
  complianceRequirements,
  company_type,
  license_type,
} from "@/app/modules/constants"
import { partnerApprovals } from "@/app/modules/utilities"
import FieldStatus from "@/app/components/dashboard/compliance/FieldStatus"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import moment from "moment"
import useApp from "@/hooks/useApp"
import usePartners from "@/hooks/usePartners"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function ComplianceLabel({
  field,
  stage,
  category,
  category_shortcode,
  type,
}) {
  const { previewFiles } = useApp()
  const { partner, activeApproval } = usePartners()

  const [Feedbacks, setFeedbacks] = useState({})
  const [Approvals, setApprovals] = useState({})

  useEffect(() => {
    const approvals = partnerApprovals(partner, category)
    setApprovals(approvals)
    console.log({ Approvals })
    setFeedbacks({
      approvals: category.compliance_approvals,
      feedbacks: category.compliance_feedbacks,
    })
  }, [category])

  return (
    <div
      className={`w-full p-3 border border-[#212121] rounded-[8px] ${
        activeApproval === field && " rounded-xl bg-[#313131]"
      }`}
    >
      {stage in complianceRequirements &&
        field in complianceRequirements[stage] && (
          <>
            <div className="flex relative items-start gap-3 w-full">
              {activeApproval && activeApproval !== field && (
                <div className="absolute cursor-not-allowed top-[-10px] right-[-10px] bottom-[-10px] left-[-10px] z-20 bg-transparent"></div>
              )}

              <div className="text-[#999999] w-18 h-18">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                  />
                </svg>
              </div>

              <div className="flex justify-between items-start gap-3 w-full">
                <div className="flex flex-col grow gap-3 items-start">
                  <div className="flex flex-col gap-0 w-full">
                    <span className="text-[12px] m-0 text-[#999999]">
                      {stage in complianceRequirements &&
                        complianceRequirements[stage][field]?.title}
                    </span>
                    {type === "text" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category[field] && category[field]}
                      </span>
                    )}
                    {type === "company_type" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category[field] &&
                          company_type?.find((t) => t.value === category[field])
                            ?.label}
                      </span>
                    )}
                    {type === "license_type" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category[field] &&
                          license_type?.find((t) => t.value === category[field])
                            ?.label}
                      </span>
                    )}
                    {type === "company_state" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category[field] &&
                          STATES?.find(
                            (s) =>
                              s.state_code === category[field] &&
                              s.country_code === category.country
                          )?.state_name}
                      </span>
                    )}
                    {type === "country" && (
                      <span className="text-white/80 text-[14px] font-bold flex items-center gap-1">
                        <Image
                          alt={`${category[field]}`}
                          src={`/assets/flags/${
                            category[field]?.toLowerCase() ?? "ng"
                          }.svg`}
                          className={"inline mr-2 h-4 rounded-sm h-auto"}
                          width={24}
                          height={15}
                          priority
                        />
                        <span>
                          {" "}
                          {category[field] &&
                            COUNTRIES?.find((c) => c.value === category[field])
                              ?.title}
                        </span>
                      </span>
                    )}
                    {type === "date" && field in category && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category[field] &&
                          moment(category[field]).format("DD / MMM / YYYY")}
                      </span>
                    )}
                    {type === "file" && category[field]?.file_path && (
                      <span
                        onClick={() =>
                          previewFiles(category[field]?.file_path ?? "")
                        }
                        className="text-white/80 text-[14px] font-bold cursor-pointer"
                      >
                        {category[field]?.file_name}
                      </span>
                    )}
                    {type === "shortcodes" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode?.shortcodes?.length > 0 &&
                          category_shortcode.shortcode?.shortcodes?.join(", ")}
                      </span>
                    )}
                    {type === "shortcode_doc" && (
                      <span
                        onClick={() =>
                          previewFiles(
                            category_shortcode.shortcode?.shortcode_doc
                              ?.file_path ?? ""
                          )
                        }
                        className="text-white/80 text-[14px] font-bold cursor-pointer"
                      >
                        {category_shortcode.shortcode?.shortcode_doc?.file_name}
                      </span>
                    )}
                    {type === "shortcode_issue_date" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode?.shortcode_issue_date &&
                          moment(
                            category_shortcode.shortcode?.shortcode_issue_date
                          ).format("DD / MMM / YYYY")}
                      </span>
                    )}
                    {type === "shortcode_expiry_date" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode?.shortcode_expiry_date &&
                          moment(
                            category_shortcode.shortcode?.shortcode_expiry_date
                          ).format("DD / MMM / YYYY")}
                      </span>
                    )}
                    {/* PRICING */}
                    {type === "pricing_shortcodes" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode_pricing
                          ?.pricing_shortcodes?.length > 0 &&
                          category_shortcode.shortcode_pricing?.pricing_shortcodes?.join(
                            ", "
                          )}
                      </span>
                    )}
                    {type === "pricing_doc" && (
                      <span
                        onClick={() =>
                          previewFiles(
                            category_shortcode.shortcode_pricing?.pricing_doc
                              ?.file_path ?? ""
                          )
                        }
                        className="text-white/80 text-[14px] font-bold cursor-pointer"
                      >
                        {
                          category_shortcode.shortcode_pricing?.pricing_doc
                            ?.file_name
                        }
                      </span>
                    )}
                    {type === "pricing_issue_date" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode_pricing
                          ?.pricing_issue_date &&
                          moment(
                            category_shortcode.shortcode_pricing
                              ?.pricing_issue_date
                          ).format("DD / MMM / YYYY")}
                      </span>
                    )}
                    {type === "pricing_expiry_date" && (
                      <span className="text-white/80 text-[14px] font-bold">
                        {category_shortcode.shortcode_pricing
                          ?.pricing_expiry_date &&
                          moment(
                            category_shortcode.shortcode_pricing
                              ?.pricing_expiry_date
                          ).format("DD / MMM / YYYY")}
                      </span>
                    )}
                  </div>
                </div>
                {Approvals?.counts?.status && Approvals?.counts?.status && (
                  <div className="flex flex-col gap-0 items-end">
                    <div className="grow-0">
                      <FieldStatus status={Approvals.counts.status[field]} />
                    </div>
                    {Approvals.counts.status[field] === "approved" && (
                      <span className="text-[#999999] text-[12px]">
                        {moment(Approvals.fieldDates.vas_license_id[0]).format(
                          "MMM D, YYYY [at] h:mm:ss a"
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {Approvals?.counts?.status &&
              Approvals?.counts?.status[field] === "rejected" && (
                <div className="flex gap-4 w-full p-[16px] mt-3 bg-white/10 rounded-[8px]">
                  <div className="flex items-center justify-center w-[24px] h-[24px] bg-white/20 rounded-full"></div>
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex w-full text-[13px] text-white">
                      {console.log({
                        field,
                        reason: Approvals.counts.rejections[field],
                      })}
                      Rejection reasons
                    </div>
                    <div className="inline-flex grow-0 cursor-pointer hover:bg-white/20 text-[12px] text-white rounded-full px-[12px] border border-white/80 py-1">
                      Update{" "}
                      {stage in complianceRequirements &&
                        complianceRequirements[stage][field]?.title}
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
    </div>
  )
}
