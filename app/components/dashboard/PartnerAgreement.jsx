import { complianceRequirements } from "@/app/modules/constants"
import Text from "@/app/components/dashboard/partners/fields/Text"
import Date from "@/app/components/dashboard/partners/fields/Date"
import File from "@/app/components/dashboard/partners/fields/File"
import State from "@/app/components/dashboard/partners/fields/State"
import Country from "@/app/components/dashboard/partners/fields/Country"
import CompanyType from "@/app/components/dashboard/partners/fields/CompanyType"
import Shortcodes from "@/app/components/dashboard/partners/fields/Shortcodes"

export default function ComplianceFieldEditModal({ setShowModal, parner }) {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="flex items-center min-h-screen">
          <div className="relative w-full max-w-[1024px] mx-auto bg-[#111111] border border-[#333333]  py-[48px] px-[48px]  pb-[24px] rounded-md shadow-lg">
            <h1>Agree</h1>
          </div>
        </div>
      </div>
    </>
  )
}
