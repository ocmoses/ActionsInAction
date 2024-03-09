"use client";
import { useState, useEffect, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials,
  capitalizeFirst
} from "@/app/modules/utilities";
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import {ContractSettingsContext} from "../ContractSettingsProvider";
import {ProfileContext} from "../../profile/ProfileProvider";
import ProfileSuccessModal from "@/app/components/modals/ProfileSuccessModal";
import RequestChangesDialogue from "@/app/components/modals/RequestChangesDialogue";
import RequestChangesModal from "@/app/components/modals/RequestChangesModal";
import useContracts from "@/hooks/useContracts";
import moment from "moment";
import usePartners from "@/hooks/usePartners";
import {contract_statuses} from "@/app/modules/constants";
import { data } from "autoprefixer";



export default function ContractSettings({params}) {

  console.log("PARAMNS", params);

    const {        
        partnerGetAllContracts
      } = useContracts();

    const {
        partner, 
        isSuperadmin,
        requestChangesDialogue,
        setRequestChangesDialogue,
        setRequestChangesModal
        
    } = useContext(ContractSettingsContext);

    const {
        profileSuccess,
        setProfileSuccess,
    } = useContext(ProfileContext);

    const {
      getAllServices,
      getChangeOrderStatus
    } = usePartners();


  // console.log("Partner", partner);
  
  const [contractId, setContractId] = useState(null);
  const [rejected, setRejected] = useState(null);
    
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false)
                                                }, 3000);

  const [contracts, setContracts] = useState([]);
  const [currentContract, setCurrentContract] = useState(null);
  const [popup, setPopup] = useState(null);
  const [canRequestChange, setCanRequestChange] = useState(false);

  const requestChange = (contract) => {
    console.log("Selected contract", contract);
    setCurrentContract(contract);
    setPopup(null);
    setRequestChangesDialogue(true);
    // setProfileSuccess(true);
  }

//   console.log("isSuperadmin", isSuperadmin);

    useEffect(() => {    
        
        partnerGetAllContracts().then(resp => {
            console.log("resp", resp);
            let contracts = resp.contracts;
            let pages = resp.pages;
            setContracts(contracts); 
            // setFilteredContracts(contracts); 
            // setPagedContracts(contracts); 
          });

          document.addEventListener('click', function(e){    
            if(!e.target.classList.contains("pop"))  
                setPopup(null);            
          }, true);

          if(params.params && params.params.length == 2){
            setContractId(params.params[0]);
            setRejected(params.params[1]);

            setRequestChangesModal(true);
          }
        
    }, []);

    useEffect(() => {
      getChangeOrderStatus()
          .then(resp => {

              if(resp.error){
                  console.log("ERROR", {error: resp.error});

                  if(resp.error == "No change ordert request found"){
                    setCanRequestChange(true);
                  }
              }

          });
  }, []);
  
  return (
    <>
      <div id="profile_page" className="flex flex-cols pb-12 min-h-screen" >
        <div className="w-full md:max-w-6xl pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Contracts</h2>
              {/* <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {filteredContracts?.length}
              </span> */}
            </div>
          </div>

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="w-full md:max-w-6xl mt-10 border-1 border-white/20 rounded-2xl">
        
            <table className="table w-full transparent ">
                <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-11 bg-white/20 ">
                      <th>
                          <span className="text-[13px]">Contract</span>
                      </th>
                      <th>
                          <span className="text-[13px]">Status</span>
                      </th>
                      <th>
                          <span className="text-[13px]">Start date</span>
                      </th> 
                      <th>
                          <span className="text-[13px]">End date</span>
                      </th> 
                      <th>
                          <span className="text-[13px]">Action</span>
                      </th>                     
                    </tr>

                    {contracts?.map(contract => 
                    <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
                            {/* Company */}
                            <td>
                            <div className="flex flex-col">
                                
                                <div className=" text-white">
                                    {contract.contract_id}
                                </div> 
                                <span className="text-sm">{contract.email ?? ""}</span>                               
                                
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
                                <div className="relative">
                                    {
                                      contract.contract_status != contract_statuses.EXPIRED && canRequestChange &&
                                        <div onClick={() => popup != contract.contract_id ? setPopup(contract.contract_id) : setPopup(null)} className="inline-flex justify-center items-center cursor-pointer rounded-full hover:bg-white/10 w-10 h-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>
                                        </div>
                                    }
                                    
                                    {popup == contract.contract_id && 
                                        <div className="pop flex flex-col p-2 rounded-lg bg-gray-700 absolute right-0 z-10">
                                            <p className="pop text-white p-2 hover:bg-white/40 cursor-pointer rounded-lg">Download</p>
                                            <p className="pop text-white p-2 hover:bg-white/40 cursor-pointer rounded-lg" onClick={() => requestChange(contract)}>Request Changes</p>
                                        </div>
                                    }
                                </div>                                
                            </td>
                            
                    </tr>)
                    }
                </tbody>
            </table>
            {/* {
            (filteredContracts.length == 0 && pagedContracts.length == 0) ?  
            (<EmptyTable list={'Contracts'} />) : 
            (<TablePager list={filteredContracts} action={setPagedContracts}/>)
            } */}

          </div>          
         
          
        </div>
      </div>

      <RequestChangesDialogue />
      <RequestChangesModal contract_id={contractId ? contractId : currentContract?.contract_id} rejected={rejected}/>
      <ProfileSuccessModal />

      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}