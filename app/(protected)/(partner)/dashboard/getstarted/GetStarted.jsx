import DashboardContent from "@/app/components/dashboard/DashboardContent";
import ProfileProvider from "@/app/(protected)/(partner)/dashboard/settings/company/profile/ProfileProvider";

export default function GetStarted() {
  return (<ProfileProvider>
            <DashboardContent type="getstarted" />
            </ProfileProvider>);
}
