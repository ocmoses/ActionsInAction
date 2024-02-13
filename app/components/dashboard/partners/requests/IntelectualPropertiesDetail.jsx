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
    ContentProvider: true,
    NLRCLicensedetails: false,
    ShortCodeDetais: false,
    ReviewAndSubmit: false,
  });

  return (
    <>
      <main className="w-screen h-screen flex items-start justify-start fixed top-0 left-0 z-[2000] bg-[#030303] animate-[slide-down-fade_1s_ease-in-out]">
        <IntelectualPropertiesHeader
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
                <div className="pt-[20px] w-[70%] h-auto flex justify-center m-auto">
                  {currentPanel.ContentProvider && (
                    <ContentProvider
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

export const IntelectualPropertiesHeader = ({
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
                if (!currentPanel.ContentProvider) {
                  setCurrentPanel({
                    ...currentPanel,
                    ContentProvider: true,
                    NLRCLicensedetails: false,
                    ShortCodeDetais: false,
                    ReviewAndSubmit: false,
                  });
                }
              }}
            >
              <div
                className={`h-[40px] w-[40px] rounded-full bg-white/10  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.ContentProvider ? "border border-mtn-400" : ""
                } `}
              >
                1
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.ContentProvider ? "text-mtn-400" : ""
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
                    ContentProvider: false,
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
                    ContentProvider: false,
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
                    ContentProvider: false,
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

export const ContentProvider = ({
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
      <div className="w-[100%] h-auto animate-[slide-left_1s_ease-in-out]">
        <div className="mb-5 w-full flex flex-col gap-3 text-center">
          <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
          Who's licensing your content
          </h1>
          <p>Choose who's representing the content provider for this service</p>
        </div>

        <div className="flex gap-5 pt-[40px]">
          <ContentProviderSelector
            icon={<svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 3.5C31.0371 3.5 27 7.53711 27 12.5C27 17.4629 31.0371 21.5 36 21.5C40.9629 21.5 45 17.4629 45 12.5C45 7.53711 40.9629 3.5 36 3.5ZM36 18.5C32.6909 18.5 30 15.8083 30 12.5C30 9.19165 32.6909 6.5 36 6.5C39.3091 6.5 42 9.19165 42 12.5C42 15.8083 39.3091 18.5 36 18.5Z" fill="#E4B809"/>
            <path d="M54 56H44.4734C44.8011 55.3154 45 54.5582 45 53.75V39.5H46.5C48.9814 39.5 51 37.4814 51 35V27.5C51 22.5371 46.9629 18.5 42 18.5H30C25.0371 18.5 21 22.5371 21 27.5V35C21 37.4814 23.0186 39.5 25.5 39.5H27V53.75C27 54.5582 27.1989 55.3154 27.5266 56H18C17.1709 56 16.5 56.6716 16.5 57.5V68C16.5 68.8284 17.1709 69.5 18 69.5H54C54.8291 69.5 55.5 68.8284 55.5 68V57.5C55.5 56.6716 54.8291 56 54 56ZM30 53.75V29C30 28.1716 29.3291 27.5 28.5 27.5C27.6709 27.5 27 28.1716 27 29V36.5H25.5C24.6724 36.5 24 35.8269 24 35V27.5C24 24.1917 26.6909 21.5 30 21.5H42C45.3091 21.5 48 24.1917 48 27.5V35C48 35.8269 47.3276 36.5 46.5 36.5H45V29C45 28.1716 44.3291 27.5 43.5 27.5C42.6709 27.5 42 28.1716 42 29V53.75C42 54.9907 40.9907 56 39.75 56C38.5093 56 37.5 54.9907 37.5 53.75V39.5C37.5 38.6716 36.8291 38 36 38C35.1709 38 34.5 38.6716 34.5 39.5V53.75C34.5 54.9907 33.4907 56 32.25 56C31.0093 56 30 54.9907 30 53.75ZM52.5 66.5H19.5V59H52.5V66.5Z" fill="white"/>
          </svg>}
            title={"Content creator"}
            message={"The creator of the content for this service"}
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                ContentProvider: false,
                NLRCLicensedetails: true,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          />

          <ContentProviderSelector
            icon={<svg width="66" height="61" viewBox="0 0 66 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M66.0001 41V45.5C66.0001 47.9814 63.9815 50 61.5001 50H37.5001C36.6717 50 36.0001 49.3284 36.0001 48.5C36.0001 47.6716 36.6717 47 37.5001 47H54.0001V38C54.0001 37.1716 54.6717 36.5 55.5001 36.5C56.3284 36.5 57.0001 37.1716 57.0001 38V47H61.5001C62.327 47 63.0001 46.3269 63.0001 45.5V41C63.0001 35.2102 58.2899 30.5 52.5001 30.5H40.5001C38.086 30.5 35.8162 31.2961 33.9368 32.8035C33.2894 33.3206 32.3467 33.2188 31.8282 32.5713C31.3104 31.9253 31.4136 30.9812 32.0604 30.4626C34.4429 28.5525 37.4407 27.5 40.5001 27.5H52.5001C59.9437 27.5 66.0001 33.5564 66.0001 41ZM33.0001 12.5C33.0001 5.8833 38.3834 0.5 45.0001 0.5C51.6168 0.5 57.0001 5.8833 57.0001 12.5C57.0001 19.1167 51.6168 24.5 45.0001 24.5C38.3834 24.5 33.0001 19.1167 33.0001 12.5ZM36.0001 12.5C36.0001 17.4629 40.0372 21.5 45.0001 21.5C49.9629 21.5 54.0001 17.4629 54.0001 12.5C54.0001 7.53711 49.9629 3.5 45.0001 3.5C40.0372 3.5 36.0001 7.53711 36.0001 12.5Z" fill="#E4B809"/>
            <path d="M25.5 38H13.5C6.0564 38 0 44.0564 0 51.5V56C0 58.4814 2.01855 60.5 4.5 60.5H34.5C36.9814 60.5 39 58.4814 39 56V51.5C39 44.0564 32.9436 38 25.5 38ZM36 56C36 56.8269 35.3269 57.5 34.5 57.5H30V48.5C30 47.6716 29.3284 47 28.5 47C27.6716 47 27 47.6716 27 48.5V57.5H12V48.5C12 47.6716 11.3284 47 10.5 47C9.67163 47 9 47.6716 9 48.5V57.5H4.5C3.6731 57.5 3 56.8269 3 56V51.5C3 45.7102 7.71021 41 13.5 41H25.5C31.2898 41 36 45.7102 36 51.5V56ZM18 35C24.6167 35 30 29.6167 30 23C30 16.3833 24.6167 11 18 11C11.3833 11 6 16.3833 6 23C6 29.6167 11.3833 35 18 35ZM18 14C22.9629 14 27 18.0371 27 23C27 27.9629 22.9629 32 18 32C13.0371 32 9 27.9629 9 23C9 18.0371 13.0371 14 18 14Z" fill="white"/>
            </svg>}
            title={"Agent / third-party"}
            message={"Someone representing the content creator"}
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                ContentProvider: false,
                NLRCLicensedetails: true,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          />

           <ContentProviderSelector
            icon={<svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M62.9927 58.666C62.8474 55.3748 60.5582 52.6579 57.4999 51.8049C58.1291 50.856 58.5 49.7214 58.5 48.5C58.5 45.1917 55.8091 42.5 52.5 42.5C49.1909 42.5 46.5 45.1917 46.5 48.5C46.5 49.7215 46.871 50.8562 47.5003 51.8051C44.3393 52.687 42 55.5617 42 59C42 59.8284 42.6709 60.5 43.5 60.5H61.5C61.5103 60.5 61.522 60.5007 61.5293 60.5C62.3584 60.5 63.0293 59.8284 63.0293 59C63.0293 58.885 63.0176 58.7737 62.9927 58.666ZM52.5 45.5C54.1538 45.5 55.5 46.8455 55.5 48.5C55.5 50.1545 54.1538 51.5 52.5 51.5C50.8462 51.5 49.5 50.1545 49.5 48.5C49.5 46.8455 50.8462 45.5 52.5 45.5ZM45.2563 57.5C45.876 55.7539 47.5444 54.5 49.5 54.5H55.5C57.4556 54.5 59.124 55.7539 59.7437 57.5H45.2563ZM52.5 36.5C43.4019 36.5 36 43.9019 36 53C36 62.0981 43.4019 69.5 52.5 69.5C61.5981 69.5 69 62.0981 69 53C69 43.9019 61.5981 36.5 52.5 36.5ZM52.5 66.5C45.0557 66.5 39 60.4436 39 53C39 45.5564 45.0557 39.5 52.5 39.5C59.9443 39.5 66 45.5564 66 53C66 60.4436 59.9443 66.5 52.5 66.5Z" fill="white"/>
            <path d="M27.6307 21.5637C28.1703 20.6637 28.5 19.6235 28.5 18.5V15.5C28.5 12.1917 25.8084 9.5 22.5 9.5C19.1917 9.5 16.5 12.1917 16.5 15.5V18.5C16.5 19.6235 16.8297 20.6637 17.3693 21.5637C13.5331 21.8901 10.5 25.0807 10.5 29V32C10.5 32.8284 11.1716 33.5 12 33.5H33C33.8284 33.5 34.5 32.8284 34.5 32V29C34.5 25.0807 31.467 21.8901 27.6307 21.5637ZM19.5 15.5C19.5 13.8455 20.8455 12.5 22.5 12.5C24.1545 12.5 25.5 13.8455 25.5 15.5V18.5C25.5 20.1545 24.1545 21.5 22.5 21.5C20.8455 21.5 19.5 20.1545 19.5 18.5V15.5ZM31.5 30.5H13.5V29C13.5 26.5186 15.5186 24.5 18 24.5H27C29.4814 24.5 31.5 26.5186 31.5 29V30.5ZM22.5 3.5C11.7473 3.5 3 12.2473 3 23C3 33.7527 11.7473 42.5 22.5 42.5C33.2527 42.5 42 33.7527 42 23C42 12.2473 33.2527 3.5 22.5 3.5ZM22.5 39.5C13.4019 39.5 6 32.0981 6 23C6 13.9019 13.4019 6.5 22.5 6.5C31.5981 6.5 39 13.9019 39 23C39 32.0981 31.5981 39.5 22.5 39.5Z" fill="white"/>
            <path d="M69 29C69 29.8284 68.3291 30.5 67.5 30.5C66.6709 30.5 66 29.8284 66 29C66 23.9316 60.356 20 55.5 20H50.1211L52.0605 21.9395C52.6465 22.5254 52.6465 23.4746 52.0605 24.0605C51.7676 24.3535 51.3838 24.5 51 24.5C50.6162 24.5 50.2324 24.3535 49.9395 24.0605L45.4395 19.5605C44.8535 18.9746 44.8535 18.0254 45.4395 17.4395L49.9395 12.9395C50.5254 12.3535 51.4746 12.3535 52.0605 12.9395C52.6465 13.5254 52.6465 14.4746 52.0605 15.0605L50.1211 17H55.5C61.8721 17 69 22.1321 69 29Z" fill="#E4B809"/>
            <path d="M32.5605 55.5605L28.0605 60.0605C27.7676 60.3535 27.3838 60.5 27 60.5C26.6162 60.5 26.2324 60.3535 25.9395 60.0605C25.3535 59.4746 25.3535 58.5254 25.9395 57.9395L27.8789 56H18C11.3833 56 6 50.6167 6 44C6 43.1716 6.67163 42.5 7.5 42.5C8.32837 42.5 9 43.1716 9 44C9 48.9629 13.0371 53 18 53H27.8789L25.9395 51.0605C25.3535 50.4746 25.3535 49.5254 25.9395 48.9395C26.5254 48.3535 27.4746 48.3535 28.0605 48.9395L32.5605 53.4395C33.1465 54.0254 33.1465 54.9746 32.5605 55.5605Z" fill="#E4B809"/>
            </svg>}
            title={"Record label"}
            message={"An organisation that a creator is signed to."}
            onClick={() => {
              setCurrentPanel({
                ...currentPanel,
                ContentProvider: false,
                NLRCLicensedetails: true,
                ShortCodeDetais: false,
                ReviewAndSubmit: false,
              });
            }}
          />
          

        </div>
      </div>
    </>
  );
};



export const ContentProviderSelector = ({
  icon,
  title,
  message,
  onClick
}) => {

  return (
    <div className="border border-white/20 w-[100%] rounded-[7px] min-h-[150px] cursor-pointer hover:bg-white/20"
    onClick={() => onClick()}>
    <div className="p-[30px] py-[50px] flex flex-col gap-2">
        {icon}
      <h3 className="text-white font-bold">{title}</h3>
      <p>{message}</p>
    </div>
  </div>
  )
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
      <div className="max-w-[70%] h-auto animate-[slide-left_1s_ease-in-out] bg-red-400">
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
                ContentProvider: true,
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
                ContentProvider: false,
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
                ContentProvider: false,
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
                ContentProvider: false,
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
