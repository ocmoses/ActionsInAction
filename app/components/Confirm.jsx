import { useState, useEffect } from "react";
import { Util } from "@/app/modules/utilities";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";

export default function Confirm({
  yestext,
  notext,
  onYes,
  onNo,
  type,
  feedback,
  othersAction=null,
  setFormData,
  formData
}) {
  const [reason, setReason] = useState(null);
  const [showReason, setShowReason] = useState(false);
  const { rejectionReasons, approving, setApproving } = useAdmins();
  const [{ errors, clearErrors }] = useErrors(null);

  const [hide, setHide] = useState(false);

  useEffect(() => {
    setApproving(false);
    clearErrors();
  }, []);

  const Reject = () => {
    onYes(reason);
  };
  const handleSetReason = (_reason) => {
    if(_reason.rejection_reason == "Others"){
      othersAction && othersAction(true);     
    }else{
      othersAction && othersAction(false);  
    }
    
    setHide(false);  
    setReason(_reason);
    setShowReason(false);

    if(formData){
      setFormData({
        ...formData,
        feedback: _reason.rejection_reason,
      });
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        {errors?.approval && (
          <div className="flex w-full">
            <FormErrors error={errors.approval} />
          </div>
        )}
        <div
          className={`flex justify-between items-end gap-4 rounded-lg shadow-lg border border-${
            type === "approve" ? "green-600" : "red-600"
          } p-3 mb-3 w-full bg-[#212121]`}
        >
          <div className="flex flex-1 gap-4">
            {type === "approve" && (
              <section>
                <span className="text-mtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </span>
                <span className="text-[#999999]">
                  Are you sure you want to approve?
                </span>
              </section>
            )}
            {type === "reject" && (
              <div className="flex flex-col w-full">
                <span className="text-[#999999] text-[12px]">
                  Reason for rejection
                </span>
                <div className="flex flex-col relative z-50">
                  <div
                    onClick={() => setShowReason(true)}
                    className="text-[13px] leading-[85%] rounded-full border border-white/20 px-3 py-2 text-white cursor-pointer"
                  >
                    {!Util.isEmpty(reason)
                      ? reason?.rejection_reason
                      : "Select a reason for rejection"
                    }
                    
                  </div>
                  <div
                    style={{
                      display: showReason ? "block" : "none",
                    }}
                    onMouseLeave={() => setShowReason(false)}
                    className="absolute bg-[#212121] text-[#999999] flex flex-col border border-white/20 rounded-xl max-h-[300px] overflow-y-auto w-full"
                  >
                    {rejectionReasons?.length > 0 &&
                      rejectionReasons.map((_reason) => (
                        <span
                          key={_reason.uuid}
                          onClick={() => handleSetReason(_reason)}
                          className="flex px-3 py-2 cursor-pointer hover:bg-white/20 text-[#999999] text-[12px]"
                        >
                          {_reason.rejection_reason}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {approving && (
            <div className="flex justify-center items-center">
              <TailSpinPreloader width={30} height={30} fill="#efb703" />
            </div>
          )}
          {!approving && !hide && (
            <div className="flex-none">
              {onYes && (
                <button
                  onClick={type === "approve" ? onYes : Reject}
                  className={`${
                    type === "approve"
                      ? "bg-green-600 hover:bg-green-300"
                      : "bg-red-600 hover:bg-red-300"
                  } mr-2 px-4 py-1 rounded-full text-[11px] text-black`}
                >
                  {yestext ?? "Yes"}
                </button>
              )}
              {onNo && (
                <button
                  onClick={onNo}
                  className="bg-white/60 hover:bg-white/90 px-4 py-1 rounded-full text-[11px] text-gray-600"
                >
                  {notext ?? "No"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
