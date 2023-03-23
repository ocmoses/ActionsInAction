import "server-only"
import Validation from "./Validation"

export default async function ValidationPage({ params: { param } }) {
  const user_uuid = param && param[0] ? param[0] : null
  const type = param && param[1] ? param[1] : null
  const Params = { user_uuid, type }

  console.log("Params", { Params })
  return <Validation params={Params} />
}
