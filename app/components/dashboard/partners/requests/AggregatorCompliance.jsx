"use client";
import Link from "next/link";
import { useState, useEffect, useRef  } from "react";
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
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey, license_type } from "@/app/modules/constants";
import axios from "axios";
import { TailSpinPreloader } from "@/app/components/Icons";
import useUsers from "@/hooks/useUsers";
import { useStoreState } from "easy-peasy"
import { NewSuccess } from "@/app/components/toasts/Success";



  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export default function AggregatorComplianceModal({ closeAggregatorComplianceFormFlyout, partnerDetails,}) {
 /////////////////////////////////////////////////////////////////////////
  const [currentPanel, setCurrentPanel] = useState({
    NCCLicensedetails: true,
    NLRCLicensedetails: false,
    ShortCodeDetais: false,
    ReviewAndSubmit: false,
  }); 
  
  const [delayedExecution, setDelayedExecution] = useState(false);
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayedExecution(true);
    }, 2000);
    return () => clearTimeout(delayTimer);
  }, []);
//////////////////////////////////////////////////////////////////////////////
const {getAggregatorVasPartnerDetails,} = usePartners();
const [vasPartnerResponse, setVasPartnerResponse] = useState();
let getAggregatorVasPartnerDetailsResponse = null;
  const get_aggregator_vas_partner_details = async () => {
    console.log('partnerDetails response', partnerDetails);
    try {
      
      getAggregatorVasPartnerDetailsResponse = await getAggregatorVasPartnerDetails(partnerDetails?.aggregator_uuid, partnerDetails?.vas_partner_uuid);
      let vas_partner_response = getAggregatorVasPartnerDetailsResponse.result[0];
      
      setVasPartnerResponse(vas_partner_response);
     if(vas_partner_response.profile_stage.percentage<60){ /////// NCCLicensedetails done
      setCurrentPanel({
        ...currentPanel,
        NCCLicensedetails: true,
        NLRCLicensedetails: false,
        ShortCodeDetais: false,
        ReviewAndSubmit: false,
      });
     }
     if(vas_partner_response.profile_stage.percentage>=60 && vas_partner_response.profile_stage.percentage<90){ /////// NLRCLicensedetails done
      setCurrentPanel({
        ...currentPanel,
        NCCLicensedetails: false,
        NLRCLicensedetails: true,
        ShortCodeDetais: false,
        ReviewAndSubmit: false,
      });
     }
     if(vas_partner_response.profile_stage.percentage>=90 && vas_partner_response.profile_stage.percentage<100){ /////// NLRCLicensedetails done
      setCurrentPanel({
        ...currentPanel,
        NCCLicensedetails: false,
        NLRCLicensedetails: false,
        ShortCodeDetais: true,
        ReviewAndSubmit: false,
      });
     }

     if(vas_partner_response.profile_stage.percentage==100){ /////// NLRCLicensedetails done
      setCurrentPanel({
        ...currentPanel,
        NCCLicensedetails: false,
        NLRCLicensedetails: false,
        ShortCodeDetais: false,
        ReviewAndSubmit: true,
      });
     }

    } catch (error) {
      console.log("getAggregatorVasPartnerDetails_response error", error);
    }
  };
  useEffect(() => {
    
    get_aggregator_vas_partner_details();
  }, []);
///////////////////////////////////////////////////////////////////////////////



  return (
    <>
      <main className="w-screen h-screen flex items-start justify-start fixed top-0 left-0 z-[2000] bg-[#030303] animate-[slide-down-fade_1s_ease-in-out]">
        {!delayedExecution ? (
          <div className="w-[100%] flex justify-center">
          <Loading style="h-[600px]" />
          </div>
        ) : (
          <>
            {currentPanel.NCCLicensedetails && (
              <NCCLicensedetails
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={vasPartnerResponse}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            )}

            {currentPanel.NLRCLicensedetails && (
              <NLRCLicensedetails
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={vasPartnerResponse}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            )}

            {currentPanel.ShortCodeDetais && (
              <ShortCodeDetais
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={vasPartnerResponse}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            )}

            {currentPanel.ReviewAndSubmit && (
              <ReviewAndSubmit
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={vasPartnerResponse}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            )}
          </>
        )}
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
          <span className="font-bold">{partnerDetails?.category_name}</span>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3 text-white px-3">
        <div className="flex justify-end items-center gap-1 text-white">
          <UserPercentage
            size={22}
            thickness={2}
            textsize={8}
            percent={partnerDetails?.profile_stage ? partnerDetails.profile_stage.percentage : '0'}
            hidelabel={true}
          />

          <span className="flex text-white text-[12px] flex-nowrap">
          {partnerDetails?.profile_stage ? partnerDetails.profile_stage.percentage : '0'}%
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

export const AggregatorComplianceProgressiveNav = ({ closeAggregatorComplianceFormFlyout, partnerDetails, currentPanel, setCurrentPanel,}) => {
  useEffect(() => {
    console.log('partnerDetails', partnerDetails);
  }, []);
  return (
    <>
      <nav className="w-[250px] h-screen absolute bg-white/5  left-0 animate-[slide-right_1s_ease-in-out]">
        <div className="pt-[50px] w-[100%] h-auto flex justify-center">
          <div className="w-[80%] h-auto">
            <li
              className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer"
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
                className={`h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  (currentPanel.NCCLicensedetails) ? "border border-mtn-400" : ""
                } `}
              >
                {partnerDetails?.profile_stage === null ?(
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.4141 16.8619H12.1255L11.6695 17.3179C11.5597 17.4278 11.4106 17.4896 11.2552 17.4896H8.74477C8.58934 17.4896 8.44031 17.4278 8.33047 17.3179L7.87449 16.8619H0.585938C0.262344 16.8619 0 17.1243 0 17.4479V18.1588C0 19.1876 0.835547 19.9999 1.84117 19.9999H18.1588C19.1877 19.9999 20 19.1644 20 18.1588V17.4479C20 17.1242 19.7377 16.8619 19.4141 16.8619Z" fill="#666666"/>
                  <path d="M11.8409 0.828613V2.59373H13.606L11.8409 0.828613Z" fill="#666666"/>
                  <path d="M8.53197 15.8616L8.98795 16.3176H11.013L11.469 15.8616C11.5788 15.7517 11.7279 15.69 11.8833 15.69H18.1177V7.48945C18.1177 6.47425 17.2917 5.64832 16.2765 5.64832H15.6072V12.5936C15.6072 13.5629 14.8187 14.3514 13.8494 14.3514H6.15154C5.18228 14.3514 4.39373 13.5629 4.39373 12.5936V5.64832H3.72443C2.70924 5.64832 1.8833 6.47425 1.8833 7.48945V15.69H8.11768C8.27307 15.69 8.42213 15.7517 8.53197 15.8616Z" fill="#666666"/>
                  <path d="M6.15112 13.1797H13.849C14.1726 13.1797 14.435 12.9173 14.435 12.5938V3.76563H11.2553C10.9317 3.76563 10.6694 3.50328 10.6694 3.17969V0H6.15112C5.82753 0 5.56519 0.262344 5.56519 0.585938V12.5938C5.56519 12.9173 5.82749 13.1797 6.15112 13.1797ZM7.48964 2.51043H8.74483C9.52089 2.53898 9.52132 3.65359 8.74483 3.6823H7.48964C6.71358 3.65371 6.71315 2.53914 7.48964 2.51043ZM7.48964 5.02082H8.74483C9.52089 5.04938 9.52132 6.16399 8.74483 6.1927H7.48964C6.71358 6.16414 6.71315 5.04957 7.48964 5.02082ZM7.48964 7.53125H12.5105C12.8341 7.53125 13.0964 7.79359 13.0964 8.11719C13.0964 8.44078 12.8341 8.70313 12.5105 8.70313H7.48964C6.71464 8.67504 6.71218 7.56031 7.48964 7.53125ZM7.48964 10.0417H12.5105C12.8341 10.0417 13.0964 10.304 13.0964 10.6276C13.0964 10.9512 12.8341 11.2136 12.5105 11.2136H7.48964C6.71464 11.1855 6.71218 10.0707 7.48964 10.0417Z" fill="#666666"/>
                  </svg>
                ):(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.4141 26.8619H22.1255L21.6695 27.3179C21.5597 27.4278 21.4106 27.4896 21.2552 27.4896H18.7448C18.5893 27.4896 18.4403 27.4278 18.3305 27.3179L17.8745 26.8619H10.5859C10.2623 26.8619 10 27.1243 10 27.4479V28.1588C10 29.1876 10.8355 29.9999 11.8412 29.9999H28.1588C29.1877 29.9999 30 29.1644 30 28.1588V27.4479C30 27.1242 29.7377 26.8619 29.4141 26.8619Z" fill="#666666"/>
                  <path d="M21.8409 10.8286V12.5937H23.606L21.8409 10.8286Z" fill="#666666"/>
                  <path d="M18.532 25.8616L18.9879 26.3176H21.013L21.469 25.8616C21.5788 25.7517 21.7279 25.69 21.8833 25.69H28.1177V17.4894C28.1177 16.4743 27.2917 15.6483 26.2765 15.6483H25.6072V22.5936C25.6072 23.5629 24.8187 24.3514 23.8494 24.3514H16.1515C15.1823 24.3514 14.3937 23.5629 14.3937 22.5936V15.6483H13.7244C12.7092 15.6483 11.8833 16.4743 11.8833 17.4894V25.69H18.1177C18.2731 25.69 18.4221 25.7517 18.532 25.8616Z" fill="#666666"/>
                  <path d="M16.1511 23.1797H23.849C24.1726 23.1797 24.435 22.9173 24.435 22.5938V13.7656H21.2553C20.9317 13.7656 20.6694 13.5033 20.6694 13.1797V10H16.1511C15.8275 10 15.5652 10.2623 15.5652 10.5859V22.5938C15.5652 22.9173 15.8275 23.1797 16.1511 23.1797ZM17.4896 12.5104H18.7448C19.5209 12.539 19.5213 13.6536 18.7448 13.6823H17.4896C16.7136 13.6537 16.7132 12.5391 17.4896 12.5104ZM17.4896 15.0208H18.7448C19.5209 15.0494 19.5213 16.164 18.7448 16.1927H17.4896C16.7136 16.1641 16.7132 15.0496 17.4896 15.0208ZM17.4896 17.5313H22.5105C22.8341 17.5313 23.0964 17.7936 23.0964 18.1172C23.0964 18.4408 22.8341 18.7031 22.5105 18.7031H17.4896C16.7146 18.675 16.7122 17.5603 17.4896 17.5313ZM17.4896 20.0417H22.5105C22.8341 20.0417 23.0964 20.304 23.0964 20.6276C23.0964 20.9512 22.8341 21.2136 22.5105 21.2136H17.4896C16.7146 21.1855 16.7122 20.0707 17.4896 20.0417Z" fill="#666666"/>
                  <path d="M38.5488 27.6476C38.3497 27.4471 38.2374 27.1763 38.2362 26.8937V25.9433C38.2354 25.365 38.0054 24.8107 37.5965 24.4018C37.1875 23.9928 36.6332 23.7628 36.0549 23.762H35.106C34.8238 23.7611 34.5533 23.6494 34.3528 23.4509L33.5416 22.6389C33.1323 22.2306 32.5777 22.0013 31.9995 22.0013C31.4214 22.0013 30.8668 22.2306 30.4575 22.6389L29.647 23.4509C29.4465 23.65 29.1757 23.7623 28.8931 23.7635H27.9427C27.3647 23.7643 26.8105 23.9941 26.4017 24.4027C25.9928 24.8113 25.7626 25.3653 25.7614 25.9433V26.8937C25.7605 27.1759 25.6488 27.4464 25.4503 27.6469L24.6376 28.4581C24.2293 28.8674 24 29.422 24 30.0001C24 30.5783 24.2293 31.1329 24.6376 31.5422L25.4503 32.3527C25.6494 32.5532 25.7617 32.824 25.7629 33.1066V34.057C25.7637 34.6353 25.9937 35.1896 26.4026 35.5985C26.8116 36.0075 27.3659 36.2375 27.9442 36.2383H28.8931C29.1754 36.2394 29.4459 36.3514 29.6463 36.5502L30.4575 37.3621C30.8667 37.7706 31.4213 38 31.9995 38C32.5778 38 33.1324 37.7706 33.5416 37.3621L34.3521 36.5509C34.5526 36.3518 34.8234 36.2395 35.106 36.2383H36.0564C36.6347 36.2375 37.189 36.0075 37.5979 35.5985C38.0069 35.1896 38.2369 34.6353 38.2377 34.057V33.1066C38.2388 32.8242 38.3511 32.5536 38.5503 32.3534L39.3615 31.5422C39.7698 31.1329 39.9991 30.5783 39.9991 30.0001C39.9991 29.422 39.7698 28.8674 39.3615 28.4581L38.5488 27.6476Z" fill="#FFCB03"/>
                  <path d="M31.254 32.0465C31.1807 32.0466 31.1081 32.0323 31.0404 32.0042C30.9727 31.9761 30.9112 31.9348 30.8596 31.8827L29.3711 30.3943C29.2725 30.2885 29.2188 30.1485 29.2214 30.0039C29.224 29.8593 29.2825 29.7213 29.3848 29.6191C29.4871 29.5168 29.625 29.4582 29.7696 29.4557C29.9142 29.4531 30.0542 29.5068 30.16 29.6054L31.254 30.6987L33.8365 28.1169C33.9423 28.0183 34.0823 27.9646 34.2269 27.9672C34.3715 27.9697 34.5095 28.0283 34.6117 28.1306C34.714 28.2329 34.7726 28.3708 34.7751 28.5154C34.7777 28.66 34.724 28.8 34.6254 28.9058L31.6485 31.8827C31.5968 31.9348 31.5354 31.9761 31.4677 32.0042C31.4 32.0323 31.3273 32.0466 31.254 32.0465Z" fill="#282320"/>
                  <path d="M31.9998 37.9993C31.7134 37.9997 31.4298 37.9436 31.1652 37.8342C30.9006 37.7247 30.6601 37.5641 30.4577 37.3615L29.6458 36.5488C29.5472 36.4497 29.4299 36.3711 29.3008 36.3175C29.1716 36.264 29.0332 36.2366 28.8934 36.237H27.9422C27.3641 36.2364 26.8098 36.0064 26.401 35.5976C25.9921 35.1888 25.7622 34.6345 25.7616 34.0564V33.106C25.7621 32.9662 25.7348 32.8278 25.6814 32.6986C25.628 32.5695 25.5495 32.4522 25.4505 32.3536L24.6378 31.5416C24.2295 31.1323 24.0002 30.5777 24.0002 29.9995C24.0002 29.4214 24.2295 28.8668 24.6378 28.4575L25.4505 27.6455C25.5497 27.547 25.6283 27.4297 25.6818 27.3005C25.7353 27.1714 25.7627 27.0329 25.7624 26.8931V25.942C25.763 25.3638 25.9929 24.8095 26.4017 24.4007C26.8105 23.9919 27.3648 23.762 27.943 23.7614H28.8934C29.0331 23.7618 29.1716 23.7345 29.3007 23.6811C29.4299 23.6277 29.5471 23.5493 29.6458 23.4503L30.4577 22.6376C30.8671 22.2293 31.4216 22 31.9998 22C32.5779 22 33.1325 22.2293 33.5418 22.6376L34.3538 23.4503C34.4524 23.5494 34.5696 23.628 34.6988 23.6815C34.8279 23.7351 34.9664 23.7625 35.1062 23.7621H36.0574C36.6355 23.7627 37.1898 23.9926 37.5986 24.4015C38.0074 24.8103 38.2374 25.3646 38.238 25.9427V26.8931C38.2375 27.0329 38.2648 27.1713 38.3182 27.3005C38.3716 27.4296 38.4501 27.5469 38.5491 27.6455L39.361 28.4575C39.7693 28.8668 39.9986 29.4214 39.9986 29.9995C39.9986 30.5777 39.7693 31.1323 39.361 31.5416L38.5491 32.3536C38.4499 32.4521 38.3713 32.5694 38.3178 32.6985C38.2643 32.8277 38.2369 32.9662 38.2372 33.106V34.0571C38.2366 34.6353 38.0067 35.1896 37.5979 35.5984C37.1891 36.0072 36.6348 36.2371 36.0566 36.2377H35.1062C34.9664 36.2374 34.8279 36.2648 34.6988 36.3183C34.5696 36.3718 34.4524 36.4504 34.3538 36.5496L33.5418 37.3615C33.3394 37.5641 33.099 37.7247 32.8344 37.8342C32.5698 37.9436 32.2862 37.9997 31.9998 37.9993ZM27.9422 24.8777C27.66 24.8779 27.3894 24.9901 27.1899 25.1897C26.9904 25.3892 26.8782 25.6598 26.878 25.942V26.8931C26.879 27.1799 26.823 27.4641 26.7133 27.7291C26.6035 27.994 26.4422 28.2346 26.2387 28.4367L25.4275 29.2479C25.228 29.4478 25.116 29.7187 25.116 30.001C25.116 30.2834 25.228 30.5543 25.4275 30.7542L26.2387 31.5654C26.442 31.7673 26.6032 32.0076 26.713 32.2723C26.8227 32.537 26.8788 32.8209 26.878 33.1075V34.0586C26.8782 34.3408 26.9904 34.6114 27.1899 34.8109C27.3894 35.0105 27.66 35.1227 27.9422 35.1229H28.8934C29.1799 35.1222 29.4637 35.1783 29.7284 35.2881C29.9931 35.3978 30.2334 35.5589 30.4354 35.7622L31.2466 36.5734C31.4466 36.7728 31.7174 36.8848 31.9998 36.8848C32.2822 36.8848 32.553 36.7728 32.753 36.5734L33.5642 35.7622C33.7662 35.5589 34.0065 35.3978 34.2712 35.2881C34.5359 35.1783 34.8197 35.1222 35.1062 35.1229H36.0574C36.3396 35.1227 36.6101 35.0105 36.8097 34.8109C37.0092 34.6114 37.1214 34.3408 37.1216 34.0586V33.106C37.1208 32.8194 37.1769 32.5355 37.2866 32.2708C37.3963 32.0061 37.5576 31.7658 37.7609 31.5639L38.5721 30.7527C38.7715 30.5528 38.8835 30.2819 38.8835 29.9995C38.8835 29.7172 38.7715 29.4463 38.5721 29.2464L37.7609 28.4367C37.5577 28.2346 37.3966 27.9943 37.2868 27.7297C37.1771 27.465 37.1209 27.1811 37.1216 26.8946V25.942C37.1214 25.6598 37.0092 25.3892 36.8097 25.1897C36.6101 24.9901 36.3396 24.8779 36.0574 24.8777H35.1062C34.8194 24.8788 34.5353 24.8228 34.2703 24.713C34.0053 24.6033 33.7648 24.442 33.5627 24.2384L32.7515 23.4272C32.5515 23.2278 32.2807 23.1158 31.9983 23.1158C31.7159 23.1158 31.4451 23.2278 31.2451 23.4272L30.4369 24.2384C30.235 24.4418 29.9947 24.603 29.73 24.7127C29.4653 24.8225 29.1814 24.8786 28.8948 24.8777H27.9422Z" fill="#282320"/>
                  </svg>
                  )}
               
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  (currentPanel.NCCLicensedetails || partnerDetails?.profile_stage.percentage>=60) ? "text-mtn-400" : ""
                } `}
              >
                NCC VAS
              </p>
            </li>

            <li
              className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer"
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
                className={`h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.NLRCLicensedetails ? "border border-mtn-400" : ""
                } `}
              >
                {partnerDetails?.profile_stage == null || partnerDetails?.profile_stage.percentage <90 ?(
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.7588 0.833313H14.531C14.7075 1.14251 14.8089 1.49979 14.8089 1.88046V3.03464H16.0742C16.4356 3.03464 16.7814 3.12562 17.0863 3.29592V3.16079C17.0863 1.87538 16.0443 0.833313 14.7588 0.833313Z" fill="#686868"/>
                  <path d="M16.7855 4.40326C16.5983 4.21345 16.3458 4.10889 16.0745 4.10889H13.7351V1.88046C13.7351 1.30393 13.2657 0.834745 12.6881 0.833313H3.33337V19.1666H17.0866V5.17344C17.0908 4.87803 16.9839 4.6045 16.7855 4.40326ZM13.5735 16.8737H6.83558V15.7999H13.5735V16.8737ZM13.5735 14.6185H6.83558V13.5448H13.5735V14.6185ZM12.4006 9.31803L12.5297 11.7742L10.2242 10.9176L7.92816 11.7994L8.0304 9.34202L6.4822 7.43088L8.85092 6.76873L10.1901 4.70576L11.5518 6.75394L13.9276 7.39009L12.4006 9.31803Z" fill="#686868"/>
                  <path d="M10.8828 7.68613L10.2013 6.66125L9.53124 7.69354L8.34595 8.0249L9.12064 8.98114L9.06947 10.2108L10.2184 9.76958L11.372 10.1982L11.3074 8.96918L12.0716 8.00446L10.8828 7.68613Z" fill="#666666"/>
                  </svg>
                ):(
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.7588 10.8333H24.531C24.7075 11.1425 24.8089 11.4998 24.8089 11.8805V13.0346H26.0742C26.4356 13.0346 26.7814 13.1256 27.0863 13.2959V13.1608C27.0863 11.8754 26.0443 10.8333 24.7588 10.8333Z" fill="#666666"/>
                  <path d="M26.7855 14.4033C26.5983 14.2134 26.3458 14.1089 26.0745 14.1089H23.7351V11.8805C23.7351 11.3039 23.2657 10.8347 22.6881 10.8333H13.3334V29.1666H27.0866V15.1734C27.0908 14.878 26.9839 14.6045 26.7855 14.4033ZM23.5735 26.8737H16.8356V25.7999H23.5735V26.8737ZM23.5735 24.6185H16.8356V23.5448H23.5735V24.6185ZM22.4006 19.318L22.5297 21.7742L20.2242 20.9176L17.9282 21.7994L18.0304 19.342L16.4822 17.4309L18.8509 16.7687L20.1901 14.7058L21.5518 16.7539L23.9276 17.3901L22.4006 19.318Z" fill="#666666"/>
                  <path d="M20.8828 17.6861L20.2013 16.6613L19.5312 17.6935L18.3459 18.0249L19.1206 18.9811L19.0695 20.2108L20.2184 19.7696L21.372 20.1982L21.3074 18.9692L22.0716 18.0045L20.8828 17.6861Z" fill="#666666"/>
                  <path d="M38.5488 27.6476C38.3497 27.4471 38.2374 27.1763 38.2362 26.8937V25.9433C38.2354 25.365 38.0054 24.8107 37.5965 24.4018C37.1875 23.9928 36.6332 23.7628 36.0549 23.762H35.106C34.8238 23.7611 34.5533 23.6494 34.3528 23.4509L33.5416 22.6389C33.1323 22.2306 32.5777 22.0013 31.9995 22.0013C31.4214 22.0013 30.8668 22.2306 30.4575 22.6389L29.647 23.4509C29.4465 23.65 29.1757 23.7623 28.8931 23.7635H27.9427C27.3647 23.7643 26.8105 23.9941 26.4017 24.4027C25.9928 24.8113 25.7626 25.3653 25.7614 25.9433V26.8937C25.7605 27.1759 25.6488 27.4464 25.4503 27.6469L24.6376 28.4581C24.2293 28.8674 24 29.422 24 30.0001C24 30.5783 24.2293 31.1329 24.6376 31.5422L25.4503 32.3527C25.6494 32.5532 25.7617 32.824 25.7629 33.1066V34.057C25.7637 34.6353 25.9937 35.1896 26.4026 35.5985C26.8116 36.0075 27.3659 36.2375 27.9442 36.2383H28.8931C29.1754 36.2394 29.4459 36.3514 29.6463 36.5502L30.4575 37.3621C30.8667 37.7706 31.4213 38 31.9995 38C32.5778 38 33.1324 37.7706 33.5416 37.3621L34.3521 36.5509C34.5526 36.3518 34.8234 36.2395 35.106 36.2383H36.0564C36.6347 36.2375 37.189 36.0075 37.5979 35.5985C38.0069 35.1896 38.2369 34.6353 38.2377 34.057V33.1066C38.2388 32.8242 38.3511 32.5536 38.5503 32.3534L39.3615 31.5422C39.7698 31.1329 39.9991 30.5783 39.9991 30.0001C39.9991 29.422 39.7698 28.8674 39.3615 28.4581L38.5488 27.6476Z" fill="#FFCB03"/>
                  <path d="M31.254 32.0465C31.1807 32.0466 31.1081 32.0323 31.0404 32.0042C30.9727 31.9761 30.9112 31.9348 30.8596 31.8827L29.3711 30.3943C29.2725 30.2885 29.2188 30.1485 29.2214 30.0039C29.224 29.8593 29.2825 29.7213 29.3848 29.6191C29.4871 29.5168 29.625 29.4582 29.7696 29.4557C29.9142 29.4531 30.0542 29.5068 30.16 29.6054L31.254 30.6987L33.8365 28.1169C33.9423 28.0183 34.0823 27.9646 34.2269 27.9672C34.3715 27.9697 34.5095 28.0283 34.6117 28.1306C34.714 28.2329 34.7726 28.3708 34.7751 28.5154C34.7777 28.66 34.724 28.8 34.6254 28.9058L31.6485 31.8827C31.5968 31.9348 31.5354 31.9761 31.4677 32.0042C31.4 32.0323 31.3273 32.0466 31.254 32.0465Z" fill="#282320"/>
                  <path d="M31.9998 37.9993C31.7134 37.9997 31.4298 37.9436 31.1652 37.8342C30.9006 37.7247 30.6601 37.5641 30.4577 37.3615L29.6458 36.5488C29.5472 36.4497 29.4299 36.3711 29.3008 36.3175C29.1716 36.264 29.0332 36.2366 28.8934 36.237H27.9422C27.3641 36.2364 26.8098 36.0064 26.401 35.5976C25.9921 35.1888 25.7622 34.6345 25.7616 34.0564V33.106C25.7621 32.9662 25.7348 32.8278 25.6814 32.6986C25.628 32.5695 25.5495 32.4522 25.4505 32.3536L24.6378 31.5416C24.2295 31.1323 24.0002 30.5777 24.0002 29.9995C24.0002 29.4214 24.2295 28.8668 24.6378 28.4575L25.4505 27.6455C25.5497 27.547 25.6283 27.4297 25.6818 27.3005C25.7353 27.1714 25.7627 27.0329 25.7624 26.8931V25.942C25.763 25.3638 25.9929 24.8095 26.4017 24.4007C26.8105 23.9919 27.3648 23.762 27.943 23.7614H28.8934C29.0331 23.7618 29.1716 23.7345 29.3007 23.6811C29.4299 23.6277 29.5471 23.5493 29.6458 23.4503L30.4577 22.6376C30.8671 22.2293 31.4216 22 31.9998 22C32.5779 22 33.1325 22.2293 33.5418 22.6376L34.3538 23.4503C34.4524 23.5494 34.5696 23.628 34.6988 23.6815C34.8279 23.7351 34.9664 23.7625 35.1062 23.7621H36.0574C36.6355 23.7627 37.1898 23.9926 37.5986 24.4015C38.0074 24.8103 38.2374 25.3646 38.238 25.9427V26.8931C38.2375 27.0329 38.2648 27.1713 38.3182 27.3005C38.3716 27.4296 38.4501 27.5469 38.5491 27.6455L39.361 28.4575C39.7693 28.8668 39.9986 29.4214 39.9986 29.9995C39.9986 30.5777 39.7693 31.1323 39.361 31.5416L38.5491 32.3536C38.4499 32.4521 38.3713 32.5694 38.3178 32.6985C38.2643 32.8277 38.2369 32.9662 38.2372 33.106V34.0571C38.2366 34.6353 38.0067 35.1896 37.5979 35.5984C37.1891 36.0072 36.6348 36.2371 36.0566 36.2377H35.1062C34.9664 36.2374 34.8279 36.2648 34.6988 36.3183C34.5696 36.3718 34.4524 36.4504 34.3538 36.5496L33.5418 37.3615C33.3394 37.5641 33.099 37.7247 32.8344 37.8342C32.5698 37.9436 32.2862 37.9997 31.9998 37.9993ZM27.9422 24.8777C27.66 24.8779 27.3894 24.9901 27.1899 25.1897C26.9904 25.3892 26.8782 25.6598 26.878 25.942V26.8931C26.879 27.1799 26.823 27.4641 26.7133 27.7291C26.6035 27.994 26.4422 28.2346 26.2387 28.4367L25.4275 29.2479C25.228 29.4478 25.116 29.7187 25.116 30.001C25.116 30.2834 25.228 30.5543 25.4275 30.7542L26.2387 31.5654C26.442 31.7673 26.6032 32.0076 26.713 32.2723C26.8227 32.537 26.8788 32.8209 26.878 33.1075V34.0586C26.8782 34.3408 26.9904 34.6114 27.1899 34.8109C27.3894 35.0105 27.66 35.1227 27.9422 35.1229H28.8934C29.1799 35.1222 29.4637 35.1783 29.7284 35.2881C29.9931 35.3978 30.2334 35.5589 30.4354 35.7622L31.2466 36.5734C31.4466 36.7728 31.7174 36.8848 31.9998 36.8848C32.2822 36.8848 32.553 36.7728 32.753 36.5734L33.5642 35.7622C33.7662 35.5589 34.0065 35.3978 34.2712 35.2881C34.5359 35.1783 34.8197 35.1222 35.1062 35.1229H36.0574C36.3396 35.1227 36.6101 35.0105 36.8097 34.8109C37.0092 34.6114 37.1214 34.3408 37.1216 34.0586V33.106C37.1208 32.8194 37.1769 32.5355 37.2866 32.2708C37.3963 32.0061 37.5576 31.7658 37.7609 31.5639L38.5721 30.7527C38.7715 30.5528 38.8835 30.2819 38.8835 29.9995C38.8835 29.7172 38.7715 29.4463 38.5721 29.2464L37.7609 28.4367C37.5577 28.2346 37.3966 27.9943 37.2868 27.7297C37.1771 27.465 37.1209 27.1811 37.1216 26.8946V25.942C37.1214 25.6598 37.0092 25.3892 36.8097 25.1897C36.6101 24.9901 36.3396 24.8779 36.0574 24.8777H35.1062C34.8194 24.8788 34.5353 24.8228 34.2703 24.713C34.0053 24.6033 33.7648 24.442 33.5627 24.2384L32.7515 23.4272C32.5515 23.2278 32.2807 23.1158 31.9983 23.1158C31.7159 23.1158 31.4451 23.2278 31.2451 23.4272L30.4369 24.2384C30.235 24.4418 29.9947 24.603 29.73 24.7127C29.4653 24.8225 29.1814 24.8786 28.8948 24.8777H27.9422Z" fill="#282320"/>
                  </svg>
                  )}
              </div>
              <p
                className={`group-hover:text-mtn-400 ${
                  (currentPanel.NLRCLicensedetails || (partnerDetails?.profile_stage !==null && partnerDetails?.profile_stage.percentage>=90)) ? "text-mtn-400" : ""
                } `}
              >
                NLRC Licence
              </p>
            </li>

            <li
              className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer"
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
                className={`h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.ShortCodeDetais ? "border border-mtn-400" : ""
                } `}
              >
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
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.ShortCodeDetais ? "text-mtn-400" : ""
                } `}
              >
                Short Code
              </p>
            </li>

            <li
              className="w-[100%] min-h-[50px] flex gap-5 items-center group cursor-pointer"
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
                className={`h-[40px] w-[40px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center ${
                  currentPanel.ReviewAndSubmit ? "border border-mtn-400" : ""
                } `}
              >
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
              <p
                className={`group-hover:text-mtn-400 ${
                  currentPanel.ReviewAndSubmit ? "text-mtn-400" : ""
                } `}
              >
                Review and Submit
              </p>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export const NCCLicensedetails = ({closeAggregatorComplianceFormFlyout, partnerDetails, currentPanel, setCurrentPanel,}) => {
  const [startDate, setstartDate] = useState(getToday());
  const [formData, setFormData] = useState({
    vas_partner_uuid: partnerDetails.vas_partner_uuid,
    aggregator_uuid: partnerDetails.aggregator_uuid,
    vas_category_uuid: partnerDetails.vas_category_uuid,
    vas_type_uuid: partnerDetails.vas_type_uuid,
    vas_license_id: "",
    ncc_issue_date: "",
    ncc_expiry_date: "",
    ncc_doc: {},
    ncc_file: "",
  });


  const {getAggregatorVasPartnerDetails,} = usePartners();
  const [vasPartnerResponse, setVasPartnerResponse] = useState();
  let getAggregatorVasPartnerDetailsResponse = null;
    const get_aggregator_vas_partner_details = async () => {
      try {
        
        getAggregatorVasPartnerDetailsResponse = await getAggregatorVasPartnerDetails(partnerDetails.aggregator_uuid, partnerDetails.vas_partner_uuid);
        let vas_partner_response = getAggregatorVasPartnerDetailsResponse.result[0];
        setVasPartnerResponse(vas_partner_response);
        if(vas_partner_response.profile_stage.ncclicense>0){ /////// NCCLicensedetails done
          setFormData({
            ...formData,
            vas_partner_uuid: vas_partner_response.vas_partner_uuid,
            aggregator_uuid: vas_partner_response.aggregator_uuid,
            vas_category_uuid: vas_partner_response.vas_category_uuid,
            vas_type_uuid: vas_partner_response.vas_type_uuid,
            vas_license_id: vas_partner_response.vas_license_id,
            ncc_issue_date: vas_partner_response.ncc_issue_date,
            ncc_expiry_date: vas_partner_response.ncc_expiry_date,
            ncc_doc: {
              file_name: vas_partner_response.ncc_doc.file_name,
              file_size: vas_partner_response.ncc_doc.file_size,
              file_type: vas_partner_response.ncc_doc.file_size,
              file_path: vas_partner_response.ncc_doc.file_path
          },
            ncc_file: "",
          });
         }

      } catch (error) {
        console.log("getAggregatorVasPartnerDetails_response error", error);
      }
    };
  
    useEffect(() => {
      get_aggregator_vas_partner_details();
    }, []);
  
  const states = useStoreState((state) => state);
   const [error, setError] = useState("");
   const clearError = () => {
     setError(null);
   };
 
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const handleFileChange = (e) => {
    const inputName = e.target.name;
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
      setError("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setError("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      ncc_doc:{},
      [inputName]: e.target.files[0],
    });
  };
  useEffect(() => {
    setDoc(null);
  }, []);



  const saveNCCLicensedetails = async () => {
    const vas_license_id = formData.vas_license_id;
    const ncc_issue_date = formData.ncc_issue_date;
    const ncc_expiry_date = formData.ncc_expiry_date;
    clearError();
    if (vas_license_id === "") {
      setError("Provide VAS Licence ID To Continue!");
    } else if (ncc_issue_date === "") {
      setError("Provide Issue Date To Continue!");
    } else if (ncc_expiry_date === "") {
      setError("Provide Expiry Date ID To Continue!");
    } else {

      try {
       
          const formDataToSend = new FormData();
          formDataToSend.append("vas_partner_uuid", formData.vas_partner_uuid);
          formDataToSend.append("aggregator_uuid", formData.aggregator_uuid);
          formDataToSend.append("vas_category_uuid", formData.vas_category_uuid);
          formDataToSend.append("vas_type_uuid", formData.vas_type_uuid);
          formDataToSend.append("vas_license_id", formData.vas_license_id);
          formDataToSend.append("ncc_issue_date", formData.ncc_issue_date);
          formDataToSend.append("ncc_expiry_date", formData.ncc_expiry_date);
          formDataToSend.append("ncc_doc", JSON.stringify(formData.ncc_doc));
          formDataToSend.append("ncc_file", formData.ncc_file);
          setSendAction(true);
          const response = await axios.post(
            RemoteEndpoints.VAS_PERTNER_ONBOARDING_NCCLICENSE,
            formDataToSend,
            {
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${states.users.token}`,
              },
            }
          );
          sessionStorage.setItem(
            "session_NCCLicensedetails",
            JSON.stringify(response)
          );
          console.log('saveNCCLicensedetails response', response);
          successAction(response.data.data.message, true);
          
          setCurrentPanel({
            ...currentPanel,
            NCCLicensedetails: false,
            NLRCLicensedetails: true,
            ShortCodeDetais: false,
            ReviewAndSubmit: false,
          });
          setSendAction(false);
       
      } catch (err) {
      setSendAction(false);
      successAction(err.response.data.data.message, false);
    } 
      
    }
  };
  const [sendAction, setSendAction] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
  const successAction = (message, alert) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      alert: alert,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
        alert: false,
        status: false,
      }));
    }, 3000);

    return () => clearTimeout(timeoutId);
  };


  return (
    <>
      <AggregatorComplianceNav
        closeAggregatorComplianceFormFlyout={
          closeAggregatorComplianceFormFlyout
        }
        partnerDetails={vasPartnerResponse}
      />

      <div className="absolute top-[50px] flex  h-screen w-screen justify-center">
        <AggregatorComplianceProgressiveNav
          closeAggregatorComplianceFormFlyout={
            closeAggregatorComplianceFormFlyout
          }
          partnerDetails={vasPartnerResponse}
          currentPanel={currentPanel}
          setCurrentPanel={setCurrentPanel}
        />

        <div className="w-[calc(100%-250px)] h-[100%] absolute right-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
          <div className="pt-[50px] w-[100%] h-auto flex justify-center">
            <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out]">
              <div className="mb-5 w-full flex flex-col gap-3">
                <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
                  Your company's NCC License details
                </h1>
                <p>Let’s get you started, Choose a partner category</p>
              </div>
              {error && (
                <div className="text-red-500 flex gap-3 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <TextInput
                id="vas_license_id"
                label="VAS License ID"
                type="text"
                name="vas_license_id"
                value={
                  formData.vas_license_id || vasPartnerResponse?.vas_license_id
                }
                onChange={handleChange}
              />

              <div className="flex gap-3">
                <div className="w-[50%]">
                  <TextInput
                    id="ncc_issue_date"
                    label="Issuing Date"
                    type="date"
                    name="ncc_issue_date"
                    max={startDate}
                    value={
                      formData.ncc_issue_date ||
                      vasPartnerResponse?.ncc_issue_date
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[50%]">
                  <TextInput
                    id="ncc_expiry_date"
                    label="Expiry Date"
                    type="date"
                    name="ncc_expiry_date"
                    min={startDate}
                    value={
                      formData.ncc_expiry_date ||
                      vasPartnerResponse?.ncc_expiry_date
                    }
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
                        name="ncc_file"
                        id="ncc_file"
                        accept=".pdf,.PDF"
                      />

                      {!doc?.file_name && (
                        <div
                          className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                        >
                          <div className="flex flex-row gap-3">
                            <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                              {vasPartnerResponse ? (
                                <FileUploadActiveIcon />
                              ) : (
                                <FileUploadIcon />
                              )}
                            </div>

                            <div className="text-[#999999]">
                              <p>
                                Upload <br />
                                <span className="text-white font-mtn-bold">
                                  {vasPartnerResponse?.ncc_doc
                                    ? vasPartnerResponse.ncc_doc.file_name
                                    : "NCC VAS License"}
                                </span>
                                <br />
                                {vasPartnerResponse?.ncc_doc
                                  ? getFileSizeText(
                                      vasPartnerResponse.ncc_doc.file_size
                                    )
                                  : "Drag and drop here or"}
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
                {sendAction ? (
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                ) : (
                  <>
                    <button
                      className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
                      onClick={closeAggregatorComplianceFormFlyout}
                    >
                      &lt; Back
                    </button>

                    <button
                      className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
                      onClick={() => saveNCCLicensedetails()}
                    >
                      {vasPartnerResponse?.profile_stage=== null ? (
                              <span> Next &gt;</span>
                          ) : (
                              <span> update &gt;</span>
                          )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessToast.status && (
        <NewSuccess
          message={showSuccessToast.message}
          alert={showSuccessToast.alert}
        />
      )}
    </>
  );
};

export const NLRCLicensedetails = ({closeAggregatorComplianceFormFlyout, partnerDetails, currentPanel,  setCurrentPanel,}) => {
  const [startDate, setstartDate] = useState(getToday());
    const [formData, setFormData] = useState({
    vas_partner_uuid: partnerDetails.vas_partner_uuid,
    aggregator_uuid: partnerDetails.aggregator_uuid,
    vas_category_uuid: partnerDetails.vas_category_uuid,
    nlrc_license_type: "",
    nlrc_license_id: "",
    nlrc_issue_date: "",
    nlrc_expiry_date: "",
    nlrc_doc: {},
    nlrc_file: "",
  });

  const {getAggregatorVasPartnerDetails,} = usePartners();
  const [vasPartnerResponse, setVasPartnerResponse] = useState();
  let getAggregatorVasPartnerDetailsResponse = null;
    const get_aggregator_vas_partner_details = async () => {
      try {
        
        getAggregatorVasPartnerDetailsResponse = await getAggregatorVasPartnerDetails(partnerDetails.aggregator_uuid, partnerDetails.vas_partner_uuid);
        let vas_partner_response = getAggregatorVasPartnerDetailsResponse.result[0];
        setVasPartnerResponse(vas_partner_response);
       
        if(vas_partner_response.profile_stage.nlrclicense>0){ /////// NCCLicensedetails done
          setFormData({
            ...formData,
            vas_partner_uuid: vas_partner_response.vas_partner_uuid,
            aggregator_uuid: vas_partner_response.aggregator_uuid,
            vas_category_uuid: vas_partner_response.vas_category_uuid,
            nlrc_license_type: vas_partner_response.nlrc_license_type,
            nlrc_license_id: vas_partner_response.nlrc_license_id,
            nlrc_issue_date: vas_partner_response.nlrc_issue_date,
            nlrc_expiry_date: vas_partner_response.nlrc_expiry_date,
            nlrc_doc: {
              file_name: vas_partner_response.nlrc_doc.file_name,
              file_size: vas_partner_response.nlrc_doc.file_size,
              file_type: vas_partner_response.nlrc_doc.file_size,
              file_path: vas_partner_response.nlrc_doc.file_path
          },
          nlrc_file: "",
          });
         }

      } catch (error) {
        console.log("getAggregatorVasPartnerDetails_response error", error);
      }
    };
  
    useEffect(() => {
      get_aggregator_vas_partner_details();
    }, []);
  
 const states = useStoreState((state) => state);
 const [error, setError] = useState("");
   const clearError = () => {
     setError(null);
   };


   const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const handleFileChange = (e) => {
    const inputName = e.target.name;
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
      setError("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setError("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      nlrc_doc:{},
      [inputName]: e.target.files[0],
    });
  };
  useEffect(() => {
    setDoc(null);
  }, []);


  const saveNLRCLicenseDetails = async () => {
    const nlrc_license_type = formData.nlrc_license_type;
    const nlrc_license_id = formData.nlrc_license_id;
    const nlrc_issue_date = formData.nlrc_issue_date;
    const nlrc_expiry_date = formData.nlrc_expiry_date;
    clearError();
    if (nlrc_license_type === "") {
      setError("Select NLRC Licence Type To Continue!");
    } else if (nlrc_license_id === "") {
      setError("Provide NLRC License ID To Continue!");
    } else if (nlrc_issue_date === "") {
      setError("Provide Issue Date To Continue!");
    } else if (nlrc_expiry_date === "") {
      setError("Provide Expiry Date ID To Continue!");
    } else {

      try {
       
          const formDataToSend = new FormData();
          formDataToSend.append("vas_partner_uuid", formData.vas_partner_uuid);
          formDataToSend.append("aggregator_uuid", formData.aggregator_uuid);
          formDataToSend.append("vas_category_uuid", formData.vas_category_uuid);
          formDataToSend.append("nlrc_license_type", formData.nlrc_license_type);
          formDataToSend.append("nlrc_license_id", formData.nlrc_license_id);
          formDataToSend.append("nlrc_issue_date", formData.nlrc_issue_date);
          formDataToSend.append("nlrc_expiry_date", formData.nlrc_expiry_date);
          formDataToSend.append("nlrc_doc", JSON.stringify(formData.nlrc_doc));
          formDataToSend.append("nlrc_file", formData.nlrc_file);
          setSendAction(true);
          const response = await axios.post(
            RemoteEndpoints.VAS_PERTNER_ONBOARDING_NLRCLICENSE,
            formDataToSend,
            {
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${states.users.token}`,
              },
            }
          );
          successAction(response.data.data.message, true);
          setCurrentPanel({
            ...currentPanel,
            NCCLicensedetails: false,
            NLRCLicensedetails: false,
            ShortCodeDetais: true,
            ReviewAndSubmit: false,
          });
          setSendAction(false);
       
      } catch (err) {
      setSendAction(false);
      successAction(err.response.data.data.message, false);
    } 
      
    }
  };

  const [sendAction, setSendAction] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
  const successAction = (message, alert) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      alert: alert,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
        alert: false,
        status: false,
      }));
    }, 3000);

    return () => clearTimeout(timeoutId);
  };


  return (
    <>
      <AggregatorComplianceNav
        closeAggregatorComplianceFormFlyout={
          closeAggregatorComplianceFormFlyout
        }
        partnerDetails={vasPartnerResponse}
      />

      <div className="absolute top-[50px] flex  h-screen w-screen justify-center">
        <AggregatorComplianceProgressiveNav
          closeAggregatorComplianceFormFlyout={
            closeAggregatorComplianceFormFlyout
          }
          partnerDetails={vasPartnerResponse}
          currentPanel={currentPanel}
          setCurrentPanel={setCurrentPanel}
        />

        <div className="w-[calc(100%-250px)] h-[100%] absolute right-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
          <div className="pt-[50px] w-[100%] h-auto flex justify-center">
            <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out]">
              <div className="mb-5 w-full flex flex-col gap-3">
                <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
                  Provide your company's NLRC License details
                </h1>
              </div>
              {error && (
                <div className="text-red-500 flex gap-3 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              <SelectInput
                id="nlrc_license_type"
                label="Licence Type"
                name="nlrc_license_type"
                onChange={handleChange}
              >
                <SelectInputOption value={
                  formData.nlrc_license_type ||
                  vasPartnerResponse?.nlrc_license_type
                } label={
                  formData.nlrc_license_type ||
                  vasPartnerResponse?.nlrc_license_type
                } />
                {license_type.map((ct) => (
                  <SelectInputOption
                    key={ct.value}
                    value={ct.value}
                    label={ct.label}
                  />
                ))}
              </SelectInput>

              <TextInput
                id="nlrc_license_id"
                label="NLRC License ID"
                type="text"
                name="nlrc_license_id"
                value={
                  formData.nlrc_license_id ||
                  vasPartnerResponse?.nlrc_license_id
                }
                onChange={handleChange}
              />

              <div className="flex gap-3">
                <div className="w-[50%]">
                  <TextInput
                    id="nlrc_issue_date"
                    label="Issuing Date"
                    type="date"
                    name="nlrc_issue_date"
                    max={startDate}
                    value={
                      formData.nlrc_issue_date ||
                      vasPartnerResponse?.nlrc_issue_date
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[50%]">
                  <TextInput
                    id="nlrc_expiry_date"
                    label="Expiry Date"
                    type="date"
                    name="nlrc_expiry_date"
                    min={startDate}
                    value={
                      formData.nlrc_expiry_date ||
                      vasPartnerResponse?.nlrc_expiry_date
                    }
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
                        name="nlrc_file"
                        id="nlrc_file"
                        accept=".pdf,.PDF"
                      />

                      {!doc?.file_name && (
                        <div
                          className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                        >
                          <div className="flex flex-row gap-3">
                            <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px] bg-[#111111] z-1">
                              {vasPartnerResponse?.nlrc_doc ? (
                                <FileUploadActiveIcon />
                              ) : (
                                <FileUploadIcon />
                              )}
                            </div>

                            <div className="text-[#999999]">
                              <p>
                                Upload <br />
                                <span className="text-white font-mtn-bold">
                                  {vasPartnerResponse?.nlrc_doc
                                    ? vasPartnerResponse.nlrc_doc.file_name
                                    : "NLRC VAS License"}
                                </span>
                                <br />
                                {vasPartnerResponse?.nlrc_doc
                                  ? getFileSizeText(
                                      vasPartnerResponse.nlrc_doc.file_size
                                    )
                                  : "Drag and drop here or"}
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
                {sendAction ? (
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                ) : (
                  <>
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
                      onClick={() => saveNLRCLicenseDetails()}
                    >
                      {vasPartnerResponse?.profile_stage.nlrclicense == 0 ? (
                        <span> Next &gt;</span>
                      ) : (
                        <span> update &gt;</span>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessToast.status && (
        <NewSuccess
          message={showSuccessToast.message}
          alert={showSuccessToast.alert}
        />
      )}
    </>
  );
};









































export const ShortCodeDetais = ({ closeAggregatorComplianceFormFlyout, partnerDetails, currentPanel, setCurrentPanel, }) => {
  const [formData, setFormData] = useState({
    vas_partner_uuid: partnerDetails.vas_partner_uuid,
    aggregator_uuid: partnerDetails.aggregator_uuid,
    vas_category_uuid: partnerDetails.vas_category_uuid,
    shortcodes: "",
    shortcode_issue_date: "",
    shortcode_expiry_date: "",
    shortcode_file: "",
    pricing_shortcodes: "",
    pricing_issue_date: "",
    pricing_expiry_date: "",
    pricing_file: "",
    
  });
  
  const {getAggregatorVasPartnerDetails,} = usePartners();
  const [vasPartnerResponse, setVasPartnerResponse] = useState();
  let getAggregatorVasPartnerDetailsResponse = null;
    const get_aggregator_vas_partner_details = async () => {
      try {
        getAggregatorVasPartnerDetailsResponse = await getAggregatorVasPartnerDetails(partnerDetails.aggregator_uuid, partnerDetails.vas_partner_uuid);
        let vas_partner_response = getAggregatorVasPartnerDetailsResponse.result[0];
        setVasPartnerResponse(vas_partner_response);
      } catch (error) {
        console.log("getAggregatorVasPartnerDetails_response error", error);
      }
    };
    useEffect(() => {
      get_aggregator_vas_partner_details();
    }, []);
  
      const [nextPage, setNextPage] = useState(false);
      const [getShortCodeList, setGetShortCodeList] = useState(true);
      
  return (
    <>
      <AggregatorComplianceNav
        closeAggregatorComplianceFormFlyout={
          closeAggregatorComplianceFormFlyout
        }
        partnerDetails={vasPartnerResponse}
      />

      <div className="absolute top-[50px] flex  h-screen w-screen justify-center">
        <AggregatorComplianceProgressiveNav
          closeAggregatorComplianceFormFlyout={
            closeAggregatorComplianceFormFlyout
          }
          partnerDetails={vasPartnerResponse}
          currentPanel={currentPanel}
          setCurrentPanel={setCurrentPanel}
        />

        <div className="w-[calc(100%-250px)] h-[100%] absolute right-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
          <div className="pt-[50px] w-[100%] h-auto flex justify-center">
            <div className="max-w-[480px] h-auto animate-[slide-left_1s_ease-in-out] flex flex-col gap-3">
           
            {getShortCodeList &&(
                <ShortCodesList partnerDetails={partnerDetails} currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} setGetShortCodeList={setGetShortCodeList}/>
             )}
              
            {!getShortCodeList &&( 
              <>
              <ShortCodesDoc
                formData={formData}
                setFormData={setFormData}
                nextPage={nextPage}
                setNextPage={setNextPage}
                setGetShortCodeList={setGetShortCodeList}
              />
              <ShortCodesPricingDoc
                formData={formData}
                setFormData={setFormData}
                nextPage={nextPage}
                setNextPage={setNextPage}
                setGetShortCodeList={setGetShortCodeList}
              />
              </>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export const ShortCodesList = ({partnerDetails, currentPanel, setCurrentPanel, setGetShortCodeList}) => {
 
  return (
    
    <section  className={`w-[100%] h-auto animate-[slide-left_1s_ease-in-out] flex flex-col gap-3`}>
      <div className="mb-5 w-full flex flex-col gap-3">
        <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
        Provide your company's short code details
        </h1>
        <p>Check the list of your shortcodes below</p>
      </div>
    <FileInputWrapper>
                <div className="flex justify-between p-3 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="h-[40px] w-[40px] rounded-full bg-black flex items-center justify-center ">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_11321_7656)">
                          <path
                            d="M7.65668 11.7579C7.97971 11.7579 8.24261 11.495 8.24261 11.172C8.24261 10.849 7.97971 10.5861 7.65668 10.5861C7.33365 10.5861 7.07074 10.849 7.07074 11.172C7.07074 11.495 7.33365 11.7579 7.65668 11.7579Z"
                            fill="#686868"
                          />
                          <path
                            d="M7.65668 7.07043C7.97971 7.07043 8.24261 6.80753 8.24261 6.4845C8.24261 6.16147 7.97971 5.89856 7.65668 5.89856C7.33365 5.89856 7.07074 6.16147 7.07074 6.4845C7.07074 6.80753 7.33365 7.07043 7.65668 7.07043Z"
                            fill="#686868"
                          />
                          <path
                            d="M12.3442 7.07043C12.6672 7.07043 12.9301 6.80753 12.9301 6.4845C12.9301 6.16147 12.6672 5.89856 12.3442 5.89856C12.0211 5.89856 11.7582 6.16147 11.7582 6.4845C11.7582 6.80753 12.0211 7.07043 12.3442 7.07043Z"
                            fill="#686868"
                          />
                          <path
                            d="M12.3442 11.7579C12.6672 11.7579 12.9301 11.495 12.9301 11.172C12.9301 10.849 12.6672 10.5861 12.3442 10.5861C12.0211 10.5861 11.7582 10.849 11.7582 11.172C11.7582 11.495 12.0211 11.7579 12.3442 11.7579Z"
                            fill="#686868"
                          />
                          <path
                            d="M3.55511 14.1407H16.4457V3.51575H3.55511V14.1407ZM10.5864 6.4845C10.5864 5.51526 11.3749 4.72668 12.3442 4.72668C13.3134 4.72668 14.102 5.51526 14.102 6.4845C14.102 7.24835 13.6122 7.8996 12.9301 8.1416V9.51489C13.6122 9.7569 14.102 10.4081 14.102 11.172C14.102 12.1412 13.3134 12.9298 12.3442 12.9298C11.3749 12.9298 10.5864 12.1412 10.5864 11.172C10.5864 10.4081 11.0762 9.7569 11.7582 9.51489V8.1416C11.0762 7.8996 10.5864 7.24835 10.5864 6.4845ZM7.65668 4.72668C8.62591 4.72668 9.41449 5.51526 9.41449 6.4845C9.41449 7.45374 8.62591 8.24231 7.65668 8.24231C6.68744 8.24231 5.89886 7.45374 5.89886 6.4845C5.89886 5.51526 6.68744 4.72668 7.65668 4.72668ZM7.65668 9.41418C8.62591 9.41418 9.41449 10.2028 9.41449 11.172C9.41449 12.1412 8.62591 12.9298 7.65668 12.9298C6.68744 12.9298 5.89886 12.1412 5.89886 11.172C5.89886 10.2028 6.68744 9.41418 7.65668 9.41418Z"
                            fill="#686868"
                          />
                          <path
                            d="M3.55511 18.2423C3.55511 19.2115 4.34369 20.0001 5.31293 20.0001H14.6879C15.6572 20.0001 16.4457 19.2115 16.4457 18.2423V15.3126H3.55511V18.2423ZM8.82855 17.0704H11.1723V18.2423H8.82855V17.0704Z"
                            fill="#686868"
                          />
                          <path
                            d="M14.6879 0.00012207H5.31293C4.34369 0.00012207 3.55511 0.788696 3.55511 1.75793V2.34387H16.4457V1.75793C16.4457 0.788696 15.6572 0.00012207 14.6879 0.00012207Z"
                            fill="#686868"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_11321_7656">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0">
                      <h3 className="text-white font-mtn-medium">
                        12345, 12345
                      </h3>
                      <span>Issued 10/02/2021</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="border border-white/20 text-white/20 text-[11px] py-1 px-2 rounded-full w-[50px]">
                      Edit
                    </button>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="#686868"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.17004 14.83L14.83 9.16998"
                        stroke="#686868"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.83 14.83L9.17004 9.16998"
                        stroke="#686868"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </FileInputWrapper>
              
      <div className="flex gap-2 justify-end">
        <button
          className="border-1 border-gray-200 text-white text-[11px] bg-none hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={() => setGetShortCodeList(false)}
        >
         Add Shortcodes
        </button>
      </div>
            

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
              </section>
    
  );
};

export const ShortCodesDoc = ({formData, setFormData, nextPage, setNextPage, setGetShortCodeList,}) => {
  const [startDate, setstartDate] = useState(getToday());
    const [error, setError] = useState("");
  const clearError = () => {
    setError(null);
  };
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Clear the value of the TextInput
      setFormData((prevFormData) => ({
        ...prevFormData,
        shortcodes: prevFormData.shortcodes
          ? `${prevFormData.shortcodes}, ${prevFormData.temp_shortcodes}`
          : prevFormData.temp_shortcodes,
          pricing_shortcodes: prevFormData.pricing_shortcodes
          ? `${prevFormData.pricing_shortcodes}, ${prevFormData.temp_shortcodes}`
          : prevFormData.temp_shortcodes,
        temp_shortcodes: "", // Clear temp_shortcodes after appending to shortcodes
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const handleFileChange = (e) => {
    const inputName = e.target.name;
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
      setError("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setError("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      [inputName]: e.target.files[0],
    });
  };
  useEffect(() => {
    setDoc(null);
  }, []);

  const updateShortCodes = (updatedCodesString) => {
    console.log("updatedCodesString", updatedCodesString);
    setFormData((prevFormData) => ({
      ...prevFormData,
      shortcodes: updatedCodesString,
      pricing_shortcodes: updatedCodesString,
    }));
  };

  const viewNextPage = async () => {
    const shortcodes = formData.shortcodes;
    const shortcode_issue_date = formData.shortcode_issue_date;
    const shortcode_expiry_date = formData.shortcode_expiry_date;

    clearError();
    if (shortcodes === "") {
      setError("Provide Your ShortCodes To Continue!");
    } else if (shortcode_issue_date === "") {
      setError("Provide Issue Date To Continue!");
    } else if (shortcode_expiry_date === "") {
      setError("Provide Expiry Date To Continue!");
    } else {
      setNextPage(true);
    }
  };

  return (
    <section
      className={`w-[100%] h-auto animate-[slide-left_1s_ease-in-out]  flex-col gap-3 ${
        nextPage ? `hidden` : `flex`
      }`}
    >
      <div className="mb-5 w-full flex flex-col gap-3">
        <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
          Provide your company's short code details
        </h1>
      </div>
      {error && (
                <div className="text-red-500 flex gap-3 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
    <div className=" w-full rounded-[10px] flex flex-col gap-2 mb-[-20px]">
        <p>
          Enter applicable short codes: <br />
          <span className="text-[10px] text-mtn-500">
            (Enter multiple comma seperated shortcodes and pree 'Enter' to
            apply)
          </span>
        </p>
        <div className="flex gap-3">
          <ShortCodesMarker
            shortCodes={formData.shortcodes}
            updateShortCodes={updateShortCodes}
          />
        </div>
        <TextInput
          id="temp_shortcodes"
          label="Type Shortcodes Here"
          type="text"
          name="temp_shortcodes"
          value={formData.temp_shortcodes}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex gap-3 mb-[-20px]">
        <div className="w-[50%]">
          <TextInput
            id="shortcode_issue_date"
            label="Issuing Date"
            type="date"
            name="shortcode_issue_date"
            max={startDate}
            value={formData.shortcode_issue_date}
            onChange={handleChange}
          />
        </div>
        <div className="w-[50%]">
          <TextInput
            id="shortcode_expiry_date"
            label="Expiry Date"
            type="date"
            name="shortcode_expiry_date"
            min={startDate}
            value={formData.shortcode_expiry_date}
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
                className="hidden"
                name="shortcode_file"
                id="shortcode_file"
                accept=".pdf,.PDF"
                onChange={handleFileChange}
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

      <div className="flex gap-2 justify-end">
      <button
          className="border-1 border-gray-200 text-white text-[11px] bg-none hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={() => setGetShortCodeList(true)}
        >
          Go Back
        </button>
        <button
          className="border-1 border-gray-200 text-white text-[11px] bg-none hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={() => viewNextPage()}
        >
          Add Shortcode Pricing
        </button>
      </div>
    </section>
  );
};


export const ShortCodesPricingDoc = ({formData, setFormData, nextPage, setNextPage, setGetShortCodeList}) => {
  const [startDate, setstartDate] = useState(getToday());
   const states = useStoreState((state) => state);
  const [error, setError] = useState("");
  const clearError = () => {
    setError(null);
  };
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [doc, setDoc] = useState(null);
  const [fileSize, setfFileSize] = useState(null);
  const handleFileChange = (e) => {
    const inputName = e.target.name;
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
      setError("");
    } else {
      setDoc({
        file_name: null,
        file_size: null,
      });
      setError("Only PDF files are allowed");
    }
    setFormData({
      ...formData,
      [inputName]: e.target.files[0],
    });
  };
  useEffect(() => {
    setDoc(null);
  }, []);

  const updateShortCodes = (updatedCodesString) => {
    console.log("updatedCodesString", updatedCodesString);
    setFormData((prevFormData) => ({
      ...prevFormData,
      shortcodes: updatedCodesString,
      pricing_shortcodes: updatedCodesString,
    }));
  };



  const saveShortCodesDetails = async () => {
    const pricing_shortcodes = formData.pricing_shortcodes;
    const pricing_issue_date = formData.pricing_issue_date;
    const pricing_expiry_date = formData.pricing_expiry_date;
    clearError();
    if (pricing_shortcodes === "") {
      setError("Provide Your ShortCodes To Continue!");
    } else if (pricing_issue_date === "") {
      setError("Provide Issue Date To Continue!");
    } else if (pricing_expiry_date === "") {
      setError("Provide Expiry Date ID To Continue!");
    } else {

      try {
       
        const formDataToSend = new FormData();

        // Append simple key-value pairs
        formDataToSend.append("vas_partner_uuid", formData.vas_partner_uuid);
        formDataToSend.append("aggregator_uuid", formData.aggregator_uuid);
        formDataToSend.append("vas_category_uuid", formData.vas_category_uuid);
        
        // Append shortcode object
        formDataToSend.append("shortcode[shortcode_issue_date]", formData.shortcode_issue_date);
        formDataToSend.append("shortcode[shortcode_expiry_date]", formData.shortcode_expiry_date);
        formDataToSend.append("shortcode[shortcode_file]", formData.shortcode_file);
        
        formData.shortcodes.split(", ").forEach((code, index) => {
          formDataToSend.append(`shortcode[shortcodes][${index}]`, code.trim());
        });
        
        // Append shortcode_pricing object
        formDataToSend.append("shortcode_pricing[pricing_issue_date]", formData.pricing_issue_date);
        formDataToSend.append("shortcode_pricing[pricing_expiry_date]", formData.pricing_expiry_date);
        formDataToSend.append("shortcode_pricing[pricing_file]", formData.pricing_file);
        
        formData.pricing_shortcodes.split(", ").forEach((code, index) => {
          formDataToSend.append(`shortcode_pricing[pricing_shortcodes][${index}]`, code.trim());
        });
        
          setSendAction(true);
          const response = await axios.post(
            RemoteEndpoints.VAS_PERTNER_ONBOARDING_SHORTCODES,
            formDataToSend,
            {
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${states.users.token}`,
              },
            }
          );
          successAction(response.data.data.message, true);
          setCurrentPanel({
            ...currentPanel,
            NCCLicensedetails: false,
            NLRCLicensedetails: false,
            ShortCodeDetais: true,
            ReviewAndSubmit: false,
          });
          setSendAction(false);
       
      } catch (err) {
      setSendAction(false);
      successAction(err.response.data.data.message, false);
    } 
      
    }
  };

  const [sendAction, setSendAction] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
  const successAction = (message, alert) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      alert: alert,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
        alert: false,
        status: false,
      }));
    }, 3000);

    return () => clearTimeout(timeoutId);
  };





  return (
    <>
    <section  className={`w-[100%] h-auto animate-[slide-left_1s_ease-in-out]  flex-col gap-3 ${nextPage ? `flex` : `hidden`}`}>
      <div className="mb-5 w-full flex flex-col gap-3">
        <h1 className="text-[24px] md:text-[28px] lg:text-[36px] text-white mtn-h1">
        Provide your short code pricing details
        </h1>
      </div>
      {error && (
                <div className="text-red-500 flex gap-3 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
      <div className="p-[8px] w-full rounded-[10px] flex flex-col gap-3">
                <p>Your shortcodes <span className="text-mtn-500 cursor-pointer" onClick={() => setNextPage(false)}>Edit</span></p>
                <div className="flex gap-3">
                  <ShortCodesMarker
                    shortCodes={formData.shortcodes}
                    updateShortCodes={updateShortCodes}
                  />
                </div>
              </div>

              <p>Pricing detail for your short codes</p>
              <div className="flex gap-3 mb-[-20px]">
        <div className="w-[50%]">
          <TextInput
            id="pricing_issue_date"
            label="Issuing Date"
            type="date"
            name="pricing_issue_date"
            max={startDate}
            value={formData.pricing_issue_date}
            onChange={handleChange}
          />
        </div>
        <div className="w-[50%]">
          <TextInput
            id="pricing_expiry_date"
            label="Expiry Date"
            type="date"
            name="pricing_expiry_date"
            min={startDate}
            value={formData.pricing_expiry_date}
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
                className="hidden"
                name="pricing_file"
                id="pricing_file"
                accept=".pdf,.PDF"
                onChange={handleFileChange}
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
                        NCC Pricing approval
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


      <div className="flex gap-2 justify-end">
      {sendAction ? (
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                ) : (
                  <>
      <button
          className="border-1 border-gray-200 text-white text-[11px] bg-none hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={() => setNextPage(false)}
        >
          Go Back
        </button>
        <button
          className="border-1 border-gray-200 text-white text-[11px] bg-none hover:bg-gray-800 p-4 py-2 rounded-full"
          onClick={() => saveShortCodesDetails()}
        >
         Save and continue
        </button>
        </>
        )}
      </div>
            
    </section>

{showSuccessToast.status && (
  <NewSuccess
    message={showSuccessToast.message}
    alert={showSuccessToast.alert}
  />
)}
</>
  );
};


export const ShortCodesMarker = ({ shortCodes, updateShortCodes,}) => {

  const deleteNumber = (numberToDelete) => {
    const codesArray = shortCodes.split(',').map(code => code.trim());
    const updatedCodesArray = codesArray.filter(code => code !== numberToDelete);
    const updatedCodesString = updatedCodesArray.join(', ');

    updateShortCodes(updatedCodesString);
  };
  return (
    <>
    {shortCodes ? shortCodes.split(',').map((number, index) => (
      <button 
      key={index} 
      className="flex gap-3 p-1 px-2 bg-transparent border border-white/30 rounded-[7px] justify-between items-center">
      <span className="text-white font-mtn-medium">{number.trim()}</span>
      <div onClick={()=> deleteNumber(number.trim())}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L12 4M4 4L12 12"
          stroke="#888888"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      </div>
    </button>
    
    )): null}
     
    </>
  );
};




export const ReviewAndSubmit = ({closeAggregatorComplianceFormFlyout, partnerDetails, currentPanel, setCurrentPanel, }) => {
  const {getAggregatorVasPartnerDetails,} = usePartners();
  const [vasPartnerResponse, setVasPartnerResponse] = useState();
  let getAggregatorVasPartnerDetailsResponse = null;
    const get_aggregator_vas_partner_details = async () => {
      try {
        
        getAggregatorVasPartnerDetailsResponse = await getAggregatorVasPartnerDetails(partnerDetails.aggregator_uuid, partnerDetails.vas_partner_uuid);
        let vas_partner_response = getAggregatorVasPartnerDetailsResponse.result[0];
        setVasPartnerResponse(vas_partner_response);
       
      } catch (error) {
        console.log("getAggregatorVasPartnerDetails_response error", error);
      }
    };
  
    useEffect(() => {
      get_aggregator_vas_partner_details();
    }, []);
  
  


  return (
    <>
<AggregatorComplianceNav
          closeAggregatorComplianceFormFlyout={
            closeAggregatorComplianceFormFlyout
          }
          partnerDetails={vasPartnerResponse}
          
        />

        <div className="absolute top-[50px] flex  h-screen w-screen justify-center">
          
            
              <AggregatorComplianceProgressiveNav
                closeAggregatorComplianceFormFlyout={
                  closeAggregatorComplianceFormFlyout
                }
                partnerDetails={vasPartnerResponse}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />

              <div className="w-[calc(100%-250px)] h-[100%] absolute right-0 overflow-auto pb-[100px] animate-[slide-left_1s_ease-in-out]">
                <div className="pt-[50px] w-[100%] h-auto flex justify-center">


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
      </div>
      </div>
      </div>
    </>
  );
};
