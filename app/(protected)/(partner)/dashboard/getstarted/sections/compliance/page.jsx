import Compliance from "./Compliance";
import FileViewProvider from "@/app/providers/FileViewProvider";

async function CompliancePage() {
  return (<FileViewProvider>
           <Compliance />
          </FileViewProvider>);
}

export default CompliancePage;
