"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import Confirm from "@/app/components/Confirm";
import useApp from "@/hooks/useApp";
import useAdmins from "@/hooks/useAdmins";
import { useRouter} from "next/navigation";
import {Loading} from "@/app/components/Icons";
import {getInitials} from "@/app/modules/utilities";
import { NewSuccess } from "@/app/components/toasts/Success";
import FileViewer from "@/app/components/modals/FileViewer";
import {useStoreState } from "easy-peasy";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey } from "@/app/modules/constants";
/////////////////////////////////////////////////////////////////////////////////////
function actionDate(targetDate) {
  const originalDate = new Date(targetDate);
  const day = originalDate.getDate();
  const month = originalDate.toLocaleString("en-US", { month: "short" });
  const year = originalDate.getFullYear();
  
  return `${day} / ${month} / ${year}`;
}


export default function AggregatorPage({ params,realTimePageReloader}) {
const [delayedExecution, setDelayedExecution] = useState(false);
//////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////
////api/v2/admin/approved/request
    const { getSingleAggregatorVasPartnerApprovalDetails } = useAdmins();
    const [vasPartnersDetails, setVasPartnersDetails] = useState();
    let getApprovedRequestResponse = null;
    const getVasPartnersDetails = async (service_uuid) => {
        try {
            getApprovedRequestResponse = await getSingleAggregatorVasPartnerApprovalDetails(service_uuid);
            let get_approved_request_response = getApprovedRequestResponse.result.data;
          setVasPartnersDetails(get_approved_request_response);
          setDelayedExecution(true);
        } catch (err) {
          console.log("error", err);
          successAction('Network Error!', false);
        }
      };
  

const [openAggregatorValidationFlyout, setOpenAggregatorValidationFlyout] = useState({
    opens: false,
    modal: null,
    modalTitle: ""
});

  ////////////////////////////////////////////////////////////////////
  const router = useRouter();
  const {setRouteloading } = useApp();
  const goToRequestPage = () => {
    setRouteloading(true);
    router.push(`/admin/requests`);
  };
  
  useEffect(() => {
   // console.log('params', params?.params[0]);
    if (params?.params?.length > 0){
        getVasPartnersDetails(params.params[0]);
    } else{
        goToRequestPage()
    }
}, [params]);
  ////////////////////////////////////////////////////////////////////
  return (
    <>
      {!delayedExecution ? (
        <div className="w-[100%] flex justify-center">
          <Loading style="h-[600px]" />
        </div>
      ) : (
        <>
          <div className=" mx-auto py-12 px-16 min-h-screen w-[85%]">
            <Link href="/admin/requests">
              <span className="inline-flex gap-4 grow-0 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80 mb-12">
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
                Applications
              </span>
            </Link>

            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="w-[80px] h-[80px] flex rounded-full bg-[#421A75] justify-center items-center text-[24px] text-white">
                 {getInitials(vasPartnersDetails?.vas_partner)}
                </div>
                <div className="flex flex-col justify-center items-start">
                  <h1 className="text-white text-[24px] font-mtn-medium">
                    {vasPartnersDetails?.vas_partner}
                  </h1>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex gap-10 pt-[40px] justify-between">
                <AggregatorSelector
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5312 13.4895H9.70041L9.33562 13.8543C9.24775 13.9422 9.1285 13.9916 9.00419 13.9916H6.99581C6.87147 13.9916 6.75225 13.9422 6.66437 13.8543L6.29959 13.4895H0.46875C0.209875 13.4895 0 13.6994 0 13.9583V14.527C0 15.35 0.668437 15.9999 1.47294 15.9999H14.5271C15.3501 15.9999 16 15.3315 16 14.527V13.9583C16 13.6993 15.7901 13.4895 15.5312 13.4895Z"
                        fill="#FFF"
                      />
                      <path
                        d="M9.47278 0.662842V2.07494H10.8848L9.47278 0.662842Z"
                        fill="#FFF"
                      />
                      <path
                        d="M6.82565 12.6892L7.19043 13.054H8.81049L9.17528 12.6892C9.26315 12.6013 9.3824 12.5519 9.50671 12.5519H14.4942V5.99146C14.4942 5.1793 13.8335 4.51855 13.0213 4.51855H12.4859V10.0748C12.4859 10.8502 11.855 11.4811 11.0796 11.4811H4.92131C4.1459 11.4811 3.51506 10.8502 3.51506 10.0748V4.51855H2.97962C2.16746 4.51855 1.50671 5.1793 1.50671 5.99146V12.5519H6.49421C6.61853 12.5519 6.73778 12.6013 6.82565 12.6892Z"
                        fill="#FFF"
                      />
                      <path
                        d="M4.9209 10.5438H11.0792C11.3381 10.5438 11.548 10.3339 11.548 10.075V3.0125H9.00424C8.74537 3.0125 8.53549 2.80263 8.53549 2.54375V0H4.9209C4.66202 0 4.45215 0.209875 4.45215 0.46875V10.075C4.45215 10.3339 4.66199 10.5438 4.9209 10.5438ZM5.99171 2.00834H6.99587C7.61671 2.03119 7.61706 2.92288 6.99587 2.94584H5.99171C5.37087 2.92297 5.37052 2.03131 5.99171 2.00834ZM5.99171 4.01666H6.99587C7.61671 4.0395 7.61706 4.93119 6.99587 4.95416H5.99171C5.37087 4.93131 5.37052 4.03966 5.99171 4.01666ZM5.99171 6.025H10.0084C10.2672 6.025 10.4771 6.23488 10.4771 6.49375C10.4771 6.75263 10.2672 6.9625 10.0084 6.9625H5.99171C5.37171 6.94003 5.36974 6.04825 5.99171 6.025ZM5.99171 8.03334H10.0084C10.2672 8.03334 10.4771 8.24322 10.4771 8.50209C10.4771 8.76097 10.2672 8.97084 10.0084 8.97084H5.99171C5.37171 8.94838 5.36974 8.05659 5.99171 8.03334Z"
                        fill="#FFF"
                      />
                    </svg>
                  }
                  title={"VAS License"}
                  message={"NCC issued value added service license"}
                  openAggregatorValidationFlyout={() =>
                    setOpenAggregatorValidationFlyout({
                      ...openAggregatorValidationFlyout,
                      opens: true,
                      modal: "ncc_licence",
                      modalTitle: "VAS License",
                    })
                  }
                />

                <AggregatorSelector
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5312 13.4895H9.70041L9.33562 13.8543C9.24775 13.9422 9.1285 13.9916 9.00419 13.9916H6.99581C6.87147 13.9916 6.75225 13.9422 6.66437 13.8543L6.29959 13.4895H0.46875C0.209875 13.4895 0 13.6994 0 13.9583V14.527C0 15.35 0.668437 15.9999 1.47294 15.9999H14.5271C15.3501 15.9999 16 15.3315 16 14.527V13.9583C16 13.6993 15.7901 13.4895 15.5312 13.4895Z"
                        fill="#FFF"
                      />
                      <path
                        d="M9.47278 0.662842V2.07494H10.8848L9.47278 0.662842Z"
                        fill="#FFF"
                      />
                      <path
                        d="M6.82565 12.6892L7.19043 13.054H8.81049L9.17528 12.6892C9.26315 12.6013 9.3824 12.5519 9.50671 12.5519H14.4942V5.99146C14.4942 5.1793 13.8335 4.51855 13.0213 4.51855H12.4859V10.0748C12.4859 10.8502 11.855 11.4811 11.0796 11.4811H4.92131C4.1459 11.4811 3.51506 10.8502 3.51506 10.0748V4.51855H2.97962C2.16746 4.51855 1.50671 5.1793 1.50671 5.99146V12.5519H6.49421C6.61853 12.5519 6.73778 12.6013 6.82565 12.6892Z"
                        fill="#FFF"
                      />
                      <path
                        d="M4.9209 10.5438H11.0792C11.3381 10.5438 11.548 10.3339 11.548 10.075V3.0125H9.00424C8.74537 3.0125 8.53549 2.80263 8.53549 2.54375V0H4.9209C4.66202 0 4.45215 0.209875 4.45215 0.46875V10.075C4.45215 10.3339 4.66199 10.5438 4.9209 10.5438ZM5.99171 2.00834H6.99587C7.61671 2.03119 7.61706 2.92288 6.99587 2.94584H5.99171C5.37087 2.92297 5.37052 2.03131 5.99171 2.00834ZM5.99171 4.01666H6.99587C7.61671 4.0395 7.61706 4.93119 6.99587 4.95416H5.99171C5.37087 4.93131 5.37052 4.03966 5.99171 4.01666ZM5.99171 6.025H10.0084C10.2672 6.025 10.4771 6.23488 10.4771 6.49375C10.4771 6.75263 10.2672 6.9625 10.0084 6.9625H5.99171C5.37171 6.94003 5.36974 6.04825 5.99171 6.025ZM5.99171 8.03334H10.0084C10.2672 8.03334 10.4771 8.24322 10.4771 8.50209C10.4771 8.76097 10.2672 8.97084 10.0084 8.97084H5.99171C5.37171 8.94838 5.36974 8.05659 5.99171 8.03334Z"
                        fill="#FFF"
                      />
                    </svg>
                  }
                  title={"NLRC License"}
                  message={"Lottery License for gambling based services"}
                  openAggregatorValidationFlyout={() =>
                    setOpenAggregatorValidationFlyout({
                      ...openAggregatorValidationFlyout,
                      opens: true,
                      modal: 2,
                      modalTitle: "NLRC License",
                    })
                  }
                />

                <AggregatorSelector
                  icon={
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_11198_4350)">
                        <path
                          d="M6.79199 9.40625C7.05042 9.40625 7.26074 9.19592 7.26074 8.9375C7.26074 8.67908 7.05042 8.46875 6.79199 8.46875C6.53357 8.46875 6.32324 8.67908 6.32324 8.9375C6.32324 9.19592 6.53357 9.40625 6.79199 9.40625Z"
                          fill="#686868"
                        />
                        <path
                          d="M6.79199 5.65625C7.05042 5.65625 7.26074 5.44592 7.26074 5.1875C7.26074 4.92908 7.05042 4.71875 6.79199 4.71875C6.53357 4.71875 6.32324 4.92908 6.32324 5.1875C6.32324 5.44592 6.53357 5.65625 6.79199 5.65625Z"
                          fill="#686868"
                        />
                        <path
                          d="M10.542 5.65625C10.8004 5.65625 11.0107 5.44592 11.0107 5.1875C11.0107 4.92908 10.8004 4.71875 10.542 4.71875C10.2836 4.71875 10.0732 4.92908 10.0732 5.1875C10.0732 5.44592 10.2836 5.65625 10.542 5.65625Z"
                          fill="#686868"
                        />
                        <path
                          d="M10.542 9.40625C10.8004 9.40625 11.0107 9.19592 11.0107 8.9375C11.0107 8.67908 10.8004 8.46875 10.542 8.46875C10.2836 8.46875 10.0732 8.67908 10.0732 8.9375C10.0732 9.19592 10.2836 9.40625 10.542 9.40625Z"
                          fill="#686868"
                        />
                        <path
                          d="M3.51074 11.3125H13.8232V2.8125H3.51074V11.3125ZM9.13574 5.1875C9.13574 4.41211 9.7666 3.78125 10.542 3.78125C11.3174 3.78125 11.9482 4.41211 11.9482 5.1875C11.9482 5.79858 11.5564 6.31958 11.0107 6.51318V7.61182C11.5564 7.80542 11.9482 8.32642 11.9482 8.9375C11.9482 9.71289 11.3174 10.3438 10.542 10.3438C9.7666 10.3438 9.13574 9.71289 9.13574 8.9375C9.13574 8.32642 9.52759 7.80542 10.0732 7.61182V6.51318C9.52759 6.31958 9.13574 5.79858 9.13574 5.1875ZM6.79199 3.78125C7.56738 3.78125 8.19824 4.41211 8.19824 5.1875C8.19824 5.96289 7.56738 6.59375 6.79199 6.59375C6.0166 6.59375 5.38574 5.96289 5.38574 5.1875C5.38574 4.41211 6.0166 3.78125 6.79199 3.78125ZM6.79199 7.53125C7.56738 7.53125 8.19824 8.16211 8.19824 8.9375C8.19824 9.71289 7.56738 10.3438 6.79199 10.3438C6.0166 10.3438 5.38574 9.71289 5.38574 8.9375C5.38574 8.16211 6.0166 7.53125 6.79199 7.53125Z"
                          fill="#FAFAFA"
                        />
                        <path
                          d="M3.51074 14.5937C3.51074 15.3691 4.1416 16 4.91699 16H12.417C13.1924 16 13.8232 15.3691 13.8232 14.5937V12.25H3.51074V14.5937ZM7.72949 13.6562H9.60449V14.5937H7.72949V13.6562Z"
                          fill="#FAFAFA"
                        />
                        <path
                          d="M12.417 0H4.91699C4.1416 0 3.51074 0.630859 3.51074 1.40625V1.875H13.8232V1.40625C13.8232 0.630859 13.1924 0 12.417 0Z"
                          fill="#FAFAFA"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_11198_4350">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0.666626)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                  title={"Short codes"}
                  message={"This is a short description of this compliance item"}
                  openAggregatorValidationFlyout={() =>
                    setOpenAggregatorValidationFlyout({
                      ...openAggregatorValidationFlyout,
                      opens: true,
                      modal: 3,
                      modalTitle: "Short codes",
                    })
                  }
                />
              </div>
            </div>
          </div>

          {openAggregatorValidationFlyout.opens && (
            <AggregatorVerlidationModal
              realTimePageReloader={realTimePageReloader}
              openAggregatorValidationFlyout={openAggregatorValidationFlyout}
              setOpenAggregatorValidationFlyout={setOpenAggregatorValidationFlyout}
              vasPartnersDetails={vasPartnersDetails}
            />
          )}

          {showSuccessToast.status && (
            <NewSuccess
              message={showSuccessToast.message}
              alert={showSuccessToast.alert}
            />
          )}
        </>
      )}
    </>
  );
}

export const AggregatorSelector = ({icon,title, message,openAggregatorValidationFlyout,}) => {

    return (
      <>
        <div
          className=" bg-white/5 w-[100%]  rounded-[10px] cursor-pointer hover:bg-white/10"
          onClick={() => openAggregatorValidationFlyout()}
        >
          <div className="p-[25px] h-[240px] flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="border border-white/20  h-[60px] w-[60px] rounded-full  group-hover:border group-hover:border-mtn-400 flex items-center justify-center">
                {icon}
              </div>
              <h3 className="text-white font-bold font-mtn">{title}</h3>
              <p className=" font-light">{message}</p>
            </div>
            <div className="w-[100px] p-1 px-2 bg-[#2D200A] flex gap-1 justify-center items-center rounded-[20px] text-[11px]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.32501 2.29489C8.44501 1.49489 7.28001 1.01489 6.00001 1.01489C3.25001 1.01489 1.01501 3.24989 1.01501 5.99989C1.01501 8.74989 3.25001 10.9849 6.00001 10.9849C7.28001 10.9849 8.44501 10.5049 9.32501 9.70489C10.345 8.79989 10.985 7.46989 10.985 5.99989C10.985 4.52989 10.345 3.19989 9.32501 2.29489ZM5.98501 8.19489C5.97501 9.01989 5.36001 9.21989 4.78501 8.98989C3.60001 8.51489 2.76501 7.35489 2.76501 5.99989C2.76501 4.64489 3.60001 3.48489 4.78501 3.00489C5.36001 2.77489 5.97501 2.97989 5.98501 3.79989V8.19489Z"
                  fill="#F3AF33"
                />
              </svg>
              <span className="text-[#F3AF33]">In Progress</span>
            </div>
          </div>
        </div>
      </>
    );
}

export const AggregatorVerlidationModal = ({realTimePageReloader,openAggregatorValidationFlyout,setOpenAggregatorValidationFlyout,vasPartnersDetails}) => {
  const states = useStoreState((action) => action.admins);
  const [delayedExecution, setDelayedExecution] = useState(false);
    //////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////
     const [tab, setTab] = useState({
    overview: true,
    activity: false,
  });
  const closeOpenAggregatorValidationFlyout =()=>{
    setOpenAggregatorValidationFlyout({
        ...openAggregatorValidationFlyout,
        opens: false,
      });
  }

  const { getSingleAggregatorVasPartnerDetails } = useAdmins();
  const [newVasPartnersDetails, setNewVasPartnersDetails] = useState();
  let getVasPartnersDetailsResponse = null;
  const getVasPartnersDetailsFunction = async (aggregator_uuid,vas_partner_uuid) => {
      try {
        getVasPartnersDetailsResponse = await getSingleAggregatorVasPartnerDetails(aggregator_uuid, vas_partner_uuid);
          let get_vas_partners_details_response = getVasPartnersDetailsResponse.result.data.vas_partner[0];
          console.log('get_vas_partners_details_response',get_vas_partners_details_response);
          setNewVasPartnersDetails(get_vas_partners_details_response);
        setDelayedExecution(true);
        setFormDataParams(get_vas_partners_details_response);
      } catch (err) {
        console.log("error", err);
        successAction('Network Error 1!', false);
      }
    };

  useEffect(() => {
   
    if (vasPartnersDetails) {
      getVasPartnersDetailsFunction(vasPartnersDetails.aggregator_uuid,vasPartnersDetails.vas_partner_uuid );
    }
  }, [vasPartnersDetails]);

  const [formData, setFormData] = useState({});
  const setFormDataParams = async (newVasPartnersDetails) => {
    setFormData({
      ...formData,
      partner_uuid: newVasPartnersDetails?.aggregator_uuid,
      user_uuid: vasPartnersDetails.aggregator_user_uuid,
      vas_partner_uuid: newVasPartnersDetails?.vas_partner_uuid,
      category_uuid: newVasPartnersDetails?.vas_category_uuid,
      admin_user: states.admin.uuid,
    });
  };
 
  const approveRejectRequest = async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("partner_uuid", formData.partner_uuid);
        formDataToSend.append("user_uuid", formData.user_uuid);
        formDataToSend.append("vas_partner_uuid", formData.vas_partner_uuid);
        formDataToSend.append("category_uuid", formData.category_uuid);
        formDataToSend.append("admin_user", formData.admin_user);
        formDataToSend.append("category_stage", formData.category_stage);
        formDataToSend.append("status", formData.status);
        formDataToSend.append("feedback", formData.feedback);
        formDataToSend.append("field", formData.field);
        formDataToSend.append("approval_uuid", formData.approval_uuid);
        setDelayedExecution(false);
        const response = await axios.post(
          RemoteEndpoints.APPROVE_REJECT_AGGREGATOR_VAS_PARTNER,
          formDataToSend,
          {
            headers: {
              apikey: apikey,
              Authorization: `Bearer ${states.admin.token}`,
            },
          }
        );

        setDelayedExecution(true);
        successAction(feedback, true);
      } catch (err) {
        setDelayedExecution(true);
        console.log("error", err);
        successAction(err.response.data.data.message, false);
      }
   
  };
  return (
    <>
      <section
        id="modal"
        className="w-screen flex justify-center items-center h-screen fixed z-[1000] top-0 left-0 bg-black/80 animate-[slide-left_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "modal" && closeOpenAggregatorValidationFlyout();
        }}
      >
        <div className="w-[500px] h-screen fixed right-0  top-0 border-l border-white/10 bg-[#111111] animate-[slide-left_1s_ease-in-out]">
          <div className="h-screen w-[100%] flex flex-col">
            {/* -----start title-------------------------------------------------------------- */}
            <div className="min-h-[110px] bg-black border-b border-white/10">
              <div className="p-5 pb-0 flex flex-col gap-3">
                <div className="h-[40px] flex flex-row justify-between ">
                  <div className="flex gap-3 flex-wrap h-[40px] items-center">
                    <div className="h-[40px] w-[40px] rounded-[100%] border border-white/20 flex justify-center items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_10714_163794)">
                          <path
                            d="M8.68667 1.24665L1.36 0.13332C1.02 0.079987 0.673333 0.17332 0.413333 0.39332C0.153333 0.619987 0 0.946654 0 1.28665V15.3333C0 15.7 0.3 16 0.666667 16H2.83333V12.5C2.83333 11.8533 3.35333 11.3333 4 11.3333H5.66667C6.31333 11.3333 6.83333 11.8533 6.83333 12.5V16H9.66667V2.39999C9.66667 1.82665 9.25333 1.33999 8.68667 1.24665ZM3.66667 9.83332H2.66667C2.39067 9.83332 2.16667 9.60932 2.16667 9.33332C2.16667 9.05732 2.39067 8.83332 2.66667 8.83332H3.66667C3.94267 8.83332 4.16667 9.05732 4.16667 9.33332C4.16667 9.60932 3.94267 9.83332 3.66667 9.83332ZM3.66667 7.83332H2.66667C2.39067 7.83332 2.16667 7.60932 2.16667 7.33332C2.16667 7.05732 2.39067 6.83332 2.66667 6.83332H3.66667C3.94267 6.83332 4.16667 7.05732 4.16667 7.33332C4.16667 7.60932 3.94267 7.83332 3.66667 7.83332ZM3.66667 5.83332H2.66667C2.39067 5.83332 2.16667 5.60932 2.16667 5.33332C2.16667 5.05732 2.39067 4.83332 2.66667 4.83332H3.66667C3.94267 4.83332 4.16667 5.05732 4.16667 5.33332C4.16667 5.60932 3.94267 5.83332 3.66667 5.83332ZM3.66667 3.83332H2.66667C2.39067 3.83332 2.16667 3.60932 2.16667 3.33332C2.16667 3.05732 2.39067 2.83332 2.66667 2.83332H3.66667C3.94267 2.83332 4.16667 3.05732 4.16667 3.33332C4.16667 3.60932 3.94267 3.83332 3.66667 3.83332ZM7 9.83332H6C5.724 9.83332 5.5 9.60932 5.5 9.33332C5.5 9.05732 5.724 8.83332 6 8.83332H7C7.276 8.83332 7.5 9.05732 7.5 9.33332C7.5 9.60932 7.276 9.83332 7 9.83332ZM7 7.83332H6C5.724 7.83332 5.5 7.60932 5.5 7.33332C5.5 7.05732 5.724 6.83332 6 6.83332H7C7.276 6.83332 7.5 7.05732 7.5 7.33332C7.5 7.60932 7.276 7.83332 7 7.83332ZM7 5.83332H6C5.724 5.83332 5.5 5.60932 5.5 5.33332C5.5 5.05732 5.724 4.83332 6 4.83332H7C7.276 4.83332 7.5 5.05732 7.5 5.33332C7.5 5.60932 7.276 5.83332 7 5.83332ZM7 3.83332H6C5.724 3.83332 5.5 3.60932 5.5 3.33332C5.5 3.05732 5.724 2.83332 6 2.83332H7C7.276 2.83332 7.5 3.05732 7.5 3.33332C7.5 3.60932 7.276 3.83332 7 3.83332Z"
                            fill="#686868"
                          />
                          <path
                            d="M15.0792 7.22789L10.3325 6.23389V15.9999H14.8325C15.4759 15.9999 15.9992 15.4766 15.9992 14.8332V8.36789C15.9992 7.81722 15.6239 7.34855 15.0792 7.22789ZM13.4992 13.9999H12.4992C12.2232 13.9999 11.9992 13.7759 11.9992 13.4999C11.9992 13.2239 12.2232 12.9999 12.4992 12.9999H13.4992C13.7752 12.9999 13.9992 13.2239 13.9992 13.4999C13.9992 13.7759 13.7752 13.9999 13.4992 13.9999ZM13.4992 11.9999H12.4992C12.2232 11.9999 11.9992 11.7759 11.9992 11.4999C11.9992 11.2239 12.2232 10.9999 12.4992 10.9999H13.4992C13.7752 10.9999 13.9992 11.2239 13.9992 11.4999C13.9992 11.7759 13.7752 11.9999 13.4992 11.9999ZM13.4992 9.99989H12.4992C12.2232 9.99989 11.9992 9.77589 11.9992 9.49989C11.9992 9.22389 12.2232 8.99989 12.4992 8.99989H13.4992C13.7752 8.99989 13.9992 9.22389 13.9992 9.49989C13.9992 9.77589 13.7752 9.99989 13.4992 9.99989Z"
                            fill="#686868"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_10714_163794">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h2 className="text-white">
                      {openAggregatorValidationFlyout.modalTitle}
                    </h2>
                  </div>

                  <button
                    className="h-[40px] w-[40px] flex justify-center bg-transparent items-center text-[18px] rounded-[100%] text-gray-100 hover:bg-white/20 transition ease-in-out delay-150"
                    onClick={() => closeOpenAggregatorValidationFlyout()}
                  >
                    X
                  </button>
                </div>

                <div className="flex gap-5">
                  <button
                    className={`${
                      tab.overview
                        ? "border-mtn-500 text-white"
                        : "border-transparent text-gray-400"
                    }
                      py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
                    onClick={() => {
                      if (!tab.overview) {
                        setTab({
                          ...tab,
                          overview: true,
                          activity: false,
                        });
                      }
                    }}
                  >
                    Overview
                  </button>

                  <button
                    className={`${
                      tab.activity
                        ? "border-mtn-500 text-white"
                        : "border-transparent text-gray-400"
                    }
                      py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
                    onClick={() => {
                      if (!tab.activity) {
                        setTab({
                          ...tab,
                          overview: false,
                          activity: true,
                        });
                      }
                    }}
                  >
                    Activity
                  </button>
                </div>
              </div>
            </div>
            {/* ------end title------------------------------------------------------------- */}

            {/* -----start body-------------------------------------------------------------- */}
            <div className="w-[100%] py-[40px] px-7 h-[calc(100%-170px)] top-[110px] overflow-auto">
              {!delayedExecution ? (
                <div className="w-[100%] flex justify-center">
                  <Loading style="h-[200px]" />
                </div>
              ) : (
                <>
                  {openAggregatorValidationFlyout.modal === 'ncc_licence' && (
                    <NCCLicenceVerlidationBody newVasPartnersDetails={newVasPartnersDetails} approveRejectRequest={approveRejectRequest} formData={formData} setFormData={setFormData}/>
                  )}
                  {openAggregatorValidationFlyout.modal === 'nlrc_licence' && (
                    <NLRCLicenceVerlidationBody newVasPartnersDetails={newVasPartnersDetails} approveRejectRequest={approveRejectRequest} formData={formData} setFormData={setFormData}/>
                  )}
                  {openAggregatorValidationFlyout.modal === 'short_code' && (
                    <ShortCodeVerlidationBody newVasPartnersDetails={newVasPartnersDetails} approveRejectRequest={approveRejectRequest} formData={formData} setFormData={setFormData}/>
                  )}
                </>
              )}
            </div>
            {/* -----start body-------------------------------------------------------------- */}

            {/* -----start nav-------------------------------------------------------------- */}
            <div className="h-[60px] bg-black border-b border-white/10 flex justify-between items-center">
              <div className="p-5 flex gap-3 cursor-pointer">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="40"
                    height="40"
                    rx="20"
                    fill="white"
                    fill-opacity="0.1"
                  />
                  <path
                    d="M22.5 26.6L17.0666 21.1667C16.425 20.525 16.425 19.475 17.0666 18.8334L22.5 13.4"
                    stroke="#FAFAFA"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex flex-col text-[13px]">
                  <span className="text-[11px]">Previous</span>
                  <h5 className="font-mtn-bold">VAS Licence</h5>
                </div>
              </div>

              <div className="p-5 flex gap-3 cursor-pointer">
                <div className="flex flex-col text-[13px]">
                  <span className="text-[11px]">Next</span>
                  <h5 className="font-mtn-bold">VAS Licence</h5>
                </div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="40"
                    height="40"
                    rx="20"
                    fill="white"
                    fill-opacity="0.1"
                  />
                  <path
                    d="M17.425 26.6L22.8584 21.1667C23.5 20.525 23.5 19.475 22.8584 18.8334L17.425 13.4"
                    stroke="#FAFAFA"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* -----start nav-------------------------------------------------------------- */}
          </div>
        </div>
      </section>
      {showSuccessToast.status && (
            <NewSuccess
              message={showSuccessToast.message}
              alert={showSuccessToast.alert}
            />
          )}
    </>
  );
};

export const NCCLicenceVerlidationBody = ({newVasPartnersDetails, approveRejectRequest, formData, setFormData}) => {
  const [fileViewer, setFileViewer] = useState(null);
  const category_stage = "ncclicense";
  return (
    <>
    <div className="w-[100%] bg-black rounded-[7px] p-5 flex flex-col gap-3">
      <AggregatorVerifier
       type={"text"}
       status={"pending"}
       title={"VAS Licence ID"}
       text={newVasPartnersDetails?.vas_license_id}
       approveRejectRequest={approveRejectRequest}
       formData={formData}
       setFormData={setFormData}
       field="vas_license_id"
       category_stage={category_stage}
      />
      <AggregatorVerifier
        type={"text"}
        status={"pending"}
        title={"Issuing date"}
        text={actionDate(newVasPartnersDetails?.ncc_issue_date)}
        approveRejectRequest={approveRejectRequest}
        formData={formData}
        setFormData={setFormData}
      />

      <AggregatorVerifier
        type={"text"}
        status={"pending"}
        title={"Expiry date"}
        text={actionDate(newVasPartnersDetails?.ncc_expiry_date)}
        approveRejectRequest={approveRejectRequest}
        formData={formData}
        setFormData={setFormData}
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"NCC VAS License document"}
        text={newVasPartnersDetails?.ncc_doc.file_name}
        approveRejectRequest={approveRejectRequest}
        newVasPartnersDetails={newVasPartnersDetails}
        formData={formData}
        setFormData={setFormData}
        setFileViewer={setFileViewer}
      />
    </div>

{fileViewer && (
  <FileViewer
    id="file_viewer"
    link={fileViewer}
    closeAction={() => setFileViewer(null)}
  />
)}
</>
  );
};

export const NLRCLicenceVerlidationBody = ({}) => {
  return (
    <div className="w-[100%] bg-black rounded-[7px] p-5 flex flex-col gap-3">
      <AggregatorVerifier
       type={"file"}
       status={"pending"}
       title={"NLRC Licence type"}
       text={"National lottery"} 
      />
      <AggregatorVerifier
       type={"file"}
       status={"pending"}
       title={"NLRC Licence ID"}
       text={"AD12345689"} 
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Issuing date"}
        text={"20 / Mar / 2022"}
      />

      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Expiry date"}
        text={"20 / Mar / 2022"}
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"NLRC License document"}
        text={"4433tessst7777788888 (1).pdf"}
      />
    </div>
  );
};

export const ShortCodeVerlidationBody = ({}) => {
  return (
    <div className="w-[100%] bg-black rounded-[7px] p-5 flex flex-col gap-3">
      <AggregatorVerifier
       type={"file"}
       status={"pending"}
       title={"Short code"}
       text={"123, 3452"} 
      />
      <AggregatorVerifier
       type={"file"}
       status={"pending"}
       title={"Short code document"}
       text={"VBEC-2023-3977377_file (2).pdf"} 
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Issuing date"}
        text={"20 / Mar / 2022"}
      />

      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Expiry date"}
        text={"20 / Mar / 2022"}
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Approved pricing shortcode"}
        text={"123, 3452"}
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Pricing Issuing date"}
        text={"20 / Mar / 2022"}
      />

      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"Pricing Expiry date"}
        text={"20 / Mar / 2022"}
      />
      <AggregatorVerifier
        type={"file"}
        status={"pending"}
        title={"NCC Pricing approval"}
        text={"VBEC-2023-6651133_file.pdf"}
      />

    </div>
  );
};

export const AggregatorVerifier = ({type, status, title, text, approveRejectRequest, newVasPartnersDetails, formData, setFormData, field, category_stage, setFileViewer}) => {
  const [showBtn, setShowBtn] = useState(true);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [showOthersTextbox, setShowOthersTextbox] = useState(false);
 
  const handleApprove = () => {
    setFormData({
      ...formData,
      category_stage: category_stage,
      status: "approved",
      feedback: title + " approved",
      field: field,
      approval_uuid: ""
    });
    setShowBtn(false);
    setApprove(true)
};
  const handleReject = () => {
    setShowBtn(false);
    setReject(true)
};

  const cancel = () => {
    setApprove(false);
    setReject(false);
    setShowBtn(true);
  };
  return (
    <div className={`border border-white/10 rounded-[7px] p-3 flex flex-col gap-5 hover:bg-[#313131] ${approve || reject ? 'bg-[#313131]' : ''}`}>
        {(approve || reject) && (
            <>
              {approve && (
                <Confirm
                  yestext="Yes"
                  notext="No"
                  type="approve"
                  onYes={() => approveRejectRequest()}
                  onNo={cancel}
                />
              )}
              {reject && (
                <Confirm
                  yestext="Reject"
                  notext="Cancel"
                  type="reject"
                  onYes={() => approveRejectRequest()}
                  onNo={cancel}
                  othersAction={setShowOthersTextbox}
                />
              )}
            </>
          )}

      <div className="flex justify-between">
        <div className="flex gap-3">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 3.375H15.75" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 7.125H9.3525" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 10.875H15.75" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 14.625H9.3525" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px]">{title}</span>
              {type=='text' ? (
                <h3 className="font-mtn-bold text-white">{text}</h3>
              ):(
                <div className="font-mtn-bold text-white flex gap-2 border border-white/10 rounded-[30px] p-2 px-4 justify-center items-center cursor-pointer"
                onClick={() =>
                  setFileViewer(newVasPartnersDetails?.ncc_doc.file_path ?? NULL)
                }
                >
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M9.8 0C10.074 0 10.337 0.113 10.526 0.312L13.726 3.74C13.902 3.926 14 4.173 14 4.429V15C14 15.552 13.552 16 13 16H1C0.448 16 0 15.552 0 15V1C0 0.448 0.448 0 1 0H9.8ZM13 5H9.5C9.224 5 9 4.776 9 4.5V1H1V15H13V5ZM4.5 12C4.22386 12 4 11.7761 4 11.5C4 11.2239 4.22386 11 4.5 11H9.5C9.77614 11 10 11.2239 10 11.5C10 11.7761 9.77614 12 9.5 12H4.5ZM4.5 9C4.22386 9 4 8.77614 4 8.5C4 8.22386 4.22386 8 4.5 8H9.5C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9H4.5Z" fill="#999999"/>
                  </svg>
                  <span>{text}</span>
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 5.4999L10.6 1.3999" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 3.4V1H8.59998" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11H7.5C10 11 11 10 11 7.5V6.5" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              )}
              
            </div>
        </div>
        <div className="flex gap-3">
          {showBtn && (
            <>
              <RequestRejectBtn action={handleReject}/>
              <RequestApproveBtn action={handleApprove} />
            </>
            )}
        
        </div>
      </div>

    </div>
  );
};

export const RequestApproveBtn = ({action}) => {
  return (
    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={action} className="cursor-pointer hover:opacity-50">
    <rect x="1.2998" y="0.5" width="35" height="35" rx="17.5" fill="#1C1C1C"/>
    <rect x="1.2998" y="0.5" width="35" height="35" rx="17.5" stroke="#4DCD97"/>
    <path d="M20.6936 13.9012L12.2936 22.1512C12.1884 22.2543 12.0471 22.312 11.8998 22.312C11.7526 22.312 11.6112 22.2543 11.5061 22.1512L7.90606 18.6159C7.85331 18.5642 7.81126 18.5026 7.78231 18.4347C7.75335 18.3667 7.73807 18.2937 7.73733 18.2198C7.73659 18.146 7.75041 18.0727 7.77799 18.0042C7.80558 17.9356 7.84639 17.8732 7.8981 17.8205C7.9498 17.7677 8.0114 17.7256 8.07936 17.6967C8.14732 17.6677 8.22031 17.6525 8.29418 17.6517C8.36805 17.651 8.44133 17.6648 8.50986 17.6924C8.57839 17.72 8.64081 17.7608 8.69356 17.8125L11.8998 20.9606L19.9061 13.0978C19.9581 13.0431 20.0206 12.9995 20.0899 12.9695C20.1591 12.9395 20.2337 12.9237 20.3092 12.9232C20.3847 12.9226 20.4595 12.9372 20.5292 12.9662C20.5989 12.9951 20.6621 13.0378 20.7149 13.0917C20.7678 13.1456 20.8093 13.2095 20.8369 13.2798C20.8646 13.35 20.8778 13.4251 20.8758 13.5005C20.8738 13.576 20.8566 13.6503 20.8253 13.7189C20.794 13.7876 20.7492 13.8493 20.6936 13.9003V13.9012ZM29.7011 13.1062C29.5966 12.9999 29.4542 12.9394 29.3051 12.938C29.1561 12.9366 29.0125 12.9944 28.9061 13.0987L20.8998 20.9615L19.0033 19.0987C18.9506 19.047 18.8882 19.0061 18.8197 18.9784C18.7512 18.9508 18.6779 18.9369 18.6041 18.9375C18.5302 18.9382 18.4572 18.9534 18.3892 18.9822C18.3212 19.0111 18.2596 19.0531 18.2078 19.1058C18.156 19.1585 18.1151 19.2208 18.0875 19.2893C18.0598 19.3578 18.0459 19.4311 18.0466 19.505C18.0472 19.5788 18.0624 19.6518 18.0913 19.7198C18.1201 19.7878 18.1621 19.8495 18.2148 19.9012L20.5061 22.1512C20.6112 22.2543 20.7526 22.312 20.8998 22.312C21.0471 22.312 21.1884 22.2543 21.2936 22.1512L29.6936 13.9012C29.7999 13.7968 29.8604 13.6544 29.8618 13.5053C29.8632 13.3562 29.8054 13.2127 29.7011 13.1062Z" fill="#8E8E8E"/>
  </svg>
  );
}

export const RequestRejectBtn = ({action}) => {
  return (
    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={action} className="cursor-pointer hover:opacity-50">
    <path d="M1.2998 18C1.2998 8.33502 9.13482 0.5 18.7998 0.5C28.4648 0.5 36.2998 8.33502 36.2998 18C36.2998 27.665 28.4648 35.5 18.7998 35.5C9.13482 35.5 1.2998 27.665 1.2998 18Z" fill="#1C1C1C"/>
    <path d="M1.2998 18C1.2998 8.33502 9.13482 0.5 18.7998 0.5C28.4648 0.5 36.2998 8.33502 36.2998 18C36.2998 27.665 28.4648 35.5 18.7998 35.5C9.13482 35.5 1.2998 27.665 1.2998 18Z" stroke="#E44A34"/>
    <path d="M18.7997 16.586L13.5067 11.293C13.3181 11.1109 13.0655 11.0101 12.8033 11.0123C12.5411 11.0146 12.2903 11.1198 12.1049 11.3052C11.9195 11.4906 11.8143 11.7414 11.812 12.0036C11.8098 12.2658 11.9106 12.5184 12.0927 12.707L17.3857 18L12.0927 23.293C11.9106 23.4816 11.8098 23.7342 11.812 23.9964C11.8143 24.2586 11.9195 24.5094 12.1049 24.6948C12.2903 24.8802 12.5411 24.9854 12.8033 24.9877C13.0655 24.99 13.3181 24.8892 13.5067 24.707L18.7997 19.414L24.0927 24.707C24.2813 24.8892 24.5339 24.99 24.7961 24.9877C25.0583 24.9854 25.3091 24.8802 25.4945 24.6948C25.68 24.5094 25.7851 24.2586 25.7874 23.9964C25.7897 23.7342 25.6889 23.4816 25.5067 23.293L20.2137 18L25.5067 12.707C25.6022 12.6148 25.6784 12.5044 25.7308 12.3824C25.7832 12.2604 25.8108 12.1292 25.812 11.9964C25.8131 11.8636 25.7878 11.732 25.7375 11.6091C25.6873 11.4862 25.613 11.3745 25.5191 11.2806C25.4252 11.1867 25.3136 11.1125 25.1907 11.0622C25.0678 11.0119 24.9361 10.9866 24.8033 10.9878C24.6705 10.9889 24.5393 11.0165 24.4173 11.0689C24.2953 11.1213 24.185 11.1975 24.0927 11.293L18.7997 16.586Z" fill="#8E8E8E"/>
  </svg>
    
  );
}