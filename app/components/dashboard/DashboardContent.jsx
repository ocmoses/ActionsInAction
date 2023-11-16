"use client";
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer";
import CategoryCard from "@/app/components/dashboard/CategoryCard";
import CategoryDetail from "@/app/components/dashboard/CategoryDetail";
import PartnerCategories from "@/app/components/dashboard/PartnerCategories";
import PartnerAgreement from "@/app/components/dashboard/PartnerAgreement";
import OnboardingLayout from "./OnboardingLayout";
import Button from "@/app/components/form/Button";
import useUsers from "@/hooks/useUsers";
import RemoteEndpoints from "@/app/modules/endpoints";
import Axios from "@/app/modules/axios";
import Portal from "@/app/components/Portal";
import { useState, useEffect, useRef } from "react";
import {
  Util,
  AllowedCategories,
  filterPartner,
  filterCategory,
  getFinalApproval,
} from "@/app/modules/utilities";
import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import Image from "next/image";
import { scrollToTop } from "@/app/modules/utilities";
import CallToAction from "./partners/CallToAction";
import { user_statuses, questionnaire_pending } from "@/app/modules/constants";
import useQuestionnaire from "@/hooks/useQuestionnaire";
import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";

import PopUp, { BrdUpdatesSuccess } from "@/app/components/PopUps";
import BrdUpdates, {
  BrdRejectedAlert,
} from "@/app/components/dashboard/compliance/BrdUpdates";
import GracePeriodAlert, {
  GracePeriodRejectedAlert,
  GracePeriodExtensionForm,
  GracePeriodSuccess
} from "@/app/components/dashboard/compliance/GracePeriodComponent";

import { useStoreState } from "easy-peasy";
import axios from "axios";


export default function GetStarted({ type }) {
  const {
    session: { user },
  } = useUsers();

  console.log(user);
  const {
    partner,
    category,
    categories,
    updatePartner,
    setValidationRules,
    setCurrentCategory,
    nextStage,
  } = usePartners();
//////////////////////////////////////////////////////////////////
  const states = useStoreState((state) => state);
////////////////////////////////////////////////////////////////
  const [FinalApproval, setFinalApproval] = useState(false);
  useEffect(() => {
    setProcessing(false);
    const _finalApproval = getFinalApproval(partner);
    console.log("_finalApproval", { _finalApproval });
    setFinalApproval(_finalApproval);
  }, [partner]);

  const [isOpen, setIsOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [partnerCategories, setPartnerCategories] = useState([]);
  const [partnerActiveCategories, setPartnerActiveCategories] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [tmpCat, setTmpCat] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  // const [allowedCategories, setAllowedCategories] = useState(false)

  const { setForm, setProcessing, setActiveCategory } = useProcessing();

  const [{ errors, setError, success, setSuccess, clearErrors }] =
    useErrors(null);

  const [showModal, setShowModal] = useState(false);
  const showAgreement = (status) => {
    console.log({ showModal });
    setShowModal(status);
  };

  const userStatus = partner?.status;

  const { getQuestionnaireStatus } = useQuestionnaire();

  const [toFillQuestionnaire, setToFillQuestionnaire] = useState(false);

  const [questionnaireAlert, setQuestionnaireAlert] = useState(false);
  const [showQuestionare, setShowQuestionare] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(null);

  useEffect(() => {
    setProcessing(false);
    setCategoriesData(categories);
  }, [partner, categories, toFillQuestionnaire]);

  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  });

  useEffect(() => {
    setProcessing(false);
    setActiveCategory(tmpCat);
    const validation = setValidationRules(tmpCat);
    setValidation(validation);
  }, [tmpCat]);

  useEffect(() => {
    setProcessing(false);
    setForm(null);
    setShowProgress(false);
    setProcessing(false);
  }, []);

  useEffect(() => {
    let check = () => 
    getQuestionnaireStatus().then(response => {
      console.log("Questionnaire status response", response);
      console.log("response.status", response.status);
      console.log("response.error", response.error);
      if(response.status == 'rejected'){
        setQuestionnaireAlert(true);        
        setRejectionReason(response.rejectionReason);
      }else if(response.error && response.error == questionnaire_pending){
        setToFillQuestionnaire(true);
      }else if(response.message && response.message == questionnaire_pending){
        setToFillQuestionnaire(true);
      }else {
        setToFillQuestionnaire(false);        
      }
    }).catch(error => {console.log(error.response); setError({error: error.message})});

    check();
  }, []);

  //////////afoo code////////////////////////////////////////////////////////////////////////////
  const [rejectedTeam, setRejectedTeam] = useState([]);
  const [brdComplains, setBrdComplains] = useState(false);

  //////////end code////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setProcessing(false);
    setBrdComplains(true);
    const partnerCat = [];
    const partnerActiveCat = [];
    filterPartner(partner, categoriesData);
    if (!Util.isEmpty(partner) && categoriesData?.length > 0) {
      if (partner.categories?.length > 0) {
        partner.categories.map((_category) => {
          const category = filterCategory(_category, partner);
          setRejectedTeam(category?.teamStatus);
          partnerActiveCat.push(category.uuid);
          const mainCategory = categoriesData.find(
            (c) => c.uuid === category.category_uuid
          );

          partnerCat.push({
            ...category,
            category_name: mainCategory?.category_name,
            validation: mainCategory?.validation,
          });
        });
      }
    }
    const newCatArray = categoriesData?.filter(
      (category) =>
        !partnerActiveCat.includes(category.uuid) &&
        partner?.allowedCategories.includes(category.category_code)
    );
    setPartnerActiveCategories(newCatArray);
    setPartnerCategories(partnerCat);
  }, [partner, categoriesData, category]);

  const toggleProgress = () => {
    setShowProgress((oldState) => !oldState);
  };
  const MainBox = useRef();
  const CategoryBox = useRef();

  const continueRegistration = (uuid) => {
    clearErrors();
    const category = partner?.categories?.find((cat) => cat.uuid === uuid);

    if (category) {
      //  CHECK IF MASTER DATA EXISTS
      const { nextstage: NextStage } = nextStage(category, partner);
      setCurrentCategory(category, partner);
      setIsOnboarding(true);
      setIsOpen(false);
      return setForm(NextStage);
    }
  };
  const scrollpage = () => {
    document.getElementById("portals").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [isSaving, setIsSaving] = useState(false);
  const [contractStarted, setContractStarted] = useState(false);

  const finishApplication = async () => {
    if (isSaving) return;
    clearErrors();
    setIsSaving(true);
    try {
      const result = await Axios.post(
        RemoteEndpoints.START_CONTRACT,
        { partner_uuid: partner?.uuid },
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
          },
          timeout: process.TIMEOUT,
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        }
      ).catch((error) => {
        console.log(error);
        setIsSaving(false);
        return setError({dashboard: "Unable to reach the server. Please check your connection and retry"});
      });
      setIsSaving(false);
      if (result) {
        const { success, data } = result;
        if (success) {
          setContractStarted(true);
          updatePartner(data?.partner);
          setSuccess("Your application was submited successfully");
        } else {
          return setError({ dashboard: data.message });
        }
      } else {
        return setError({dashboard: "Cannot reach the server. Please check your connection"});
      }
    } catch (err) {
      console.log({ err });
      setIsSaving(false);
      return setError({dashboard:"Something went wrong. Please check your connection and try again"});
    }
  };

  //////////afoo code////////////////////////////////////////////////////////////////////////////
  const [popUp, setPopUp] = useState(false);
  const [submitBrdFrom, setSubmitBrdFrom] = useState(false);

  const openBrdPopUp = () => {
    setPopUp(true);
    setSubmitBrdFrom(false);
  };
  const closePopUp = () => {
    setPopUp(false);
    setBrdComplains(false);
  };
  const submitBrd = () => {
    setSubmitBrdFrom(true);
  };
  //////////end code////////////////////////////////////////////////////////////////////////////

  //////////afoo code for grace period////////////////////////////////////////////////////////////////////////////

  
  const [licenseValidityDaysLeft, setLicenseValidityDaysLeft] = useState(61);
  const [licenseValidityDays, setLicenseValidityDays] = useState(false);
  const [gracePeriodStatus, setGracePeriodStatus] = useState("");
  
  const [popUpGracePeriodForm, setPopUpGracePeriodForm] = useState(false);
  const [gracePeriodSubmit, setGracePeriodSubmit] = useState(false);


////////////licenseValidityRemainder function////////////////////
  const licenseValidityRemainder = async () => {
    try {
      const licenseValidityRemainderResponse = await axios.get(
        `${RemoteEndpoints.PARTNER_LICENSE_VALIDITY_REMAINDER}${partner?.uuid}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );

      if ("license_validity_days" in licenseValidityRemainderResponse.data.data) {
        const licenseValidityDaysLeft=licenseValidityRemainderResponse.data.data.license_validity_days;
        setLicenseValidityDaysLeft(licenseValidityDaysLeft);

        if (licenseValidityDaysLeft>0 && licenseValidityDaysLeft<60){
          setLicenseValidityDays(true);
        }else{
          setLicenseValidityDays(false);
        }
      }else{
        setLicenseValidityDays(false);
      } 
    } catch (error) {
      setLicenseValidityDays(false);
      return setError({dashboard:"Something went wrong. Please check your connection and try again"});
    }
  };
////////////end licenseValidityRemainder function////////////////////

////////////partnerLicenseGracePeriodStatus function////////////////////
const partnerLicenseGracePeriodStatus = async () => {
  try {
    const partnerLicenseGracePeriodStatusResponse = await axios.get(
      `${RemoteEndpoints.PARTNER_LICENSE_GRACE_PERIOD_STATUS}${partner?.uuid}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_APIKEY,
          Authorization: `Bearer ${states.users.token}`,
        },
      }
    );

    const response=partnerLicenseGracePeriodStatusResponse.data.data;
    if ("status" in response) {
    console.log("partnerLicenseGracePeriodStatusResponse", response.status)
      setGracePeriodStatus(response.status);
    }else{
      //console.log("partnerLicenseGracePeriodStatusResponse", 'none')
      setGracePeriodStatus("none");
    }
  } catch (error) {
    return setError({dashboard:"Something went wrong. Please check your connection and try again"});
  }
};
////////////end partnerLicenseGracePeriodStatus function////////////////////



  useEffect(() => {
    licenseValidityRemainder();
    partnerLicenseGracePeriodStatus();
  }, [partner]);

  const openGracePeriodForm = () => {
    setPopUpGracePeriodForm(true);
  };
  const closeGracePeriodForm = () => {
    setPopUpGracePeriodForm(false);
    setGracePeriodSubmit(false);
  };
  const gracePeriodSuccessOk = () => {
    setLicenseValidityDays(false);
    setPopUpGracePeriodForm(false);
    
  };


  //////////end code////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {isOnboarding && (
        <>
          <div className="fixed z-20 left-0 bottom-0 flex flex-col h-full w-screen bg-[#030303]">
            <OnboardingLayout
              isOnboarding={isOnboarding}
              setIsOnboarding={setIsOnboarding}
              setTmpCat={setTmpCat}
              scrollpage={scrollpage}
            />
          </div>
        </>
      )}
      {!isOnboarding && (
        <div id="getstarted" ref={MainBox} className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-10 w-full max-w-[837px] px-6 mx-auto">
            <div className="w-full pt-[72px]">
              {user?.first_name && (
                <h2 className="text-4xl mb-6 font-bold text-white text-center md:text-start">
                  Hello, {user.first_name}
                </h2>
              )}

              {partner?.onboarding_type === "new" && (
                <div>
                  {!partner?.categories?.length > 0 ? (
                    <>
                      <p className="mb-12 text-[#999999] max-w-[500px]">
                        Welcome to the MTN Partner Portal, {user.first_name}!
                        Explore advanced analytics, reporting, and dedicated
                        support to grow your business today.
                      </p>
                      <p className="text-[#999999] text-center md:text-start">
                        Choose a partner category that best suits your service
                      </p>
                    </>
                  ) : (
                    <div className="text-[#999999] text-center md:text-start">
                      {partner?.contract_status === "not_started" ? (
                        "Complete your setup to get started!"
                      ) : (
                        <>
                          {userStatus == user_statuses.APPROVED ? (
                            <CallToAction
                              style={{
                                border: "1px solid rgba(255,255,255,.1)",
                                marginBottom: "50px",
                              }}
                              message="Your contract is ready. Click here to continue"
                              description="Outline contract conditions and give contract warrantees."
                              onclick={() => {
                                location = "/dashboard/contracts";
                              }}
                              button="Continue"
                              color="text-gray-200"
                              desccolor="text-[#999999]"
                              bg="bg-white/10"
                              border="border-transparent"
                              icon={
                                <div className="relative inline-flex">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                    />
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute top-4 left-3"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                                    />
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="yellow"
                                    className="w-4 h-6 absolute top-8 right-2"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                              }
                            />
                          ) : FinalApproval.partner ? (
                            <CallToAction
                              message="Your contract is ready. Click here to sign"
                              description="Describe the event and give further instructions if needed, include a call to action"
                              onclick={() => showAgreement(true)}
                              label="Take action"
                              color="text-green-700"
                              desccolor="text-[#999999]"
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className=" w-[28px] h-[28px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              }
                            />
                          ) : (
                            <CallToAction
                              message="Your application is currently being reviewed"
                              description=""
                              label=""
                              color="text-[#FF9897]"
                              desccolor="text-[#999999]"
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className=" w-[28px] h-[28px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {questionnaireAlert && (
                <>
                  <div className="w-full p-4 px-6 rounded-lg border-1 border-white/10 bg-white/5 flex space-x-4 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-white text-lg">
                        Supplier Questionnaire
                      </p>
                      <p className="text-white/40 mb-4">
                        There is one or more issues flagged in your supplier
                        questionnaire
                      </p>

                      <span
                        onClick={() => setShowQuestionare(true)}
                        className="p-2 px-4 mb-2 border-1 border-white/40 text-white/80 rounded-full hover:bg-white/10 inline-block cursor-pointer text-sm"
                      >
                        Review
                      </span>
                    </div>
                  </div>
                  {showQuestionare && (
                    <QuestionnaireModal
                      hide={() => setShowQuestionare(false)}
                      action={() => setQuestionnaireAlert(false)}
                      rejectionReason={rejectionReason}
                    />
                  )}
                </>
              )}

              {/* //================this is the popup==============================================================================================================*/}

              {rejectedTeam?.rejected?.length > 0 && brdComplains && (
                <>
                  {popUp && (
                    <PopUp closePopUp={closePopUp}>
                      {!submitBrdFrom ? (
                        <BrdUpdates
                          closePopUp={closePopUp}
                          submitBrd={submitBrd}
                          loginPartnerID={partner.uuid}
                          token={user.token}
                        /> // If contactSubmit is true
                      ) : (
                        <BrdUpdatesSuccess closePopUp={closePopUp} /> // If contactSubmit is true
                      )}
                    </PopUp>
                  )}

                  <BrdRejectedAlert
                    openBrdPopUp={openBrdPopUp}
                    rejected={rejectedTeam?.rejected} //this is all regjected deligates
                  />
                </>
              )}

              {/*//==============================================================================================================================*/}

              {/* //================this is lisense grace period==============================================================================================================*/}
              {/* gracePeriodStatus must not = (corrected, not_approved)*/}
              {licenseValidityDays && (gracePeriodStatus=='none' || gracePeriodStatus=='approved' || gracePeriodStatus=='rejected') &&( 
                
                <>
                  {popUpGracePeriodForm && (
                    <PopUp closePopUp={closePopUp}>
                      {!gracePeriodSubmit ? (
                        <GracePeriodExtensionForm
                          closePopUp={closeGracePeriodForm}
                          setGracePeriodSubmit={setGracePeriodSubmit}
                        /> // If gracePeriodSubmit is false
                      ) : (
                        <GracePeriodSuccess gracePeriodSuccessOk={gracePeriodSuccessOk} /> // If gracePeriodSubmit is true
                      )}
                    </PopUp>
                  )}
                  <GracePeriodAlert
                    status={gracePeriodStatus}
                    openGracePeriodForm={openGracePeriodForm}
                    licenseValidityDaysLeft={licenseValidityDaysLeft} 
                  />
                </>
              )}

              {/*//==============================================================================================================================*/}

              {partner?.onboarding_type === "migrated" && (
                <>
                  {partner?.is_login === "no" ? (
                    <>
                      <p className="mb-12 text-[#999999] max-w-[500px]">
                        Welcome to the MTN Partner Portal, {user.first_name}!
                        Explore advanced analytics, reporting, and dedicated
                        support to grow your business today.
                      </p>
                      <p className="text-[#999999] text-center md:text-start">
                        Review your details to get started
                      </p>
                    </>
                  ) : (
                    <p className="text-[#999999] text-center md:text-start">
                      {partner?.contract_status === "not_started" ? (
                        "Complete your setup to get started!"
                      ) : (
                        <>
                          {FinalApproval.partner ? (
                            <CallToAction
                              message="Your contract is ready. Click here to sign"
                              description="Describe the event and give further instructions if needed, include a call to action"
                              onclick={() => showAgreement(true)}
                              label="Take action"
                              color="text-green-700"
                              desccolor="text-[#999999]"
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className=" w-[28px] h-[28px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              }
                            />
                          ) : (
                            <CallToAction
                              message="Your application is currently being reviewed"
                              description=""
                              label=""
                              color="text-[#FF9897]"
                              desccolor="text-[#999999]"
                              icon={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className=" w-[28px] h-[28px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              }
                            />
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              )}

              {userStatus != user_statuses.APPROVED && partnerCategories && (
                <PartnerCategories
                  partner={partner}
                  partnerCategories={partnerCategories}
                  type={type}
                  onclick={continueRegistration}
                  categories={categoriesData}
                  finalApproval={FinalApproval}
                />
              )}
              {success && (
                <div className="my-6">
                  <FormErrors success={success} align="center" />
                </div>
              )}

              {partner?.categories?.length > 0 &&
                !partner?.edittable &&
                partner?.contract_status === "not_started" && (
                  <div className="flex flex-col my-12 justify-center items-center">
                    {errors?.dashboard && (
                      <div className="my-6">
                        <FormErrors error={errors.dashboard} />
                      </div>
                    )}
                    {isSaving ? (
                      <TailSpinPreloader
                        width={40}
                        height={40}
                        fill="#efb703"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-start gap-3 w-full sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:w-auto">
                        {!contractStarted &&
                          partner?.contract_status === "not_started" &&
                          partnerCategories?.length > 0 &&
                          partnerActiveCategories?.length > 0 && (
                            <>
                              <Button
                                href="javascript:;"
                                onClick={(e) => scrollToTop("categoryselect")}
                                label="Add another category"
                                paddingclass="pl-4 pr-3 py-2 w-full animate-pulse hover:animate-none animate-pulse"
                                textsizecss="inline-flex text-[14px] whitespace-nowrap"
                                outline="yes"
                                icon="no"
                              />
                              <span className="text-white">OR</span>
                            </>
                          )}
                        <Button
                          onClick={finishApplication}
                          label="Finish Application"
                          paddingclass="pl-6 pr-3 py-2 w-full animate-pulse hover:animate-none animate-pulse"
                          textsizecss="inline-flex text-[14px] whitespace-nowrap"
                        />
                      </div>
                    )}
                  </div>
                )}

              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                partnerActiveCategories?.length > 0 && (
                  <div
                    id="categoryselect"
                    className="flex max-w-lg text-center text-[#999999] mt-16 mb-6 mx-auto"
                  >
                    Dear {user.first_name}, please note that you can choose
                    multiple service categories. However, you will be required
                    to complete a selected category to enable you move to the
                    next category
                  </div>
                )}

              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                partnerCategories?.length > 0 &&
                partnerActiveCategories?.length > 0 && (
                  <div
                    ref={CategoryBox}
                    onClick={toggleProgress}
                    className="mb-16 flex gap-3 items-center justify-center text-sm cursor-pointer"
                  >
                    {showProgress && (
                      <>
                        <span className="text-[#999999]">
                          Explore other categories
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#FFCB03]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </>
                    )}
                    {!showProgress && (
                      <>
                        <span className="text-[#999999]">
                          Show less categories
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#FFCB03]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                )}

              {!contractStarted &&
                partner?.contract_status === "not_started" &&
                !showProgress && (
                  <div className="grid lg:grid-cols-2 justify-center lg:justify-between gap-[24px] mb-16 w3-animate-opacity">
                    {partnerActiveCategories &&
                      partnerActiveCategories?.length > 0 &&
                      partnerActiveCategories.map((category) => (
                        <CategoryCard
                          key={category.uuid}
                          category={category}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          tmpCat={tmpCat}
                          setTmpCat={setTmpCat}
                          disabled={partner?.edittable}
                          pendingQuestionare={toFillQuestionnaire}
                        />
                      ))}
                  </div>
                )}
            </div>
            <div className="flex flex-col mt-12">
              <h3 className="text-lg text-center lg:text-start text-white font-bold mb-8">
                Learn how to use
              </h3>
              <div className="flex flex-col items-center lg:items-between ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-1.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Read the documentation
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Explore our guides, API references and code examples
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-2.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Discover the right Metrics
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Learn to monitor system performance by selecting
                        relevant metrics, collecting and analyzing data that
                        matters most to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0  items-center lg:items-start justify-start max-w-md">
                    <Image
                      src={"/assets/icons/graphics-3.png"}
                      height={147}
                      width={259}
                      className="w-full"
                      alt=""
                    />
                    <div className="flex flex-col p-[24px] bg-[#111111]  items-center lg:items-start justify-start max-w-md">
                      <h4 className="text-lg text-white mb-3 text-center lg:text-start">
                        Write Custom Codes
                      </h4>
                      <p className="text-sm text-[#999999] text-center lg:text-start">
                        Build custom code tailored to your unique needs,
                        integrating with existing systems and creating powerful
                        new functionality from scratch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CategorySideDrawer
              setTmpCat={setTmpCat}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              {tmpCat && isOpen && (
                <CategoryDetail
                  category={tmpCat}
                  setIsOnboarding={setIsOnboarding}
                  setIsOpen={setIsOpen}
                  validation={validation}
                />
              )}
            </CategorySideDrawer>
          </div>
        </div>
      )}
      {showModal && (
        <Portal>
          <PartnerAgreement showAgreement={showAgreement} partner={partner} />
        </Portal>
      )}
    </>
  );
}
