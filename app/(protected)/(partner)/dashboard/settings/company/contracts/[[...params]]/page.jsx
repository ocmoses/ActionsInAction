import ContractSettings from "./ContractSettings";
import ContractSettingsProvider from "../ContractSettingsProvider";
import ProfileProvider from "../../profile/ProfileProvider";


export default function Page({params}){
    return (
            <ProfileProvider>
                <ContractSettingsProvider>
                    <ContractSettings params={params} />
                </ContractSettingsProvider>
            </ProfileProvider>)
}