"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import { getFileSizeText } from "@/app/modules/utilities";
import {
  FileUploadIcon,
  FileUploadActiveIcon,
  InfoIcon,
} from "@/app/components/Icons";
import { TailSpinPreloader } from "@/app/components/Icons";
import usePartners from "@/hooks/usePartners";
import { useStoreState } from "easy-peasy";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import RemoteEndpoints from "@/app/modules/endpoints";
import FileViewer from "@/app/components/modals/FileViewer";
import Success from "@/app/components/toasts/Success";
import Link from "next/link";
import { PageRoutes } from "@/app/modules/menu";
import TextInput from "@/app/components/form/TextInput";

export default function GracePeriodAlert({
  gracePeriod,
  licenseRenewal,
  openGracePeriodForm,
  popUpLicenseRenewalForm,
  closeAlert,
}) {
  const { partner } = usePartners();
  const states = useStoreState((state) => state);

  const [gracePeriodStatus, setGracePeriodStatus] = useState(null); 
  const [licenseRenewalStatus, setLicenseRenewalStatus] = useState(null);
  const [licenseValidityDaysLeft, setLicenseValidityDaysLeft] = useState();
  const [loading, setLoading] = useState(false);
  ////////////licenseValidityRemainder function////////////////////
  const licenseValidityRemainder = async () => {
    try {
      setLoading(true);
      const licenseValidityRemainderResponse = await axios.get(
        `${RemoteEndpoints.PARTNER_LICENSE_VALIDITY_REMAINDER}${partner?.uuid}`,
        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );
      if ("license_validity_days" in licenseValidityRemainderResponse.data.data) {
        const validityDaysLeft =licenseValidityRemainderResponse.data.data.license_validity_days;
        setLicenseValidityDaysLeft(validityDaysLeft);
      }

      console.log("validityDaysLeft", validityDaysLeft)
      setLoading(false);
    } catch (error) {
      console.log("validityDaysLeft error")
      setLoading(false);
    }
  };
  ////////////end licenseValidityRemainder function////////////////////

  useEffect(() => {
    if ("status" in gracePeriod) {
      setGracePeriodStatus(gracePeriod.status);
    } else {
      setGracePeriodStatus("none");
    }

    if ("status" in licenseRenewal) {
      setLicenseRenewalStatus(licenseRenewal.status);
    } else {
      setLicenseRenewalStatus("none");
    }

    licenseValidityRemainder();
  }, [gracePeriod, licenseRenewal]);
  

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {licenseRenewalStatus == "none" &&
          licenseValidityDaysLeft >= 0 &&
          licenseValidityDaysLeft <= 60 ? (
            <>
              {gracePeriodStatus != "approved" ? (
                <>
                  {gracePeriodStatus == "not_approved" ||
                  gracePeriodStatus == "corrected" ? (
                    <></>
                  ) : (
                    <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
                      <div className="p-[24px] ">
                        <div className="flex flex-row gap-3">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <path
                                d="M15 27.5C8.1125 27.5 2.5 21.8875 2.5 15C2.5 8.1125 8.1125 2.5 15 2.5C21.8875 2.5 27.5 8.1125 27.5 15C27.5 21.8875 21.8875 27.5 15 27.5ZM14.0625 20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V13.75C15.9375 13.2375 15.5125 12.8125 15 12.8125C14.4875 12.8125 14.0625 13.2375 14.0625 13.75V20ZM16.15 9.525C16.0875 9.3625 16 9.2375 15.8875 9.1125C15.7625 9 15.625 8.9125 15.475 8.85C15.325 8.7875 15.1625 8.75 15 8.75C14.8375 8.75 14.675 8.7875 14.525 8.85C14.375 8.9125 14.2375 9 14.1125 9.1125C14 9.2375 13.9125 9.3625 13.85 9.525C13.7875 9.675 13.75 9.8375 13.75 10C13.75 10.1625 13.7875 10.325 13.85 10.475C13.9125 10.625 14 10.7625 14.1125 10.8875C14.2375 11 14.375 11.0875 14.525 11.15C14.825 11.275 15.175 11.275 15.475 11.15C15.625 11.0875 15.7625 11 15.8875 10.8875C16 10.7625 16.0875 10.625 16.15 10.475C16.2125 10.325 16.25 10.1625 16.25 10C16.25 9.8375 16.2125 9.675 16.15 9.525Z"
                                fill="#E44A34"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="text-gray-500 ">
                              {gracePeriodStatus == "rejected" ? (
                                <p>
                                  <span className="text-white">
                                    Your licence renewal proof was rejected
                                  </span>
                                  <br />
                                  Reason: {gracePeriod.reasons_for_rejection}.
                                </p>
                              ) : (
                                <p>
                                  <span className="text-white">
                                    Your license expires in{" "}
                                    {licenseValidityDaysLeft} days
                                  </span>
                                  <br />
                                  Upload your renewed license to avoid service
                                  distruption. If your renewal is still in
                                  progress, apply for an extension.
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                            {licenseValidityDaysLeft > 0 && (
                                <button
                                  onClick={() => openGracePeriodForm()}
                                  className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                                >
                                  Extend Expiration
                                </button>
                              )}
                              <button
                                className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                                onClick={() => popUpLicenseRenewalForm()}
                              >
                                Upload new license
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
                  <div className="p-[24px] ">
                    <div className="flex flex-row gap-3">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.3719 26.8687C21.2737 26.8687 26.8687 21.2737 26.8687 14.3719C26.8687 7.47004 21.2737 1.875 14.3719 1.875C7.47004 1.875 1.875 7.47004 1.875 14.3719C1.875 21.2737 7.47004 26.8687 14.3719 26.8687ZM21.4562 9.64567C21.9096 10.1073 21.9029 10.8491 21.4412 11.3025L13.4887 19.113C13.0329 19.5606 12.3026 19.5606 11.8468 19.113L7.3025 14.6498C6.84087 14.1965 6.83418 13.4547 7.28757 12.993C7.74097 12.5314 8.48274 12.5247 8.94438 12.9781L12.6678 16.635L19.7994 9.63074C20.261 9.17735 21.0028 9.18403 21.4562 9.64567Z"
                            fill="#24A06B"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="text-gray-500 ">
                          <p>
                            <span className="text-white">
                              Your expiry period has been extended
                            </span>
                            <br />
                            We've reviewed your renewal proof and have extended
                            your expiry period by 30 working days
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button 
                          onClick={() => closeAlert()}
                          className="h-[40px] w-[100px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30">
                            Got It!
                          </button>
                          <button
                            className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                            onClick={() => popUpLicenseRenewalForm()}
                          >
                            Renew Your License
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {licenseRenewalStatus != "approved" ? (
                <>
                  {licenseRenewalStatus == "not_approved" ||
                  licenseRenewalStatus == "corrected" ? (
                    <></>
                  ) : (
                    <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
                      <div className="p-[24px] ">
                        <div className="flex flex-row gap-3">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <path
                                d="M15 27.5C8.1125 27.5 2.5 21.8875 2.5 15C2.5 8.1125 8.1125 2.5 15 2.5C21.8875 2.5 27.5 8.1125 27.5 15C27.5 21.8875 21.8875 27.5 15 27.5ZM14.0625 20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V13.75C15.9375 13.2375 15.5125 12.8125 15 12.8125C14.4875 12.8125 14.0625 13.2375 14.0625 13.75V20ZM16.15 9.525C16.0875 9.3625 16 9.2375 15.8875 9.1125C15.7625 9 15.625 8.9125 15.475 8.85C15.325 8.7875 15.1625 8.75 15 8.75C14.8375 8.75 14.675 8.7875 14.525 8.85C14.375 8.9125 14.2375 9 14.1125 9.1125C14 9.2375 13.9125 9.3625 13.85 9.525C13.7875 9.675 13.75 9.8375 13.75 10C13.75 10.1625 13.7875 10.325 13.85 10.475C13.9125 10.625 14 10.7625 14.1125 10.8875C14.2375 11 14.375 11.0875 14.525 11.15C14.825 11.275 15.175 11.275 15.475 11.15C15.625 11.0875 15.7625 11 15.8875 10.8875C16 10.7625 16.0875 10.625 16.15 10.475C16.2125 10.325 16.25 10.1625 16.25 10C16.25 9.8375 16.2125 9.675 16.15 9.525Z"
                                fill="#E44A34"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="text-gray-500 ">
                              {licenseRenewalStatus == "rejected" ? (
                                <p>
                                  <span className="text-white">
                                    Your licence renewal proof was rejected
                                  </span>
                                  <br />
                                  Reason: {licenseRenewal.reasons_for_rejection}
                                </p>
                              ) : (
                                <p>
                                  <span className="text-white">
                                    Your license has expired.
                                  </span>
                                  <br />
                                  Upload your renewed license to avoid service
                                  distruption.
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {licenseValidityDaysLeft > 0 && (
                                <button
                                  onClick={() => openGracePeriodForm()}
                                  className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                                >
                                  Extend Expiration
                                </button>
                              )}
                              <button
                                className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                                onClick={() => popUpLicenseRenewalForm()}
                              >
                                Upload new license
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
                  <div className="p-[24px] ">
                    <div className="flex flex-row gap-3">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.3719 26.8687C21.2737 26.8687 26.8687 21.2737 26.8687 14.3719C26.8687 7.47004 21.2737 1.875 14.3719 1.875C7.47004 1.875 1.875 7.47004 1.875 14.3719C1.875 21.2737 7.47004 26.8687 14.3719 26.8687ZM21.4562 9.64567C21.9096 10.1073 21.9029 10.8491 21.4412 11.3025L13.4887 19.113C13.0329 19.5606 12.3026 19.5606 11.8468 19.113L7.3025 14.6498C6.84087 14.1965 6.83418 13.4547 7.28757 12.993C7.74097 12.5314 8.48274 12.5247 8.94438 12.9781L12.6678 16.635L19.7994 9.63074C20.261 9.17735 21.0028 9.18403 21.4562 9.64567Z"
                            fill="#24A06B"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="text-gray-500 ">
                          <p>
                            <span className="text-white">
                              Your license renewal successful
                            </span>
                            <br />
                            We’ve reviewed your license and approved your
                            renewal request.
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button 
                          onClick={() => closeAlert()}
                          className="h-[40px] w-[100px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30">
                            Got It!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export const GracePeriodExtensionForm = ({
  closePopUp,
  submitGracePeriod,
}) => {
  const { partner } = usePartners();
  const states = useStoreState((state) => state);

  const [doc, setDoc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);
  const [formData, setFormData] = useState({
    partner_uuid: partner?.uuid,
    file: null,
    indemnity_clause: false,
  });
  const [fileSize, setfFileSize] = useState(null);
  useEffect(() => {
    setDoc(null);
  }, []);

  const handleFileChange = (e) => {
    const validImageTypes = ["application/pdf"];
    let file = e.target.files[0];
    const fileType = file["type"];
    const filesize = file["size"];

    if (validImageTypes.includes(fileType)) {
      setDoc({
        file_name: file.name,
        file_size: file.size,
      });
      setfFileSize(filesize);
      setErrorMessage("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setErrorMessage("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      clearError();
      if (fileSize <= 0) {
        setErrorMessage("Upload  Proof of Renewal!");
      } else {
        if (!formData.indemnity_clause) {
          setErrorMessage("Check to validate licence renewal progress");
        } else {
          setSendAction(true);
          const formDataToSend = new FormData();
          formDataToSend.append("partner_uuid", formData.partner_uuid);
          formDataToSend.append("file", formData.file);
          formDataToSend.append("indemnity_clause", "YES");
          const response = await axios.post(
            RemoteEndpoints.SUBMIT_LICENSE_GRACE_PERIOD_REQUEST,
            formDataToSend,
            {
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${states.users.token}`,
              },
            }
          );

          if (response?.data.success) {
            submitGracePeriod();
          } else {
            setErrorMessage(response.data.message);
            setSendAction(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setSendAction(false);
      setErrorMessage(err.response.data.data.message);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <section id="brd_updates">
      <h2 className="text-white font-mtn-bold text-2xl mb-4">
        Extend expiry period
      </h2>
      <p className="text-white/70 mb-5">
        Are you in the process of renewing your license, please upload a proff
        to show progress.
      </p>
      {errorMessage && (
        <p className="text-red-500 text-sm font-italic">
          {errorMessage}
          <br />
        </p>
      )}
      <FileInputWrapper>
        <div className="p-[8px] w-full rounded-[10px]">
          <label>
            <div className="border-1 border-dashed  border-[#333333] w-full rounded-[11px] bg-[#030303] py-[24px] px-[16px]">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                name="files"
                id="files"
                accept=".pdf,.PDF"
              />

              {!doc?.file_name && (
                <div
                  className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                >
                  <div className="flex flex-row gap-3">
                    <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                      <FileUploadIcon />
                    </div>

                    <div className="text-[#999999]">
                      <p>
                        Upload <br />
                        <span className="text-white font-mtn-bold">
                          Proof of renewal in-progress
                        </span>
                        <br />
                        Drag and drop here or
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 justify-between items-end">
                    <InfoIcon width={16} height={16} iconClass="" />
                    <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                      Choose file
                    </div>
                  </div>
                </div>
              )}
              {doc?.file_name && (
                <div
                  className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                >
                  <div className="flex flex-row gap-3">
                    <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                      <FileUploadActiveIcon />
                    </div>

                    <div className="flex text-[#999999]">
                      <p>
                        Upload <br />
                        <span className="text-white font-mtn-bold">
                          {doc?.file_name}
                        </span>
                        <br />
                        {doc ? getFileSizeText(doc.file_size) : "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 justify-between items-end">
                    <InfoIcon width={16} height={16} iconClass="" />
                    <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                      Choose file
                    </div>
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </FileInputWrapper>

      <div className="flex items-center space-x-3 mt-5 mtb-5">
        <input
          type="checkbox"
          className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
          name="indemnity_clause"
          id="indemnity_clause"
          value="YES"
          onChange={handleChange}
        />
        <div className="flex justify-center text-white/70">
          <p>
            By clicking this checkbox, I agree that the document I’ve uploaded
            is true and reflects my licence renewal progress.
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <button
          className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
          onClick={() => closePopUp()}
        >
          Cancel
        </button>
        {sendAction ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <button
            className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
            onClick={handleSubmit}
          >
            Upload
          </button>
        )}
      </div>
    </section>
  );
};

export const GracePeriodSuccess = ({ gracePeriodSuccessOk }) => {
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
          onClick={() => gracePeriodSuccessOk()}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

export const LicenseValidityTopAlert = ({
  licenseValidityDaysLeft,
  partner,
  closeLicenseValidityAlert,
  popUpLicenseRenewalForm,
}) => {
  const states = useStoreState((state) => state);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validity, setValidity] = useState(false);


  ////////////CHECK_PARTNER_LICENSE_EXPIRATION function////////////////////
  const checkPartnerLicenseExpiration = async () => {
    try {
      const checkPartnerLicenseExpirationResponse = await axios.get(
        `${RemoteEndpoints.CHECK_PARTNER_LICENSE_EXPIRATION}${partner?.uuid}`,
        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.users.token}`,
          },
        }
      );
      const response = checkPartnerLicenseExpirationResponse.data.data;
      const license_validity = response.license_validity;
      if (license_validity == "not_expired") {
        setValidity(false);
      } else {
        setValidity(true);
      }
    } catch (error) {
      setErrorMessage("Something went wrong while trying to license validity");
    }
  };

    useEffect(() => {
    checkPartnerLicenseExpiration();
  }, [licenseValidityDaysLeft]);

  return (
    <>
      {licenseValidityDaysLeft <= 60 && (
        <>
          {errorMessage && (
            <p className="text-red-500 text-sm font-italic">{errorMessage}</p>
          )}
          <div
            className={`${
              validity ? "bg-[#CA3521] text-white" : "bg-[#09326C]"
            } min-h-[20px] w-[100%]`}
          >
            <div className="py-2 px-10 flex flex-row justify-between ">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.0938 13.75C11.0938 13.8743 11.0444 13.9935 10.9565 14.0815C10.8686 14.1694 10.7493 14.2188 10.625 14.2188C10.3349 14.2188 10.0567 14.1035 9.85161 13.8984C9.64649 13.6933 9.53125 13.4151 9.53125 13.125V10C9.53125 9.95856 9.51479 9.91882 9.48549 9.88951C9.45619 9.86021 9.41644 9.84375 9.375 9.84375C9.25068 9.84375 9.13146 9.79436 9.04355 9.70646C8.95564 9.61855 8.90625 9.49932 8.90625 9.375C8.90625 9.25068 8.95564 9.13145 9.04355 9.04354C9.13146 8.95564 9.25068 8.90625 9.375 8.90625C9.66508 8.90625 9.94328 9.02148 10.1484 9.2266C10.3535 9.43172 10.4688 9.70992 10.4688 10V13.125C10.4688 13.1664 10.4852 13.2062 10.5145 13.2355C10.5438 13.2648 10.5836 13.2812 10.625 13.2812C10.7493 13.2812 10.8686 13.3306 10.9565 13.4185C11.0444 13.5065 11.0938 13.6257 11.0938 13.75ZM9.6875 7.34375C9.84202 7.34375 9.99307 7.29793 10.1215 7.21209C10.25 7.12624 10.3502 7.00423 10.4093 6.86147C10.4684 6.71872 10.4839 6.56163 10.4537 6.41009C10.4236 6.25854 10.3492 6.11933 10.2399 6.01007C10.1307 5.90081 9.99147 5.82641 9.83992 5.79626C9.68837 5.76612 9.53129 5.78159 9.38853 5.84072C9.24578 5.89985 9.12376 5.99998 9.03792 6.12846C8.95207 6.25694 8.90625 6.40798 8.90625 6.5625C8.90625 6.7697 8.98856 6.96841 9.13508 7.11493C9.28159 7.26144 9.4803 7.34375 9.6875 7.34375ZM17.9688 10C17.9688 11.5761 17.5014 13.1167 16.6258 14.4272C15.7502 15.7377 14.5056 16.759 13.0495 17.3622C11.5934 17.9653 9.99116 18.1231 8.44538 17.8156C6.89959 17.5082 5.4797 16.7492 4.36525 15.6348C3.2508 14.5203 2.49185 13.1004 2.18437 11.5546C1.87689 10.0088 2.0347 8.40659 2.63784 6.95049C3.24097 5.49439 4.26235 4.24984 5.5728 3.37423C6.88326 2.49861 8.42393 2.03125 10 2.03125C12.1127 2.03373 14.1381 2.87409 15.632 4.36798C17.1259 5.86188 17.9663 7.88732 17.9688 10ZM17.0313 10C17.0313 8.60935 16.6189 7.24993 15.8463 6.09365C15.0737 4.93736 13.9755 4.03615 12.6907 3.50397C11.406 2.97179 9.9922 2.83255 8.62827 3.10385C7.26435 3.37516 6.0115 4.04482 5.02816 5.02816C4.04482 6.01149 3.37516 7.26434 3.10386 8.62827C2.83255 9.9922 2.9718 11.406 3.50398 12.6907C4.03615 13.9755 4.93737 15.0737 6.09365 15.8463C7.24993 16.6189 8.60935 17.0312 10 17.0312C11.8642 17.0292 13.6514 16.2877 14.9696 14.9696C16.2877 13.6514 17.0292 11.8642 17.0313 10Z"
                    fill="#579DFF"
                  />
                </svg>
                <p className="text-white flex gap-2">
                  {!validity ? (
                    <>
                    {licenseValidityDaysLeft>1 ?(
                      <span>
                      Your License expires in {licenseValidityDaysLeft} days.
                    </span>
                    ):(
                      <span>
                      Your License expires today.
                    </span>
                    )}
                    </>
                  ) : (
                    <span>Your License has expired</span>
                  )}{" "}
                  <span
                    className="text-white/70 cursor-pointer hover:underline hover:text-white/90"
                    onClick={() => popUpLicenseRenewalForm()}
                  >
                    Renew your license{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M3.125 10H16.875M16.875 10L11.25 4.375M16.875 10L11.25 15.625"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </div>
              <button
                className="h-[20px] w-[20px] text-white flex justify-center items-center text-[14px] rounded-[3px] hover:bg-white/20 transition ease-in-out delay-150"
                onClick={() => closeLicenseValidityAlert()}
              >
                X
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const LicenseRenewalForm = ({ closePopUp, submitLicenseRenewal }) => {
  const { partner } = usePartners();
  const states = useStoreState((state) => state);
  const [formNotifications, setFormNotifications] = useState(false);

  const [doc, setDoc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);
  const [formData, setFormData] = useState({
    partner_uuid: partner?.uuid,
    file: null,
    vas_license_id: "",
    license_issue_date: "",
    license_expiring_date: "",
    indemnity_clause: "YES",
  });

  const [fileSize, setfFileSize] = useState(null);
  useEffect(() => {
    setDoc(null);
  }, []);

  const handleFileChange = (e) => {
    const validImageTypes = ["application/pdf"];
    let file = e.target.files[0];
    const fileType = file["type"];
    const filesize = file["size"];

    if (validImageTypes.includes(fileType)) {
      setDoc({
        file_name: file.name,
        file_size: file.size,
      });
      setfFileSize(filesize);
      setErrorMessage("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setErrorMessage("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      clearError();
      if (fileSize <= 0) {
        setErrorMessage("Upload  VAS License!");
      } else {
        if (formData.vas_license_id == "") {
          setErrorMessage("Provide VAS License ID!");
        } else if (formData.license_issue_date == "") {
          setErrorMessage("Provide License Issuing Date!");
        } else if (formData.license_expiring_date == "") {
          setErrorMessage("Provide License Expiring Date!");
        } else {
          setSendAction(true);
          const formDataToSend = new FormData();
          formDataToSend.append("partner_uuid", formData.partner_uuid);
          formDataToSend.append("vas_license_id", formData.vas_license_id);
          formDataToSend.append(
            "license_issue_date",
            formData.license_issue_date
          );
          formDataToSend.append(
            "license_expiring_date",
            formData.license_expiring_date
          );
          formDataToSend.append("file", formData.file);
          formDataToSend.append("indemnity_clause", formData.indemnity_clause);
          const response = await axios.post(
            RemoteEndpoints.SUBMIT_LICENSE_RENEWAL_REQUEST,
            formDataToSend,
            {
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${states.users.token}`,
              },
            }
          );

          if (response?.data.success) {
            submitLicenseRenewal();
          } else {
            setErrorMessage(response.data.message);
            setSendAction(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
      setSendAction(false);
      setErrorMessage(err.response.data.data.message);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <section id="brd_updates">
      <h2 className="text-white font-mtn-bold text-2xl mb-4">
        Add new VAS license
      </h2>

      {!formNotifications ? (
        <>
          <p className="text-white/70 mb-5">
            We’ll review your submission for approval
          </p>

          <div className="mt-3 mb-3 flex flex-col gap-8 border-l-[2px] border-[#353535]">
            <div className="flex flex-row gap-5 ml-[-8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle cx="7" cy="7" r="6.5" fill="#E4B809" stroke="white" />
              </svg>
              <p className="text-gray-500">
                <span className="text-white">Update your VAS license</span>
                <br />
                Provide details of your license
              </p>
            </div>

            <div className="flex flex-row gap-5 ml-[-8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle cx="7" cy="7" r="6.5" fill="#E4B809" stroke="white" />
              </svg>
              <p className="text-gray-500">
                <span className="text-white">We’ll review your updates</span>
                <br />
                Your submission will go through an approval process, ensure they
                are correct.
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
              onClick={() => closePopUp()}
            >
              Cancel
            </button>

            <button
              className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
              onClick={() => setFormNotifications(true)}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <section className="animate-[slide-left_1s_ease-in-out]">
          <p className="text-white/70 mb-5">
            Let us know what problem you are facing. If you have general
            questions , check out our &nbsp;
            <Link
              href={PageRoutes.faq}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mtn-300 underline"
            >
              FAQs
            </Link>
            &nbsp; where you might find the answer you're after even quicker.
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm font-italic">
              {errorMessage}
              <br />
            </p>
          )}
          <TextInput
            id="vas_license_id"
            label="VAS License ID"
            type="text"
            name="vas_license_id"
            value={formData.vas_license_id}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <div className="w-[50%]">
              <TextInput
                id="license_issue_date"
                label="Issuing Date"
                type="date"
                name="license_issue_date"
                value={formData.license_issue_date}
                onChange={handleChange}
              />
            </div>
            <div className="w-[50%]">
              <TextInput
                id="license_expiring_date"
                label="Expiry Date"
                type="date"
                name="license_expiring_date"
                value={formData.license_expiring_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <FileInputWrapper>
            <div className="p-[8px] w-full rounded-[10px]">
              <label>
                <div className="border-1 border-dashed  border-[#333333] w-full rounded-[11px] bg-[#030303] py-[24px] px-[16px]">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    name="files"
                    id="files"
                    accept=".pdf,.PDF"
                  />

                  {!doc?.file_name && (
                    <div
                      className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                    >
                      <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                          <FileUploadIcon />
                        </div>

                        <div className="text-[#999999]">
                          <p>
                            Upload <br />
                            <span className="text-white font-mtn-bold">
                              NCC VAS License
                            </span>
                            <br />
                            Drag and drop here or
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 justify-between items-end">
                        <InfoIcon width={16} height={16} iconClass="" />
                        <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                          Choose file
                        </div>
                      </div>
                    </div>
                  )}
                  {doc?.file_name && (
                    <div
                      className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                    >
                      <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                          <FileUploadActiveIcon />
                        </div>

                        <div className="flex text-[#999999]">
                          <p>
                            Upload <br />
                            <span className="text-white font-mtn-bold">
                              {doc?.file_name}
                            </span>
                            <br />
                            {doc ? getFileSizeText(doc.file_size) : "0"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 justify-between items-end">
                        <InfoIcon width={16} height={16} iconClass="" />
                        <div className="rounded-full border-1 whitespace-nowrap border-mtn-300 group-hover:border-mtn-100 bg-transparent py-2 px-3 text-[11px] text-white">
                          Choose file
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </FileInputWrapper>

          <div className="flex gap-2 justify-end mt-4">
            <button
              className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
              onClick={() => closePopUp()}
            >
              Cancel
            </button>
            {sendAction ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <button
                className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
                onClick={handleSubmit}
              >
                Upload
              </button>
            )}
          </div>
        </section>
      )}
    </section>
  );
};

export const LicenseRenewalSuccess = ({ SuccessOk }) => {
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
      <p className=" text-mtn-500 my-5">What's Next?</p>
      <p className=" text-gray-400 max-w-[60%] m-[auto]">
        We’ll review your updates and revert on the same.
      </p>
      <div className="flex gap-2 justify-center mt-10">
        <button
          className=" text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={() => SuccessOk()}
        >
          Got-It!
        </button>
      </div>
    </div>
  );
};

function actionDate(targetDate) {
  const originalDate = new Date(targetDate);
  const formattedDate = originalDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export const GracePeriodAdminFlyOut = ({
  closeGracePeriodFlyOut,
  selectedRequest,
  successAction,
}) => {
  const states = useStoreState((state) => state);
  const [tab, setTab] = useState({
    overview: true,
    activity: false,
  });

  const [fileViewer, setFileViewer] = useState(null);
  const [declineGracePeriodDoc, setDeclineGracePeriodDoc] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sendAction, setSendAction] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  let [formData, setFormData] = useState({
    grace_period_request_uuid: selectedRequest.uuid,
    partner_uuid: selectedRequest.partner_uuid,
    status: "",
    rejection_reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const _declineGracePeriod = () => {
    clearError();
    const rejection_reason = formData.rejection_reason;
    if (rejection_reason === "") {
      setErrorMessage("Select the reason for rejection.");
    } else {
      formData.status = "rejected";
      gracePeriodAction();
    }
  };

  const _approveGracePeriod = () => {
    clearError();
    formData.status = "approved";
    formData.rejection_reason = "Approved";
    gracePeriodAction();
  };

  const gracePeriodAction = async (e) => {
    try {
      setSendAction(true);
      const response = await axios.post(
        RemoteEndpoints.APPROVE_REJECT_LICENSE_GRACE_PERIOD_REQUEST,
        formData,
        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.admins.token}`,
          },
        }
      );
      setSuccessMessage(response.data.data.message);
      setSuccessToast(true);
    } catch (err) {
      setSendAction(false);
      setErrorMessage(err.response.data.data.message);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <main
        id="GracePeriod_flyout"
        className="w-screen h-screen fixed z-[1000] top-0 left-0 bg-black/80 flex justify-right animate-[fade-in_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "GracePeriod_flyout" && closeGracePeriodFlyOut();
        }}
      >
        <div className="w-[475px] h-screen fixed right-0  top-0 bg-[#111111] animate-[slide-left_1s_ease-in-out]">
          <div className="p-5">
            <div className="h-[40px] flex flex-row justify-between ">
              <div className="flex gap-3 flex-wrap h-[40px] items-center">
                <div className="h-[40px] w-[40px] rounded-[100%] border border-white/20 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.5 8.99998C19.5 8.77748 19.566 8.55997 19.6896 8.37497C19.8132 8.18996 19.9889 8.04577 20.1945 7.96062C20.4 7.87547 20.6262 7.85319 20.8445 7.8966C21.0627 7.94001 21.2631 8.04716 21.4205 8.20449C21.5778 8.36182 21.685 8.56228 21.7284 8.78051C21.7718 8.99874 21.7495 9.22494 21.6644 9.4305C21.5792 9.63607 21.435 9.81177 21.25 9.93539C21.065 10.059 20.8475 10.125 20.625 10.125C20.3266 10.125 20.0405 10.0065 19.8295 9.79548C19.6185 9.5845 19.5 9.29835 19.5 8.99998ZM18.375 6.74998C18.5975 6.74998 18.815 6.684 19 6.56039C19.185 6.43677 19.3292 6.26107 19.4144 6.0555C19.4995 5.84994 19.5218 5.62374 19.4784 5.40551C19.435 5.18728 19.3278 4.98682 19.1705 4.82949C19.0131 4.67216 18.8127 4.56501 18.5945 4.5216C18.3762 4.47819 18.15 4.50047 17.9445 4.58562C17.7389 4.67077 17.5632 4.81496 17.4396 4.99997C17.316 5.18497 17.25 5.40248 17.25 5.62498C17.25 5.92335 17.3685 6.2095 17.5795 6.42048C17.7905 6.63146 18.0766 6.74998 18.375 6.74998ZM21.0619 12C20.8637 11.9836 20.6672 12.0467 20.5155 12.1752C20.3638 12.3037 20.2693 12.4872 20.2528 12.6853C20.1186 14.2532 19.5393 15.7502 18.5832 17.0001C17.6271 18.25 16.3338 19.2008 14.8557 19.7406C13.3775 20.2805 11.7759 20.3869 10.2393 20.0474C8.70267 19.7078 7.295 18.9365 6.18191 17.8241C5.06881 16.7117 4.29658 15.3045 3.95609 13.7681C3.61561 12.2318 3.72102 10.6301 4.25993 9.15157C4.79884 7.67306 5.74883 6.37923 6.99812 5.42231C8.24741 4.46539 9.74402 3.88519 11.3119 3.74998C11.4104 3.74186 11.5063 3.71441 11.5942 3.66922C11.6821 3.62402 11.7602 3.56195 11.8241 3.48656C11.888 3.41117 11.9364 3.32394 11.9666 3.22983C11.9968 3.13573 12.0081 3.0366 12 2.93811C11.9919 2.83962 11.9644 2.74369 11.9192 2.65581C11.874 2.56792 11.812 2.4898 11.7366 2.4259C11.6612 2.362 11.5739 2.31358 11.4798 2.2834C11.3857 2.25321 11.2866 2.24186 11.1881 2.24998C9.33564 2.40933 7.5672 3.09443 6.09087 4.22469C4.61453 5.35496 3.49172 6.88336 2.85452 8.63008C2.21732 10.3768 2.09224 12.2692 2.49401 14.0846C2.89577 15.9 3.80767 17.5628 5.1224 18.8776C6.43714 20.1923 8.10002 21.1042 9.91541 21.506C11.7308 21.9077 13.6232 21.7827 15.3699 21.1455C17.1166 20.5083 18.645 19.3854 19.7753 17.9091C20.9055 16.4328 21.5906 14.6643 21.75 12.8119C21.7585 12.7133 21.7473 12.614 21.7173 12.5198C21.6872 12.4256 21.6388 12.3382 21.5749 12.2627C21.5109 12.1873 21.4327 12.1252 21.3446 12.0801C21.2566 12.035 21.1605 12.0078 21.0619 12ZM12 5.24998C13.335 5.24998 14.6401 5.64586 15.7501 6.38756C16.8601 7.12926 17.7253 8.18347 18.2362 9.41687C18.7471 10.6503 18.8807 12.0075 18.6203 13.3168C18.3598 14.6262 17.717 15.8289 16.773 16.773C15.829 17.717 14.6262 18.3598 13.3168 18.6203C12.0075 18.8807 10.6503 18.7471 9.41687 18.2362C8.18347 17.7253 7.12927 16.8601 6.38757 15.7501C5.64587 14.6401 5.24999 13.335 5.24999 12C5.25197 10.2104 5.96377 8.49465 7.22921 7.22921C8.49465 5.96377 10.2104 5.25197 12 5.24998ZM11.25 12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75H16.5C16.6989 12.75 16.8897 12.671 17.0303 12.5303C17.171 12.3897 17.25 12.1989 17.25 12C17.25 11.8011 17.171 11.6103 17.0303 11.4697C16.8897 11.329 16.6989 11.25 16.5 11.25H12.75V7.49998C12.75 7.30107 12.671 7.11031 12.5303 6.96965C12.3897 6.829 12.1989 6.74998 12 6.74998C11.8011 6.74998 11.6103 6.829 11.4697 6.96965C11.329 7.11031 11.25 7.30107 11.25 7.49998V12ZM15 4.49998C15.2225 4.49998 15.44 4.434 15.625 4.31039C15.81 4.18677 15.9542 4.01107 16.0394 3.8055C16.1245 3.59994 16.1468 3.37374 16.1034 3.15551C16.06 2.93728 15.9528 2.73682 15.7955 2.57949C15.6381 2.42216 15.4377 2.31501 15.2195 2.2716C15.0012 2.22819 14.775 2.25047 14.5695 2.33562C14.3639 2.42077 14.1882 2.56496 14.0646 2.74997C13.941 2.93497 13.875 3.15248 13.875 3.37498C13.875 3.67335 13.9935 3.9595 14.2045 4.17048C14.4155 4.38146 14.7016 4.49998 15 4.49998Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h2 className="text-white">Grace Period</h2>
              </div>

              <button
                className="h-[40px] w-[40px] flex justify-center items-center text-[18px] rounded-[100%] hover:bg-white/20 transition ease-in-out delay-150"
                onClick={() => closeGracePeriodFlyOut()}
              >
                X
              </button>
            </div>
          </div>

          <div className="px-5 border-b border-white/20 flex gap-5">
            <button
              className={`${
                tab.overview
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.overview) {
                  setTab({
                    ...tab,
                    overview: true,
                    activity: false,
                  });
                }
              }}
            >
              Overview
            </button>

            <button
              className={`${
                tab.activity
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.activity) {
                  setTab({
                    ...tab,
                    overview: false,
                    activity: true,
                  });
                }
              }}
            >
              Activity
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-row gap-3">
              <div className="h-[50px] w-[50px] bg-white/10 rounded-[5px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9.24751 9.11244L7.39501 10.9649C6.36751 11.9924 6.36751 13.6499 7.39501 14.6774C8.42251 15.7049 10.08 15.7049 11.1075 14.6774L14.025 11.7599C16.0725 9.71244 16.0725 6.38244 14.025 4.33494C11.9775 2.28744 8.64751 2.28744 6.60001 4.33494L3.42001 7.51494C1.66501 9.26994 1.66501 12.1199 3.42001 13.8824"
                    stroke="#888888"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2  w-[100%]">
                <h3 className="text-white text-[14px]">VAS License</h3>
                <div className="rounded-[3px] p-2  text-gray-400 text-[14px] border border-white/10 w-[100%] flex flex-row justify-between ">
                  <div className="flex gap-3 min-h-[20px] flex-wrap">
                    <div className="h-[20px] w-[20px flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.8 0C11.074 0 11.337 0.113 11.526 0.312L14.726 3.74C14.902 3.926 15 4.173 15 4.429V15C15 15.552 14.552 16 14 16H2C1.448 16 1 15.552 1 15V1C1 0.448 1.448 0 2 0H10.8ZM14 5H10.5C10.224 5 10 4.776 10 4.5V1H2V15H14V5ZM5.5 12C5.22386 12 5 11.7761 5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5ZM5.5 9C5.22386 9 5 8.77614 5 8.5C5 8.22386 5.22386 8 5.5 8H10.5C10.7761 8 11 8.22386 11 8.5C11 8.77614 10.7761 9 10.5 9H5.5Z"
                          fill="#999999"
                        />
                      </svg>
                    </div>
                    <p className="text-white text-[10px]">
                      {selectedRequest.file_name}
                    </p>
                  </div>
                  <button
                    className="h-[20px] w-[20px] flex justify-center items-center text-[18px]"
                    onClick={() => {
                      setFileViewer(selectedRequest?.file_path)
                    }}
                    title="Open"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6.5 5.4999L10.6 1.3999"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 3.4V1H8.59998"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {selectedRequest.status != "approved" &&
                  selectedRequest.status != "rejected" && (
                    <>
                      {!declineGracePeriodDoc ? (
                        <div className="flex flex-row gap-3 w-[100%]">
                          {sendAction ? (
                            <TailSpinPreloader
                              width={40}
                              height={40}
                              fill="#efb703"
                            />
                          ) : (
                            <button
                              className="flex text-[12px] leading-[20px] gap-2 text-white hover:text-gray-400"
                              title="Approve"
                              onClick={_approveGracePeriod}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.8313 5.95628L7.83128 15.9563C7.74339 16.0441 7.62425 16.0934 7.50003 16.0934C7.37581 16.0934 7.25667 16.0441 7.16878 15.9563L2.79378 11.5813C2.71098 11.4924 2.6659 11.3749 2.66804 11.2535C2.67018 11.132 2.71938 11.0161 2.80526 10.9303C2.89115 10.8444 3.00701 10.7952 3.12845 10.793C3.24989 10.7909 3.36742 10.836 3.45628 10.9188L7.50003 14.9617L17.1688 5.29378C17.2576 5.21098 17.3752 5.1659 17.4966 5.16804C17.618 5.17018 17.7339 5.21938 17.8198 5.30526C17.9057 5.39115 17.9549 5.50701 17.957 5.62845C17.9592 5.74989 17.9141 5.86742 17.8313 5.95628Z"
                                  fill="#4DCD97"
                                />
                              </svg>
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            className="flex text-[12px] leading-[20px] gap-2 text-white hover:text-gray-400"
                            title="Decline"
                            onClick={() => {
                              setDeclineGracePeriodDoc(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M15.9563 15.2938C16.0023 15.3367 16.0393 15.3884 16.0649 15.4459C16.0905 15.5034 16.1043 15.5655 16.1054 15.6284C16.1065 15.6914 16.0949 15.7539 16.0714 15.8123C16.0478 15.8706 16.0127 15.9237 15.9682 15.9682C15.9237 16.0127 15.8706 16.0478 15.8123 16.0714C15.7539 16.0949 15.6914 16.1065 15.6284 16.1054C15.5655 16.1043 15.5034 16.0905 15.4459 16.0649C15.3884 16.0393 15.3367 16.0023 15.2938 15.9563L10 10.6633L4.70628 15.9563C4.61742 16.0391 4.49989 16.0842 4.37845 16.082C4.25701 16.0799 4.14115 16.0307 4.05526 15.9448C3.96938 15.8589 3.92018 15.743 3.91804 15.6216C3.9159 15.5002 3.96098 15.3826 4.04378 15.2938L9.33674 10L4.04378 4.70628C3.96098 4.61742 3.9159 4.49989 3.91804 4.37845C3.92018 4.25701 3.96938 4.14115 4.05526 4.05526C4.14115 3.96938 4.25701 3.92018 4.37845 3.91804C4.49989 3.9159 4.61742 3.96098 4.70628 4.04378L10 9.33674L15.2938 4.04378C15.3826 3.96098 15.5002 3.9159 15.6216 3.91804C15.743 3.92018 15.8589 3.96938 15.9448 4.05526C16.0307 4.14115 16.0799 4.25701 16.082 4.37845C16.0842 4.49989 16.0391 4.61742 15.9563 4.70628L10.6633 10L15.9563 15.2938Z"
                                fill="#FE9D8F"
                              />
                            </svg>
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          {errorMessage && (
                            <p className="text-red-500 text-sm font-italic">
                              {errorMessage}
                            </p>
                          )}

                          <div className="rounded-[3px]  text-white text-[12px] border border-white/10 w-[100%]">
                            <div className="p-2 flex flex-col gap-2">
                              <h3 className="text-gray-600">DECLINE REASON</h3>
                              <form>
                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Incomplete Information</p>
                                    <input
                                      type="radio"
                                      value="Incomplete Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Incorrect Information</p>
                                    <input
                                      type="radio"
                                      value="Incorrect Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Inconsistent Information</p>
                                    <input
                                      type="radio"
                                      value="Inconsistent Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Invalid or Expired Document</p>
                                    <input
                                      type="radio"
                                      value="Invalid or Expired Document"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Poor Quality (Contents Not Clear)</p>
                                    <input
                                      type="radio"
                                      value="Poor Quality (Contents Not Clear)"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>                                
                              </form>
                            </div>

                            <div className="px-2 py-5 border-t border-white/20 flex items-center gap-2">
                              <div className="text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  className="float-left mt-1 mr-1"
                                >
                                  <g clip-path="url(#clip0_8695_85183)">
                                    <path
                                      d="M1.83329 11.8714L1.66597 12.5H1.61437L1.46496 12.6709C1.28453 12.8773 1.02001 13 0.5 13C0.786495 13 1.07496 12.9255 1.3216 12.7114C1.55406 12.5097 1.69919 12.2266 1.80061 11.9108C1.98131 11.3482 2.0766 10.5014 2.14511 9.30655C2.07907 10.4598 1.98922 11.2856 1.83329 11.8714ZM13.3341 12.5L13.1668 11.8714C13.0116 11.2881 12.9219 10.4668 12.856 9.32112C12.9244 10.5084 13.0196 11.3506 13.1995 11.9109C13.3009 12.2267 13.446 12.5097 13.6785 12.7115C13.9251 12.9255 14.2135 13 14.5 13C13.98 13 13.7155 12.8773 13.5351 12.6709L13.3857 12.5H13.3341ZM9.16991 2.15599C9.11224 2.14426 9.05394 2.13321 8.99502 2.12284C8.99832 2.08231 9 2.04134 9 2C9 1.53439 8.78786 1.11833 8.45496 0.843203C8.7361 1.07548 8.93117 1.40817 8.98495 1.78625L9.0329 2.12336L9.16991 2.15599ZM11.2291 3.09283C11.1562 3.031 11.0809 2.97201 11.003 2.91579C11.1942 3.05257 11.3672 3.20375 11.5226 3.36876C12.0392 3.91754 12.3892 4.64929 12.5433 5.58931C12.3734 4.55292 11.9508 3.70538 11.2291 3.09283ZM6 2C6 2.04135 6.00168 2.08234 6.00499 2.1229C5.94616 2.13325 5.88796 2.14428 5.83038 2.15599L5.96711 2.12342L6.01504 1.78632C6.06858 1.40978 6.26228 1.07824 6.54156 0.846086C6.21067 1.12123 6 1.53601 6 2ZM3.99692 2.91612C3.91918 2.97226 3.84391 3.03118 3.77116 3.09293C3.04953 3.70547 2.627 4.55297 2.45707 5.58931C2.6112 4.64935 2.96108 3.91763 3.47771 3.36887C3.63298 3.20395 3.80586 3.05283 3.99692 2.91612ZM8.91465 14.5C8.70873 15.0826 8.15311 15.5 7.5 15.5C6.84689 15.5 6.29127 15.0826 6.08535 14.5H8.91465Z"
                                      fill="#FFCB03"
                                      stroke="#FFCB03"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_8695_85183">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span>Partner will be notified</span>
                              </div>
                              <button
                                className="border border-gray-500 text-white bg-none hover:bg-gray-800 p-6 py-2 rounded-full"
                                onClick={() => {
                                  setDeclineGracePeriodDoc(false);
                                }}
                              >
                                Cancel
                              </button>

                              {sendAction ? (
                                <TailSpinPreloader
                                  width={40}
                                  height={40}
                                  fill="#efb703"
                                />
                              ) : (
                                <button
                                  className="border border-[#FE6D6C] text-white bg-none hover:bg-gray-800 p-6 py-2 rounded-full"
                                  onClick={_declineGracePeriod}
                                >
                                  Decline
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                {selectedRequest.status === "approved" && (
                  <div className="flex flex-row gap-3 w-[100%]">
                    <p className="text-[10px] text-gray-400 w-[100%]">
                      <span className="text-[#2C9958]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="float-left mt-1 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.74875 10.7475C8.50948 10.7475 10.7475 8.50948 10.7475 5.74875C10.7475 2.98802 8.50948 0.75 5.74875 0.75C2.98802 0.75 0.75 2.98802 0.75 5.74875C0.75 8.50948 2.98802 10.7475 5.74875 10.7475ZM8.58247 3.85827C8.76383 4.04292 8.76115 4.33963 8.5765 4.52099L5.39548 7.6452C5.21317 7.82425 4.92103 7.82425 4.73873 7.6452L2.921 5.85994C2.73635 5.67858 2.73367 5.38187 2.91503 5.19722C3.09639 5.01256 3.3931 5.00989 3.57775 5.19125L5.0671 6.654L7.91975 3.8523C8.1044 3.67094 8.40111 3.67361 8.58247 3.85827Z"
                            fill="#2C9958"
                          />
                        </svg>
                        Approved
                      </span>{" "}
                      on {actionDate(selectedRequest.approved_on)}
                    </p>
                  </div>
                )}

                {selectedRequest.status === "rejected" && (
                  <div className="flex flex-row gap-3 w-[100%]">
                    <p className="text-[10px] text-gray-400 w-[100%]">
                      <span className="text-[#AD2B19]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="float-left mt-1 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.74875 10.7475C8.50948 10.7475 10.7475 8.50948 10.7475 5.74875C10.7475 2.98802 8.50948 0.75 5.74875 0.75C2.98802 0.75 0.75 2.98802 0.75 5.74875C0.75 8.50948 2.98802 10.7475 5.74875 10.7475ZM8.58247 3.85827C8.76383 4.04292 8.76115 4.33963 8.5765 4.52099L5.39548 7.6452C5.21317 7.82425 4.92103 7.82425 4.73873 7.6452L2.921 5.85994C2.73635 5.67858 2.73367 5.38187 2.91503 5.19722C3.09639 5.01256 3.3931 5.00989 3.57775 5.19125L5.0671 6.654L7.91975 3.8523C8.1044 3.67094 8.40111 3.67361 8.58247 3.85827Z"
                            fill="#FE9D8F"
                          />
                        </svg>
                        1 issue
                      </span>{" "}
                      Awaiting resolution .{" "}
                      {actionDate(selectedRequest.rejected_on)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>



            { fileViewer && 
                <FileViewer id="file_viewer" link={fileViewer} closeAction={() => setFileViewer(null)} />
            }

      <Success
        message={successMessage}
        visible={successToast}
        action={successAction}
      />
    </>
  );
};

export const LicenseRenewalAdminFlyout = ({
  closeLicenseRenewalFlyout,
  selectedRequest,
  successAction,
}) => {
  const states = useStoreState((state) => state);
  const [tab, setTab] = useState({
    overview: true,
    activity: false,
  });

  const [fileViewer, setFileViewer] = useState(null);
  const [decline, setDecline] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sendAction, setSendAction] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  let [formData, setFormData] = useState({
    license_renewal_request_uuid: selectedRequest.uuid,
    partner_uuid: selectedRequest.partner_uuid,
    status: "",
    rejection_reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const _decline = () => {
    clearError();
    const rejection_reason = formData.rejection_reason;
    if (rejection_reason === "") {
      setErrorMessage("Select the reason for rejection.");
    } else {
      formData.status = "rejected";
      _action();
    }
  };

  const _approve = () => {
    clearError();
    formData.status = "approved";
    formData.rejection_reason = "Approved";
    _action();
  };

  const _action = async (e) => {
    try {
      setSendAction(true);
      const response = await axios.post(
        RemoteEndpoints.APPROVE_REJECT_LICENSE_RENEWAL_REQUEST,
        formData,
        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.admins.token}`,
          },
        }
      );
      setSuccessMessage(response.data.data.message);
      setSuccessToast(true);
    } catch (err) {
      setSendAction(false);
      setErrorMessage(err.response.data.data.message);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <main
        id="GracePeriod_flyout"
        className="w-screen h-screen fixed z-[1000] top-0 left-0 bg-black/80 flex justify-right animate-[fade-in_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "GracePeriod_flyout" && closeLicenseRenewalFlyout();
        }}
      >
        <div className="w-[475px] h-screen fixed right-0  top-0 bg-[#111111] animate-[slide-left_1s_ease-in-out]">
          <div className="p-5">
            <div className="h-[40px] flex flex-row justify-between ">
              <div className="flex gap-3 flex-wrap h-[40px] items-center">
                <div className="h-[40px] w-[40px] rounded-[100%] border border-white/20 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.5 8.99998C19.5 8.77748 19.566 8.55997 19.6896 8.37497C19.8132 8.18996 19.9889 8.04577 20.1945 7.96062C20.4 7.87547 20.6262 7.85319 20.8445 7.8966C21.0627 7.94001 21.2631 8.04716 21.4205 8.20449C21.5778 8.36182 21.685 8.56228 21.7284 8.78051C21.7718 8.99874 21.7495 9.22494 21.6644 9.4305C21.5792 9.63607 21.435 9.81177 21.25 9.93539C21.065 10.059 20.8475 10.125 20.625 10.125C20.3266 10.125 20.0405 10.0065 19.8295 9.79548C19.6185 9.5845 19.5 9.29835 19.5 8.99998ZM18.375 6.74998C18.5975 6.74998 18.815 6.684 19 6.56039C19.185 6.43677 19.3292 6.26107 19.4144 6.0555C19.4995 5.84994 19.5218 5.62374 19.4784 5.40551C19.435 5.18728 19.3278 4.98682 19.1705 4.82949C19.0131 4.67216 18.8127 4.56501 18.5945 4.5216C18.3762 4.47819 18.15 4.50047 17.9445 4.58562C17.7389 4.67077 17.5632 4.81496 17.4396 4.99997C17.316 5.18497 17.25 5.40248 17.25 5.62498C17.25 5.92335 17.3685 6.2095 17.5795 6.42048C17.7905 6.63146 18.0766 6.74998 18.375 6.74998ZM21.0619 12C20.8637 11.9836 20.6672 12.0467 20.5155 12.1752C20.3638 12.3037 20.2693 12.4872 20.2528 12.6853C20.1186 14.2532 19.5393 15.7502 18.5832 17.0001C17.6271 18.25 16.3338 19.2008 14.8557 19.7406C13.3775 20.2805 11.7759 20.3869 10.2393 20.0474C8.70267 19.7078 7.295 18.9365 6.18191 17.8241C5.06881 16.7117 4.29658 15.3045 3.95609 13.7681C3.61561 12.2318 3.72102 10.6301 4.25993 9.15157C4.79884 7.67306 5.74883 6.37923 6.99812 5.42231C8.24741 4.46539 9.74402 3.88519 11.3119 3.74998C11.4104 3.74186 11.5063 3.71441 11.5942 3.66922C11.6821 3.62402 11.7602 3.56195 11.8241 3.48656C11.888 3.41117 11.9364 3.32394 11.9666 3.22983C11.9968 3.13573 12.0081 3.0366 12 2.93811C11.9919 2.83962 11.9644 2.74369 11.9192 2.65581C11.874 2.56792 11.812 2.4898 11.7366 2.4259C11.6612 2.362 11.5739 2.31358 11.4798 2.2834C11.3857 2.25321 11.2866 2.24186 11.1881 2.24998C9.33564 2.40933 7.5672 3.09443 6.09087 4.22469C4.61453 5.35496 3.49172 6.88336 2.85452 8.63008C2.21732 10.3768 2.09224 12.2692 2.49401 14.0846C2.89577 15.9 3.80767 17.5628 5.1224 18.8776C6.43714 20.1923 8.10002 21.1042 9.91541 21.506C11.7308 21.9077 13.6232 21.7827 15.3699 21.1455C17.1166 20.5083 18.645 19.3854 19.7753 17.9091C20.9055 16.4328 21.5906 14.6643 21.75 12.8119C21.7585 12.7133 21.7473 12.614 21.7173 12.5198C21.6872 12.4256 21.6388 12.3382 21.5749 12.2627C21.5109 12.1873 21.4327 12.1252 21.3446 12.0801C21.2566 12.035 21.1605 12.0078 21.0619 12ZM12 5.24998C13.335 5.24998 14.6401 5.64586 15.7501 6.38756C16.8601 7.12926 17.7253 8.18347 18.2362 9.41687C18.7471 10.6503 18.8807 12.0075 18.6203 13.3168C18.3598 14.6262 17.717 15.8289 16.773 16.773C15.829 17.717 14.6262 18.3598 13.3168 18.6203C12.0075 18.8807 10.6503 18.7471 9.41687 18.2362C8.18347 17.7253 7.12927 16.8601 6.38757 15.7501C5.64587 14.6401 5.24999 13.335 5.24999 12C5.25197 10.2104 5.96377 8.49465 7.22921 7.22921C8.49465 5.96377 10.2104 5.25197 12 5.24998ZM11.25 12C11.25 12.1989 11.329 12.3897 11.4697 12.5303C11.6103 12.671 11.8011 12.75 12 12.75H16.5C16.6989 12.75 16.8897 12.671 17.0303 12.5303C17.171 12.3897 17.25 12.1989 17.25 12C17.25 11.8011 17.171 11.6103 17.0303 11.4697C16.8897 11.329 16.6989 11.25 16.5 11.25H12.75V7.49998C12.75 7.30107 12.671 7.11031 12.5303 6.96965C12.3897 6.829 12.1989 6.74998 12 6.74998C11.8011 6.74998 11.6103 6.829 11.4697 6.96965C11.329 7.11031 11.25 7.30107 11.25 7.49998V12ZM15 4.49998C15.2225 4.49998 15.44 4.434 15.625 4.31039C15.81 4.18677 15.9542 4.01107 16.0394 3.8055C16.1245 3.59994 16.1468 3.37374 16.1034 3.15551C16.06 2.93728 15.9528 2.73682 15.7955 2.57949C15.6381 2.42216 15.4377 2.31501 15.2195 2.2716C15.0012 2.22819 14.775 2.25047 14.5695 2.33562C14.3639 2.42077 14.1882 2.56496 14.0646 2.74997C13.941 2.93497 13.875 3.15248 13.875 3.37498C13.875 3.67335 13.9935 3.9595 14.2045 4.17048C14.4155 4.38146 14.7016 4.49998 15 4.49998Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h2 className="text-white">License Renewal</h2>
              </div>

              <button
                className="h-[40px] w-[40px] flex justify-center items-center text-[18px] rounded-[100%] hover:bg-white/20 transition ease-in-out delay-150"
                onClick={() => closeLicenseRenewalFlyout()}
              >
                X
              </button>
            </div>
          </div>

          <div className="px-5 border-b border-white/20 flex gap-5">
            <button
              className={`${
                tab.overview
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.overview) {
                  setTab({
                    ...tab,
                    overview: true,
                    activity: false,
                  });
                }
              }}
            >
              Overview
            </button>

            <button
              className={`${
                tab.activity
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.activity) {
                  setTab({
                    ...tab,
                    overview: false,
                    activity: true,
                  });
                }
              }}
            >
              Activity
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-row gap-3">
              <div className="h-[50px] w-[50px] bg-white/10 rounded-[5px] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9.24751 9.11244L7.39501 10.9649C6.36751 11.9924 6.36751 13.6499 7.39501 14.6774C8.42251 15.7049 10.08 15.7049 11.1075 14.6774L14.025 11.7599C16.0725 9.71244 16.0725 6.38244 14.025 4.33494C11.9775 2.28744 8.64751 2.28744 6.60001 4.33494L3.42001 7.51494C1.66501 9.26994 1.66501 12.1199 3.42001 13.8824"
                    stroke="#888888"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2  w-[100%]">
                <h3 className="text-white text-[14px]">VAS License</h3>
                <div className="rounded-[3px] p-2  text-gray-400 text-[14px] border border-white/10 w-[100%] flex flex-row justify-between ">
                  <div className="flex gap-3 min-h-[20px] flex-wrap">
                    <div className="h-[20px] w-[20px flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.8 0C11.074 0 11.337 0.113 11.526 0.312L14.726 3.74C14.902 3.926 15 4.173 15 4.429V15C15 15.552 14.552 16 14 16H2C1.448 16 1 15.552 1 15V1C1 0.448 1.448 0 2 0H10.8ZM14 5H10.5C10.224 5 10 4.776 10 4.5V1H2V15H14V5ZM5.5 12C5.22386 12 5 11.7761 5 11.5C5 11.2239 5.22386 11 5.5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5.5ZM5.5 9C5.22386 9 5 8.77614 5 8.5C5 8.22386 5.22386 8 5.5 8H10.5C10.7761 8 11 8.22386 11 8.5C11 8.77614 10.7761 9 10.5 9H5.5Z"
                          fill="#999999"
                        />
                      </svg>
                    </div>
                    <p className="text-white text-[10px]">
                      {selectedRequest.file_name}
                    </p>
                  </div>
                  <button
                    className="h-[20px] w-[20px] flex justify-center items-center text-[18px]"
                    onClick={() => {
                      setFileViewer(selectedRequest?.file_path)
                    }}
                    title="Open"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M6.5 5.4999L10.6 1.3999"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 3.4V1H8.59998"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5"
                        stroke="#E4B809"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {selectedRequest.status != "approved" &&
                  selectedRequest.status != "rejected" && (
                    <>
                      {!decline ? (
                        <div className="flex flex-row gap-3 w-[100%]">
                          {sendAction ? (
                            <TailSpinPreloader
                              width={40}
                              height={40}
                              fill="#efb703"
                            />
                          ) : (
                            <button
                              className="flex text-[12px] leading-[20px] gap-2 text-white hover:text-gray-400"
                              title="Approve"
                              onClick={_approve}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.8313 5.95628L7.83128 15.9563C7.74339 16.0441 7.62425 16.0934 7.50003 16.0934C7.37581 16.0934 7.25667 16.0441 7.16878 15.9563L2.79378 11.5813C2.71098 11.4924 2.6659 11.3749 2.66804 11.2535C2.67018 11.132 2.71938 11.0161 2.80526 10.9303C2.89115 10.8444 3.00701 10.7952 3.12845 10.793C3.24989 10.7909 3.36742 10.836 3.45628 10.9188L7.50003 14.9617L17.1688 5.29378C17.2576 5.21098 17.3752 5.1659 17.4966 5.16804C17.618 5.17018 17.7339 5.21938 17.8198 5.30526C17.9057 5.39115 17.9549 5.50701 17.957 5.62845C17.9592 5.74989 17.9141 5.86742 17.8313 5.95628Z"
                                  fill="#4DCD97"
                                />
                              </svg>
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            className="flex text-[12px] leading-[20px] gap-2 text-white hover:text-gray-400"
                            title="Decline"
                            onClick={() => {
                              setDecline(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M15.9563 15.2938C16.0023 15.3367 16.0393 15.3884 16.0649 15.4459C16.0905 15.5034 16.1043 15.5655 16.1054 15.6284C16.1065 15.6914 16.0949 15.7539 16.0714 15.8123C16.0478 15.8706 16.0127 15.9237 15.9682 15.9682C15.9237 16.0127 15.8706 16.0478 15.8123 16.0714C15.7539 16.0949 15.6914 16.1065 15.6284 16.1054C15.5655 16.1043 15.5034 16.0905 15.4459 16.0649C15.3884 16.0393 15.3367 16.0023 15.2938 15.9563L10 10.6633L4.70628 15.9563C4.61742 16.0391 4.49989 16.0842 4.37845 16.082C4.25701 16.0799 4.14115 16.0307 4.05526 15.9448C3.96938 15.8589 3.92018 15.743 3.91804 15.6216C3.9159 15.5002 3.96098 15.3826 4.04378 15.2938L9.33674 10L4.04378 4.70628C3.96098 4.61742 3.9159 4.49989 3.91804 4.37845C3.92018 4.25701 3.96938 4.14115 4.05526 4.05526C4.14115 3.96938 4.25701 3.92018 4.37845 3.91804C4.49989 3.9159 4.61742 3.96098 4.70628 4.04378L10 9.33674L15.2938 4.04378C15.3826 3.96098 15.5002 3.9159 15.6216 3.91804C15.743 3.92018 15.8589 3.96938 15.9448 4.05526C16.0307 4.14115 16.0799 4.25701 16.082 4.37845C16.0842 4.49989 16.0391 4.61742 15.9563 4.70628L10.6633 10L15.9563 15.2938Z"
                                fill="#FE9D8F"
                              />
                            </svg>
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <>
                          {errorMessage && (
                            <p className="text-red-500 text-sm font-italic">
                              {errorMessage}
                            </p>
                          )}

                          <div className="rounded-[3px]  text-white text-[12px] border border-white/10 w-[100%]">
                            <div className="p-2 flex flex-col gap-2">
                              <h3 className="text-gray-600">DECLINE REASON</h3>
                              <form>
                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Incomplete Information</p>
                                    <input
                                      type="radio"
                                      value="Incomplete Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Incorrect Information</p>
                                    <input
                                      type="radio"
                                      value="Incorrect Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Inconsistent Information</p>
                                    <input
                                      type="radio"
                                      value="Inconsistent Information"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Invalid or Expired Document</p>
                                    <input
                                      type="radio"
                                      value="Invalid or Expired Document"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div>

                                <div className="p-2 hover:bg-white/10 cursor-pointer rounded-[3px] transition ease-in-out delay-150">
                                  <label className="flex justify-between cursor-pointer">
                                    <p>Poor Quality (Contents Not Clear)</p>
                                    <input
                                      type="radio"
                                      value="Poor Quality (Contents Not Clear)"
                                      name="rejection_reason"
                                      onChange={handleChange}
                                      className="h-4 w-4 bg-black/40 cursor-pointer outline-none appearance-none"
                                    />
                                  </label>
                                </div> 
                              </form>
                            </div>

                            <div className="px-2 py-5 border-t border-white/20 flex items-center gap-2">
                              <div className="text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  className="float-left mt-1 mr-1"
                                >
                                  <g clip-path="url(#clip0_8695_85183)">
                                    <path
                                      d="M1.83329 11.8714L1.66597 12.5H1.61437L1.46496 12.6709C1.28453 12.8773 1.02001 13 0.5 13C0.786495 13 1.07496 12.9255 1.3216 12.7114C1.55406 12.5097 1.69919 12.2266 1.80061 11.9108C1.98131 11.3482 2.0766 10.5014 2.14511 9.30655C2.07907 10.4598 1.98922 11.2856 1.83329 11.8714ZM13.3341 12.5L13.1668 11.8714C13.0116 11.2881 12.9219 10.4668 12.856 9.32112C12.9244 10.5084 13.0196 11.3506 13.1995 11.9109C13.3009 12.2267 13.446 12.5097 13.6785 12.7115C13.9251 12.9255 14.2135 13 14.5 13C13.98 13 13.7155 12.8773 13.5351 12.6709L13.3857 12.5H13.3341ZM9.16991 2.15599C9.11224 2.14426 9.05394 2.13321 8.99502 2.12284C8.99832 2.08231 9 2.04134 9 2C9 1.53439 8.78786 1.11833 8.45496 0.843203C8.7361 1.07548 8.93117 1.40817 8.98495 1.78625L9.0329 2.12336L9.16991 2.15599ZM11.2291 3.09283C11.1562 3.031 11.0809 2.97201 11.003 2.91579C11.1942 3.05257 11.3672 3.20375 11.5226 3.36876C12.0392 3.91754 12.3892 4.64929 12.5433 5.58931C12.3734 4.55292 11.9508 3.70538 11.2291 3.09283ZM6 2C6 2.04135 6.00168 2.08234 6.00499 2.1229C5.94616 2.13325 5.88796 2.14428 5.83038 2.15599L5.96711 2.12342L6.01504 1.78632C6.06858 1.40978 6.26228 1.07824 6.54156 0.846086C6.21067 1.12123 6 1.53601 6 2ZM3.99692 2.91612C3.91918 2.97226 3.84391 3.03118 3.77116 3.09293C3.04953 3.70547 2.627 4.55297 2.45707 5.58931C2.6112 4.64935 2.96108 3.91763 3.47771 3.36887C3.63298 3.20395 3.80586 3.05283 3.99692 2.91612ZM8.91465 14.5C8.70873 15.0826 8.15311 15.5 7.5 15.5C6.84689 15.5 6.29127 15.0826 6.08535 14.5H8.91465Z"
                                      fill="#FFCB03"
                                      stroke="#FFCB03"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_8695_85183">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span>Partner will be notified</span>
                              </div>
                              <button
                                className="border border-gray-500 text-white bg-none hover:bg-gray-800 p-6 py-2 rounded-full"
                                onClick={() => {
                                  setDecline(false);
                                }}
                              >
                                Cancel
                              </button>

                              {sendAction ? (
                                <TailSpinPreloader
                                  width={40}
                                  height={40}
                                  fill="#efb703"
                                />
                              ) : (
                                <button
                                  className="border border-[#FE6D6C] text-white bg-none hover:bg-gray-800 p-6 py-2 rounded-full"
                                  onClick={_decline}
                                >
                                  Decline
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}

                {selectedRequest.status === "approved" && (
                  <div className="flex flex-row gap-3 w-[100%]">
                    <p className="text-[10px] text-gray-400 w-[100%]">
                      <span className="text-[#2C9958]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="float-left mt-1 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.74875 10.7475C8.50948 10.7475 10.7475 8.50948 10.7475 5.74875C10.7475 2.98802 8.50948 0.75 5.74875 0.75C2.98802 0.75 0.75 2.98802 0.75 5.74875C0.75 8.50948 2.98802 10.7475 5.74875 10.7475ZM8.58247 3.85827C8.76383 4.04292 8.76115 4.33963 8.5765 4.52099L5.39548 7.6452C5.21317 7.82425 4.92103 7.82425 4.73873 7.6452L2.921 5.85994C2.73635 5.67858 2.73367 5.38187 2.91503 5.19722C3.09639 5.01256 3.3931 5.00989 3.57775 5.19125L5.0671 6.654L7.91975 3.8523C8.1044 3.67094 8.40111 3.67361 8.58247 3.85827Z"
                            fill="#2C9958"
                          />
                        </svg>
                        Approved
                      </span>{" "}
                      on {actionDate(selectedRequest.approved_on)}
                    </p>
                  </div>
                )}

                {selectedRequest.status === "rejected" && (
                  <div className="flex flex-row gap-3 w-[100%]">
                    <p className="text-[10px] text-gray-400 w-[100%]">
                      <span className="text-[#AD2B19]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="float-left mt-1 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.74875 10.7475C8.50948 10.7475 10.7475 8.50948 10.7475 5.74875C10.7475 2.98802 8.50948 0.75 5.74875 0.75C2.98802 0.75 0.75 2.98802 0.75 5.74875C0.75 8.50948 2.98802 10.7475 5.74875 10.7475ZM8.58247 3.85827C8.76383 4.04292 8.76115 4.33963 8.5765 4.52099L5.39548 7.6452C5.21317 7.82425 4.92103 7.82425 4.73873 7.6452L2.921 5.85994C2.73635 5.67858 2.73367 5.38187 2.91503 5.19722C3.09639 5.01256 3.3931 5.00989 3.57775 5.19125L5.0671 6.654L7.91975 3.8523C8.1044 3.67094 8.40111 3.67361 8.58247 3.85827Z"
                            fill="#FE9D8F"
                          />
                        </svg>
                        1 issue
                      </span>{" "}
                      Awaiting resolution .{" "}
                      {actionDate(selectedRequest.rejected_on)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      { fileViewer && 
                <FileViewer id="file_viewer" link={fileViewer} closeAction={() => setFileViewer(null)} />
            }

      <Success
        message={successMessage}
        visible={successToast}
        action={successAction}
      />
    </>
  );
};
