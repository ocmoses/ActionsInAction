import {
  complianceRequirements,
  departments,
  company_type,
  license_type,
  fieldCounts,
  fieldsCounts,
} from "@/app/modules/constants"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import Confirm from "@/app/components/Confirm"
import moment from "moment"
import useErrors from "@/hooks/useErrors"
import useApp from "@/hooks/useApp"
import useAdmins from "@/hooks/useAdmins"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  filterPartner,
  partnerApprovals,
  filterFields,
  filterComplianceRequirements,
} from "@/app/modules/utilities"
import DeptBadge from "./compliance/DeptBadge"
import useRoles from "@/hooks/useRoles"

export default function ComplianceLabel({
  field,
  stage,
  category,
  category_shortcode,
  type,
}) {
  const { isSuperadmin } = useRoles()
  const { previewFiles } = useApp()
  const {
    admin,
    ApproveField,
    activeApproval,
    setActiveApproval,
    approving,
    setApproving,
    categories,
    setPartner,
    partner,
  } = useAdmins()
  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  const [{ setError, clearErrors }] = useErrors(null)
  const Approvals = partnerApprovals(partner, category)

  useEffect(() => {
    setApproving(false)
    clearErrors()
    fieldsCounts()
  }, [])

  const Approve = (status) => {
    setActiveApproval(field)
    if (status === "reject") {
      setApprove(false)
      setReject(true)
    } else {
      setReject(false)
      setApprove(true)
    }
  }

  const handleApproveField = async (status, feedback) => {
    if (approving) return
    setApproving(true)
    const Data = {
      partner_uuid: category.partner_uuid,
      user_uuid: category.user_uuid,
      category_uuid: category.category_uuid,
      category_stage: stage,
      feedback: feedback ?? "",
      status: status,
      field: field,
    }
    clearErrors()

    const response = await ApproveField(Data)
    setApproving(false)
    if (!response)
      return setError({
        approval: "No respond received. Please check your connection",
      })
    const { success, data, error } = response
    if (!success)
      return setError({
        approval: error,
      })

    const partnerInfo = data?.partner
    filterPartner(partnerInfo, categories)
    setPartner(partnerInfo)
    cancel()
  }
  const approveField = async () => {
    await handleApproveField(
      "approved",
      `${complianceRequirements[stage][field].title} approved`
    )
  }
  const rejectField = async (reason) => {
    await handleApproveField("rejected", reason.rejection_reason)
  }
  const cancel = () => {
    setActiveApproval(null)
    setApprove(false)
    setReject(false)
  }
  const rejectIcon = (
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
  const checkedIcon = (
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
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
  const correctedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
      />
    </svg>
  )

  const Departments = []
  const DeptCode = []
  departments?.length > 0 &&
    departments.map((dept) => {
      if (
        dept.code in fieldCounts[stage] &&
        "fields" in fieldCounts[stage][dept.code] &&
        fieldCounts[stage][dept.code].fields.includes(field)
      )
        Departments.push(dept)
      DeptCode.push(dept.code)
    })
  let icon
  let icon_color = "text-[#999999]"
  if (
    Approvals &&
    Approvals[stage] &&
    admin.department_code in Approvals[stage] &&
    field in Approvals[stage][admin.department_code]
  ) {
    if (Approvals[stage][admin.department_code][field] === "approved") {
      icon = <span className="text-green-600 w-2 h-2">{checkedIcon}</span>
      icon_color = "text-green-600"
    }
    if (Approvals[stage][admin.department_code][field] === "rejected") {
      icon = <span className="text-red-600 w-2 h-2">{rejectIcon}</span>
      icon_color = "text-red-600"
    }
    if (Approvals[stage][admin.department_code][field] === "corrected") {
      icon = <span className="text-mtn-600 w-3 h-3">{correctedIcon}</span>
      icon_color = "text-mtn-600"
    }
  }
  // console.log({ fieldCounts })
  return (
    (isSuperadmin() ||
      (admin.department_code in fieldCounts[stage] &&
        "fields" in fieldCounts[stage][admin.department_code] &&
        fieldCounts[stage][admin.department_code].fields.includes(field))) && (
      <div
        className={`w-full p-3 border border-[#212121] rounded-[8px]  ${
          activeApproval === field ? " rounded-xl bg-[#313131]" : ""
        }`}
      >
        {approve && (
          <Confirm
            yestext="Yes"
            notext="No"
            type="approve"
            onYes={() => approveField()}
            onNo={cancel}
          />
        )}
        {reject && (
          <Confirm
            yestext="Reject"
            notext="Cancel"
            type="reject"
            onYes={rejectField}
            onNo={cancel}
          />
        )}
        {console.log({ type, field, stage })}
        {stage in complianceRequirements &&
          field in complianceRequirements[stage] && (
            <div className="flex relative items-start gap-3 w-full">
              {/* {console.log({ field })} */}
              {activeApproval && activeApproval !== field && (
                <div className="absolute cursor-not-allowed top-[-10px] right-[-10px] bottom-[-10px] left-[-10px] z-20 bg-transparent"></div>
              )}

              <div className={`${icon_color} w-18 h-18`}>
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
                <div className="flex gap-3 items-start">
                  {isSuperadmin() && (
                    <div
                      className={`grid grid-cols-${
                        Departments?.length > 2 ? "2" : "1"
                      } col-auto gap-2 items-center pt-[3px]`}
                    >
                      {Departments?.length > 0 &&
                        Departments.map((dept) => (
                          <DeptBadge
                            key={dept.code}
                            dept={dept}
                            field={field}
                            category={category}
                          />
                        ))}
                    </div>
                  )}
                  <div className="flex flex-col gap-0 w-full">
                    <span className="text-[12px] m-0 text-[#999999]">
                      {stage in complianceRequirements &&
                        complianceRequirements[stage][field]?.title}
                    </span>
                    <div className="flex gap-2 items-start justify-between w-full">
                      {type === "text" && (
                        <span className="text-white text-[14px] font-bold">
                          {category[field] && category[field]}
                        </span>
                      )}
                      {type === "company_type" && (
                        <span className="text-white text-[14px] font-bold">
                          {category[field] &&
                            company_type?.find(
                              (t) => t.value === category[field]
                            )?.label}
                        </span>
                      )}
                      {type === "license_type" && (
                        <span className="text-white text-[14px] font-bold">
                          {category[field] &&
                            license_type?.find(
                              (t) => t.value === category[field]
                            )?.label}
                        </span>
                      )}
                      {type === "company_state" && (
                        <span className="text-white text-[14px] font-bold">
                          {category[field] &&
                            STATES?.find(
                              (s) =>
                                s.state_code === category[field] &&
                                s.country_code === category.country
                            )?.state_name}
                        </span>
                      )}
                      {type === "country" && (
                        <span className="text-white text-[14px] font-bold flex items-center gap-1">
                          <Image
                            alt={`${category[field]}`}
                            src={`/assets/flags/${
                              category[field]?.toLowerCase() ?? "ng"
                            }.svg`}
                            className={"inline rounded-sm h-auto"}
                            width={24}
                            height={15}
                            priority
                          />
                          <span>
                            {category[field] &&
                              COUNTRIES?.find(
                                (c) => c.value === category[field]
                              )?.title}
                          </span>
                        </span>
                      )}
                      {type === "date" && field in category && (
                        <span className="text-white text-[14px] font-bold">
                          {category[field] &&
                            moment(category[field]).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "file" && category[field]?.file_path && (
                        <span
                          onClick={() =>
                            previewFiles(category[field]?.file_path ?? "")
                          }
                          className="text-white text-[14px] font-bold cursor-pointer"
                        >
                          {category[field]?.file_name}
                        </span>
                      )}

                      {type === "shortcodes" && (
                        <span className="text-white text-[14px] font-bold">
                          {category_shortcode.shortcode?.shortcodes?.length >
                            0 &&
                            category_shortcode.shortcode?.shortcodes?.join(
                              ", "
                            )}
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
                          className="text-white text-[14px] font-bold cursor-pointer"
                        >
                          {
                            category_shortcode.shortcode?.shortcode_doc
                              ?.file_name
                          }
                        </span>
                      )}
                      {type === "shortcode_issue_date" && (
                        <span className="text-white text-[14px] font-bold">
                          {category_shortcode.shortcode?.shortcode_issue_date &&
                            moment(
                              category_shortcode.shortcode?.shortcode_issue_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "shortcode_expiry_date" && (
                        <span className="text-white text-[14px] font-bold">
                          {category_shortcode.shortcode
                            ?.shortcode_expiry_date &&
                            moment(
                              category_shortcode.shortcode
                                ?.shortcode_expiry_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {/* PRICING */}
                      {type === "pricing_shortcodes" && (
                        <span className="text-white text-[14px] font-bold">
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
                          className="text-white text-[14px] font-bold cursor-pointer"
                        >
                          {
                            category_shortcode.shortcode_pricing?.pricing_doc
                              ?.file_name
                          }
                        </span>
                      )}
                      {type === "pricing_issue_date" && (
                        <span className="text-white text-[14px] font-bold">
                          {category_shortcode.shortcode_pricing
                            ?.pricing_issue_date &&
                            moment(
                              category_shortcode.shortcode_pricing
                                ?.pricing_issue_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {type === "pricing_expiry_date" && (
                        <span className="text-white text-[14px] font-bold">
                          {category_shortcode.shortcode_pricing
                            ?.pricing_expiry_date &&
                            moment(
                              category_shortcode.shortcode_pricing
                                ?.pricing_expiry_date
                            ).format("DD / MMM / YYYY")}
                        </span>
                      )}
                      {/* <span className="w-2 h-2 font-bold">{icon}</span> */}
                    </div>
                  </div>
                </div>
                {!isSuperadmin() &&
                  !activeApproval &&
                  admin.department_code in fieldCounts[stage] &&
                  "fields" in fieldCounts[stage][admin.department_code] &&
                  fieldCounts[stage][admin.department_code].fields.includes(
                    field
                  ) &&
                  (!(
                    admin?.department_code &&
                    category?.approvedFields[category.category_uuid] &&
                    admin.department_code in
                      category?.approvedFields[category.category_uuid] &&
                    field in
                      category?.approvedFields[category.category_uuid][
                        admin.department_code
                      ]
                  ) ||
                    category?.approvedFields[category.category_uuid][
                      admin.department_code
                    ][field] === "corrected") && (
                    <div className="flex gap-3 items-center justify-end">
                      <div
                        onClick={() => Approve("reject")}
                        className="w-[36px] h-[36px] cursor-pointer text-red-600 hover:text-red-600/50 rounded-full border-solid border-2 border-red-600 hover:border-red-600/50 flex justify-center items-center"
                      >
                        {rejectIcon}
                      </div>
                      <div
                        onClick={() => Approve()}
                        className="w-[36px] h-[36px] cursor-pointer text-green-600 hover:text-green-600/50 rounded-full border-solid border-2 border-green-600 hover:border-green-600/50 flex justify-center items-center"
                      >
                        {checkedIcon}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
      </div>
    )
  )
}
