import Aggregator from "./Aggregator";
import FileViewProvider from "@/app/providers/FileViewProvider";

//Nothing was added
export default async function Page({ params }) {
  return (
    <FileViewProvider>
      <Aggregator params={params} />
    </FileViewProvider>
  );
}
//Nothing added here
