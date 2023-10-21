"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials
} from "@/app/modules/utilities";
import { status_type, statusOptions, request_types } from "@/app/modules/constants";
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

export default function Requests() {
  const {getAllBoardResolutionDocuments, approving, setApproving, approveOrRejectBrd} = useAdmins();
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

  const [fetchingBRD, setFetchingBRD] = useState(false);
  const [brds, setBrds] = useState([]);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const activeStage = "board_resolution_document";
  const [openDrawer, setOpenDrawer] = useState(false);

  const { is_previewing_doc, handleCloseModal, setIsPreviewingDoc } = useApp();


  let get_brd_response = null;
  let approve_brd_response = null;
  let reject_brd_response = null;

  const get_brds = async (page, perPage) => {
    if (fetchingBRD) return;
    setFetchingBRD(true);
    get_brd_response = await getAllBoardResolutionDocuments(page, perPage);
    
    console.log("All brds", get_brd_response);

    if (get_brd_response.error) {
      setError({ error: get_brd_response.error });
      return;
    };

    let brdRequests = get_brd_response.brds.map(
                        function(brd){
                          return {
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
                          }
                      });

    setRequests([...requests, ...brdRequests]);
    setFilteredRequests([...requests, ...brdRequests]);

    requests.sort((a, b) => a.request_date > b.request_date ? -1 : a.request_date < b.request_date ? 1 : 0);

    console.log("Requests", requests);

    setBrds(get_brd_response.brds);
    setNavigation(get_brd_response.navigation);

    clearErrors();

    setFetchingBRD(false);
    
  };

  const approveBrd = async () => {
    //TODO
    clearErrors();

    approvalData.status = "approved";

    // console.log("approvalData", approvalData);

    if (approving) return;
    setApproving(true);
    approve_brd_response = await approveOrRejectBrd(approvalData);

    setApproving(false);
    
    if(approve_brd_response.message){
      //display success
      setSuccessMessage(approve_brd_response.message);
      //set selected brd to null
      setSuccessToast(true);
      
    }else{
      //set errors
      setError({error: approve_brd_response.error});
    }
    
    if (approve_brd_response.error) setError({ error: approve_brd_response.error });
  };

  const rejectBrd = async (reason) => {
    //TODO
    clearErrors();

    approvalData.status = "rejected";

    approvalData.feedback = reason.rejection_reason;

    // console.log("RejectData", reason);

    if (approving) return;
    setApproving(true);
    reject_brd_response = await approveOrRejectBrd(approvalData);

    setApproving(false);
    
    if(reject_brd_response.message){
      //display success
      setSuccessMessage(reject_brd_response.message);
      //set selected brd to null
      setSuccessToast(true);
      
    }else{
      //set errors
      setError({error: reject_brd_response.error});
    }
    
    if (reject_brd_response.error) setError({ error: reject_brd_response.error });
  };

  const cancel = () => {
    setApprove(false);
    setReject(false);
  };

    
  useEffect(() => {
    setProcessing(false);
    clearErrors();
    get_brds();    
  },[]);

  return (
      <>
        <div id="approvals" className="flex flex-cols pb-12 min-h-screen">
          <div className="w-full pt-[72px] px-12 mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
                <h2>Requests</h2>
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

                  {filteredRequests && filteredRequests.length > 0 && filteredRequests.map(request => 
                    <tr 
                        className="border-b border-b-white/10 cursor-pointer bg-transparent"
                    >
                          {/* Company */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center font-bold space-x-4">                                    
                                <CompanyInitial 
                                    initials={getInitials(request.company).toUpperCase()}
                                    email={request.email} />
                                <div class="flex flex-col">
                                  <p>{request.company}</p>
                                  {request.email && <span className="text-sm text-gray-500">{request.email}</span>}  
                                </div>                                
                              </div>                              
                            </div>
                          </td>
                          {/* Request type */}
                          <td>
                            <div className="flex gap-0 flex-col">
                              <span className="text-white">{request.request_type}</span>
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
                            <div className={` py-1 px-2 rounded text-white inline-flex ${request.status.toLowerCase() == 'rejected' ? "bg-red-700/50" : (request.status.toLowerCase() == 'approved' ? "bg-green-900/50" : "bg-white/20")}`}>
                              {capitalizeFirst(request.status.replace('_', ' '))}
                            </div>
                          </td>
                          {/* Action */}
                          <td>
                            {/* <div  className="flex gap-0" onClick={() => {
                                                                          setSelectedBrd(brd);
                                                                          setApprovalData(() => ({...approvalData, board_document_uuid: brd.uuid,
                                                                          partner_uuid: brd.partner_uuid,
                                                                          delegate_email: brd.delegate_email}) );

                                                                          console.log("selectedBrd", selectedBrd); 
                                                                        }
                                                                  }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>                             */}
                            <span onClick={() => {setSelectedRequest(request); setOpenDrawer(true)}} 
                              className="text-yellow-600 cursor-pointer">
                              Review
                            </span>
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
                    onYes={() => approveBrd()}
                    onNo={cancel}
                  />
                )}
                {reject && (
                  <Confirm
                    yestext="Reject"
                    notext="Cancel"
                    type="reject"
                    onYes={(reason) => rejectBrd(reason)}
                    onNo={cancel}
                  />
                )}
              </div>
            }

            <div className="">
              <p className="text-white">
                Board resolution
              </p>
              <div className="border-1 border-white/10 rounded-2xl px-3 py-1 text-white/70 inline-flex items-center text-[11px] cursor-pointer" onClick={() => setIsPreviewingDoc(!is_previewing_doc)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>&nbsp; {selectedRequest?.file_name}
              </div>
            </div>

            <div className="flex h-full items-center px-2 w-32 ml-auto">

              {
                selectedRequest?.status != 'approved' &&                   
                <>
                  <div className="w-[36px] h-[36px] cursor-pointer text-red-600 hover:text-red-600/50 rounded-full border-solid border-2 border-red-600 hover:border-red-600/50 flex justify-center items-center"
                    onClick={() => setReject(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12">
                      </path>
                    </svg>
                  </div>

                  <div className="w-[36px] h-[36px] cursor-pointer text-green-600 hover:text-green-600/50 rounded-full border-solid border-2 border-green-600 hover:border-green-600/50 flex justify-center items-center ml-4"
                    onClick={() => setApprove(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5">
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
