"use client";

import Image from "next/image";
import useErrors from "@/hooks/useErrors";
import { useState, useEffect } from "react";
import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";
import VASDrawer from "@/app/components/dashboard/VASDrawer";
import useProcessing from "@/hooks/useProcessing";
import PopUp, {
  CRBTSuccess,
  ServiceNamePop,
  ChooseAggregator,
  ChooseAggregatorSuccess,
  ForAggregatorSuccess,
  ChooseAggregatorFailure,
} from "@/app/components/PopUps";
import usePartners from "@/hooks/usePartners";

export default function CategoryCard({
  category,
  setIsOpen,
  setTmpCat,
  disabled,
  pendingQuestionare = true,
}) {
  const { partner, getAggregators, submitVasPartner } = usePartners();
  const { processing, setProcessing } = useProcessing();
  const [showQuestionare, setShowQuestionare] = useState(false);
  const [showCRBTSuccess, setShowCRBTSuccess] = useState(false);
  const [showServiceNamePop, setShowServiceNamePop] = useState(false);
  const [showChooseAggregator, setShowChooseAggregator] = useState(false);
  const [showChooseAggregatorSuccess, setShowChooseAggregatorSuccess] =
    useState(false);
  const [showForAggregatorSuccess, setShowForAggregatorSuccess] =
    useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [{ errors, setError, removeError, clearErrors }] = useErrors();
  const [vasData, setVasData] = useState({
    vas_partner_uuid: partner.uuid,
    vas_category_uuid: category.uuid,
    vas_type_uuid: "",
    service_name: "",
    aggregator_uuid: "",
  });
  const [aggregators, setAggregators] = useState([]);
  const [selectedAggregator, setSelectedAggregator] = useState();
  const [aggregatorIndex, setAggregatorIndex] = useState();
  const [vasType, setVasType] = useState();
  const [showChooseAggregatorFailure, setShowChooseAggregatorFailure] =
    useState(false);
  const [failureMsg, setFailureMsg] = useState();

  useEffect(() => {
    getAggregators(partner.uuid).then((res) => {
      setAggregators(res.result);
    });
  }, [partner.uuid]);

  const handleVasTypeSelect = (type, uuid) => {
    setVasType(type);
    handleVasData("vas_type_uuid", uuid);
  };

  const handleServiceNameChange = (value) => {
    handleVasData("service_name", value);
  };

  const handleAggregatorSelect = (index, companyName, uuid) => {
    setAggregatorIndex(index);
    handleVasData("aggregator_uuid", uuid);
    setSelectedAggregator(companyName);
  };

  const handleService = () => {
    setOpenDrawer(false);
    if (vasType == "CRBT") {
      setShowCRBTSuccess(true);
      return;
    }
    setShowServiceNamePop(true);
  };

  const handleChoose = () => {
    setShowServiceNamePop(false);
    setShowChooseAggregator(true);
  };

  const handleAggregatorSuccess = async () => {
    setProcessing(true);
    setShowChooseAggregator(false);
    if (aggregatorIndex == 0) {
      setShowForAggregatorSuccess(true);
      return;
    }
    await submitVasPartner(vasData).then((res) => {
      if (res.result.success) {
        setShowChooseAggregatorSuccess(true);
      } else {
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

  const cancel = () => {
    setOpenDrawer(false);
    setShowServiceNamePop(false);
    setShowChooseAggregator(false);
    setShowChooseAggregatorSuccess(false);
    setShowCRBTSuccess(false);
    setShowForAggregatorSuccess(false);
  };

  const selectCategory = (category) => {
    clearErrors();
    setTmpCat(category);
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={() => {
          if (disabled) {
            return;
          }
          if (category.category_code == "VAS") {
            setOpenDrawer(true);
            return;
          }
          if (pendingQuestionare) {
            setShowQuestionare(true);
          } else {
            selectCategory(category);
          }
        }}
        className={`flex gap-6 justify-center md:justify-start w-full max-w-[406.5px] min-h-[140px] px-6 py-4 ${
          disabled
            ? "cursor-not-allowed bg-white/10 text-white/70"
            : "cursor-pointer text-white bg-[#111111] hover:bg-white/10 hover:shadow-2xl "
        } rounded-lg`}
        title={`${disabled ? "Coming Soon" : "Click to select"}`}
      >
        <div>
          <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
            {category.icon && (
              <Image src={category.icon} alt="" width={24} height={24} />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-3 px-2 py-3">
          <p className="font-bold my-0">{category.category_name}</p>
          <p className="text-[#999999] my-0 text-sm">
            {category.short_description}
          </p>
        </div>
      </div>

      {showQuestionare && (
        <QuestionnaireModal
          hide={() => setShowQuestionare(false)}
          action={() => selectCategory(category)}
        />
      )}

      <VASDrawer
        action={handleService}
        category={category}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
        onTypeSelect={handleVasTypeSelect}
      />

      {showServiceNamePop && (
        <PopUp closePopUp={() => {}}>
          <ServiceNamePop
            cancel={cancel}
            action={handleChoose}
            onTextChange={handleServiceNameChange}
          />
        </PopUp>
      )}

      {showChooseAggregator && (
        <PopUp closePopUp={() => {}}>
          <ChooseAggregator
            cancel={cancel}
            action={handleAggregatorSuccess}
            aggregators={aggregators}
            onAggregatorSelect={handleAggregatorSelect}
          />
        </PopUp>
      )}

      {showCRBTSuccess && (
        <PopUp closePopUp={() => {}}>
          <CRBTSuccess
            action={() => setShowCRBTSuccess(false)}
            category={category}
          />
        </PopUp>
      )}

      {showChooseAggregatorSuccess && (
        <PopUp closePopUp={() => {}}>
          <ChooseAggregatorSuccess
            action={() => setShowChooseAggregatorSuccess(false)}
            selectedAggregator={selectedAggregator}
          />
        </PopUp>
      )}

      {showChooseAggregatorFailure && (
        <PopUp closePopUp={() => {}}>
          <ChooseAggregatorFailure
            action={() => setShowChooseAggregatorFailure(false)}
            msg={failureMsg}
          />
        </PopUp>
      )}

      {showForAggregatorSuccess && (
        <PopUp closePopUp={() => {}}>
          <ForAggregatorSuccess
            action={() => setShowForAggregatorSuccess(false)}
          />
        </PopUp>
      )}
    </>
  );
}
