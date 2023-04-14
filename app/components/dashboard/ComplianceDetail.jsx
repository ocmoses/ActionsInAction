import useAdmins from "@/hooks/useAdmins"
import { departments, forms } from "@/app/modules/constants"
import { useState, useEffect } from "react"
import Companydetail from "./compliance_stages/Companydetail"
import Compliance from "./compliance_stages/Compliance"
import Ncclicense from "./compliance_stages/Ncclicense"
import Nlrclicense from "./compliance_stages/Nlrclicense"
import Shortcode from "./compliance_stages/Shortcode"
import Indemnity from "./compliance_stages/Indemnity"
import Accountinfo from "./compliance_stages/Accountinfo"
import Activities from "./compliance/Activities"
import ComplianceNavigator from "./compliance/ComplianceNavigator"

export default function ComplianceDetail({ activeStage, category }) {
  const { Stages, setActiveStage } = useAdmins()

  const [view, setView] = useState("overview")
  const [Feedbacks, setFeedbacks] = useState([])
  const [navlabels, setNavLabels] = useState({ prev: null, next: null })
  const [nextprev, setNextprev] = useState({ prev: null, next: null })
  const navigation = Stages.forms

  useEffect(() => {
    setFeedbacks(category.feedbacks[activeStage])
  }, [activeStage, category])

  useEffect(() => {
    const index = navigation.indexOf(activeStage)
    const next = index === navigation.length - 1 ? index : index + 1
    const prev = index === 0 ? index : index - 1
    setNavLabels({
      prev: forms[navigation[prev]].shortname,
      next: forms[navigation[next]].shortname,
    })
  }, [activeStage])

  const nextStage = () => {
    const index = navigation.indexOf(activeStage)
    const next = index === navigation.length - 1 ? index : index + 1
    setActiveStage(navigation[next])
  }
  const prevStage = () => {
    const index = navigation.indexOf(activeStage)
    const prev = index === 0 ? index : index - 1
    setActiveStage(navigation[prev])
  }
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

      {view === "activities" && (
        <Activities type="admin" stage={activeStage} feedbacks={Feedbacks} />
      )}
      <ComplianceNavigator
        next={nextStage}
        previous={prevStage}
        navlabels={navlabels}
      />
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
