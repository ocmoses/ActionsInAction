"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import TextInput from "@/app/components/form/TextInput";
import Button from "@/app/components/form/Button";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import { TailSpinPreloader } from "@/app/components/Icons";

export default function LoginOtp(props) {
  const { data: loginData } = props.sessionItems;

  const [timer, setTimer] = useState(5);
  const [showResendLink, setShowResendLink] = useState(false);
  const [sendAction, setSendAction] = useState(false);


  /////// for any errorhandler, there must be clear error function
  const [errorMessage, setErrorMessage] = useState(null);
  const clearError = () => {
    setErrorMessage(null);
  };
  ////////////////////////////////////////////////////////////////


///////////////////////////////////// countdown on OTP recipient
  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setShowResendLink(true);
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

///////////////////////////////////// end countdown on resend OTP recipient
  const resendOTP  = async () => {
    setShowResendLink(false);
    setTimer(5);
    try {
        const response = await axios.post(
          RemoteEndpoints.RESEND_AUTH0_OTP,
          formData,
          {
            headers: {
              apikey: apikey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        ////// send auth0 OTP
    } catch (err) {
      console.log(setErrorMessage, err);
    }
  };
///////////////////////////////////// end countdown on OTP recipient





  const [formData, setFormData] = useState({
    email: loginData.data.user.email,
    otp: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = loginData.data.access_token;
  
  const acceptOtp = async (e) => {
    e.preventDefault();
    const otp = formData.otp;
    try {
      clearError();
      if (otp === "") {
        setErrorMessage("Enter OTP to Continue");
      } else {
        setSendAction(true);
        const response = await axios.post(
          RemoteEndpoints.ACCEPT_AUTH0_OTP,
          formData,
          {
            headers: {
              apikey: apikey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
       // console.log("The response on Auth0 Authentication is ",response);

        if ("access_token" in response.data.authZero) {
         sessionStorage.setItem('auth0Data', JSON.stringify(response.data.authZero));
         //setErrorMessage("Correct OTP");
         props.logInWithAuthZero();

        } else {
          
          setErrorMessage("Invalid OTP");
          setSendAction(false);
        }
      }
    } catch (err) {
      setSendAction(false);
      console.log(setErrorMessage, err);
    }
  };

  return (
    <>
      <div className="w3-animate-opacity pt-[15vh] pb-20 w-full max-w-[492px]">
        <form method="POST">
          <h1 className="font-mtn-bold font-bold mb-2 text-white text-[24px] md:text-[28px]  lg:text-[36px]">
            Enter OTP code
          </h1>
          <p className="font-hairline font-mtn flex-wrap text-[16px] text-white/70 mb-10">
            We sent a six-digit code to{" "}
            <span className="text-mtn">{loginData.data.user.email}</span>.
            This helps us keep your account secure by verifying it’s really you
          </p>
          <TextInput
            id="otp"
            label="Enter OTP code"
            name="otp"
            value={formData.message}
            onChange={handleChange}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm font-italic">{errorMessage}</p>
          )}
          {!showResendLink ? (
            <p className="text-[#999999] text-md mb-6">
              Don’t see it? Send a new code in 00:{timer}{" "}
            </p>
          ) : (
            <p
              onClick={resendOTP}
              className="text-[#999999] text-md mb-6 underline cursor-pointer hover:text-white transition duration-[1s]"
            >
              Resend Code
            </p>
          )}
          {sendAction ? (
            <TailSpinPreloader width={40} height={40} fill="#efb703" />
          ) : (
            <Button label="Submit" onClick={acceptOtp} />
          )}
        </form>
      </div>
    </>
  );
}
