import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useAdmins from "@/hooks/useAdmins"
import { useState } from "react"
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
      <div className="flex flex-col flex-1 w-full h-full overflow-y-auto gap-12 justify-start items-start p-6 pb-24">
        {activeStage === "companydetail" && (
          <Companydetail category={category} stage={activeStage} />
        )}
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
      <div className="flex flex-wrap text-[#999999] text-[12px] pb-24">
        SPRM: SUPPLIER & RELATIONSHIP MANAGEMENT, RICO: RISK & COMPLIANCE, LEGA:
        LEGAL, INSU: INSURANCE
      </div>
    </div>
  )
}
