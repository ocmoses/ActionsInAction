import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import TextInput from "@/app/components/form/TextInput";
import usePartners from "@/hooks/usePartners";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

import { apikey } from "@/app/modules/constants";

import FilterTag, {PartnerFilterCheck, PartnerFilterTitle,} from "@/app/components/dashboard/partners/requests/FilteringComponents";
import {getInitials,ellipsify,capitalizeFirst,} from "@/app/modules/utilities";
import {CompanyInitial, TailSpinPreloader,RequestApproveBtn,RequestRejectBtn,} from "@/app/components/Icons";
import FileInputWrapper from "@/app/components/form/FileInputWrapper";

import AggregatorComplianceModal from "@/app/components/dashboard/partners/requests/AggregatorCompliance";
import IntelectualPropertiesModal from "@/app/components/dashboard/partners/requests/IntelectualPropertiesDetail";
import RemoteEndpoints from "@/app/modules/endpoints";
import { NewSuccess } from "@/app/components/toasts/Success";

/////////////////////////////////////////////////////////////////////////////////////
function actionDate(targetDate) {
  const originalDate = new Date(targetDate);
  const formattedDate = originalDate.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}
/////////////////////////////////////////////////////////////////////////////////////
export default function RequestPage({realTimePageReloader}) {
  const { getAggregatorRequest } = usePartners();
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [requestFlyout, setRequestFlyout] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState();
  const [approveRejectRequestFlyout, setApproveRejectRequestFlyout] =
    useState(false);

  const statusColour = {
    pending: "bg-[#353535]",
    declined: "bg-[#AD2B19]",
    inprogress: "bg-[#E2B204]",
    completed: "bg-[#216E4E]",
  };

  let getAggregatorRequestResponse = null;
  const get_aggregator_request = async () => {
    try {
      getAggregatorRequestResponse = await getAggregatorRequest();
      let getAggregatorRequest_response = getAggregatorRequestResponse.result;
      if (getAggregatorRequest_response.data == null) {
        setError(getAggregatorRequest_response.message);
      } else {
        console.log(
          "getAggregatorRequest_response.data",
          getAggregatorRequest_response.data
        );
        setSelectedRequest(getAggregatorRequest_response.data);
        setFilteredData(getAggregatorRequest_response.data);
      }
    } catch (error) {
      // console.log('error', error);
      // setError(error.data.data.message);
    }
  };

  useEffect(() => {
    get_aggregator_request();
  }, []);

  const viewVasPartnersDetail = async ({ eachRequest }) => {
    setPartnerDetails(eachRequest);
    setApproveRejectRequestFlyout(true);
  };

  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
  const successAction = (message, alert) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      alert: alert,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
        alert: false,
        status: false,
      }));
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  const [sendAction, setSendAction] = useState(false);
  const [serviceUuid, setServiceUuid] = useState(null);
  let [formData, setFormData] = useState({
    service_uuid: "",
  });

  const _approveRequest = (eachRequest) => {
    formData.service_uuid = eachRequest.service_uuid;
    setServiceUuid(eachRequest.service_uuid);
    let url = RemoteEndpoints.APPROVE_VAS_PARTNERS;
    approveRejectAction(url);
  };

  const _rejectRequest = (eachRequest) => {
    formData.service_uuid = eachRequest.service_uuid;
    setServiceUuid(eachRequest.service_uuid);
    let url = RemoteEndpoints.REJECT_VAS_PARTNERS;
    approveRejectAction(url);
  };

  const approveRejectAction = async (url) => {
    setApproveRejectRequestFlyout(false);
    try {
      setSendAction(true);
      const response = await axios.post(url, formData, {
        headers: {
          apikey: apikey,
          //Authorization: `Bearer ${states.admins.token}`,
        },
      });
      setSendAction(false);
      successAction(response.data.message, true);
      get_aggregator_request();
      window.location.reload();
    } catch (err) {
      setSendAction(false);
      successAction(err.response.data.data.message, false);
    }
  };

  const realTimeReloadRequestFlyout = () => {
    setRequestFlyout(false);
    setTimeout(() => {
      setRequestFlyout(true);
    }, 2000);
  };

  return (
    <>
    <div id="reports" className="flex flex-cols pb-12 min-h-screen">
      <div className="w-full pt-[72px] px-12 mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
            <h2>Requests</h2>
            <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
              {selectedRequest?.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <FilteringFlyout />
          </div>
          {error && <div className=" text-red-600">{error}</div>}
          <div className="rounded-[10px] border-1 border-white/20 overflow-x-auto">
            <table className="table w-full transparent rounded-[10px]">
              <tbody>
                {/* head */}
                <tr className="bg-white/20">
                  <th>
                    <span className="text-[13px]">Company</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Request ID</span>
                  </th>
                  <th>
                    <span className="text-[13px]">Phone</span>
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

                {selectedRequest &&
                  selectedRequest.length > 0 &&
                  selectedRequest.slice(0, 5).map((eachRequest) => (
                    <tr
                      className="border-b border-b-white/10 bg-transparent  hover:bg-white/5 cursor-pointer group/request-1"
                      key={eachRequest.service_uuid}
                    >
                      <td
                        onClick={() => viewVasPartnersDetail({ eachRequest })}
                      >
                        <div className="flex items-center font-bold space-x-4">
                          <CompanyInitial
                            initials={getInitials(
                              eachRequest.vas_partner
                            ).toUpperCase()}
                          />
                          <div className="flex flex-col">
                            <p>{eachRequest.vas_partner}</p>
                            <span className="text-sm text-gray-500">
                              {eachRequest.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td
                        onClick={() => viewVasPartnersDetail({ eachRequest })}
                      >
                        {eachRequest.request_id}
                      </td>

                      <td
                        onClick={() => viewVasPartnersDetail({ eachRequest })}
                      >
                        {eachRequest.telephone}
                      </td>

                      <td
                        onClick={() => viewVasPartnersDetail({ eachRequest })}
                      >
                        {actionDate(eachRequest.service_submitted_on)}
                      </td>

                      <td
                        onClick={() => viewVasPartnersDetail({ eachRequest })}
                      >
                        <div
                          className={`py-1 px-2 rounded text-white inline-flex text-sm ${
                            statusColour[eachRequest.status.replace("-", "")]
                          }`}
                        >
                          {capitalizeFirst(eachRequest.status)}
                        </div>
                      </td>

                      <td>
                        {sendAction &&
                        serviceUuid === eachRequest.service_uuid ? (
                          <TailSpinPreloader
                            width={40}
                            height={40}
                            fill="#efb703"
                          />
                        ) : (
                          <div className="w-[120px] h-[50px] bg-transparent mt-2">
                            {eachRequest.status === "pending" && (
                              <>
                                <div className="hidden  group-hover/request-1:flex gap-3">
                                  <div
                                    onClick={() =>
                                      _rejectRequest(eachRequest)
                                    }
                                  >
                                    <RequestRejectBtn />
                                  </div>

                                  <div
                                    onClick={() =>
                                      _approveRequest(eachRequest)
                                    }
                                  >
                                    <RequestApproveBtn />
                                  </div>
                                </div>
                              </>
                            )}

                            {(eachRequest.status === "in-progress" ||
                              eachRequest.status === "completed") && (
                              <div className="flex gap-3">
                                <button
                                  onClick={() => {
                                    setRequestFlyout(true);
                                    setPartnerDetails(eachRequest);
                                  }}
                                  className="text-black font-bold rounded-full py-2 px-6 bg-yellow-600 text-sm cursor-pointer whitespace-nowrap hover:text-white flex"
                                >
                                  {eachRequest.onboarding_compliance_status ===
                                  null ? (
                                    <span>Finish up (0/2)</span>
                                  ) : (
                                    
                                    <>
                                      {eachRequest.onboarding_ip_status ===
                                      null ? (
                                        <span>Finish up (1/2)</span>
                                      ) : (
                                        <span>Finish up (2/2)</span>
                                      )}
                                    </>
                                  )}

                                  <svg
                                    className="my-1 mx-2"
                                    width="6"
                                    height="10"
                                    viewBox="0 0 6 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M5.49605 4.16252C5.65228 4.31879 5.74004 4.53071 5.74004 4.75168C5.74004 4.97265 5.65228 5.18458 5.49605 5.34085L1.66855 9.16835C1.51331 9.32049 1.3043 9.40521 1.08695 9.40411C0.869589 9.40302 0.661447 9.31618 0.50775 9.16249C0.354053 9.00879 0.267222 8.80065 0.266124 8.58329C0.265026 8.36593 0.349751 8.15693 0.501887 8.00168L3.75189 4.75168L0.501887 1.50168C0.349751 1.34644 0.265026 1.13743 0.266124 0.920076C0.267222 0.702719 0.354053 0.494577 0.50775 0.34088C0.661447 0.187183 0.869589 0.100351 1.08695 0.0992537C1.3043 0.0981559 1.51331 0.182881 1.66855 0.335017L5.49605 4.16252Z"
                                      fill="#1C1C1C"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {selectedRequest?.length == 0 ? (
              <EmptyTable list={"Record"} />
            ) : (
              <TablePager list={selectedRequest} action={setFilteredData} />
            )}
          </div>
        </div>
      </div>
    </div>

    {approveRejectRequestFlyout && (
      <ApproveRejectRequestModal
        closeApproveRejectRequestFlyout={() =>
          setApproveRejectRequestFlyout(false)
        }
        partnerDetails={partnerDetails}
        approveRequest={_approveRequest}
        rejectRequest={_rejectRequest}
        successAction={successAction}
        setRequestFlyout={setRequestFlyout}
      />
    )}

    {requestFlyout && (
      <RequestFinishUpModal
        realTimePageReloader={realTimePageReloader}
        closeRequestFlyout={() => setRequestFlyout(false)}
        realTimeReloadRequestFlyout={realTimeReloadRequestFlyout}
        partnerDetails={partnerDetails}
      />
    )}

    {showSuccessToast.status && (
      <NewSuccess
        message={showSuccessToast.message}
        alert={showSuccessToast.alert}
      />
    )}
  </>
  );
}

export const FilteringFlyout = () => {
  ///////////////get today's date////////////////////////////////////////////
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(today.getDate()).padStart(2, "0");
  const todaysDate = `${year}-${month}-${day}`;
  ///////////////end of get today's date////////////////////////////////////////////

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(todaysDate);

  ////to open filter/close modal
  const [filterModal, setFilterModal] = useState(false);
  //// to apply filter search
  const filterRef = useRef(null);
  const [search, setSearch] = useState({
    date: true,
    category: false,
    status: false,
  });
  useEffect(() => {
    ////// bring out search modals
    document.addEventListener(
      "click",
      function (e) {
        if (filterRef.current && !filterRef.current.contains(e.target)) {
          setFilterModal(false);
        }
      },
      true
    );
  }, []);

  const alertYes = () => {
    alert("YES");
  };

  return (
    <>
      <div
        className="flex items-center gap-2 rounded-full p-3 px-6 hover:bg-white/20 cursor-pointer border border-white/20"
        onClick={() => setFilterModal(!filterModal)}
      >
        <svg
          className="w-4 h-4"
          fill="white"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30 6.749h-28c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM24 14.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM19 22.75h-6.053c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h6.053c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"></path>
        </svg>
        <span className="text-[13px] text-white">Add Filter</span>
      </div>{" "}
      <div className="text-gray-700 border-l-1 border-white/10 p-1 px-3 relative right-0 flex">
        {/* <FilterTag
            message="active"
            action={alertYes}
          /> */}
        <span className="text-sm text-gray-500 pt-2">No filters applied</span>
      </div>
      <div
        ref={filterRef}
        className={`border-1 border-white/20 w-[650px] absolute mt-[48px] z-[9999] bg-[#121212] rounded-xl shadow-xl animate-[slide-up-fade_1s_ease-in-out] ${
          filterModal ? "block" : "hidden"
        }`}
      >
        <div className="flex">
          <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col gap-1">
            {/* ///////search.date/////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div
              className={`${
                search.date ? "bg-white/20 text-white" : "text-gray-400"
              }
                  rounded-[5px] py-3 px-4  flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
              onClick={() => {
                if (!search.date) {
                  setSearch({
                    ...search,
                    date: true,
                    category: false,
                    status: false,
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 4V3.006C14 2.45 13.55 2 12.994 2H11V3H10V2H6V3H5V2H3.006C2.45 2 2 2.45 2 3.006V12.994C2 13.55 2.45 14 3.006 14H12.994C13.55 14 14 13.55 14 12.994V5H2V4H14ZM11 1H12.994C14.102 1 15 1.897 15 3.006V12.994C15.0001 13.2575 14.9483 13.5184 14.8476 13.7618C14.7468 14.0053 14.599 14.2264 14.4127 14.4127C14.2264 14.599 14.0053 14.7468 13.7618 14.8476C13.5184 14.9483 13.2575 15.0001 12.994 15H3.006C2.74253 15.0001 2.48162 14.9483 2.23818 14.8476C1.99474 14.7468 1.77355 14.599 1.58725 14.4127C1.40095 14.2264 1.25319 14.0053 1.15243 13.7618C1.05167 13.5184 0.999869 13.2575 1 12.994V3.006C1 1.898 1.897 1 3.006 1H5V0H6V1H10V0H11V1ZM4 7H6V8H4V7ZM7 7H9V8H7V7ZM10 7H12V8H10V7ZM4 9H6V10H4V9ZM7 9H9V10H7V9ZM10 9H12V10H10V9ZM4 11H6V12H4V11ZM7 11H9V12H7V11ZM10 11H12V12H10V11Z"
                  fill="#888888"
                />
              </svg>
              &nbsp; &nbsp;
              <span className="flex-1">Date</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* ///////search.category/////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div
              className={`${
                search.category ? "bg-white/20 text-white" : "text-gray-400"
              }
                  rounded-[5px] py-3 px-4 flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
              onClick={() => {
                if (!search.category) {
                  setSearch({
                    ...search,
                    date: false,
                    category: true,
                    status: false,
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M15.3334 11.94C15.3467 12.44 15.2134 12.9133 14.9734 13.32C14.84 13.56 14.66 13.78 14.46 13.96C14 14.3867 13.3934 14.6467 12.72 14.6667C11.7467 14.6867 10.8867 14.1867 10.4134 13.42C10.16 13.0267 10.0067 12.5533 10 12.0533C9.98003 11.2133 10.3534 10.4533 10.9534 9.95333C11.4067 9.58 11.98 9.34667 12.6067 9.33334C14.08 9.30001 15.3 10.4667 15.3334 11.94Z"
                  stroke="#888888"
                  strokeWidth="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6267 12.02L12.3 12.66L13.6934 11.3133"
                  stroke="#888888"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.1134 4.96002L8.00006 8.36668L13.8467 4.98"
                  stroke="#888888"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14.4067V8.36002"
                  stroke="#888888"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.4067 6.11335V9.8867C14.4067 9.92003 14.4067 9.94667 14.4 9.98C13.9334 9.57334 13.3334 9.33336 12.6667 9.33336C12.04 9.33336 11.46 9.55336 11 9.92003C10.3867 10.4067 10 11.16 10 12C10 12.5 10.14 12.9734 10.3867 13.3734C10.4467 13.48 10.52 13.58 10.6 13.6734L9.38005 14.3467C8.62005 14.7734 7.38004 14.7734 6.62004 14.3467L3.06004 12.3734C2.25337 11.9267 1.59338 10.8067 1.59338 9.8867V6.11335C1.59338 5.19335 2.25337 4.07336 3.06004 3.62669L6.62004 1.65334C7.38004 1.22668 8.62005 1.22668 9.38005 1.65334L12.94 3.62669C13.7467 4.07336 14.4067 5.19335 14.4067 6.11335Z"
                  stroke="#888888"
                  strokeWidth="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              &nbsp; &nbsp;
              <span className="flex-1">Category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            {/* ///////search.status/////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div
              className={`${
                search.status ? "bg-white/20 text-white" : "text-gray-400"
              }
                  rounded-[5px] py-3 px-4  flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
              onClick={() => {
                if (!search.status) {
                  setSearch({
                    ...search,
                    date: false,
                    category: false,
                    status: true,
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_7467_2654)">
                  <path
                    d="M6.25466 14.9697L0.996535 9.71156C0.681335 9.39636 0.599855 9.24924 0.54625 9.07239C0.492645 8.89553 0.492645 8.71466 0.54625 8.5378C0.599856 8.36094 0.681336 8.21382 0.996535 7.89862L7.43011 1.46504C7.61269 1.28246 7.68246 1.22592 7.7686 1.17205C7.85473 1.11818 7.94233 1.0819 8.04132 1.05908C8.14032 1.03627 8.22964 1.02692 8.48784 1.02692L13.6606 1.02692C14.1056 1.02692 14.267 1.07313 14.4298 1.15998C14.5926 1.24683 14.7204 1.37431 14.8077 1.53685C14.895 1.69938 14.9417 1.86063 14.943 2.30565L14.958 7.45589C14.9588 7.71475 14.9496 7.80437 14.9269 7.90372C14.9042 8.00307 14.8679 8.09101 14.814 8.17747C14.76 8.26392 14.7034 8.33394 14.5203 8.51699L8.0676 14.9697C7.7524 15.2849 7.60529 15.3664 7.42843 15.42C7.25157 15.4736 7.0707 15.4736 6.89384 15.42C6.71698 15.3664 6.56986 15.2849 6.25466 14.9697ZM7.3605 14.2626L13.8132 7.80988C13.9054 7.71769 13.9393 7.6819 13.9548 7.66289C13.9572 7.63849 13.9584 7.58918 13.958 7.4588L13.943 2.30856C13.9425 2.12775 13.9401 2.06363 13.9348 2.03431C13.9055 2.02913 13.8414 2.02692 13.6606 2.02692H8.48784C8.35764 2.02692 8.30839 2.02822 8.28402 2.03069C8.26503 2.04618 8.22929 2.08008 8.13722 2.17215L1.70364 8.60573C1.57566 8.73371 1.53183 8.78067 1.51475 8.80509C1.53183 8.82952 1.57566 8.87647 1.70364 9.00446L6.96177 14.2626C7.08975 14.3906 7.13671 14.4344 7.16113 14.4515C7.18556 14.4344 7.23251 14.3906 7.3605 14.2626ZM12.3327 3.6556C13.1138 4.43665 13.1138 5.70298 12.3327 6.48402C11.5517 7.26507 10.2853 7.26507 9.50428 6.48402C8.72323 5.70298 8.72323 4.43665 9.50428 3.6556C10.2853 2.87455 11.5517 2.87455 12.3327 3.6556ZM11.6256 4.3627C11.2351 3.97218 10.6019 3.97218 10.2114 4.3627C9.82086 4.75323 9.82086 5.38639 10.2114 5.77692C10.6019 6.16744 11.2351 6.16744 11.6256 5.77692C12.0161 5.38639 12.0161 4.75323 11.6256 4.3627ZM6.80758 11.28L4.68626 9.15865C4.491 8.96338 4.491 8.6468 4.68626 8.45154C4.88152 8.25628 5.1981 8.25628 5.39337 8.45154L7.51469 10.5729C7.70995 10.7681 7.70995 11.0847 7.51469 11.28C7.31942 11.4752 7.00284 11.4752 6.80758 11.28ZM8.22179 9.86575L6.10047 7.74443C5.90521 7.54917 5.90521 7.23259 6.10047 7.03733C6.29573 6.84206 6.61232 6.84206 6.80758 7.03733L8.9289 9.15865C9.12416 9.35391 9.12416 9.67049 8.9289 9.86575C8.73364 10.061 8.41706 10.061 8.22179 9.86575Z"
                    fill="#888888"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7467_2654">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              &nbsp; &nbsp;
              <span className="flex-1">Status</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 p-4 min-h-[300px] bg-white/5">
            {search.date && (
              <div className="flex flex-col space-y-4 animate-[slide-left_1s_ease-in-out]">
                <div className=" flex flex-row justify-between gap-2 border-b-1 border-white/20 text-white ">
                  <TextInput
                    label="From"
                    type="date"
                    value={startDate}
                    onChange=""
                  />

                  <TextInput
                    label="To"
                    type="date"
                    value={endDate}
                    onChange=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-400">Show results for</h3>
                  <PartnerFilterTitle title="Last 30 Days" action="" />
                  <PartnerFilterTitle title="This Month" action="" />
                  <PartnerFilterTitle title="This Year" action="" />
                  <PartnerFilterTitle title="Last 1 Year" action="" />
                  <PartnerFilterTitle title="All Time" action="" />
                </div>
              </div>
            )}

            {search.category && (
              <div className="flex flex-col space-y-4 animate-[slide-left_1s_ease-in-out]">
                <PartnerFilterCheck
                  title="Rich Media Services"
                  summary="Digital Services players, offering value-added services."
                  value="Rich Media Services"
                  checked=""
                  onChange=""
                />
                <PartnerFilterCheck
                  title="Value Added Services"
                  summary="Non-core services or features that are beyond the standard voice calls."
                  value="Value Added Services"
                  checked=""
                  onChange=""
                />
                <PartnerFilterCheck
                  title="Aggregator"
                  summary="Provide a concentration point to limit the number of devices that will."
                  value="Aggregator"
                  checked=""
                  onChange=""
                />
                <PartnerFilterCheck
                  title="Marketplace"
                  summary="Providers who offer apps developed specifically for easy, convenient shopping"
                  value="Marketplace"
                  checked=""
                  onChange=""
                />
              </div>
            )}

            {search.status && (
              <div className="flex flex-col space-y-4 animate-[slide-left_1s_ease-in-out]">
                <PartnerFilterCheck
                  title="Active"
                  summary="Contract is still active"
                  value="active"
                  checked=""
                  onChange=""
                />
                <PartnerFilterCheck
                  title="Expired"
                  summary="Contract has expired"
                  value="expired"
                  checked=""
                  onChange=""
                />

                <PartnerFilterCheck
                  title="In review"
                  summary="Contract has not started"
                  value="in_review"
                  checked=""
                  onChange=""
                />
                <PartnerFilterCheck
                  title="New"
                  summary="Just Registered"
                  value="new"
                  checked=""
                  onChange=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const RequestFinishUpModal = ({realTimePageReloader, closeRequestFlyout,realTimeReloadRequestFlyout,partnerDetails,}) => {

  const [showSuccessToast, setShowSuccessToast] = useState({
    message: "",
    alert: false,
    status: false,
  });
  const successAction = (message, alert) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      alert: alert,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
        alert: false,
        status: false,
      }));
    }, 3000);

    return () => clearTimeout(timeoutId);
  };
  const [sendAction, setSendAction] = useState(false);
  const { getAggregatorVasPartnerDetails } = usePartners();
  const [vasPartnerResponse, setVasPartnerResponse] = useState();
  let getAggregatorVasPartnerDetailsResponse = null;
  const get_aggregator_vas_partner_details = async () => {
    setSendAction(true);
    try {
      getAggregatorVasPartnerDetailsResponse =
        await getAggregatorVasPartnerDetails(
          partnerDetails?.aggregator_uuid,
          partnerDetails?.vas_partner_uuid
        );
      let vas_partner_response =
        getAggregatorVasPartnerDetailsResponse.result[0];
        console.log('vas_partner_response', vas_partner_response);
        setVasPartnerResponse(vas_partner_response);
        setSendAction(false);
    } catch (err) {
      setSendAction(false);
      console.log("error", err);
      successAction('Network Error!', false);
    }
  };
  useEffect(() => {
    get_aggregator_vas_partner_details();
  }, []);

  const [aggregatorComplianceFormFlyout, setAggregatorComplianceFormFlyout] =
    useState(false);
  const [intelectualPropertiesFlyout, setIntelectualPropertiesFlyout] =
    useState(false);
  return (
    <>
      <main
        id="modal"
        className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "modal" && realTimePageReloader();
        }}
      >
        <div className="border-1 border-gray-700 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[550px] justify-center items-center">
          <CompanyInitial
            initials={getInitials(partnerDetails.service_name).toUpperCase()}
            className="mt-[-20px]"
          />
          <div className="py-8 px-8 flex flex-col gap-4 min-w-full">
            <div className="text-center text-white/60">
              <h2 className=" text-[#FFF] font-bold text-[20px]">
                {partnerDetails.service_name}
              </h2>
              {partnerDetails.email}
            </div>
            {sendAction ? (
              <div className="w-[50px] m-auto">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            ) : (
              <>
                <FileInputWrapper>
                  <div className="py-[24px] px-[16px] w-full rounded-[10px]">
                    <div
                      className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                    >
                      <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px]  z-1">
                          <svg
                            width="40"
                            height="41"
                            viewBox="0 0 40 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M31.2498 8.83333V18.8333C31.2498 19.5233 30.6898 20.0833 29.9998 20.0833C29.3098 20.0833 28.7498 19.5233 28.7498 18.8333V8.83333C28.7498 7.685 27.8148 6.75 26.6665 6.75H9.99984C8.8515 6.75 7.9165 7.685 7.9165 8.83333V32.1667C7.9165 33.315 8.8515 34.25 9.99984 34.25H26.6665C27.3565 34.25 27.9165 34.81 27.9165 35.5C27.9165 36.19 27.3565 36.75 26.6665 36.75H9.99984C7.4715 36.75 5.4165 34.695 5.4165 32.1667V8.83333C5.4165 6.305 7.4715 4.25 9.99984 4.25H26.6665C29.1948 4.25 31.2498 6.305 31.2498 8.83333ZM26.2498 12.1667C26.2498 11.4767 25.6898 10.9167 24.9998 10.9167H11.6665C10.9765 10.9167 10.4165 11.4767 10.4165 12.1667C10.4165 12.8567 10.9765 13.4167 11.6665 13.4167H24.9998C25.6898 13.4167 26.2498 12.8567 26.2498 12.1667ZM19.5832 17.1667C19.5832 16.4767 19.0232 15.9167 18.3332 15.9167H11.6665C10.9765 15.9167 10.4165 16.4767 10.4165 17.1667C10.4165 17.8567 10.9765 18.4167 11.6665 18.4167H18.3332C19.0232 18.4167 19.5832 17.8567 19.5832 17.1667ZM11.6665 20.9167C10.9765 20.9167 10.4165 21.4767 10.4165 22.1667C10.4165 22.8567 10.9765 23.4167 11.6665 23.4167H14.9998C15.6898 23.4167 16.2498 22.8567 16.2498 22.1667C16.2498 21.4767 15.6898 20.9167 14.9998 20.9167H11.6665Z"
                              fill="white"
                            />
                            <path
                              d="M32.375 18.9717L27.7783 17.8233C27.05 17.6417 26.2833 17.6417 25.555 17.8233L20.9583 18.9717C19.6583 19.2967 18.75 20.4617 18.75 21.8017V29.4917C18.75 31.6183 19.9317 33.53 21.8333 34.4817L24.6167 35.8733C25.2583 36.1933 25.9633 36.355 26.6667 36.355C27.37 36.355 28.075 36.1933 28.7167 35.8733L31.5 34.4817C33.4017 33.53 34.5833 31.6183 34.5833 29.4917V21.8017C34.5833 20.4617 33.675 19.2983 32.375 18.9717ZM32.0833 29.4917C32.0833 30.665 31.4317 31.72 30.3817 32.245L27.5983 33.6367C27.0133 33.93 26.3183 33.93 25.735 33.6367L22.9517 32.245C21.9017 31.72 21.25 30.665 21.25 29.4917V21.8017C21.25 21.61 21.38 21.4433 21.565 21.3967L26.1617 20.2483C26.3267 20.2067 26.4967 20.1867 26.6667 20.1867C26.8367 20.1867 27.0067 20.2067 27.1717 20.2483L31.7683 21.3967C31.9533 21.4433 32.0833 21.61 32.0833 21.8017V29.4917Z"
                              fill="#E4B809"
                            />
                          </svg>
                        </div>

                        <div className="text-[#999999]">
                          <p>
                            <span className="text-white font-mtn-bold">
                              Compliance details
                            </span>
                            <br />
                            Submit basic company details for compliance.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 justify-between items-end" >
                        {vasPartnerResponse?.percentage !== 100 ? (
                          <button
                            onClick={() =>
                              setAggregatorComplianceFormFlyout(true)
                            }
                            className=" min-w-[80px] rounded-full whitespace-nowrap group-hover:border-mtn-100 bg-mtn-300 py-2 px-3 text-[11px] text-black text-center"
                          >
                            Finish up
                          </button>
                        ) : (
                          <>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.745 7.41566 18.7162 4.93859 16.8888 3.11118C15.0614 1.28378 12.5843 0.254956 10 0.25ZM14.6406 8.29375L9.14688 13.5438C9.00485 13.6774 8.81687 13.7512 8.62188 13.75C8.52657 13.7514 8.43194 13.7338 8.34344 13.6984C8.25494 13.663 8.17433 13.6105 8.10625 13.5438L5.35938 10.9188C5.28319 10.8523 5.22123 10.7711 5.17722 10.6801C5.13321 10.589 5.10806 10.49 5.10328 10.389C5.0985 10.2881 5.11419 10.1871 5.14941 10.0924C5.18463 9.99758 5.23865 9.9109 5.30822 9.83754C5.3778 9.76417 5.46149 9.70563 5.55426 9.66543C5.64703 9.62523 5.74698 9.6042 5.84809 9.60362C5.94919 9.60303 6.04938 9.62289 6.14261 9.66201C6.23585 9.70113 6.32021 9.7587 6.39063 9.83125L8.62188 11.9594L13.6094 7.20625C13.7552 7.07902 13.9446 7.01309 14.1379 7.02223C14.3312 7.03138 14.5135 7.1149 14.6467 7.25533C14.7798 7.39576 14.8536 7.58222 14.8524 7.77575C14.8513 7.96928 14.7754 8.15488 14.6406 8.29375Z"
                                fill="#4DCD97"
                              />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </FileInputWrapper>

                <FileInputWrapper>
                  <div className="py-[24px] px-[16px] w-full rounded-[10px]">
                    <div
                      className={`group cursor-pointer flex gap-2 justify-between items-center w-full relative`}
                    >
                      <div className="flex flex-row gap-3">
                        <div className="flex justify-center items-center rounded-full min-w-[55px] h-[55px]  z-1">
                          <svg
                            width="40"
                            height="41"
                            viewBox="0 0 40 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_10714_150593)">
                              <path
                                d="M11.3769 16.7448C11.3083 19.4322 12.4625 21.9493 14.5436 23.6507C15.2711 24.2454 15.6885 25.1449 15.6885 26.1183V27.1678C15.6885 27.5992 16.0383 27.949 16.4697 27.949H17.2574V31.09C17.2574 31.5214 17.6072 31.8712 18.0386 31.8712H21.9607C22.3921 31.8712 22.742 31.5214 22.742 31.09V27.949H23.5297C23.9611 27.949 24.3109 27.5992 24.3109 27.1678V26.1183C24.3109 25.1449 24.7281 24.2455 25.4555 23.6508C27.47 22.0042 28.6253 19.5692 28.6253 16.9701C28.6253 12.1656 24.7083 8.28068 19.8768 8.34521C15.2671 8.40951 11.4949 12.1335 11.3769 16.7448ZM21.1796 30.3087H18.82V27.949H21.1796V30.3087ZM19.9997 18.5421C19.5654 18.5421 19.2121 18.1887 19.2121 17.7545C19.2121 17.3201 19.5654 16.9669 19.9997 16.9669C20.4341 16.9669 20.7874 17.3201 20.7874 17.7545C20.7874 18.1887 20.4341 18.5421 19.9997 18.5421ZM27.0629 16.9701C27.0629 19.0983 26.1166 21.0924 24.4667 22.4411C22.5454 24.0119 22.7652 26.3051 22.7485 26.3865C22.066 26.3865 21.4655 26.3865 20.781 26.3865V19.9705C21.6939 19.6478 22.3499 18.7765 22.3499 17.7545C22.3499 16.4587 21.2956 15.4044 19.9997 15.4044C18.7039 15.4044 17.6496 16.4587 17.6496 17.7545C17.6496 18.7765 18.3056 19.6478 19.2185 19.9705V26.3865C18.5347 26.3865 17.9328 26.3865 17.251 26.3865C17.2316 26.2919 17.4868 24.0385 15.5325 22.4409C13.8281 21.0475 12.8827 18.9858 12.9389 16.7847C13.0346 13.0448 16.1566 9.95975 19.8988 9.90764C23.8331 9.84935 27.0629 13.0195 27.0629 16.9701Z"
                                fill="#E4B809"
                              />
                              <path
                                d="M36.2957 5.12552L20.2146 0.530056C20.0743 0.4899 19.9257 0.4899 19.7853 0.530056L3.70426 5.12552C3.36895 5.22138 3.1377 5.52787 3.1377 5.8767V18.4628C3.1377 27.8044 8.85379 36.2077 17.5904 39.617L19.7159 40.4465C19.8072 40.4821 19.9036 40.5 20 40.5C20.0963 40.5 20.1927 40.4821 20.284 40.4465L22.4096 39.617C31.1121 36.221 36.8622 27.8411 36.8622 18.4628V5.87677C36.8622 5.52795 36.631 5.22138 36.2957 5.12552ZM35.2997 18.4628C35.2997 27.2388 30.0171 34.971 21.8414 38.1615L20 38.8801L18.1585 38.1615C9.98293 34.971 4.7002 27.2388 4.7002 18.4628V6.46607L20 2.09381L35.2997 6.46607V18.4628Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_10714_150593">
                                <rect
                                  width="40"
                                  height="40"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>

                        <div className="text-[#999999]">
                          <p>
                            <span className="text-white font-mtn-bold">
                              Intellectual Property details
                            </span>
                            <br />
                            Provide details to prove intellectual property
                            ownership.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 justify-between items-end">
                      {vasPartnerResponse?.percentage !== 100 ? (
                        <div className=" min-w-[80px] rounded-full whitespace-nowrap group-hover:border-mtn-100 bg-black py-2 px-3 text-[11px] text-gray-700 text-center">
                          Start
                        </div>
                      ) : (
                        <>
                        {vasPartnerResponse?.ip_compliance_status < 100 ? (
                          <Link
                            href={`/dashboard/ip/${partnerDetails.vas_partner_uuid}`}
                          >
                            <div className=" min-w-[80px] rounded-full whitespace-nowrap group-hover:border-mtn-100 bg-mtn-500 py-2 px-3 text-[11px] text-black text-center">
                              Start
                            </div>
                          </Link>
                        ) : (
                          <>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.745 7.41566 18.7162 4.93859 16.8888 3.11118C15.0614 1.28378 12.5843 0.254956 10 0.25ZM14.6406 8.29375L9.14688 13.5438C9.00485 13.6774 8.81687 13.7512 8.62188 13.75C8.52657 13.7514 8.43194 13.7338 8.34344 13.6984C8.25494 13.663 8.17433 13.6105 8.10625 13.5438L5.35938 10.9188C5.28319 10.8523 5.22123 10.7711 5.17722 10.6801C5.13321 10.589 5.10806 10.49 5.10328 10.389C5.0985 10.2881 5.11419 10.1871 5.14941 10.0924C5.18463 9.99758 5.23865 9.9109 5.30822 9.83754C5.3778 9.76417 5.46149 9.70563 5.55426 9.66543C5.64703 9.62523 5.74698 9.6042 5.84809 9.60362C5.94919 9.60303 6.04938 9.62289 6.14261 9.66201C6.23585 9.70113 6.32021 9.7587 6.39063 9.83125L8.62188 11.9594L13.6094 7.20625C13.7552 7.07902 13.9446 7.01309 14.1379 7.02223C14.3312 7.03138 14.5135 7.1149 14.6467 7.25533C14.7798 7.39576 14.8536 7.58222 14.8524 7.77575C14.8513 7.96928 14.7754 8.15488 14.6406 8.29375Z"
                                fill="#4DCD97"
                              />
                            </svg>
                          </>
                        )}
                        </>
                      )}

                      </div>
                    </div>
                  </div>
                </FileInputWrapper>
              </>
            )}
            <div className="flex gap-2 justify-end">
              <button
                className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
                onClick={() => closeRequestFlyout()}
              >
                I'll do this later
              </button>
            </div>
          </div>
        </div>
      </main>

      {aggregatorComplianceFormFlyout && (
        <AggregatorComplianceModal
          closeAggregatorComplianceFormFlyout={() =>
            setAggregatorComplianceFormFlyout(false)
          }
          realTimeReloadRequestFlyout={realTimeReloadRequestFlyout}
          partnerDetails={partnerDetails}
        />
      )}

      {intelectualPropertiesFlyout && (
        <IntelectualPropertiesModal
          closeIntelectualPropertiesFlyout={() =>
            setIntelectualPropertiesFlyout(false)
          }
          partnerDetails={partnerDetails}
        />
      )}
      {showSuccessToast.status && (
        <NewSuccess
          message={showSuccessToast.message}
          alert={showSuccessToast.alert}
        />
      )}
    </>
  );
};

export const ApproveRejectRequestModal = ({closeApproveRejectRequestFlyout,partnerDetails,approveRequest,rejectRequest,successAction,setRequestFlyout,}) => {
  const finishUp = () => {
    setRequestFlyout(true);
    closeApproveRejectRequestFlyout();
  };
  return (
    <>
      <main
        id="modal"
        className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "modal" && closeApproveRejectRequestFlyout();
        }}
      >
        <div className="border-1 border-gray-700 rounded-xl shadow-xl bg-[#111111] flex flex-col gap-3 w-[550px] p-10 pt-4">
          <div className="flex justify-end mb-[-40px]">
            <button
              className="h-[40px] w-[40px] flex justify-center bg-white/20 items-center text-[18px] rounded-[100%] text-gray-100 hover:bg-white/20 transition ease-in-out delay-150"
              onClick={() => closeApproveRejectRequestFlyout()}
            >
              X
            </button>
          </div>

          <CompanyInitial
            initials={getInitials(partnerDetails.vas_partner).toUpperCase()}
          />

          <div className="flex flex-col">
            <h2 className=" text-[#FFF] font-bold text-[20px]">
              {partnerDetails.vas_partner}
            </h2>
            VAS Service Provider
          </div>

          <div className="bg-white/10 p-4 flex justify-between text-[13px] items-center rounded-[7px]">
            <div className="flex flex-col gap-0">
              <span>Email</span>
              <p className="text-white">{partnerDetails.email}</p>
            </div>
            <div
              className="flex gap-2 cursor-pointer hover:opacity-60"
              onClick={() => {
                navigator.clipboard
                  .writeText(partnerDetails.email)
                  .then(() => successAction("Email Copied!", true))
                  .catch((error) =>
                    console.error("Error copying email:", error)
                  );
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.875 3.15625H6.875C6.75068 3.15625 6.63145 3.20564 6.54354 3.29354C6.45564 3.38145 6.40625 3.50068 6.40625 3.625V6.90625H3.125C3.00068 6.90625 2.88145 6.95564 2.79354 7.04354C2.70564 7.13145 2.65625 7.25068 2.65625 7.375V17.375C2.65625 17.4993 2.70564 17.6185 2.79354 17.7065C2.88145 17.7944 3.00068 17.8438 3.125 17.8438H13.125C13.2493 17.8438 13.3685 17.7944 13.4565 17.7065C13.5444 17.6185 13.5938 17.4993 13.5938 17.375V14.0938H16.875C16.9993 14.0938 17.1185 14.0444 17.2065 13.9565C17.2944 13.8685 17.3438 13.7493 17.3438 13.625V3.625C17.3438 3.50068 17.2944 3.38145 17.2065 3.29354C17.1185 3.20564 16.9993 3.15625 16.875 3.15625ZM12.6562 16.9062H3.59375V7.84375H12.6562V16.9062ZM16.4062 13.1562H13.5938V7.375C13.5938 7.25068 13.5444 7.13145 13.4565 7.04354C13.3685 6.95564 13.2493 6.90625 13.125 6.90625H7.34375V4.09375H16.4062V13.1562Z"
                  fill="#8E8E8E"
                />
              </svg>
              <span className="text-mtn">Copy Email</span>
            </div>
          </div>

          <div className="bg-white/10 p-4 flex justify-between text-[13px] items-center rounded-[7px]">
            <div className="flex flex-col gap-0">
              <span>Phone</span>
              <p className="text-white"> {partnerDetails.telephone}</p>
            </div>
            <div
              className="flex gap-2 cursor-pointer hover:opacity-60"
              onClick={() => {
                navigator.clipboard
                  .writeText(partnerDetails.telephone)
                  .then(() => successAction("Phone Number Copied!", true))
                  .catch((error) =>
                    console.error("Error copying Phone Number:", error)
                  );
              }}
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.875 3.15625H6.875C6.75068 3.15625 6.63145 3.20564 6.54354 3.29354C6.45564 3.38145 6.40625 3.50068 6.40625 3.625V6.90625H3.125C3.00068 6.90625 2.88145 6.95564 2.79354 7.04354C2.70564 7.13145 2.65625 7.25068 2.65625 7.375V17.375C2.65625 17.4993 2.70564 17.6185 2.79354 17.7065C2.88145 17.7944 3.00068 17.8438 3.125 17.8438H13.125C13.2493 17.8438 13.3685 17.7944 13.4565 17.7065C13.5444 17.6185 13.5938 17.4993 13.5938 17.375V14.0938H16.875C16.9993 14.0938 17.1185 14.0444 17.2065 13.9565C17.2944 13.8685 17.3438 13.7493 17.3438 13.625V3.625C17.3438 3.50068 17.2944 3.38145 17.2065 3.29354C17.1185 3.20564 16.9993 3.15625 16.875 3.15625ZM12.6562 16.9062H3.59375V7.84375H12.6562V16.9062ZM16.4062 13.1562H13.5938V7.375C13.5938 7.25068 13.5444 7.13145 13.4565 7.04354C13.3685 6.95564 13.2493 6.90625 13.125 6.90625H7.34375V4.09375H16.4062V13.1562Z"
                  fill="#8E8E8E"
                />
              </svg>
              <span className="text-mtn">Copy Phone</span>
            </div>
          </div>

          {partnerDetails.status === "pending" && (
            <>
              <div className="flex gap-2 mt-[20px]">
                <button
                  className="border-1 border-white/20 text-white  hover:opacity-50 p-4 py-2 rounded-full flex gap-2"
                  onClick={() => rejectRequest(partnerDetails)}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99997 9.32167L5.58914 4.91084C5.43197 4.75904 5.22147 4.67505 5.00297 4.67694C4.78447 4.67884 4.57546 4.76648 4.42096 4.92099C4.26645 5.0755 4.17881 5.28451 4.17691 5.50301C4.17501 5.7215 4.25901 5.932 4.41081 6.08917L8.82164 10.5L4.41081 14.9108C4.25901 15.068 4.17501 15.2785 4.17691 15.497C4.17881 15.7155 4.26645 15.9245 4.42096 16.079C4.57546 16.2335 4.78447 16.3212 5.00297 16.3231C5.22147 16.325 5.43197 16.241 5.58914 16.0892L9.99997 11.6783L14.4108 16.0892C14.568 16.241 14.7785 16.325 14.997 16.3231C15.2155 16.3212 15.4245 16.2335 15.579 16.079C15.7335 15.9245 15.8211 15.7155 15.823 15.497C15.8249 15.2785 15.7409 15.068 15.5891 14.9108L11.1783 10.5L15.5891 6.08917C15.6687 6.0123 15.7322 5.92035 15.7759 5.81868C15.8196 5.71701 15.8426 5.60766 15.8435 5.49701C15.8445 5.38636 15.8234 5.27663 15.7815 5.17421C15.7396 5.0718 15.6777 4.97875 15.5995 4.90051C15.5212 4.82227 15.4282 4.76039 15.3258 4.71849C15.2234 4.67659 15.1136 4.6555 15.003 4.65646C14.8923 4.65743 14.783 4.68041 14.6813 4.72409C14.5796 4.76776 14.4877 4.83125 14.4108 4.91084L9.99997 9.32167Z"
                      fill="#747474"
                    />
                  </svg>
                  <span>Decline Request</span>
                </button>
                <button
                  className="text-black bg-mtn-500 p-4 py-2 rounded-full hover:opacity-50 flex gap-2"
                  onClick={() => approveRequest(partnerDetails)}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.8313 6.45625L7.83128 16.4562C7.74339 16.544 7.62425 16.5933 7.50003 16.5933C7.37581 16.5933 7.25667 16.544 7.16878 16.4562L2.79378 12.0812C2.71098 11.9924 2.6659 11.8749 2.66804 11.7534C2.67018 11.632 2.71938 11.5161 2.80526 11.4302C2.89115 11.3443 3.00701 11.2952 3.12845 11.293C3.24989 11.2909 3.36742 11.3359 3.45628 11.4187L7.50003 15.4617L17.1688 5.79375C17.2576 5.71095 17.3752 5.66587 17.4966 5.66801C17.618 5.67015 17.7339 5.71935 17.8198 5.80523C17.9057 5.89112 17.9549 6.00698 17.957 6.12842C17.9592 6.24986 17.9141 6.36739 17.8313 6.45625Z"
                      fill="#1C1C1C"
                    />
                  </svg>
                  <span>Accept Request</span>
                </button>
              </div>
            </>
          )}

          {(partnerDetails.status === "in-progress" ||
            partnerDetails.status === "completed") && (
            <div className="flex gap-3">
              <button
                onClick={() => finishUp()}
                className="text-black font-bold rounded-full py-2 px-6 bg-yellow-600 text-sm cursor-pointer whitespace-nowrap hover:text-white flex"
              >
                Finish up (0/2)
                <svg
                  className="my-1 mx-2"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.49605 4.16252C5.65228 4.31879 5.74004 4.53071 5.74004 4.75168C5.74004 4.97265 5.65228 5.18458 5.49605 5.34085L1.66855 9.16835C1.51331 9.32049 1.3043 9.40521 1.08695 9.40411C0.869589 9.40302 0.661447 9.31618 0.50775 9.16249C0.354053 9.00879 0.267222 8.80065 0.266124 8.58329C0.265026 8.36593 0.349751 8.15693 0.501887 8.00168L3.75189 4.75168L0.501887 1.50168C0.349751 1.34644 0.265026 1.13743 0.266124 0.920076C0.267222 0.702719 0.354053 0.494577 0.50775 0.34088C0.661447 0.187183 0.869589 0.100351 1.08695 0.0992537C1.3043 0.0981559 1.51331 0.182881 1.66855 0.335017L5.49605 4.16252Z"
                    fill="#1C1C1C"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};









































