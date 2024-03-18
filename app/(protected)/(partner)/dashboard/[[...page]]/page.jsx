import Dashboard from "./Dashboard";
import ContractProvider from "@/app/(protected)/(partner)/dashboard/contracts/ContractProvider";

export default function DashboardPage() {
  return (<ContractProvider>
            <Dashboard />
          </ContractProvider>);
}
