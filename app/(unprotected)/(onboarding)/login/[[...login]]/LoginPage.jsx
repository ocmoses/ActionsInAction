"use client";
import Image from "next/image";
import Link from "next/link";
import TextInput from "@/app/components/form/TextInput";
import Button from "@/app/components/form/Button";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import useLogout from "@/hooks/useLogout";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RemoteEndPoints, { NextEndPoints } from "../../../../../app/modules/endpoints";
import { PageRoutes } from "@/app/modules/menu";
import useApp from "@/hooks/useApp";
import useUsers from "@/hooks/useUsers";

function Login({ params }) {
  const router = useRouter();
  const app = useApp();

  

  const { resendEmail } = usePartners();
  const { tmpuser, setTmpUser } = useUsers();
  const { processing, setProcessing, setForm } = useProcessing();
  const [{ errors, setError, removeError, clearErrors, success }] = useErrors(
    {}
  );
  const { clearStore } = useLogout();

  const [data, setData] = useState({
    email:
      process.env.NODE_ENV === "production"
        ? tmpuser?.email
          ? tmpuser?.email
          : ""
        : tmpuser?.email
        ? tmpuser?.email
        : "moses.ocho@mtn.com",
    password: process.env.NODE_ENV === "production" ? "" : "Password12345%",
  });
  const [notVerified, setNotVerified] = useState(null);

  useEffect(() => {
    setForm(null);
    setProcessing(false);
    clearErrors();
    setNotVerified(null);
    
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
    setNotVerified(null);
    if (!data.email) {
      return setError({ email: `Please enter your email address` });
    }
    if (!data.password) {
      return setError({ password: `Please enter your password` });
    }
    clearStore();
    setProcessing(true);
    const response = await fetch(NextEndPoints.LOGIN, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        endpoint: RemoteEndPoints.LOGIN,
      }),
    });
    const result = await response.json();

    console.log("result", result);

    // result.data.data.partners[0].categories[0].compliance_approvals.push({
    //   "id": 104,
    //   "uuid": "9bcfff39-060e-4cfb-9007-e77b1c2e9259",
    //   "partner_uuid": "d68d5393-e84a-4f57-8586-a55f97cde68d",
    //   "category_uuid": "4f4f8e28-91ed-11ed-bd03-acde48001122",
    //   "category_stage": "shortcode",
    //   "admin_user": {
    //       "id": 28,
    //       "uuid": "8ca51afd-3cf3-4ab0-8c26-a122b3ef0a72",
    //       "username": "mosesoc",
    //       "fullname": "Moses",
    //       "email": "moses.ocho@mtn.com",
    //       "department": "Charging VAS and Financial Services NG",
    //       "department_code": "LEGA",
    //       "role": "be85a2d2-ed8c-11ed-8379-acde48001122",
    //       "created_at": "2023-06-13T12:19:20.000000Z",
    //       "updated_at": "2023-06-13T12:19:20.000000Z"
    //   },
    //   "field": "shortcodes-054f711c-0e47-43fa-8f77-763a9506a4eb",
    //   "status": "approved",
    //   "feedback": "Shortcodes approved",
    //   "admin_department": "SPRM",
    //   "created_by": "8ca51afd-3cf3-4ab0-8c26-a122b3ef0a72",
    //   "updated_by": null,
    //   "created_at": "2023-09-26T09:07:27.000000Z",
    //   "updated_at": "2023-09-26T09:07:27.000000Z"
    // });

    // result.data.data.partners[0].categories[0]
    //       .category_field_approval_status.shortcodes[0]["shortcodes"] = "approved";

    const { data: loginData, error: loginError } = result;
    if (!loginData) {
      setProcessing(false);
      return setError({ login: loginError /*"Authentication failed"*/ });
    }
    if (!loginData.success) {
      setProcessing(false);
      if (loginData.data?.email_verified === "no") {
        setNotVerified(loginData.data);
      }
      return setError({ login: loginData.error });
    }
    setTmpUser(null);
    const serverSession = {
      status: loginData?.data?.user?.uuid ? "authenticated" : "unauthenticated",
      User:  loginData?.data,
      token:  loginData?.data?.login_token?.access_token,
      type: "user",
      role: loginData?.data['login-user-role']
    };
    
    app.setStoreStates(serverSession, loginData?.categories, "login");

    const redirect =
      params &&
      params?.length &&
      params[0] !== "login" &&
      params[1] !== "getstarted"
        ? `/${params.join("/")}`
        : PageRoutes.dashboard;
    if (params?.includes("getstarted")) app.toggleGetstartedLink(true);
    else app.toggleGetstartedLink(false);
    return router.replace(redirect);
  };

  return (
    <>
      <form method="POST" onSubmit={handleLogin}>
        <div className="w3-animate-opacity pb-20 pt-[15vh] w-full max-w-[407px]">
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
              {tmpuser?.email && <span>, {tmpuser?.first_name}</span>}
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
            {tmpuser?.email
              ? `Welcome to the MTN Partner Portal, ${tmpuser.first_name}! Please login to proceed`
              : "Welcome back! please enter your details"}
          </p>
          <div className="mb-6">
            {!success && errors && <FormErrors error={errors["login"]} />}{" "}
            {!success && notVerified && (
              <span
                className="text-[#999999] cursor-pointer hover:text-white/70"
                onClick={() => resendEmail(notVerified?.email, "new")}
              >
                Click here to resend verification link
              </span>
            )}
            <>
              {errors && <FormErrors error={errors["verify"]} />}
              {success && <FormErrors success={success} />}
            </>
          </div>
          <div className="w-full">
            <div className="flex flex-col">
              <TextInput
                id="email"
                label="Email address"
                value={data.email}
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
            <Link
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
            </Link>
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button label="Continue" />
            )}
          </div>
        </div>
      </form>
      
    </>
  );
}

export default Login;
