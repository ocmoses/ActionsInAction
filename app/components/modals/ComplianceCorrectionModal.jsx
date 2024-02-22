import GenericModal from "./GenericModal.jsx";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import TextInput from "@/app/components/form/TextInput";
import FileInput from "@/app/components/form/FileInput";
import DatePicker from "@/app/components/form/DatePicker";
import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";
import PopUp, { SuccessCard } from "@/app/components/PopUps";

export default function ComplianceCorrectionModal({ rejected, closeAction }) {
  const {
    partner,
    compliancePartnerCorrection,
    compliancePartnerCorrectionFileUpload,
  } = usePartners();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [submitting, setSubmitting] = useState(false);

  const [successToast, setSuccessToast] = useState(false);

  const [data, setData] = useState({
    vas_license_id: "",
    nlrc_license_type: "",
    nlrc_license_id: "",
    shortcodes: "",
    pricing_shortcodes: "",
    ncc_issue_date: "",
    ncc_expiry_date: "",
    nlrc_issue_date: "",
    nlrc_expiry_date: "",
    shortcode_issue_date: "",
    shortcode_expiry_date: "",
    pricing_issue_date: "",
    pricing_expiry_date: "",
    ncc_doc: "",
    nlrc_doc: "",
    shortcode_doc: "",
    pricing_doc: "",
  });

  let today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const two_years_ago = new Date().setDate(today.getDate() - 739);
  const max_expiry = new Date().setDate(
    (data.AVL_issuing_date == "" ? today : data.AVL_issuing_date) + 739
  );

  const handleFormChange = (e) => {
    clearErrors();
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    clearErrors();

    const fieldValue = data[rejected.field];

    if (!fieldValue) {
      setError({ error: `${rejected.field} cannot be empty` });
      return;
    }

    switch (rejected.field) {
      case "vas_license_id":
      case "nlrc_license_type":
      case "nlrc_license_id":
      case "shortcodes":
      case "pricing_shortcodes":
      case "ncc_issue_date":
      case "ncc_expiry_date":
      case "nlrc_issue_date":
      case "nlrc_expiry_date":
      case "shortcode_issue_date":
      case "shortcode_expiry_date":
      case "pricing_issue_date":
      case "pricing_expiry_date":
        updateInfo(rejected.field, data[rejected.field]);
        break;
      case "ncc_doc":
      case "nlrc_doc":
      case "shortcode_doc":
      case "pricing_doc":
        uploadFile(rejected.field, data[rejected.field], rejected.field);
        break;
      default:
        break;
    }
  };

  const updateInfo = async (field, fieldValue) => {
    let formData = new FormData();
    formData.append("partner_uuid", partner?.uuid);
    formData.append("vas_partner_uuid", rejected.vas_partner_uuid);
    formData.append("category_uuid", rejected.category_uuid);
    formData.append("field_value", fieldValue);
    formData.append("category_stage", rejected.category_stage);
    formData.append("field", field);
    formData.append("shortcode_uuid", null);

    setSubmitting(true);

    clearErrors();

    compliancePartnerCorrection(formData)
      .then((resp) => {
        setSubmitting(false);
        if (resp.result.success) {
          setSuccessToast(true);
          closeAction();
        }
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.response), setSubmitting(false);
      });
  };

  const uploadFile = (file_title, file, field) => {
    let formData = new FormData();
    formData.append("partner_uuid", partner?.uuid);
    formData.append("vas_partner_uuid", rejected.vas_partner_uuid);
    formData.append("category_uuid", rejected.category_uuid);
    formData.append("type_of_file", file_title);
    formData.append("file", file);
    formData.append("category_stage", rejected.category_stage);
    formData.append("field", field);
    formData.append("shortcode_uuid", null);

    setSubmitting(true);

    clearErrors();

    compliancePartnerCorrectionFileUpload(formData)
      .then((resp) => {
        setSubmitting(false);
        if (resp["vas_partner"].status === "corrected") {
          setSuccessToast(true);
          closeAction();
        }
        console.log(resp);
      })
      .catch((error) => {
        console.log(error.response);
        setSubmitting(false);
      });
  };

  return (
    <GenericModal
      id="compliance_correction_modal"
      width={550}
      closeAction={() => {}}
    >
      <>
        <div className="flex flex-col pt-8 pb-4 relative">
          <div className="text-white text-2xl mb-4 flex-1">
            Update {rejected.field}
          </div>
          <div
            className="absolute top-4 -right-4 cursor-pointer"
            onClick={() => {
              clearErrors();
              closeAction();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="my-4 flex text-white flex-col overflow-y-auto">
          <div className="flex flex-col">
            <div className="my-2 flex flex-col space-y-1">
              {(() => {
                switch (rejected.field) {
                  case "vas_license_id":
                  case "nlrc_license_type":
                  case "nlrc_license_id":
                  case "shortcodes":
                  case "pricing_shortcodes":
                    return (
                      <TextInput
                        id={rejected.field}
                        label={rejected.field}
                        value={data[rejected.field]}
                        onChange={handleFormChange}
                        onBlur={handleFormChange}
                        errors={errors}
                      />
                    );
                  case "ncc_issue_date":
                  case "nlrc_issue_date":
                  case "shortcode_issue_date":
                  case "pricing_issue_date":
                    return (
                      <div>
                        <DatePicker
                          id={rejected.field}
                          label={rejected.field}
                          value={data.license_start_date}
                          onChange={(e) => handleFormChange(e)}
                          onBlur={(e) => handleFormChange(e)}
                          errors={errors}
                          min={two_years_ago}
                          max={today}
                          disabled={false}
                        />
                      </div>
                    );
                  case "ncc_expiry_date":
                  case "nlrc_expiry_date":
                  case "shortcode_expiry_date":
                  case "pricing_expiry_date":
                    return (
                      <>
                        <DatePicker
                          id={rejected.field}
                          label={rejected.field}
                          value={data.license_end_date}
                          onChange={(e) => handleFormChange(e)}
                          onBlur={(e) => handleFormChange(e)}
                          errors={errors}
                          min={tomorrow}
                          max={max_expiry}
                          disabled={false}
                        />
                      </>
                    );
                  case "ncc_doc":
                  case "nlrc_doc":
                  case "shortcode_doc":
                  case "pricing_doc":
                    return (
                      <FileInput
                        id={rejected.field}
                        doc_id={`${rejected.field}_doc`}
                        label={rejected.field}
                        value={rejected.field}
                        onChange={(e) =>
                          setData({ ...data, [rejected.field]: e.target.value })
                        }
                        errors={errors}
                        disabled={false}
                        style="flex-1"
                      />
                    );

                  default:
                    break;
                }
              })()}
            </div>
          </div>
        </div>
        {errors && errors["error"] && (
          <div className="mb-6">
            <FormErrors error={errors["error"]} />
          </div>
        )}
        <div className="flex py-4 px-2 space-x-4 justify-end">
          {submitting ? (
            <div className="flex justify-center items-center">
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            </div>
          ) : (
            <>
              <button
                className="ml-auto border-1 border-white/20 inline-flex  cursor-pointer text-white/80 hover:bg-white/10 p-4 py-2 rounded-full"
                onClick={() => {
                  closeAction();
                  clearErrors();
                }}
              >
                Cancel
              </button>
              <button
                className="ml-4  inline-flex text-white cursor-pointer bg-yellow-600 hover:bg-yellow-700 p-4 py-2 rounded-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          )}
        </div>
        {successToast && (
          <PopUp closePopUp={() => {}}>
            <SuccessCard
              action={() => setSuccessToast(false)}
              msg={
                "We’ll review your updates and share an updated contract for you to sign."
              }
            />
          </PopUp>
        )}
      </>
    </GenericModal>
  );
}
