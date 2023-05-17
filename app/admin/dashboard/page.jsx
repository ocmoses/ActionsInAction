import Dashboard from "./Dashboard"
import { getAllPartners } from "@/app/modules/partners"
export default async function DashboardPage() {
  const allPartners = await getAllPartners()
  return <Dashboard allPartners={allPartners} />
}
