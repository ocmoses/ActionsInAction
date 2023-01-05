"use client"
import { useState, useEffect } from "react"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"

import { BANKS } from "../../../modules/banks"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import { Util } from "@/utils/utility"
import useErrors from "@/hooks/useErrors"
import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"

function AccountInfo() {
  const {
    forms,
    setForm,
    partnerInfo,
    registerPartner,
    processing,
    setProcessing,
  } = useOnboardingContext()

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
    setForm("accountinfo")
    setProcessing(false)
  }, [])

  const handleSubmit = (e) => {
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
    registerPartner("accountinfo", data)
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="w3-animate-opacity pb-20 w-full max-w-[607px]">
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
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

        {processing ? (
          <TailSpinPreloader
            width={40}
            iconClass="mt-6"
            height={40}
            fill="#efb703"
          />
        ) : (
          <button
            type="submit"
            className="rounded-full mt-12 flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
          >
            Next <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
          </button>
        )}
      </form>
    </div>
  )
}

export default AccountInfo
