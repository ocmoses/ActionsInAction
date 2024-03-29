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
import AddVASLicenseDialogue from "@/app/components/modals/AddVASLicenseDialogue";
import AddVASLicenseModal from "@/app/components/modals/AddVASLicenseModal";
import Contracts from "../../../contracts/Contracts";

export default function AggregatorProfile() {

    const {
        partner, 
        setAddVASLicenseDialogue

    } = useContext(ProfileContext);
    
  const [content, setContent] = useState("Profile");
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
              <div className="flex flex-col h-full space-y-4 items-start">
                <p className="font-bold text-white text-4xl">{partner?.company_name}</p>
                <span className="text-white/40 text-md">{partner?.company_type ?? "Limited Liability Company"}</span>
              </div>
            </div>            
          </div>

          

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="inline-flex space-x-4 bg-white/10 rounded-full p-2 my-8">

            <span className={`${content == "Profile" ? 
                                'bg-white/20 text-white' : 
                                'text-white/40 hover:bg-white/10 hover:text-white/80'}  
                                text-sm px-4 py-2 rounded-full 
                                cursor-pointer font-mtn`} 
                onClick={() => setContent("Profile")}>
                Profile
            </span>

            <span className={`${content == "Compliance" ? 
                                'bg-white/20 text-white' : 
                                'text-white/40 hover:bg-white/10 hover:text-white/80'}  
                                text-sm px-4 py-2 rounded-full 
                                cursor-pointer font-mtn`} 
                onClick={() => setContent("Compliance")}>
                Compliance
            </span>

            <span className={`${content == "Contracts" ? 
                                'bg-white/20 text-white' : 
                                'text-white/40 hover:bg-white/10 hover:text-white/80'}  
                                text-sm px-4 py-2 rounded-full 
                                cursor-pointer font-mtn`} 
                onClick={() => setContent("Contracts")}>
                Contracts
            </span>

          </div>

          {content == "Profile"  && ProfileContant()}

          {content == "Compliance" && ComplianceContent()}

          {content == "Contracts" && <div className="-mx-12"><Contracts /></div>}
                    
          
        </div>
      </div>

      <ChangeAddressDialogue />
      <ChangeAddressModal />
      <AddShortcodeDialogue />
      <AddShortcodeModal />
      <AddVASLicenseDialogue />
      <AddVASLicenseModal />

      <ProfileSuccessModal />

      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );

  function ProfileContant(){
    return (
        <div>
            {/* Legal name */}
            <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px]">
                    <span className="text-lg text-white/80">
                        Company name
                    </span>
                </div>
                <div className="flex-1 flex items-start">
                    <p className="text-white/60">
                        {partner?.company_name}
                    </p>
                </div>
            </div>

            {/* Company address */}
            <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px]">
                    <span className="text-lg text-white/80">
                        Company address
                    </span><br/>
                    {/* <span className="text-lg text-white/40">
                        The office or residence where you and your team work day-to-day.
                    </span> */}
                </div>
                <div className="flex-1 flex items-start">
                    <p className="text-white/60 w-full md:max-w-[250px]">
                        {partner?.company_address ?? `660 Mission St Floor 4 San Francisco, CA 94105 United States`}
                    </p>
                </div> 

                {/* <div className="ml-auto inline-flex items-start" onClick={() => setChangeAddressDialogue(true)}>
                    <span className=" px-4 py-2 border-1 border-white/20 rounded-full
                            text-white/80 cursor-pointer hover:bg-white/5">
                        Update
                    </span>    
                </div> */}

                    
            </div>

            {/* Contact email */}
            <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px]">
                    <span className="text-lg text-white/80">
                        Contact email
                    </span>
                </div>
                <div className="flex-1 flex items-start flex-col">
                    {/* <p className="text-white/60 w-full md:max-w-[250px]">
                        {partner?.contact_person ?? `John Doe`}
                    </p> */}
                    <p className="text-white/60 w-full md:max-w-[250px]">
                        {partner?.company_email ?? `email@email.com`}
                    </p>
                </div>            
            </div>

            {/* Contact phone */}
            <div className="bg-white/10 rounded-xl p-8 flex flex-col md:flex-row w-full mt-4">
                <div className="w-[300px]">
                    <span className="text-lg text-white/80">
                        Contact phone number
                    </span>
                </div>
                <div className="flex-1 flex items-start flex-col">
                    
                    <p className="text-white/60 w-full md:max-w-[250px]">
                        {partner?.company_phone ?? `+2348123456789`}
                    </p>
                    <p className="text-white/60 w-full md:max-w-[250px] flex cursor-pointer space-x-2 items-center"
                        onClick={() => {}}>
                        Edit &nbsp;<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.77031 0.740748L4.63125 3.72669C4.70108 3.79895 4.73575 3.89262 4.73575 3.9859C4.73575 4.07919 4.70108 4.17294 4.63125 4.24512L1.77031 7.23106C1.62731 7.38097 1.39 7.38584 1.24063 7.24229C1.09023 7.09971 1.08534 6.86135 1.2294 6.71245L3.8544 3.97182L1.22984 1.25934C1.0858 1.1109 1.09069 0.872155 1.24107 0.729498C1.39047 0.585905 1.62813 0.590905 1.77031 0.740748Z" fill="#FFCB03"/>
                             </svg>
                    </p>
                </div>            
            </div>
        </div>
    )
  }

  function ComplianceContent(){
    return (
        <>
            
          {/* VAS */}
          
          <div className="bg-white/10 rounded-xl px-8 py-4 flex flex-col w-full mt-4 space-y-4">
            <div className="flex justify-between items-center" onClick={() => setAddVASLicenseDialogue(true)} >
                <h1 className="text-md text-white/60">NCC VAS License</h1>
                {/* <span className="px-4 py-2 border-1 border-white/20 rounded-full
                    text-white/80 cursor-pointer hover:bg-white/5">
                    Add new
                </span> */}
            </div>  
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    <span className="bg-white/20 w-16 h-16 rounded-full flex justify-center items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4141 16.8619H12.1255L11.6695 17.3179C11.5597 17.4278 11.4106 17.4896 11.2552 17.4896H8.74477C8.58934 17.4896 8.44031 17.4278 8.33047 17.3179L7.87449 16.8619H0.585938C0.262344 16.8619 0 17.1243 0 17.4479V18.1588C0 19.1876 0.835547 19.9999 1.84117 19.9999H18.1588C19.1877 19.9999 20 19.1644 20 18.1588V17.4479C20 17.1242 19.7377 16.8619 19.4141 16.8619Z" fill="white"/>
                            <path d="M11.8408 0.828613V2.59373H13.6059L11.8408 0.828613Z" fill="white"/>
                            <path d="M8.53197 15.8616L8.98795 16.3176H11.013L11.469 15.8616C11.5788 15.7517 11.7279 15.69 11.8833 15.69H18.1177V7.48945C18.1177 6.47425 17.2917 5.64832 16.2765 5.64832H15.6072V12.5936C15.6072 13.5629 14.8187 14.3514 13.8494 14.3514H6.15154C5.18228 14.3514 4.39373 13.5629 4.39373 12.5936V5.64832H3.72443C2.70924 5.64832 1.8833 6.47425 1.8833 7.48945V15.69H8.11768C8.27307 15.69 8.42213 15.7517 8.53197 15.8616Z" fill="white"/>
                            <path d="M6.15088 13.1797H13.8488C14.1724 13.1797 14.4347 12.9173 14.4347 12.5938V3.76563H11.2551C10.9315 3.76563 10.6691 3.50328 10.6691 3.17969V0H6.15088C5.82729 0 5.56494 0.262344 5.56494 0.585938V12.5938C5.56494 12.9173 5.82725 13.1797 6.15088 13.1797ZM7.4894 2.51043H8.74459C9.52064 2.53898 9.52107 3.65359 8.74459 3.6823H7.4894C6.71334 3.65371 6.71291 2.53914 7.4894 2.51043ZM7.4894 5.02082H8.74459C9.52064 5.04938 9.52107 6.16399 8.74459 6.1927H7.4894C6.71334 6.16414 6.71291 5.04957 7.4894 5.02082ZM7.4894 7.53125H12.5102C12.8338 7.53125 13.0962 7.79359 13.0962 8.11719C13.0962 8.44078 12.8338 8.70313 12.5102 8.70313H7.4894C6.71439 8.67504 6.71193 7.56031 7.4894 7.53125ZM7.4894 10.0417H12.5102C12.8338 10.0417 13.0962 10.304 13.0962 10.6276C13.0962 10.9512 12.8338 11.2136 12.5102 11.2136H7.4894C6.71439 11.1855 6.71193 10.0707 7.4894 10.0417Z" fill="white"/>
                        </svg>
                    </span>
                    <p className="text-white w-fulltext-lg">
                        {`ID: 6489309`}
                    </p>
                </div>
                
                <div className="flex items-start flex-col ml-8 w-20 justify-center">
                    <span className="text-white/40">Issued</span>
                    <span className="text-white/40">{"10/02/2023"}</span>
                </div>  
                <div className="flex items-start flex-col ml-8 w-20 justify-center min-w-[200px]">
                    <span className="text-white/40">Expiry</span>
                    <span className="text-white/40">{"10/02/2025"}</span>
                </div>  

                <span className="rounded text-white text-sm bg-green-500 py-1 px-4 flex justify-center items-center">
                    {"Active"}
                </span>     
            </div>
                            
          </div>

        </>
    )
  }

}