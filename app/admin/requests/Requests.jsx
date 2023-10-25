"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials
} from "@/app/modules/utilities";
import { status_type, statusOptions, request_types, docPrefix } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";
import { TailSpinPreloader, CompanyInitial } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import { ellipsify, capitalizeFirst } from "@/app/modules/utilities";

import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import FilePreviewModal from "@/app/components/FilePreviewModal";

import Confirm from "@/app/components/Confirm";
import Success from "@/app/components/toasts/Success";
import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

export default function Requests() {
  const {
          getAllBoardResolutionDocuments, 
          approving, 
          setApproving,          
          approveOrRejectBrd,
          getAllQuestionnaire,
          approveOrRejectQuestionnaire
        } = useAdmins();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false),                                                   
                                                  location.reload()
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

  const [fetchingBRD, setFetchingBRD] = useState(false);
  const [brds, setBrds] = useState([]);

  const [fetchingQuestionnaires, setFetchingQuestionnaires] = useState(false);
  const [questionnaires, setQuestionnaires] = useState([]);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [pagedRequests, setPagedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const activeStage = selectedRequest != null ? selectedRequest?.request_type : "Request Approval";
  const [openDrawer, setOpenDrawer] = useState(false);

  const { is_previewing_doc, handleCloseModal, setIsPreviewingDoc } = useApp();


  let get_brd_response = null;
  let approve_request_response = null;
  let reject_request_response = null;
  let get_questionnaire_response = null;

  const get_brds = async (page, perPage) => {
    if (fetchingBRD) return;
    setFetchingBRD(true);
    get_brd_response = await getAllBoardResolutionDocuments(page, perPage);
    
    console.log("All brds", get_brd_response);

    if (get_brd_response.error) {
      setError({ error: get_brd_response.error });
      return;
    };

    for(const brd of get_brd_response.brds){
      if(!requests.find(request => request.uuid == brd.uuid)){
        requests.push({
          "company": brd.company_name,
          "email": brd.delegate_email,
          "request_type": request_types.BOARD_RESOLUTION,
          "request_id": "",
          "created_at": brd.created_at,
          "status": brd.status,
          "file_name": brd.file_name ?? "",
          "file_path": brd.file_path ?? "",
          "partner_uuid": brd.partner_uuid,
          "uuid": brd.uuid
        });
      }
    }

    setRequests(requests);    

    requests.sort((a, b) => a.request_date > b.request_date ? -1 : a.request_date < b.request_date ? 1 : 0);
    setFilteredRequests(requests);

    console.log("Requests", requests);

    setBrds(get_brd_response.brds);
    setNavigation(get_brd_response.navigation);

    clearErrors();

    setFetchingBRD(false);
    
  };

  const get_questionnaires = async () => {
    if (fetchingQuestionnaires) return;
    setFetchingQuestionnaires(true);
    get_questionnaire_response = await getAllQuestionnaire();
    
    console.log("All questionnaire", get_questionnaire_response);

    if (get_questionnaire_response.error) {
      setError({ error: get_questionnaire_response.error });
      return;
    };

    for(const questionnaire of get_questionnaire_response.questionnaires){
      if(!requests.find(request => request.uuid == questionnaire.uuid)){
        requests.push({
          "company": questionnaire.company_name ?? "Company",
          "email": questionnaire.email ?? "email@email.com",
          "request_type": request_types.SUPPLIER_QUESTION,
          "request_id": questionnaire.id,
          "created_at": questionnaire.created_at,
          "status": questionnaire.status,
          "file_name": questionnaire.answered_questionaire?.replace(docPrefix, "") ?? "",
          "file_path": questionnaire.answered_questionaire ?? "",
          "partner_uuid": questionnaire.partner_uuid,
          "uuid": questionnaire.uuid
        });
      }
      
    }

    setRequests(requests);

    requests.sort((a, b) => a.request_date > b.request_date ? -1 : a.request_date < b.request_date ? 1 : 0);

    setFilteredRequests(requests);
    
    console.log("Requests after questionnaires", requests);

    setQuestionnaires(get_questionnaire_response.questionnaires);
    // setNavigation(get_questionnaire_response.navigation);

    clearErrors();

    setFetchingQuestionnaires(false);
    
  };

  const approveRequest = async () => {
    //TODO
    clearErrors();

    approvalData.status = "approved";

    if (approving) return;
    setApproving(true);

    approvalData.partner_uuid = selectedRequest.partner_uuid; 

    switch(selectedRequest?.request_type){
      case request_types.BOARD_RESOLUTION: 
        approvalData.board_document_uuid = selectedRequest.uuid; 
        approvalData.delegate_email = selectedRequest.email; 
        approve_request_response = await approveOrRejectBrd(approvalData);
        break;
      case request_types.SUPPLIER_QUESTION: 
        approve_request_response = await approveOrRejectQuestionnaire(approvalData);
        break;
    }
    

    setApproving(false);
    
    if(approve_request_response.message){
      //display success
      setSuccessMessage(approve_request_response.message);
      //set selected brd to null
      setSuccessToast(true);
      
    }else{
      //set errors
      setError({error: approve_request_response.error});
    }
    
    if (approve_request_response.error) setError({ error: approve_request_response.error });
  };

  const rejectRequest = async (reason) => {
    //TODO
    clearErrors();

    approvalData.status = "rejected";

    // console.log("RejectData", reason);

    if (approving) return;
    setApproving(true);

    approvalData.partner_uuid = selectedRequest.partner_uuid; 

    switch(selectedRequest?.request_type){
      case request_types.BOARD_RESOLUTION: 
        approvalData.feedback = reason.rejection_reason;
        approvalData.board_document_uuid = selectedRequest.uuid; 
        approvalData.delegate_email = selectedRequest.email;     
        reject_request_response = await approveOrRejectBrd(approvalData);
        break;
      case request_types.SUPPLIER_QUESTION: 
        approvalData.rejection_reason = reason.rejection_reason;           
        reject_request_response = await approveOrRejectQuestionnaire(approvalData);
        break;
    }
    
    setApproving(false);
    
    if(reject_request_response.message){
      //display success
      setSuccessMessage(reject_request_response.message);
      //set selected brd to null
      setSuccessToast(true);
      
    }else{
      //set errors
      setError({error: reject_request_response.error});
    }
    
    if (reject_request_response.error) setError({ error: reject_request_response.error });
  };

  const cancel = () => {
    setApprove(false);
    setReject(false);
  };

    
  useEffect(() => {
    setProcessing(false);
    clearErrors();
    get_questionnaires(); 
    get_brds();
         
  },[]);

  // useEffect(() => {
  // }, [filteredRequests]);

  return (
      <>
        <div id="approvals" className="flex flex-cols pb-12 min-h-screen">
          <div className="w-full pt-[72px] px-12 mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
                <h2>Requests</h2>
                <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                  {requests?.length}
                </span>
              </div>
              
            </div>

            {errors && errors["error"] && (
              <div className="mb-6">
                <FormErrors error={errors["error"]} />
              </div>
            )}

            <Filter list={requests}             
                    filterAction={setFilteredRequests} 
                    keysArray={['company', 'email', 'request_type']} 
                    statusArray={['approved', 'rejected', 'not_approved']} />

            <div className="w-full border-1 border-white/20 rounded-lg">
              
              <table className="table w-full transparent ">
                <tbody>
                  {/* head */}
                  <tr className="border-b border-b-white/40 text-11 bg-white/20">
                    <th>
                      <span className="text-[13px]">Company</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Request type</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Request ID</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Request Date</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Status</span>
                    </th> 
                    <th>
                      <span className="text-[13px]"></span>
                    </th>                      
                  </tr>

                  {pagedRequests && pagedRequests.length > 0 && pagedRequests.map(request => 
                    <tr 
                        className="border-b border-b-white/10 cursor-pointer bg-transparent" key={request.uuid}
                    >
                          {/* Company */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center font-bold space-x-4">                                    
                                <CompanyInitial 
                                    initials={getInitials(request.company).toUpperCase()}
                                    email={request.email} />
                                <div className="flex flex-col">
                                  <p>{request.company}</p>
                                  {request.email && <span className="text-sm text-gray-500">{request.email}</span>}  
                                </div>                                
                              </div>                              
                            </div>
                          </td>
                          {/* Request type */}
                          <td>
                            <div className="flex gap-0 flex-col">
                              <span className="text-white text-sm">{request.request_type}</span>
                            </div>
                          </td>
                          {/* Request ID */}
                          <td>
                            <div className="flex gap-0 flex-col">
                              <span className="text-white">{request.request_ID}</span>
                            </div>
                          </td>
                          {/* Request Date */}
                          <td>
                            <div>
                            {
                              moment(request.created_at ?? moment())
                              .format("MMM YYYY")
                            }
                            </div>
                          </td>
                          {/* Status */}
                          <td>
                            <div className={` py-1 px-2 rounded text-white inline-flex text-sm ${request.status.toLowerCase() == 'rejected' ? "bg-red-700/50" : (request.status.toLowerCase() == 'approved' ? "bg-green-900/50" : "bg-white/20")}`}>
                              {capitalizeFirst(request.status.replace('_', ' '))}
                            </div>
                          </td>
                          {/* Action */}
                          <td>                            
                            <span onClick={() => {setSelectedRequest(request); setOpenDrawer(true); console.log("selectedRequest", request);}} 
                              className="text-yellow-600 cursor-pointer">
                              Review
                            </span>
                          </td>
                          
                    </tr>)
                  }
                  
                </tbody>
              </table>
              {
                !(filteredRequests && pagedRequests) ?  
                (<EmptyTable list={'Requests'} />) : 
                (<TablePager list={filteredRequests} action={setPagedRequests} />)
              }
            </div>
          </div>
        </div>
        {is_previewing_doc && selectedRequest && (
          <FilePreviewModal
            filePath={selectedRequest?.file_path}
            closeModal={handleCloseModal}
          />
        )}
        <ComplianceDrawer
          activeStage={activeStage}
          category={null}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        >
          <div className="border-1 border-white/20 rounded-xl p-4 flex mx-4 relative">

            {
              (approve || reject) &&
                <div className={`absolute left-0 top-0 w-full p-3 border border-[#212121] rounded-[8px] z-10 bg-[#313131]`} >
                {approve && (
                  <Confirm
                    yestext="Yes"
                    notext="No"
                    type="approve"
                    onYes={() => approveRequest()}
                    onNo={cancel}
                  />
                )}
                {reject && (
                  <Confirm
                    yestext="Reject"
                    notext="Cancel"
                    type="reject"
                    onYes={(reason) => rejectRequest(reason)}
                    onNo={cancel}
                  />
                )}
              </div>
            }

            <div className="">
              <p className="text-white">
                {selectedRequest?.request_type}
              </p>
              <div className="border-1 border-white/10 rounded-2xl px-3 py-1 text-white/70 inline-flex items-center text-[11px] cursor-pointer" onClick={() => setIsPreviewingDoc(!is_previewing_doc)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>&nbsp; {selectedRequest?.file_name}
              </div>
            </div>

            <div className="flex h-full items-center px-2 w-32 ml-auto">

              {
                selectedRequest?.status != 'approved' &&                   
                <>
                  <div className="w-[36px] h-[36px] cursor-pointer text-red-600 hover:text-red-600/50 rounded-full border-solid border-2 border-red-600 hover:border-red-600/50 flex justify-center items-center"
                    onClick={() => setReject(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12">
                      </path>
                    </svg>
                  </div>

                  <div className="w-[36px] h-[36px] cursor-pointer text-green-600 hover:text-green-600/50 rounded-full border-solid border-2 border-green-600 hover:border-green-600/50 flex justify-center items-center ml-4"
                    onClick={() => setApprove(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5">
                      </path>
                    </svg>
                  </div>
                </> 
              }
                                

            </div>
            

          </div>
        </ComplianceDrawer>    

        <Success message={successMessage} visible={successToast} action={successAction} />      
      </>
        
  );
}
