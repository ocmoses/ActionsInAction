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

function AddService({ contract_id, action }) {
  const { partner, getAllServices, getAllShortcodes } = usePartners();

  const { tabs, currentTab, setCurrentTab, setRequestChangesModal } =
    useContext(ContractSettingsContext);

  const { user } = useUsers();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [processing, setProcessing] = useState(false);

  const [shortcodes, setShortcodes] = useState([]);

  const [services, setServices] = useState([]);

  const bearers = [
    { value: "sms", title: "SMS" },
    { value: "ivr", title: "IVR" },
    { value: "ussd", title: "USSD" },
  ];

  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    contract_id: contract_id,
    ANS_service_name: "",
    ANS_shortcode: "",
    ANS_bearer: "",
    change_order_request_type: "ANS",
  });

  const requestUpdate = async () => {
    if (!validateData()) {
      return;
    }

    clearErrors();

    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.REQUEST_CHANGE}`, {
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

      if (response.status === 400 || response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      console.log("Result of requesting shortcode change", result);

      setProcessing(false);
      if (result?.success) {
        action();
        return {
          message: "Shortcode updated successfully",
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
    if (data.ANS_service_name.trim() == "") {
      setError({ error: "Please enter a service" });

      return false;
    } else if (data.ANS_shortcode.trim() == "") {
      setError({ error: "Please select one of the shortcodes" });

      return false;
    } else if (data.ANS_bearer.trim() == "") {
      setError({ error: "Please select a bearer" });

      return false;
    }

    return true;
  };

  useEffect(() => {
    getAllServices().then((resp) =>
      resp.error
        ? setError({ error: resp.error })
        : setServices(resp.service_types)
    );

    getAllShortcodes().then((resp) =>
      resp.error
        ? setError({ error: resp.error })
        : setShortcodes(resp.shortcodes)
    );
  }, []);

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
        <h2 className="text-white text-2xl font-mtn">Add new service</h2>

        <div className="text-white/60 flex flex-col space-y-3">
          <label className="text-md">Service name</label>
          <TextInput
            id="ANS_service_name"
            label="Service name"
            onChange={(e) => {
              try {
                clearErrors();
                let ANS_service_name = e.target.value.trim();
                setData({ ...data, ANS_service_name });
              } catch (ex) {
                setError({ error: "Please enter your new service name" });
              }
            }}
            onBlur={(e) => {
              try {
                clearErrors();
                let ANS_service_name = e.target.value.trim();
                setData({ ...data, ANS_service_name });
              } catch (ex) {
                setError({ error: "Please enter your new service name" });
              }
            }}
            errors={errors}
          />
        </div>

        <div className="text-white/60 flex flex-col space-y-3">
          <p className="text-white">Short code</p>
          <span className="text-md">
            This is the short code associated with this service.
          </span>

          <div className="flex space-x-4 flex-NOwrap w-full">
            {shortcodes.map((s) => (
              <ShortCode key={s} value={s} />
            ))}
          </div>

          <span
            onClick={() => setCurrentTab(tabs.ADD_SHORT_CODE)}
            className="text-mtn text-md cursor-pointer"
          >
            + Add new shortcode
          </span>
        </div>

        <div className="text-white/60 flex flex-col space-y-3">
          <p className="text-white">Bearer</p>
          <span className="text-md">
            This is the bearer associated with this service.
          </span>

          <div className="flex space-x-4 flex-NOwrap w-full">
            {bearers.map((b) => (
              <Bearer key={b.value} value={b.title} />
            ))}
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

  function ShortCode({ value }) {
    return (
      <div
        onClick={() => setData({ ...data, ANS_shortcode: value })}
        className={`p-4 text-white/80 w-1/3 border-2 ${
          data.ANS_shortcode == value ? "border-mtn" : "border-white/20"
        } rounded-md flex items-center justify-center cursor-pointer`}
      >
        {value}
      </div>
    );
  }

  function Bearer({ value }) {
    return (
      <div
        onClick={() => setData({ ...data, ANS_bearer: value })}
        className={`p-4 text-white/80 w-1/3 border-2 ${
          data.ANS_bearer == value ? "border-mtn" : "border-white/20"
        } rounded-md flex items-center justify-center cursor-pointer`}
      >
        {value}
      </div>
    );
  }
}

export default AddService;
