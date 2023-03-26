import Image from "next/image"
import Button from "@/app/components/form/Button"
import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import { CircleOkCheckmarkIcon } from "@/app/components/Icons"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function CategoryDetail({
  category,
  setIsOnboarding,
  setIsOpen,
  validation,
}) {
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const {
    partner,
    category: partner_category,
    updatePartner,
    setCategory,
    registerPartner,
    setCurrentCategory,
    nextStage,
  } = usePartners()
  const { processing, setProcessing, setForm } = useProcessing()

  const selectCategory = async (sysCategory) => {
    clearErrors()
    const result = await registerPartner("category", {
      user_uuid: partner?.user_uuid ?? "",
      partner_uuid: partner?.uuid ?? "",
      category_uuid: sysCategory.uuid,
    })
    if (result) {
      setProcessing(false)
      if (result?.error) {
        return setError({ category: result.error })
      }
      if (result.data?.partner) {
        const newcategory = { ...result?.data?.category }
        // const newcategory = {
        //   id: 77,
        //   uuid: "604e8d8a-cf17-4490-9f33-bf4cff4e530c",
        //   user_uuid: "8c504bfa-0854-434f-8b5d-33bc1634f988",
        //   partner_uuid: "81eefef9-2751-4061-abaf-98c032567f30",
        //   category_uuid: "5f771978-91ee-11ed-bd03-acde48001122",
        //   company_name: "MTN Nigeria",
        //   country: "NG",
        //   company_address: "Falomo, Ikoyi, Lagos",
        //   company_city: "Ikoyi",
        //   company_state: "Lagos",
        //   company_postcode: "123456",
        //   company_type: "co",
        //   rc_no: "12345678",
        //   tin_no: "654326",
        //   tin_doc: {
        //     file_name: "hello-world - Copy.pdf",
        //     file_size: 36722,
        //     file_type: "pdf",
        //     file_path:
        //       "http://10.1.44.40/partner/hello-world - Copy_2023-03-26-13-08-16.pdf",
        //   },
        //   tin_data: null,
        //   valid_tin: "yes",
        //   memart_doc: {
        //     file_name: "hello-world - Copy.pdf",
        //     file_size: 36722,
        //     file_type: "pdf",
        //     file_path:
        //       "http://10.1.44.40/partner/hello-world - Copy_2023-03-26-13-08-16.pdf",
        //   },
        //   cac_doc: {
        //     file_name: "hello-world - Copy.pdf",
        //     file_size: 36722,
        //     file_type: "pdf",
        //     file_path:
        //       "http://10.1.44.40/partner/hello-world - Copy_2023-03-26-13-08-16.pdf",
        //   },
        //   cac_data: null,
        //   valid_cac: "yes",
        //   vas_license_id: null,
        //   ncc_issue_date: null,
        //   ncc_expiry_date: null,
        //   ncc_doc: null,
        //   nlrc_license_id: null,
        //   nlrc_issue_date: null,
        //   nlrc_expiry_date: null,
        //   nlrc_doc: null,
        //   nlrc_license_type: null,
        //   indemnity_no: "123456789",
        //   indemnity_issue_date: "2023-01-20",
        //   indemnity_expiry_date: "2023-06-20",
        //   indemnity_doc: {
        //     file_name: "hello-world - Copy.pdf",
        //     file_size: 36722,
        //     file_type: "pdf",
        //     file_path:
        //       "http://10.1.44.40/partner/hello-world - Copy_2023-03-26-13-21-38.pdf",
        //   },
        //   account_name: null,
        //   account_no: null,
        //   bank: null,
        //   audited_account_1_doc: null,
        //   audited_account_2_doc: null,
        //   audited_account_3_doc: null,
        //   job_evidence_doc: null,
        //   created_by: null,
        //   updated_by: null,
        //   status: "open",
        //   status_date: null,
        //   created_at: "2023-03-26T13:07:45.000000Z",
        //   updated_at: "2023-03-26T13:21:38.000000Z",
        //   shortcodes: [],
        //   percentage: "40",
        //   profile_stage: {
        //     userinfo: null,
        //     category: "1",
        //     companydetail: "1",
        //     compliance: "1",
        //     ncclicense: null,
        //     nlrclicense: null,
        //     shortcode: null,
        //     indemnity: "1",
        //     accountinfo: null,
        //   },
        //   validation: {
        //     accountinfo: "r",
        //     companydetail: "r",
        //     compliance: "r",
        //     indemnity: "o",
        //     ncclicense: "r",
        //     nlrclicense: "r",
        //     review: "r",
        //     shortcode: "r",
        //   },
        // }
        updatePartner(result?.data?.partner)
        newcategory.profile_stage.category = "1"
        setCurrentCategory(newcategory, partner)
        const { nextstage: NextStage } = nextStage(newcategory, partner)
        console.log({ NextStage })
        setForm(NextStage)
        setIsOnboarding(true)
        return setIsOpen(false)
      }
    }
    setError({
      category:
        "Unable to reach the server. Please check your connection and retry",
    })
  }

  return (
    <div className="p-0 h-full pt-[50px]">
      <div className="h-full overflow-x-hidden scrollbar scrollbar-thumb-[#FFCB03] scrollbar-track-[#212121] !scrollbar-w-[4px]">
        <div className="w-full px-6">
          <div className="flex flex-col flex-1 gap-8 justify-start items-start mb-auto">
            <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
              {category.icon && (
                <Image
                  src={category.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="text-[#FFCB03]"
                />
              )}
            </div>
            {errors && errors["category"] && (
              <div className="mb-6">
                <FormErrors error={errors["category"]} />
              </div>
            )}
            <div className="">
              <h1 className="text-white text-xl font-bold">
                {category.category_name}
              </h1>
              <p className="text-md text-[#999999]">
                {category.short_description}
              </p>
            </div>
            <div className="">
              <h3 className="text-white text-lg font-bold">Get started</h3>
              <p className="text-md text-[#999999]">
                For regulatory compliance, we’ll require the following
                informations from our{" "}
                {category.category_code === "AGR" ? (
                  <>aggrigators</>
                ) : (
                  <>{category.category_code} providers.</>
                )}
              </p>
            </div>
            <div className="max-w-[95%] mb-6">
              <ul className="">
                {validation?.list?.length > 0 &&
                  validation?.list?.map((list) => (
                    <li
                      key={list.label}
                      className="flex justify-start items-start gap-4 mb-2"
                    >
                      <div className="flex justify-center items-center p-1 rounded-full bg-white/10">
                        <CircleOkCheckmarkIcon iconClass="text-[#FFCB03] w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-[14px]">
                          {list.label}
                        </span>
                        <span className="text-[#999999] font-extralight text-[12px] text-ellipsis overflow-hidden max-w-[95%]">
                          {list.listdesc}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="">
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button
                onClick={() => selectCategory(category)}
                label={`Get started`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
