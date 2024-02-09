"use client";
import { useState, useEffect, useCallback } from "react";
import SideDrawer from "@/app/components/dashboard/SideDrawer";
import useErrors from "@/hooks/useErrors";
import useAdmins from "@/hooks/useAdmins";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import FileViewer from "@/app/components/modals/FileViewer";
import Success from "@/app/components/toasts/Success";
import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";
import TextInput from "@/app/components/form/TextInput";
import { capitalizeFirst } from "@/app/modules/utilities";

export default function IPDrawer({
  request,
  openDrawer,
  closeAction,
  refresh,
}) {
  console.log("IP REQUEST", request);

  const {
    approveIPDetail,
    rejectIPDetail,
    addDynamicField,
    removeDynamicField,
    getDynamicFields,
  } = useAdmins();

  //Too bad I can't use approvals here. 
  let admin_approvals = useAdmins().approvals;

  const ipTypes = {
    CONTENT_OWNER: "content_owner",
    AGENT_AND_CONTENT: "agent_and_content",
    RECORD_LABEL: "record_label",
  };

  let ipArray = [];

  const expansion = {
    AGGREGATOR_AND_VAS: "aggregator-and-vas",
    PROBATE_OF_WILL: "probate_of_will",
    LICENSE_PERIOD: "license_period",
    AUTHORIZATION_LETTER: "authorization_letter",
    VIDEO_FILE: "video_file",
    AGREEMENT_WITH_VAS_PARTNER: "agreement_letter_btw_content_and_vas_partner",
    AGREEMENT_WITH_AGENT: "agreement_letter_btw_content_and_agent",
    AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
      "agreement_letter_btw_agent_and_vas_partner",
    AGREEMENT_WITH_RECORD_LABEL:
      "agreement_letter_btw_content_and_record_label",
    AGREEMENT_WITH_MUSIC_COMPOSER:
      "agreement_letter_btw_content_and_music_composer",
    AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER:
      "agreement_letter_btw_record_label_and_vas_partner",
    MEANS_OF_ID: "means_of_id",
    AGENT_ID: "means-of-agent-identification",
    ADDITIONAL_PROOF: "additional_proof",
    ADDITIONAL_REQUIREMENT_ONE: "additional_requirement_one",
    ADDITIONAL_REQUIREMENT_TWO: "additional_requirement_two",
    ADDITIONAL_REQUIREMENT_THREE: "additional_requirement_three",
  };

  const [expanded, setExpanded] = useState(null);

  const [declining, setDeclining] = useState(null);

  //Used to control the action of approving or declining
  const [approving, setApproving] = useState(false);

  const [typedReason, setTypedReason] = useState("");

  const [fileViewer, setFileViewer] = useState(null);

  const [data, setData] = useState({
    partner_uuid: request?.partner_uuid,
    ip_request_type: "",
    status: "",
    reasons_for_rejection: "",
    dynamic_field_number: null,
  });

  const [newRequest, setNewRequest] = useState({
    partner_uuid: request?.partner_uuid,
    request_name: "",
    request_type: "",
    pdfAllowed: false,
    videoAllowed: false,
    imageAllowed: false,
  });

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () =>
    setTimeout(() => {
      setSuccessToast(false);
      refresh();
    }, 3000);

  const [addingRequest, setAddingRequest] = useState(false);

  const [progressing, setProgressing] = useState(false);

  const [dynamicFieldName, setDynamicFieldName] = useState("");

  const [collapseAdded, setCollapseAdded] = useState(false);

  const [approvals, setApprovals] = useState({ ...expansion });

  const [dynamicResponse, setDynamicResponse] = useState({});
  const [hasDynamicField, setHasDynamicField] = useState(false);

  const [dynamicFields, setDynamicFields] = useState([]);

  const reasons = [
    "",
    "Incomplete Information",
    "Wrong document",
    "Inconsistent Information",
    "Invalid or Expired Document",
    "Poor Quality (Contents Not Clear)",
    "Others",
  ];

  const handleChange = (e) => {
    setTypedReason(e.target.value);
    console.log("Typed reason", typedReason);
  };

  const processDynamicFields = (data) => {
    setDynamicResponse(data);

    // console.log("DYNAMIC SHIT", dynamicResponse[dynamicResponse.request_name_one][dynamicResponse.request_name_one + "_status"])

    let dynamicFields = [];
    if (
      data.request_name_one &&
      (data[data.request_name_one] + "_status" == null || "rejected")
    ) {
      setHasDynamicField(true);
      dynamicFields.push([
        data.request_name_one,
        "one",
        data[data.request_name_one[data.request_name_one]],
      ]);
    }

    if (
      data.request_name_two &&
      (data[data.request_name_two] + "_status" == null || "rejected")
    ) {
      setHasDynamicField(true);
      dynamicFields.push([
        data.request_name_two,
        "two",
        data[data.request_name_one[data.request_name_one]],
      ]);
    }

    if (
      data.request_name_twothree &&
      (data[data.request_name_three] + "_status" == null || "approved")
    ) {
      setHasDynamicField(true);
      dynamicFields.push([
        data.request_name_three,
        "three",
        data[data.request_name_one[data.request_name_one]],
      ]);
    }

    setDynamicFields(dynamicFields);
  };

  const approve = () => {
    clearErrors();

    setApprovalType();

    setApproving(true);

    data.reasons_for_rejection = "";
    data.status = "approved";

    setTimeout(() => {
      approveIPDetail(data)
        .then((resp) => {
          setApproving(false);
          resp.error
            ? setError({ error: resp.error })
            : showSuccess(resp.message);
          switch (expanded) {
            case expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER]: "approved",
              });
              break;

            case expansion.PROBATE_OF_WILL:
              setApprovals({
                ...approvals,
                [expansion.PROBATE_OF_WILL]: "approved",
              });
              break;
            case expansion.LICENSE_PERIOD:
              setApprovals({
                ...approvals,
                [expansion.LICENSE_PERIOD]: "approved",
              });
              break;
            case expansion.AUTHORIZATION_LETTER:
              setApprovals({
                ...approvals,
                [expansion.AUTHORIZATION_LETTER]: "approved",
              });
              break;
            case expansion.VIDEO_FILE:
              setApprovals({
                ...approvals,
                [expansion.VIDEO_FILE]: "approved",
              });
              break;
            case expansion.AGREEMENT_WITH_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_VAS_PARTNER]: "approved",
              });
              break;
            case expansion.AGREEMENT_WITH_AGENT:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_AGENT]: "approved",
              });
              break;
            case expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER]: "approved",
              });
              break;
            case expansion.AGREEMENT_WITH_RECORD_LABEL:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_RECORD_LABEL]: "approved",
              });
              break;
            case expansion.AGREEMENT_WITH_MUSIC_COMPOSER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_MUSIC_COMPOSER]: "approved",
              });
              break;
            case expansion.AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER]:
                  "approved",
              });
              break;
            case expansion.MEANS_OF_ID:
              setApprovals({
                ...approvals,
                [expansion.MEANS_OF_ID]: "approved",
              });
              break;
            case expansion.AGENT_ID:
              setApprovals({ ...approvals, [expansion.AGENT_ID]: "approved" });
              break;
            case expansion.ADDITIONAL_PROOF:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_PROOF]: "approved",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_ONE:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_ONE]: "approved",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_TWO:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_TWO]: "approved",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_THREE:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_THREE]: "approved",
              });
              break;
            default:
              break;
          }

          setDeclining(false);
        })
        .catch((error) => {
          console.log(error);
          setError({ error: "An error occurred" });
        });
    }, 500);
  };

  const reject = () => {
    clearErrors();

    setApprovalType();

    setApproving(true);

    data.status = "rejected";

    if (
      typedReason.trim().length == 0 &&
      data.reasons_for_rejection.trim().length == 0
    ) {
      setError({ error: "You must select or enter a rejection reason" });
      return;
    }

    if (typedReason.trim().length > 5) {
      //talk about magikkkk numbers
      setData({ ...data, reasons_for_rejection: typedReason });
    }

    setTimeout(() => {
      rejectIPDetail(data)
        .then((resp) => {
          setApproving(false);
          resp.error
            ? setError({ error: resp.error })
            : showSuccess("Rejected successfully");
          switch (expanded) {
            case expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER]: "rejected",
              });
              break;
            case expansion.PROBATE_OF_WILL:
              setApprovals({
                ...approvals,
                [expansion.PROBATE_OF_WILL]: "rejected",
              });
              break;
            case expansion.LICENSE_PERIOD:
              setApprovals({
                ...approvals,
                [expansion.LICENSE_PERIOD]: "rejected",
              });
              break;
            case expansion.AUTHORIZATION_LETTER:
              setApprovals({
                ...approvals,
                [expansion.AUTHORIZATION_LETTER]: "rejected",
              });
              break;
            case expansion.VIDEO_FILE:
              setApprovals({
                ...approvals,
                [expansion.VIDEO_FILE]: "rejected",
              });
              break;
            case expansion.AGREEMENT_WITH_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_VAS_PARTNER]: "rejected",
              });
              break;
            case expansion.AGREEMENT_WITH_AGENT:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_AGENT]: "rejected",
              });
              break;
            case expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER]: "rejected",
              });
              break;
            case expansion.AGREEMENT_WITH_RECORD_LABEL:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_RECORD_LABEL]: "rejected",
              });
              break;
            case expansion.AGREEMENT_WITH_MUSIC_COMPOSER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_WITH_MUSIC_COMPOSER]: "rejected",
              });
              break;
            case expansion.AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER:
              setApprovals({
                ...approvals,
                [expansion.AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER]:
                  "rejected",
              });
              break;
            case expansion.MEANS_OF_ID:
              setApprovals({
                ...approvals,
                [expansion.MEANS_OF_ID]: "rejected",
              });
              break;
            case expansion.AGENT_ID:
              setApprovals({ ...approvals, [expansion.AGENT_ID]: "rejected" });
              break;
            case expansion.ADDITIONAL_PROOF:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_PROOF]: "rejected",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_ONE:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_ONE]: "rejected",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_TWO:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_TWO]: "rejected",
              });
              break;
            case expansion.ADDITIONAL_REQUIREMENT_THREE:
              setApprovals({
                ...approvals,
                [expansion.ADDITIONAL_REQUIREMENT_THREE]: "rejected",
              });
              break;
            default:
              break;
          }

          setDeclining(false);
        })
        .catch((error) => {
          console.log(error);
          setError({ error: "An error occurred" });
        });
    }, 500);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setSuccessToast(true);
  };

  const addNewRequest = () => {
    if (!validateNewRequest()) {
      return;
    }

    clearErrors();

    setProgressing(true);

    addDynamicField(newRequest)
      .then((resp) => {
        setProgressing(false);
        showSuccess(resp.message);
        setDynamicFieldName(capitalizeFirst(newRequest.request_name));
        setCollapseAdded(true);
      })
      .catch((error) => setError({ error: error.response.data.message }));
  };

  const deleteDynamicField = (fieldName) => {
    //call endpoint to remove dynamic field
    let data = { partner_uuid: request?.partner_uuid, request_name: fieldName };
    removeDynamicField(data)
      .then((resp) => {console.log("REMOVE FIELD RESPONSE", resp); showSuccess(resp.message) })
      .catch((error) => setError({ error: error.response.data.message }));
  };

  const validateNewRequest = () => {
    if (newRequest.request_name.trim() == "") {
      setError({ error: "Please enter a request name" });
      return false;
    } else if (newRequest.request_type.trim() == "") {
      setError({ error: "Please select a request type" });
      return false;
    }

    return true;
  };

  const tabs = [1, 2, 3];

  // 'service-details', 'aggregator-and-vas', 'probate-of-will', 'licensing-period',
  // 'authorization-letter', 'authorization-video', 'agreement-letter', 'means-of-identification',
  // 'other-content-proof-of-ownership'

  const setApprovalType = () => {
    // console.log("Expanded is: ", expanded);
    switch (expanded) {
      case expansion.AGGREGATOR_AND_VAS:
        data.ip_request_type = "aggregator-and-vas";
        break;
      case expansion.PROBATE_OF_WILL:
        data.ip_request_type = "probate-of-will";
        break;
      case expansion.LICENSE_PERIOD:
        data.ip_request_type = "licensing-period";
        break;
      case expansion.AUTHORIZATION_LETTER:
        data.ip_request_type = "authorization-letter";
        break;
      case expansion.VIDEO_FILE:
        data.ip_request_type = "authorization-video";
        break;
      case expansion.AGREEMENT_WITH_VAS_PARTNER:
        data.ip_request_type = "agreement-letter-btw-content-and-vas-partner";
        break;
      case expansion.AGREEMENT_WITH_AGENT:
        data.ip_request_type = "agreement-letter-btw-content-and-agent";
        break;
      case expansion.AGREEMENT_BETWEEN_AGENT_AND_VAS_PARTNER:
        data.ip_request_type = "agreement-letter-btw-agent-and-vas-partner";
        break;
      case expansion.AGREEMENT_WITH_RECORD_LABEL:
        data.ip_request_type = "agreement-letter-btw-content-and-record-label";
        break;
      case expansion.AGREEMENT_WITH_MUSIC_COMPOSER:
        data.ip_request_type =
          "agreement-letter-btw-content-and-music-composer";
        break;
      case expansion.AGREEMENT_BETWEEN_RECORD_LABEL_AND_PARTNER:
        data.ip_request_type =
          "agreement-letter-btw-record-label-and-vas-partner";
        break;
      case expansion.MEANS_OF_ID:
        data.ip_request_type = "means-of-identification";
        break;
      case expansion.AGENT_ID:
        data.ip_request_type = "agent-id";
        break;
      case expansion.ADDITIONAL_PROOF:
        data.ip_request_type = "other-content-proof-of-ownership";
        break;
      case expansion.ADDITIONAL_REQUIREMENT_ONE:
        delete data.ip_request_type; // = "additional-requirement-one";
        break;
      case expansion.ADDITIONAL_REQUIREMENT_TWO:
        delete data.ip_request_type; // = "additional-requirement-two";
        break;
      case expansion.ADDITIONAL_REQUIREMENT_THREE:
        delete data.ip_request_type; // = "additional-requirement-three";
        break;
      default:
        data.ip_request_type = "service-details";
    }
  };

  useEffect(() => {
    getDynamicFields(request?.partner_uuid)
      .then((resp) => {
        processDynamicFields(resp.data);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <>
      <SideDrawer
        request={request}
        openDrawer={openDrawer}
        closeAction={() => closeAction()}
      >
        {addingRequest && (
          <div className="w-full h-full bg-black absolute z-10 top-0 left-0">
            <div className="bg-white/5 h-full flex flex-col space-y-8">
              <div className="p-4 border-b border-white/20 flex space-x-2 items-center">
                <span
                  onClick={() => {
                    setAddingRequest(false);
                    setCollapseAdded(false);
                    clearErrors();
                  }}
                  className="cursor-pointer w-8 h-8 rounded-full hover:bg-white/20 flex justify-center items-center"
                >
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="gray"
                  >
                    <path
                      d="M9.39749 16.1024C9.45276 16.1539 9.49709 16.216 9.52783 16.285C9.55857 16.354 9.5751 16.4285 9.57644 16.504C9.57777 16.5795 9.56388 16.6545 9.53559 16.7246C9.50729 16.7946 9.46519 16.8582 9.41177 16.9117C9.35836 16.9651 9.29473 17.0072 9.22469 17.0355C9.15465 17.0638 9.07963 17.0777 9.0041 17.0763C8.92857 17.075 8.85409 17.0585 8.78509 17.0277C8.71609 16.997 8.65399 16.9527 8.60249 16.8974L1.10249 9.39739C0.997156 9.29192 0.937988 9.14895 0.937988 8.99988C0.937988 8.85082 0.997156 8.70785 1.10249 8.60239L8.60249 1.10238C8.70912 1.00302 8.85016 0.948932 8.99588 0.951504C9.14161 0.954075 9.28065 1.01311 9.38371 1.11617C9.48677 1.21923 9.5458 1.35827 9.54837 1.50399C9.55095 1.64972 9.49685 1.79075 9.39749 1.89739L2.29593 8.99988L9.39749 16.1024Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="text-white">Add Request</span>
              </div>

              <div className="flex space-x-2 items-start w-full px-4">
                <span className="p-2 rounded-md bg-white/10 flex justify-center items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M9.24751 9.11244L7.39501 10.9649C6.36751 11.9924 6.36751 13.6499 7.39501 14.6774C8.42251 15.7049 10.08 15.7049 11.1075 14.6774L14.025 11.7599C16.0725 9.71244 16.0725 6.38244 14.025 4.33494C11.9775 2.28744 8.64751 2.28744 6.60001 4.33494L3.42001 7.51494C1.66501 9.26994 1.66501 12.1199 3.42001 13.8824"
                      stroke="#888888"
                      strokeWidth="1.5"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {collapseAdded && (
                  <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                    <div
                      className={`p-2  ${
                        expanded == tabs[1] && "border-b pb-4"
                      } border-white/20 flex space-x-2 items-center w-full relative`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="gray"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                      >
                        <path
                          d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                          fill="#8E8E8E"
                        />
                      </svg>
                      <span className="text-white/80 ml-2">
                        {dynamicFieldName}
                      </span>

                      <span
                        className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                        onClick={() => {
                          clearErrors();
                          expanded == tabs[1]
                            ? setExpanded(null)
                            : setExpanded(tabs[1]);
                          setData({ ...data, dynamic_field_number: null });
                        }}
                      >
                        {expanded == tabs[1] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="gray"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="gray"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                    {expanded == tabs[1] && (
                      <div className="flex flex-col space-y-4 p-4">
                        <p className="flex justify-between">
                          <span className="text-white/60">Type</span>
                          <span className="text-white">
                            {newRequest.request_type}
                          </span>
                        </p>
                        {/* <p className="flex justify-between">
                                                        <span className="text-white/60 ">New Shortcode</span>
                                                        <span className="text-white">DEF</span>
                                                    </p> */}

                        <div
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteDynamicField(dynamicFieldName)}
                        >
                          Remove
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!collapseAdded && (
                  <div className="flex-1 p-4 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-3">
                    <>
                      <TextInput
                        id="request_name"
                        label="Request name"
                        value={newRequest.request_name}
                        onChange={(e) => {
                          setNewRequest({
                            ...newRequest,
                            request_name: e.target.value,
                          });
                        }}
                        disabled={false}
                        errors={errors}
                      />

                      <div>
                        <p className="text-white">Choose request type</p>
                        <p className="text-white/60 text-sm">
                          This is the specific request category you would like
                          the partner to upload
                        </p>
                      </div>

                      <div className="flex flex-col space-y-3">
                        <div
                          className={`flex space-x-2 rounded-md p-2 px-3 border-1 ${
                            newRequest.pdfAllowed
                              ? "border-mtn"
                              : "border-white/40"
                          }`}
                        >
                          <label className="text-white/60">
                            <input
                              onChange={(e) =>
                                e.target.checked
                                  ? setNewRequest({
                                      ...newRequest,
                                      pdfAllowed: true,
                                      request_type: "pdf",
                                    })
                                  : setNewRequest({
                                      ...newRequest,
                                      pdfAllowed: false,
                                    })
                              }
                              type="radio"
                              value="pdf"
                              name="request_type"
                              className="h-5 w-5 rounded-md bg-black/40 focus:ring-mtn focus:border-2 text-mtn"
                            />
                            &nbsp;&nbsp;Doc (pdf, Word)
                          </label>
                        </div>
                        <div
                          className={`flex space-x-2 rounded-md p-2 px-3 border-1 ${
                            newRequest.videoAllowed
                              ? "border-mtn"
                              : "border-white/40"
                          }`}
                        >
                          <label className="text-white/60">
                            <input
                              onChange={(e) =>
                                e.target.checked
                                  ? setNewRequest({
                                      ...newRequest,
                                      videoAllowed: true,
                                      request_type: "video",
                                    })
                                  : setNewRequest({
                                      ...newRequest,
                                      videoAllowed: false,
                                    })
                              }
                              type="radio"
                              value="video"
                              name="request_type"
                              className="h-5 w-5 rounded-md bg-black/40 focus:ring-mtn focus:border-2 text-mtn"
                            />
                            &nbsp;&nbsp;Video (Mpeg, MP4, MOV)
                          </label>
                        </div>
                        <div
                          className={`flex space-x-2 rounded-md p-2 px-3 border-1 ${
                            newRequest.imageAllowed
                              ? "border-mtn"
                              : "border-white/40"
                          }`}
                        >
                          <label className="text-white/60">
                            <input
                              onChange={(e) =>
                                e.target.checked
                                  ? setNewRequest({
                                      ...newRequest,
                                      imageAllowed: true,
                                      request_type: "image",
                                    })
                                  : setNewRequest({
                                      ...newRequest,
                                      imageAllowed: false,
                                    })
                              }
                              type="radio"
                              value="image"
                              name="request_type"
                              className="h-5 w-5 rounded-md bg-black/40 focus:ring-mtn focus:border-2 text-mtn"
                            />
                            &nbsp;&nbsp;Image (Jpg, Png)
                          </label>
                        </div>
                      </div>

                      {errors && errors["error"] && (
                        <div className="mb-6">
                          <FormErrors error={errors["error"]} />
                        </div>
                      )}

                      {progressing && (
                        <TailSpinPreloader
                          width={40}
                          height={40}
                          fill="#efb703"
                        />
                      )}

                      {!progressing && (
                        <div className="flex py-4 px-2 space-x-4 justify-end max-w-4xl">
                          <button
                            className="border-1 border-white/20 w-[100px] text-white hover:bg-white/40 bg-white/20 p-4 py-2 rounded-full"
                            onClick={() => {
                              setAddingRequest(false);
                              clearErrors();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className=" text-black font-bold bg-mtn w-[100px] hover:bg-mtn-800 p-4 py-2 rounded-full"
                            onClick={() => addNewRequest()}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-8 border-b max-h-[500px] border-white/20 pb-8 pr-4 overflow-y-scroll">
          <div
            onClick={() => setAddingRequest(true)}
            className="flex space-x-2 ml-auto rounded-full bg-white/20 py-2 px-4 cursor-pointer hover:bg-white/40"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.335 2.5H4.1625C3.72158 2.5 3.29871 2.67516 2.98693 2.98693C2.67516 3.29871 2.5 3.72158 2.5 4.1625V15.8375C2.5 16.7558 3.24417 17.5 4.1625 17.5H15.8375C16.2784 17.5 16.7013 17.3248 17.0131 17.0131C17.3248 16.7013 17.5 16.2784 17.5 15.8375V6.665V9.16667H15.8333V15.8333H4.16667V4.16667H10.8333V2.5H13.335Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.8333 4.16667V3.325C15.8311 3.10543 15.7424 2.89561 15.5863 2.74112C15.4303 2.58664 15.2196 2.49999 15 2.5C14.5367 2.5 14.1667 2.87 14.1667 3.325V4.16667H13.3333C13.1123 4.16667 12.9004 4.25446 12.7441 4.41074C12.5878 4.56702 12.5 4.77899 12.5 5C12.5 5.22101 12.5878 5.43298 12.7441 5.58926C12.9004 5.74554 13.1123 5.83333 13.3333 5.83333H14.1667V6.675C14.1689 6.89457 14.2576 7.10439 14.4137 7.25888C14.5697 7.41336 14.7804 7.50001 15 7.5C15.4633 7.5 15.8333 7.13 15.8333 6.675V5.83333H16.6667C16.8877 5.83333 17.0996 5.74554 17.2559 5.58926C17.4122 5.43298 17.5 5.22101 17.5 5C17.5 4.77899 17.4122 4.56702 17.2559 4.41074C17.0996 4.25446 16.8877 4.16667 16.6667 4.16667H15.8333Z"
                fill="white"
              />
            </svg>
            <span className="text-white text-sm">Add New Request</span>
          </div>

          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">Content Owner</span>

                <span className="text-white absolute right-4 px-4 py-1 ">
                  {request.licenser_type == ipTypes.CONTENT_OWNER
                    ? "Content Creator"
                    : request.licenser_type == ipTypes.AGENT_AND_CONTENT
                    ? "Agent"
                    : "Record Label"}
                </span>
              </div>
            </div>
          </div>

          {/* Authorization letter */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.AUTHORIZATION_LETTER && "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">Authorization Letter</span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.AUTHORIZATION_LETTER
                      ? setExpanded(null)
                      : setExpanded(expansion.AUTHORIZATION_LETTER);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.AUTHORIZATION_LETTER ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.AUTHORIZATION_LETTER && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">Authorization letter</span>
                    <span className="text-mtn">
                      {request["authorization-letter"].authorization_letter ? (
                        <span
                          onClick={() =>
                            setFileViewer(
                              request["authorization-letter"]
                                .authorization_letter
                            )
                          }
                          className="text-xs flex space-x-1 items-end cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="yellow"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>{" "}
                          Preview
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["authorization-letter"]
                      .authorization_letter_status == "approved" ||
                    approvals[expansion.AUTHORIZATION_LETTER] == "approved" ? (
                      <Approved />
                    ) : request["authorization-letter"]
                        .authorization_letter_status == "rejected" ||
                      approvals[expansion.AUTHORIZATION_LETTER] ==
                        "rejected" ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* License period */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.LICENSE_PERIOD && "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">License period</span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.LICENSE_PERIOD
                      ? setExpanded(null)
                      : setExpanded(expansion.LICENSE_PERIOD);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.LICENSE_PERIOD ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.LICENSE_PERIOD && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">Start date</span>
                    <span className="text-white text-sm">
                      {request["licensing-period"].license_start_date
                        ? request["licensing-period"].license_start_date
                        : "-"}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span className="text-white/60 ">End date</span>
                    <span className="text-white text-sm">
                      {request["licensing-period"].license_end_date
                        ? request["licensing-period"].license_end_date
                        : "-"}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["licensing-period"].license_period_status ==
                      "approved" ||
                    approvals[expansion.LICENSE_PERIOD] == "approved" ? (
                      <Approved />
                    ) : request["licensing-period"].license_period_status ==
                        "rejected" ||
                      approvals[expansion.LICENSE_PERIOD] == "rejected" ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video file */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.VIDEO_FILE && "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">Authorization Video</span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.VIDEO_FILE
                      ? setExpanded(null)
                      : setExpanded(expansion.VIDEO_FILE);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.VIDEO_FILE ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.VIDEO_FILE && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">Video</span>
                    <span className="text-mtn">
                      {request["video-file"].authorization_video ? (
                        <span
                          onClick={() =>
                            setFileViewer(
                              request["video-file"].authorization_video
                            )
                          }
                          className="text-xs flex space-x-1 items-end cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="yellow"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>{" "}
                          Preview
                        </span>
                      ) : (
                        "-"
                      )}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["video-file"].authorization_video_status ==
                      "approved" ||
                    approvals[expansion.VIDEO_FILE] == "approved" ? (
                      <Approved />
                    ) : (request["video-file"].authorization_video_status ==
                        "rejected") |
                      (approvals[expansion.VIDEO_FILE] == "rejected") ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content creator's ID */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.MEANS_OF_ID && "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">Content Creator's ID</span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.MEANS_OF_ID
                      ? setExpanded(null)
                      : setExpanded(expansion.MEANS_OF_ID);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.MEANS_OF_ID ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.MEANS_OF_ID && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">
                      {request["means-of-identification"]
                        .content_creator_id_front
                        ? "Content Creator ID"
                        : request["means-of-identification"].agent_id_front
                        ? "Agent ID"
                        : "ID"}
                    </span>
                    <span className="text-mtn">
                      {request["means-of-identification"]
                        .content_creator_id_front ? (
                        <span
                          onClick={() =>
                            setFileViewer(
                              request["means-of-identification"]
                                .content_creator_id_front
                            )
                          }
                          className="text-xs flex space-x-1 items-end cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="yellow"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>{" "}
                          Preview
                        </span>
                      ) : request["means-of-identification"].agent_id_front ? (
                        request["means-of-identification"].agent_id_front
                      ) : (
                        "-"
                      )}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["means-of-identification"].means_of_id_status ==
                      "approved" ||
                    approvals[expansion.MEANS_OF_ID] == "approved" ? (
                      <Approved />
                    ) : request["means-of-identification"].means_of_id_status ==
                        "rejected" ||
                      approvals[expansion.MEANS_OF_ID] == "rejected" ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Agent's ID */}
          {request.licenser_type == ipTypes.AGENT_AND_CONTENT && (
            <div className="flex space-x-2 items-start w-full">
              <span className="p-2 rounded-md bg-white/10 inline-flex">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 16 15"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                <div
                  className={`p-2  ${
                    expanded == expansion.AGENT_ID && "border-b pb-4"
                  } border-white/20 flex space-x-2 items-center w-full relative`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                  <span className="text-white/80 ml-2">Agent ID</span>

                  <span
                    className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                    onClick={() => {
                      clearErrors();
                      expanded == expansion.AGENT_ID
                        ? setExpanded(null)
                        : setExpanded(expansion.AGENT_ID);
                      setData({ ...data, dynamic_field_number: null });
                    }}
                  >
                    {expanded == expansion.AGENT_ID ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {expanded == expansion.AGENT_ID && (
                  <div className="flex flex-col space-y-4 p-4">
                    <p className="flex justify-between">
                      <span className="text-white/60 ">Agent ID</span>
                      <span className="text-mtn">
                        {request["means-of-agent-identification"]
                          .agent_id_front ? (
                          <span
                            onClick={() =>
                              setFileViewer(
                                request["means-of-agent-identification"]
                                  .agent_id_front
                              )
                            }
                            className="text-xs flex space-x-1 items-end cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="yellow"
                              className="w-4 h-4 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>{" "}
                            Preview
                          </span>
                        ) : request["means-of-agent-identification"]
                            .agent_id_front ? (
                          request["means-of-agent-identification"]
                            .agent_id_front
                        ) : (
                          "-"
                        )}
                      </span>
                    </p>

                    {errors && errors["error"] && (
                      <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                      </div>
                    )}

                    <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                      {request["means-of-agent-identification"]
                        .means_of_id_status == "approved" ||
                      approvals[expansion.AGENT_ID] == "approved" ? (
                        <Approved />
                      ) : request["means-of-agent-identification"]
                          .means_of_id_status == "rejected" ||
                        approvals[expansion.AGENT_ID] == "rejected" ? (
                        <Declined />
                      ) : (
                        ApprovalActions()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Probate of will */}
          {request.licenser_type == ipTypes.AGENT_AND_CONTENT &&
            request["probate-of-will"].probate_of_will && (
              <div className="flex space-x-2 items-start w-full">
                <span className="p-2 rounded-md bg-white/10 inline-flex">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 16 15"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                      stroke="gray"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                  <div
                    className={`p-2  ${
                      expanded == expansion.PROBATE_OF_WILL && "border-b pb-4"
                    } border-white/20 flex space-x-2 items-center w-full relative`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="gray"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                        fill="#8E8E8E"
                      />
                    </svg>
                    <span className="text-white/80 ml-2">Probate of will</span>

                    <span
                      className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                      onClick={() => {
                        clearErrors();
                        expanded == expansion.PROBATE_OF_WILL
                          ? setExpanded(null)
                          : setExpanded(expansion.PROBATE_OF_WILL);
                        setData({ ...data, dynamic_field_number: null });
                      }}
                    >
                      {expanded == expansion.PROBATE_OF_WILL ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {expanded == expansion.PROBATE_OF_WILL && (
                    <div className="flex flex-col space-y-4 p-4">
                      <p className="flex justify-between">
                        <span className="text-white/60 ">Probabte of Will</span>
                        <span className="text-mtn">
                          {request["probate-of-will"].probate_of_will ? (
                            <span
                              onClick={() =>
                                setFileViewer(
                                  request["probate-of-will"].probate_of_will
                                )
                              }
                              className="text-xs flex space-x-1 items-end cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="yellow"
                                className="w-4 h-4 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>{" "}
                              Preview
                            </span>
                          ) : request["probate-of-will"].probate_of_will ? (
                            request["probate-of-will"].probate_of_will
                          ) : (
                            "-"
                          )}
                        </span>
                      </p>

                      {errors && errors["error"] && (
                        <div className="mb-6">
                          <FormErrors error={errors["error"]} />
                        </div>
                      )}

                      <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                        {request["probate-of-will"].probate_of_will_status ==
                          "approved" ||
                        approvals[expansion.PROBATE_OF_WILL] == "approved" ? (
                          <Approved />
                        ) : request["probate-of-will"].probate_of_will_status ==
                            "rejected" ||
                          approvals[expansion.PROBATE_OF_WILL] == "rejected" ? (
                          <Declined />
                        ) : (
                          ApprovalActions()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Agreement with vas partner */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.AGREEMENT_WITH_VAS_PARTNER &&
                  "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">
                  Agreement with VAS Partner
                </span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.AGREEMENT_WITH_VAS_PARTNER
                      ? setExpanded(null)
                      : setExpanded(expansion.AGREEMENT_WITH_VAS_PARTNER);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.AGREEMENT_WITH_VAS_PARTNER ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.AGREEMENT_WITH_VAS_PARTNER && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">
                      Agreement with VAS Partner
                    </span>
                    <span className="text-mtn">
                      {request["agreement-letter-btw-content-and-vas-partner"]
                        ?.agreement_letter_btw_content_and_vas_partner ? (
                        <span
                          onClick={() =>
                            setFileViewer(
                              request[
                                "agreement-letter-btw-content-and-vas-partner"
                              ]?.agreement_letter_btw_content_and_vas_partner
                            )
                          }
                          className="text-xs flex space-x-1 items-end cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="yellow"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>{" "}
                          Preview
                        </span>
                      ) : request[
                          "agreement-letter-btw-content-and-vas-partner"
                        ]?.agreement_letter_btw_content_and_vas_partner ? (
                        request["agreement-letter-btw-content-and-vas-partner"]
                          ?.agreement_letter_btw_content_and_vas_partner
                      ) : (
                        "-"
                      )}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["agreement-letter-btw-content-and-vas-partner"]
                      ?.agreement_letter_content_and_vas_partner_status ==
                      "approved" ||
                    approvals[expansion.AGREEMENT_WITH_VAS_PARTNER] ==
                      "approved" ? (
                      <Approved />
                    ) : request["agreement-letter-btw-content-and-vas-partner"]
                        ?.agreement_letter_content_and_vas_partner_status ==
                        "rejected" ||
                      approvals[expansion.AGREEMENT_WITH_VAS_PARTNER] ==
                        "rejected" ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* If this is an agent */}
          {/* Agreement btw content creator and agent */}
          {request.licenser_type == ipTypes.AGENT_AND_CONTENT && (
            <div className="flex space-x-2 items-start w-full">
              <span className="p-2 rounded-md bg-white/10 inline-flex">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 16 15"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                <div
                  className={`p-2  ${
                    expanded == expansion.AGREEMENT_WITH_AGENT &&
                    "border-b pb-4"
                  } border-white/20 flex space-x-2 items-center w-full relative`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                  <span className="text-white/80 ml-2">
                    Agreement with Agent
                  </span>

                  <span
                    className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                    onClick={() => {
                      clearErrors();
                      expanded == expansion.AGREEMENT_WITH_AGENT
                        ? setExpanded(null)
                        : setExpanded(expansion.AGREEMENT_WITH_AGENT);
                      setData({ ...data, dynamic_field_number: null });
                    }}
                  >
                    {expanded == expansion.AGREEMENT_WITH_AGENT ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {expanded == expansion.AGREEMENT_WITH_AGENT && (
                  <div className="flex flex-col space-y-4 p-4">
                    <p className="flex justify-between">
                      <span className="text-white/60 ">
                        Agreement with Agent
                      </span>
                      <span className="text-mtn">
                        {request["agreement-letter-btw-content-and-agent"]
                          .agreement_letter_btw_content_and_agent ? (
                          <span
                            onClick={() =>
                              setFileViewer(
                                request[
                                  "agreement-letter-btw-content-and-agent"
                                ].agreement_letter_btw_content_and_agent
                              )
                            }
                            className="text-xs flex space-x-1 items-end cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="yellow"
                              className="w-4 h-4 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>{" "}
                            Preview
                          </span>
                        ) : request["agreement-letter-btw-content-and-agent"]
                            .agreement_letter_btw_content_and_agent ? (
                          request["agreement_letter_btw_content_and_agent"]
                            .agreement_letter_btw_content_and_agent
                        ) : (
                          "-"
                        )}
                      </span>
                    </p>

                    {errors && errors["error"] && (
                      <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                      </div>
                    )}

                    <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                      {request["agreement-letter-btw-content-and-agent"]
                        .agreement_letter_content_and_agent_status ==
                        "approved" ||
                      approvals[expansion.AGREEMENT_WITH_AGENT] ==
                        "approved" ? (
                        <Approved />
                      ) : request["agreement-letter-btw-content-and-agent"]
                          .agreement_letter_content_and_agent_status ==
                          "rejected" ||
                        approvals[expansion.AGREEMENT_WITH_AGENT] ==
                          "approved" ? (
                        <Declined />
                      ) : (
                        ApprovalActions()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* If this is record label */}
          {/* Agreement btw content creator and record label */}
          {request.licenser_type == ipTypes.RECORD_LABEL && (
            <div className="flex space-x-2 items-start w-full">
              <span className="p-2 rounded-md bg-white/10 inline-flex">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 16 15"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                <div
                  className={`p-2  ${
                    expanded == expansion.AGREEMENT_WITH_RECORD_LABEL &&
                    "border-b pb-4"
                  } border-white/20 flex space-x-2 items-center w-full relative`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                  <span className="text-white/80 ml-2">
                    Agreement with Record Label
                  </span>

                  <span
                    className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                    onClick={() => {
                      clearErrors();
                      expanded == expansion.AGREEMENT_WITH_RECORD_LABEL
                        ? setExpanded(null)
                        : setExpanded(expansion.AGREEMENT_WITH_RECORD_LABEL);
                      setData({ ...data, dynamic_field_number: null });
                    }}
                  >
                    {expanded == expansion.AGREEMENT_WITH_RECORD_LABEL ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {expanded == expansion.AGREEMENT_WITH_RECORD_LABEL && (
                  <div className="flex flex-col space-y-4 p-4">
                    <p className="flex justify-between">
                      <span className="text-white/60 ">
                        Agreement with Record Label
                      </span>
                      <span className="text-mtn">
                        {request[
                          "agreement-letter-btw-content-and-record-label"
                        ].agreement_letter_btw_content_and_record_label ? (
                          <span
                            onClick={() =>
                              setFileViewer(
                                request[
                                  "agreement-letter-btw-content-and-record-label"
                                ].agreement_letter_btw_content_and_record_label
                              )
                            }
                            className="text-xs flex space-x-1 items-end cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="yellow"
                              className="w-4 h-4 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>{" "}
                            Preview
                          </span>
                        ) : request[
                            "agreement-letter-btw-content-and-record-label"
                          ].agreement_letter_btw_content_and_record_label ? (
                          request[
                            "agreement-letter-btw-content-and-record-label"
                          ].agreement_letter_btw_content_and_record_label
                        ) : (
                          "-"
                        )}
                      </span>
                    </p>

                    {errors && errors["error"] && (
                      <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                      </div>
                    )}

                    <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                      {request["agreement-letter-btw-content-and-record-label"]
                        .agreement_letter_btw_content_and_record_label ==
                        "approved" ||
                      approvals[expansion.AGREEMENT_WITH_RECORD_LABEL] ==
                        "approved" ? (
                        <Approved />
                      ) : request[
                          "agreement-letter-btw-content-and-record-label"
                        ].agreement_letter_btw_content_and_record_label ==
                          "rejected" ||
                        approvals[expansion.AGREEMENT_WITH_RECORD_LABEL] ==
                          "rejected" ? (
                        <Declined />
                      ) : (
                        ApprovalActions()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* If this is record label */}
          {/* Agreement btw content creator and composer */}
          {request.licenser_type == ipTypes.RECORD_LABEL && (
            <div className="flex space-x-2 items-start w-full">
              <span className="p-2 rounded-md bg-white/10 inline-flex">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 16 15"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                <div
                  className={`p-2  ${
                    expanded == expansion.AGREEMENT_WITH_MUSIC_COMPOSER &&
                    "border-b pb-4"
                  } border-white/20 flex space-x-2 items-center w-full relative`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                  <span className="text-white/80 ml-2">
                    Agreement with Composer
                  </span>

                  <span
                    className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                    onClick={() => {
                      clearErrors();
                      expanded == expansion.AGREEMENT_WITH_MUSIC_COMPOSER
                        ? setExpanded(null)
                        : setExpanded(expansion.AGREEMENT_WITH_MUSIC_COMPOSER);
                      setData({ ...data, dynamic_field_number: null });
                    }}
                  >
                    {expanded == expansion.AGREEMENT_WITH_MUSIC_COMPOSER ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {expanded == expansion.AGREEMENT_WITH_MUSIC_COMPOSER && (
                  <div className="flex flex-col space-y-4 p-4">
                    <p className="flex justify-between">
                      <span className="text-white/60 ">
                        Agreement with Composer
                      </span>
                      <span className="text-mtn">
                        {request[
                          "agreement-letter-btw-content-and-music-composer"
                        ].agreement_letter_btw_content_and_music_composer ? (
                          <span
                            onClick={() =>
                              setFileViewer(
                                request[
                                  "agreement-letter-btw-content-and-music-composer"
                                ]
                                  .agreement_letter_btw_content_and_music_composer
                              )
                            }
                            className="text-xs flex space-x-1 items-end cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="yellow"
                              className="w-4 h-4 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>{" "}
                            Preview
                          </span>
                        ) : request[
                            "agreement-letter-btw-content-and-music-composer"
                          ].agreement_letter_btw_content_and_music_composer ? (
                          request[
                            "agreement-letter-btw-content-and-music-composer"
                          ].agreement_letter_btw_content_and_music_composer
                        ) : (
                          "-"
                        )}
                      </span>
                    </p>

                    {errors && errors["error"] && (
                      <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                      </div>
                    )}

                    <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                      {request[
                        "agreement-letter-btw-content-and-music-composer"
                      ].agreement_letter_content_and_music_composer_status ==
                        "approved" ||
                      approvals[expansion.AGREEMENT_WITH_MUSIC_COMPOSER] ==
                        "approved" ? (
                        <Approved />
                      ) : request[
                          "agreement-letter-btw-content-and-music-composer"
                        ].agreement_letter_content_and_music_composer_status ==
                          "rejected" ||
                        approvals[expansion.AGREEMENT_WITH_MUSIC_COMPOSER] ==
                          "rejected" ? (
                        <Declined />
                      ) : (
                        ApprovalActions()
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Proof */}
          <div className="flex space-x-2 items-start w-full">
            <span className="p-2 rounded-md bg-white/10 inline-flex">
              <svg
                className="w-6 h-6"
                viewBox="0 0 16 15"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                  stroke="gray"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
              <div
                className={`p-2  ${
                  expanded == expansion.ADDITIONAL_PROOF && "border-b pb-4"
                } border-white/20 flex space-x-2 items-center w-full relative`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-white/80 ml-2">Additional Proof</span>

                <span
                  className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                  onClick={() => {
                    clearErrors();
                    expanded == expansion.ADDITIONAL_PROOF
                      ? setExpanded(null)
                      : setExpanded(expansion.ADDITIONAL_PROOF);
                    setData({ ...data, dynamic_field_number: null });
                  }}
                >
                  {expanded == expansion.ADDITIONAL_PROOF ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="gray"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {expanded == expansion.ADDITIONAL_PROOF && (
                <div className="flex flex-col space-y-4 p-4">
                  <p className="flex justify-between">
                    <span className="text-white/60 ">File</span>
                    <span className="text-mtn">
                      {request["other-content-proof-of-ownership"]
                        .other_content_proof_of_ownership ? (
                        <span
                          onClick={() =>
                            setFileViewer(
                              request["other-content-proof-of-ownership"]
                                .other_content_proof_of_ownership
                            )
                          }
                          className="text-xs flex space-x-1 items-end cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="yellow"
                            className="w-4 h-4 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>{" "}
                          Preview
                        </span>
                      ) : (
                        "-"
                      )}
                    </span>
                  </p>

                  {errors && errors["error"] && (
                    <div className="mb-6">
                      <FormErrors error={errors["error"]} />
                    </div>
                  )}

                  <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                    {request["other-content-proof-of-ownership"]
                      .other_content_proof_of_ownership_status == "approved" ||
                    approvals[expansion.ADDITIONAL_PROOF] == "approved" ? (
                      <Approved />
                    ) : request["other-content-proof-of-ownership"]
                        .other_content_proof_of_ownership_status ==
                        "rejected" ||
                      approvals[expansion.ADDITIONAL_PROOF] == "rejected" ? (
                      <Declined />
                    ) : (
                      ApprovalActions()
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Requirement One */}
          {hasDynamicField &&
            dynamicFields.find((field) => field[1] == "one") != null && (
              <div className="flex space-x-2 items-start w-full">
                <span className="p-2 rounded-md bg-white/10 inline-flex">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 16 15"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                      stroke="gray"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                  <div
                    className={`p-2  ${
                      expanded == expansion.ADDITIONAL_REQUIREMENT_ONE &&
                      "border-b pb-4"
                    } border-white/20 flex space-x-2 items-center w-full relative`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="gray"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                        fill="#8E8E8E"
                      />
                    </svg>
                    <span className="text-white/80 ml-2">
                      {dynamicFields[0][0]}
                    </span>

                    <span
                      className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                      onClick={() => {
                        clearErrors();
                        expanded == expansion.ADDITIONAL_REQUIREMENT_ONE
                          ? setExpanded(null)
                          : setExpanded(expansion.ADDITIONAL_REQUIREMENT_ONE);
                        setData({ ...data, dynamic_field_number: "one" });
                      }}
                    >
                      {expanded == expansion.ADDITIONAL_REQUIREMENT_ONE ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {expanded == expansion.ADDITIONAL_REQUIREMENT_ONE && (
                    <div className="flex flex-col space-y-4 p-4">
                      <p className="flex justify-between">
                        <span className="text-white/60 ">File</span>
                        <span className="text-mtn">
                          {dynamicResponse[dynamicResponse.request_name_one][
                            dynamicResponse.request_name_one
                          ] ? (
                            <span
                              onClick={() =>
                                setFileViewer(
                                  dynamicResponse[
                                    dynamicResponse.request_name_one
                                  ][dynamicResponse.request_name_one]
                                )
                              }
                              className="text-xs flex space-x-1 items-end cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="yellow"
                                className="w-4 h-4 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>{" "}
                              Preview
                            </span>
                          ) : (
                            "-"
                          )}
                        </span>
                      </p>

                      {errors && errors["error"] && (
                        <div className="mb-6">
                          <FormErrors error={errors["error"]} />
                        </div>
                      )}

                      <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                        {dynamicResponse[dynamicResponse.request_name_one][
                          dynamicResponse.request_name_one + "_status"
                        ] == "approved" ||
                        approvals[expansion.ADDITIONAL_REQUIREMENT_ONE] ==
                          "approved" ? (
                          <Approved />
                        ) : dynamicResponse[dynamicResponse.request_name_one][
                            dynamicResponse.request_name_one + "_status"
                          ] == "rejected" ||
                          approvals[expansion.ADDITIONAL_REQUIREMENT_ONE] ==
                            "rejected" ? (
                          <Declined />
                        ) : (
                          ApprovalActions()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Additional Requirement two */}
          {hasDynamicField &&
            dynamicFields.find((field) => field[1] == "two") != null && (
              <div className="flex space-x-2 items-start w-full">
                <span className="p-2 rounded-md bg-white/10 inline-flex">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 16 15"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                      stroke="gray"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                  <div
                    className={`p-2  ${
                      expanded == expansion.ADDITIONAL_REQUIREMENT_TWO &&
                      "border-b pb-4"
                    } border-white/20 flex space-x-2 items-center w-full relative`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="gray"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                        fill="#8E8E8E"
                      />
                    </svg>
                    <span className="text-white/80 ml-2">
                      {dynamicFields[1][0]}
                    </span>

                    <span
                      className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                      onClick={() => {
                        clearErrors();
                        expanded == expansion.ADDITIONAL_REQUIREMENT_TWO
                          ? setExpanded(null)
                          : setExpanded(expansion.ADDITIONAL_REQUIREMENT_TWO);
                        setData({ ...data, dynamic_field_number: "two" });
                      }}
                    >
                      {expanded == expansion.ADDITIONAL_REQUIREMENT_TWO ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {expanded == expansion.ADDITIONAL_REQUIREMENT_TWO && (
                    <div className="flex flex-col space-y-4 p-4">
                      <p className="flex justify-between">
                        <span className="text-white/60 ">File</span>
                        <span className="text-mtn">
                          {dynamicResponse[dynamicResponse.request_name_two] &&
                          dynamicResponse[dynamicResponse.request_name_two][
                            dynamicResponse.request_name_two
                          ] ? (
                            <span
                              onClick={() =>
                                setFileViewer(
                                  dynamicResponse[
                                    dynamicResponse.request_name_two
                                  ][dynamicResponse.request_name_two]
                                )
                              }
                              className="text-xs flex space-x-1 items-end cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="yellow"
                                className="w-4 h-4 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>{" "}
                              Preview
                            </span>
                          ) : (
                            "-"
                          )}
                        </span>
                      </p>

                      {errors && errors["error"] && (
                        <div className="mb-6">
                          <FormErrors error={errors["error"]} />
                        </div>
                      )}

                      <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                        {dynamicResponse[dynamicResponse.request_name_two][
                          dynamicResponse.request_name_two + "_status"
                        ] == "approved" ||
                        approvals[expansion.ADDITIONAL_REQUIREMENT_TWO] ==
                          "approved" ? (
                          <Approved />
                        ) : dynamicResponse[dynamicResponse.request_name_two][
                            dynamicResponse.request_name_two + "_status"
                          ] == "rejected" ||
                          approvals[expansion.ADDITIONAL_REQUIREMENT_TWO] ==
                            "rejected" ? (
                          <Declined />
                        ) : (
                          ApprovalActions()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Additional Requirement two */}
          {hasDynamicField &&
            dynamicFields.find((field) => field[1] == "three") != null && (
              <div className="flex space-x-2 items-start w-full">
                <span className="p-2 rounded-md bg-white/10 inline-flex">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 16 15"
                    fill="gray"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824"
                      stroke="gray"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                  <div
                    className={`p-2  ${
                      expanded == expansion.ADDITIONAL_REQUIREMENT_THREE &&
                      "border-b pb-4"
                    } border-white/20 flex space-x-2 items-center w-full relative`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="gray"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z"
                        fill="#8E8E8E"
                      />
                    </svg>
                    <span className="text-white/80 ml-2">
                      {dynamicFields[2][0]}
                    </span>

                    <span
                      className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer"
                      onClick={() => {
                        clearErrors();
                        expanded == expansion.ADDITIONAL_REQUIREMENT_THREE
                          ? setExpanded(null)
                          : setExpanded(expansion.ADDITIONAL_REQUIREMENT_THREE);
                        setData({ ...data, dynamic_field_number: "three" });
                      }}
                    >
                      {expanded == expansion.ADDITIONAL_REQUIREMENT_THREE ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="gray"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {expanded == expansion.ADDITIONAL_REQUIREMENT_THREE && (
                    <div className="flex flex-col space-y-4 p-4">
                      <p className="flex justify-between">
                        <span className="text-white/60 ">File</span>
                        <span className="text-mtn">
                          {dynamicResponse[dynamicResponse.request_name_three][
                            dynamicResponse.request_name_three
                          ] ? (
                            <span
                              onClick={() =>
                                setFileViewer(
                                  dynamicResponse[
                                    dynamicResponse.request_name_three
                                  ][dynamicResponse.request_name_three]
                                )
                              }
                              className="text-xs flex space-x-1 items-end cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="yellow"
                                className="w-4 h-4 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>{" "}
                              Preview
                            </span>
                          ) : (
                            "-"
                          )}
                        </span>
                      </p>

                      {errors && errors["error"] && (
                        <div className="mb-6">
                          <FormErrors error={errors["error"]} />
                        </div>
                      )}

                      <div className="pt-4 border-t border-dashed border-white/20 flex space-x-4">
                        {dynamicResponse[dynamicResponse.request_name_three][
                          dynamicResponse.request_name_three + "_status"
                        ] == "approved" ||
                        approvals[expansion.ADDITIONAL_REQUIREMENT_THREE] ==
                          "approved" ? (
                          <Approved />
                        ) : dynamicResponse[dynamicResponse.request_name_three][
                            dynamicResponse.request_name_three + "_status"
                          ] == "rejected" ||
                          approvals[expansion.ADDITIONAL_REQUIREMENT_THREE] ==
                            "rejected" ? (
                          <Declined />
                        ) : (
                          ApprovalActions()
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </SideDrawer>
      {fileViewer && (
        <FileViewer
          id="file_viewer"
          link={fileViewer}
          closeAction={() => setFileViewer(null)}
        />
      )}

      <Success
        message={successMessage}
        visible={successToast}
        action={successAction}
      />
    </>
  );

  function Approved() {
    return (
      <div className="flex space-x-2 text-green-600 text-xs items-start justify-start w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
        <span>Approved</span>
      </div>
    );
  }

  function Declined() {
    return (
      <div className="flex space-x-2 text-red-600 text-xs items-start justify-start w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
        <span>Declined</span>
      </div>
    );
  }

  function ApprovalActions() {
    if(!admin_approvals.can_approve.includes("ip_compliance")){
      return <></>
    }

    return declining != request ? (
      <>
        <span
          onClick={() => approve()}
          className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="green"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>

          <span className="text-white">Approve</span>
        </span>
        <span
          onClick={() => setDeclining(request)}
          className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <span className="text-white">Reject</span>
        </span>
      </>
    ) : (
      <>
        <div className="border-1 border-white/20 rounded-xl flex flex-col relative w-full">
          <div className="m-2 -mb-4">
            <SelectInput
              id="service"
              label="Select reason"
              value={data.reasons_for_rejection}
              onChange={(e) => {
                setData({ ...data, reasons_for_rejection: e.target.value });
                setSelectField("reason");
              }}
              errors={errors}
              disabled={false}
            >
              {reasons.map((r) => (
                <SelectInputOption key={r} value={r} label={r} />
              ))}
            </SelectInput>
          </div>

          <textarea
            onKeyUp={(e) => handleChange(e)}
            onBlur={(e) => handleChange(e)}
            className="rounded p-4 mb-4 border-1 border-white/20 bg-white/10 text-white m-4"
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
                      setDeclining(false);
                      setTypedReason("");
                    }}
                    className="border-1 border-white/20 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer"
                  >
                    Cancel
                  </span>

                  <span
                    onClick={() => reject()}
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
      </>
    );
  }
}
