export default function DeptBadge({ dept, field, category }) {
  let bg = "bg-white/40"
  let text = `Pending approval for ${dept.name}`
  if (
    category?.approvedFields[category.category_uuid] &&
    dept.code in category?.approvedFields[category.category_uuid] &&
    field in category?.approvedFields[category.category_uuid][dept.code]
  ) {
    if (
      category?.approvedFields[category.category_uuid][dept.code][field] ===
      "approved"
    ) {
      bg = "bg-green-600"
      text = `${dept.name} APPROVED`
    }
    if (
      category?.approvedFields[category.category_uuid][dept.code][field] ===
      "rejected"
    ) {
      bg = "bg-red-600"
      text = `${dept.name} REJECTED`
    }
  }
  return (
    <span
      className={`flex justify-center items-center ${bg} cursor-help w-3 h-3 font-extrabold p-1 text-[11px] text-black`}
      title={text}
    >
      {dept.code[0]}
    </span>
  )
}
