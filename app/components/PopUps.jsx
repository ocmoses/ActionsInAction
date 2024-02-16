"use client";
import Image from "next/image";
import { NavLinksMobile } from "./NavLinks";
import TextInput from "@/app/components/form/TextInput";
import { useState, useEffect } from "react";
import { NewSuccess } from "@/app/components/toasts/Success";

export default function PopUp({ closePopUp, children }) {
  return (
    <div
      id="modal_flyout"
      className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
      onClick={(e) => {
        e.target.id == "modal_flyout" && closePopUp();
      }}
    >
      <div
        id="actualModal"
        className="border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[550px]"
      >
        <div className="py-8 px-8">{children}</div>
      </div>
    </div>
  );
}

export const ContactUsSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
        We encourage you to sign up and explore the app while we get back to
        you. Setting up your partner portal account is free, no payment
        required.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const PartnerContactUsSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
        We encourage you to check out our frequently asked questions to find
        answers to common issues.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const MobileMenu = ({ closeMobileMenu }) => {
  return (
    <div
      id="mobile_menu_flyout"
      className="w-screen h-screen flex fixed z-50 top-0 left-0  bg-black/80 animate-[slide-left_1s_ease-in-out]"
      onClick={(e) => {
        e.target.id == "mobile_menu_flyout" && closeMobileMenu();
      }}
    >
      <div className="h-screen fixed  bg-[#000] inline-flex flex-col w-[250px] right-[0px]">
        <div className="py-5 px-5">
          <div
            onClick={closeMobileMenu}
            className=" bg-white/10 hover:bg-white/20 rounded-[5px] p-1 cursor-pointer transition-transform ease-in-out duration-500 float-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.3 5.71001C18.2075 5.61731 18.0976 5.54376 17.9766 5.49358C17.8557 5.4434 17.726 5.41757 17.595 5.41757C17.464 5.41757 17.3344 5.4434 17.2134 5.49358C17.0924 5.54376 16.9825 5.61731 16.89 5.71001L12 10.59L7.11001 5.70001C7.01743 5.60743 6.90752 5.53399 6.78655 5.48388C6.66559 5.43378 6.53594 5.40799 6.40501 5.40799C6.27408 5.40799 6.14443 5.43378 6.02347 5.48388C5.9025 5.53399 5.79259 5.60743 5.70001 5.70001C5.60743 5.79259 5.53399 5.9025 5.48388 6.02347C5.43378 6.14443 5.40799 6.27408 5.40799 6.40501C5.40799 6.53594 5.43378 6.66559 5.48388 6.78655C5.53399 6.90752 5.60743 7.01743 5.70001 7.11001L10.59 12L5.70001 16.89C5.60743 16.9826 5.53399 17.0925 5.48388 17.2135C5.43378 17.3344 5.40799 17.4641 5.40799 17.595C5.40799 17.7259 5.43378 17.8556 5.48388 17.9766C5.53399 18.0975 5.60743 18.2074 5.70001 18.3C5.79259 18.3926 5.9025 18.466 6.02347 18.5161C6.14443 18.5662 6.27408 18.592 6.40501 18.592C6.53594 18.592 6.66559 18.5662 6.78655 18.5161C6.90752 18.466 7.01743 18.3926 7.11001 18.3L12 13.41L16.89 18.3C16.9826 18.3926 17.0925 18.466 17.2135 18.5161C17.3344 18.5662 17.4641 18.592 17.595 18.592C17.7259 18.592 17.8556 18.5662 17.9766 18.5161C18.0975 18.466 18.2074 18.3926 18.3 18.3C18.3926 18.2074 18.466 18.0975 18.5161 17.9766C18.5662 17.8556 18.592 17.7259 18.592 17.595C18.592 17.4641 18.5662 17.3344 18.5161 17.2135C18.466 17.0925 18.3926 16.9826 18.3 16.89L13.41 12L18.3 7.11001C18.68 6.73001 18.68 6.09001 18.3 5.71001Z"
                fill="white"
              />
            </svg>
          </div>
          <br />
          <ul>
            <NavLinksMobile />
          </ul>
        </div>
      </div>
    </div>
  );
};

export const BrdUpdatesSuccess = ({ closePopUp }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks, we’ll be in touch shortly
      </h2>
      <p className=" text-gray-400">
        We encourage you to sign up and explore the app while we get back to
        you. Setting up your partner portal account is free, no payment
        required.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const ChooseAggregatorSuccess = ({ action, selectedAggregator }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks for your submission
      </h2>
      <p className=" text-mtn-500 my-5">What’s next?</p>
      <p className=" text-gray-400">
        The aggregator ({selectedAggregator}) will be notified to complete your
        onboarding.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={action}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const ChooseAggregatorFailure = ({ action, msg }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/error.svg"
        width={76.71}
        height={38.32}
        alt="logo"
        className=" ext-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">Sorry</h2>
      <p className="text-red-500">{msg}</p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className="text-black bg-mtn hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={action}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const ForAggregatorSuccess = ({ action }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText("VASDigitalProposals@mtn.com")
      .then(() => {
        setCopySuccess(true);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying email: ", error);
      });
  };

  useEffect(() => {
    if (copySuccess) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [copySuccess]);
  return (
    <div className="flex flex-col justify-center items-center my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/spark.png"
        width={40}
        height={40}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        For Aggregators
      </h2>
      <p className=" text-gray-400 m-[auto]">
        Interested in becoming an MTN aggregator? Please contact
        VASDigitalProposals@mtn.com
      </p>
      <span
        className=" text-mtn-500 my-5 cursor-pointer"
        onClick={handleCopyEmail}
      >
        <div className="flex flex-row space-x-2">
          <Image src="/assets/icons/copy.svg" alt="" width={15} height={15} />
          {"   "}
          <div>Copy email</div>
        </div>
      </span>
      {showToast && <NewSuccess message={"Email copied!"} alert={true} />}
      {/* {showToast && (
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center">
          Email copied!
        </div>
      )} */}
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={action}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const CRBTSuccess = ({ action, category }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText("VASHUB.NG@mtn.com")
      .then(() => {
        setCopySuccess(true);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying email: ", error);
      });
  };

  useEffect(() => {
    if (copySuccess) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [copySuccess]);
  return (
    <div className=" flex flex-col justify-center items-center my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <div className="flex justify-center items-center w-[60px] h-[60px] text-[#FFCB03] rounded-full bg-white/20">
        {category?.icon ? (
          <Image src={category.icon} alt="" width={40} height={40} />
        ) : (
          <></>
        )}
      </div>
      <h2 className="text-white font-mtn-bold text-2xl my-4">For CRBT VAS</h2>

      <p className=" text-gray-400 m-[auto]">
        Interested in becoming a CRBT VAS partner? Please contact
        VASHUB.NG@mtn.com
      </p>
      <span
        className=" text-mtn-500 my-5 cursor-pointer"
        onClick={handleCopyEmail}
      >
        <div className="flex flex-row space-x-2">
          <Image src="/assets/icons/copy.svg" alt="" width={15} height={15} />
          {"   "}
          <div>Copy email</div>
        </div>
      </span>
      {showToast && <NewSuccess message={"Email copied!"} alert={true} />}
      {/* {showToast && (
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-center">
          Email copied!
        </div>
      )} */}
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={action}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const ServiceNamePop = ({ action, cancel, onTextChange }) => {
  const [serviceName, setServiceName] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setServiceName(value);
    onTextChange(value);
  };

  const isButtonDisabled = serviceName.trim() === "";

  return (
    <div className=" flex flex-col justify-center items-center my-4 text-center animate-[slide-left_1s_ease-in-out]">
      <div className="flex flex-none justify-between items-end w-full pl-4 pr-2 pt-6 mb-4">
        <div></div>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white/10">
          <div
            onClick={cancel}
            className="text-[#999999] cursor-pointer hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        What’s your service name?
      </h2>
      <div className="w-full">
        <TextInput
          id="servicename"
          label="Service name"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex py-8 px-2 space-x-4 justify-end">
        <button
          className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className={`text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed bg-white/20" : ""
          }`}
          onClick={action}
          disabled={isButtonDisabled}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const AggregatorCard = ({ title, subtitle, checked, onChange }) => {
  return (
    <div className="flex flex-row space-x-4 w-full rounded-lg p-4 mb-4 bg-white/10">
      <div className="flex justify-center items-center w-[45px] h-[40px] rounded-full bg-white/10">
        <Image
          priority
          src="/assets/icons/spark.png"
          width={20}
          height={20}
          alt="spark icon"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div>
            <span className="text-white text-[16px]">{title}</span>
          </div>
          <p className="text-[#999999] text-[12px]">{subtitle}</p>
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="rounded h-5 w-5 accent-yellow-500"
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, checked, onChange }) => {
  return (
    <div className="flex flex-row space-x-4 w-full rounded-lg p-4 mb-4 bg-white/10">
      <div className="flex justify-center items-center w-[45px] h-[40px] rounded-[50%] bg-white/10">
        {title[0].toUpperCase()}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div>
            <span className="text-white text-[16px]">{title}</span>
          </div>
          <p className="text-[#999999] text-[12px]">{subtitle}</p>
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="rounded h-5 w-5 accent-yellow-500"
        />
      </div>
    </div>
  );
};

export const ChooseAggregator = ({
  action,
  cancel,
  aggregators,
  onAggregatorSelect,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAggregators, setFilteredAggregators] = useState([]);

  useEffect(() => {
    setFilteredAggregators(aggregators);
  }, [aggregators]);

  const handleCardSelect = (companyName, uuid, index) => {
    setSelectedCard(index);
    onAggregatorSelect(index, companyName, uuid);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = aggregators.filter(
      (aggregator) =>
        aggregator.company_name.toLowerCase().includes(query) ||
        aggregator.email.toLowerCase().includes(query)
    );
    setFilteredAggregators(filtered);
  };

  const isButtonDisabled = selectedCard === null;

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-col justify-center items-start text-start animate-[slide-left_1s_ease-in-out]">
      <div className="flex flex-none justify-between items-end w-full">
        <div></div>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white/10">
          <div
            onClick={cancel}
            className="text-[#999999] cursor-pointer hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <h4 className="text-white font-mtn-bold text-2xl">
        Choose an aggregator
      </h4>

      <div className="flex flex-row space-x-1">
        <p className="text-[12px] text-white">
          We require VAS partners to register with existing MTN aggregators.
        </p>
        <p className="text-[12px] text-mtn">
          <a href="mailto:VASDigitalProposals@mtn.com">Learn more.</a>
        </p>
      </div>
      <div className="w-full mt-4">
        <TextInput
          id="choosenAggregator"
          label="Search partners"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="w-full border-b">
        <AggregatorCard
          title="I'm an aggregator"
          subtitle="I’m an existing MTN aggregator"
          checked={selectedCard === 0}
          onChange={() => handleCardSelect("I'm an aggregator", "", 0)}
        />
      </div>
      <div
        className="w-full mt-6"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {filteredAggregators?.length > 0 ? (
          filteredAggregators.map((aggregator, index) => (
            <Card
              key={aggregator.uuid}
              title={aggregator.company_name}
              subtitle={aggregator.email}
              checked={selectedCard === index + 1}
              onChange={() =>
                handleCardSelect(
                  aggregator.company_name,
                  aggregator.uuid,
                  index + 1
                )
              }
            />
          ))
        ) : (
          <p>No matching aggregators found.</p>
        )}
      </div>
      <div className="flex flex-row py-4 px-2 justify-between w-full items-center">
        <div></div>
        <div className="space-x-4">
          <button
            className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className={`text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed bg-white/20"
                : ""
            }`}
            onClick={action}
            disabled={isButtonDisabled}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export const SuccessCard = ({ action, msg }) => {
  return (
    <div className="my-10 text-center animate-[slide-left_1s_ease-in-out]">
      <Image
        priority
        src="/assets/icons/check.svg"
        width={76.71}
        height={38.32}
        alt="MTN Nigeria Logo"
        className=" text-white min-w-[76px] m-auto hover:text-mtn-300 hover:scale-[110%] h-auto transition-transform ease-in-out duration-500"
      />
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Thanks for your submission
      </h2>
      <p className=" text-mtn-500 my-5">What’s next?</p>
      <p className=" text-gray-400">{msg}</p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={action}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const OtherServicesPopUps = ({ closeServicePopUp, title, children }) => {
  return (
    <div
      id="modal_flyout"
      className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
      onClick={(e) => {
        e.target.id == "modal_flyout" && closeServicePopUp();
      }}
    >
      <div
        id="actualModal"
        className="w-[80%] h-[90%] border-1 border-gray-800 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col justify-between"
      >
        <div className="h-[50px] bg-black px-[10px] py-[10px] flex flex-row justify-between leading-[30px] text-white rounded-t-xl">
          <div>{title}</div>
          <button
            className="h-[30px] w-[30px] rounded-full bg-white/10  hover:bg-white/20"
            title="Close"
            onClick={() => closeServicePopUp()}
          >
            X
          </button>
        </div>
        <div className="h-[calc(100%_-_50px)] w-[100%] bg-white flex rounded-b-xl">
          <div className="p-[5px] w-[100%] h-[100%] flex">{children}</div>
        </div>
      </div>
    </div>
  );
};
