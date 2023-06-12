import moment from "moment";
import { complianceRequirements } from "@/app/modules/constants";

export default function Activities({ type, stage, feedbacks }) {
  return (
    <div className="flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto justify-start items-start p-6 pb-24">
      {type === "admin" &&
        feedbacks &&
        feedbacks.map((feedback) => (
          <div key={feedback.uuid} className="flex gap-2 items-start">
            <div className="flex justify-center items-center bg-white/40 w-[24px] h-[24px] rounded-full">
              {feedback?.admin_user?.username &&
                feedback?.admin_user?.username[0].toUpperCase()}
            </div>
            <div className="text-white/70 text-[13px]">
              <div>
                <span className="text-white">
                  {feedback?.admin_user?.username}{" "}
                </span>
                <span className="text-white/70 font-mtn-extralight">
                  updated{" "}
                </span>
                <span className="text-white">
                  {complianceRequirements[stage][feedback.field]?.title}
                </span>
              </div>
              <div>
                <span
                  className={`text-${
                    feedback.status === "approved" ? "green" : "red"
                  }-600`}
                >
                  {feedback.status === "approved" ? "Approved" : "Rejected"}
                </span>{" "}
                <span className="text-white/70 font-mtn-extralight text-[12px]">
                  {moment(feedback.created_at).format(
                    "MMM Do, YYYY [at] h:mm:ss a"
                  )}
                </span>
              </div>
              {feedback.status === "rejected" && (
                <div className="border rounded-full border-dotted border-white/30 leading-[89%] px-3 py-2 text-[13px] text-white/70">
                  <span className="text-white/50 font-mtn-extralight">
                    Reason:
                  </span>{" "}
                  {feedback.feedback}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
