"use client"
import {createContext} from "react";
import useContractSettings from "@/hooks/useContractSettings";

export const ContractSettingsContext = createContext();

export default function ContractSettingsProvider({children}){
    return (
        <ContractSettingsContext.Provider value={ useContractSettings() } >
            {children}
        </ContractSettingsContext.Provider>
    );
}