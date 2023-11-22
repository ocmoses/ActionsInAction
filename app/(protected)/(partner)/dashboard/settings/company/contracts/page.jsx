import ContractSettings from "./ContractSettings";
import ContractSettingsProvider from "./ContractSettingsProvider";
import ProfileProvider from "../profile/ProfileProvider";


export default function Page(){
    return (
            <ProfileProvider>
                <ContractSettingsProvider>
                    <ContractSettings />
                </ContractSettingsProvider>
            </ProfileProvider>)
}