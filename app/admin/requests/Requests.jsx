"use client";
import { useState, useEffect, useCallback } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials,
} from "@/app/modules/utilities";
import {
  status_type,
  statusOptions,
  request_types,
  docPrefix,
} from "@/app/modules/constants";
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
import TextInput from "@/app/components/form/TextInput";
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import FilePreviewModal from "@/app/components/FilePreviewModal";
import RevenueShareDrawer from "@/app/components/drawers/RevenueShareDrawer";
import ChangeOrderDrawer from "@/app/components/drawers/ChangeOrderDrawer";
import IPDrawer from "@/app/components/drawers/IPDrawer";


import Confirm from "@/app/components/Confirm";
import Success from "@/app/components/toasts/Success";
import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

//////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  GracePeriodAdminFlyOut,
  LicenseRenewalAdminFlyout,
} from "@/app/components/dashboard/compliance/GracePeriodComponent";
import ShortCodeAlert from "@/app/components/RequestComponent";
//////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Requests() {
  const {
    getAllBoardResolutionDocuments,
    approving,
    setApproving,
    approveOrRejectBrd,
    getAllQuestionnaire,
    approveOrRejectQuestionnaire,
    getAllRevenueShare,
    getAllChangeOrder,
    getAllGreacePeriod,
    getAllLicenceRenewal,
    getAllIP,
    getAllPartnersShortCodes
  } = useAdmins();

  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () =>
    setTimeout(() => {
      setSuccessToast(false), location.reload();
    }, 3000);

  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  const [showOthersTextbox, setShowOthersTextbox] = useState(false);

  let [approvalData, setApprovalData] = useState({
    board_document_uuid: "",
    partner_uuid: "",
    delegate_email: "",
    status: "",
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

  const [typedReason, setTypedReason] = useState("");

  const activeStage =
    selectedRequest != null
      ? selectedRequest?.request_type
      : "Request Approval";
  const [openDrawer, setOpenDrawer] = useState(false);

  const { is_previewing_doc, handleCloseModal, setIsPreviewingDoc } = useApp();

  const [openRevenueShareDrawer, setOpenRevenueShareDrawer] = useState(false);
  const [openChangeOrderDrawer, setOpenChangeOrderDrawer] = useState(false);
  const [openIPDrawer, setOpenIPDrawer] = useState(false);

  const [fetchingGracePeriods, setFetchingGracePeriods] = useState(false);
  const [gracePeriods, setGracePeriods] = useState([]);
  const [gracePeriodFlyout, setGracePeriodFlyout] = useState(false);

  const [fetchingLicenseRenewals, setFetchingLicenseRenewals] = useState(false);
  const [licenseRenewals, setlicenseRenewals] = useState([]);
  const [licenseRenewalFlyout, setLicenseRenewalFlyout] = useState(false);

  const [fetchingShortcodes, setFetchingShortcodes] = useState(false);
  const [shortcodes, setShortcodes] = useState([]);
  const [shortcodesFlyout, setShortcodesFlyout] = useState(false);

  const open = (request) => {
    switch(request.request_type){
      case request_types.REVENUE_SHARE: setOpenRevenueShareDrawer(true); 
        break;
      case request_types.CHANGE_ORDER: setOpenChangeOrderDrawer(true); 
        break;
        case  request_types.GRACE_PERIOD: setGracePeriodFlyout(true);
        break;
        case  request_types.LICENSE_RENEWAL: setLicenseRenewalFlyout(true);
        break;
        case request_types.VAS_CLEARANCE: setOpenIPDrawer(true);
        break;
        case request_types.SHORTCODES: setShortcodesFlyout(true);
        break;
      default: setOpenDrawer(true);
    }
  }

  const [checks, setChecks] = useState({ 1: 0, 2: 0, 3: 0 });

  const [data, setData] = useState({
    content_provider_share: "",
    mtn_share: "",
  });

  let get_brd_response = null;
  let get_questionnaire_response = null;
  let get_revenue_share_response = null;
  let get_grace_period_response = null;
  let approve_request_response = null;
  let reject_request_response = null;
  let get_license_renewal_response = null;
  let get_all_partner_shortcodes_response = null;

  const get_brds = async (page, perPage) => {
    if (fetchingBRD) return;
    setFetchingBRD(true);
    get_brd_response = await getAllBoardResolutionDocuments(page, perPage);

    console.log("All brds", get_brd_response);

    if (get_brd_response.error) {
      setError({ error: get_brd_response.error });
      return;
    }

    for (const brd of get_brd_response.brds) {
      if (!requests.find((request) => request.uuid == brd.uuid)) {
        requests.push({
          company: brd.company_name,
          email: brd.delegate_email,
          request_type: request_types.BOARD_RESOLUTION,
          request_id: brd.request_id,
          created_at: brd.created_at,
          status: brd.status,
          file_name: brd.file_name ?? "",
          file_path: brd.file_path ?? "",
          partner_uuid: brd.partner_uuid,
          uuid: brd.uuid,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    setRequests(requests);
    setFilteredRequests(requests);

    //console.log("Requests", requests);

    setBrds(get_brd_response.brds);
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
    }

    for (const questionnaire of get_questionnaire_response.questionnaires) {
      if (!requests.find((request) => request.uuid == questionnaire.uuid)) {
        requests.push({
          company: questionnaire.company_name ?? "Company",
          email: questionnaire.email ?? "email@email.com",
          request_type: request_types.SUPPLIER_QUESTION,
          request_id: questionnaire.request_id,
          created_at: questionnaire.created_at,
          status: questionnaire.status,
          file_name:
            questionnaire.answered_questionaire?.replace(docPrefix, "") ?? "",
          file_path: questionnaire.answered_questionaire ?? "",
          partner_uuid: questionnaire.partner_uuid,
          uuid: questionnaire.uuid,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests after questionnaires", requests);

    setQuestionnaires(get_questionnaire_response.questionnaires);

    clearErrors();

    setFetchingQuestionnaires(false);
  };

  const get_revenue_share = async (page, perPage) => {
    get_revenue_share_response = await getAllRevenueShare();

    console.log("All rev share", get_revenue_share_response);

    if (get_revenue_share_response.error) {
      setError({ error: get_revenue_share_response.error });
      return;
    }

    for (const revenue_share of get_revenue_share_response.revenue_share) {
      if (!requests.find((request) => request.uuid == revenue_share.uuid)) {
        requests.push({
          company: revenue_share.company_name,
          email: revenue_share.delegate_email,
          request_type: request_types.REVENUE_SHARE,
          request_id: revenue_share.request_id,
          created_at: revenue_share.created_at,
          status: revenue_share.status ?? "pending",
          partner_uuid: revenue_share.partner_uuid,
          uuid: revenue_share.uuid,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests", requests);
    clearErrors();
  };

  const get_change_order = async (page, perPage) => {
    
    let get_change_order_response = await getAllChangeOrder();

    console.log("All change order", get_change_order_response);

    if (get_change_order_response.error) {
      setError({ error: get_change_order_response.error });
      return;
    }

    for (const change_order of get_change_order_response.change_orders) {
      if (!requests.find((request) => request.uuid == change_order.uuid)) {
        requests.push({
          company: change_order.company_name,
          email: change_order.delegate_email,
          request_type: request_types.CHANGE_ORDER,
          request_id: change_order.request_id,
          created_at: change_order.created_at,
          status: change_order.status ?? "pending",
          partner_uuid: change_order.partner_uuid,
          uuid: change_order.uuid,
          ...change_order,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests", requests);
    clearErrors();

  }

  const get_ips = async (page, perPage) => {

    setRequests(requests.filter(r => r.request_type != request_types.VAS_CLEARANCE));
    
    let get_ips_response = await getAllIP();

    console.log("All IPs", get_ips_response);

    if (get_ips_response.error) {
      setError({ error: get_ips_response.error });
      return;
    }

    for (const ip of get_ips_response.ips) {
      if (!requests.find((request) => request.uuid == ip.uuid)) {
        requests.push({
          company: ip.company_name,
          email: ip.delegate_email,
          request_type: request_types.VAS_CLEARANCE,
          request_id: ip.request_id,
          created_at: ip.created_at,
          status: ip.status ?? "pending",
          partner_uuid: ip.partner_uuid,
          uuid: ip.uuid,
          ...ip
        })
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests", requests);
    clearErrors();

  }


  const get_grace_period = async () => {
    if (fetchingGracePeriods) return;
    setFetchingGracePeriods(true);

    get_grace_period_response = await getAllGreacePeriod();
    // console.log("All get_grace_period_response", get_grace_period_response);

    if (get_grace_period_response.error) {
      setError({ error: get_grace_period_response.error });
      return;
    }

    for (const graceperiod of get_grace_period_response.graceperiods) {
      if (!requests.find((request) => request.uuid == graceperiod.uuid)) {
        requests.push({
          company: graceperiod.company_name ?? "Company",
          email: graceperiod.email ?? "email@email.com",
          request_type: request_types.GRACE_PERIOD,
          request_id: graceperiod.request_id,
          created_at: graceperiod.created_at,
          approved_on: graceperiod.approved_on,
          rejected_on: graceperiod.rejected_on,
          status: graceperiod.status,
          file_name:
            graceperiod.license_grace_period_file?.split("/").pop() ?? "",
          file_path: graceperiod.license_grace_period_file ?? "",
          partner_uuid: graceperiod.partner_uuid,
          uuid: graceperiod.uuid,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    if (
      selectedRequest &&
      selectedRequest.request_type == request_types.GRACE_PERIOD
    ) {
      setSelectedRequest(requests.find((r) => r.id == selectedRequest.id));
    }

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests", requests);
    clearErrors();
    setRequests(requests);
    setFilteredRequests(requests);
    setGracePeriods(get_grace_period_response.graceperiods);
    clearErrors();
    setFetchingGracePeriods(false);
  };

  const get_license_renewal = async () => {
    if (fetchingLicenseRenewals) return;
    setFetchingLicenseRenewals(true);

    get_license_renewal_response = await getAllLicenceRenewal();
    // console.log("All get_license_renewal_response", get_license_renewal_response);

    if (get_license_renewal_response.error) {
      setError({ error: get_license_renewal_response.error });
      return;
    }

    for (const licenserenewal of get_license_renewal_response.licenserenewals) {
      if (!requests.find((request) => request.uuid == licenserenewal.uuid)) {
        requests.push({
          company: licenserenewal.company_name ?? "Company",
          email: licenserenewal.email ?? "email@email.com",
          request_type: request_types.LICENSE_RENEWAL,
          request_id: licenserenewal.request_id,
          created_at: licenserenewal.created_at,
          approved_on: licenserenewal.approved_on,
          rejected_on: licenserenewal.rejected_on,
          status: licenserenewal.status,
          file_name:
            licenserenewal.license_grace_period_file?.split("/").pop() ?? "",
          file_path: licenserenewal.license_grace_period_file ?? "",
          partner_uuid: licenserenewal.partner_uuid,
          uuid: licenserenewal.uuid,
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    if (
      selectedRequest &&
      selectedRequest.request_type == request_types.LICENSE_RENEWAL
    ) {
      setSelectedRequest(requests.find((r) => r.id == selectedRequest.id));
    }

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("Requests", requests);
    clearErrors();
    setRequests(requests);
    setFilteredRequests(requests);
    setlicenseRenewals(get_license_renewal_response.licenserenewals);
    clearErrors();
    setFetchingLicenseRenewals(false);
  };

  const get_shortcodes = async () => {
    if (fetchingShortcodes) return;
    setFetchingShortcodes(true);

    get_all_partner_shortcodes_response = await getAllPartnersShortCodes();
    // console.log("All get_all_partner_shortcodes_response", get_all_partner_shortcodes_response);

    if (get_all_partner_shortcodes_response.error) {
      setError({ error: get_all_partner_shortcodes_response.error });
      return;
    }

    for (const shortcode of get_all_partner_shortcodes_response.shortcodes) {
      if (!requests.find((request) => request.uuid == shortcode.user_uuid)) {
        requests.push({
          company: shortcode.company_name ?? "Company",
          email: shortcode.email ?? "email@email.com",
          request_type: request_types.SHORTCODES,
          request_id: shortcode.request_id,
          created_at: shortcode.created_at,
          //approved_on: shortcode.approved_on,
         // rejected_on: shortcode.rejected_on,
          status: shortcode.status,
          // file_name:
          //   graceperiod.license_grace_period_file?.split("/").pop() ?? "",
          // file_path: graceperiod.license_grace_period_file ?? "",
          partner_uuid: shortcode.partner_uuid,
          uuid: shortcode.user_uuid,
         
        });
      }
    }

    requests.sort((a, b) =>
      a.request_date > b.request_date
        ? -1
        : a.request_date < b.request_date
        ? 1
        : 0
    );

    if (
      selectedRequest &&
      selectedRequest.request_type == request_types.SHORTCODES
    ) {
      setSelectedRequest(requests.find((r) => r.id == selectedRequest.id));
    }

    setRequests(requests);
    setFilteredRequests(requests);

    console.log("SHORTCODES Requests", requests);
    clearErrors();
    setRequests(requests);
    setFilteredRequests(requests);
    setShortcodes(get_all_partner_shortcodes_response.shortcodes);
    clearErrors();
    setFetchingShortcodes(false);
  };

  const approveRequest = async () => {
    //TODO
    clearErrors();

    approvalData.status = "approved";

    if (approving) return;
    setApproving(true);

    approvalData.partner_uuid = selectedRequest.partner_uuid;

    switch (selectedRequest?.request_type) {
      case request_types.BOARD_RESOLUTION:
        approvalData.board_document_uuid = selectedRequest.uuid;
        approvalData.delegate_email = selectedRequest.email;
        approve_request_response = await approveOrRejectBrd(approvalData);
        break;
      case request_types.SUPPLIER_QUESTION:
        approve_request_response = await approveOrRejectQuestionnaire(
          approvalData
        );
        break;
    }

    setApproving(false);

    if (approve_request_response.message) {
      //display success
      setSuccessMessage(approve_request_response.message);
      //set selected brd to null
      setSuccessToast(true);
    } else {
      //set errors
      setError({ error: approve_request_response.error });
    }

    if (approve_request_response.error)
      setError({ error: approve_request_response.error });
  };

  const rejectRequest = async (reason) => {
    //TODO
    clearErrors();

    approvalData.status = "rejected";

    // console.log("RejectData", reason);

    if (approving) return;
    setApproving(true);

    approvalData.partner_uuid = selectedRequest.partner_uuid;

    switch (selectedRequest?.request_type) {
      case request_types.BOARD_RESOLUTION:
        approvalData.feedback = reason.rejection_reason;
        approvalData.board_document_uuid = selectedRequest.uuid;
        approvalData.delegate_email = selectedRequest.email;
        reject_request_response = await approveOrRejectBrd(approvalData);
        break;
      case request_types.SUPPLIER_QUESTION:
        console.log(
          "reason.rejection_reason before call",
          reason.rejection_reason
        );
        if (!reason.rejection_reason || reason.rejection_reason == "Others") {
          if (typedReason.trim() != "") {
            approvalData.rejection_reason = typedReason;
          } else {
            setError({ error: "Please enter a valid rejection reason" });
            return;
          }
        } else {
          approvalData.rejection_reason = reason.rejection_reason;
        }
        reject_request_response = await approveOrRejectQuestionnaire(
          approvalData
        );
        break;
    }

    setApproving(false);

    if (reject_request_response.message) {
      //display success
      setSuccessMessage(reject_request_response.message);
      //set selected brd to null
      setSuccessToast(true);
    } else {
      //set errors
      setError({ error: reject_request_response.error });
    }

    if (reject_request_response.error)
      setError({ error: reject_request_response.error });
  };

  const cancel = () => {
    setApprove(false);
    setReject(false);
  };

  const handleChange = (e) => {
    setTypedReason(e.target.value);
    console.log("TYped reason", typedReason);
  };

  const handleFormChange = (e) => {
    const field = e.target.id;
    setData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    setProcessing(false);
    clearErrors();
    get_brds();
    get_questionnaires();
    get_revenue_share();
    get_change_order();
    get_grace_period();
    get_license_renewal();
    get_ips();
    get_shortcodes();
  }, []);

  useEffect(() => {}, [filteredRequests]);

  const [displayShortCodeAlert, setDisplayShortCodeAlert] = useState(false);

  return (
    <>
      <div id="approvals" className="flex flex-cols pb-12 min-h-screen">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Requests</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {filteredRequests?.length}
              </span>
            </div>
          </div>

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}
              {/*
             <ShortCodeAlert
                displayShortCodeAlert={() => setDisplayShortCodeAlert(true)}
              />
             */}
          
            <>
             
              <Filter
                list={requests}
                filterAction={setFilteredRequests}
                keysArray={["company", "email", "request_type", "request_id"]}
                statusArray={["approved", "rejected", "not_approved"]}
              />

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

                    {pagedRequests &&
                      pagedRequests.length > 0 &&
                      pagedRequests.map((request) => (
                        <tr
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                          key={request.uuid}
                        >
                          {/* Company */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center font-bold space-x-4">
                                <CompanyInitial
                                  initials={getInitials(
                                    request.company
                                  ).toUpperCase()}
                                  email={request.email}
                                />
                                <div className="flex flex-col">
                                  <p>{request.company}</p>
                                  {request.email && (
                                    <span className="text-sm text-gray-500">
                                      {request.email}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Request type */}
                          <td>
                            <div className="flex gap-0 flex-col">
                              <span className="text-white text-sm">
                                {request.request_type}
                              </span>
                            </div>
                          </td>
                          {/* Request ID */}
                          <td>
                            <div className="flex gap-0 flex-col">
                              <span className="text-white">
                                {request.request_id}
                              </span>
                            </div>
                          </td>
                          {/* Request Date */}
                          <td>
                            <div>
                              {moment(request.created_at ?? moment()).format(
                                "MMM YYYY"
                              )}
                            </div>
                          </td>
                          {/* Status */}
                          <td>
                            <div
                              className={` py-1 px-2 rounded text-white inline-flex text-sm ${
                                request.status.toLowerCase() == "rejected"
                                  ? "bg-red-700/50"
                                  : request.status.toLowerCase() == "approved"
                                  ? "bg-green-900/50"
                                  : "bg-white/20"
                              }`}
                            >
                              {capitalizeFirst(
                                request.status.replace("_", " ")
                              )}
                            </div>
                          </td>
                          {/* Action */}
                          <td>
                            <span
                              onClick={() => {
                                setSelectedRequest(request);
                                open(request);
                                console.log("selectedRequest", request);
                              }}
                              className="text-yellow-600 cursor-pointer"
                            >
                              Review
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {filteredRequests.length == 0 && pagedRequests.length == 0 ? (
                  <EmptyTable list={"Requests"} />
                ) : (
                  <TablePager
                    list={filteredRequests}
                    action={setPagedRequests}
                  />
                )}
              </div>
            </>
        
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
          {(approve || reject) && (
            <div
              className={`absolute left-0 top-0 w-full p-3 border border-[#212121] rounded-[8px] z-10 bg-[#313131]`}
            >
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
                  othersAction={setShowOthersTextbox}
                />
              )}
            </div>
          )}

          <div className="">
            <p className="text-white">{selectedRequest?.request_type} AAA</p>
            <div
              className="border-1 border-white/10 rounded-2xl px-3 py-1 text-white/70 inline-flex items-center text-[11px] cursor-pointer"
              onClick={() => setIsPreviewingDoc(!is_previewing_doc)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              &nbsp; {selectedRequest?.file_name}
            </div>
          </div>

          <div className="flex h-full items-center px-2 w-32 ml-auto">
            {selectedRequest?.status != "approved" && (
              <>
                <div
                  className="w-[36px] h-[36px] cursor-pointer text-red-600 hover:text-red-600/50 rounded-full border-solid border-2 border-red-600 hover:border-red-600/50 flex justify-center items-center"
                  onClick={() => setReject(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>

                <div
                  className="w-[36px] h-[36px] cursor-pointer text-green-600 hover:text-green-600/50 rounded-full border-solid border-2 border-green-600 hover:border-green-600/50 flex justify-center items-center ml-4"
                  onClick={() => setApprove(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>

        {showOthersTextbox && (
          <div className="border-1 border-white/20 m-4 ml-8 rounded-xl flex flex-col relative">
            <textarea
              onKeyUp={(e) => handleChange(e)}
              onBlur={(e) => handleChange(e)}
              className="rounded p-4 mb-4 border-1 border-white/40 bg-white/20 text-white m-4"
              rows="6"
            ></textarea>

            <div className="border-t border-white/40 py-2 px-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="orange"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>

              <span className="text-sm text-white/80 ml-2">
                Partner will be notified
              </span>

              <div className=" ml-auto">
                {!approving && (
                  <>
                    <span
                      onClick={() => {
                        setShowOthersTextbox(false);
                        cancel();
                        setTypedReason("");
                      }}
                      className="border-1 border-white/20 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer"
                    >
                      Cancel
                    </span>

                    <span
                      onClick={(reason) => rejectRequest(reason)}
                      className="border-1 border-red-200 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer ml-2"
                    >
                      Decline
                    </span>
                  </>
                )}
                {approving && (
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                )}
              </div>
            </div>
          </div>
        )}

        {errors && errors["error"] && (
          <div className="mb-6 ml-8">
            <FormErrors error={errors["error"]} />
          </div>
        )}
      </ComplianceDrawer>

      {
        selectedRequest?.request_type == request_types.REVENUE_SHARE && 

        <RevenueShareDrawer request={selectedRequest} openDrawer={openRevenueShareDrawer} 
        closeAction={() => setOpenRevenueShareDrawer(false)}/>
      }

      {
        selectedRequest?.request_type == request_types.CHANGE_ORDER && 

        <ChangeOrderDrawer request={selectedRequest} openDrawer={openChangeOrderDrawer} 
        closeAction={() => setOpenChangeOrderDrawer(false)} refresh={() => get_change_order()}/>
      }

       {
        selectedRequest?.request_type == request_types.VAS_CLEARANCE && 

        <IPDrawer request={selectedRequest} openDrawer={openIPDrawer} 
        closeAction={() => setOpenIPDrawer(false)} refresh={() => get_ips()}/>
      }

      {selectedRequest?.request_type == request_types.GRACE_PERIOD &&
        // check this out on dev
        gracePeriodFlyout && (
          <GracePeriodAdminFlyOut
            closeGracePeriodFlyOut={() => setGracePeriodFlyout(false)}
            selectedRequest={selectedRequest}
            successAction={successAction}
          />
        )}

      {selectedRequest?.request_type == request_types.LICENSE_RENEWAL &&
        // check this out on dev
        licenseRenewalFlyout && (
          <LicenseRenewalAdminFlyout
            closeLicenseRenewalFlyout={() => setLicenseRenewalFlyout(false)}
            selectedRequest={selectedRequest}
            successAction={successAction}
          />
        )}

      <Success
        message={successMessage}
        visible={successToast}
        action={successAction}
      />
    </>
  );
}
