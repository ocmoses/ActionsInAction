import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import moment from "moment"
import useAdmins from "@/hooks/useAdmins"
import { complianceRequirements, departments } from "@/app/modules/constants"
import { useState, useEffect } from "react"
import Companydetail from "./compliance_stages/Companydetail"
import Compliance from "./compliance_stages/Compliance"
import Ncclicense from "./compliance_stages/Ncclicense"
import Nlrclicense from "./compliance_stages/Nlrclicense"
import Shortcode from "./compliance_stages/Shortcode"
import Indemnity from "./compliance_stages/Indemnity"
import Accountinfo from "./compliance_stages/Accountinfo"

export default function ComplianceDetail({
  activeStage,
  category,
  setOpenDrawer,
  openDrawer,
}) {
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const { partner, updatePartner, Stages } = useAdmins()

  const { processing, setProcessing, setForm } = useProcessing()
  const [view, setView] = useState("overview")
  const [Feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    setFeedbacks(category.feedbacks[activeStage])
    console.log({ category })
  }, [activeStage, category])
  useEffect(() => {
    console.log({ Stages })
  }, [Stages, category])

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-start items-start gap-6 mb-auto border-b border-b-white/20 px-6">
        <div
          onClick={() => setView("overview")}
          className={`text-[14px] py-3 border-b-2 cursor-pointer ${
            view === "overview"
              ? "text-white border-b-[#FFCB03]"
              : "text-white/50 hover:white/70  border-b-transparent hover:border-white/40"
          }`}
        >
          Overview
        </div>
        <div
          onClick={() => setView("activities")}
          className={`text-[14px] py-3 border-b-2 cursor-pointer ${
            view === "activities"
              ? "text-white border-b-[#FFCB03]"
              : "text-white/50 hover:white/70  border-b-transparent hover:border-white/40"
          }`}
        >
          Activities
        </div>
      </div>
      <div
        className="flex-col flex-1 w-full h-full overflow-y-auto gap-4 justify-start items-start p-6 pb-24"
        style={{ display: view === "activities" ? "none" : "flex" }}
      >
        {activeStage === "companydetail" && (
          <Companydetail category={category} stage={activeStage} />
        )}
        {activeStage === "compliance" && (
          <Compliance category={category} stage={activeStage} />
        )}
        {activeStage === "ncclicense" && (
          <Ncclicense category={category} stage={activeStage} />
        )}
        {activeStage === "nlrclicense" && (
          <Nlrclicense category={category} stage={activeStage} />
        )}
        {activeStage === "shortcode" && (
          <Shortcode category={category} stage={activeStage} />
        )}
        {activeStage === "indemnity" && (
          <Indemnity category={category} stage={activeStage} />
        )}
        {activeStage === "accountinfo" && (
          <Accountinfo category={category} stage={activeStage} />
        )}
      </div>
      <div
        className="flex-col flex-1 w-full h-full overflow-y-auto gap-12 justify-start items-start p-6 pb-24"
        style={{ display: view === "activities" ? "flex" : "none" }}
      >
        {Feedbacks &&
          Feedbacks.map((feedback) => (
            <div className="flex gap-2 items-start">
              <div className="flex justify-center items-center bg-white/40 w-[24px] h-[24px] rounded-full">
                {feedback.admin_user.username[0].toUpperCase()}
              </div>
              <div className="text-white/70 text-[14px]">
                <div>
                  <span className="text-white">
                    {feedback.admin_user.username}
                  </span>{" "}
                  updated{" "}
                  <span className="text-white">
                    {complianceRequirements[activeStage][feedback.field]?.title}
                  </span>
                </div>
                <div>
                  <span className="text-green-600">Approved</span> .{" "}
                  {moment(feedback.created_at).format(
                    "MMM Do, YYYY at h:mm:ss a"
                  )}
                </div>
                <div className="border rounded-full border-dotted border-white/30 leading-[89%] px-3 py-2 text-[13px] text-white/70">
                  <span className="text-white/50">Reason:</span> We could not
                  verify your Tax Identification number
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center gap-6 mx-2 mb-2">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="flex justify-center items-center rounded-full bg-white/10 group-hover:bg-white/20 w-[40px] h-[40px] text-[#FAFAFA]">
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#666666] group-hover:text-white/30 text-[12px] leading-[10px]">
              Previous
            </span>
            <span className="text-white text-[14px] leading-[12px]">
              Short codes
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 group cursor-pointer">
          <div className="flex flex-col gap-1">
            <span className="text-[#666666] group-hover:text-white/30 text-[12px] leading-[10px]">
              Next
            </span>
            <span className="text-white text-[14px] leading-[12px]">
              Insurance
            </span>
          </div>
          <div className="flex justify-center items-center rounded-full bg-white/10 group-hover:bg-white/20 w-[40px] h-[40px] text-[#FAFAFA]">
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t-2 border-t-white/30 bg-[#313131] text-[#999999] text-[12px] px-4 pt-4 pb-24">
        {departments.length > 0 &&
          departments.map((dept) => (
            <div
              key={dept.code}
              className="flex gap-3 items-start justify-start"
            >
              <span className="flex justify-center items-center w-4 h-4 font-extrabold px-1 py-0 text-[14px] bg-[#FFCB03] text-black">
                {dept.code[0]}
              </span>
              <span className="text-[11px] leading-[89%]">{dept.name}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
