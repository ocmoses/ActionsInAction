"use client";
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import ComplianceDetailPartners from "@/app/components/dashboard/partners/ComplianceDetailPartners";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import { useState, useEffect } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
import {
  filterCategory,
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
  getStatuses,
  partnerApprovals,
  base64
} from "@/app/modules/utilities";
import Image from "next/image";
import useApp from "@/hooks/useApp";
import ComplianceCategories from "@/app/components/dashboard/partners/ComplianceCategories";
import { useRouter } from "next/navigation";
import useRoles from "@/hooks/useRoles";
import useUsers from "@/hooks/useUsers";
import {useStoreState} from 'easy-peasy';



export default function Compliance({ params }) {
  const users = useStoreState((state) => state.users);
  // console.log("usePartners:....", usePartners());
  const router = useRouter();  
  const {getAllPartnerRoles} = useRoles();
  const { processing, setProcessing } = useProcessing();  
  const [{ errors, setError, clearErrors }] = useErrors(null);
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
    getAllAdminPartners,
    getContractDynamicData
    
  } = usePartners();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setRouteloading } = useApp();
  const {role} = useUsers();
  
  // const [ApprovalStages, setApprovalStages] = useState(null)
  // const [Approvals, setApproval] = useState(null)


  const [gettingDynamicContent, setGettingDynamicContent] = useState(false);
  
  const [dynamicData, setDynamicData] = useState(null);

  let dynamic_content_response =  null;

    
  const get_dynamic_content = async () => {
    if (gettingDynamicContent) return;
    setGettingDynamicContent(true);
    dynamic_content_response = await getContractDynamicData();
    setGettingDynamicContent(false);
    console.log('dynamic_content_response', dynamic_content_response);
    if (dynamic_content_response.error) {
        setError({ error: dynamic_content_response.error })
    } else {
        // console.log('dynamic_content_response', dynamic_content_response);
        setDynamicData(dynamic_content_response.data);                
    }
  }

  useEffect(() => {
   setProcessing(false);
    
    setProcessing(false);
    setRouteloading(false);
        
  }, []);

  useEffect(() => {
   setProcessing(false);
  }, [partner.approvalStages, Stages]);

  useEffect(() => {
   setProcessing(false);
    let html = document.getElementsByTagName("html");
    if (openDrawer) html[0].style["overflow-y"] = "hidden";
    else html[0].style["overflow-y"] = "auto";
  }, [openDrawer]);

  useEffect(() => {
   setProcessing(false);
    
    if (partner && params.params?.length > 0) {
      filterFields(partner);
      filterComplianceRequirements(partner);
      filterApprovalFields(partner);

      const [_category] = params.params; //partner.uuid
      const _selectedCategory = partner?.categories?.find(
        (c) => c.category_uuid === _category
      );
      const _filtered_selectedCategory = filterCategory(
        _selectedCategory,
        partner
      );

      // console.log("_selectedCategory", _selectedCategory);
      // console.log("_filtered_selectedCategory", _filtered_selectedCategory);

      setSelectedCategory(_filtered_selectedCategory);
      const _stages = getStages(_filtered_selectedCategory, categories);

      console.log("_stages", _stages);

      setStages(_stages);
    }else{
      router.push(`/dashboard/compliance/${partner?.categories[0].category_uuid}`);
    }
    // console.log({ partner })


  }, [partner, params, selectedCategory]);

  
  const handleOpenDrawer = (stage) => {
    setActiveStage(stage);
    setOpenDrawer(true);
  };


  return (
    // max-w-[1158px]
    <div className="mx-auto py-12 px-16 flex-grow">
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

      {/* {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )} */}
      
      {selectedCategory && (
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
