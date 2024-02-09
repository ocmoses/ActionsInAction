import Image from "next/image";
import useErrors from "@/hooks/useErrors";
import { useState } from "react";
import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";
import VASDrawer from "@/app/components/dashboard/VASDrawer";
import PopUp, {
  CRBTSuccess,
  ServiceNamePop,
  ChooseAggregator,
  ChooseAggregatorSuccess,
  ForAggregatorSuccess,
} from "@/app/components/PopUps";

export default function CategoryCard({
  category,
  setIsOpen,
  setTmpCat,
  disabled,
  pendingQuestionare = true,
}) {
  console.log("Card Category", category);
  console.log("To Fill Questionaire", pendingQuestionare);

  const [showQuestionare, setShowQuestionare] = useState(false);
  const [showCRBTSuccess, setCRBTSuccess] = useState(false);
  const [showServiceNamePop, setServiceNamePop] = useState(false);
  const [showChooseAggregator, setChooseAggregator] = useState(false);
  const [showChooseAggregatorSuccess, setChooseAggregatorSuccess] =
    useState(false);
  const [showForAggregatorSuccess, setForAggregatorSuccess] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [{ errors, setError, removeError, clearErrors }] = useErrors();
  const [vasData, SetVasData] = useState({
    vas_partner_uuid: "",
    vas_category_uuid: "",
    vas_type_uuid: "",
    service_name: "",
    aggregator_uuid: "",
  });

  const handleVasType = (field, value) => {
    setVasData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
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
        category={category}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
      />

      {showCRBTSuccess && (
        <PopUp closePopUp={() => {}}>
          <CRBTSuccess SuccessOk={() => {}} category={category} />
        </PopUp>
      )}

      {showServiceNamePop && (
        <PopUp closePopUp={() => {}}>
          <ServiceNamePop
            close={() => {
              setServiceNamePop(false);
            }}
          />
        </PopUp>
      )}

      {showChooseAggregator && (
        <PopUp closePopUp={() => {}}>
          <ChooseAggregator
            close={() => {
              setChooseAggregator(false);
            }}
          />
        </PopUp>
      )}

      {showChooseAggregatorSuccess && (
        <PopUp closePopUp={() => {}}>
          <ChooseAggregatorSuccess
            close={() => {
              setChooseAggregatorSuccess(false);
            }}
          />
        </PopUp>
      )}

      {showForAggregatorSuccess && (
        <PopUp closePopUp={() => {}}>
          <ForAggregatorSuccess
            close={() => {
              setForAggregatorSuccess(false);
            }}
          />
        </PopUp>
      )}
    </>
  );
}
