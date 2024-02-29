import GenericModal from "./GenericModal.jsx";
import { useEffect, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import FileInput from "@/app/components/form/FileInput";
import usePartners from "@/hooks/usePartners";
import Success from "@/app/components/toasts/Success";
import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";
import DatePicker from "@/app/components/form/DatePicker";
import RemoteEndpoints from "@/app/modules/endpoints";

export default function IPCorrectionModal({ rejected, closeAction }) {
  console.log("REJECTED ARRAY", rejected);

  const { partner, ipFileUpload } = usePartners();

  const { user } = useUsers();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [submitting, setSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState(
    "Corrections submitted successfully"
  );
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () =>
    setTimeout(() => {
      setSuccessToast(false);
    }, 3000);

  const validateFiles = () => {
    console.log("FILES", files);

    if (!data.license_start_date || !data.license_end_date) {
      setError({ error: "Please fill licensing period" });
      return false;
    }

    for (const i in files) {
      if (files[i] == "") {
        console.log("The i we are looking for", i);
        setError({ error: "Please upload a/an " + filesMap[i] });
        return false;
      }
    }

    return true;
  };

  const sendUpdate = () => {
    if (!validateFiles()) {
      return;
    }
    setSubmitting(true);
    if (rejected.includes("licensing_period")) {
      updateLicenseInfo()
        .then((resp) => {
          console.log("RESP", resp);
          setSubmitting(false);

          if (resp.data) {
            setSuccessMessage("Updated successfully");
            setTimeout(() => {
              closeAction();

              location.reload();
            }, 2000);
            setSuccessToast(true);
          } else {
            setError({ error: resp.error });
          }
        })
        .catch((error) => console.log(error.response));
    } else {
      setSuccessToast(true);
      setTimeout(() => {
        setSubmitting(false);

        closeAction();

        location.reload();
      }, 2000);
    }
  };

  const filesMap = {
    // "service_details": "Service details",
    aggregator_and_vas_requirements: "Aggregator requirement",
    authorization_letter: "Authentication Letter",
    probate_of_will: "Probate of Will",
    licensing_period: "Licensing Period",
    video_file: "Authorization Video",
    authorization_video: "Authorization Video",
    agreement_letter_btw_content_and_vas_partner: "Agreement with VAS Partner",
    agreement_letter_btw_content_and_agent: "Agreement with Agent",
    agreement_letter_btw_content_and_record_label:
      "Agreement with Record Label",
    agreement_letter_btw_content_and_music_composer:
      "Agreement with Music Composer",
    agreement_letter_btw_record_label_and_vas_partner:
      "Agreement between Record Label and VAS Partner",
    content_creator_id_front: "Content Creator ID",
    agent_id_front: "Agent ID",
    other_content_proof_of_ownership: "Additional Proof",
  };

  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    physical_status_of_content_provider: "null",
    license_start_date: null,
    license_end_date: null,
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

  const [files, setFiles] = useState({});

  const uploadFile = (file_title, file) => {
    let formData = new FormData();
    formData.append("file_title", file_title);
    formData.append("licenser_type", "content_owner");
    formData.append("partner_uuid", partner?.uuid);
    formData.append(
      "partner_category_uuid",
      partner?.categories[0]?.category_uuid
    );
    formData.append("agg_plus_vas_requirement", "no");
    formData.append("file", file);

    setSubmitting(true);

    clearErrors();

    ipFileUpload(formData)
      .then((resp) => {
        console.log(resp.message);
        console.log(resp.message);
        setSubmitting(false);
        if (resp.error) {
          setError({ [file_title]: resp.error });
        } else {
          setFiles({ ...files, [file_title]: file_title });

          if (file_title == "authorization_video") {
            setFiles({ ...files, authorization_video: file_title });
            setFiles({ ...files, video_file: file_title });
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    for (const i of rejected) {
      console.log("I that we are looking for", i);
      if (i != "licensing_period" && i != "service_details") {
        setFiles({ ...files, [i]: "" });
      }
    }
  }, []);

  const updateLicenseInfo = async () => {
    if (!validateFiles()) {
      console.log("VAALIDATION FAILED");
      return;
    }

    clearErrors();

    setSubmitting(true);

    try {
      setSubmitting(true);
      const response = await fetch(`${RemoteEndpoints.SUBMIT_IP_DETAILS}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          apikey: process.env.NEXT_PUBLIC_APIKEY,
          token: user.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${user.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      console.log("UPDATED LICENSE PERIOD UPLOAD", result);

      setSubmitting(false);

      if (result?.success) {
        const data = result?.data;

        setSuccessMessage("Updated successfully");
        setSuccessToast(true);

        return {
          data,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  return (
    <GenericModal
      id="ip_correction_modal"
      width={550}
      height={510}
      closeAction={() => {}}
    >
      <>
        <div className="flex flex-col pt-8 pb-4 relative">
          <div className="text-white text-2xl mb-4 flex-1">
            Please upload the following files
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

        <div className="my-4 flex text-white flex-col h-[350px] overflow-y-auto">
          {rejected.map((rejection, index) => (
            <div key={index} className="flex flex-col">
              <div className="my-2 flex flex-col space-y-1">
                <p className="text-white font-mtn-bold">
                  {filesMap[rejection]}
                </p>
                {rejection == "video_file" && (
                  <FileInput
                    id="authorization_video"
                    doc_id="authorization_video_doc"
                    label="Authorization Video"
                    value={files.authorization_video}
                    onChange={(e) =>
                      uploadFile("authorization_video", e.target.value)
                    }
                    allowedtypes={[
                      "video/3gpp",
                      "video/mpeg",
                      "video/mp4",
                      "video/quicktime",
                    ]}
                    errors={errors}
                    maxSize={40 * 1024 * 1024}
                    disabled={false}
                    style="flex-1"
                  />
                )}
                {rejection != "licensing_period" ? (
                  <FileInput
                    id={rejection}
                    doc_id={`${rejection}_doc`}
                    label={filesMap[rejection]}
                    value={files[rejection]}
                    onChange={(e) => uploadFile(rejection, e.target.value)}
                    errors={errors}
                    disabled={false}
                    style="flex-1"
                  />
                ) : (
                  <div className="flex space-x-2 no-wrap items-center h-full">
                    <DatePicker
                      id="license_start_date"
                      label="Start date"
                      value={data.license_start_date}
                      onChange={(e) => handleFormChange(e)}
                      onBlur={(e) => handleFormChange(e)}
                      errors={errors}
                      min={two_years_ago}
                      max={today}
                      disabled={false}
                    />

                    <DatePicker
                      id="license_end_date"
                      label="End date"
                      value={data.license_end_date}
                      onChange={(e) => handleFormChange(e)}
                      onBlur={(e) => handleFormChange(e)}
                      errors={errors}
                      min={tomorrow}
                      max={max_expiry}
                      disabled={false}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
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
                onClick={() => closeAction()}
              >
                Cancel
              </button>
              <button
                className="ml-4  inline-flex text-white cursor-pointer bg-yellow-600 hover:bg-yellow-700 p-4 py-2 rounded-full"
                onClick={() => {
                  clearErrors();
                  sendUpdate();
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>

        <Success
          message={successMessage}
          visible={successToast}
          action={successAction}
        />
      </>
    </GenericModal>
  );
}
