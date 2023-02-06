"use client"
import FileInput from "@/app/components/form/FileInput"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import useProcessing from "@/hooks/useProcessing"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"

export default function Accountinfo() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { category, registerPartner } = usePartners()

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    audited_account_1: "",
    audited_account_2: "",
    audited_account_3: "",
    audited_account_4: "",
  })
  const { title, subtitle, hand, required } = forms["accountinfo"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  useEffect(() => {
    if (category)
      setData({
        audited_account_1: category?.audited_account_1 ?? "",
        audited_account_2: category?.audited_account_2 ?? "",
        audited_account_3: category?.audited_account_3 ?? "",
        audited_account_: category?.audited_account_ ?? "",
      })
  }, [category])

  useEffect(() => {
    setForm("accountinfo")
    setProcessing(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    let error = false
    if (!Util.isEmpty(required)) {
      for (const field in required) {
        if (!!!data[field]) {
          error = true
          setError({ [field]: `${required[field]} is required` })
        }
      }
      if (error) return
    }
    const result = await registerPartner("accountinfo", data)
    if (result) {
      if (result?.error) return setError({ accountinfo: result.error })
    }
    moveToNextForm(["accountinfo"])
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[492px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["accountinfo"]} />}
        </div>
        <FileInputWrapper>
          <FileInput
            id="audited_account_1"
            label="Audited account 1"
            value={data.audited_account_1}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="audited_account_2"
            label="Audited account 2"
            value={data.audited_account_2}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="audited_account_3"
            label="Audited account 3"
            value={data.audited_account_3}
            onChange={handleFormChange}
            errors={errors}
          />
          <FileInput
            id="audited_account_4"
            label="Audited account 4"
            value={data.audited_account_4}
            onChange={handleFormChange}
            errors={errors}
          />
        </FileInputWrapper>

        <div className="mt-6">
          {processing ? (
            <TailSpinPreloader
              width={40}
              iconClass="mt-6"
              height={40}
              fill="#efb703"
            />
          ) : (
            <div className="flex items-center gap-4">
              <ButtonPrev
                onClick={() => moveToPrevForm("indemnity")}
                type="button"
                label="Next"
                outline="yes"
                outlinecolor="border-white"
              />
              <ButtonNext type="submit" label="Next" />
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
