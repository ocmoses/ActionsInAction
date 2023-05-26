import TextInput from "@/app/components/form/TextInput"
import RemoteEndpoints from "@/app/modules/endpoints"
import Button from "@/app/components/form/Button"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import usePartners from "@/hooks/usePartners"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import {
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
} from "@/app/modules/utilities"

export default function Shortcodes({ data, setShowModal }) {
  const { updatePartner } = usePartners()
  const [{ errors, setError, success, setSuccess, removeError, clearErrors }] =
    useErrors(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shtcde, setShtcde] = useState("")

  useEffect(() => {
    clearErrors()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    try {
      setSaving(true)
      setSaved(false)

      if (!formdata.field_value) {
        setSaving(false)
        return setError({ update: "Please enter a value" })
      }

      var headers = new Headers()
      headers.append("apiKey", process.env.NEXT_PUBLIC_APIKEY)
      headers.append("Content-Type", "application/x-www-form-urlencoded")

      var urlEncoded = new URLSearchParams()
      urlEncoded.append("partner_uuid", formdata.partner_uuid ?? "")
      urlEncoded.append("category_uuid", formdata.category_uuid ?? "")
      urlEncoded.append("category_stage", formdata.category_stage ?? "")
      urlEncoded.append("field_value", formdata.field_value ?? "")
      urlEncoded.append("field", data.field)
      urlEncoded.append("shortcode_uuid", data.shortcode_uuid ?? "")

      var requestOptions = {
        method: "POST",
        headers: headers,
        body: urlEncoded,
        redirect: "follow",
      }

      const response = await fetch(
        RemoteEndpoints.PARTNER_UPDATE,
        requestOptions
      ).catch((e) => {
        setSaving(false)
        return setError({
          update: e.message,
        })
      })
      if (!response) {
        setSaving(false)
        return setError({
          update:
            "Something went wrong. Please check your connection and try again",
        })
      }
      const results = await response.json()
      const { success, data: Data } = results
      if (!success) {
        setSaving(false)
        return setError({
          update: Data.message,
        })
      }
      setSaving(false)
      setSaved(true)
      updatePartner(Data.partner)
      filterFields(Data.partner)
      filterComplianceRequirements(Data.partner)
      filterApprovalFields(Data.partner)
      return setSuccess("Detail updated successfully")
    } catch (e) {
      setSaving(false)
      return setError({
        update: e.message,
      })
    }
  }

  const formShortcodeArray = (shtcd) => {
    const input = shtcd
      ?.replaceAll(";", ",")
      .replaceAll(" ", ",")
      .replaceAll(".", ",")
    if (!input) return null
    const inputArray = input.split(",")
    if (!inputArray.length) return null
    const string = []
    for (let i = 0; i < inputArray.length; i++) {
      if (!(!inputArray[i].trim() || /^\s*$/.test(inputArray[i].trim())))
        string.push(inputArray[i].trim())
    }
    return string.filter((str) => str !== "undefined")
  }

  const handleKeyUp = (e) => {
    if (e.key === " " || e.key === "Enter") {
      processKeyUp()
    }
  }

  const processKeyUp = () => {
    removeError("shtcde")
    let content = []
    content = formShortcodeArray(shtcde)
    if (content && content.length > 0) {
      const duplicate = []
      content.map((c) => {
        if (formdata.field_value.includes(c)) {
          duplicate.push(c)
        }
      })
      if (duplicate.length > 0) {
        setError({
          shtcde: `${duplicate.join(", ")} already exists in shortcodes`,
        })
        return false
      }

      setFormdata((prevState) => ({
        ...prevState,
        field_value: [...prevState.field_value, ...content],
      }))

      setShtcde("")
    }
    return true
  }
  const handleShortcodeChange = (e) => {
    setShtcde(e.target.value)
  }
  const removeShtcde = (index) => {
    const shtcd = formdata.field_value[index]
    setFormdata((prevState) => ({
      ...prevState,
      field_value: formdata.field_value.filter((sc) => sc !== shtcd),
    }))
  }

  const [formdata, setFormdata] = useState({
    partner_uuid: data.partner_uuid,
    category_uuid: data.category_uuid,
    category_stage: data.category_stage,
    field: data.field,
    field_value: data.field_value,
  })

  return (
    <>
      <div className="mb-6">
        {success && <FormErrors success={success} />}
        {errors && <FormErrors error={errors.update} />}
      </div>
      <p className="mb-0 text-[#999999]">Enter applicable short codes</p>
      <div className="flex justify-start flex-wrap gap-4 mt-4 mb-4">
        {formdata.field_value?.length > 0 &&
          formdata.field_value.map((sc, index) => (
            <span
              key={`shortcode-${sc}-${index}`}
              className="flex justify-between gap-3 py-1 px-2 text-white font-bold rounded-lg border border-white/20"
            >
              <span>{sc}</span>
              <div
                onClick={() => {
                  removeShtcde(index)
                }}
                className="flex items-center cursor-pointer justify-center rounded-full text-white/80 hover:text-red-300"
              >
                x
              </div>
            </span>
          ))}
      </div>
      <TextInput
        id="shtcde"
        label="Short codes"
        value={shtcde}
        onKeyUp={handleKeyUp}
        onChange={handleShortcodeChange}
        errors={errors}
        margin="mb-2"
      />
      <p className="text-[12px] text-[#999999] mb-2">
        Enter multiple comma-separated shortcodes and press "Enter" to apply
      </p>
      <div className="items-center justify-end gap-3 mt-3 flex">
        {saving ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <>
            <Button
              type="button"
              onClick={(e) => setShowModal(false)}
              label={`${saved ? "Finish" : "Cancel"} `}
              outline="yes"
              noicon="yes"
              outlinecolor="border-white/80"
              textsizecss="inline-flex text-[14px] whitespace-nowrap"
              paddingclass="pl-4 pr-3 py-1"
            />
            {!saved && (
              <Button
                type="button"
                onClick={handleSubmit}
                label={`${saved ? "Update" : "Save"}`}
                textsizecss="inline-flex text-[14px] whitespace-nowrap"
                paddingclass="pl-4 pr-3 py-1"
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
