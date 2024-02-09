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

export default function AggregatorComplianceModal({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
}) {
  const [delayedExecution, setDelayedExecution] = useState(false);
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayedExecution(true);
    }, 2000);
    return () => clearTimeout(delayTimer);
  }, []);

  return (
    <>
      <main className="w-screen h-screen flex items-start justify-start fixed top-0 left-0 z-[2000] bg-[#030303] animate-[slide-down-fade_1s_ease-in-out]">
        <AggregatorComplianceNav
          closeAggregatorComplianceFormFlyout={
            closeAggregatorComplianceFormFlyout
          }
          partnerDetails={partnerDetails}
        />

        <div className="absolute top-[50px] flex  h-screen w-screen justify-center">
          {!delayedExecution ? (
            <Loading style="h-[500px]"/>
          ) : (
            <>
              <AggregatorComplianceProgressiveNav
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={partnerDetails}
              />
              <div className="w-[calc(100%-250px)] h-[100%] absolute right-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
                <div className="pt-[50px] w-[100%] h-auto flex justify-center">
                  <div className="w-[480px] h-auto">
                    <CompanyDetail
                      closeAggregatorComplianceFormFlyout={
                        closeAggregatorComplianceFormFlyout
                      }
                      partnerDetails={partnerDetails}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export const AggregatorComplianceNav = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
}) => {
  return (
    <header className=" flex justify-between items-center h-[64px] px-4 pt-4 pb-2 m-0 w-screen mx-auto z-20 border-b border-b-white/20 bg-[#030303]">
      <div
        onClick={closeAggregatorComplianceFormFlyout}
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
            Partner category:
          </span>
          <span className="font-bold">Rich Media Service</span>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 text-white px-3">
        <div className="flex justify-end items-center gap-1 text-white">
          <UserPercentage
            size={22}
            thickness={2}
            textsize={8}
            percent={25}
            hidelabel={true}
          />

          <span className="flex text-white text-[12px] flex-nowrap">
            25%
            <span className="hidden sm:flex"> &nbsp;completed</span>
          </span>
        </div>
        <span
          onClick={closeAggregatorComplianceFormFlyout}
          className="hidden sm:flex text-[12px] px-3 py-1 border border-white/40 hover:border-white/60 text-white/40 hover:text-white/60 rounded-full cursor-pointer"
        >
          Save and exit
          {/* Save and exit */}
        </span>
      </div>
    </header>
  );
};

export const AggregatorComplianceProgressiveNav = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
}) => {
  return (
    <>
      <nav className="w-[250px] h-screen absolute bg-white/5  left-0 animate-[slide-right_1s_ease-in-out]">
        <div className="pt-[50px] w-[100%] h-auto flex justify-center">
          <div className="w-[80%] h-auto">
            <li className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer">
              <div className="h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4141 16.8619H12.1255L11.6695 17.3179C11.5597 17.4278 11.4106 17.4896 11.2552 17.4896H8.74477C8.58934 17.4896 8.44031 17.4278 8.33047 17.3179L7.87449 16.8619H0.585938C0.262344 16.8619 0 17.1243 0 17.4479V18.1588C0 19.1876 0.835547 19.9999 1.84117 19.9999H18.1588C19.1877 19.9999 20 19.1644 20 18.1588V17.4479C20 17.1242 19.7377 16.8619 19.4141 16.8619Z"
                    fill="#666666"
                  />
                  <path
                    d="M11.8409 0.828613V2.59373H13.606L11.8409 0.828613Z"
                    fill="#666666"
                  />
                  <path
                    d="M8.53197 15.8616L8.98795 16.3176H11.013L11.469 15.8616C11.5788 15.7517 11.7279 15.69 11.8833 15.69H18.1177V7.48945C18.1177 6.47425 17.2917 5.64832 16.2765 5.64832H15.6072V12.5936C15.6072 13.5629 14.8187 14.3514 13.8494 14.3514H6.15154C5.18228 14.3514 4.39373 13.5629 4.39373 12.5936V5.64832H3.72443C2.70924 5.64832 1.8833 6.47425 1.8833 7.48945V15.69H8.11768C8.27307 15.69 8.42213 15.7517 8.53197 15.8616Z"
                    fill="#666666"
                  />
                  <path
                    d="M6.15112 13.1797H13.849C14.1726 13.1797 14.435 12.9173 14.435 12.5938V3.76563H11.2553C10.9317 3.76563 10.6694 3.50328 10.6694 3.17969V0H6.15112C5.82753 0 5.56519 0.262344 5.56519 0.585938V12.5938C5.56519 12.9173 5.82749 13.1797 6.15112 13.1797ZM7.48964 2.51043H8.74483C9.52089 2.53898 9.52132 3.65359 8.74483 3.6823H7.48964C6.71358 3.65371 6.71315 2.53914 7.48964 2.51043ZM7.48964 5.02082H8.74483C9.52089 5.04938 9.52132 6.16399 8.74483 6.1927H7.48964C6.71358 6.16414 6.71315 5.04957 7.48964 5.02082ZM7.48964 7.53125H12.5105C12.8341 7.53125 13.0964 7.79359 13.0964 8.11719C13.0964 8.44078 12.8341 8.70313 12.5105 8.70313H7.48964C6.71464 8.67504 6.71218 7.56031 7.48964 7.53125ZM7.48964 10.0417H12.5105C12.8341 10.0417 13.0964 10.304 13.0964 10.6276C13.0964 10.9512 12.8341 11.2136 12.5105 11.2136H7.48964C6.71464 11.1855 6.71218 10.0707 7.48964 10.0417Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <p className=" group-hover:text-mtn-400">NCC VAS</p>
            </li>

            <li className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer">
              <div className="h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7588 0.833313H14.531C14.7075 1.14251 14.8089 1.49979 14.8089 1.88046V3.03464H16.0742C16.4356 3.03464 16.7814 3.12562 17.0863 3.29592V3.16079C17.0863 1.87538 16.0443 0.833313 14.7588 0.833313Z"
                    fill="#686868"
                  />
                  <path
                    d="M16.7855 4.40326C16.5983 4.21345 16.3458 4.10889 16.0745 4.10889H13.7351V1.88046C13.7351 1.30393 13.2657 0.834745 12.6881 0.833313H3.33337V19.1666H17.0866V5.17344C17.0908 4.87803 16.9839 4.6045 16.7855 4.40326ZM13.5735 16.8737H6.83558V15.7999H13.5735V16.8737ZM13.5735 14.6185H6.83558V13.5448H13.5735V14.6185ZM12.4006 9.31803L12.5297 11.7742L10.2242 10.9176L7.92816 11.7994L8.0304 9.34202L6.4822 7.43088L8.85092 6.76873L10.1901 4.70576L11.5518 6.75394L13.9276 7.39009L12.4006 9.31803Z"
                    fill="#686868"
                  />
                  <path
                    d="M10.8828 7.68613L10.2013 6.66125L9.53124 7.69354L8.34595 8.0249L9.12064 8.98114L9.06947 10.2108L10.2184 9.76958L11.372 10.1982L11.3074 8.96918L12.0716 8.00446L10.8828 7.68613Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <p className=" group-hover:text-mtn-400">NLRC Licence</p>
            </li>

            <li className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer">
              <div className="h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_11037_7152)">
                    <path
                      d="M7.65662 11.7579C7.97964 11.7579 8.24255 11.495 8.24255 11.172C8.24255 10.849 7.97964 10.5861 7.65662 10.5861C7.33359 10.5861 7.07068 10.849 7.07068 11.172C7.07068 11.495 7.33359 11.7579 7.65662 11.7579Z"
                      fill="#666666"
                    />
                    <path
                      d="M7.65662 7.07043C7.97964 7.07043 8.24255 6.80753 8.24255 6.4845C8.24255 6.16147 7.97964 5.89856 7.65662 5.89856C7.33359 5.89856 7.07068 6.16147 7.07068 6.4845C7.07068 6.80753 7.33359 7.07043 7.65662 7.07043Z"
                      fill="#666666"
                    />
                    <path
                      d="M12.3441 7.07043C12.6671 7.07043 12.9301 6.80753 12.9301 6.4845C12.9301 6.16147 12.6671 5.89856 12.3441 5.89856C12.0211 5.89856 11.7582 6.16147 11.7582 6.4845C11.7582 6.80753 12.0211 7.07043 12.3441 7.07043Z"
                      fill="#666666"
                    />
                    <path
                      d="M12.3441 11.7579C12.6671 11.7579 12.9301 11.495 12.9301 11.172C12.9301 10.849 12.6671 10.5861 12.3441 10.5861C12.0211 10.5861 11.7582 10.849 11.7582 11.172C11.7582 11.495 12.0211 11.7579 12.3441 11.7579Z"
                      fill="#666666"
                    />
                    <path
                      d="M3.55505 14.1407H16.4457V3.51575H3.55505V14.1407ZM10.5863 6.4845C10.5863 5.51526 11.3749 4.72668 12.3441 4.72668C13.3134 4.72668 14.1019 5.51526 14.1019 6.4845C14.1019 7.24835 13.6121 7.8996 12.9301 8.1416V9.51489C13.6121 9.7569 14.1019 10.4081 14.1019 11.172C14.1019 12.1412 13.3134 12.9298 12.3441 12.9298C11.3749 12.9298 10.5863 12.1412 10.5863 11.172C10.5863 10.4081 11.0761 9.7569 11.7582 9.51489V8.1416C11.0761 7.8996 10.5863 7.24835 10.5863 6.4845ZM7.65662 4.72668C8.62585 4.72668 9.41443 5.51526 9.41443 6.4845C9.41443 7.45374 8.62585 8.24231 7.65662 8.24231C6.68738 8.24231 5.8988 7.45374 5.8988 6.4845C5.8988 5.51526 6.68738 4.72668 7.65662 4.72668ZM7.65662 9.41418C8.62585 9.41418 9.41443 10.2028 9.41443 11.172C9.41443 12.1412 8.62585 12.9298 7.65662 12.9298C6.68738 12.9298 5.8988 12.1412 5.8988 11.172C5.8988 10.2028 6.68738 9.41418 7.65662 9.41418Z"
                      fill="#666666"
                    />
                    <path
                      d="M3.55505 18.2423C3.55505 19.2115 4.34363 20.0001 5.31287 20.0001H14.6879C15.6571 20.0001 16.4457 19.2115 16.4457 18.2423V15.3126H3.55505V18.2423ZM8.82849 17.0704H11.1722V18.2423H8.82849V17.0704Z"
                      fill="#666666"
                    />
                    <path
                      d="M14.6879 0.00012207H5.31287C4.34363 0.00012207 3.55505 0.788696 3.55505 1.75793V2.34387H16.4457V1.75793C16.4457 0.788696 15.6571 0.00012207 14.6879 0.00012207Z"
                      fill="#666666"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_11037_7152">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className=" group-hover:text-mtn-400">Short Code</p>
            </li>

            <li className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer">
              <div className="h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.2503 18.7499C16.0845 18.7499 15.9256 18.684 15.8084 18.5668L14.8896 17.648C14.3089 18.0116 13.6146 18.1487 12.9393 18.0331C12.2639 17.9176 11.6548 17.5574 11.228 17.0214C10.8012 16.4853 10.5867 15.811 10.6254 15.1269C10.6641 14.4428 10.9533 13.7969 11.4378 13.3124C11.9223 12.8279 12.5682 12.5388 13.2522 12.5001C13.9363 12.4614 14.6107 12.6759 15.1467 13.1026C15.6828 13.5294 16.0429 14.1386 16.1585 14.8139C16.2741 15.4893 16.137 16.1835 15.7734 16.7643L16.6921 17.683C16.7795 17.7704 16.839 17.8818 16.8631 18.003C16.8872 18.1242 16.8749 18.2499 16.8276 18.3641C16.7803 18.4783 16.7002 18.5759 16.5974 18.6445C16.4947 18.7132 16.3739 18.7499 16.2503 18.7499ZM13.4115 13.7499C13.1075 13.7499 12.8104 13.8401 12.5576 14.009C12.3049 14.1779 12.1079 14.4179 11.9916 14.6988C11.8753 14.9797 11.8449 15.2887 11.9042 15.5868C11.9636 15.885 12.11 16.1588 12.325 16.3737C12.54 16.5886 12.8139 16.735 13.1121 16.7942C13.4102 16.8534 13.7193 16.8229 14.0001 16.7065C14.2809 16.5901 14.5209 16.393 14.6897 16.1402C14.8585 15.8873 14.9485 15.5901 14.9484 15.2862C14.9479 14.8788 14.7858 14.4882 14.4977 14.2002C14.2095 13.9122 13.8189 13.7502 13.4115 13.7499Z"
                    fill="#666666"
                  />
                  <path
                    d="M14.3748 6.24982C13.7117 6.24982 13.0758 5.98643 12.607 5.51758C12.1381 5.04874 11.8748 4.41286 11.8748 3.74982V1.24982H6.24976C5.42095 1.24982 4.6261 1.57906 4.04005 2.16511C3.454 2.75116 3.12476 3.54602 3.12476 4.37482V15.6248C3.12476 16.4536 3.454 17.2485 4.04005 17.8345C4.6261 18.4206 5.42095 18.7498 6.24976 18.7498H11.3491C10.8208 18.4362 10.371 18.006 10.0343 17.4921C9.69757 16.9782 9.48272 16.3941 9.40617 15.7845C9.32962 15.1748 9.39339 14.5558 9.59262 13.9746C9.79184 13.3933 10.1212 12.8653 10.5557 12.4308C10.9901 11.9964 11.5181 11.6669 12.0993 11.4676C12.6805 11.2683 13.2996 11.2045 13.9092 11.2809C14.5188 11.3574 15.1029 11.5722 15.6169 11.9089C16.1309 12.2456 16.5611 12.6952 16.8748 13.2236V6.24982H14.3748ZM6.24976 4.99982H9.99976C10.1655 4.99982 10.3245 5.06567 10.4417 5.18288C10.5589 5.30009 10.6248 5.45906 10.6248 5.62482C10.6248 5.79058 10.5589 5.94955 10.4417 6.06676C10.3245 6.18397 10.1655 6.24982 9.99976 6.24982H6.24976C6.084 6.24982 5.92502 6.18397 5.80781 6.06676C5.6906 5.94955 5.62476 5.79058 5.62476 5.62482C5.62476 5.45906 5.6906 5.30009 5.80781 5.18288C5.92502 5.06567 6.084 4.99982 6.24976 4.99982ZM8.12476 11.2498H6.24976C6.084 11.2498 5.92502 11.184 5.80781 11.0668C5.6906 10.9495 5.62476 10.7906 5.62476 10.6248C5.62476 10.4591 5.6906 10.3001 5.80781 10.1829C5.92502 10.0657 6.084 9.99982 6.24976 9.99982H8.12476C8.29052 9.99982 8.44949 10.0657 8.5667 10.1829C8.68391 10.3001 8.74976 10.4591 8.74976 10.6248C8.74976 10.7906 8.68391 10.9495 8.5667 11.0668C8.44949 11.184 8.29052 11.2498 8.12476 11.2498ZM12.4998 8.74982H6.24976C6.084 8.74982 5.92502 8.68397 5.80781 8.56676C5.6906 8.44955 5.62476 8.29058 5.62476 8.12482C5.62476 7.95906 5.6906 7.80009 5.80781 7.68288C5.92502 7.56567 6.084 7.49982 6.24976 7.49982H12.4998C12.6655 7.49982 12.8245 7.56567 12.9417 7.68288C13.0589 7.80009 13.1248 7.95906 13.1248 8.12482C13.1248 8.29058 13.0589 8.44955 12.9417 8.56676C12.8245 8.68397 12.6655 8.74982 12.4998 8.74982Z"
                    fill="#666666"
                  />
                  <path
                    d="M16.7929 4.99991C16.7079 4.69532 16.5471 4.41727 16.3254 4.19179L13.9329 1.79929C13.7074 1.57759 13.4293 1.41674 13.1248 1.33179V3.74991C13.1248 4.08143 13.2565 4.39937 13.4909 4.6338C13.7253 4.86822 14.0432 4.99991 14.3748 4.99991H16.7929Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <p className=" group-hover:text-mtn-400">Review and Submit</p>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export const CompanyDetail = ({
  closeAggregatorComplianceFormFlyout,
  partnerDetails,
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
      <div className="mb-12 w-full flex flex-col gap-3">
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

        <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full">
          Next &gt;
        </button>
      </div>
    </>
  );
};
