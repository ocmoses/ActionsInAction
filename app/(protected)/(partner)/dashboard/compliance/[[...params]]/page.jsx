import Compliance from "./Compliance";
import FileViewProvider from "@/app/providers/FileViewProvider";

export default async function Page({ params }) {
  return (<FileViewProvider>
          <Compliance params={params} />
          </FileViewProvider>);
}
