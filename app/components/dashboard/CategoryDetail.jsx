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
                For regulatory compliance, we'll require the following
                informations from our{" "}
                {category.category_code === "AGR" ? (
                  <>aggregators</>
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
