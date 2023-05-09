import { complianceRequirements } from "@/app/modules/constants"
export const validate = (type, field, stage, data, category) => {
  switch (type) {
    case "file":
      if (
        fieldRequired(field, stage, category) &&
        Util.isEmpty(data.doc) &&
        !data.file
      ) {
        return `${
          complianceRequirements[data.category_stage][data.field]?.title
        } is required`
      }
      break
    default:
      return ValidateField(field, stage, data, category)
  }
}
