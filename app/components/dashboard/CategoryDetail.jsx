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
  const { partner, setCategory, registerPartner } = usePartners()

  const { processing, setProcessing, moveToNextForm } = useProcessing()

  const selectCategory = async (category) => {
    clearErrors()
    setCategory(category)
    const result = await registerPartner("category", {
      user_uuid: partner?.user_uuid ?? "",
      partner_uuid: partner?.uuid ?? "",
      category_uuid: category.uuid,
    })
    console.log({ result })
    if (result) {
      setProcessing(false)
      if (result?.error) {
        return setError({ category: result.error })
      }
      // setForm("compliance")
      moveToNextForm(["compliance", category, true])
      console.log("moveToNextForm")
      setIsOnboarding(true)
      console.log("setIsOnboarding")
      setIsOpen(false)
      console.log("setIsOpen")
      return
    }
    setError({ category: "Something went wrong" })
  }

  return (
    <div className="pt-[56px] pb-0 px-[40px] h-full">
      <div className="flex flex-col h-full justify-start gap-6 scrollbar scrollbar-thumb-[#FFCB03] scrollbar-track-[#212121] scrollbar-w-[2px]">
        <div className="flex flex-col flex-1 gap-8 justify-start items-start mb-auto pr-4">
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
              informations from our {category.category_code} providers.
            </p>
          </div>

          <div className="">
            <ul className="flex flex-col gap-4">
              {validation?.required?.length > 0 &&
                validation?.required?.map((required) => (
                  <li
                    key={required}
                    className="flex justify-start items-center gap-4"
                  >
                    <div className="flex justify-center items-center p-1 rounded-full bg-white/10">
                      <CircleOkCheckmarkIcon iconClass="text-[#FFCB03] w-4 h-4" />
                    </div>
                    <span className="text-white font-bold">{required}</span>
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
  )
}
