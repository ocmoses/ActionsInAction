"use client"
import {createContext} from "react";
import useCompanyProfile from "@/hooks/useCompanyProfile";

export const ProfileContext = createContext();

export default function ProfileProvider({children}){
    return (
        <ProfileContext.Provider value={ useCompanyProfile() } >
            {children}
        </ProfileContext.Provider>
    );
}