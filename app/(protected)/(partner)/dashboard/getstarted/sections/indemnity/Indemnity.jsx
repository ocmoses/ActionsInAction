"use client"
import TextInput from "@/app/components/form/TextInput"
import FileInput from "@/app/components/form/FileInput"
import DatePicker from "@/app/components/form/DatePicker"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"
import RegisterStepHeader from "@/app/components/RegisterStepHeader"
import FormErrors from "@/app/components/FormErrors"
import ButtonNext from "@/app/components/form/ButtonNext"
import ButtonPrev from "@/app/components/form/ButtonPrev"
import useErrors from "@/hooks/useErrors"
import useProcessing from "@/hooks/useProcessing"
import usePartners from "@/hooks/usePartners"
import { useState, useEffect } from "react"
import { Util } from "@/utils/utility"
import { TailSpinPreloader } from "@/app/components/Icons"
import { forms, validities } from "@/app/modules/constants"
import {
  scrollToTop,
  validateExpiryDate,
  getValidityRange,
  ValidateField,
  fieldRequired,
  fieldName,
} from "@/app/modules/utilities"

function Indemnity() {
  const { processing, setProcessing, setForm, moveToNextForm, moveToPrevForm } =
    useProcessing()
  const {
    partner,
    category,
    registerPartner,
    updatePartner,
    checkUpdateStatus,
    nextStage,
  } = usePartners()
  const { min_start_date, max_end_date, yesterday, tomorrow } =
    getValidityRange(validities.indemnity)

  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    indemnity_no: "",
    indemnity_issue_date: "",
    indemnity_expiry_date: "",
    indemnity_doc: {},
    indemnity_file: "",
  })
  const { title, subtitle, hand, fields } = forms["indemnity"]
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data)

  const [isMasterData, setIsMasterData] = useState(false)
  useEffect(() => {
    if (category) {
      const Category =
        partner.master &&
        partner.sections[partner.master.category_uuid]?.indemnity &&
        category.category_uuid !== partner.master.category_uuid
          ? partner.master
          : category

      setIsMasterData(
        partner.master &&
          partner.sections[partner.master.category_uuid]?.indemnity &&
          category.category_uuid !== partner.master.category_uuid
      )
      setData({
        partner_uuid: Category?.partner_uuid,
        category_uuid: category?.category_uuid,
        indemnity_no:
          process.env.NODE_ENV === "production"
            ? Category?.indemnity_no ?? ""
            : "123456789",
        indemnity_issue_date:
          process.env.NODE_ENV === "production"
            ? Category?.indemnity_issue_date ?? ""
            : "2023-01-20",
        indemnity_expiry_date:
          process.env.NODE_ENV === "production"
            ? Category?.indemnity_expiry_date ?? ""
            : "2023-06-20",
        indemnity_doc: Category?.indemnity_doc ?? {},
        indemnity_file: Category?.indemnity_file ?? "",
      })
    }
  }, [category])
  useEffect(() => {
    setForm("indemnity")
    setProcessing(false)
    scrollToTop("onboardinglayout")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    if (!Util.isEmpty(fields)) {
      for (const field in fields) {
        if (field !== "indemnity_doc") {
          const error = ValidateField(field, "indemnity", data, category)
          if (error) {
            scrollToTop("onboardinglayout")
            return setError({
              [field]: error,
            })
          }
        }
      }
    }
    if (
      fieldRequired("indemnity_doc", "indemnity", category) &&
      Util.isEmpty(data.indemnity_doc) &&
      !data.indemnity_file
    ) {
      scrollToTop("onboardinglayout")
      return setError({
        indemnity_file: `${fieldName(
          "indemnity_doc",
          "indemnity"
        )} is required`,
      })
    }

    const expiryError = validateExpiryDate(
      data.indemnity_issue_date,
      data.indemnity_expiry_date,
      validities.indemnity
    )
    if (expiryError) return setError({ indemnity: expiryError })

    const result = await registerPartner("indemnity", data)
    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ indemnity: result.error })
    }
    if (result.data?.partner) {
      updatePartner(result?.data?.partner)
      const newcategory = result.data?.partner.categories.find(
        (c) => c.category_uuid === category.category_uuid
      )
      newcategory.profile_stage.indemnity = "1"
      const { nextstage: NextStage } = nextStage(newcategory, partner)
      console.log({ NextStage })
      return setForm(NextStage)
    }
    // const { nextstage: NextStage } = nextStage(category, partner)
    // return setForm(NextStage)
    // if (NextStage === "review") return moveToNextForm(["review", true])
    // return moveToNextForm([NextStage])
  }
  const handleFormChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const handleDateChange = (e) => {
    removeError(e.target.id)
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const Validate = (field) => {
    removeError(field)
    const error = ValidateField(field, "indemnity", data, category)
    if (error)
      return setError({
        [field]: error,
      })
  }
  return (
    <div
      id="onboardingform"
      className="w3-animate-opacity pb-20 w-full max-w-[492px]"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <RegisterStepHeader title={title} subtitle={subtitle} hand={hand} />
        <div className="mb-6">
          {errors && <FormErrors error={errors["indemnity"]} />}
        </div>
        <TextInput
          id="indemnity_no"
          label="Professional indemnity insurance number"
          value={data.indemnity_no}
          onChange={handleFormChange}
          onBlur={() => Validate("indemnity_no")}
          errors={errors}
          disabled={isMasterData || partner?.contract_status !== "not_started"}
        />
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="">
            <DatePicker
              id="indemnity_issue_date"
              label="Issue date"
              value={data.indemnity_issue_date}
              onChange={handleDateChange}
              onBlur={() => Validate("indemnity_issue_date")}
              errors={errors}
              min={new Date(min_start_date)}
              max={yesterday}
              disabled={
                isMasterData || partner?.contract_status !== "not_started"
              }
            />
          </div>
          <div className="">
            <DatePicker
              id="indemnity_expiry_date"
              label="Expiry date"
              value={data.indemnity_expiry_date}
              onChange={handleDateChange}
              onBlur={() => Validate("indemnity_expiry_date")}
              errors={errors}
              min={tomorrow}
              max={new Date(max_end_date)}
              disabled={
                isMasterData || partner?.contract_status !== "not_started"
              }
            />
          </div>
        </div>
        <FileInputWrapper>
          <FileInput
            id="indemnity_file"
            doc_id="indemnity_doc"
            label="Professional indemnity insurance Document"
            value={data.indemnity_doc}
            onChange={handleFormChange}
            errors={errors}
            disabled={
              isMasterData || partner?.contract_status !== "not_started"
            }
          />
        </FileInputWrapper>

        {!isMasterData && partner?.contract_status === "not_started" && (
          <div className="mt-6">
            {processing ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <div className="flex items-center gap-4">
                {/* <ButtonPrev
                  onClick={() => moveToPrevForm("indemnity")}
                  type="button"
                  label="Back"
                  outline="yes"
                  outlinecolor="border-white"
                /> */}
                <ButtonNext
                  type="submit"
                  label={checkUpdateStatus("indemnity") ? "Update" : "Next"}
                />
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default Indemnity
