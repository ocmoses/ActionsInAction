import { ContractContext } from "./ContractProvider";
import { useState, useContext, useEffect } from "react";
import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";
import { contract_statuses, user_statuses } from "@/app/modules/constants";
import moment from "moment";

export default function ContractStatus({ dynamicData }) {
  const {
    contractStatus,
    userStatus,
    vasPartnerStatus,
    selectedAllRequiredSignatories,
    setAgreementModal,
    allHaveSigned,
    hasSigned,
    downloadSignedContract,
    setSelectServiceModal,
    setShowContractCategoryModal,
    getContractBeingSigned,
    annexuresLink,
    setAnnexuresLink,
    isASignatory,
  } = useContext(ContractContext);

  const [contractId, setContractId] = useState(null);

  const { user } = useUsers();
  const { partner } = usePartners();

  useEffect(() => {
    console.log("CONTRACT BEING SIGNED NOW");

    getContractBeingSigned()
      .then((resp) => {
        setContractId(resp.contract.contract_id);
        setAnnexuresLink(
          `/dashboard/contracts/annexures/${resp.contract.contract_id}`
        );
      })
      .catch((error) => console.log(error.response));
  }, []);

  console.log("contractIdxx", contractId);

  console.log("SelectedAllRequiredSignatories", selectedAllRequiredSignatories);

  console.log("contractStatus==", contractStatus);

  console.log("isASignatory==", isASignatory);

  if (
    contractStatus == contract_statuses.EXPIRED ||
    contractStatus == contract_statuses.EXPIRING
  ) {
    if (
      !contractId &&
      user.role == "superAdmin" &&
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED)
    ) {
      if (selectedAllRequiredSignatories == true && !isASignatory) {
        return <div></div>;
      } else {
        return <Renew />;
      }
    } else if (
      contractId &&
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED) &&
      selectedAllRequiredSignatories && !hasSigned
    ) {
      return <StartSigning />;
    } else if (
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED) &&
      selectedAllRequiredSignatories &&
      allHaveSigned
    ) {
      return <SignedSuccess />;
    }
  } else if (
    contractStatus == contract_statuses.PROCESSING ||
    contractStatus == contract_statuses.UPDATE
  ) {
    if (
      !contractId &&
      user.role == "superAdmin" &&
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED)
    ) {
      if (selectedAllRequiredSignatories == true && !isASignatory) {
        return <div></div>;
      } else {
        return <SelectServices />;
      }
    } else if (
      contractId &&
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED) &&
      selectedAllRequiredSignatories &&
      !hasSigned
    ) {
      return <StartSigning />;
    } else if (
      (userStatus == user_statuses.APPROVED ||  vasPartnerStatus == user_statuses.APPROVED) &&
      selectedAllRequiredSignatories &&
      allHaveSigned
    ) {
      return <SignedSuccess />;
    }
  } else {
    return <div></div>;
  }

  function Renew() {
    return (
      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            marginBottom: "50px",
          }}
          message={`${
            contractStatus == contract_statuses.EXPIRED
              ? "Your contract has expired."
              : "Your contract is expiring soon."
          } Click here to renew`}
          description="Outline contract conditions and give contract warrantees."
          onclick={() => setShowContractCategoryModal(true)}
          button={"Renew your contract"}
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
                  stroke-linecap="round"
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
                  stroke-linecap="round"
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
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  function SelectServices() {
    console.log("Got here333!");
    return (
      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            marginBottom: "50px",
          }}
          message="Your contract is ready. Click here to sign"
          description="Outline contract conditions and give contract warrantees."
          onclick={() => setShowContractCategoryModal(true)}
          button={
            contractStatus == contract_statuses.PROCESSING
              ? "Sign your contract"
              : "Sign an Addendum"
          }
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
                  stroke-linecap="round"
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
                  stroke-linecap="round"
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
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  function StartSigning() {
    return (
      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            marginBottom: "50px",
          }}
          message="Your contract is ready. Click here to sign"
          description="Outline contract conditions and give contract warrantees."
          onclick={() => {
            // if(user.role == "superAdmin" || user.role == "delegate"){
            setAgreementModal(true);
            // }else{
            //     window.location = "/dashboard/contracts/execution/" + contractId;
            // }
          }}
          button={"Sign your contract"}
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
                  stroke-linecap="round"
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
                  stroke-linecap="round"
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
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          }
        />
      </div>
    );
  }

  function SignedSuccess() {
    return (
      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{ border: "1px solid rgba(255,255,255,.1)" }}
          message="Your contract has been signed"
          description="Outline contract conditions and give contract warrantees."
          onclick={() => {}}
          feedback={
            <div className="flex space-x-2 items-center">
              <div className="py-1 px-3 rounded-full bg-[#00FF0020] text-white flex justify-center items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
                &nbsp; Signed{" "}
                <span className="py-1 px-2 bg-black/40 text-white rounded-full">
                  {" "}
                  {moment(
                    dynamicData?.dynamic_details?.date_of_contract
                  ).format("DD/MM/YYYY")}
                </span>
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_APIURI}/v2/contract/download-contract-pdf/${partner.uuid}/${contractId}/signed`}
                target="_blank"
              >
                <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </a>
              <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          }
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
                  stroke-linecap="round"
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
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
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
      </div>
    );
  }
}
