"use client";
import React from "react";
import { useEffect, useState } from "react";
import FilteringFlyout, {
  RequestFinishUpModal,
  ApproveRejectRequestModal,
} from "@/app/components/dashboard/partners/requests/PartnerRequestComponents";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";
import {
  CompanyInitial,
  RequestApproveBtn,
  RequestRejectBtn,
} from "@/app/components/Icons";
import {
  getInitials,
  ellipsify,
  capitalizeFirst,
} from "@/app/modules/utilities";

import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import RemoteEndpoints from "@/app/modules/endpoints";
import { NewSuccess } from "@/app/components/toasts/Success";
import { flatMap } from "lodash";

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
export default function Requests() {
  const { getAggregatorRequest } = usePartners();
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [requestFlyout, setRequestFlyout] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState();
  const [approveRejectRequestFlyout, setApproveRejectRequestFlyout] =useState(false);

  const statusColour = {
    pending: "bg-[#353535]",
    decline: "bg-[#AD2B19]",
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
      setError(error.message);
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
    status: false,
  });
  const successAction = (message) => {
    setShowSuccessToast((prevState) => ({
      ...prevState,
      message: message,
      status: true,
    }));

    const timeoutId = setTimeout(() => {
      setShowSuccessToast((prevState) => ({
        ...prevState,
        message: "",
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
    let url = RemoteEndpoints.APPROVE_VAS_PARTNERS
    approveRejectAction(url);
  };

  const _rejectRequest = (eachRequest) => {
    formData.service_uuid = eachRequest.service_uuid;
    setServiceUuid(eachRequest.service_uuid);
    let url = RemoteEndpoints.REJECT_VAS_PARTNERS
    approveRejectAction(url);
  };

  const approveRejectAction = async (url) => {
    setApproveRejectRequestFlyout(false);
    try {
      setSendAction(true);
      const response = await axios.post(
        url,formData,
        {
          headers: {
            apikey: apikey,
            //Authorization: `Bearer ${states.admins.token}`,
          },
        }
      );
      setSendAction(false);
      successAction(response.data.message);
      get_aggregator_request();
      window.location.reload();
    } catch (err) {
      setSendAction(false);
      successAction(err.response.data.data.message);
    }
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
                                eachRequest.service_name
                              ).toUpperCase()}
                            />
                            <div className="flex flex-col">
                              <p>{eachRequest.service_name}</p>
                              <span className="text-sm text-gray-500">
                                {eachRequest.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>{eachRequest.request_id}</td>

                        <td>{eachRequest.telephone}</td>

                        <td>{actionDate(eachRequest.service_submitted_on)}</td>

                        <td>
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
                              {(eachRequest.status === "pending") && (
                                <>
                                  <div className="hidden  group-hover/request-1:flex gap-3">
                                    <div onClick={() => _rejectRequest(eachRequest)}>
                                      <RequestRejectBtn />
                                    </div>
                                    
                                    <div onClick={() => _approveRequest(eachRequest)}>
                                      <RequestApproveBtn />
                                    </div>
                                  </div>
                                </>
                              )}

                              {(eachRequest.status === "in-progress" ||
                              eachRequest.status === "completed" ) && (
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => {
                                      setRequestFlyout(true);
                                      setPartnerDetails(eachRequest);
                                    }}
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
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {selectedRequest?.length == 0? (
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
          closeRequestFlyout={() => setRequestFlyout(false)}
          partnerDetails={partnerDetails}
        />
      )}

      {showSuccessToast.status && (
        <NewSuccess message={showSuccessToast.message} />
      )}
    </>
  );
}
