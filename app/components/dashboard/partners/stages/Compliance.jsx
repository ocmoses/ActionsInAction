import ComplianceLabelPartners from "@/app/components/dashboard/partners/ComplianceLabelPartners";
import { approvalFields } from "@/app/modules/constants";

export default function Compliance({ category, stage }) {
  return (
    category && (
      <div className="flex flex-col items-start gap-4 w-full rounded-xl p-3 mb-6 bg-[#030303]">
        {approvalFields.company_type?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="company_type"
            type="company_type"
          />
        )}
        {approvalFields.rc_no?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="rc_no"
            type="text"
          />
        )}
        {approvalFields.tin_no?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="tin_no"
            type="text"
          />
        )}
        {approvalFields.tin_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="tin_doc"
            type="file"
          />
        )}
        {approvalFields.memart_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="memart_doc"
            type="file"
          />
        )}
        {approvalFields.cac_doc?.approval && (
          <ComplianceLabelPartners
            category={category}
            stage={stage}
            field="cac_doc"
            type="file"
          />
        )}
      </div>
    )
  );
}
