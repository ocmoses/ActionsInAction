"use client"
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";



export const ProfileTab = async ({partner}) => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex gap-4 space-x-2 font-bold items-center text-white text-center">
                    <CompanyLogo initials={getInitials(partner?.company_name).toUpperCase()} />
                    <div className="flex flex-col items-center h-full space-y-4">
                        <p className="font-bold text-white text-4xl">{partner?.company_name}.</p>
                        <span className="text-white/40 text-md">{partner?.company_type ?? "Limited Liability Company"}</span>
                    </div>
                </div>            
            </div>
          
            {/* Legal name */}
            <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px]">
                    <span className="text-lg text-white/80">
                        Legal name
                    </span>
                </div>
                <div className="flex-1 flex items-start">
                    <p className="text-white/60">
                        {partner?.company_name}
                    </p>
                </div>
            </div>
        </div>
    )
}