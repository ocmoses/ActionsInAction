import { complianceRequirements, approvalFields } from "@/app/modules/constants"
import Confirm from "@/app/components/Confirm"
import moment from "moment"
import useApp from "@/hooks/useApp"
import useAdmins from "@/hooks/useAdmins"
import { useState } from "react"

export default function ComplianceLabel({ field, stage, category, type }) {
  const { previewFiles } = useApp()
  const { ApproveField } = useAdmins()
  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)

  const Approve = (status) => {
    if (status === "reject") {
      setApprove(false)
      setReject(true)
    } else {
      setReject(false)
      setApprove(true)
    }
  }
  const handleApproveField = async (status, feedback) => {
    const data = {
      partner_uuid: category.partner_uuid,
      user_uuid: category.user_uuid,
      category_uuid: category.category_uuid,
      category_stage: stage,
      feedback: feedback ?? "",
      status: status,
      field: field,
    }

    const response = await ApproveField(data)
  }
  const approveField = async () => {
    await handleApproveField(
      "approved",
      `${approvalFields[field].title} approved`
    )
  }
  const rejectField = async (reason) => {
    await handleApproveField("rejected", reason)
  }
  return (
    <div className="w-full">
      {approve && (
        <Confirm
          yestext="Yes"
          notext="No"
          type="approve"
          onYes={() => approveField()}
          onNo={() => setApprove(false)}
        />
      )}
      {reject && (
        <Confirm
          yestext="Reject"
          notext="Cancel"
          type="reject"
          onYes={rejectField}
          onNo={() => setReject(false)}
        />
      )}
      {stage in complianceRequirements &&
        field in complianceRequirements[stage] && (
          <div className="flex items-start gap-3 w-full">
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
              <div className="flex flex-col gap-1 w-full">
                <span className="text-[12px] text-[#999999]">
                  {stage in complianceRequirements &&
                    complianceRequirements[stage][field]?.title}
                </span>
                <div className="flex justify-between gap-3 flex-1">
                  {type === "text" && (
                    <span className="text-white text-[14px] font-bold">
                      {category[field] && category[field]}
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
                </div>
              </div>
              <div className="flex gap-3 items-center justify-end">
                <div
                  onClick={() => Approve("reject")}
                  className="w-[36px] h-[36px] cursor-pointer text-red-600 hover:text-red-600/50 rounded-full border-solid border-2 border-red-600 hover:border-red-600/50 flex justify-center items-center"
                >
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
                </div>
                <div
                  onClick={() => Approve()}
                  className="w-[36px] h-[36px] cursor-pointer text-green-600 hover:text-green-600/50 rounded-full border-solid border-2 border-green-600 hover:border-green-600/50 flex justify-center items-center"
                >
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
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
