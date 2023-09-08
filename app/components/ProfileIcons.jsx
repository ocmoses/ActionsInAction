import UserAvartar from "@/app/components/UserAvartar";
import Notifications from "@/app/components/Notifications";
import { useStoreState } from "easy-peasy";
import Image from "next/image";

import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";

import { useState } from "react";
import PopUp, { PartnerContactUsSuccess } from "@/app/components/PopUps";
import PartnerContactUsForm from "@/app/components/contactus/PartnerContactUsForm";

export default function ProfileIcons() {
  const {
    session: { user },
  } = useUsers();
  const {
    partner,
    category,
    categories,
    updatePartner,
    setValidationRules,
    setCurrentCategory,
    nextStage,
  } = usePartners();
  const states = useStoreState((state) => state);
  // console.log("User Object", states.users.token)
  const [popUp, setPopUp] = useState(false);
  const [contactSubmit, setContactSubmit] = useState(false);
  const openPopUp = () => {
    setPopUp(true);
    setContactSubmit(false);
  };
  const closePopUp = () => {
    setPopUp(false);
  };

  const submitContact = () => {
    setContactSubmit(true);
  };

  // console.log('notifications from adminProfileIcons', notifications)
  return (
    <>
      {/* //================this is the popup==============================================================================================================*/}

      {popUp && (
        <PopUp closePopUp={closePopUp}>
          {!contactSubmit ? (
            <PartnerContactUsForm
              closePopUp={closePopUp}
              submitForm={submitContact}
              partnerName={user.first_name}
              partnerEmail={user.email}
              token={states.users.token}
            /> // If contactSubmit is false
          ) : (
            <PartnerContactUsSuccess closePopUp={closePopUp} /> // If contactSubmit is true
          )}
        </PopUp>
      )}

      {/*//==============================================================================================================================*/}

      {/*//==============================================================================================================================*/}
      <div className="flex gap-6 items-center justify-end">
        <div className=" text-[#888888] w-[20px] h-[20px] cursor-pointer group/help">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          {/*//===the help layer===========================================================================================================================*/}
          <div className=" w-[320px] min-h-[300px] ml-[-280px] rounded-[5px] bg-[#111111] border-1 border-white/20 hidden group-hover/help:block">
            <div className="p-2 pt-0 flex flex-col gap-3">
              <h2 className="text-white h-[50px]  border-b border-b-white/20 leading-[50px]">
                Help and support
              </h2>

              <div className="flex flex-row gap-3 justify-center w-full min-h-[120px] rounded-[5px] p-2 text-[14px]  hover:bg-white/10">
                <div>
                  <Image
                    priority
                    src="/assets/icons/ChatCircleText.png"
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <h3 className="text-white">Frequently asked questions</h3>
                  <p>
                    If you have general questions , check out our FAQs where you
                    might find the answer you're after even quicker.
                  </p>
                </div>
                <div>
                  <Image
                    priority
                    src="/assets/icons/CaretRight.png"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              <div
                className="flex flex-row gap-3 justify-center  w-full min-h-[120px] rounded-[5px] p-2 text-[14px] hover:bg-white/10"
                onClick={openPopUp}
              >
                <div>
                  <Image
                    priority
                    src="/assets/icons/EnvelopeSimple.png"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-white">Contact us</h3>
                  <p>
                    Let us know what problem you are facing. We’ll be in touch
                    shortly.
                  </p>
                </div>
                <div>
                  <Image
                    priority
                    src="/assets/icons/CaretRight.png"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*//==============================================================================================================================*/}
        </div>{" "}
        <Notifications count={states.notifications.count} />
        <UserAvartar />
      </div>
    </>
  );
}
