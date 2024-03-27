import Profile from "./Profile";
import ProfileProvider from "./ProfileProvider";
import ContractProvider from "../../../contracts/ContractProvider";

export default function Page(){
    return (<ContractProvider>
                <ProfileProvider>
                        <Profile />
                    </ProfileProvider>
            </ContractProvider>)
}