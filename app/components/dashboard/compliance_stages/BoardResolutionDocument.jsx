import ComplianceLabel from "../ComplianceLabel";
import { approvalFields } from "@/app/modules/constants";

export default function BoardResolutionDocument({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        
          <ComplianceLabel
            category={category}
            stage={stage}
            field="board_resolution_document"
            type="file"
          />
        
      </div>
    )
  );
}
