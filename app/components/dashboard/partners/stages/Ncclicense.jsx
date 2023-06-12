import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners";
import { approvalFields } from "@/app/modules/constants";

export default function Ncclicense({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        {approvalFields.vas_license_id?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="vas_license_id"
            type="text"
          />
        )}
        {approvalFields.ncc_issue_date?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="ncc_issue_date"
            type="date"
          />
        )}
        {approvalFields.ncc_expiry_date?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="ncc_expiry_date"
            type="date"
          />
        )}
        {approvalFields.ncc_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="ncc_doc"
            type="file"
          />
        )}
      </div>
    )
  );
}
