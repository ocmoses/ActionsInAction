"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import Button from "@/app/components/form/Button"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import { BANKS } from "@/app/modules/banks"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import { useStoreState, useStoreActions } from "easy-peasy"

function AccountInfo() {
  const actions = useStoreActions((action) => action)
  const state = useStoreState((state) => state)
  const { setForm } = actions.forms
  const {
    users: user,
    forms: { form },
  } = state

  const { partnerInfo, registerPartner, processing, setProcessing } =
    useOnboardingContext()

  const [data, setData] = useState({
    account_name: "",
    account_no: "",
    bank: "",
    audited_account_1: "",
    audited_account_2: "",
    audited_account_3: "",
  })
  const { title, subtitle, hand, required } = forms["accountinfo"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  useEffect(() => {
    if (partnerInfo)
      setData({
        account_name: partnerInfo.account_name ?? "",
        account_no: partnerInfo.account_no ?? "",
        bank: partnerInfo.bank ?? "",
        audited_account_1: partnerInfo.audited_account_1 ?? "",
        audited_account_2: partnerInfo.audited_account_2 ?? "",
        audited_account_3: partnerInfo.audited_account_3 ?? "",
      })
  }, [partnerInfo])
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
          setError(field, `${required[field]} is required`)
        }
      }
      if (error) return
    }
    const result = await registerPartner("accountinfo", data)
    if (result) {
      if (result?.error) setError("global", result.error)
    }
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
          {errors && <FormErrors error={errors["global"]} />}
        </div>
        <TextInput
          id="account_name"
          label="Account name"
          value={data.account_name}
          onChange={handleFormChange}
          errors={errors}
        />
        <TextInput
          id="account_no"
          label="Account number"
          value={data.account_no}
          onChange={handleFormChange}
          errors={errors}
        />
        <SelectInput
          id="bank"
          label="Bank"
          value={data.bank}
          onChange={handleFormChange}
          errors={errors}
        >
          <SelectInputOption value="" label="" />
          {BANKS.map((bank) => (
            <SelectInputOption
              key={bank.code}
              value={bank.code}
              label={bank.name}
            />
          ))}
        </SelectInput>
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
            <Button label="Next" />
          )}
        </div>
      </form>
    </div>
  )
}

export default AccountInfo
