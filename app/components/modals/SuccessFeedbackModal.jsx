
import GenericModal from "./GenericModal.jsx";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";


export default function SuccessFeedbackModal(){

    const {

        contractSignatoriesSuccess,
        setContractSignatoriesSuccess

    } = useContext(ContractContext);

    const {refreshSession} = useUsers();
    
    useEffect(() => {

    }, []);


    return (contractSignatoriesSuccess && 
            <GenericModal id="contract_signatories_modal" width={450} closeAction={() => {}}>
                <>
                    <div className="flex pt-8 pb-4 justify-center items-center">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                            </svg>  
                        </div>              
                    </div>
                    
                    <div className="flex pt-8 pb-4">
                        <p className="text-white text-2xl mb-4 flex-1 text-center">You've added your contract signatories</p>              
                    </div>
        
                    <div className="">              
                        <div className="flex py-4 px-2 space-x-4 justify-center">
                            <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {setContractSignatoriesSuccess(false); refreshSession(); location.reload();}}>Continue</button>
                        </div>              
                    </div>
                </>
            </GenericModal>);

}