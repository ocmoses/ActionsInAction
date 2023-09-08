"use client";
import Image from "next/image";
import TextInput from "@/app/components/form/TextInput";
import Button from "@/app/components/form/Button";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import useLogout from "@/hooks/useLogout";
import useProcessing from "@/hooks/useProcessing";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useState, useEffect } from "react";
import { NextEndPoints } from "@/app/modules/endpoints";
import { PageRoutes } from "@/app/modules/menu";
import useAdmins from "@/hooks/useAdmins";
import { useRouter } from "next/navigation";

function Login({ params }) {
  const router = useRouter();
  const { setToken, setAdmin, setCategories } = useAdmins();
  const { processing, setProcessing, setForm } = useProcessing();
  const [{ errors, setError, removeError, clearErrors, success }] = useErrors(
    {}
  );
  const { clearStore } = useLogout();
  const [data, setData] = useState({
    username: process.env.NODE_ENV === "production" ? "" : "afoo",
    password: process.env.NODE_ENV === "production" ? "" : "Password12345%",
  });
  useEffect(() => {
    setForm(null);
    setProcessing(false);
    clearErrors();
  }, []);
  const handleFormChange = (e) => {
    removeError(e.target.id);
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    clearErrors();
    if (!data.username) {
      return setError({ username: `Please enter your AD username` });
    }
    if (!data.password) {
      return setError({ password: `Please enter your AD password` });
    }
    clearStore();
    setProcessing(true);
    const response = await fetch(NextEndPoints.LOGIN_ADMIN, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const result = await response.json();
    const { data: Data, error } = result;
    if (error) {
      setProcessing(false);
      return setError({ login: error });
    }
    setToken(Data?.user.token); 
    setAdmin(Data?.user.user);  
    setCategories(Data?.categories);
    const redirect =
      params && params?.length && params[0] !== "login"
        ? `/${params.join("/")}`
        : PageRoutes.admindashboard;

    return router.replace(redirect);
  };
  return (
    <>
      <div className="w3-animate-opacity pb-20 pt-[15vh] w-full max-w-[407px] mx-auto min-h-screen">
        <form method="POST" onSubmit={handleLogin}>
          <h1 className="flex items-center gap-4 font-mtn-extrabold-italic  text-white">
            <span
              style={{
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "40px",
              }}
            >
              Y’ello
            </span>
            <Image
              src="/assets/icons/yello-hand.svg"
              alt="Yello"
              priority
              width={36}
              height={36}
              className="h-auto animate-bounce"
            />
          </h1>
          <p
            className="font-hairline flex-wrap mb-16"
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#999999",
            }}
          >
            Welcome back! please enter your details
          </p>
          <div className="mb-6">
            {!success && errors && <FormErrors error={errors["login"]} />}
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <TextInput
                id="username"
                label="AD Username"
                value={data.username}
                onChange={handleFormChange}
                errors={errors}
              />
              <TextInput
                id="password"
                label="Password"
                type="Password"
                value={data.password}
                onChange={handleFormChange}
                errors={errors}
              />
            </div>
            {/* <Link
              href={`${PageRoutes.passwordreset}/reset`}
              className="inline-flex font-mtn-extralight  text-white text-start px-0 pb-1 mb-6"
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                textDecorationLine: "underline",
              }}
            >
              Reset your password?
            </Link> */}
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button label="Continue" />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;