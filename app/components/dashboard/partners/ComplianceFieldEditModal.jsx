import { complianceRequirements } from "@/app/modules/constants"
import Text from "@/app/components/dashboard/partners/fields/Text"
import Date from "@/app/components/dashboard/partners/fields/Date"
import File from "@/app/components/dashboard/partners/fields/File"

export default function ComplianceFieldEditModal({ setShowModal, data }) {
  let type_of_file = ""
  switch (data.type) {
    case "shortcode_doc":
      data.type = "file"
      break
    case "pricing_doc":
      data.type = "file"
      break

    // tin,
    //   memart,
    //   cac,
    //   ncc,
    //   nlrc,
    //   shortcode,
    //   indemnity,
    //   audited_account_1,
    //   audited_account_2,
    //   audited_account_3,
    //   job_evidence
  }

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
            {data.type === "text" && (
              <>
                <Text data={data} setShowModal={setShowModal} />
              </>
            )}
            {data.type === "date" && (
              <>
                <Date data={data} setShowModal={setShowModal} />
              </>
            )}
            {data.type === "file" && (
              <>
                <File
                  data={data}
                  setShowModal={setShowModal}
                  type_of_file={type_of_file}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
