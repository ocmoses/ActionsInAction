import { forms, fieldCounts } from "@/app/modules/constants";
import Image from "next/image";
import useAdmins from "@/hooks/useAdmins";
import useRoles from "@/hooks/useRoles";
import CategoryStageStatus from "@/app/components/dashboard/compliance/CategoryStageStatus";

export default function ComplianceCategories({
  Stages,
  activeCategory,
  onclick,
  partner,
}) {
  const { admin } = useAdmins();
  const { isSuperadmin } = useRoles();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
      {/* {console.log({ Stages })} */}
      {Stages?.forms?.length > 0 &&
        Stages?.forms?.map(
          (stage) =>
            (isSuperadmin() ||
              (admin &&
                admin.department_code in fieldCounts[stage] &&
                "fields" in fieldCounts[stage][admin.department_code])) && (
              <div
                key={stage}
                onClick={() => onclick(stage)}
                className="flex flex-col gap-3 p-4 rounded-xl border border-transparent hover:bg-white/10 hover:border hover:border-white/20 max-w-[280px] cursor-pointer"
              >
                <div className="flex justify-center items-center w-[40px] h-[40px] text-[#FFCB03] rounded-full bg-white/20">
                  {activeCategory?.icon && (
                    <Image
                      src={activeCategory.icon}
                      alt=""
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                <div className="text-white text-[16px]">
                  {forms[stage].shortname}
                </div>
                <div className="text-[#999999] text-[13px]">
                  {forms[stage].listdesc}
                </div>
                <div className="mt-6">
                  <CategoryStageStatus
                    category={activeCategory}
                    stage={stage}
                    partner={partner}
                  />
                </div>
              </div>
            )
        )}
    </div>
  );
}
