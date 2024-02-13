"use client";
import { useState, useEffect } from "react";
import { CompanyInitial, RequestApproveBtn, RequestRejectBtn } from "@/app/components/Icons";

export default function AggregatorSelector({
  icon,
  title,
  message,
  openAggregatorValidationFlyout,
}) {
  return (
    <>
      <div
        className=" bg-white/5 w-[100%]  rounded-[10px] cursor-pointer hover:bg-white/10"
        onClick={() => openAggregatorValidationFlyout()}
      >
        <div className="p-[25px] h-[240px] flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-3">
            <div className="border border-white/20  h-[60px] w-[60px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-white font-bold font-mtn">{title}</h3>
            <p className=" font-light">{message}</p>
          </div>
          <div className="w-[100px] p-1 px-2 bg-[#2D200A] flex gap-1 justify-center items-center rounded-[20px] text-[11px]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.32501 2.29489C8.44501 1.49489 7.28001 1.01489 6.00001 1.01489C3.25001 1.01489 1.01501 3.24989 1.01501 5.99989C1.01501 8.74989 3.25001 10.9849 6.00001 10.9849C7.28001 10.9849 8.44501 10.5049 9.32501 9.70489C10.345 8.79989 10.985 7.46989 10.985 5.99989C10.985 4.52989 10.345 3.19989 9.32501 2.29489ZM5.98501 8.19489C5.97501 9.01989 5.36001 9.21989 4.78501 8.98989C3.60001 8.51489 2.76501 7.35489 2.76501 5.99989C2.76501 4.64489 3.60001 3.48489 4.78501 3.00489C5.36001 2.77489 5.97501 2.97989 5.98501 3.79989V8.19489Z"
                fill="#F3AF33"
              />
            </svg>
            <span className="text-[#F3AF33]">In Progress</span>
          </div>
        </div>
      </div>
    </>
  );
}

















export const AggregatorVerlidationModal = ({
  closeOpenAggregatorValidationFlyout,
  currentPanel,
  setCurrentPanel,
}) => {
  const [tab, setTab] = useState({
    overview: true,
    activity: false,
  });

  return (
    <>
      <section
        id="modal"
        className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "modal" && closeOpenAggregatorValidationFlyout();
        }}
      >
        <div className="w-[475px] h-screen fixed right-0  top-0 border-l border-white/10 bg-[#111111] animate-[slide-left_1s_ease-in-out]">
          <div className="h-screen w-[100%] flex flex-col">
                {/* -----start title-------------------------------------------------------------- */}
                <div className="min-h-[110px] bg-black border-b border-white/10">
                  <div className="p-5 pb-0 flex flex-col gap-3">

                    <div className="h-[40px] flex flex-row justify-between ">
                    <div className="flex gap-3 flex-wrap h-[40px] items-center">
                      <div className="h-[40px] w-[40px] rounded-[100%] border border-white/20 flex justify-center items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_10714_163794)">
                          <path d="M8.68667 1.24665L1.36 0.13332C1.02 0.079987 0.673333 0.17332 0.413333 0.39332C0.153333 0.619987 0 0.946654 0 1.28665V15.3333C0 15.7 0.3 16 0.666667 16H2.83333V12.5C2.83333 11.8533 3.35333 11.3333 4 11.3333H5.66667C6.31333 11.3333 6.83333 11.8533 6.83333 12.5V16H9.66667V2.39999C9.66667 1.82665 9.25333 1.33999 8.68667 1.24665ZM3.66667 9.83332H2.66667C2.39067 9.83332 2.16667 9.60932 2.16667 9.33332C2.16667 9.05732 2.39067 8.83332 2.66667 8.83332H3.66667C3.94267 8.83332 4.16667 9.05732 4.16667 9.33332C4.16667 9.60932 3.94267 9.83332 3.66667 9.83332ZM3.66667 7.83332H2.66667C2.39067 7.83332 2.16667 7.60932 2.16667 7.33332C2.16667 7.05732 2.39067 6.83332 2.66667 6.83332H3.66667C3.94267 6.83332 4.16667 7.05732 4.16667 7.33332C4.16667 7.60932 3.94267 7.83332 3.66667 7.83332ZM3.66667 5.83332H2.66667C2.39067 5.83332 2.16667 5.60932 2.16667 5.33332C2.16667 5.05732 2.39067 4.83332 2.66667 4.83332H3.66667C3.94267 4.83332 4.16667 5.05732 4.16667 5.33332C4.16667 5.60932 3.94267 5.83332 3.66667 5.83332ZM3.66667 3.83332H2.66667C2.39067 3.83332 2.16667 3.60932 2.16667 3.33332C2.16667 3.05732 2.39067 2.83332 2.66667 2.83332H3.66667C3.94267 2.83332 4.16667 3.05732 4.16667 3.33332C4.16667 3.60932 3.94267 3.83332 3.66667 3.83332ZM7 9.83332H6C5.724 9.83332 5.5 9.60932 5.5 9.33332C5.5 9.05732 5.724 8.83332 6 8.83332H7C7.276 8.83332 7.5 9.05732 7.5 9.33332C7.5 9.60932 7.276 9.83332 7 9.83332ZM7 7.83332H6C5.724 7.83332 5.5 7.60932 5.5 7.33332C5.5 7.05732 5.724 6.83332 6 6.83332H7C7.276 6.83332 7.5 7.05732 7.5 7.33332C7.5 7.60932 7.276 7.83332 7 7.83332ZM7 5.83332H6C5.724 5.83332 5.5 5.60932 5.5 5.33332C5.5 5.05732 5.724 4.83332 6 4.83332H7C7.276 4.83332 7.5 5.05732 7.5 5.33332C7.5 5.60932 7.276 5.83332 7 5.83332ZM7 3.83332H6C5.724 3.83332 5.5 3.60932 5.5 3.33332C5.5 3.05732 5.724 2.83332 6 2.83332H7C7.276 2.83332 7.5 3.05732 7.5 3.33332C7.5 3.60932 7.276 3.83332 7 3.83332Z" fill="#686868"/>
                          <path d="M15.0792 7.22789L10.3325 6.23389V15.9999H14.8325C15.4759 15.9999 15.9992 15.4766 15.9992 14.8332V8.36789C15.9992 7.81722 15.6239 7.34855 15.0792 7.22789ZM13.4992 13.9999H12.4992C12.2232 13.9999 11.9992 13.7759 11.9992 13.4999C11.9992 13.2239 12.2232 12.9999 12.4992 12.9999H13.4992C13.7752 12.9999 13.9992 13.2239 13.9992 13.4999C13.9992 13.7759 13.7752 13.9999 13.4992 13.9999ZM13.4992 11.9999H12.4992C12.2232 11.9999 11.9992 11.7759 11.9992 11.4999C11.9992 11.2239 12.2232 10.9999 12.4992 10.9999H13.4992C13.7752 10.9999 13.9992 11.2239 13.9992 11.4999C13.9992 11.7759 13.7752 11.9999 13.4992 11.9999ZM13.4992 9.99989H12.4992C12.2232 9.99989 11.9992 9.77589 11.9992 9.49989C11.9992 9.22389 12.2232 8.99989 12.4992 8.99989H13.4992C13.7752 8.99989 13.9992 9.22389 13.9992 9.49989C13.9992 9.77589 13.7752 9.99989 13.4992 9.99989Z" fill="#686868"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_10714_163794">
                          <rect width="16" height="16" fill="white"/>
                          </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <h2 className="text-white">VAS License</h2>
                    </div>

                    <button
                      className="h-[40px] w-[40px] flex justify-center bg-transparent items-center text-[18px] rounded-[100%] text-gray-100 hover:bg-white/20 transition ease-in-out delay-150"
                      onClick={() => closeOpenAggregatorValidationFlyout()}
                    >
                      X
                    </button>
                    </div>

                    <div className="flex gap-5">
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
                    
                  </div>
                </div>
                {/* ------end title------------------------------------------------------------- */}
                    
                  

                 {/* -----start body-------------------------------------------------------------- */}
                <div className="w-[100%] py-[40px] px-7 h-[calc(100%-170px)] top-[110px]">
                <NCCLicenceVerlidationBody/>
                  
                </div>
                {/* -----start body-------------------------------------------------------------- */}

                {/* -----start nav-------------------------------------------------------------- */}
                <div className="h-[60px] bg-black border-b border-white/10">
                  <div className="p-5 pb-0 flex flex-col gap-3">


                  </div>
                </div>
                {/* -----start nav-------------------------------------------------------------- */}
          </div>
        </div>
      </section>
    </>
  );
};




export const NCCLicenceVerlidationBody = ({}) => {
  return (
    <div className="w-[100%] bg-black rounded-[7px] p-5 flex flex-col gap-3">
      <AggregatorVerifierText 
      status={"pending"}
      title={"VAS Licence ID"}
      text={"AD12345689"}
      />
    </div>
  );
};





export const AggregatorVerifierText = ({status, title, text}) => {
  return (
    <div className="border border-white/10 rounded-[7px] p-3 flex flex-col gap-5">
      <DeclinePanel/>

      <div className="flex justify-between">
        <div className="flex gap-3">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 3.375H15.75" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 7.125H9.3525" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 10.875H15.75" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 14.625H9.3525" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px]">{title}</span>
              <h3 className="font-mtn text-white">{title}</h3>
            </div>
        </div>
        <div className="flex gap-3">
          <RequestApproveBtn />
          <RequestRejectBtn />
        </div>
      </div>

    </div>
  );
};













export const ApprovePanel = () => {
  return (
      <div className="border border-green-600 p-2 rounded-[7px] bg-white/10 flex justify-between">
        <div className="flex flex-col">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F3AF33" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>
          <p className="text-[13px]">Are you sure you want to approve?</p>
        </div>

        <div className="flex flex-col justify-between">
          <div></div>
            <div className="flex gap-2">
              <button className=" text-white bg-green-600 w-[50px] h-[20px] text-[10px] rounded-full hover:opacity-50">
                Yes
              </button>
              <button className="text-white bg-gray-600  w-[50px] h-[20px] text-[10px] rounded-full hover:opacity-50">
                No
              </button>
            </div>
        </div>
      </div>
  );
};

export const DeclinePanel = () => {
  return (
      <div className="border border-red-600 p-2 rounded-[7px] bg-white/10 flex justify-between">
        <div className="flex flex-col">
          <p className="text-[13px]">Reason for rejection</p>
        </div>

        <div className="flex flex-col justify-between">
          <div></div>
            <div className="flex gap-2">
              <button className=" text-white bg-red-600 w-[50px] h-[20px] text-[10px] rounded-full hover:opacity-50">
                Reject
              </button>
              <button className="text-white bg-gray-600  w-[50px] h-[20px] text-[10px] rounded-full hover:opacity-50">
                Cancel
              </button>
            </div>
        </div>
      </div>
  );
};