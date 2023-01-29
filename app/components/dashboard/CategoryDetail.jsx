import Image from "next/image"
import { forms } from "@/app/modules/constants"
import { CircleOkCheckmarkIcon } from "@/app/components/Icons"
import { useEffect, useState } from "react"
import Button from "@/app/components/form/Button"
import { useRouter } from "next/navigation"
import useProcessing from "@/hooks/useProcessing"

export default function CategoryDetail({ category }) {
  const [validation, setValidation] = useState({
    required: [],
    optional: [],
    allForms: [],
  })
  const { setFormSteps, moveToNextForm } = useProcessing()

  useEffect(() => {
    const required = []
    const optional = []
    const allForms = []
    if (category.validation) {
      for (const validate in category.validation) {
        console.log(forms[validate].label)
        if (category.validation[validate] === "r") {
          required.push(forms[validate].label)
          allForms.push(forms[validate])
        } else if (category.validation[validate] === "o") {
          optional.push(forms[validate].label)
          allForms.push(forms[validate])
        }
      }
    }
    setValidation({ required, optional, allForms })
  }, [])

  const getStarted = () => {
    console.log({ validation })
    setFormSteps(validation)
    moveToNextForm()
    // set form
    // setForm
    // set isOnboarding
  }

  return (
    <div className="py-[56px] px-[40px]">
      <div className="flex flex-col justify-start items-start gap-8 ">
        <div className="flex justify-center items-center w-[56px] h-[56px] text-[#FFCB03] rounded-full bg-white/10">
          {category.icon && (
            <Image src={category.icon} alt="" width={24} height={24} />
          )}
        </div>
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

        <Button onClick={getStarted} label="Get started" />
      </div>
    </div>
  )
}
