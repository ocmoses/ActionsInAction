"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials
} from "@/app/modules/utilities";
import { TailSpinPreloader, CompanyLogo } from "@/app/components/Icons";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import usePartners from "@/hooks/usePartners";
import useProcessing from "@/hooks/useProcessing";


export default function Profile() {

  const { partner } = usePartners();

  console.log("Partner", partner);
    
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false)
                                                }, 3000);

  return (
    <>
      <div id="profile_page" className="flex flex-cols pb-12 min-h-screen" >
        <div className="w-full md:max-w-6xl pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 space-x-2 font-bold items-center text-white text-center">
              <CompanyLogo initials={getInitials(partner?.company_name).toUpperCase()} />
              <div className="flex flex-col items-center h-full space-y-4">
                <p className="font-bold text-white text-4xl">{partner?.company_name}.</p>
                <span className="text-white/40 text-md">{partner?.company_type ?? "Limited Liability Company"}</span>
              </div>
            </div>            
          </div>

          

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}
          
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

          {/* Company logo */}
          <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
            <div className="w-[300px]">
                <span className="text-lg text-white/80">
                    Company logo
                </span><br/>
                <span className="text-lg text-white/40">
                    This will appear next to your company name.
                </span>
            </div>
            <div className="flex-1 flex items-start">
                <CompanyLogo initials={getInitials(partner?.company_name).toUpperCase()} />
            </div>
          </div>

          
        </div>
      </div>

      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}