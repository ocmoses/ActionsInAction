"use client";
import { useState, useEffect, useRef, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase
} from "@/app/modules/utilities";
import { status_type, statusOptions, role_types, questionnaire_pending} from "@/app/modules/constants";
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
import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";
import {ContractContext} from "./ContractProvider";
import useQuestionnaire from "@/hooks/useQuestionnaire";

import AgreementModal from "@/app/components/modals/AgreementModal";
import SelectServiceModal from "@/app/components/modals/SelectServiceModal";
import ContractSignatoriesModal from "@/app/components/modals/ContractSignatoriesModal";
import AddSignatoryModal from "@/app/components/modals/AddSignatoryModal";
import ChooseSignatoryModal from "@/app/components/modals/ChooseSignatoryModal";
import SuccessFeedbackModal from "@/app/components/modals/SuccessFeedbackModal";
import ContractStatus from "./ContractStatus";

import QuestionnaireModal from "@/app/components/modals/QuestionnaireModal";


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
    signingWitness,
    checkQuestionnaireStatus
  } = useContext(ContractContext);

  const {getAllPartnerRoles} = useRoles();

  const {getQuestionnaireStatus} = useQuestionnaire();

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
  
  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

  const [partnerRoles, setPartnerRoles] = useState([]);
  

  const APPROVED = "approved";

  const [dynamicData, setDynamicData] = useState(null);

  const [pages, setPages] = useState(null);
    
  // console.log("selected_admin_users", selected_admin_users);
  // console.log("signingDirector", signingDirector);

  let all_Roles = null;
  let dynamic_content_response =  null;


  const [filteredContracts, setFilteredContracts] = useState([]);
  const [pagedContracts, setPagedContracts] = useState([]);


  const [toFillQuestionnaire, setToFillQuestionnaire] = useState(false);
  const [questionnaireAlert, setQuestionnaireAlert] = useState(false);
  const [showQuestionare, setShowQuestionare] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(null);


  const get_all_partner_roles = async () => {
    clearErrors();
    if (fetchingPartnerRoles) return;
    setFetchingPartnerRoles(true);
    all_Roles = await getAllPartnerRoles();
    setPartnerRoles(all_Roles.partner_roles);
    setFetchingPartnerRoles(false);
    if (all_Roles.error) setError({ error: all_Roles.error });
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

  useEffect(() => {      
    checkQuestionnaireStatus();
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
          {questionnaireAlert && 
            (<>
              <div className="w-full md:max-w-6xl p-4 px-6 rounded-lg border-1 border-white/10 bg-white/5 flex space-x-4 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white text-lg">Supplier Questionnaire</p>
                  <p className="text-white/40 mb-4">There is one or more issues flagged in your supplier questionnaire</p>

                  <span onClick={() => setShowQuestionare(true)} 
                    className="p-2 px-4 mb-2 border-1 border-white/40 text-white/80 rounded-full hover:bg-white/10 inline-block cursor-pointer text-sm">
                      Review
                  </span>

                </div>
              </div>
              {
                showQuestionare && (
                <QuestionnaireModal hide={() => setShowQuestionare(false)} 
                                    action={() => setQuestionnaireAlert(false)}
                                    rejectionReason={rejectionReason} />)
              }
            </>)
          }{
            !questionnaireAlert && 
            <ContractStatus />
          }

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

      <AgreementModal />
      <SelectServiceModal />
      <ContractSignatoriesModal />
      <AddSignatoryModal />
      <ChooseSignatoryModal />
      <SuccessFeedbackModal />

      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}
