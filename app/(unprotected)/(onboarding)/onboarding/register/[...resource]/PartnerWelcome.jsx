"use client";
import usePartners from "@/hooks/usePartners";
import TextInput from "@/app/components/form/TextInput";
import RegisterStepHeader from "@/app/components/RegisterStepHeader";
import Button from "@/app/components/form/Button";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import useProcessing from "@/hooks/useProcessing";
import { useEffect, useState } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
import { Util } from "@/utils/utility";
import { forms } from "@/app/modules/constants";
import useApp from "@/hooks/useApp";

export default function PartnerWelcome({ resource }) {
  const { setRouteloading } = useApp();

  const { processing, setProcessing, setForm } = useProcessing();
  const { registerPartner } = usePartners();

  const [data, setData] = useState({
    partnerid: "",
    email_type: "",
  });
  const { title, subtitle, hand, required } = forms["partnerwelcome"];
  const [{ errors, setError, removeError, clearErrors }] = useErrors();

  useEffect(() => {
    setForm("partnerwelcome");
    setProcessing(false);
    clearErrors();
    setRouteloading(false);
  }, []);
  useEffect(() => {
    setData((oldState) => ({
      ...oldState,
      email_type:
        resource && resource[0] === "resetpassword" ? "reset" : "existing",
    }));
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    let error = false;
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!data[field]) {
          error = true;
          setError({ [field]: `${required[field]} is required` });
        }
      }
      if (error) return;
    }
    const result = await registerPartner("partnerwelcome", data);
    if (result) {
      if (result?.error) return setError({ partnerwelcome: result.error });
    }
  };
  const handleFormChange = (e) => {
    removeError(e.target.id);
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit} className="">
        <RegisterStepHeader
          title={title}
          titleClassName="font-mtn-bold font-bold mb-2"
          subtitle={subtitle}
          subtitleClassName="font-hairline font-mtn-extralight flex-wrap text-[14px] text-white/70"
          hand={hand}
          className="mb-6"
        />
        <div className="mb-6">
          {errors && <FormErrors error={errors["partnerwelcome"]} />}
        </div>
        <TextInput
          id="partnerid"
          label="Enter your email"
          value={data.partnerid}
          onChange={handleFormChange}
          errors={errors}
          margin="mb-2"
        />
        <p className="text-[#999999] text-md mb-6">
          We'll send a confirmation link to this email
        </p>
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button label="Send confirmation email" />
        )}
      </form>
    </div>
  );
}
