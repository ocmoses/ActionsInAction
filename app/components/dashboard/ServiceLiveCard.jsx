import usePartners from "@/hooks/usePartners";
import { useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";

export default function ServiceLiveCard() {
  const [showCard, setShowCard] = useState(false);

  const { partner, getOnboardingStatus } = usePartners();
  const { user } = useUsers();

  useEffect(() => {
    getOnboardingStatus(partner?.uuid).then((resp) => {
      if (resp.error) {
        console.log("ONBOARDING STATUS ERROR", { error: resp.error });
      } else {
        if (resp.result.success) {
          const onboardingData = resp.result.data[0]["onboarding"];

          const allCompleted = onboardingData.every(
            (item) => item.status === "completed"
          );
          setShowCard(allCompleted);
        }
      }
    });
  }, []);

  return (
    showCard &&
    user.role == "superAdmin" && (
      <div
        className={`flex flex-col gap-4 max-w-[837px] mt-16 w3-animate-opacity`}
      >
        <div
          onClick={() => {}}
          className={`flex flex-col cursor-pointer items-center md:flex-row justify-between gap-6 cursor bg-[#111111] p-[24px] border border-white/10 rounded-xl`}
        >
          <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-6 items-start">
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center w-[20px] h-[20px] text-[#FFCB03] rounded-full bg-white/10">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3719 25.8687C20.2737 25.8687 25.8687 20.2737 25.8687 13.3719C25.8687 6.47004 20.2737 0.875 13.3719 0.875C6.47004 0.875 0.875 6.47004 0.875 13.3719C0.875 20.2737 6.47004 25.8687 13.3719 25.8687ZM20.4562 8.64567C20.9096 9.1073 20.9029 9.84907 20.4412 10.3025L12.4887 18.113C12.0329 18.5606 11.3026 18.5606 10.8468 18.113L6.3025 13.6498C5.84087 13.1965 5.83418 12.4547 6.28757 11.993C6.74097 11.5314 7.48274 11.5247 7.94438 11.9781L11.6678 15.635L18.7994 8.63074C19.261 8.17735 20.0028 8.18403 20.4562 8.64567Z"
                    fill="#4DCD97"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center sm:items-start h-full">
              <span className=" text-lg text-white">
                Your service is now live!
              </span>
              <span className="text-[#999999] text-[12px] text-center md:text-left">
                Your aggregator has approved your service and published live!
              </span>
              <span>
                <button
                  className="text-[#999999] border-[#999999] border  hover:bg-mtn-900 p-4 py-2 rounded-full mt-4"
                  onClick={() => setShowCard(false)}
                >
                  Got-It!
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
