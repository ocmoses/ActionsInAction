"use client";
import { useState, useEffect } from "react";
import usePartners from "@/hooks/usePartners";
import UserPercentage from "@/app/components/UserPercentage";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";
import TextInput from "@/app/components/form/TextInput";
import { getFileSizeText } from "@/app/modules/utilities";
import {
  FileUploadIcon,
  FileUploadActiveIcon,
  InfoIcon,
  Loading,
} from "@/app/components/Icons";
import { TailSpinPreloader } from "@/app/components/Icons";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";

export default function IntelectualPropertiesModal({
  closeIntelectualPropertiesFlyout,
  partnerDetails,
}) {
  const [delayedExecution, setDelayedExecution] = useState(false);
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayedExecution(true);
    }, 2000);
    return () => clearTimeout(delayTimer);
  }, []);

  const [currentPanel, setCurrentPanel] = useState({
    NCCLicensedetails: true,
    NLRCLicensedetails: false,
    ShortCodeDetais: false,
    ReviewAndSubmit: false,
  });

  return (
    <>
      <main className="w-screen h-screen flex items-start justify-start fixed top-0 left-0 z-[2000] bg-[#030303] animate-[slide-down-fade_1s_ease-in-out]">
        <IntelectualPropertiesNav
          closeIntelectualPropertiesFlyout={
            closeIntelectualPropertiesFlyout
          }
          partnerDetails={partnerDetails}
        />

        <div className="absolute top-[50px] flex flex-col  h-screen w-screen">
          {!delayedExecution ? (
            <Loading style="h-[500px]" />
          ) : (
            <>
              <IntelectualPropertiesProgressiveNav
                closeIntelectualPropertiesFlyout={
                  closeIntelectualPropertiesFlyout
                }
                partnerDetails={partnerDetails}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />

              <div className="w-[100%] h-[calc(100%-90px)] absolute bottom-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
                <div className="pt-[50px] w-[100%] h-auto flex justify-center">
                  {currentPanel.NCCLicensedetails && (
                    <NCCLicensedetails
                    closeIntelectualPropertiesFlyout={
                      closeIntelectualPropertiesFlyout
                      }
                      partnerDetails={partnerDetails}
                      currentPanel={currentPanel}
                      setCurrentPanel={setCurrentPanel}
                    />
                  )}

                  {currentPanel.NLRCLicensedetails && (
                    <NLRCLicensedetails
                    closeIntelectualPropertiesFlyout={
                      closeIntelectualPropertiesFlyout
                      }
                      partnerDetails={partnerDetails}
                      currentPanel={currentPanel}
                      setCurrentPanel={setCurrentPanel}
                    />
                  )}

                  {currentPanel.ShortCodeDetais && (
                    <ShortCodeDetais
                    closeIntelectualPropertiesFlyout={
                      closeIntelectualPropertiesFlyout
                      }
                      partnerDetails={partnerDetails}
                      currentPanel={currentPanel}
                      setCurrentPanel={setCurrentPanel}
                    />
                  )}

                  {currentPanel.ReviewAndSubmit && (
                    <ReviewAndSubmit
                    closeIntelectualPropertiesFlyout={
                      closeIntelectualPropertiesFlyout
                      }
                      partnerDetails={partnerDetails}
                      currentPanel={currentPanel}
                      setCurrentPanel={setCurrentPanel}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export const IntelectualPropertiesNav = ({
  closeIntelectualPropertiesFlyout,
  partnerDetails,
}) => {
  return (
    <header className=" flex justify-between items-center h-[64px] px-4 pt-4 pb-2 m-0 w-screen mx-auto z-20 border-b border-b-white/20 bg-[#030303]">
      <div
        onClick={closeIntelectualPropertiesFlyout}
        className="flex justify-start items-center text-md group cursor-pointer "
      >
        <div className="flex-1 flex items-center">
          <span className="text-[#999999] group-hover:!text-white">
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
        </div>

        <div className="flex gap-5 justify-start  items-center text-white px-3 py-2">
          <span className="hidden sm:flex text-[#999999] group-hover:!text-white">
            Go Back:
          </span>
          <span className="font-bold">Intelectual Properties Detail</span>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 text-white px-3">
        <span
          onClick={closeIntelectualPropertiesFlyout}
          className="hidden sm:flex text-[12px] px-3 py-1 border border-white/40 hover:border-white/60 text-white/40 hover:text-white/60 rounded-full cursor-pointer"
        >
          Exit
          {/* Save and exit */}
        </span>
      </div>
    </header>
  );
};

export const IntelectualPropertiesProgressiveNav = ({
  closeIntelectualPropertiesFlyout,
  partnerDetails,
  currentPanel,
  setCurrentPanel,
}) => {

  return (
    <>
      <nav className="w-[100%] min-h-[90px] absolute bg-white/5 animate-[slide-right_1s_ease-in-out]">
          <div className="min-h-[90px] w-[70%] flex gap-3 justify-center items-center m-auto">
            <li
              className="w-[18%] min-h-[50px] flex gap-3 items-center group cursor-pointer"
              onClick={() => {
                if (!currentPanel.NCCLicensedetails) {
                  setCurrentPanel({
                    ...currentPanel,
                    NCCLicensedetails: true,
                    NLRCLicensedetails: false,
                    ShortCodeDetais: false,
                    ReviewAndSubmit: false,
                  });
                }
              }}
            >
              <div
                className={`h-[40px] w-[40px] rounded-full bg-white/10  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.NCCLicensedetails ? "border border-mtn-400" : ""
                } `}
              >
                1
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.NCCLicensedetails ? "text-mtn-400" : ""
                } `}
              >
                Service detail
              </p>
            </li>

            <div className="bg-white/10 h-[1px] w-[9%]"></div>

            <li
              className="w-[18%] min-h-[50px] flex gap-3 items-center group cursor-pointer"
              onClick={() => {
                if (!currentPanel.NLRCLicensedetails) {
                  setCurrentPanel({
                    ...currentPanel,
                    NCCLicensedetails: false,
                    NLRCLicensedetails: true,
                    ShortCodeDetais: false,
                    ReviewAndSubmit: false,
                  });
                }
              }}
            >
              <div
                className={`h-[40px] w-[40px] rounded-full   bg-white/10 group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.NLRCLicensedetails ? "border border-mtn-400" : ""
                } `}
              >
                2
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.NLRCLicensedetails ? "text-mtn-400" : ""
                } `}
              >
                Licensing party
              </p>
            </li>

            <div className="bg-white/10 h-[1px] w-[9%]"></div>

            <li
              className="w-[18%] min-h-[50px] flex gap-2 items-center group cursor-pointer"
              onClick={() => {
                if (!currentPanel.ShortCodeDetais) {
                  setCurrentPanel({
                    ...currentPanel,
                    NCCLicensedetails: false,
                    NLRCLicensedetails: false,
                    ShortCodeDetais: true,
                    ReviewAndSubmit: false,
                  });
                }
              }}
            >
              <div
                className={`h-[40px] w-[40px] rounded-full  bg-white/10 group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.ShortCodeDetais ? "border border-mtn-400" : ""
                } `}
              >
                3
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.ShortCodeDetais ? "text-mtn-400" : ""
                } `}
              >
                VAS IP details
              </p>
            </li>

            <div className="bg-white/10 h-[1px] w-[9%]"></div>

            <li
              className="w-[16%] min-h-[50px] flex gap-3 items-center group cursor-pointer"
              onClick={() => {
                if (!currentPanel.ReviewAndSubmit) {
                  setCurrentPanel({
                    ...currentPanel,
                    NCCLicensedetails: false,
                    NLRCLicensedetails: false,
                    ShortCodeDetais: false,
                    ReviewAndSubmit: true,
                  });
                }
              }}
            >
              <div
                className={`h-[40px] w-[40px] rounded-full bg-white/10 group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.ReviewAndSubmit ? "border border-mtn-400" : ""
                } `}
              >
                4
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.ReviewAndSubmit ? "text-mtn-400" : ""
                } `}
              >
                IP details
              </p>
            </li>
          </div>
      </nav>
    </>
  );
};

export const NCCLicensedetails = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
  currentPanel,
  setCurrentPanel,
}) => {
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const [formData, setFormData] = useState({
    partner_uuid: null,
    file: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);

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

  return (
    <>
      <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out]">
        <div className="mb-5 w-full flex flex-col gap-3">
          <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
            Your company's NCC License details
          </h1>
          <p>Let’s get you started, Choose a partner category</p>
        </div>

        <TextInput
          id="vas_license_id"
          label="VAS License ID"
          type="text"
          name="vas_license_id"
        />

        <div className="flex gap-3">
          <div className="w-[50%]">
            <TextInput
              id="license_issue_date"
              label="Issuing Date"
              type="date"
              name="license_issue_date"
            />
          </div>
          <div className="w-[50%]">
            <TextInput
              id="license_expiring_date"
              label="Expiry Date"
              type="date"
              name="license_expiring_date"
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

        <div className="flex gap-2 justify-start mt-4">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={closeAggregatorComplianceFormFlyout}
          >
            &lt; Back
          </button>

          <button
            className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                NCCLicensedetails: false,
                NLRCLicensedetails: true,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export const NLRCLicensedetails = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
  currentPanel,
  setCurrentPanel,
}) => {
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const [formData, setFormData] = useState({
    partner_uuid: null,
    file: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);

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

  return (
    <>
      <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out]">
        <div className="mb-5 w-full flex flex-col gap-3">
          <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
            Provide your company's NLRC License details
          </h1>
        </div>

        <SelectInput
          id="subject"
          label="Licence Type"
          name="subject"
        ></SelectInput>

        <TextInput
          id="vas_license_id"
          label="NLRC License ID"
          type="text"
          name="vas_license_id"
        />

        <div className="flex gap-3">
          <div className="w-[50%]">
            <TextInput
              id="license_issue_date"
              label="Issuing Date"
              type="date"
              name="license_issue_date"
            />
          </div>
          <div className="w-[50%]">
            <TextInput
              id="license_expiring_date"
              label="Expiry Date"
              type="date"
              name="license_expiring_date"
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
                            NLRC VAS License
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

        <div className="flex gap-2 justify-start mt-4">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                NCCLicensedetails: true,
                NLRCLicensedetails: false,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          >
            &lt; Back
          </button>

          <button
            className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                NCCLicensedetails: false,
                NLRCLicensedetails: false,
                ShortCodeDetais: true,
                ReviewAndSubmit: false,
              });
            }}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export const ShortCodeDetais = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
  currentPanel,
  setCurrentPanel,
}) => {
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const [formData, setFormData] = useState({
    partner_uuid: null,
    file: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [sendAction, setSendAction] = useState(false);

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

  return (
    <>
      <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out] flex flex-col gap-3">
        <div className="mb-5 w-full flex flex-col gap-3">
          <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
            Provide your company's short code details
          </h1>
          <p>Let’s get you started, Choose a partner category</p>
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
                            Short Code Document
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

        <div className="flex gap-3 mb-[-20px]">
          <div className="w-[50%]">
            <TextInput
              id="license_issue_date"
              label="Issuing Date"
              type="date"
              name="license_issue_date"
            />
          </div>
          <div className="w-[50%]">
            <TextInput
              id="license_expiring_date"
              label="Expiry Date"
              type="date"
              name="license_expiring_date"
            />
          </div>
        </div>

        <FileInputWrapper>
          <div className="p-[8px] w-full rounded-[10px]">
            <p>Enter applicable short codes</p>
          </div>
        </FileInputWrapper>

        <div className="flex gap-2 justify-start">
          <button
            className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                NCCLicensedetails: false,
                NLRCLicensedetails: true,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          >
            &lt; Back
          </button>

          <button
            className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                NCCLicensedetails: false,
                NLRCLicensedetails: false,
                ShortCodeDetais: false,
                ReviewAndSubmit: true,
              });
            }}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export const ReviewAndSubmit = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
  currentPanel,
  setCurrentPanel,
}) => {
  return (
    <>
      <div className="max-w-[650px] h-auto animate-[slide-left_1s_ease-in-out] flex flex-col gap-5">
        <div className="mb-8 w-full flex flex-col gap-3">
          <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
            Review your application
          </h1>
        </div>

        <FileInputWrapper>
          <div className="p-[12px] w-full rounded-[10px] flex justify-between">
            <div className="flex flex-col justify-between w-[150px] ">
              <h3>NCC VAS Licence</h3>
              <button className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 w-[60px] text-[13px] rounded-full">
                Edit
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-[100px] w-[calc(100%-150px)] ">
              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span>VAS Licence ID</span>
                <h3 className="text-[14px] text-white">NCC1234-456</h3>
              </div>
              <div className="flex">
                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Issuing date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2000</h3>
                </div>

                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Expiry date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2030</h3>
                </div>
              </div>
              

              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span>VAS document</span>
                <h3 className="text-[14px] text-white flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8 0C9.074 0 9.337 0.113 9.526 0.312L12.726 3.74C12.902 3.926 13 4.173 13 4.429V13C13 13.552 12.552 14 12 14H2C1.448 14 1 13.552 1 13V1C1 0.448 1.448 0 2 0H8.8ZM12 5H8.5C8.224 5 8 4.776 8 4.5V1H2V13H12V5ZM4.5 11C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H4.5ZM4.5 8C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H4.5ZM5.5 16C5.22386 16 5 15.7761 5 15.5C5 15.2239 5.22386 15 5.5 15H14V6.5C14 6.22386 14.2239 6 14.5 6C14.7761 6 15 6.22386 15 6.5V15C15 15.5523 14.5523 16 14 16H5.5Z" fill="#FFCB03"/>
                  </svg>
                  <span>GalaxoSmilth_VAS_document.pdf</span>
                </h3>
              </div>
            </div>
          </div>
        </FileInputWrapper>

        <FileInputWrapper>
          <div className="p-[12px] w-full rounded-[10px] flex justify-between">
            <div className="flex flex-col justify-between w-[150px] ">
              <h3> NLRC VAS License</h3>
              <button className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 w-[60px] text-[13px] rounded-full">
                Edit
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-[100px] w-[calc(100%-150px)] ">
              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span> NLRC License Number</span>
                <h3 className="text-[14px] text-white">NCC1234-456</h3>
              </div>
              <div className="flex">
                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Issuing date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2000</h3>
                </div>

                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Expiry date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2030</h3>
                </div>
              </div>
              

              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span>NLRC document</span>
                <h3 className="text-[14px] text-white flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8 0C9.074 0 9.337 0.113 9.526 0.312L12.726 3.74C12.902 3.926 13 4.173 13 4.429V13C13 13.552 12.552 14 12 14H2C1.448 14 1 13.552 1 13V1C1 0.448 1.448 0 2 0H8.8ZM12 5H8.5C8.224 5 8 4.776 8 4.5V1H2V13H12V5ZM4.5 11C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H4.5ZM4.5 8C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H4.5ZM5.5 16C5.22386 16 5 15.7761 5 15.5C5 15.2239 5.22386 15 5.5 15H14V6.5C14 6.22386 14.2239 6 14.5 6C14.7761 6 15 6.22386 15 6.5V15C15 15.5523 14.5523 16 14 16H5.5Z" fill="#FFCB03"/>
                  </svg>
                  <span>GalaxoSmilth_VAS_document.pdf</span>
                </h3>
              </div>
            </div>
          </div>
        </FileInputWrapper>

        <FileInputWrapper>
          <div className="p-[12px] w-full rounded-[10px] flex justify-between">
            <div className="flex flex-col justify-between w-[150px] ">
              <h3> Short code</h3>
              <button className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 w-[60px] text-[13px] rounded-full">
                Edit
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-[100px] w-[calc(100%-150px)] ">
            <div className="flex">
                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Short code issue date</span>
                  <h3 className="text-[14px] text-white">Sep 12, 1986</h3>
                </div>

                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>Short code expiry date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2000</h3>
                </div>
              </div>


              <div className="flex">
                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>NCC pricing approval issue date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2000</h3>
                </div>

                <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3 w-[50%]">
                  <span>NCC pricing approval expiry date</span>
                  <h3 className="text-[14px] text-white">Jun 12, 2030</h3>
                </div>
              </div>
              

              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span>Short code document</span>
                <h3 className="text-[14px] text-white flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8 0C9.074 0 9.337 0.113 9.526 0.312L12.726 3.74C12.902 3.926 13 4.173 13 4.429V13C13 13.552 12.552 14 12 14H2C1.448 14 1 13.552 1 13V1C1 0.448 1.448 0 2 0H8.8ZM12 5H8.5C8.224 5 8 4.776 8 4.5V1H2V13H12V5ZM4.5 11C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H4.5ZM4.5 8C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H4.5ZM5.5 16C5.22386 16 5 15.7761 5 15.5C5 15.2239 5.22386 15 5.5 15H14V6.5C14 6.22386 14.2239 6 14.5 6C14.7761 6 15 6.22386 15 6.5V15C15 15.5523 14.5523 16 14 16H5.5Z" fill="#FFCB03"/>
                  </svg>
                  <span>GalaxoSmilth_VAS_document.pdf</span>
                </h3>
              </div>


              
              <div className="flex flex-col text-[12px] border-b border-gray-700 pb-3">
                <span>NCC pricing approval document</span>
                <h3 className="text-[14px] text-white flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8 0C9.074 0 9.337 0.113 9.526 0.312L12.726 3.74C12.902 3.926 13 4.173 13 4.429V13C13 13.552 12.552 14 12 14H2C1.448 14 1 13.552 1 13V1C1 0.448 1.448 0 2 0H8.8ZM12 5H8.5C8.224 5 8 4.776 8 4.5V1H2V13H12V5ZM4.5 11C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H4.5ZM4.5 8C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H4.5ZM5.5 16C5.22386 16 5 15.7761 5 15.5C5 15.2239 5.22386 15 5.5 15H14V6.5C14 6.22386 14.2239 6 14.5 6C14.7761 6 15 6.22386 15 6.5V15C15 15.5523 14.5523 16 14 16H5.5Z" fill="#FFCB03"/>
                  </svg>
                  <span>GalaxoSmilth_VAS_document.pdf</span>
                </h3>
              </div>
            </div>
          </div>
        </FileInputWrapper>

        <div className="flex flex-col gap-2  text-center justify-between">
          <p>
            By clicking submit application, I/We confirm that the information
            provided are accurate and truthful.
          </p>
          <button
            className="w-[250px] border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full m-auto"
            onClick={closeAggregatorComplianceFormFlyout}
          >
            Submit Application &gt;
          </button>
        </div>
      </div>
    </>
  );
};
