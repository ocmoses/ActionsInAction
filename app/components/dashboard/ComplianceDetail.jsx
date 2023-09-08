import { forms } from "@/app/modules/constants";
import { useState, useEffect } from "react";
import useAdmins from "@/hooks/useAdmins";
import Companydetail from "@/app/components/dashboard/compliance_stages/Companydetail";
import Compliance from "@/app/components/dashboard/compliance_stages/Compliance";
import Ncclicense from "@/app/components/dashboard/compliance_stages/Ncclicense";
import Nlrclicense from "@/app/components/dashboard/compliance_stages/Nlrclicense";
import Shortcode from "@/app/components/dashboard/compliance_stages/Shortcode";
import BoardResolutionDocument from "@/app/components/dashboard/compliance_stages/BoardResolutionDocument";
import Indemnity from "@/app/components/dashboard/compliance_stages/Indemnity";
import Accountinfo from "@/app/components/dashboard/compliance_stages/Accountinfo";
import Activities from "@/app/components/dashboard/compliance/Activities";
import ComplianceNavigator from "@/app/components/dashboard/compliance/ComplianceNavigator";

export default function ComplianceDetail({ activeStage, category }) {
  const { getStages, categories, setActiveStage } = useAdmins();

  const [view, setView] = useState("overview");
  const [Feedbacks, setFeedbacks] = useState([]);
  const [navlabels, setNavLabels] = useState({ prev: null, next: null });

  const Stages = getStages(category, categories);
  const navigation = Stages?.forms;

  useEffect(() => {
    setFeedbacks(category?.feedbacks[activeStage]);
  }, [activeStage, category]);

  useEffect(() => {
    const index = navigation?.indexOf(activeStage);
    const next = index === navigation?.length - 1 ? index : index + 1;
    const prev = index === 0 ? index : index - 1;
    setNavLabels({
      prev: (forms && navigation && prev) ? forms[navigation[prev]].shortname : "",
      next: (forms && navigation && next) ? forms[navigation[next]].shortname: "",
    });
  }, [activeStage]);

  const nextStage = () => {
    const index = navigation.indexOf(activeStage);
    const next = index === navigation.length - 1 ? index : index + 1;
    setActiveStage(navigation[next]);
  };
  const prevStage = () => {
    const index = navigation.indexOf(activeStage);
    const prev = index === 0 ? index : index - 1;
    setActiveStage(navigation[prev]);
  };
  return (
    <div className="flex flex-col justify-start items-between w-full h-full">
      <div className="grow-0 flex justify-start items-start gap-6 mb-auto border-b border-b-white/20 px-6">
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
      <div className="flex flex-col grow h-14 py-4 bg-white/5">
        <div
          className="flex-col w-full h-full overflow-y-auto gap-4 justify-start items-start p-4"
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
          {activeStage === "board_resolution_document" && (
            <BoardResolutionDocument category={category} stage={activeStage} />
          )}
        </div>
        {view === "activities" && (
          <div className="relative flex flex-col w-full h-full overflow-y-auto p-4">
            <Activities
              type="admin"
              stage={activeStage}
              feedbacks={Feedbacks}
            />
          </div>
        )}
      </div>
      <ComplianceNavigator
        next={nextStage}
        previous={prevStage}
        navlabels={navlabels}
      />
    </div>
  );
}
