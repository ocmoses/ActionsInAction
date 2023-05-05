import { complianceRequirements } from "@/app/modules/constants"
import Text from "@/app/components/dashboard/partners/fields/Text"

export default function ComplianceFieldEditModal({ setShowModal, data }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="flex items-center min-h-screen">
          <div className="relative w-full max-w-[496px] mx-auto bg-[#111111] border border-[#333333]  py-[48px] px-[48px]  pb-[24px] rounded-md shadow-lg">
            {data.category_stage in complianceRequirements && (
              <span className="text-[24px] leading-[32px] m-0 text-white">
                Update{" "}
                {complianceRequirements[data.category_stage][data.field]?.title}
              </span>
            )}
            {data.type === "text" && <Text data={data} />}
            {data.type === "date" && <Date data={data} />}
          </div>
        </div>
      </div>
    </>
  )
}
