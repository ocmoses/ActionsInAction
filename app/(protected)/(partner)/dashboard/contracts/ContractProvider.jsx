"use client"
import { useContext, createContext } from "react";
import useContracts from "@/hooks/useContracts";


export const ContractContext = createContext();

export default function ContractProvider({children}){

    return (<ContractContext.Provider value={useContracts()}>
                {children}
            </ContractContext.Provider>);

}