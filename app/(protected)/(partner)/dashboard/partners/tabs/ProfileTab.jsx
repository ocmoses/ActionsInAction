"use client"
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import {
    getPartnerInitials,
    filterPartner,
    Util,
    titleCase,
    getInitials,
    capitalizeFirst,
  } from "@/app/modules/utilities";
import Image from "next/image";
import {useState} from "react";
import Success from "@/app/components/toasts/Success";


export default function ProfileTab({partner}){

    const [successMessage, setSuccessMessage] = useState("Copied successfully!");
    const [successToast, setSuccessToast] = useState(false);
    const successAction = () => setTimeout(() => {setSuccessToast(false);},
                                                     1000);

    const handleCopy = (value) => {
        navigator.clipboard
        .writeText(value)
        .then(() => {
            setSuccessToast(true);
            setTimeout(() => {
                setShowToast(false);
                }, 3000);
        })
        .catch((error) => {
            console.error("Error copying email: ", error);
        });
    };

    return (
        <div className="flex flex-col p-4 py-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 space-x-2 font-bold items-center justify-start text-white text-center">
                    <CompanyLogo initials={getInitials(partner?.profile.company_name).toUpperCase()} />
                    <div className="flex flex-col h-full space-y-2 items-start">
                        <p className="font-bold text-white text-2xl">{partner?.profile.company_name}.</p>
                        <span className="text-white/40 text-md">{partner?.profile.company_type ?? "Limited Liability Company"}</span>
                    </div>
                </div>            
            </div>
          
            {/* Company name */}
            <div className="bg-white/10 rounded-lg p-4 px-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px] flex flex-col">
                    <span className="text-white/60">
                        Company name
                    </span>
                    <span className="text-white">
                        {partner?.profile.company_name}
                    </span>
                </div>
                <div className="flex-1 flex items-start">
                    <p className="text-white/60">
                        {/* {partner?.company_name} */}
                    </p>
                </div>
            </div>

            {/* Email */}
            <div className="bg-white/10 rounded-lg p-4 px-8 flex flex-col md:flex-row w-full mt-2">
                <div className="w-2/3 flex flex-col">
                    <span className="text-white/60">
                        Email
                    </span>
                    <span className="text-white">
                        {partner?.profile.email}
                    </span>
                </div>
                <div className="flex-1 flex flex-col justify-end" 
                        onClick={() => handleCopy(partner?.profile.email)}>
                    <div className="flex flex-row space-x-2 cursor-pointer">
                        <Image src="/assets/icons/copy.svg" alt="" width={15} height={15} />
                            {"   "}
                        <span className="text-sm text-mtn">Copy email</span>
                    </div>
                    
                </div>
            </div>

            {/* Contact phone number */}
            <div className="bg-white/10 rounded-lg p-4 px-8 flex flex-col md:flex-row w-full mt-2">
                <div className="flex flex-col w-2/3">
                    <span className="text-white/60">
                    Contact phone number
                    </span>
                    <span className=" text-white">
                        {partner?.profile.phone}
                    </span>
                </div>
                <div className="flex-1 flex flex-col justify-end" 
                    onClick={() => handleCopy(partner?.profile.phone)}>
                    
                    <div className="flex flex-row space-x-2 cursor-pointer">
                        <Image src="/assets/icons/copy.svg" alt="" width={15} height={15} />
                            {"   "}
                        <span className="text-sm text-mtn">Copy phone number</span>
                    </div>
                    
                </div>
            </div>

            <Success message={successMessage} visible={successToast} action={successAction} />
        </div>
    )
}