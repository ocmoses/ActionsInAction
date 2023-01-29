import Validation from "./Validation"

export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  return <Validation params={{ user_uuid, type }} />
}
