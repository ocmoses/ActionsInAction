import { complianceRequirements } from "@/app/modules/constants";
import Text from "@/app/components/dashboard/partners/fields/Text";
import Date from "@/app/components/dashboard/partners/fields/Date";
import File from "@/app/components/dashboard/partners/fields/File";
import State from "@/app/components/dashboard/partners/fields/State";
import Country from "@/app/components/dashboard/partners/fields/Country";
import CompanyType from "@/app/components/dashboard/partners/fields/CompanyType";
import Shortcodes from "@/app/components/dashboard/partners/fields/Shortcodes";

export default function ComplianceFieldEditModal({ setShowModal, data, provided }) {
  let type_of_file = "";
  switch (data.type) {
    case "shortcode_doc":
    case "pricing_doc":
      data.type = "file";
      break;
    case "shortcode_issue_date":
    case "shortcode_expiry_date":
    case "pricing_issue_date":
    case "pricing_expiry_date":
      data.type = "date";
      break;
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
                {
                  provided ? 
                    (`Update ${complianceRequirements[data.category_stage][data.field]?.title}`) : 
                    (`Provide ${complianceRequirements[data.category_stage][data.field]?.title}`)
                }
                
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
            {data.type === "company_state" && (
              <>
                <State data={data} setShowModal={setShowModal} />
              </>
            )}
            {data.type === "country" && (
              <>
                <Country data={data} setShowModal={setShowModal} />
              </>
            )}
            {data.type === "company_type" && (
              <>
                <CompanyType data={data} setShowModal={setShowModal} />
              </>
            )}
            {(data.type === "shortcodes" ||
              data.type === "pricing_shortcodes") && (
              <>
                <Shortcodes data={data} setShowModal={setShowModal} />
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
  );
}
