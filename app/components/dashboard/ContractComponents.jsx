import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import usePartners from "@/hooks/usePartners";
import { OtherServicesPopUps } from "@/app/components/PopUps";
import Iframe from "@/app/components/otherservices/Iframes";
import RemoteEndpoints from "@/app/modules/endpoints";


export default function ServiceConfigurationButton({ open }) {
  const { getPartnerContractCurrentlyRunning } = usePartners();
  const [displayServiceConfiguration, setDisplayServiceConfiguration] =useState(false);
  ////////////getPartnerContract function////////////////////
  const getPartnerContract = async () => {
    setDisplayServiceConfiguration(false);
    getPartnerContractCurrentlyRunning()
      .then((response) => {
        if ("contract_id" in response.result) {
          setDisplayServiceConfiguration(true);
        } else {
          setDisplayServiceConfiguration(false);
        }
      })
      .catch((error) => {
        console.log("getPartnerContractCurrentlyRunning error: ", error);
        setDisplayServiceConfiguration(false);
      });
  };
  useEffect(() => {
    getPartnerContract();
  }, []);
  ////////////end getPartnerContract function///////////////////

  const [servicePopUp, setServicePopUp] = useState(false);
  const [iframe, setIframe] = useState(false);

  const openServicePopUp = useCallback((serviceName) => () => {
      setServicePopUp(true);
      setIframe(serviceName);
  },[]);

  return (
    <>
      {servicePopUp && (
        <>
          {iframe == "DSM" && (
            <>
              <OtherServicesPopUps
                closeServicePopUp={() => setServicePopUp(false)}
                title="DSM Service Configuration"
              >
                <Iframe url={RemoteEndpoints.DSM_ENDPOINT} />
              </OtherServicesPopUps>
            </>
          )}
        </>
      )}

      {displayServiceConfiguration && (
        <li>
          <Link
            onClick={openServicePopUp("DSM")}
            href="#"
            className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
              !open && "tooltip tooltip-right tooltip-mtn"
            }`}
            data-tip="Service Integration"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[20px] h-[20px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>

            {open && (
              <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                Service Integration
              </span>
            )}
          </Link>
        </li>
      )}
    </>
  );
}






export const ServiceConfigurationReadyAlert = () => {
  const { getPartnerContractCurrentlyRunning } = usePartners();
  const [openConfigurationReadyAlert, setOpenConfigurationReadyAlert] = useState(false);
  ////////////getPartnerContract function////////////////////
  const getServiceConfigurationReadyAlert = async () => {
    setOpenConfigurationReadyAlert(false);
    getPartnerContractCurrentlyRunning()
      .then((response) => {
        if ("contract_id" in response.result) {
          setOpenConfigurationReadyAlert(true);
        } else {
          setOpenConfigurationReadyAlert(false);
        }
      })
      .catch((error) => {
        console.log("getPartnerContractCurrentlyRunning error: ", error);
        setOpenConfigurationReadyAlert(false);
      });
  };
  useEffect(() => {
    getServiceConfigurationReadyAlert();
  }, []);
  ////////////end getPartnerContract function///////////////////

  const [servicePopUp, setServicePopUp] = useState(false);
  const [iframe, setIframe] = useState(false);

  const openServicePopUp = useCallback((serviceName) => () => {
      setServicePopUp(true);
      setIframe(serviceName);
  },[]);

  return (
    <>
    {servicePopUp && (
        <>
          {iframe == "DSM" && (
            <>
              <OtherServicesPopUps
                closeServicePopUp={() => setServicePopUp(false)}
                title="DSM Service Configuration"
              >
                <Iframe url={RemoteEndpoints.DSM_ENDPOINT} />
              </OtherServicesPopUps>
            </>
          )}
        </>
      )}
      {openConfigurationReadyAlert && (
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
                    Congratulations! It is time to integrate your service(s).
                    </span>
                    <br />
                    Kindly navigate to the <b>Service Integration</b> tab at the left hand side of your screen to get started.
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setOpenConfigurationReadyAlert(false)}
                    className="h-[40px] min-w-[100px] px-5 text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                  >
                    Okay! Thanks
                  </button>
                  <button
                     onClick={openServicePopUp("DSM")}
                    className="h-[40px] min-w-[100px] px-5 text-white border border-white/10 rounded-[20px] float-left hover:border-white/30"
                  >
                    Open Service Integration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
