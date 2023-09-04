"use client";
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import ComplianceDetail from "@/app/components/dashboard/ComplianceDetail";
import ComplianceCategories from "@/app/components/dashboard/compliance/ComplianceCategories";
import useProcessing from "@/hooks/useProcessing";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import useLogout from "@/hooks/useLogout";
import FormErrors from "@/app/components/FormErrors";
import RemoteEndpoints from "@/app/modules/endpoints";
import DropdownMenu from "@/app/components/dashboard/DropdownMenu";
import { useState, useEffect } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
import {
  getPartnerInitials,
  filterCategory,
  filterPartner,
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
  getDeptCategoryStages,
  getFinalApproval,
} from "@/app/modules/utilities";

import Image from "next/image";
import useApp from "@/hooks/useApp";
import useRoles from "@/hooks/useRoles";
import Link from "next/link";

export default function Compliance({ params }) {
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const {
    admin,
    categories,
    allCategories,
    token,
    getStages,
    activeCategory,
    setActiveCategory,
    partner,
    setPartner,
    Stages,
    setStages,
    activeStage,
    setActiveStage,
  } = useAdmins();

  const {LogoutAdmin} = useLogout();


  // console.log("useAdmins from admin compliance", useAdmins());

  const [category, setCategory] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setRouteloading } = useApp();
  const { isSuperadmin } = useRoles();

  //This is a hack
  let refreshed = 0;

  const getPartnerInfo = async (uuid) => {
    setProcessing(true);
    const response = await fetch(
      `${RemoteEndpoints.ADMIN_PARTNETINFO}/${uuid}`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
        headers: {
          token: token,
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    ).catch((e) => {
      setProcessing(false);
      return setError({
        compliance: e.message,
      });
    });
    if (!response){
      return setError({
        compliance: "This request has no response data available",
      });
    }

    
    console.log("refreshed", refreshed);

    //This is a hack
    if(refreshed == 0){

      refreshed = 1;
      await getPartnerInfo(uuid);
      return;
      
    }
    
    if (refreshed > 0 && response.status === 401 ) {

        LogoutAdmin();
        return;
      
    }


    const result = await response.json();
    setProcessing(false);
    if (result?.success) {
      const partnerInfo = result.data?.partner;
      filterPartner(partnerInfo, categories);
      setPartner(partnerInfo);
      if (partnerInfo?.categories?.length > 0) {
        const _category = filterCategory(
          partnerInfo?.categories[0],
          partnerInfo
        );
        setCategory(_category.category_uuid);
        setActiveCategory(_category);
      }
      return;
    }
    setProcessing(false);
    return setError({
      compliance:
        result?.data?.message ??
        "Something went wrong. Please check your connection and try again",
    });
  };

  useEffect(() => {
    setProcessing(false);
    setRouteloading(false);
  }, []);
  useEffect(() => {
    clearErrors();    
    if (params?.params?.length > 0) getPartnerInfo(params.params[0]);
  }, [params]);

  useEffect(() => {
    let html = document.getElementsByTagName("html");
    if (openDrawer) html[0].style["overflow-y"] = "hidden";
    else html[0].style["overflow-y"] = "auto";
  }, [openDrawer]);

  useEffect(() => {
    if (partner && category) {
      filterFields(partner);
      filterComplianceRequirements(partner);
      filterApprovalFields(partner);
      const _activeCategory = partner?.categories?.find(
        (c) => c.category_uuid === category
      );
      setActiveCategory(filterCategory(_activeCategory, partner));
      setCategory(_activeCategory.category_uuid);
      const _stages = getStages(_activeCategory, categories);
      setStages(_stages);
    }
  }, [partner, category]);

  useEffect(() => {
    if (partner) {
      const finalApproval = getFinalApproval(partner);
      // console.log({ finalApproval })
    }
  }, [partner]);

  const [DDCategories, setDDCategories] = useState([]);
  useEffect(() => {
    let _cuuids = [];
    filterPartner(partner, categories);
    if (allCategories) {
      const _deptCategories = getDeptCategoryStages(admin, isSuperadmin);
      if (partner?.approvalStages) {
        const dept = admin?.department_code;
        for (const cuuid in partner?.approvalStages) {
          for (const stage in partner?.approvalStages[cuuid]) {
            if (dept in partner?.approvalStages[cuuid][stage])
              if (!_cuuids.includes(cuuid)) _cuuids.push(cuuid);
          }
        }
      }
      const _ddcategories = partner?.categories.filter((cat) => {
        return _deptCategories.categories.includes(cat.category_code);
      });
      setDDCategories(_ddcategories ?? []);
    }
  }, [partner, allCategories, admin]);

  const handleOpenDrawer = (stage) => {
    setActiveStage(stage);
    setOpenDrawer(true);
  };
  return (
    <div className="max-w-[1158px] mx-auto py-12 px-16 min-h-screen">
      <Link href="/admin/dashboard/">
        <span className="inline-flex gap-4 grow-0 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80 mb-12">
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
          Applications
        </span>
      </Link>
      {errors?.compliance && (
        <div className="my-6">
          <FormErrors error={errors.compliance} />
        </div>
      )}
      {/* {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )}
      {!processing && partner && ( */}
        <>
          <div className="flex space-y-3 sm:flex justify-between items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center rounded-full w-[64px] h-[64px] bg-mtn text-white text-[12px] mr-2">
                <span className="text-[24px]">
                  {getPartnerInitials(partner?.company_name)}
                </span>
              </div>
              <div>
                <div className="font-bold text-[30px] text-white mb-1">
                  {partner?.company_name}
                </div>
                <div className="flex items-center gap-0 text-[16px] text-white/80">
                  {partner?.categories?.length > 0 && (
                    <Image
                      alt={`${partner?.categories[0].country}`}
                      src={`/assets/flags/${
                        partner?.categories[0].country?.toLowerCase() ?? "ng"
                      }.svg`}
                      className={"inline mr-2 h-4 rounded-sm h-auto"}
                      width={24}
                      height={15}
                      priority
                    />
                  )}
                  <span>{partner?.email}</span>
                </div>
              </div>
            </div>

            {DDCategories?.length > 0 && (
              <div className="py-3">
                <DropdownMenu
                  options={DDCategories.map((cat) => ({
                    key: cat.category_uuid,
                    value: cat.category_uuid,
                    label: allCategories[cat.category_uuid]?.category_name,
                  }))}
                  defaultvalue={{
                    value: partner?.categories[0]?.category_uuid,
                    label: partner?.categories[0]?.category_name,
                  }}
                  onselect={(option) => {
                    setCategory(option.value);
                  }}
                  align="right"
                  optionwidth={240}
                />
              </div>
            )}
          </div>
          <div className="flex gap-3 items-center text-[#999999] my-12">
            <div className="flex justify-center items-center w-[30px] h-[30px] text-[#FFCB03] rounded-full bg-white/10">
              {activeCategory?.icon && (
                <Image
                  src={activeCategory.icon}
                  alt=""
                  width={14}
                  height={14}
                />
              )}
            </div>
            <span className="font-mtn-extralight text-[18px] ">
              {" "}
              {activeCategory?.category_name}
            </span>
          </div>
          <ComplianceCategories
            partner={partner}
            Stages={Stages}
            activeCategory={activeCategory}
            onclick={handleOpenDrawer}
          />
          <ComplianceDrawer
            activeStage={activeStage}
            category={activeCategory}
            setOpenDrawer={setOpenDrawer}
            openDrawer={openDrawer}
          >
            {activeStage && openDrawer && (
              <ComplianceDetail
                activeStage={activeStage}
                category={activeCategory}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
              />
            )}
          </ComplianceDrawer>
        </>
      {/* )} */}
    </div>
  );
}
