"use client";
import { useState, useEffect, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials,
  capitalizeFirst,
} from "@/app/modules/utilities";
import {
  TailSpinPreloader,
  CompanyLogo,
  DialIcon,
} from "@/app/components/Icons";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import useContracts from "@/hooks/useContracts";
import useUsers from "@/hooks/useUsers";
import moment from "moment";
import usePartners from "@/hooks/usePartners";
import TextInput from "@/app/components/form/TextInput";
import TextAreaInput from "@/app/components/form/TextAreaInput";
import FileInput from "@/app/components/form/FileInput";
import DatePicker from "@/app/components/form/DatePicker";
import RemoteEndpoints from "@/app/modules/endpoints";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/useLogout";

export default function VASIPDetails({ params, next }) {
  const { partner, ipFileUpload } = usePartners();

  const { user } = useUsers();

  const router = useRouter();

  const { Logout } = useLogout();

  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () =>
    setTimeout(() => {
      setSuccessToast(false);
      next();
    }, 3000);

  const [ownerType, setOwnerType] = useState(null);

  const [files, setFiles] = useState({
    authorization_letter: "",
    authorization_video: "",
    agreement_letter: "",
    other_content_proof_of_ownership: "",
  });

  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    physical_status_of_content_provider: "null",
    license_start_date: "",
    license_end_date: "",
  });

  const [submitting, setSubmitting] = useState(false);

  let today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const two_years_ago = new Date().setDate(today.getDate() - 739);
  const max_expiry = new Date().setDate(
    (data.AVL_issuing_date == "" ? today : data.AVL_issuing_date) + 739
  );

  const uploadFile = (file_title, file) => {
    let formData = new FormData();
    formData.append("file_title", file_title);
    formData.append("licenser_type", "content_owner");
    formData.append("partner_uuid", partner?.uuid);
    formData.append(
      "partner_category_uuid",
      partner?.categories[0]?.category_uuid
    );
    formData.append("agg_plus_vas_requirement", "yes");
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
        console.log(error.response), setSubmitting(false);
      });
  };

  const validate = () => {
    if (files.authorization_letter == "") {
      setError({ error: "Please upload authorization letter" });
      return false;
    } else if (files.authorization_video == "") {
      setError({ error: "Please upload authorization video" });
      return false;
    } else if (files.agreement_letter == "") {
      setError({ error: "Please upload agreement letter" });
      return false;
    } else if (files.other_content_proof_of_ownership == "") {
      setError({ error: "Please upload creator ID" });
      return false;
    }

    return true;
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
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Authorisation letter from VAS service provider to MTN
              </h4>
              <p className="text-white/60 text-sm">
                Must be based on our authorisation checklist.
              </p>
              {/* <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See letter checklist</span>
                            </div> */}
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
              2
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
              doc_id="authorization_video"
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
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              3
            </span>
            <div className="w-[250px] flex flex-col space-y-2">
              <h4 className="font-mtn text-white text-md">
                Agreement between VAS partner and aggregator
              </h4>
              <p className="text-white/60 text-sm"></p>
              {/* <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See agreement checklist</span>
                            </div>                            */}
            </div>

            <FileInput
              id="agreement_letter"
              doc_id="agreement_letterr_doc"
              label="Agreement Letter"
              value={files.agreement_letter}
              onChange={(e) => uploadFile("agreement_letter", e.target.value)}
              errors={errors}
              disabled={false}
              style="flex-1"
            />
          </div>

          <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
              4
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
              id="other_content_proof_of_ownership"
              doc_id="other_content_proof_of_ownership_doc"
              label="Other proof of ownership"
              value={files.other_content_proof_of_ownership}
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
              onClick={validate ? next : null}
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
    </>
  );
}
