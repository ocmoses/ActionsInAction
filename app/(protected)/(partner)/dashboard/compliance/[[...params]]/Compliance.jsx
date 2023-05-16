"use client"
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer"
import ComplianceDetailPartners from "@/app/components/dashboard/partners/ComplianceDetailPartners"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import {
  filterCategory,
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
  getStatuses,
  partnerApprovals,
} from "@/app/modules/utilities";
import Image from "next/image";
import useApp from "@/hooks/useApp";
import ComplianceCategories from "@/app/components/dashboard/partners/ComplianceCategories";
import { useRouter } from "next/navigation";

import { fieldsCounts, fieldCounts } from "@/app/modules/constants";

export default function Compliance({ params }) {
  const router = useRouter();
  const { processing, setProcessing } = useProcessing();
  const [{ errors }] = useErrors(null);
  const {
    getStages,
    selectedCategory,
    setSelectedCategory,
    Stages,
    setStages,
    activeStage,
    setActiveStage,
    partner,
    categories,
  } = usePartners();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setRouteloading } = useApp();

  const [ApprovalStages, setApprovalStages] = useState(null);
  const [Approvals, setApproval] = useState(null);

  useEffect(() => {
    setProcessing(false);
    setRouteloading(false);
  }, []);

  useEffect(() => {
    fieldsCounts();
    // const _approvals = partnerApprovals(partner);
    // setApproval(_approvals);
    const _approvalStages = partner.approvalStages;
    setApprovalStages(_approvalStages);
    console.log({
      _approvalStages: _approvalStages,
      fieldCounts,
    });
  }, [partner.approvalStages]);

  useEffect(() => {
    let html = document.getElementsByTagName("html");
    if (openDrawer) html[0].style["overflow-y"] = "hidden";
    else html[0].style["overflow-y"] = "auto";
  }, [openDrawer]);

  useEffect(() => {
    if (partner && params.params?.length > 0) {
      filterFields(partner);
      filterComplianceRequirements(partner);
      filterApprovalFields(partner);

      const [_category] = params.params;
      const _selectedCategory = partner?.categories?.find(
        (c) => c.category_uuid === _category
      );
      const _filtered_selectedCategory = filterCategory(
        _selectedCategory,
        partner
      );
      setSelectedCategory(_filtered_selectedCategory);
      const _stages = getStages(_filtered_selectedCategory, categories);
      setStages(_stages);
    }
  }, [partner, params, selectedCategory]);

  const handleOpenDrawer = (stage) => {
    console.log({ stage });
    setActiveStage(stage);
    setOpenDrawer(true);
  };

  return (
    <div className="max-w-[1158px] mx-auto py-12 px-16">
      <div onClick={() => router.push("dashboard/")} className="mb-12">
        <span className="flex gap-4 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80">
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
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          Back
        </span>
      </div>
      {errors?.compliance && (
        <div className="my-6">
          <FormErrors error={errors.compliance} />
        </div>
      )}
      {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )}
      {!processing && selectedCategory && (
        <>
          <div className="grin grid-cols-1 space-y-3 sm:flex justify-between items-center space-x-3 mb-20">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center rounded-full w-[64px] h-[64px] bg-white/10 text-white text-[12px] mr-2">
                {selectedCategory && (
                  <Image
                    alt={selectedCategory.category_name}
                    src={selectedCategory?.icon}
                    width={29}
                    height={29}
                    priority
                  />
                )}
              </div>
              <div>
                <div className="font-bold text-[30px] text-white mb-1">
                  {selectedCategory.category_name}
                </div>
                <div className="flex items-center gap-2 text-[15px] text-[#999999]">
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>We are reviewing your application</span>
                </div>
              </div>
            </div>
          </div>
          <ComplianceCategories
            partner={partner}
            Stages={Stages}
            activeCategory={selectedCategory}
            onclick={handleOpenDrawer}
          />
          {activeStage && (
            <ComplianceDrawer
              activeStage={activeStage}
              category={selectedCategory}
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
            >
              {activeStage && openDrawer && (
                <ComplianceDetailPartners
                  activeStage={activeStage}
                  category={selectedCategory}
                  setOpenDrawer={setOpenDrawer}
                  openDrawer={openDrawer}
                />
              )}
            </ComplianceDrawer>
          )}
        </>
      )}
    </div>
  );
}
