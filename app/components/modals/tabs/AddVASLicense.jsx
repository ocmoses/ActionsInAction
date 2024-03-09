import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import TextInput from "@/app/components/form/TextInput";
import DatePicker from "@/app/components/form/DatePicker";
import FormErrors from "@/app/components/FormErrors";
import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";
import RemoteEndpoints from "@/app/modules/endpoints";
import { ContractSettingsContext } from "@/app/(protected)/(partner)/dashboard/settings/company/contracts/ContractSettingsProvider";

function AddVASLicense({ contract_id, action }) {
  const { tabs, currentTab, setCurrentTab, setRequestChangesModal } =
    useContext(ContractSettingsContext);

  const { partner } = usePartners();

  const { user } = useUsers();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [processing, setProcessing] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(false);
  const [reset, setReset] = useState(Date.now());

  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    contract_id: contract_id,
    AVL_vas_license_id: "",
    AVL_issuing_date: "",
    AVL_expiring_date: "",
    AVL_vas_license_file: null,
    change_order_request_type: "AVL",
  });

  let today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const two_years_ago = new Date().setDate(today.getDate() - 739);
  const max_expiry = new Date().setDate(
    (data.AVL_issuing_date == "" ? today : data.AVL_issuing_date) + 739
  );

  const requestUpdate = async () => {
    console.log("Datay", data);
    // return;

    if (!validateData()) {
      return;
    }

    clearErrors();

    let formData = new FormData();

    Object.keys(data).forEach((element) => {
      formData.append(element, data[element]);
    });

    formData.append("partner_uuid", data["partner_uuid"]);

    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.REQUEST_CHANGE}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        method: "POST",
        body: formData,
        headers: {
          apikey: process.env.NEXT_PUBLIC_APIKEY,
          token: user.token,
          Authorization: `bearer ${user.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 400 || response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      console.log("Result of requesting shortcode addition", result);

      setProcessing(false);
      if (result?.success) {
        action();
        return {
          message: "VAS License added successfully",
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

  const validateData = () => {
    if (data.AVL_vas_license_id.trim() == "") {
      setError({ error: "Please enter your VAS License ID" });

      return false;
    } else if (data.AVL_issuing_date.trim() == "") {
      setError({ error: "No issuing date selected" });

      return false;
    } else if (data.AVL_expiring_date.trim() == "") {
      setError({ error: "No expiry date selected" });

      return false;
    } else if (data.AVL_vas_license_file == null) {
      setError({ error: "No License document uploaded" });

      return false;
    }

    return true;
  };

  return (
    <>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setRequestChangesModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="gray"
          className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4"
        >
          <path
            stroke-linecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
        <h2 className="text-white text-2xl font-mtn">Add VAS License</h2>

        {errors && errors["error"] && (
          <div className="mb-6">
            <FormErrors error={errors["error"]} />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {/* <label className="text-md text-white/60">Enter applicable short codes</label> */}
          <TextInput
            id="AVL_vas_license_id"
            label="VAS License ID"
            onChange={(e) => {
              try {
                clearErrors();
                let AVL_vas_license_id = e.target.value.trim();

                setData({ ...data, AVL_vas_license_id });
              } catch (ex) {
                setError({ error: "Please add new VAS license id" });
              }
            }}
            onBlur={(e) => {
              try {
                clearErrors();
                let AVL_vas_license_id = e.target.value.trim();

                setData({ ...data, AVL_vas_license_id });
              } catch (ex) {
                setError({ error: "Please add new VAS license id" });
              }
            }}
            errors={errors}
          />
        </div>

        <div className="flex space-x-2 no-wrap">
          <DatePicker
            id="AVL_issuing_date"
            label="Issue date"
            value={data.AVL_issuing_date}
            onChange={(e) =>
              setData({ ...data, AVL_issuing_date: e.target.value })
            }
            onBlur={(e) =>
              setData({ ...data, AVL_issuing_date: e.target.value })
            }
            errors={errors}
            min={two_years_ago}
            max={today}
            disabled={false}
          />

          <DatePicker
            id="AVL_expiring_date"
            label="Expiry date"
            value={data.AVL_expiring_date}
            onChange={(e) =>
              setData({ ...data, AVL_expiring_date: e.target.value })
            }
            onBlur={(e) =>
              setData({ ...data, AVL_expiring_date: e.target.value })
            }
            errors={errors}
            min={tomorrow}
            max={max_expiry}
            disabled={false}
          />
        </div>

        {/* <p className="text-white/80 text-xl mb-2">Upload shortcode </p> */}

        <div className="mb-4 rounded-lg bg-white/20 flex p-2">
          <div className="rounded-lg bg-black border-1 border-dashed border-gray-200 flex p-4 w-full space-x-4 items-center">
            <div className="w-16 h-16 bg-white/20 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                  clip-rule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
              </svg>
            </div>

            <div className="flex flex-col flex-1 space-y-1 justify-center">
              <p className="text-gray-500 text-sm">Upload</p>
              <p className="text-white text-md">NCC VAS License</p>
              <p className="text-gray-500 text-sm">Drag and drop here or</p>
            </div>

            <div className="flex flex-col justify-end space-between items-end space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 justify-end"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clip-rule="evenodd"
                />
              </svg>
              {uploadedFile ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    setReset(Date.now());
                    setUploadedFile(false);
                    setData({ ...data, AVL_vas_license_file: null });
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <button
                  className="border-1 border-white rounded-full py-1 px-4 text-white"
                  onClick={() =>
                    document.querySelector("#license_proof").click()
                  }
                >
                  Choose file
                </button>
              )}
              <input
                type="file"
                className="opacity-0 w-1 h-1"
                id="license_proof"
                accept=".pdf"
                onChange={(e) => {
                  setData({ ...data, AVL_vas_license_file: e.target.files[0] });
                  setUploadedFile(true);
                  console.log("data", data);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end item-end p-8">
        {!processing && (
          <button
            className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full"
            onClick={() => requestUpdate()}
          >
            Review & Submit
          </button>
        )}
        {processing && (
          <div className="flex px-4">
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          </div>
        )}
      </div>
    </>
  );
}

export default AddVASLicense;
