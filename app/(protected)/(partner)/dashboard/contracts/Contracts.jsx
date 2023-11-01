"use client";
import { useState, useEffect, useRef, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase
} from "@/app/modules/utilities";
import { status_type, statusOptions, role_types} from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";
import {capitalizeFirst} from "@/app/modules/utilities";
import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useContracts from "@/hooks/useContracts";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Success from "@/app/components/toasts/Success";
import useUsers from "@/hooks/useUsers";
import useRoles from "@/hooks/useRoles";
import {useStoreState} from 'easy-peasy';
import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";
import {ContractContext} from "./ContractProvider";

import SelectServiceModal from "@/app/components/modals/SelectServiceModal";
import ContractSignatoriesModal from "@/app/components/modals/ContractSignatoriesModal";
import AddSignatoryModal from "@/app/components/modals/AddSignatoryModal";
import ChooseSignatoryModal from "@/app/components/modals/ChooseSignatoryModal";
import SuccessFeedbackModal from "@/app/components/modals/SuccessFeedbackModal";

export default function Contracts() {

  const {
    partner,
    contractStatus,
    userStatus,
    selectedAllRequiredSignatories,
    isASignatory,
    signatoryRole,
    allHaveSigned,
    hasSigned,
    isPartner,
    partnerGetAllContracts,
    getAllAdminPartners,
    submitAllSignatories,
    downloadSignedContract,
    getContractDynamicData,
    signingDirector,
    signingDelegate,
    signingWitness
  } = useContext(ContractContext);

  const {getAllPartnerRoles} = useRoles();

  console.log("context", partner);

  const [contracts, setContracts] = useState(null);
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [selectedBrd, setSelectedBrd] = useState(null);
  const users = useStoreState((state) => state.users);

  if(!partner){
    location.reload();
  }

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

  const {user, role, refreshSession} = useUsers();

  // console.log("usePartners() from compliance", usePartners());
  // console.log("useUsers() from compliance", useUsers());

  const [showModal, setShowModal] = useState(false);

  const [submitingContractSignatories, setSubmitingContractSignatories] = useState(false);
  const [selectDirectorModal, setSelectDirectorModal] = useState(false);  
  const [addDirectorModal, setAddDirectorModal] = useState(false);
  const [addingDirector, setAddingDirector] = useState(false);  
  const [addDelegateModal, setAddDelegateModal] = useState(false);
  const [addingDelegate, setAddingDelegate] = useState(false);
  const [addWitnessModal, setAddWitnessModal] = useState(false);
  const [addingWitness, setAddingWitness] = useState(false);
  const [contractSignatoriesSuccess, setContractSignatoriesSuccess] = useState(false);

  const [selectingService, setSelectingService] = useState(false);

  const [signatories, setSignatories] = useState({director: null, delegate: null, witness: null});

  const [creatingPartner, setCreatingPartner] = useState(false);
  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [fetchingAdminPartners, setFetchingAdminPartners] = useState(false);
  const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

  const [adminPartners, setAdminPartners] = useState([]);
  const [partnerRoles, setPartnerRoles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(false);

  const [agreementModal, setAgreementModal] = useState(false);
  const [acceptingAgreement, setAcceptingAgreement] = useState(false);

  const [data, setData] = useState({partner_uuid: partner?.uuid, phone: '000000000', firstname: "", lastname: "", email: "", role: ""});
  const [disableActiveButton, setDisableActiveButton] = useState(true);

  const [allowSubmitSignatories, setAllowSubmitSignatories] = useState(false);
  

  const APPROVED = "approved";

  const [dynamicData, setDynamicData] = useState(null);

  const [pages, setPages] = useState(null);
    
  // console.log("selected_admin_users", selected_admin_users);
  // console.log("signingDirector", signingDirector);

  let get_service_response = null;
  let partner_select_service_response = null;
  let create_partner_response = null;
  let all_Roles = null;
  let all_admin_partners_response = null;
  let submit_signatories_response = null;
  let dynamic_content_response =  null;


  const [filteredContracts, setFilteredContracts] = useState([]);
  const [pagedContracts, setPagedContracts] = useState([]);


  const get_all_partner_roles = async () => {
    clearErrors();
    if (fetchingPartnerRoles) return;
    setFetchingPartnerRoles(true);
    all_Roles = await getAllPartnerRoles();
    setPartnerRoles(all_Roles.partner_roles);
    setFetchingPartnerRoles(false);
    if (all_Roles.error) setError({ error: all_Roles.error });
  };

  const get_all_admin_partners = async () => {
    if (fetchingAdminPartners) return;
    setFetchingAdminPartners(true);
    all_admin_partners_response = await getAllAdminPartners();
    setFetchingAdminPartners(false);

    if (all_admin_partners_response.error) {
      setError({ error: all_admin_partners_response.error });
    }else{
      console.log("Admin_partners", all_admin_partners_response.admin_partners);
      setAdminPartners(all_admin_partners_response.admin_partners);

      //update signing director, delegate or witness
      // confirmSignatories(selected_admin_users, all_admin_partners_response.admin_partners);
    }
     
  };

  const submit_signatories = async (signatories) => {

    let data = {"email": []};

    console.log("signatories", signatories);

    for(let prop in signatories){
      if(signatories[prop]){
        data.email.push(signatories[prop].email);
      }      
    }

    if((signatories.director || signatories.delegate) && signatories.witness){
      if (submitingContractSignatories) return;
      setSubmitingContractSignatories(true);
      submit_signatories_response = await submitAllSignatories(data);
      setSubmitingContractSignatories(false);
      if (submit_signatories_response.error) {
        setError({ error: submit_signatories_response.error });
      }else{
        setContractSignatriesModal(false);
        setContractSignatoriesSuccess(true);
        refreshSession();
      }
    }else{
      setError({error: "You must choose a director or delegate and a witness"});
    }
    
  };

  const get_dynamic_content = async () => {
    if (gettingDynamicContent) return;
    setGettingDynamicContent(true);
    dynamic_content_response = await getContractDynamicData();
    setGettingDynamicContent(false);
    console.log('dynamic_content_response', dynamic_content_response);
    if (dynamic_content_response.error) {
        setError({ error: dynamic_content_response.error })
    } else {
        // console.log('dynamic_content_response', dynamic_content_response);
        setDynamicData(dynamic_content_response.data);                
    }
  }

    
  useEffect(() => {
   setProcessing(false);
    clearErrors();
    setProcessing(false);
    

    if(user?.role == role_types.SUPER_ADMIN){

      get_all_partner_roles();
        
    }    
    // get_all_admin_partners();
    // get_dynamic_content();
    
   
    partnerGetAllContracts().then(resp => {
      console.log("resp", resp);
      let contracts = resp.contracts;
      let pages = resp.pages;
      setContracts(contracts); 
      setPages(pages);
      setFilteredContracts(contracts); 
      setPagedContracts(contracts); 
    });

       
  }, []);


  return (
    <>
      <div id="contract_page" className="flex flex-cols pb-12 min-h-screen" >
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Contracts</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {filteredContracts?.length}
              </span>
            </div>
            
          </div>

          {/* Only when we have not selected all signees */}
          {users.role == 'superAdmin' && 
            userStatus == APPROVED && !selectedAllRequiredSignatories ? 

            <div className="my-8 max-w-6xl">          
              <CallToAction
                style={{border: "1px solid rgba(255,255,255,.1)", marginBottom: "50px"}}
                message="Your contract is ready. Click here to sign"
                description="Outline contract conditions and give contract warrantees."
                onclick={() => {showContracts()}}
                button={'Sign your contract'}
                color="text-gray-200"
                desccolor="text-[#999999]"
                bg='bg-white/10'
                border="border-transparent"
                icon={
                  <div className="relative inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                      stroke="currentColor" className="w-12 h-12">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" className="w-6 h-6 absolute top-4 left-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" fill="yellow" 
                        className="w-4 h-6 absolute top-8 right-2">
                      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                    </svg>
                  </div>            

                }
              />                        
            </div> : (
              allHaveSigned ? 

              <div className="my-8 max-w-6xl">
                
                <CallToAction
                  style={{border: "1px solid rgba(255,255,255,.1)"}}
                  message="Your contract has been signed"
                  description="Outline contract conditions and give contract warrantees."
                  onclick={() => showAgreement()}
                  feedback={<div className="flex space-x-2 items-center">
                    <div className="py-1 px-3 rounded-full bg-[#00FF0020] text-white flex justify-center items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                      </svg> &nbsp; Signed <span className="py-1 px-2 bg-black/40 text-white rounded-full"> {moment(dynamicData?.date_of_contract).format("DD/MM/YYYY")}</span>
                    </div>
                    <a href={downloadSignedContract()} target="_blank">
                      <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </a>               
                    <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                      </svg>
                    </div>            
                  </div>}
                  color="text-gray-200"
                  desccolor="text-[#999999]"
                  bg='bg-white/10'
                  border="border-transparent"
                  icon={
                    <div className="relative inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" className="w-12 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                          stroke="currentColor" className="w-6 h-6 absolute top-4 left-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" fill="currentColor" 
                          className="w-4 h-6 absolute top-8 right-2">
                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                      </svg>
                    </div>            

                  }
                />

              </div> : (
                ( (users.role == 'superAdmin' && selectedAllRequiredSignatories && !allHaveSigned) ||
              
                (userStatus == APPROVED && 
                selectedAllRequiredSignatories && 
                //You were selected 
                // isASignatory && 
                //you have not signed 
                hasNotSigned
                ) ) ? 
      
              <div className="my-8 max-w-6xl">  
                <CallToAction
                  style={{border: "1px solid rgba(255,255,255,.1)", marginBottom: "50px"}}
                  message="Your contract is ready. Click here to sign"
                  description="Outline contract conditions and give contract warrantees."
                  onclick={() => {showAgreement()}}
                  button={'Sign your contract'}
                  color="text-gray-200"
                  desccolor="text-[#999999]"
                  bg='bg-white/10'
                  border="border-transparent"
                  icon={
                    <div className="relative inline-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" className="w-12 h-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                          stroke="currentColor" className="w-6 h-6 absolute top-4 left-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" fill="yellow" 
                          className="w-4 h-6 absolute top-8 right-2">
                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                      </svg>
                    </div>
                        
                  }
                />
              </div> : ""
              )
            )
          }
          {/* Just for tests ends here */}

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <Filter list={contracts} 
                  filterAction={setFilteredContracts} 
                  keysArray={['contract', 'contract_id', 'contract_type']} 
                  statusArray={['active', 'suspended', 'pending', 'expired']} />

          <div className="w-full md:max-w-6xl mt-10 border-1 border-white/20 rounded-lg">
            
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
                    <span className="text-[13px]">PDF</span>
                  </th>                     
                </tr>

                {pagedContracts?.map(contract => 
                  <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
                        {/* Company */}
                        <td>
                          <div className="flex flex-col">
                            
                              <div className=" text-white">
                                {contract.contract_id}
                              </div> 
                              <span className="text-sm">abscdagah.io</span>                               
                            
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
            {
              (filteredContracts.length == 0 && pagedContracts.length == 0) ?  
              (<EmptyTable list={'Contracts'} />) : 
              (<TablePager list={filteredContracts} action={setPagedContracts}/>)
            }

          </div>
        </div>
      </div>

      <SelectServiceModal />
      <ContractSignatoriesModal />
      <AddSignatoryModal />
      <ChooseSignatoryModal />
      <SuccessFeedbackModal />
      
      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}
