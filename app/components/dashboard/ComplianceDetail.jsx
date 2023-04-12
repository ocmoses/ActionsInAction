import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useAdmins from "@/hooks/useAdmins"
import { useState, useEffect } from "react"
import { departments } from "@/app/modules/constants"
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
  const { partner, updatePartner } = useAdmins()
  const { processing, setProcessing, setForm } = useProcessing()
  const [view, setView] = useState("overview")
  const [Feedbacks, setFeedbacks] = useState({})

  useEffect(() => {
    setFeedbacks({
      approvals: category.compliance_approvals,
      feedbacks: category.compliance_feedbacks,
    })
    console.log({
      approvals: category.compliance_approvals,
      feedbacks: category.compliance_feedbacks,
    })
  }, [category])

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
        <div>
          <h1 className="text-white">
            Kunle Sadare updated Tax Identification number Approved . Feb 6,
            2023 at 9:24 AM
          </h1>
          <div className="border rounded-full border-dotted border-white/30 leading-[89%] px-4 py-2 text-[13px] text-[#999999]">
            Reason: We could not verify your Tax Identification number
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
