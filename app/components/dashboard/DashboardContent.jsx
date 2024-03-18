"use client";
import CategorySideDrawer from "@/app/components/dashboard/CategorySideDrawer";
import CategoryCard from "@/app/components/dashboard/CategoryCard";
import CategoryDetail from "@/app/components/dashboard/CategoryDetail";
import PartnerCategories from "@/app/components/dashboard/PartnerCategories";
import PartnerAgreement from "@/app/components/dashboard/PartnerAgreement";
import ChooseAggregatorCard from "@/app/components/dashboard/ChooseAggregatorCard";
import ChooseAggregatorSuccessCard from "@/app/components/dashboard/ChooseAggregatorSuccessCard";
import OnboardingLayout from "./OnboardingLayout";
import Button from "@/app/components/form/Button";
import useUsers from "@/hooks/useUsers";
import RemoteEndpoints from "@/app/modules/endpoints";
import Axios from "@/app/modules/axios";
import Portal from "@/app/components/Portal";
import { useState, useEffect, useRef, useContext } from "react";
import {
  Util,
  filterPartner,
  filterCategory,
  getFinalApproval,
  scrollToTop,
} from "@/app/modules/utilities";
import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import Image from "next/image";
import CallToAction from "./partners/CallToAction";
import {
  user_statuses,
  questionnaire_pending,
  ip_pending,
  suspended_categories,
  role_menu_map,
} from "@/app/modules/constants";
import useQuestionnaire from "@/hooks/useQuestionnaire";
import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";
import ChangeOrderRejection from "@/app/components/dashboard/compliance/ChangeOrderRejection";
import IPRejection from "@/app/components/dashboard/compliance/IPRejection";
import ComplianceRejection from "@/app/components/dashboard/compliance/ComplianceRejection";
import OnboardingStatus from "@/app/components/dashboard/OnboardingStatus";
import ServiceLiveCard from "@/app/components/dashboard/ServiceLiveCard";
import IPApprovedCard from "@/app/components/dashboard/IPApprovedCard";
import IPDynamicField from "@/app/components/dashboard/compliance/IPDynamicField";
import PopUp, {
  BrdUpdatesSuccess,
  ChooseAggregator,
  ChooseAggregatorSuccess,
  ForAggregatorSuccess,
  ChooseAggregatorFailure,
} from "@/app/components/PopUps";
import BrdUpdates, {
  BrdRejectedAlert,
} from "@/app/components/dashboard/compliance/BrdUpdates";
import GracePeriodAlert, {
  GracePeriodExtensionForm,
  GracePeriodSuccess,
  LicenseRenewalForm,
  LicenseRenewalSuccess,
} from "@/app/components/dashboard/compliance/GracePeriodComponent";

import { useStoreState } from "easy-peasy";
import axios from "axios";
import IPCard from "@/app/components/dashboard/IPCard";

import { ServiceConfigurationReadyAlert } from "@/app/components/dashboard/ContractComponents";
import { PartnerMenu } from "@/app/modules/menu";

import {ContractContext} from "@/app/(protected)/(partner)/dashboard/contracts/ContractProvider";
                              
export default function DashboardContent({ type }) {
  const {
    session: { user },
  } = useUsers();

  console.log("useContext(ContractContext)", useContext(ContractContext));

  const {hasContractToSign} = useContext(ContractContext);
  console.log("HasContractToSign", hasContractToSign);

  const {
    partner,
    category,
    categories,
    updatePartner,
    setValidationRules,
    setCurrentCategory,
    nextStage,
    getIPStatus,
    getPartnerContractCurrentlyRunning,
    getVasPartnerRequest,
    getAggregators,
    changeAggregator,
  } = usePartners();
  const states = useStoreState((state) => state);
  const [finalApproval, setFinalApproval] = useState(false);
  useEffect(() => {
    setProcessing(false);
    const _finalApproval = getFinalApproval(partner);
    setFinalApproval(_finalApproval);
  }, [partner]);

  const [isOpen, setIsOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [partnerCategories, setPartnerCategories] = useState([]);
  const [partnerActiveCategories, setPartnerActiveCategories] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [tmpCat, setTmpCat] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [rechooseAggregator, setRechooseAggregator] = useState(true);

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
  const [iPAlert, setIPAlert] = useState(false);
  const [showQuestionare, setShowQuestionare] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(null);

  const [hasDashboard, setHasDashboard] = useState(false);

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

  let check = () => {
    getQuestionnaireStatus()
      .then((response) => {
        console.log("Questionnaire status response", response);
        console.log("response.status", response.status);
        console.log("response.error", response.error);
        if (response.status == "rejected") {
          setQuestionnaireAlert(true);
          setRejectionReason(response.rejectionReason);
        } else if (response.error && response.error == questionnaire_pending) {
          setToFillQuestionnaire(true);
        } else if (
          response.message &&
          response.message == questionnaire_pending
        ) {
          setToFillQuestionnaire(true);
        } else {
          setToFillQuestionnaire(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setError({ error: error.message });
      });

    getIPStatus()
      .then((response) => {
        console.log("IPStatus response", response);
        console.log("response.status", response.status);
        console.log("response.error", response.error);
        if (
          response?.message == ip_pending ||
          response?.error == ip_pending ||
          response?.message == undefined
        ) {
          setIPAlert(true);
        }
      })
      .catch((error) => {
        console.log("IP error: ", error.response);
        setError({ error: error.message });
      });
  };

  

  useEffect(() => {
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
      if (partner?.categories?.length > 0) {
        partner?.categories.map((_category) => {
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
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      ).catch((error) => {
        console.log(error);
        setIsSaving(false);
        return setError({
          dashboard:
            "Unable to reach the server. Please check your connection and retry",
        });
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
        return setError({
          dashboard: "Cannot reach the server. Please check your connection",
        });
      }
    } catch (err) {
      console.log({ err });
      setIsSaving(false);
      return setError({
        dashboard:
          "Something went wrong. Please check your connection and try again",
      });
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

  const [showGracePreriodAlert, setShowGracePreriodAlert] = useState(false);
  const [showLicenseRenewalAlert, setShowLicenseRenewalAlert] = useState(false);
  const [gracePeriod, setGracePeriod] = useState(null);
  const [licenseRenewal, setLicenseRenewal] = useState(null);
  const [popUpGracePeriodForm, setPopUpGracePeriodForm] = useState(false);
  const [gracePeriodSubmit, setGracePeriodSubmit] = useState(false);
  const [popUpLicenseRenewalForm, setPopUpLicenseRenewalForm] = useState(false);
  const [licenseRenewalSubmit, setLicenseRenewalSubmit] = useState(false);

  const partnerLicenseGracePeriod = async () => {
    setShowGracePreriodAlert(false);
    try {
      const partnerGracePeriodResponse = await axios.get(
        `${RemoteEndpoints.PARTNER_LICENSE_GRACE_PERIOD_STATUS}${partner?.uuid}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );
      console.log(
        "partnerGracePeriodResponse",
        partnerGracePeriodResponse.data.data
      );
      setGracePeriod(partnerGracePeriodResponse.data.data);
      setShowGracePreriodAlert(true);
    } catch (error) {
      console.log(
        "An error occur while trying to fetch license grace period status"
      );
      setShowGracePreriodAlert(false);
    }
  };
  ////////////end partnerLicenseGracePeriodStatus function////////////////////
  ////////////partnerLicenseRenewalStatus function////////////////////
  const partnerLicenseRenewal = async () => {
    setShowLicenseRenewalAlert(false);
    try {
      const partnerLicenseRenewalResponse = await axios.get(
        `${RemoteEndpoints.GET_PARTNER_LICENSE_RENEWAL_STATUS}${partner?.uuid}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );
      console.log(
        "partnerLicenseRenewalResponse",
        partnerLicenseRenewalResponse.data.data
      );
      setLicenseRenewal(partnerLicenseRenewalResponse.data.data);
      setShowLicenseRenewalAlert(true);
    } catch (error) {
      console.log(
        "An error occur while trying to fetch license renewal status"
      );
      setShowLicenseRenewalAlert(false);
    }
  };
  ////////////end partnerLicenseRenewalStatus function///////////////////

  const [displayServiceConfiguration, setDisplayServiceConfiguration] =
    useState(false);
  ////////////getPartnerContract function////////////////////
  const getPartnerContract = async () => {
    setDisplayServiceConfiguration(false);
    getPartnerContractCurrentlyRunning()
      .then((response) => {
        if ("contract_id" in response.result) {
          setDisplayServiceConfiguration(true);
        } else {
          setDisplayServiceConfiguration(false);
        }
      })
      .catch((error) => {
        console.log("getPartnerContractCurrentlyRunning error: ", error);
        setDisplayServiceConfiguration(false);
      });
  };
  ////////////end getPartnerContract function///////////////////

  useEffect(() => {
    partnerLicenseGracePeriod();
    partnerLicenseRenewal();
    getPartnerContract();
  }, [partner]);

  //////////end code////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("PARTNER DASHBOARD", partner);

    // Check if user, role_menu_map[user?.role], and role_menu_map[user?.role][0] exist before accessing their properties
    if (
      user &&
      role_menu_map[user?.role] &&
      role_menu_map[user?.role][0] === "Dashboard"
    ) {
      setHasDashboard(true);
    }

    const location =
      user && role_menu_map[user?.role] && role_menu_map[user?.role][0]
        ? PartnerMenu.find(
            (item) => item.label === role_menu_map[user?.role][0]
          )?.route
        : null;

    if (location !== "/dashboard" && location != null) {
      window.location = location;
    }
  }, [user]);

  const [showChooseAggregator, setShowChooseAggregator] = useState(false);
  const [showChooseAggregatorSuccess, setShowChooseAggregatorSuccess] =
    useState(false);
  const [showForAggregatorSuccess, setShowForAggregatorSuccess] =
    useState(false);
  const [selectedAggregator, setSelectedAggregator] = useState();
  const [vasData, setVasData] = useState({
    service_uuid: "",
    aggregator_uuid: "",
  });
  const [aggregators, setAggregators] = useState([]);
  const [aggregatorIndex, setAggregatorIndex] = useState();
  const [showPartnerCategories, setShowPartnerCategories] = useState(true);
  const [vasPartnerData, setVasPartnerData] = useState([]);
  const [showChooseAggregatorFailure, setShowChooseAggregatorFailure] =
    useState(false);
  const [failureMsg, setFailureMsg] = useState();

  const fetchVasPartnerRequest = () => {
    getVasPartnerRequest(partner?.uuid).then((res) => {
      if (res.result?.success && res.result?.data.length > 0) {
        setShowPartnerCategories(false);
        setVasPartnerData(res.result.data);
      }
    });
  };

  useEffect(() => {
    fetchVasPartnerRequest();
  }, [partner?.uuid, showChooseAggregatorSuccess]);

  useEffect(() => {
    getAggregators(partner?.uuid).then((res) => {
      setAggregators(res.result);
    });
  }, [partner?.uuid]);

  const handleAggregatorSelect = (index, companyName, uuid) => {
    setAggregatorIndex(index);
    handleVasData("aggregator_uuid", uuid);
    setSelectedAggregator(companyName);
  };

  const handleAggregatorSuccess = async () => {
    setProcessing(true);
    setShowChooseAggregator(false);
    if (aggregatorIndex == 0) {
      setShowForAggregatorSuccess(true);
      return;
    }
    await changeAggregator(vasData).then((res) => {
      if (res.result.success) {
        setShowChooseAggregatorSuccess(true);
        setRechooseAggregator(false);
        return;
      }
      if (!res.result.success) {
        setFailureMsg(res.result.message);
        setShowChooseAggregatorFailure(true);
      }
      setProcessing(false);
    });
    setProcessing(false);
  };

  const handleVasData = (field, value) => {
    setVasData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  // console.log("SHOW_PARTNER_CAT", showPartnerCategories);
  // console.log("CONTRACT_STARTED", !contractStarted); 
  console.log("PARTNER CONTRACT STATUS", partner?.contract_status);
    // !showProgress)

  return (
    hasDashboard && (
      <>
        {isOnboarding && (
          <div className="fixed z-20 left-0 bottom-0 flex flex-col h-full w-screen bg-[#030303]">
            <OnboardingLayout
              isOnboarding={isOnboarding}
              setIsOnboarding={setIsOnboarding}
              setTmpCat={setTmpCat}
              scrollpage={scrollpage}
            />
          </div>
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
                            {userStatus == user_statuses.APPROVED && hasContractToSign && (
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
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-12 h-12"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                      />
                                    </svg>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6 absolute top-4 left-3"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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
                                        fillRule="evenodd"
                                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                }
                              />
                            )}
                            {finalApproval.partner ? (
                              // <CallToAction
                              //   message="Your contract is ready. Click here to sign"
                              //   description="Describe the event and give further instructions if needed, include a call to action"
                              //   onclick={() => showAgreement(true)}
                              //   label="Take action"
                              //   color="text-green-700"
                              //   desccolor="text-[#999999]"
                              //   icon={
                              //     <svg
                              //       xmlns="http://www.w3.org/2000/svg"
                              //       fill="none"
                              //       viewBox="0 0 24 24"
                              //       strokeWidth={1.5}
                              //       stroke="currentColor"
                              //       className=" w-[28px] h-[28px]"
                              //     >
                              //       <path
                              //         strokeLinecap="round"
                              //         strokeLinejoin="round"
                              //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                              //       />
                              //     </svg>
                              //   }
                              // />
                              <></>
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

                <ServiceConfigurationReadyAlert />

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
                {iPAlert &&
                  //Need to negate the condition that shows the category files
                  !(
                    !contractStarted &&
                    partner?.contract_status === "not_started" &&
                    partnerActiveCategories?.length > 0
                  ) && (
                    // And you have not submitted the IP details

                    <IPCard />
                  )}
                {/* // elijah-dev changes */}
                {/* // elijah-dev changes */}
                <ChangeOrderRejection />
                <ComplianceRejection />
                <IPRejection />
                <OnboardingStatus />
                <ServiceLiveCard />
                <IPApprovedCard />                
                <IPDynamicField />
                {/* //================this is the popup==============================================================================================================*/}
                {rejectedTeam?.rejected?.length > 0 && brdComplains && (
                  <>
                    {popUp && (
                      <PopUp closePopUp={closePopUp}>
                        {!submitBrdFrom ? (
                          <BrdUpdates
                            closePopUp={closePopUp}
                            submitBrd={submitBrd}
                            loginPartnerID={partner?.uuid}
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
                {/* //================this is lisense grace period and License renewal==============================================================================================================*/}
                {showGracePreriodAlert && showLicenseRenewalAlert && (
                  <>
                    {popUpGracePeriodForm && (
                      <PopUp closePopUp={() => setPopUpGracePeriodForm(false)}>
                        {!gracePeriodSubmit ? (
                          <GracePeriodExtensionForm
                            closePopUp={() => setPopUpGracePeriodForm(false)}
                            submitGracePeriod={() => setGracePeriodSubmit(true)}
                          /> // If gracePeriodSubmit is false
                        ) : (
                          <GracePeriodSuccess
                            gracePeriodSuccessOk={() => {
                              setPopUpGracePeriodForm(false);
                              setShowGracePreriodAlert(false);
                            }}
                          /> // If gracePeriodSubmit is true
                        )}
                      </PopUp>
                    )}

                    {popUpLicenseRenewalForm && (
                      <PopUp
                        closePopUp={() => setPopUpLicenseRenewalForm(false)}
                      >
                        {!licenseRenewalSubmit ? (
                          <LicenseRenewalForm
                            closePopUp={() => setPopUpLicenseRenewalForm(false)}
                            submitLicenseRenewal={() =>
                              setLicenseRenewalSubmit(true)
                            }
                          />
                        ) : (
                          <LicenseRenewalSuccess
                            SuccessOk={() => {
                              setPopUpLicenseRenewalForm(false);
                              setShowLicenseRenewalAlert(false);
                            }}
                          />
                        )}
                      </PopUp>
                    )}

                    <GracePeriodAlert
                      gracePeriod={gracePeriod}
                      licenseRenewal={licenseRenewal}
                      openGracePeriodForm={() => setPopUpGracePeriodForm(true)}
                      popUpLicenseRenewalForm={() =>
                        setPopUpLicenseRenewalForm(true)
                      }
                      closeAlert={() => setShowLicenseRenewalAlert(false)}
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
                            {finalApproval.partner ? (
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
                    finalApproval={finalApproval}
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
                {showPartnerCategories &&
                  !contractStarted &&
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
                            disabled={
                              partner?.edittable ||
                              suspended_categories.includes(
                                category.category_name
                              )
                            }
                            pendingQuestionare={toFillQuestionnaire}
                          />
                        ))}
                    </div>
                  )}
              </div>
              {rechooseAggregator &&
                vasPartnerData.length > 0 &&
                vasPartnerData.map((item) =>
                  item.status !== "declined" ? null : (
                    <ChooseAggregatorCard
                      key={item.uuid}
                      aggregator={item.aggregator}
                      action={() => {
                        handleVasData("service_uuid", item.service_uuid);
                        setShowChooseAggregator(true);
                      }}
                      dismissAction={() => setRechooseAggregator(false)}
                    />
                  )
                )}
              {vasPartnerData.length > 0 &&
                vasPartnerData.map((item) =>
                  item.status !== "in-progress" ? null : (
                    <ChooseAggregatorSuccessCard
                      key={item.uuid}
                      aggregator={item.aggregator}
                    />
                  )
                )}
              {vasPartnerData.length > 0 &&
                vasPartnerData.map((item) =>
                  item.status !== "in-progress" ? null : (
                    <ChooseAggregatorSuccessCard
                      key={item.uuid}
                      aggregator={item.aggregator}
                    />
                  )
                )}
              {showChooseAggregator && (
                <PopUp closePopUp={() => {}}>
                  <ChooseAggregator
                    cancel={() => setShowChooseAggregator(false)}
                    action={handleAggregatorSuccess}
                    aggregators={aggregators}
                    onAggregatorSelect={handleAggregatorSelect}
                  />
                </PopUp>
              )}
              {showChooseAggregatorSuccess && (
                <PopUp closePopUp={() => {}}>
                  <ChooseAggregatorSuccess
                    action={() => {
                      setShowChooseAggregatorSuccess(false);
                      fetchVasPartnerRequest();
                    }}
                    selectedAggregator={selectedAggregator}
                  />
                </PopUp>
              )}
              {showForAggregatorSuccess && (
                <PopUp closePopUp={() => {}}>
                  <ForAggregatorSuccess
                    action={() => setShowForAggregatorSuccess(false)}
                    category={category}
                  />
                </PopUp>
              )}
              {failureMsg && showChooseAggregatorFailure && (
                <PopUp closePopUp={() => {}}>
                  <ChooseAggregatorFailure
                    action={() => setShowChooseAggregatorFailure(false)}
                    msg={failureMsg}
                  />
                </PopUp>
              )}
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
                          integrating with existing systems and creating
                          powerful new functionality from scratch.
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
    )
  );
}