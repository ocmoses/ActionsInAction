import moment from "moment";

export default function RejectionReasons({ title, field, approvals, onclick }) {
  const fielddata = approvals?.counts?.rejections[field].sort((s1, s2) =>
    s1.created_at > s2.created_at ? -1 : s1.created_at < s2.created_at ? 1 : 0
  );
  const rejections = fielddata[0];
  return (
    fielddata.length > 0 && (
      <div className="flex gap-4 w-full p-[16px] mt-3 bg-white/10 rounded-[8px]">
        <div className="flex items-center justify-center w-[24px] h-[24px] bg-white/20 rounded-full">
          {rejections?.admin_user?.username[0]}
        </div>
        <div className="flex flex-col items-start gap-0 w-full">
          <div className="flex items-center gap-1">
            <span className="text=[12px] text-[#999999]">
              {rejections?.admin_user?.username}
            </span>
            <span className="w-1 h-1 bg-[#999999] rounded-full"></span>
            <span className="text-[12px] text-[#999999]">
              {moment(rejections?.created_at).format("MM D, YYYY")}
            </span>
          </div>
          <div className="flex w-full text-[13px] text-white">
            {rejections?.feedback}
          </div>
          <div
            onClick={onclick}
            className="inline-flex mt-3 grow-0 cursor-pointer hover:bg-white/20 text-[12px] text-white rounded-full px-[12px] border border-white/80 py-1"
          >
            Update {title}
          </div>
        </div>
      </div>
    )
  );
}
