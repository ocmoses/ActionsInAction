"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import { getFileSizeText } from "@/app/modules/utilities";
import {FileUploadIcon, FileUploadActiveIcon, InfoIcon,} from "@/app/components/Icons";
import { TailSpinPreloader } from "@/app/components/Icons";
import usePartners from "@/hooks/usePartners";
import { useStoreState } from "easy-peasy";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import RemoteEndpoints from "@/app/modules/endpoints";

export default function GracePeriodExtensionForm({closePopUp, submitGracePeriodForm,}) {
  const {partner} = usePartners();
  const states = useStoreState((state) => state);

  const [doc, setDoc] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);
  const [formData, setFormData] = useState({
    partner_uuid: partner?.uuid,
    file: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      clearError();
      if (fileSize <= 0) {
        setErrorMessage("Upload  Proof of Renewal!");
      } else {
        setSendAction(true);
        const formDataToSend = new FormData();
        formDataToSend.append("partner_uuid", formData.partner_uuid);
        formDataToSend.append("file", formData.file);
        formDataToSend.append("indemnity_clause", formData.indemnity_clause);

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
        console.log("response data", response);
        if (response?.success) {
          submitGracePeriodForm();
        }else{
          setErrorMessage(response.data.message);
        }
      }
    } catch (err) {
      console.log(err)
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
          onClick={closePopUp}
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
}

export const GracePeriodSuccess = ({ closePopUp }) => {
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

export const GracePeriodRejectedAlert = ({ openGracePeriodForm, licenseValidityDays }) => {
  //console.log({ rejected });
  return (
    <>
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
                <p>
                  <span className="text-white">
                    Your license expires in {licenseValidityDays} days{" "}
                  </span>
                  <br />
                  Upload your renewed license to avoid service distruption. If
                  your renewal is still in progress, apply for an extension.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={openGracePeriodForm}
                  className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                >
                  Extend Expiration
                </button>
                <button className="h-[40px] w-[200px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30">
                  Upload new license
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
