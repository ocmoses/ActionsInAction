"use client"
import Dashboard from "./Dashboard";
import useAdmins from "@/hooks/useAdmins";
export default async function DashboardPage() {
  const {getAllPartners} = useAdmins();
  const all_partners = await getAllPartners();
  return <Dashboard allPartners={all_partners} />;
}
