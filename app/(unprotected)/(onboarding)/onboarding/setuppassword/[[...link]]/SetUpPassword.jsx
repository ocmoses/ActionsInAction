"use client";
import Button from "@/app/components/form/Button";
import TextInput from "@/app/components/form/TextInput";
import RegisterStepHeader from "@/app/components/RegisterStepHeader";
import useProcessing from "@/hooks/useProcessing";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import usePartners from "@/hooks/usePartners";
import useApp from "@/hooks/useApp";
import useLogout from "@/hooks/useLogout";
import { useEffect, useState } from "react";
import { Util } from "@/utils/utility";
import { TailSpinPreloader } from "@/app/components/Icons";
import { forms } from "@/app/modules/constants";
import { NextEndPoints } from "@/app/modules/endpoints";
import { PageRoutes } from "@/app/modules/menu";
import { useRouter } from "next/navigation";
import { verify } from "crypto";

function SetUpPassword({ link }) {

  const { clearStore } = useLogout();
  const router = useRouter();
  const app = useApp();
  const { processing, setProcessing, setForm } = useProcessing();
  const { title, subtitle, hand, required } = forms["setpassword"];
  const [{ errors, setError, removeError, clearErrors }] = useErrors({});
  const [data, setData] = useState({
    password: "",
    password_confirmed: "",
    link: "",
  });
  
  const [verifyingLink, setVerifyingLink] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  console.log("The link", link);
  

  const { registerPartner, verifyPartnerLink } = usePartners();


  const verify_partner_link = async (link) => {
    if (verifyingLink) return;
    setVerifyingLink(true);

    const verificationResponse = await verifyPartnerLink(link);

    setVerifyingLink(false);

    if(!verificationResponse.success){         
      setError({error:verificationResponse?.message}); 
    }else{
      setDisplayForm(true);
    }

    
  };

  useEffect(() => {
    setData((oldState) => ({
      ...oldState,
      link: link
    }));    
    if (!link) setError({ setpassword: "Invalid request" });

    //call verify partner link endpoint
    verify_partner_link(link);

    setForm("setpassword");
    setProcessing(false);
    clearErrors();
  }, []);

  const handleReset = async () => {
    clearErrors();
    clearStore();
    setProcessing(true);
    const response = await fetch(NextEndPoints.SETPASSWORD, {
      method: "POST",
      body: JSON.stringify({
        password: data.password,
        password_confirmed: data.password_confirmed,
        link: data.link,
      }),
    });
    const result = await response.json();
    const { data: loginData } = result;
    if (!loginData) {
      setProcessing(false);
      return setError({ setpassword: "Authentication failed" });
    }
    if (!loginData.success) {
      setProcessing(false);
      return setError({ setpassword: loginData.error });
    }
    const serverSession = {
      status: loginData?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User:  loginData?.data,
      type: "user",
    };
    app.setStoreStates(serverSession, loginData?.categories, "setpassword");
    // const redirect =
    //   data.type === "existing"
    //     ? PageRoutes.getstarted
    //     : PageRoutes.dashboard
    return router.push(PageRoutes.dashboard);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    let error = false;
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          error = true;
          setError({ [field]: `${required[field]} is required` });
        }
      }
      if (error) return;
      if (data.password.length < 8) {
        setError({ password: "Your password must be at least, 8 characters" });
        return;
      }
      if (data.password !== data.password_confirmed)
        return setError({
          password_confirmed: "Password confirmation mismatch",
        });
    }
    handleReset();
  };
  const handleFormChange = (e) => {
    removeError(e.target.id);
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      {
        verifyingLink  && 
        <div className="w-full, h-screen flex justify-center items-center flex-col space-y-2">
          <TailSpinPreloader width={60} height={60} fill="#efb703" />
          <p className="text-gray-500 text-3xl">Verifying Link...</p>
        </div>  
      }

      {
        displayForm && 
        <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
          <form method="POST" onSubmit={handleSubmit} className="">
            <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
            <div className="mb-6">
              {errors && <FormErrors error={errors["setpassword"]} />}
            </div>
            <TextInput
              id="password"
              label="Choose your password"
              type="password"
              value={data.password}
              onChange={handleFormChange}
              errors={errors}
              margin="mb-1"
            />
            <div className="mb-6 text-[#999999]">
              Must be at least 8 characters, includes uppercase and lowercase
              letter, a number and a special character
            </div>
            <TextInput
              id="password_confirmed"
              type="password"
              label="Confirm your password"
              value={data.password_confirmed}
              onChange={handleFormChange}
              errors={errors}
            />
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button label={`Continue`} />
            )}
          </form>
        </div>
      }

      {errors && <FormErrors error={errors["error"]} />}
    </>
    
  );
}

export default SetUpPassword;
