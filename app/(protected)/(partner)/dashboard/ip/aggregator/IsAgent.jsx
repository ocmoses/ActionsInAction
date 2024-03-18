"use client";
import { useState } from "react";

import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";
import FileInput from "@/app/components/form/FileInput";
import DatePicker from "@/app/components/form/DatePicker";
import RemoteEndpoints from "@/app/modules/endpoints";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";
import PopUp, { SuccessCard } from "@/app/components/PopUps";
import Success from "@/app/components/toasts/Success";

export default function IsAgent({ params }) {
  const { partner, ipFileUpload } = usePartners();

  const { user } = useUsers();

  const router = useRouter();

  const { Logout } = useLogout();

  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successToast, setSuccessToast] = useState(false);
  const [ownerIsAlive, setOwnerIsAlive] = useState(false);

  const [files, setFiles] = useState({
    authorization_letter: "",
    authorization_video: "",
    agreement_letter: "",
    content_creator_id: "",
    other_content_proof_of_ownership: "",
  });

  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    physical_status_of_content_provider: "null",
    license_start_date: "",
    license_end_date: "",
    vas_partner_uuid: params,
  });

  const [submitting, setSubmitting] = useState(false);

  let today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const two_years_ago = new Date().setDate(today.getDate() - 739);
  const max_expiry = new Date().setDate(
    (data.AVL_issuing_date == "" ? today : data.AVL_issuing_date) + 739
  );

  const submitAllProof = async () => {
    if (!validateEntries()) {
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

      console.log("Submitted all result proof", result);

      setSubmitting(false);

      if (result?.success) {
        const message = result.data?.message ?? "Submitted successfully";

        console.log("Submit all proofs message", message);

        setSuccessToast(true);

        return {
          message,
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

  const uploadFile = (file_title, file) => {
    let formData = new FormData();
    formData.append("file_title", file_title);
    formData.append("licenser_type", "agent_and_content");
    formData.append("partner_uuid", partner?.uuid);
    formData.append(
      "partner_category_uuid",
      partner?.categories[0]?.category_uuid
    );
    formData.append("agg_plus_vas_requirement", "no");
    formData.append("file", file);
    formData.append("vas_partner_uuid", params);

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
        }
      })
      .catch((error) => {
        console.log(error.response);
        setSubmitting(false);
      });
  };

  const validateEntries = () => {
    if (data.authorization_letter == "") {
      setError({ error: "Please upload authorization letter" });
      return false;
    } else if (data.authorization_video == "") {
      setError({ error: "Please upload authorization video" });
      return false;
    } else if (data.agreement_letter == "") {
      setError({ error: "Please upload agreement letter" });
      return false;
    } else if (data.content_creator_id == "") {
      setError({ error: "Please upload creator ID" });
      return false;
    } else if (data.license_start_date == "") {
      setError({ error: "Please enter start of license date" });
      return false;
    } else if (data.license_end_date == "") {
      setError({ error: "Please enter end of license date" });
      return false;
    }

    return true;
  };

  const handleFormChange = (e) => {
    clearErrors();
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col space-y-12 w-[850px] mb-24">
        <div className="text-center flex flex-col space-y-2">
          <h2 className="text-4xl font-mtn text-white">
            Provide proof of ownership
          </h2>
          <h4 className="text-white/60 font-mtn text-2xl">
            As furnished by a content creator
          </h4>
        </div>

        <div className="w-full flex flex-col space-y-6 flex-nowrap">
          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              1
            </span>
            <div className="w-[250px] min-2-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Physical status of the content creator
              </h4>
              <p className="text-white/60 text-sm">
                Choose an option that applies
              </p>
            </div>

            <div className="flex space-x-2 flex-nowrap items-center h-full">
              <div
                onClick={() => setOwnerIsAlive(true)}
                className={`cursor-pointer p-6 relative hover:bg-white/5 h-[120px] rounded-xl ${
                  ownerIsAlive ? "border-2 border-mtn" : "border-white/20"
                } w-1/2 justify-center flex flex-col space-y-4`}
              >
                {ownerIsAlive && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="yellow"
                    className="w-4 h-4 absolute top-4 right-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}

                <h4 className="text-white font-mtn text-sm">Alive</h4>
                <p className="text-white/60 font-mtn text-sm">
                  Content creator is alive and active
                </p>
              </div>

              <div
                onClick={() => setOwnerIsAlive(false)}
                className={`cursor-pointer p-6 relative hover:bg-white/5 h-[120px] rounded-xl ${
                  !ownerIsAlive ? "border-2 border-mtn" : "border-white/20"
                } w-1/2 justify-center  flex flex-col space-y-4`}
              >
                {!ownerIsAlive && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="yellow"
                    className="w-4 h-4 absolute top-4 right-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                <h4 className="text-white font-mtn text-sm">Deceased</h4>
                <p className="text-white/60 font-mtn text-sm">
                  Content creator is dead
                </p>
              </div>
            </div>
          </div>
          {!ownerIsAlive && (
            <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
              <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 bg-white/20 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="yellow"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <div className="w-[250px] flex flex-col space-y-2">
                <h4 className="font-mtn text-white text-md">Probate of will</h4>
                <p className="text-white/60 text-sm">
                  Must be based on our authorisation checklist.
                </p>
                <div className="flex space-x-2 items-base"></div>
              </div>

              <FileInput
                id="probate_of_will"
                doc_id="probate_of_will_doc"
                label="Probate of Will"
                value={files.probate_of_will}
                onChange={(e) => uploadFile("probate_of_will", e.target.value)}
                errors={errors}
                disabled={false}
                style="flex-1"
              />
            </div>
          )}

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              2
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Authorisation letter from content owner to MTN
              </h4>
              <p className="text-white/60 text-sm">
                Must be based on our authorisation checklist.
              </p>
            </div>

            <FileInput
              id="authorization_letter"
              doc_id="authorization_letter_doc"
              label="Authorization Letter"
              value={files.authorization_letter}
              onChange={(e) =>
                uploadFile("authorization_letter", e.target.value)
              }
              errors={errors}
              disabled={false}
              style="flex-1"
            />
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              3
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">Licensing Period</h4>
              <p className="text-white/60 text-sm">
                Indicate the validity period granted by the content owner - as
                stated in the letter of authorisation.
              </p>
            </div>

            <div className="flex space-x-2 no-wrap items-center h-full">
              <DatePicker
                id="license_start_date"
                label="Start date"
                value={files.license_start_date}
                onChange={handleFormChange}
                onBlur={handleFormChange}
                errors={errors}
                min={two_years_ago}
                max={today}
                disabled={false}
              />

              <DatePicker
                id="license_end_date"
                label="End date"
                value={files.license_end_date}
                onChange={handleFormChange}
                onBlur={handleFormChange}
                errors={errors}
                min={tomorrow}
                max={max_expiry}
                disabled={false}
              />
            </div>
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              4
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Video showing signing
              </h4>
              <p className="text-white/60 text-sm">
                Must capture the content owner and the authorisation letter
                being signed.
              </p>
              {/* <div className="flex space-x-2 items-base">
                <span className="text-xs text-mtn">See video sample</span>
              </div> */}
            </div>

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
              disabled={false}
              style="flex-1"
            />
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              5
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Aggrement between content owner and VAS partner
              </h4>
              <p className="text-white/60 text-sm"></p>
            </div>

            <FileInput
              id="agreement_letter"
              doc_id="agreement_letter_doc"
              label="Agreement Letter"
              value={files.agreement_letter}
              onChange={(e) => uploadFile("agreement_letter_btw_content_and_vas_partner", e.target.value)}
              errors={errors}
              disabled={false}
              style="flex-1"
            />
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              6
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Content creator’s ID
              </h4>
              <p className="text-white/60 text-sm">
                Submit a valid means of identification for the content creator.
                E.g International passport, driver’s license, voter’s card
              </p>
              <div className="flex space-x-2 items-base"></div>
            </div>

            <FileInput
              id="content_creator_id"
              doc_id="content_creator_id_doc"
              label="Content creator ID"
              value={files.content_creator_id}
              onChange={(e) => uploadFile("content_creator_id_front", e.target.value)}
              errors={errors}
              disabled={false}
              style="flex-1"
            />
          </div>

          
          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                7
            </span> 
            <div className="w-[250px] flex flex-col space-y-2">
                <h4 className="font-mtn text-white text-md">Agent’s ID</h4>
                <p className="text-white/60 text-sm">Submit a valid means of identification for the Agent. E.g International passport, driver’s license, voter’s card</p> 
                <div className="flex space-x-2 items-base">
                    
                </div>                           
            </div>

            <FileInput
                id="agent_id_front"
                doc_id="content_creator_id_doc"
                label="Agent's ID"
                value={files.agent_id_front}
                onChange={(e) => uploadFile("agent_id_front", e.target.value)}
                errors={errors}
                disabled={false}
                style="flex-1"
            />
            
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              8
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Other content proof of ownership (optional)
              </h4>
              <p className="text-white/60 text-sm">
                Provide any other proof you may have for your content ownership.
              </p>
              <div className="flex space-x-2 items-base"></div>
            </div>

            <FileInput
              id="other_content_proof"
              doc_id="other_content_proof_doc"
              label="Other proof of ownership"
              value={files.other_content_proof}
              onChange={(e) =>
                uploadFile("other_content_proof_of_ownership", e.target.value)
              }
              errors={errors}
              disabled={false}
              style="flex-1"
            />
          </div>
        </div>

        {errors?.error && (
          <div className="my-6">
            <FormErrors error={errors.error} />
          </div>
        )}

        <div className="flex justify-end item-end py-8">
          {!submitting && (
            <button
              className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full"
              onClick={() => submitAllProof()}
            >
              Next
            </button>
          )}
          {submitting && (
            <div className="flex px-4">
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            </div>
          )}
        </div>
      </div>

      {successToast && (
        <PopUp closePopUp={() => {}}>
          <SuccessCard
            action={() => {
              setSuccessToast(false);
              router.push("/dashboard/requests");
            }}
            msg={
              "We’ll review your submissions and notify your once that process is completed."
            }
          />
        </PopUp>
      )}
    </>
  );
}
