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
import useAdmins from "@/hooks/useAdmins";
import useRoles from "@/hooks/useRoles";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import TextInput from "@/app/components/form/TextInput";
import { ellipsify } from "@/app/modules/utilities";

export default function Approvals() {
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [approvals, setApprovals] = useState([]);
  const [creationError, setCreationError] = useState(null);

  let [data, setData] = useState({
                                  fullname: "",
                                  firstname: "",
                                  lastname: "",
                                  username: "",
                                  email: "",
                                  department: "",
                                  department_code: "",
                                  role: ""
                                });


  const router = useRouter();
  const { setRouteloading } = useApp();
  const [navigation, setNavigation] = useState([]);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);


  const [currentApproval, setCurrentApproval] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedApproval, setSelectedApproval] = useState(null);


  
  useEffect(() => {
    setProcessing(false);
    
  }, []);

  return (
    <>
      {!currentApproval ? 
        (<div id="approvals" className="flex flex-cols pb-12">
          <div className="w-full pt-[72px] px-12 mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
                <h2>Approval Requests</h2>
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

            <div className="w-full mt-10">
              {processing && (
                <div className="flex justify-center items-center">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
              )}
              {!processing && (
                <>
                  <table className="table w-full transparent">
                    <tbody>
                      {/* head */}
                      <tr className="border-b border-b-white/40 text-11">
                        <th>
                          <span className="text-[13px]">Approval type</span>
                        </th>
                        <th>
                          <span className="text-[13px]">Partner</span>
                        </th>
                        <th>
                          <span className="text-[13px]">Submitted</span>
                        </th>
                        <th>
                          <span className="text-[13px]">Status</span>
                        </th> 
                        <th>
                          <span className="text-[13px]"></span>
                        </th>                      
                      </tr>

                      <tr 
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                            // onClick={() => goToAdminDetail(admin.uuid)}
                      >
                            {/* Approval Type */}
                            <td>
                              <div className="flex items-center space-x-3">
                                <div>
                                  
                                    Board Resolution
                                  
                                </div>                              
                              </div>
                            </td>
                            {/* Partner */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">Beta zoo communications</span>
                                <span className="text-gray-500">Value added services</span>
                              </div>
                            </td>
                            {/* Submitted */}
                            <td>
                              <div>
                                Jan 10
                              </div>
                            </td>
                            {/* Status */}
                            <td>
                              <div className="bg-white/20 py-2 px-4 rounded-full text-white inline-flex">
                                Label
                              </div>
                            </td>

                            <td>
                              <div  className="flex gap-0" onClick={() => {setCurrentApproval("a")}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                  </svg>
                              </div>                            
                            </td>
                            
                      </tr>

                      <tr 
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                            // onClick={() => goToAdminDetail(admin.uuid)}
                      >
                            {/* Approval Type */}
                            <td>
                              <div className="flex items-center space-x-3">
                                <div>
                                  
                                    Board Resolution
                                  
                                </div>                              
                              </div>
                            </td>
                            {/* Partner */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">Beta zoo communications</span>
                                <span className="text-gray-500">Value added services</span>
                              </div>
                            </td>
                            {/* Submitted */}
                            <td>
                              <div>
                                Jan 10
                              </div>
                            </td>
                            {/* Status */}
                            <td>
                              <div className="bg-white/20 py-2 px-4 rounded-full text-white inline-flex">
                                Label
                              </div>
                            </td>

                            <td>
                              <div  className="flex gap-0" onClick={() => {}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                  </svg>
                              </div>                            
                            </td>
                            
                      </tr>

                      <tr 
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                            // onClick={() => goToAdminDetail(admin.uuid)}
                      >
                            {/* Approval Type */}
                            <td>
                              <div className="flex items-center space-x-3">
                                <div>
                                  
                                    Board Resolution
                                  
                                </div>                              
                              </div>
                            </td>
                            {/* Partner */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">Beta zoo communications</span>
                                <span className="text-gray-500">Value added services</span>
                              </div>
                            </td>
                            {/* Submitted */}
                            <td>
                              <div>
                                Jan 10
                              </div>
                            </td>
                            {/* Status */}
                            <td>
                              <div className="bg-white/20 py-2 px-4 rounded-full text-white inline-flex">
                                Label
                              </div>
                            </td>

                            <td>
                              <div  className="flex gap-0" onClick={() => {}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                  </svg>
                              </div>                            
                            </td>
                            
                      </tr>

                      <tr 
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                            // onClick={() => goToAdminDetail(admin.uuid)}
                      >
                            {/* Approval Type */}
                            <td>
                              <div className="flex items-center space-x-3">
                                <div>
                                  
                                    Board Resolution
                                  
                                </div>                              
                              </div>
                            </td>
                            {/* Partner */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className="text-white">Beta zoo communications</span>
                                <span className="text-gray-500">Value added services</span>
                              </div>
                            </td>
                            {/* Submitted */}
                            <td>
                              <div>
                                Jan 10
                              </div>
                            </td>
                            {/* Status */}
                            <td>
                              <div className="bg-white/20 py-2 px-4 rounded-full text-white inline-flex">
                                Label
                              </div>
                            </td>

                            <td>
                              <div  className="flex gap-0" onClick={() => {}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                  </svg>
                              </div>                            
                            </td>
                            
                      </tr>

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
              )}
            </div>
          </div>
        </div>) :
        (
          <div id="approvals" className="flex flex-col p-12">
            <div onClick={() => setCurrentApproval(null)} className="mb-8">
              <span className="flex gap-4 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80">
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
                Approved requests
              </span>
            </div>
            <div className="flex w-4xl">
              <div className="flex w-16 h-16 rounded-full bg-pink-900 text-white justify-center items-center text-3xl mr-4">
                <p className="text-white">A</p>
              </div>
              <div className="flex flex-col space-y-2 flex-1">
                <p className="text-white text-2xl">Beta Media Group</p>
                <span className="text-gray-500 text-sm">Lagos, Nigeria</span>
              </div>
            </div>

            <div className="p-8 flex flex-col w-96 bg-white/10 rounded-xl mt-16">

              <span className="w-12 h-12 border-gray-600 border-1 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </span>

            </div>
          </div>
        )
      }
      
      {
        displaySuccess &&
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-end">
            <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>&nbsp;&nbsp; {successMessage}
            </div>
        </div>       
      }
    </>
  );
}
