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
import { Util } from "@/utils/utility"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms } from "@/app/modules/constants"
import { scrollToTop, fieldRequired, fieldName } from "@/app/modules/utilities"

export default function Accountinfo() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const { partner, category, registerPartner } = usePartners()

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    audited_account_1_doc: {},
    audited_account_1_file: null,
    audited_account_2_doc: {},
    audited_account_2_file: null,
    audited_account_3_doc: {},
    audited_account_3_file: null,
    job_evidence_doc: {},
    job_evidence_file: null,
  })
  const { title, subtitle, hand, required } = forms["accountinfo"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)
  const [isMasterData, setIsMasterData] = useState(false)
  useEffect(() => {
    if (category) {
      const Category =
        partner.master &&
        partner.sections[partner.master.category_uuid]?.accountinfo &&
        category.category_uuid !== partner.master.category_uuid
          ? partner.master
          : category

      setIsMasterData(
        partner.master &&
          partner.sections[partner.master.category_uuid]?.accountinfo &&
          category.category_uuid !== partner.master.category_uuid
      )
      setData({
        partner_uuid: Category?.partner_uuid ?? "",
        category_uuid: category?.category_uuid ?? "",
        audited_account_1_doc: Category?.audited_account_1_doc ?? {},
        audited_account_1_file: null,
        audited_account_2_doc: Category?.audited_account_2_doc ?? {},
        audited_account_2_file: null,
        audited_account_3_doc: Category?.audited_account_3_doc ?? {},
        audited_account_3_file: null,
        job_evidence_doc: Category?.job_evidence_doc ?? {},
        job_evidence_file: null,
      })
    }
  }, [category])

  useEffect(() => {
    setForm("accountinfo")
    setProcessing(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    if (
      fieldRequired("audited_account_1_doc", "accountinfo", category) &&
      Util.isEmpty(data.audited_account_1_doc) &&
      !data.audited_account_1_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        audited_account_1_file: `${fieldName(
          "audited_account_1_doc",
          "accountinfo"
        )} is required`,
      })
    }
    if (
      fieldRequired("audited_account_2_doc", "accountinfo", category) &&
      Util.isEmpty(data.audited_account_2_doc) &&
      !data.audited_account_2_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        audited_account_2_file: `${fieldName(
          "audited_account_2_doc",
          "accountinfo"
        )} is required`,
      })
    }
    if (
      fieldRequired("audited_account_3_doc", "accountinfo", category) &&
      Util.isEmpty(data.audited_account_3_doc) &&
      !data.audited_account_3_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        audited_account_3_file: `${fieldName(
          "audited_account_3_doc",
          "accountinfo"
        )} is required`,
      })
    }
    if (
      fieldRequired("job_evidence_doc", "accountinfo", category) &&
      Util.isEmpty(data.job_evidence_doc) &&
      !data.job_evidence_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        job_evidence_file: `${fieldName(
          "job_evidence_doc",
          "accountinfo"
        )} is required`,
      })
    }
    const result = await registerPartner("accountinfo", data)
    if (result) {
      if (result?.error) return setError({ accountinfo: result.error })
    }
    moveToNextForm(["accountinfo", category])
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
            id="audited_account_1_file"
            doc_id="audited_account_1_doc"
            label="Audited account 1"
            value={data.audited_account_1_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
          <FileInput
            id="audited_account_2_file"
            doc_id="audited_account_2_doc"
            label="Audited account 2"
            value={data.audited_account_2_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
          <FileInput
            id="audited_account_3_file"
            doc_id="audited_account_3_doc"
            label="Audited account 3"
            value={data.audited_account_3_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
          <FileInput
            id="job_evidence_file"
            doc_id="job_evidence_doc"
            label="Evidence of 3 jobs done"
            value={data.job_evidence_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={isMasterData}
          />
        </FileInputWrapper>

        {!isMasterData && (
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
                  label="Back"
                  outline="yes"
                  outlinecolor="border-white"
                />
                <ButtonNext type="submit" label="Next" />
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
