import { complianceRequirements } from "@/app/modules/constants"
import Button from "@/app/components/form/Button"
import TextInput from "@/app/components/form/TextInput"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useProcessing from "@/hooks/useProcessing"
import { useState, useEffect } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"

export default function Text({ data }) {
  const [{ errors, setError, removeError, clearErrors }] = useErrors(null)
  const { processing, setProcessing } = useProcessing()
  useEffect(() => {
    clearErrors()
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    clearErrors()
  }
  const handleChange = (e) => {
    removeError(data.field)
    setFormdata((prev) => ({ ...prev, field_value: e.target.value }))
  }

  const [formdata, setFormdata] = useState({
    partner_uuid: data.partner_uuid,
    category_uuid: data.category_uuid,
    category_stage: data.category_stage,
    field: data.field,
    field_value: data.field_value,
  })

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="mb-6">
        {errors && <FormErrors error={errors.update} />}
      </div>
      <TextInput
        id={data.field}
        label={complianceRequirements[data.category_stage][data.field]?.title}
        value={formdata.field_value}
        onChange={handleChange}
        errors={errors}
      />
      <div className="items-center justify-end gap-3 mt-3 flex">
        <Button
          type="button"
          onClick={(e) => setShowModal(false)}
          label="Cancel"
          outline="yes"
          noicon="yes"
          outlinecolor="border-white/80"
        />
        <Button onClick={handleSubmit} label="Update" />
      </div>
    </form>
  )
}
