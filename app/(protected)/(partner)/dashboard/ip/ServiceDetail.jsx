"use client";
import { useState, useEffect } from "react";

import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";
import TextInput from "@/app/components/form/TextInput";
import TextAreaInput from "@/app/components/form/TextAreaInput";
import RemoteEndpoints from "@/app/modules/endpoints";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";

export default function ServiceDetail({ params, next }) {
  const { partner, getAllServices, getAllShortcodes } = usePartners();

  const { user } = useUsers();

  const [shortcodes, setShortcodes] = useState([]);

  const [serviceTypes, setServiceTypes] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const [{ errors, setError, clearErrors }] = useErrors(null);

  useEffect(() => {
    getAllServices().then((resp) =>
      resp.error
        ? setError({ error: resp.error })
        : setServiceTypes(resp.service_types)
    );

    getAllShortcodes().then((resp) =>
      resp.error
        ? setError({ error: resp.error })
        : setShortcodes(resp.shortcodes)
    );
  }, []);

  const [services, setServices] = useState({
    service_type: "",
    service_name: "",
    shortcode_for_service: "",
    purpose_service_usage: "",
    bearer: "",
    partner_uuid: partner?.uuid,
    vas_partner_uuid: null,
  });

  const handleVasData = (field, value) => {
    setServices((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (params) {
      handleVasData("vas_partner_uuid", params);
    }
  }, []);

  const handleChange = (e, id) => {
    clearErrors();
    setServices({ ...services, [id]: e.target.value });
  };

  const submitService = async () => {
    if (!validateService()) {
      return;
    }

    setSubmitting(true);

    try {
      setSubmitting(true);
      const response = await fetch(
        `${RemoteEndpoints.SUBMIT_SERVICE_DETAILS}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          method: "POST",
          body: JSON.stringify(services),
          headers: {
            apikey: process.env.NEXT_PUBLIC_APIKEY,
            token: user.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      console.log("Submit services result", result);

      setSubmitting(false);

      next();

      if (result?.success) {
        const message = result.data?.message;

        console.log("Submit services message", message);

        next();

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

  const validateService = () => {
    if (services.service_type.trim() == "") {
      setError({ error: "Enter a service type" });
      return false;
    } else if (services.service_name.trim() == "") {
      setError({ error: "Enter a service name" });
      return false;
    } else if (services.shortcode_for_service.trim() == "") {
      setError({ error: "Please select shortcode" });
      return false;
    } else if (services.bearer.trim() == "") {
      setError({ error: "Please select a bearer" });
      return false;
    } else if (services.purpose_service_usage.trim() == "") {
      setError({ error: "Please Enter purpose of service" });
      return false;
    }
    return true;
  };

  const bearers = [
    { value: "sms", title: "SMS" },
    { value: "ivr", title: "IVR" },
    { value: "ussd", title: "USSD" },
  ];

  const [fetchingServiceType, setFetchingServiceType] = useState(false);
  const [serviceTypeList, setServiceTypeList] = useState(null);
  const fetchServiceType = async () => {
    try {
      setFetchingServiceType(true);
      const response = await axios.get(RemoteEndpoints.GET_SERVICE_TYPES, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_APIKEY,
          token: user.token,
          Authorization: `bearer ${user.token}`,
        },
      });
      console.log("setServiceTypeList", response.data.data["service-types"]);
      setServiceTypeList(response.data.data["service-types"]);
      setFetchingServiceType(false);
    } catch (error) {
      setFetchingServiceType(false);
      console.error("Error Service Type data:", error);
    }
  };
  useEffect(() => {
    fetchServiceType();
  }, []);
  return (
    <div className="flex flex-col space-y-8 w-[500px]">
      <div className="text-center flex flex-col space-y-2">
        <h2 className="text-4xl font-mtn text-white">Your service details</h2>
        <h4 className="text-white/60 font-mtn text-2xl">
          What services will you be offering
        </h4>
      </div>

      <SelectInput
        id="service_type"
        label="Service type"
        name="Service type"
        value={services.service_type}
        onChange={(e) => handleChange(e, "service_type")}
      >
        {!fetchingServiceType && <SelectInputOption value="" label="" />}
        {fetchingServiceType ? (
          <SelectInputOption value="" label="Fetching Service type..." />
        ) : (
          serviceTypeList?.map((eachServiceType) => (
            <SelectInputOption
              key={eachServiceType.id}
              value={eachServiceType.name_of_service_type}
              label={eachServiceType.name_of_service_type}
            />
          ))
        )}
      </SelectInput>

      <TextInput
        id="service_name"
        label="Service Name"
        value={services.service_name}
        onChange={(e) => handleChange(e, "service_name")}
        onBlur={(e) => handleChange(e, "service_name")}
      />

      <div className="flex flex-col space-y-2">
        <p className="text-white">Short code</p>

        <span className="text-white/60 text-sm">
          This is the short code associated with this service.
        </span>
      </div>

      <div className="flex space-x-4 flex-NOwrap w-full">
        {shortcodes.map((s) => (
          <ShortCode key={s} value={s} />
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <p className="text-white">Purpose /service usage</p>

        <span className="text-white/60 text-sm">
          Provide a brief overview of what your service offers.
        </span>
      </div>

      <TextAreaInput
        id="purpose_service_usage"
        label="Describe the purpose..."
        type="text"
        name="message"
        value={services.purpose_service_usage}
        onChange={(e) => handleChange(e, "purpose_service_usage")}
        onBlur={(e) => handleChange(e, "purpose_service_usage")}
      />

      <div className="flex flex-col space-y-2">
        <p className="text-white">Bearer</p>

        <span className="text-white/60 text-sm">
          This is the bearer associated with this service.
        </span>
      </div>

      <div className="flex space-x-4 flex-nowrap w-full">
        {bearers.map((b) => (
          <Bearer key={b.value} value={b.title} />
        ))}
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
            onClick={() => submitService()}
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
  );
}

function ShortCode({ value }) {
  return (
    <div
      onClick={() => setServices({ ...services, shortcode_for_service: value })}
      className={`p-4 text-white/80 w-1/3 border-2 ${
        services.shortcode_for_service == value
          ? "border-mtn"
          : "border-white/20"
      } rounded-md flex items-center justify-center cursor-pointer`}
    >
      {value}
    </div>
  );
}

function Bearer({ value }) {
  return (
    <div
      onClick={() => setServices({ ...services, bearer: value })}
      className={`p-4 text-white/80 w-1/3 border-2 ${
        services.bearer == value ? "border-mtn" : "border-white/20"
      } rounded-md flex items-center justify-center cursor-pointer`}
    >
      {value}
    </div>
  );
}
