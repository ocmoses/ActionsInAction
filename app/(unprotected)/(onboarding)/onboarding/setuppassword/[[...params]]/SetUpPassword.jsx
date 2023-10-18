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
import RemoteEndpoints  from "@/app/modules/endpoints";
import { PageRoutes } from "@/app/modules/menu";
import { useRouter } from "next/navigation";
import { apikey } from "@/app/modules/constants";
import Success from "@/app/components/toasts/Success";

function SetUpPassword({ params: { params } }) {
  const { clearStore } = useLogout();
  const router = useRouter();
  const app = useApp();
  const { processing, setProcessing, setForm } = useProcessing();
  const { title, subtitle, hand, required } = forms["setpassword"];
  const [{ errors, setError, removeError, clearErrors }] = useErrors({});
  const [data, setData] = useState({
    password: "",
    password_confirmed: "",
    link_token: params[0],
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => router.push("/login"), 3000);


  useEffect(() => {
   setProcessing(false);
    setData((oldState) => ({
      ...oldState,
      link_token: params?.length > 0 ? params[0] : "",
    }));
    if (!params[0]) setError({ setpassword: "Invalid request" });
  }, [params]);

  useEffect(() => {
   setProcessing(false);
    setForm("setpassword");
    setProcessing(false);
    clearErrors();
  }, []);

  const handleReset = async () => {
    clearErrors();
    clearStore();
    setProcessing(true);
    const response = await fetch(RemoteEndpoints.SET_UP_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        apikey,
        "Content-Type": "application/json",
        referrerPolicy: "no-referrer"        
      },
    });

    setProcessing(false);

    const result = await response.json();
    if(response.status >= 200 && response.status < 300){
      setSuccessMessage(result.data.message); 
      setSuccessToast(true);
    }else{
      setError({ setuppassword: result.data.message })
    }
    
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
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        {errors && (
          <div className="my-6">
            <FormErrors error={errors.setuppassword} />
          </div>
        )}
        <form method="POST" onSubmit={handleSubmit} className="">
          <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
          <div className="mb-6">
            {errors && <FormErrors error={errors["setpassword"]} />}
          </div>
          <TextInput
            id="password"
            label="Enter your password"
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
      
      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
    
  );
}

export default SetUpPassword;
