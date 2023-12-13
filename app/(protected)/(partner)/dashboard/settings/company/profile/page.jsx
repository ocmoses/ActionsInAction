import Profile from "./Profile";
import ProfileProvider from "./ProfileProvider";

export default function Page(){
    return (<ProfileProvider>
                <Profile />
            </ProfileProvider>)
}