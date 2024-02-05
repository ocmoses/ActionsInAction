import Compliance from "./Compliance";
import FileViewProvider from "@/app/providers/FileViewProvider";

//Nothing was added
export default async function Page({ params }) {
  return (
    <FileViewProvider>
      <Compliance params={params} />
    </FileViewProvider>
  );
}
