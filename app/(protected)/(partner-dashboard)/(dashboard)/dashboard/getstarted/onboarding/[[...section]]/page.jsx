import CompanyDetail from "../sections/companydetail/CompanyDetail"

export default async function Section({ params }) {
  const { section } = params
  console.log(section)
  const page = section && section[0] ? section[0] : "companydetail"
  //   const type = param && param[1] ? param[1] : null
  return <CompanyDetail />
}
