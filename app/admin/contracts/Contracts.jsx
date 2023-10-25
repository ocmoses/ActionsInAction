"use client";
import { useState, useEffect, useRef } from "react";
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
import RemoteEndpoints from "@/app/modules/endpoints";
import Filter from "@/app/components/Filter";
import EmptyTable from "@/app/components/EmptyTable";

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

  const router = useRouter();
  const [navigation, setNavigation] = useState([]);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);

  const [filteredContracts, setFilteredContracts] = useState([]);

    
  useEffect(() => {
   setProcessing(false);
    clearErrors();
    getAllContracts().then(resp => {
      console.log("All contracts", resp.contracts);
                            resp.contracts.forEach(c => c.status = c.contract_status);
                            setContracts(resp.contracts); 
                            setFilteredContracts(resp.contracts); 
                            setNavigation(resp.navigation)
                          });  
    
  },[]);

  return (
    <>
      
      <div id="contract_page" className="flex flex-cols pb-12 min-h-screen" >
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center mb-10">
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

          <Filter list={contracts} 
                  filterAction={setFilteredContracts} 
                  keysArray={['contract', 'contract_id', 'contract_type']} 
                  statusArray={['active', 'suspended', 'pending', 'expired']} />

          <div className="w-full border-1 border-white/20 rounded-lg">
            
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

                    {filteredContracts && filteredContracts.map(contract => 
                      <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
                            {/* Company */}
                            <td>
                              <div className="flex items-center">
                                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                  <span>
                                    {getPartnerInitials(contract.contract)}
                                  </span>
                                </div>
                                <div>
                                  <div className=" text-white">
                                    {contract.contract}
                                  </div>                                
                                </div>
                              </div>                              
                            </td>
                            {/* Contract status */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className={`text-white text-sm px-1 inline-block w-16 rounded ${contract.contract_status == "expired" ? 'bg-red-400' : (contract.contract_status == "pending" ? 'bg-grey-500' : 'bg-green-700')}`}>{capitalizeFirst(contract.contract_status)}</span>
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
                                moment(contract.contract_expiration ?? moment())
                                .format("DD/MM/YYYY")
                              }
                              </div>
                            </td>
                            
                            <td>
                              
                              <div className="inline-flex items-center space-x-2 cursor-pointer rounded-full hover:bg-white/10 px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg> <a href={`${RemoteEndpoints.DOWNLOAD_CONTRACT.replace(':partner_uuid', contract.partner_uuid).replace(':type', 'signed')}`}><span className="text-white text-sm">Download</span></a>
                              </div>
                            </td>
                            
                      </tr>)
                    }
                  </tbody>
                </table>
                {
                  (!filteredContracts || filteredContracts.length) == 0 ?  
                  (<EmptyTable list={'Contracts'} />) : 
                  (<TablePager list={filteredContracts} action={setFilteredContracts}/>)
                }
              </>
            
          </div>
        </div>
      </div>
      
      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}
