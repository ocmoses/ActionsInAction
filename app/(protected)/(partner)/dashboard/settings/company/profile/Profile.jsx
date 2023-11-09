"use client";
import { useState, useEffect, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials
} from "@/app/modules/utilities";
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import {ProfileContext} from "./ProfileProvider";
import ChangeAddressDialogue from "@/app/components/modals/ChangeAddressDialogue";
import ChangeAddressModal from "@/app/components/modals/ChangeAddressModal";
import ProfileSuccessModal from "@/app/components/modals/ProfileSuccessModal";
import AddShortcodeDialogue from "@/app/components/modals/AddShortcodeDialogue";
import AddShortcodeModal from "@/app/components/modals/AddShortcodeModal";


export default function Profile() {

    const {
        partner, 
        isSuperadmin,
        setChangeAddressDialogue,
        setAddShortcodeDialogue,
        setAddShortcodeModal
    } = useContext(ProfileContext);

  console.log("Partner", partner);
    
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false)
                                                }, 3000);

  

  console.log("isSuperadmin", isSuperadmin);
  
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
            <div className="ml-auto inline-flex items-start">
                <span className=" px-4 py-2 border-1 border-white/20 rounded-full
                        text-white/80 cursor-pointer hover:bg-white/5">
                    Edit
                </span>    
            </div>            

          </div>

          {/* Company legal address */}
          <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
            <div className="w-[300px]">
                <span className="text-lg text-white/80">
                    Company legal address
                </span><br/>
                <span className="text-lg text-white/40">
                    The office or residence where you and your team work day-to-day.
                </span>
            </div>
            <div className="flex-1 flex items-start">
                <p className="text-white/60 w-full md:max-w-[250px]">
                    {partner?.company_address ?? `660 Mission St Floor 4 San Francisco, CA 94105 United States`}
                </p>
            </div> 

            <div className="ml-auto inline-flex items-start" onClick={() => setChangeAddressDialogue(true)}>
                <span className=" px-4 py-2 border-1 border-white/20 rounded-full
                        text-white/80 cursor-pointer hover:bg-white/5">
                    Update
                </span>    
            </div>

                  
          </div>

          {/* Company contact person */}
          <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
            <div className="w-[300px]">
                <span className="text-lg text-white/80">
                    Contact person
                </span><br/>
                <span className="text-lg text-white/40">
                    This will your company’s primary point of contact.
                </span>
            </div>
            <div className="flex-1 flex items-start flex-col">
                <p className="text-white/60 w-full md:max-w-[250px]">
                    {partner?.contact_person ?? `John Doe`}
                </p>
                <p className="text-white/40 w-full md:max-w-[250px]">
                    {partner?.company_email ?? `email@email.com`}
                </p>
            </div>            
          </div>

          {/* Shortcodes */}
          <div className="flex justify-between items-end" onClick={() => setAddShortcodeDialogue(true)}>
                <h1 className="text-3xl mt-8 font-bold text-white/80">Shortcodes</h1>

                <span className="px-4 py-2 border-1 border-white/20 rounded-full
                     text-white/80 cursor-pointer hover:bg-white/5">
                    Add new
                </span>
          </div>
         
          <div className="bg-white/10 rounded-xl px-8 py-4 flex flex-col md:flex-row w-full mt-4">
            <div className="">
                <span className="bg-black w-16 h-16 rounded-full flex justify-center items-center">
                    <DialIcon />
                </span>
            </div>
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <p className="text-white/60 w-fulltext-lg">
                    {`4893009`}
                </p>
                <p className="text-white/40 w-full">
                    {`Issued 10/02/2021`}
                </p>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center">
                <span className="px-2 py-1 rounded text-white bg-green-500">Active</span>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <span className=" text-white/60">{`Expires on 10/02/24 `}</span>
            </div>  

            <span className="ml-auto border-1 border-white/20 w-16 h-16 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#eee" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>                     
          </div>

          <div className="bg-white/10 rounded-xl px-8 py-4 flex flex-col md:flex-row w-full mt-2">
            <div className="">
                <span className="bg-black w-16 h-16 rounded-full flex justify-center items-center">
                    <DialIcon />
                </span>
            </div>
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <p className="text-white/60 w-fulltext-lg">
                    {`4893009`}
                </p>
                <p className="text-white/40 w-full">
                    {`Issued 10/02/2021`}
                </p>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center">
                <span className="px-2 py-1 rounded text-white bg-red-400">Expired</span>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <span className=" text-white/60">{`Expires on 10/02/24 `}</span>
            </div>  

            <span className="ml-auto border-1 border-white/20 w-16 h-16 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#eee" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>                     
          </div>

          <div className="bg-white/10 rounded-xl px-8 py-4 flex flex-col md:flex-row w-full mt-2">
            <div className="">
                <span className="bg-black w-16 h-16 rounded-full flex justify-center items-center">
                    <DialIcon />
                </span>
            </div>
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <p className="text-white/60 w-fulltext-lg">
                    {`4893009`}
                </p>
                <p className="text-white/40 w-full">
                    {`Issued 10/02/2021`}
                </p>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center">
                <span className="px-2 py-1 rounded text-black bg-gray-400">Pending</span>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <span className=" text-white/60">{`Expires on 10/02/24 `}</span>
            </div>  

            <span className="ml-auto border-1 border-white/20 w-16 h-16 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#eee" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>                     
          </div>

          {/* VAS */}
          <div className="flex justify-between items-end">
                <h1 className="text-3xl mt-8 font-bold text-white/80">VAS License</h1>

                <span className="px-4 py-2 border-1 border-white/20 rounded-full
                     text-white/80 cursor-pointer hover:bg-white/5">
                    Add new
                </span>
          </div>  
          <div className="bg-white/10 rounded-xl px-8 py-4 flex flex-col md:flex-row w-full mt-4">
            <div className="">
                <span className="bg-black w-16 h-16 rounded-full flex justify-center items-center">
                    <DialIcon />
                </span>
            </div>
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <p className="text-white/60 w-fulltext-lg">
                    {`ID: 6489309`}
                </p>
                <p className="text-white/40 w-full">
                    {`Issued 10/02/2021`}
                </p>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center">
                <span className="px-2 py-1 rounded text-black bg-gray-400">Pending</span>
            </div>  
            <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                <span className=" text-white/60">{`Expires on 10/02/24 `}</span>
            </div>  

            <span className="ml-auto border-1 border-white/20 w-16 h-16 rounded-full flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#eee" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>                     
          </div>        

          
        </div>
      </div>

      <ChangeAddressDialogue />
      <ChangeAddressModal />
      <AddShortcodeDialogue />
      <AddShortcodeModal />
      <ProfileSuccessModal />

      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}