"use client";
import ReviewBox from "./ReviewBox";
import RegisterStepHeader from "@/app/components/RegisterStepHeader";
import useProcessing from "@/hooks/useProcessing";
import { useEffect } from "react";
import { forms } from "@/app/modules/constants";

export default function Review({ setIsOnboarding, setTmpCat }) {
  const { setProcessing, setForm } = useProcessing();

  const { title, subtitle, hand } = forms["review"];
  useEffect(() => {
   setProcessing(false);
    setForm("review");
  }, []);

  return (
    <div className="flex flex-col">
      <RegisterStepHeader
        title={title}
        subtitle={subtitle}
        hand={hand}
        align="center"
      />
      <ReviewBox setIsOnboarding={setIsOnboarding} setTmpCat={setTmpCat} />
    </div>
  );
}
