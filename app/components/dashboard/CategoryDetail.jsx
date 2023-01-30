import Image from "next/image"
import Button from "@/app/components/form/Button"
import useProcessing from "@/hooks/useProcessing"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import { forms } from "@/app/modules/constants"
import { CircleOkCheckmarkIcon } from "@/app/components/Icons"
import { useEffect, useState } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function CategoryDetail({ category, setIsOnboarding }) {
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const { partner, registerPartner } = usePartners()
  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  })
  const {
    processing,
    setProcessing,
    setFormSteps,
    moveToNextForm,
    setActiveCategory,
  } = useProcessing()

  useEffect(() => {
    setProcessing(false)
    const required = []
    const optional = []
    const allForms = { required: [], optional: [], all: [] }
    if (category.validation) {
      for (const validate in category.validation) {
        if (category.validation[validate] === "r") {
          required.push(forms[validate].label)
          allForms.required.push(validate)
          allForms.all.push(validate)
        } else if (category.validation[validate] === "o") {
          optional.push(forms[validate].label)
          allForms.optional.push(validate)
          allForms.all.push(validate)
        }
      }
    }
    setValidation({ required, optional, allForms })
  }, [])

  const selectCategory = async (uuid) => {
    clearErrors()
    setProcessing(true)
    const result = await registerPartner("category", { category_uuid: uuid })
    if (result) {
      console.log({ result })
      setProcessing(false)
      if (result?.error) setError({ category: result.error })
    } else {
      setFormSteps(validation)
      setActiveCategory(uuid)
      moveToNextForm("category")
      setIsOnboarding(true)
    }
  }

  return (
    <div className="py-[56px] px-[40px]">
      <div className="flex flex-col justify-start items-start gap-8 ">
        <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
          {category.icon && (
            <Image src={category.icon} alt="" width={24} height={24} />
          )}
        </div>
        {errors["category"] && (
          <div className="mb-6">
            <FormErrors error={errors["category"]} />
          </div>
        )}
        <div className="">
          <h1 className="text-white text-xl font-bold">
            {category.category_name}
          </h1>
          <p className="text-md text-[#999999]">{category.short_description}</p>
        </div>
        <div className="">
          <h3 className="text-white text-lg font-bold">Get started</h3>
          <p className="text-md text-[#999999]">
            For regulatory compliance, we’ll require the following informations
            from our VAS providers.
          </p>
        </div>
        <div className="">
          <ul className="flex flex-col gap-4">
            {validation.required.length > 0 &&
              validation.required.map((required) => (
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
        {processing ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <Button
            onClick={() => selectCategory(category.uuid)}
            label="Get started"
          />
        )}
      </div>
    </div>
  )
}
