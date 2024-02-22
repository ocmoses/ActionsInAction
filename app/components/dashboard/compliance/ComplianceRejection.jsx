import usePartners from "@/hooks/usePartners";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUsers from "@/hooks/useUsers";
import ComplianceCorrectionModal from "@/app/components/modals/ComplianceCorrectionModal";

export default function ComplianceRejection() {
  const router = useRouter();

  const { getComplianceStatus, partner } = usePartners();

  const [showAlert, setShowAlert] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [rejected, setRejected] = useState([]);

  const [selectedRejection, setSelectedRejection] = useState([]);

  const [expanded, setExpanded] = useState(false);

  let rejectionArray = [];

  useEffect(() => {
    //TODO: change this implementation because vas partner uuid can be more than one
    getComplianceStatus(
      partner.uuid,
      partner.vas_partners[2]["vas_partner_uuid"]
    ).then((resp) => {
      if (resp.error) {
        console.log("COMPLIANCE REJECTION ERROR", { error: resp.error });
      } else {
        rejectionArray = resp.data[0]["compliance_approvals"].filter(
          (approval) => approval.status === "rejected"
        );

        if (rejectionArray.length > 0) {
          console.log("Rejected items:", rejectionArray);
          setShowAlert(true);
          setRejected(rejectionArray);
        }

        console.log("Rejection Array", rejectionArray);
      }
    });
  }, []);

  const { user } = useUsers();

  return (
    showAlert &&
    user.role == "superAdmin" && (
      <>
        <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
          <div className="p-[24px] ">
            <div className="flex flex-row gap-3">
              <div>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 27.5C8.1125 27.5 2.5 21.8875 2.5 15C2.5 8.1125 8.1125 2.5 15 2.5C21.8875 2.5 27.5 8.1125 27.5 15C27.5 21.8875 21.8875 27.5 15 27.5ZM14.0625 20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V13.75C15.9375 13.2375 15.5125 12.8125 15 12.8125C14.4875 12.8125 14.0625 13.2375 14.0625 13.75V20ZM16.15 9.525C16.0875 9.3625 16 9.2375 15.8875 9.1125C15.7625 9 15.625 8.9125 15.475 8.85C15.325 8.7875 15.1625 8.75 15 8.75C14.8375 8.75 14.675 8.7875 14.525 8.85C14.375 8.9125 14.2375 9 14.1125 9.1125C14 9.2375 13.9125 9.3625 13.85 9.525C13.7875 9.675 13.75 9.8375 13.75 10C13.75 10.1625 13.7875 10.325 13.85 10.475C13.9125 10.625 14 10.7625 14.1125 10.8875C14.2375 11 14.375 11.0875 14.525 11.15C14.825 11.275 15.175 11.275 15.475 11.15C15.625 11.0875 15.7625 11 15.8875 10.8875C16 10.7625 16.0875 10.625 16.15 10.475C16.2125 10.325 16.25 10.1625 16.25 10C16.25 9.8375 16.2125 9.675 16.15 9.525Z"
                    fill="#FE9D8F"
                  />
                </svg>
              </div>
              <div className="flex flex-col w-full gap-5">
                <div className="flex flex-row w-full justify-between items-stretch">
                  <div className="text-gray-500 ">
                    <p>
                      <span className="text-white">
                        There were some errors with your submission
                      </span>
                      <br />
                      <span className="text-white/60">
                        Please review the following errors and resubmit.
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {!expanded ? (
                      <div onClick={() => setExpanded(true)} className="">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5C24.5604 0.5 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.5 24.5604 0.5 16Z"
                            stroke="#424242"
                          />
                          <path
                            d="M11.6199 13.2867C11.5383 13.3682 11.4736 13.465 11.4294 13.5715C11.3853 13.6781 11.3625 13.7923 11.3625 13.9076C11.3625 14.0229 11.3853 14.1371 11.4294 14.2436C11.4736 14.3501 11.5383 14.4469 11.6199 14.5284L15.4091 18.3259C15.4865 18.4035 15.5784 18.4651 15.6797 18.5071C15.7809 18.5491 15.8895 18.5707 15.9991 18.5707C16.1087 18.5707 16.2172 18.5491 16.3185 18.5071C16.4197 18.4651 16.5117 18.4035 16.5891 18.3259L20.3807 14.5276C20.5452 14.3631 20.6376 14.1401 20.6376 13.9076C20.6376 13.675 20.5452 13.452 20.3807 13.2876C20.2163 13.1231 19.9933 13.0308 19.7607 13.0308C19.5282 13.0308 19.3052 13.1231 19.1407 13.2876L15.9991 16.4342L12.8591 13.2876C12.7777 13.2062 12.6812 13.1416 12.5748 13.0975C12.4685 13.0535 12.3546 13.0308 12.2395 13.0308C12.1244 13.0308 12.0105 13.0535 11.9041 13.0975C11.7978 13.1416 11.7012 13.2062 11.6199 13.2876V13.2867Z"
                            fill="#8E8E8E"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div onClick={() => setExpanded(false)} className="">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M31.5 16C31.5 24.5604 24.5604 31.5 16 31.5C7.43959 31.5 0.500001 24.5604 0.500001 16C0.500002 7.43958 7.43959 0.499998 16 0.499999C24.5604 0.499999 31.5 7.43959 31.5 16Z"
                            stroke="#424242"
                          />
                          <path
                            d="M20.38 18.7133C20.4616 18.6318 20.5263 18.535 20.5704 18.4285C20.6146 18.3219 20.6373 18.2077 20.6373 18.0924C20.6373 17.9771 20.6146 17.8629 20.5704 17.7564C20.5263 17.6499 20.4616 17.5531 20.38 17.4716L16.5908 13.6741C16.5134 13.5965 16.4214 13.5349 16.3202 13.4929C16.2189 13.4509 16.1104 13.4293 16.0008 13.4293C15.8912 13.4293 15.7827 13.4509 15.6814 13.4929C15.5802 13.5349 15.4882 13.5965 15.4108 13.6741L11.6191 17.4724C11.4547 17.6369 11.3623 17.8599 11.3623 18.0924C11.3623 18.325 11.4547 18.548 11.6191 18.7124C11.7836 18.8769 12.0066 18.9692 12.2391 18.9692C12.4717 18.9692 12.6947 18.8769 12.8591 18.7124L16.0008 15.5658L19.1408 18.7124C19.2221 18.7938 19.3187 18.8584 19.425 18.9025C19.5313 18.9465 19.6453 18.9692 19.7604 18.9692C19.8755 18.9692 19.9894 18.9465 20.0957 18.9025C20.202 18.8584 20.2986 18.7938 20.38 18.7124L20.38 18.7133Z"
                            fill="#8E8E8E"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {!expanded ? (
                  ""
                ) : (
                  <>
                    {rejected.map((item, index) => (
                      <div className="flex flex-row w-full justify-between">
                        <div className="text-gray-500 ">
                          <p>
                            <span className="text-white">{item.field}</span>
                            <br />
                            <span className="text-white/60">
                              {item.feedback}
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setSelectedRejection(item);
                              setShowModal(true);
                            }}
                            className="h-[40px] w-[100px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30 hover:bg-white/10"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <ComplianceCorrectionModal
            rejected={selectedRejection}
            closeAction={() => setShowModal(false)}
          />
        )}
      </>
    )
  );
}
