
import GenericModal from "./GenericModal.jsx";
import { useEffect, useContext, useState } from "react";
import useUsers from "@/hooks/useUsers";
import { ProfileContext } from "../../(protected)/(partner)/dashboard/settings/company/profile/ProfileProvider";



export default function ProfileSuccessModal(){

    const {

        profileSuccess,
        setProfileSuccess  

    } = useContext(ProfileContext);

    const {refreshSession} = useUsers();
    
    useEffect(() => {

    }, []);


    return (profileSuccess && 
            <GenericModal id="contract_signatories_modal" width={450} closeAction={() => {}}>
                <>
                    <div className="flex pt-8 pb-4 justify-center items-center">
                        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                            </svg>  
                        </div>              
                    </div>
                    
                    <div className="flex pt-8 pb-4 flex-col space-y-6">
                        <p className="text-white text-2xl text-center">Thanks for your submission</p> 
                        <p className="text-yellow-600 text-md text-center">What next?</p> 
                        <p className="text-white/80 text-md text-center ">We’ll review your updates and share an updated contract for you to sign.</p>              
                    </div>
        
                    <div className="">              
                        <div className="flex py-4 px-2 space-x-4 justify-center">
                            <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {setProfileSuccess(false); refreshSession(); location.reload();}}>Got it!</button>
                        </div>              
                    </div>
                </>
            </GenericModal>);

}