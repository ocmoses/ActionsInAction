"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import TextInput from "@/app/components/form/TextInput";
import Button from "@/app/components/form/Button";

export default function LoginOtp({user_email}) {

  const [timer, setTimer] = useState(30);
  const [showResendLink, setShowResendLink] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setShowResendLink(true);
        clearInterval(countdown);
      }
    }, 1000);
    // Clear the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [timer]);

  const resendOTP = () => {
    setShowResendLink(false);
    setTimer(30);
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
            <span className="text-mtn">{user_email}</span>. This helps
            us keep your account secure by verifying it’s really you
          </p>
          <TextInput id="partnerid" label="Enter OTP code" />
          {!showResendLink ? (
            <p className="text-[#999999] text-md mb-6">Don’t see it? Send a new code in 00:{timer} </p>
          ) : (
            <p onClick={resendOTP}className="text-[#999999] text-md mb-6 underline cursor-pointer hover:text-white transition duration-[1s]">Resend Code</p>
          )}
          <Button label="Submit" />
        </form>
      </div>
    </>
  );
}
