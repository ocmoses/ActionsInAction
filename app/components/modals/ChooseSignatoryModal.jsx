import GenericModal from "./GenericModal.jsx";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";
import { role_types } from "@/app/modules/constants";
import TextInput from "../form/TextInput.jsx";

export default function ChooseSignatoryModal() {
  const {
    data,
    setData,
    resetData,

    partner,
    createPartner,
    partnerRoles,
    signatories,
    setSignatories,
    addSignatoryModal,
    setAddSignatoryModal,
    contractSignatriesModal,
    setContractSignatriesModal,
    chooseSignatoryModal,
    setChooseSignatoryModal,

    newSignatoryRole,
    adminPartners,
  } = useContext(ContractContext);

  const { user } = useUsers();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  useEffect(() => {}, [partnerRoles, newSignatoryRole, adminPartners]);

  return (
    chooseSignatoryModal && (
      <GenericModal
        id="contract_signatories_modal"
        width={520}
        height={550}
        closeAction={() => {}}
      >
        <>
          <div className="flex pt-8 pb-4 w-[450px]">
            <div className="text-white text-2xl mb-4 flex-1">
              Choose a {newSignatoryRole}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setChooseSignatoryModal(false);
                setContractSignatriesModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="gray"
                className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2"
              >
                <path
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div
            className="w-[450px] mb-4 rounded-lg bg-white/20 flex p-4 hover:bg-white/40 hover:border-px hover:border-gray-200"
            key={user.uuid}
            onClick={() => {
              setSignatories({
                ...signatories,
                [`${newSignatoryRole}`]: {
                  firstname: user.first_name,
                  lastname: user.last_name,
                  email: user.email,
                },
              });
              setChooseSignatoryModal(false);
              setContractSignatriesModal(true);
            }}
          >
            <div className="w-12">
              <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="yellow"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center cursor-pointer">
              <p className="text-white text-md mb-2">{`Me`}</p>
              <span className="text-gray-300 text-xs">{user.email}</span>
              {/* <span className="text-yellow-500 text-xs hidden hover:inline-flex border-1 border-yellow-500 py-1 px-4 rounded-full">Add a director</span> */}
            </div>
          </div>

          {adminPartners &&
            adminPartners.map((partner) =>
              partner.role.role_name == newSignatoryRole ? (
                <div
                  className="mb-4 rounded-lg bg-white/20 flex p-4 hover:bg-white/40 hover:border-px hover:border-gray-200"
                  key={partner.uuid}
                  onClick={() => {
                    setSignatories({
                      ...signatories,
                      director: {
                        firstname: partner.firstname,
                        lastname: partner.lastname,
                        email: partner.email,
                      },
                    });
                    setChooseSignatoryModal(false);
                    setContractSignatriesModal(true);
                  }}
                >
                  <div className="w-12">
                    <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="yellow"
                        className="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center cursor-pointer">
                    <p className="text-white text-md mb-2">{`${partner.firstname} ${partner.lastname}`}</p>
                    <span className="text-gray-300 text-xs">
                      {partner.email}
                    </span>
                    {/* <span className="text-yellow-500 text-xs hidden hover:inline-flex border-1 border-yellow-500 py-1 px-4 rounded-full">Add a director</span> */}
                  </div>
                </div>
              ) : (
                ""
              )
            )}

          <div className="flex py-4 px-2 space-x-4 justify-end">
            <button
              className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
              onClick={() => {
                setChooseSignatoryModal(false);
                setContractSignatriesModal(true);
              }}
            >
              Back
            </button>
          </div>
        </>
      </GenericModal>
    )
  );
}
