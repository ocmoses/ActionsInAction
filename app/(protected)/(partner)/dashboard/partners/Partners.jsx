"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  getPartnerInitials,
  getInitials,
  ellipsify,
  capitalizeFirst,
} from "@/app/modules/utilities";

import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";

import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";
import moment from "moment";
import ProfileTab from "./tabs/ProfileTab";
import ServicesTab from "./tabs/ServicesTab";
import ComplianceTab from "./tabs/ComplianceTab";


export default function Partners() {
  const { getVASPartners } = usePartners();
  const [error, setError] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [pagedPartners, setPagedPartners] = useState([]);
     
  const tabs = [
    {
      title: "Profile",
      icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4865 17.9688C18.0043 15.4075 15.6774 13.6103 12.9736 12.8481C14.2882 12.1799 15.3393 11.0885 15.9576 9.74978C16.5759 8.41108 16.7254 6.90314 16.3818 5.46913C16.0382 4.03511 15.2217 2.75859 14.0639 1.8454C12.9061 0.932212 11.4745 0.435577 9.9999 0.435577C8.5253 0.435577 7.09368 0.932212 5.93587 1.8454C4.77806 2.75859 3.96155 4.03511 3.61799 5.46913C3.27444 6.90314 3.42386 8.41108 4.04217 9.74978C4.66048 11.0885 5.71164 12.1799 7.02615 12.8481C4.3224 13.6094 1.99552 15.4066 0.513334 17.9688C0.472635 18.0328 0.445308 18.1044 0.432995 18.1792C0.420682 18.2541 0.423639 18.3307 0.441688 18.4044C0.459737 18.478 0.492505 18.5473 0.53802 18.608C0.583535 18.6687 0.640857 18.7196 0.706537 18.7575C0.772218 18.7955 0.844899 18.8198 0.920209 18.8289C0.995519 18.8381 1.0719 18.8319 1.14476 18.8108C1.21762 18.7896 1.28545 18.754 1.34417 18.7059C1.4029 18.6579 1.45129 18.5985 1.48646 18.5313C3.2874 15.4197 6.46927 13.5625 9.9999 13.5625C13.5305 13.5625 16.7124 15.4197 18.5133 18.5313C18.5485 18.5985 18.5969 18.6579 18.6556 18.7059C18.7143 18.754 18.7822 18.7896 18.855 18.8108C18.9279 18.8319 19.0043 18.8381 19.0796 18.8289C19.1549 18.8198 19.2276 18.7955 19.2933 18.7575C19.3589 18.7196 19.4163 18.6687 19.4618 18.608C19.5073 18.5473 19.5401 18.478 19.5581 18.4044C19.5762 18.3307 19.5791 18.2541 19.5668 18.1792C19.5545 18.1044 19.5272 18.0328 19.4865 17.9688ZM4.5624 7.00001C4.5624 5.92458 4.8813 4.87329 5.47878 3.9791C6.07626 3.08491 6.92548 2.38797 7.91906 1.97642C8.91263 1.56487 10.0059 1.45719 11.0607 1.66699C12.1155 1.8768 13.0843 2.39467 13.8448 3.15512C14.6052 3.91557 15.1231 4.88444 15.3329 5.93921C15.5427 6.99398 15.435 8.08728 15.0235 9.08085C14.6119 10.0744 13.915 10.9236 13.0208 11.5211C12.1266 12.1186 11.0753 12.4375 9.9999 12.4375C8.55832 12.4358 7.17628 11.8623 6.15692 10.843C5.13757 9.82364 4.56413 8.4416 4.5624 7.00001Z" fill="#8E8E8E"/>
            </svg> ,
      tab: "Profile"     
    },
    {
      title: "Services",
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 0.9375H2.25C1.9019 0.9375 1.56806 1.07578 1.32192 1.32192C1.07578 1.56806 0.9375 1.9019 0.9375 2.25V15.75C0.9375 16.0981 1.07578 16.4319 1.32192 16.6781C1.56806 16.9242 1.9019 17.0625 2.25 17.0625H15.75C16.0981 17.0625 16.4319 16.9242 16.6781 16.6781C16.9242 16.4319 17.0625 16.0981 17.0625 15.75V2.25C17.0625 1.9019 16.9242 1.56806 16.6781 1.32192C16.4319 1.07578 16.0981 0.9375 15.75 0.9375ZM15.9375 2.25V8.4375H9.5625V2.0625H15.75C15.7997 2.0625 15.8474 2.08225 15.8826 2.11742C15.9177 2.15258 15.9375 2.20027 15.9375 2.25ZM2.25 2.0625H8.4375V8.4375H2.0625V2.25C2.0625 2.20027 2.08225 2.15258 2.11742 2.11742C2.15258 2.08225 2.20027 2.0625 2.25 2.0625ZM2.0625 15.75V9.5625H8.4375V15.9375H2.25C2.20027 15.9375 2.15258 15.9177 2.11742 15.8826C2.08225 15.8474 2.0625 15.7997 2.0625 15.75ZM15.75 15.9375H9.5625V9.5625H15.9375V15.75C15.9375 15.7997 15.9177 15.8474 15.8826 15.8826C15.8474 15.9177 15.7997 15.9375 15.75 15.9375Z" fill="#8E8E8E"/>
            </svg>,
      tab: "Services"            
    },
    {
      title: "Compliance",
      icon: <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 0.9375H1.5C1.1519 0.9375 0.818064 1.07578 0.571922 1.32192C0.325781 1.56806 0.1875 1.9019 0.1875 2.25V7.75969C0.1875 16.0322 7.18875 18.7772 8.59219 19.2431C8.85661 19.3331 9.14339 19.3331 9.40781 19.2431C10.8141 18.7744 17.8125 16.0322 17.8125 7.75969V2.25C17.8125 1.9019 17.6742 1.56806 17.4281 1.32192C17.1819 1.07578 16.8481 0.9375 16.5 0.9375ZM16.6875 7.76156C16.6875 15.2616 10.3275 17.7544 9.0525 18.1772C9.01872 18.1903 8.98128 18.1903 8.9475 18.1772C7.6725 17.7544 1.3125 15.2616 1.3125 7.76156V2.25C1.3125 2.20027 1.33225 2.15258 1.36742 2.11742C1.40258 2.08225 1.45027 2.0625 1.5 2.0625H16.5C16.5497 2.0625 16.5974 2.08225 16.6326 2.11742C16.6677 2.15258 16.6875 2.20027 16.6875 2.25V7.76156ZM13.1475 6.35531C13.2528 6.46078 13.312 6.60375 13.312 6.75281C13.312 6.90188 13.2528 7.04484 13.1475 7.15031L7.8975 12.4003C7.79203 12.5057 7.64906 12.5648 7.5 12.5648C7.35094 12.5648 7.20797 12.5057 7.1025 12.4003L4.8525 10.1503C4.75314 10.0437 4.69905 9.90265 4.70162 9.75692C4.70419 9.61119 4.76322 9.47216 4.86628 9.3691C4.96934 9.26604 5.10838 9.207 5.25411 9.20443C5.39983 9.20186 5.54087 9.25595 5.6475 9.35531L7.5 11.2041L12.3525 6.3525C12.458 6.24716 12.6009 6.18799 12.75 6.18799C12.8991 6.18799 13.042 6.24716 13.1475 6.3525V6.35531Z" fill="#8E8E8E"/>
            </svg>,
      tab: "Compliance"             
    },
    {
      title: "Contracts",
      icon: <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7499 13.9375H4.68114C4.99427 13.3244 5.31208 12.6859 5.62427 12.0353C7.03989 12.2725 8.75645 11.2394 10.7458 8.95281C11.1302 10.1097 11.9055 11.7766 13.2424 12.0297C14.1874 12.2087 15.1343 11.6847 16.1233 10.4359C16.6746 11.2019 17.9224 12.0625 20.7499 12.0625C20.8991 12.0625 21.0422 12.0032 21.1476 11.8977C21.2531 11.7923 21.3124 11.6492 21.3124 11.5C21.3124 11.3508 21.2531 11.2077 21.1476 11.1023C21.0422 10.9968 20.8991 10.9375 20.7499 10.9375C16.9699 10.9375 16.818 9.33062 16.8124 9.23875C16.8097 9.10594 16.7602 8.97836 16.6725 8.8786C16.5848 8.77883 16.4646 8.71332 16.3332 8.69367C16.2018 8.67402 16.0678 8.7015 15.9547 8.77124C15.8416 8.84097 15.7569 8.94847 15.7155 9.07469C14.8474 10.3806 14.0458 11.0369 13.4524 10.9244C12.9836 10.8362 12.4952 10.2559 12.0808 9.29125C11.8559 8.75637 11.6786 8.20265 11.5511 7.63656C11.5277 7.52242 11.4693 7.41839 11.3841 7.33886C11.299 7.25932 11.1912 7.20819 11.0757 7.19255C10.9602 7.1769 10.8427 7.19751 10.7395 7.25152C10.6362 7.30554 10.5523 7.39029 10.4993 7.49406C8.77333 9.64094 7.2377 10.8428 6.14177 10.93C8.37489 6.0475 9.0527 2.94062 8.20895 1.44812C7.94927 0.98875 7.4102 0.4375 6.31239 0.4375H6.2927C4.88645 0.446875 3.77177 1.8175 3.22802 4.20062C2.59333 7 2.95239 10.375 4.58927 11.5937C4.2002 12.4047 3.80177 13.1959 3.41552 13.9375H1.24989C1.10071 13.9375 0.957634 13.9968 0.852144 14.1023C0.746655 14.2077 0.687392 14.3508 0.687392 14.5C0.687392 14.6492 0.746655 14.7923 0.852144 14.8977C0.957634 15.0032 1.10071 15.0625 1.24989 15.0625H2.82114C1.68583 17.1794 0.781142 18.6869 0.768017 18.7103C0.727312 18.7736 0.699734 18.8445 0.686919 18.9187C0.674105 18.9929 0.676313 19.0689 0.693414 19.1422C0.710515 19.2155 0.74216 19.2847 0.786474 19.3455C0.830788 19.4064 0.886869 19.4577 0.951393 19.4965C1.01592 19.5353 1.08757 19.5608 1.16211 19.5713C1.23665 19.5819 1.31256 19.5775 1.38533 19.5582C1.4581 19.5389 1.52626 19.5052 1.58577 19.4591C1.64528 19.4129 1.69493 19.3553 1.73177 19.2897C1.74677 19.2653 2.81552 17.4831 4.0952 15.0625H20.7499C20.8991 15.0625 21.0422 15.0032 21.1476 14.8977C21.2531 14.7923 21.3124 14.6492 21.3124 14.5C21.3124 14.3508 21.2531 14.2077 21.1476 14.1023C21.0422 13.9968 20.8991 13.9375 20.7499 13.9375ZM4.32864 4.45187C4.72802 2.69875 5.5052 1.5625 6.31239 1.5625C6.90864 1.5625 7.1177 1.79781 7.23302 2.00219C7.60802 2.65844 7.79552 4.64125 5.08895 10.5334C4.12145 9.56594 3.76145 6.93625 4.32864 4.45187Z" fill="#8E8E8E"/>
            </svg>,
      tab: "Contracts"             
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);


  const statusColour = {
    pending: "bg-[#353535]",
    declined: "bg-[#AD2B19]",
    inprogress: "bg-[#E2B204]",
    completed: "bg-[#216E4E]",
  };

  
  useEffect(() => {
    getVASPartners()
      .then(resp => {
          setPartners(resp);
          setFilteredPartners(resp);
          setPagedPartners(resp);
      })
      .catch(error => {})
  }, []);


  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
 
  
  return (
    <>
      <div id="partners" className="flex flex-cols pb-12 min-h-screen">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Partners</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {partners?.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Filter
              list={partners}
              filterAction={setFilteredPartners}
              keysArray={["contract", "contract_id", "contract_type"]}
              statusArray={["active", "suspended", "pending", "expired"]}
            />

            <div className="w-full md:max-w-6xl mt-10 border-1 border-white/20 rounded-[16px]">
              <table className="table w-full transparent ">
                <tbody>
                  {/* head */}
                  <tr className="border-b text-11 bg-white/20 ">
                    <th>
                      <span className="text-[13px]">Company</span>
                    </th>                    
                    <th>
                      <span className="text-[13px]">Contract ID</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Contract Type</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Status</span>
                    </th>
                    <th>
                      <span className="text-[13px]"></span>
                    </th>
                  </tr>

                  {pagedPartners?.map((partner) => (
                    <tr 
                      onClick={() => {setSelectedPartner(partner)}}
                      className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/10 group">
                      {/* Company */}
                      <td>
                        <div className="flex">
                          <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                            <span>{getPartnerInitials(partner?.company_name)}</span>
                          </div>
                          <div className="flex flex-col">
                            <div className=" text-white">
                              {partner?.company_name}
                            </div>
                            <span className="text-sm">{partner?.email}</span>
                          </div>                          
                        </div>
                      </td>

                      <td>
                        <div>
                          {partner?.contract_id}
                        </div>
                      </td>
                      <td>
                        <div>
                          {partner?.contract_type}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className="flex gap-0 flex-col">
                          <span
                            className={`text-white text-sm px-2 inline-block w-[80px] rounded ${
                              partner.status == "rejected"
                                ? "bg-red-400"
                                : partner.status == "approved"
                                ? "bg-gray-600"
                                : "bg-green-700"
                            }`}
                          >
                            {capitalizeFirst(partner?.status)}
                          </span>
                          {/* <span className="text-gray-500">Value added services</span> */}
                        </div>
                      </td>
                      {/* <td>
                        <div>
                          {moment(partner.created_at ?? moment()).format(
                            "DD/MM/YYYY"
                          )}
                        </div>
                      </td> */}
                      
                      <td>
                        <div className="items-center space-x-2 cursor-pointer px-4 py-2 hidden group-hover:inline-flex">
                          
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPartners?.length == 0 && pagedPartners?.length == 0 ? (
                <EmptyTable list={"Partners"} />
              ) : (
                <TablePager list={filteredPartners} action={setPagedPartners} />
              )}
            </div>
          </div>
        </div>
      </div>

      {
        selectedPartner && 
        
          <div id="partners_settings_modal" 
                className="w-screen flex justify-center items-center h-screen fixed z-[999] top-0 left-0 bg-black/80"  >
              <div id="actualModal" className={`relative border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[900px]`}>
              
                  <div className="flex">
                      
                      <div className="w-[250px] bg-black/80 border-2 border-gray-500 rounded-l-xl p-4">
                          <ul className="mt-10 flex flex-col space-y-4">
                            {
                              tabs.map(tab => (
                                <li onClick={() => setCurrentTab(tab)} 
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab.title == tab.title && "bg-white/10"} cursor-pointer`}>
                                    {tab.icon}
                                    <span className="text-white/80 ml-2">{tab.title}</span>
                                    {currentTab.title == tab.title &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>))
                            }                            
                          </ul>
                      </div>

                      <div className="relative w-[650px] h-[600px] flex flex-col mb-4">  
                      <div
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => {
                          setSelectedPartner(null);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="gray"
                          className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2"
                        >
                          <path
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                          
                          {
                              currentTab && currentTab.title == "Profile" && 
                              <ProfileTab  partner={selectedPartner} />
                          }
                          {
                              currentTab && currentTab.title == "Services" && 
                              <ServicesTab partner={selectedPartner} />
                          }
                          {
                              currentTab && currentTab.title == "Compliance" && 
                              <ComplianceTab partner={selectedPartner} />
                          }
                          
                      </div>
                  </div>
                  
              </div>

            
          </div>
      }

    </>
  );

}
