import Contracts from "./Contracts";
import ContractProvider from "./ContractProvider";

export default async function Page() {
  return (<ContractProvider>
            <Contracts />
          </ContractProvider>);
}
