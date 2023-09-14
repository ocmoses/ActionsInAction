"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase
} from "@/app/modules/utilities";
import { status_type, statusOptions } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";

import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useContracts from "@/hooks/useContracts";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import useApp from "@/hooks/useApp";
import { ellipsify, capitalizeFirst } from "@/app/modules/utilities";

import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import FilePreviewModal from "@/app/components/FilePreviewModal";

import Confirm from "@/app/components/Confirm";
import Success from "@/app/components/toasts/Success";

export default function Contracts() {
  const {getAllContracts} = useContracts();
  const [contracts, setContracts] = useState(null);
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [selectedBrd, setSelectedBrd] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false),                                                   
                                                  setApprove(false);
                                                  setReject(false);
                                                  setSelectedBrd(null); 
                                                  get_brds();
                                                  setOpenDrawer(false);
                                                }, 3000);


  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  let [approvalData, setApprovalData] = useState({
                                          board_document_uuid: "",
                                          partner_uuid: "",
                                          delegate_email: "",
                                          status: ""
                                        });


  const router = useRouter();
  const [navigation, setNavigation] = useState([]);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);

  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState({date: true, keyword: false, status: false});

    
  useEffect(() => {
    clearErrors();
    setProcessing(false);
    getAllContracts().then(resp => setContracts(resp));
  },[]);

  return (
    <>
      
      <div id="contract_page" className="flex flex-cols pb-12 min-h-screen" onClick={(e) => {if(filterModal && e.target.id == 'contract_page'){setFilterModal(false)}}}>
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Contracts</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {navigation?.total}
              </span>
            </div>
            
          </div>

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="my-4 w-full relative" >
            <div className="border-1 border-white/20 rounded-full py-2 inline-flex items-center justify-center cursor-pointer" 
                  onClick={() => setFilterModal(!filterModal)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 ml-6 mt-1">
                <path d="M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z"/>
              </svg>  <span className="mr-6 text-white">Add Filter</span>
            </div>
            {
              filterModal && 
              <div className={`border-1 border-white/20 w-[600px] absolute left-4 z-[9999] bg-[#121212] rounded-xl shadow-xl flex`}>
                <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col  space-y-4">
                  
                  <div className={`${search.date ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                      onClick={() => {if(!search.date){setSearch({...search, date: true, keyword: false, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg> &nbsp; &nbsp; 
                    <span className="flex-1">Date</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  <div className={`${search.keyword ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                        onClick={() => {if(!search.keyword){setSearch({...search, date: false, keyword: true, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    &nbsp; &nbsp; 
                    <span className="flex-1">Keyword</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  <div className={`${search.status ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                        onClick={() => {if(!search.status){setSearch({...search, date: false, keyword: false, status: true});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                      
                      <path d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      </path> 
                     
                    </svg>
                    &nbsp; &nbsp; 
                    <span className="flex-1">Status</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                </div>
                <div className="flex-1 p-4 h-[300px]">
                  {
                    search.date && 
                    <div className="flex flex-col space-y-4">
                      <div className="p-2 rounded-xl border-1 border-white/20 flex text-white items-center justify-center">
                        <input id="search-from" onFocus={() => document.getElementById("search-from").type = "date"} onBlur={() => document.getElementById("search-from").type = "text"} 
                                className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]" placeholder="From" /> - 
                        <input id="search-from2" onFocus={() => document.getElementById("search-from2").type = "date"} onBlur={() => document.getElementById("search-from2").type = "text"} 
                                className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]" placeholder="To" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                      </div>
                      <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                        <span className="flex-1">Last 30 days</span>
                      </div>
                      <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                        <span className="flex-1">This month</span>
                      </div>
                      <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                        <span className="flex-1">Last month</span>
                      </div>
                      <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                        <span className="flex-1">This year</span>
                      </div>
                    </div>
                  }
                  {
                    search.keyword && 
                    <div className="flex flex-col space-y-4 px-2">
                      <div className="border-1 border-white/20 rounded-xl p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input onBlur={() => {/* Search here*/}} placeholder="Search for a partner"
                          className="border-0 bg-transparent focus:border-0 focus:border-transparent active:border-0 active:border-transparent text-white p-2 w-full ml-2" />
                      </div>
                      <span className="text-gray-400 text-sm">Find a contract by searching for a partner by their name</span>
                    </div>
                  }
                  {
                    search.status && 
                    <div className="flex flex-col space-y-4">
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                        </div>
                        <div>
                            <p className="text-gray-300">Active</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                        </div>
                        <div>
                            <p className="text-gray-300">Suspended</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                        </div>
                        <div>
                            <p className="text-gray-300">Pending</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                        </div>
                        <div>
                            <p className="text-gray-300">Expired</p>
                        </div>
                      </div>
                    </div>
                  }
                  
                  
                </div>
              </div>
            }
            
          </div>

          <div className="w-full mt-10 border-1 border-white/20 rounded-lg">
            
              <>
                <table className="table w-full transparent ">
                  <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-11 bg-white/20 ">
                      <th>
                        <span className="text-[13px]">Company</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Status</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Contract ID</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Start date</span>
                      </th> 
                      <th>
                        <span className="text-[13px]">End date</span>
                      </th> 
                      <th>
                        <span className="text-[13px]">PDF</span>
                      </th>                     
                    </tr>

                    {contracts && contracts.map(contract => 
                      <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
                            {/* Company */}
                            <td>
                              <div className="flex items-center">
                                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                  <span>
                                    {getPartnerInitials(contract.company)}
                                  </span>
                                </div>
                                <div>
                                  <div className=" text-white">
                                    {contract.company}
                                  </div>                                
                                </div>
                              </div>                              
                            </td>
                            {/* Contract status */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">{contract.contract_status}</span>
                                {/* <span className="text-gray-500">Value added services</span> */}
                              </div>
                            </td>
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">{contract.contract_id}</span>
                              </div>
                            </td>
                            <td>
                              <div>
                              {
                                moment(contract.created_at ?? moment())
                                .format("DD/MM/YYYY")
                              }
                              </div>
                            </td>
                            <td>
                              <div>
                              {
                                moment(contract.due_date ?? moment())
                                .format("DD/MM/YYYY")
                              }
                              </div>
                            </td>
                            
                            <td>
                              <div className="inline-flex items-center space-x-2 cursor-pointer rounded-full hover:bg-white/10 px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg> <span className="text-white text-sm">Download</span>
                              </div>
                            </td>
                            
                      </tr>)
                    }
                  </tbody>
                </table>
                <div className="w-full flex justify-end">
                  {!Util.isEmpty(navigation) &&
                    navigation.links?.length > 0 &&
                    navigation.links.map((nav, index) => {
                      let link = null;
                      if (index === 0) {
                        if (nav.url) {
                        }
                        link = (
                          <div className="flex p-2 text-white">
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
                                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                              />
                            </svg>
                          </div>
                        );
                      } else if (index === navigation.links.length - 1) {
                        link = (
                          <div className="flex p-2 text-white">
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
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                              />
                            </svg>
                          </div>
                        );
                      } else {
                        if (nav.url) {
                          link = nav.active ? (
                            <div className="flex p-2 text-white bg-white/30">
                              {index}
                            </div>
                          ) : (
                            <div
                              onClick={() => setPage(index)}
                              className="flex p-2 text-white cursor-pointer hover:bg-white/10"
                            >
                              {index}
                            </div>
                          );
                        } else {
                          link = (
                            <div className="flex p-2 text-white">
                              {nav.label}
                            </div>
                          );
                        }
                      }

                      return link;
                    })}
                </div>
              </>
            
          </div>
        </div>
      </div>
      
      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}
