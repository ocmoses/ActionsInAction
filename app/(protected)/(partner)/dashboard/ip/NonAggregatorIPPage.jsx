"use client";
import { useState, useEffect, useContext } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase,
  getInitials,
  capitalizeFirst
} from "@/app/modules/utilities";
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import useContracts from "@/hooks/useContracts";
import moment from "moment";
import usePartners from "@/hooks/usePartners";
import TextInput from "@/app/components/form/TextInput";
import FileInput from "@/app/components/form/FileInput";
import DatePicker from "@/app/components/form/DatePicker";


export default function NonAggregatorIPPage() {

    const {
        getAllServices,
        getAllShortcodes
    } = usePartners();

  // console.log("Partner", partner);
    
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false)
                                                }, 3000);

  const [step, setStep] = useState(1);

  const [ownerType, setOwnerType] = useState(null);

  const [ownerIsAlive, setOwnerIsAlive] = useState(false);
  
  const [data, setData] = useState({service_type: "", service_name: "", shortcode: "", bearer: "", 
                                        start_date: "", end_date: "", authorisation_video: "", 
                                        agreement_letter: "", content_creator_id: "", agent_id: "", 
                                        probate_of_will: ""});

  const [shortcodes, setShortcodes] = useState([]);

  const [services, setServices] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  let today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const two_years_ago = new Date().setDate(today.getDate() - 739);
  const max_expiry = new Date().setDate((data.AVL_issuing_date == "" ? today : data.AVL_issuing_date) + 739);


  const submitService = () => {
    setSubmitting(true);

    setTimeout(() => {
        setSubmitting(false);
        setStep(2);
    }, 3000);
  }

  const submitAllProof = () => {
    setSubmitting(true);

    setTimeout(() => {
        setSubmitting(false);
        setSuccessMessage("Submitted successfully");
        setSuccessToast(true);
    }, 3000);
  }

    
  const bearers = [
        {value: "sms", title: "SMS"},
        {value: "ivr", title: "IVR"},
        {value: "ussd", title: "USSD"},
  ];

  const owner = {
    CONTENT_CREATOR: "Content_Creator",
    AGENT: "Agent",
    RECORD_LABEL: "record_label"
  };

  const goBack = () => {

    if(ownerType == owner.CONTENT_CREATOR || ownerType == owner.AGENT ||  ownerType == owner.RECORD_LABEL){
        setStep(2);
        setOwnerType(null);
    }

  }

  const handleFormChange = () => {

  }

 
  // console.log("isSuperadmin", isSuperadmin);

    useEffect(() => {

        getAllServices().then(resp => resp.error ? setError({error: resp.error}) : setServices(resp.service_types));

        getAllShortcodes().then(resp => resp.error ? setError({error: resp.error}) : setShortcodes(resp.shortcodes));

    }, []);
    
  return (

    <>
        <div className="flex flex-col justify-center items-center pt-8 space-y-16 relative">

            {
                step >= 3 && 
                <span onClick={() => goBack()} 
                        className="absolute left-4 top-4 px-3 py-2 border-1 border-white/20 rounded-full
                    text-white/80 cursor-pointer hover:bg-white/5 text-sm mb-auto flex space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back
                </span>
            }
           
            
            <div className="flex space-x-2 items-center">

                <span className={`border-1 w-8 h-8 rounded-full flex justify-center items-center text-white/80 ${step == 1 ? "border-mtn  bg-black" : "border-white/20  bg-white/20"}`}>
                    1
                </span> 
                <span className={`${step == 1 ? "text-mtn bg-black" : " text-white/80 bg-white/5"}`}>
                    Service Detail
                </span>
                <span className="w-20 h-0.5 bg-white/20"></span>

                <span className={`border-1 w-8 h-8 rounded-full flex justify-center items-center text-white/80 ${step == 2 ? "border-mtn  bg-black" : "border-white/20  bg-white/20"}`}>
                    2
                </span> 
                <span className={`${step == 2 ? "text-mtn bg-black" : " text-white/80 bg-white/5"}`}>
                    Licensing Party
                </span>
                <span className="w-20 h-0.5 bg-white/20"></span>

                <span className={`border-1 w-8 h-8 rounded-full flex justify-center items-center text-white/80 ${step == 3 ? "border-mtn  bg-black" : "border-white/20  bg-white/20"}`}>
                    3
                </span> 
                <span className={`${step == 3 ? "text-mtn bg-black" : " text-white/80 bg-white/5"}`}>
                    IP Details
                </span>

            </div>

            {
                step == 1 && 
                <ServiceDetail />
            }
            {
                step == 2 && 
                <Licensing />
            }
            {
                step == 3 && ownerType == owner.CONTENT_CREATOR && 
                <ContentOwner />
            }
            {
                step == 3 && ownerType == owner.AGENT &&
                <IsAgent />
            }
            {
                step == 3 && ownerType == owner.RECORD_LABEL &&
                <IsRecordLabel />
            }
        </div>

        <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );

  function ServiceDetail(){       

    return (
        <div className="flex flex-col space-y-8 w-[500px]">
            <div className="text-center flex flex-col space-y-2">
                <h2 className="text-4xl font-mtn text-white">Your service details</h2>
                <h4 className="text-white/60 font-mtn text-2xl">What services will you be offering</h4>
            </div>

            <TextInput
                id="service_type"
                label="Service type"
                // value={data.role_name}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleChange(e)}
              />

            <TextInput
                id="service_name"
                label="Service Name"
                // value={data.role_name}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleChange(e)}
              />

              <div className="flex flex-col space-y-2">

                <p className="text-white">Short code</p>

                <span className="text-white/60 text-sm">This is the short code associated with this service.</span>

              </div>

              <div className="flex space-x-4 flex-NOwrap w-full">
                {
                    shortcodes.map(s => <ShortCode key={s} value={s} />)
                }
              </div>

              <div className="flex flex-col space-y-2">

                <p className="text-white">Purpose /service usage</p>

                <span className="text-white/60 text-sm">Provide a brief overview of what your service offers.</span>

              </div>

              <textarea
                    onKeyUp={(e) => handleChange(e)}
                    onBlur={(e) => handleChange(e)}
                    className="rounded p-4 mb-4 border-1 border-white/20 bg-white/10 text-white"
                    rows="6"
              ></textarea>



              <div className="flex flex-col space-y-2">

                <p className="text-white">Bearer</p>

                <span className="text-white/60 text-sm">This is the bearer associated with this service.</span>

              </div>

              <div className="flex space-x-4 flex-NOwrap w-full">
                {
                    bearers.map(b => <Bearer key={b.value} value={b.title} />)
                }
              </div>

              <div className="flex justify-end item-end py-8">
                {
                    !submitting && 
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => submitService()}>Next</button>
                }
                {
                    submitting && 
                    <div className="flex px-4">
                        <TailSpinPreloader width={40} height={40} fill="#efb703" />
                    </div>
                }
                
            </div>


        </div>
    )

    function ShortCode({value}){
        return (
            <div onClick={() => setData({...data, shortcode: value})} className={`p-4 text-white/80 w-1/3 border-2 ${data.shortcode == value ? "border-mtn" : "border-white/20"} rounded-md flex items-center justify-center cursor-pointer`}>
                {value}
            </div>
        );
    }

    function Bearer({value}){
        return (
            <div onClick={() => setData({...data, bearer: value})} className={`p-4 text-white/80 w-1/3 border-2 ${data.bearer == value ? "border-mtn" : "border-white/20"} rounded-md flex items-center justify-center cursor-pointer`}>
                {value}
            </div>
        );
    }

  }

  function Licensing(){

    return (
        <>
            <div className="flex flex-col space-y-20 w-[1000px] mb-24">

                <div className="text-center flex flex-col space-y-2">
                    <h2 className="text-4xl font-mtn text-white">Who’s licensing your content</h2>
                    <h4 className="text-white/60 font-mtn text-2xl">Choose who’s representing the content provider for this service</h4>
                </div>

                <div className="w-full flex space-x-12 flex-nowrap">

                    <div onClick={() => {setStep(3); setOwnerType(owner.CONTENT_CREATOR)}} 
                            className="cursor-pointer hover:bg-white/5 w-1/3 border-2 border-white/20 rounded-lg h-[300px] flex flex-col justify-center p-8 space-y-4 ">
                        <div className="">
                            <svg width="40" height="67" viewBox="0 0 40 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 0.5C15.0371 0.5 11 4.53711 11 9.5C11 14.4629 15.0371 18.5 20 18.5C24.9629 18.5 29 14.4629 29 9.5C29 4.53711 24.9629 0.5 20 0.5ZM20 15.5C16.6909 15.5 14 12.8083 14 9.5C14 6.19165 16.6909 3.5 20 3.5C23.3091 3.5 26 6.19165 26 9.5C26 12.8083 23.3091 15.5 20 15.5Z" fill="#E4B809"/>
                                <path d="M38 53H28.4734C28.8011 52.3154 29 51.5582 29 50.75V36.5H30.5C32.9814 36.5 35 34.4814 35 32V24.5C35 19.5371 30.9629 15.5 26 15.5H14C9.03711 15.5 5 19.5371 5 24.5V32C5 34.4814 7.01855 36.5 9.5 36.5H11V50.75C11 51.5582 11.1989 52.3154 11.5266 53H2C1.1709 53 0.5 53.6716 0.5 54.5V65C0.5 65.8284 1.1709 66.5 2 66.5H38C38.8291 66.5 39.5 65.8284 39.5 65V54.5C39.5 53.6716 38.8291 53 38 53ZM14 50.75V26C14 25.1716 13.3291 24.5 12.5 24.5C11.6709 24.5 11 25.1716 11 26V33.5H9.5C8.67236 33.5 8 32.8269 8 32V24.5C8 21.1917 10.6909 18.5 14 18.5H26C29.3091 18.5 32 21.1917 32 24.5V32C32 32.8269 31.3276 33.5 30.5 33.5H29V26C29 25.1716 28.3291 24.5 27.5 24.5C26.6709 24.5 26 25.1716 26 26V50.75C26 51.9907 24.9907 53 23.75 53C22.5093 53 21.5 51.9907 21.5 50.75V36.5C21.5 35.6716 20.8291 35 20 35C19.1709 35 18.5 35.6716 18.5 36.5V50.75C18.5 51.9907 17.4907 53 16.25 53C15.0093 53 14 51.9907 14 50.75ZM36.5 63.5H3.5V56H36.5V63.5Z" fill="white"/>
                            </svg>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <p className="text-white text-xl">Content creator</p>
                            <p className="text-white/60 text-md">The creator of the content for this service</p>
                        </div>
                        
                    </div>

                    <div onClick={() => {setStep(3); setOwnerType(owner.AGENT)}} 
                            className="cursor-pointer hover:bg-white/5 w-1/3 border-2 border-white/20 rounded-lg h-[300px] flex flex-col justify-center p-8 space-y-4 ">
                        
                        <div className="">
                            <svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M69.0001 47V51.5C69.0001 53.9814 66.9815 56 64.5001 56H40.5001C39.6717 56 39.0001 55.3284 39.0001 54.5C39.0001 53.6716 39.6717 53 40.5001 53H57.0001V44C57.0001 43.1716 57.6717 42.5 58.5001 42.5C59.3284 42.5 60.0001 43.1716 60.0001 44V53H64.5001C65.327 53 66.0001 52.3269 66.0001 51.5V47C66.0001 41.2102 61.2899 36.5 55.5001 36.5H43.5001C41.086 36.5 38.8162 37.2961 36.9368 38.8035C36.2894 39.3206 35.3467 39.2188 34.8282 38.5713C34.3104 37.9253 34.4136 36.9812 35.0604 36.4626C37.4429 34.5525 40.4407 33.5 43.5001 33.5H55.5001C62.9437 33.5 69.0001 39.5564 69.0001 47ZM36.0001 18.5C36.0001 11.8833 41.3834 6.5 48.0001 6.5C54.6168 6.5 60.0001 11.8833 60.0001 18.5C60.0001 25.1167 54.6168 30.5 48.0001 30.5C41.3834 30.5 36.0001 25.1167 36.0001 18.5ZM39.0001 18.5C39.0001 23.4629 43.0372 27.5 48.0001 27.5C52.9629 27.5 57.0001 23.4629 57.0001 18.5C57.0001 13.5371 52.9629 9.5 48.0001 9.5C43.0372 9.5 39.0001 13.5371 39.0001 18.5Z" fill="#E4B809"/>
                                <path d="M28.5 44H16.5C9.0564 44 3 50.0564 3 57.5V62C3 64.4814 5.01855 66.5 7.5 66.5H37.5C39.9814 66.5 42 64.4814 42 62V57.5C42 50.0564 35.9436 44 28.5 44ZM39 62C39 62.8269 38.3269 63.5 37.5 63.5H33V54.5C33 53.6716 32.3284 53 31.5 53C30.6716 53 30 53.6716 30 54.5V63.5H15V54.5C15 53.6716 14.3284 53 13.5 53C12.6716 53 12 53.6716 12 54.5V63.5H7.5C6.6731 63.5 6 62.8269 6 62V57.5C6 51.7102 10.7102 47 16.5 47H28.5C34.2898 47 39 51.7102 39 57.5V62ZM21 41C27.6167 41 33 35.6167 33 29C33 22.3833 27.6167 17 21 17C14.3833 17 9 22.3833 9 29C9 35.6167 14.3833 41 21 41ZM21 20C25.9629 20 30 24.0371 30 29C30 33.9629 25.9629 38 21 38C16.0371 38 12 33.9629 12 29C12 24.0371 16.0371 20 21 20Z" fill="white"/>
                            </svg>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <p className="text-white text-xl">Agent / third-party</p>
                            <p className="text-white/60 text-md">Someone representing the content creator</p>
                        </div>
                        
                    </div>

                    <div onClick={() => {setStep(3); setOwnerType(owner.RECORD_LABEL)}} 
                            className="cursor-pointer hover:bg-white/5 w-1/3 border-2 border-white/20 rounded-lg h-[300px] flex flex-col justify-center p-8 space-y-4 ">
                        <div className="">
                            <svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M62.9927 58.666C62.8474 55.3748 60.5582 52.6579 57.4999 51.8049C58.1291 50.856 58.5 49.7214 58.5 48.5C58.5 45.1917 55.8091 42.5 52.5 42.5C49.1909 42.5 46.5 45.1917 46.5 48.5C46.5 49.7215 46.871 50.8562 47.5003 51.8051C44.3393 52.687 42 55.5617 42 59C42 59.8284 42.6709 60.5 43.5 60.5H61.5C61.5103 60.5 61.522 60.5007 61.5293 60.5C62.3584 60.5 63.0293 59.8284 63.0293 59C63.0293 58.885 63.0176 58.7737 62.9927 58.666ZM52.5 45.5C54.1538 45.5 55.5 46.8455 55.5 48.5C55.5 50.1545 54.1538 51.5 52.5 51.5C50.8462 51.5 49.5 50.1545 49.5 48.5C49.5 46.8455 50.8462 45.5 52.5 45.5ZM45.2563 57.5C45.876 55.7539 47.5444 54.5 49.5 54.5H55.5C57.4556 54.5 59.124 55.7539 59.7437 57.5H45.2563ZM52.5 36.5C43.4019 36.5 36 43.9019 36 53C36 62.0981 43.4019 69.5 52.5 69.5C61.5981 69.5 69 62.0981 69 53C69 43.9019 61.5981 36.5 52.5 36.5ZM52.5 66.5C45.0557 66.5 39 60.4436 39 53C39 45.5564 45.0557 39.5 52.5 39.5C59.9443 39.5 66 45.5564 66 53C66 60.4436 59.9443 66.5 52.5 66.5Z" fill="white"/>
                                <path d="M27.6307 21.5637C28.1703 20.6637 28.5 19.6235 28.5 18.5V15.5C28.5 12.1917 25.8084 9.5 22.5 9.5C19.1917 9.5 16.5 12.1917 16.5 15.5V18.5C16.5 19.6235 16.8297 20.6637 17.3693 21.5637C13.5331 21.8901 10.5 25.0807 10.5 29V32C10.5 32.8284 11.1716 33.5 12 33.5H33C33.8284 33.5 34.5 32.8284 34.5 32V29C34.5 25.0807 31.467 21.8901 27.6307 21.5637ZM19.5 15.5C19.5 13.8455 20.8455 12.5 22.5 12.5C24.1545 12.5 25.5 13.8455 25.5 15.5V18.5C25.5 20.1545 24.1545 21.5 22.5 21.5C20.8455 21.5 19.5 20.1545 19.5 18.5V15.5ZM31.5 30.5H13.5V29C13.5 26.5186 15.5186 24.5 18 24.5H27C29.4814 24.5 31.5 26.5186 31.5 29V30.5ZM22.5 3.5C11.7473 3.5 3 12.2473 3 23C3 33.7527 11.7473 42.5 22.5 42.5C33.2527 42.5 42 33.7527 42 23C42 12.2473 33.2527 3.5 22.5 3.5ZM22.5 39.5C13.4019 39.5 6 32.0981 6 23C6 13.9019 13.4019 6.5 22.5 6.5C31.5981 6.5 39 13.9019 39 23C39 32.0981 31.5981 39.5 22.5 39.5Z" fill="white"/>
                                <path d="M69 29C69 29.8284 68.3291 30.5 67.5 30.5C66.6709 30.5 66 29.8284 66 29C66 23.9316 60.356 20 55.5 20H50.1211L52.0605 21.9395C52.6465 22.5254 52.6465 23.4746 52.0605 24.0605C51.7676 24.3535 51.3838 24.5 51 24.5C50.6162 24.5 50.2324 24.3535 49.9395 24.0605L45.4395 19.5605C44.8535 18.9746 44.8535 18.0254 45.4395 17.4395L49.9395 12.9395C50.5254 12.3535 51.4746 12.3535 52.0605 12.9395C52.6465 13.5254 52.6465 14.4746 52.0605 15.0605L50.1211 17H55.5C61.8721 17 69 22.1321 69 29Z" fill="#E4B809"/>
                                <path d="M32.5605 55.5605L28.0605 60.0605C27.7676 60.3535 27.3838 60.5 27 60.5C26.6162 60.5 26.2324 60.3535 25.9395 60.0605C25.3535 59.4746 25.3535 58.5254 25.9395 57.9395L27.8789 56H18C11.3833 56 6 50.6167 6 44C6 43.1716 6.67163 42.5 7.5 42.5C8.32837 42.5 9 43.1716 9 44C9 48.9629 13.0371 53 18 53H27.8789L25.9395 51.0605C25.3535 50.4746 25.3535 49.5254 25.9395 48.9395C26.5254 48.3535 27.4746 48.3535 28.0605 48.9395L32.5605 53.4395C33.1465 54.0254 33.1465 54.9746 32.5605 55.5605Z" fill="#E4B809"/>
                            </svg>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <p className="text-white text-xl">Content creatorRecord label</p>
                            <p className="text-white/60 text-md">An organisation that a creator is signed to.</p>
                        </div>
                        
                    </div>

                </div>


            </div>
        </>
    )

  }
  

  function ContentOwner(){

    return (
        <>
            <div className="flex flex-col space-y-12 w-[850px] mb-24">

                <div className="text-center flex flex-col space-y-2">
                    <h2 className="text-4xl font-mtn text-white">Provide proof of ownership</h2>
                    <h4 className="text-white/60 font-mtn text-2xl">As furnished by a content creator</h4>
                </div>

                <div className="w-full flex flex-col space-y-6 flex-nowrap">

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            1
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Authorisation letter from content owner to MTN</h4>
                            <p className="text-white/60 text-sm">Must be based on our authorisation checklist.</p>
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See letter checklist</span>
                            </div>
                        </div>

                        <FileInput
                            id="authorisation_letter"
                            doc_id="authorisation_letter_doc"
                            label="Authorization Letter"
                            value={data.authorisation_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            2
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Licensing Period</h4>
                            <p className="text-white/60 text-sm">Indicate the validity period granted by the content owner - as stated in the letter of authorisation.</p>                            
                        </div>

                        <div className="flex space-x-2 no-wrap items-center h-full">

                            <DatePicker
                                id="start_date"
                                label="Start date"
                                value={data.start_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={two_years_ago}
                                max={today}
                                disabled={false}
                            />

                            <DatePicker
                                id="end_date"
                                label="End date"
                                value={data.end_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={tomorrow}
                                max={max_expiry}
                                disabled={false}
                            />

                        </div>
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            3
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Video showing signing</h4>
                            <p className="text-white/60 text-sm">Must capture the content owner and the authorisation letter being signed.</p> 
                            <div className="flex space-x-2 items-base">
                                <span className="text-xs text-mtn">See video sample</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="authorisation_video"
                            doc_id="authorisation_video_doc"
                            label="Authorization Video"
                            value={data.authorisation_video}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            4
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Aggrement between [content owner] and [Dreamvile Digital Limited] VAS partner</h4>
                            <p className="text-white/60 text-sm"></p> 
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See agreement checklist</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="agreement_letter"
                            doc_id="agreement_letter_doc"
                            label="Agreement Letter"
                            value={data.agreement_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            5
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Content creator’s ID</h4>
                            <p className="text-white/60 text-sm">Submit a valid means of identification for the content creator. E.g International passport, driver’s license, voter’s card</p> 
                            <div className="flex space-x-2 items-base">
                                
                            </div>                           
                        </div>

                        <FileInput
                            id="content_creator_id"
                            doc_id="content_creator_id_doc"
                            label="ID (Content creator)"
                            value={data.content_creator_id}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            6
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Other content proof of ownership (optional)</h4>
                            <p className="text-white/60 text-sm">Provide any other proof you may have for your content ownership.</p> 
                            <div className="flex space-x-2 items-base">
                            </div>                           
                        </div>

                        <FileInput
                            id="other_content_proof"
                            doc_id="other_content_proof_doc"
                            label="Other proof of ownership"
                            value={data.other_content_proof}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>


                </div>

                <div className="flex justify-end item-end py-8">
                    {
                        !submitting && 
                        <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => submitAllProof()}>Next</button>
                    }
                    {
                        submitting && 
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }
                </div>



            </div>
        </>
    )

  }

  function IsAgent(){

    return (
        <>
            <div className="flex flex-col space-y-12 w-[850px] mb-24">

                <div className="text-center flex flex-col space-y-2">
                    <h2 className="text-4xl font-mtn text-white">Provide proof of ownership</h2>
                    <h4 className="text-white/60 font-mtn text-2xl">As furnished by a content creator</h4>
                </div>

                <div className="w-full flex flex-col space-y-6 flex-nowrap">

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            1
                        </span> 
                        <div className="w-[250px] min-2-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Physical status of the content creator</h4>
                            <p className="text-white/60 text-sm">Choose an option that applies</p>
                            
                        </div>

                        <div className="flex space-x-2 flex-nowrap items-center h-full">

                            <div onClick={() => setOwnerIsAlive(true)}  
                                    className={`cursor-pointer p-6 relative hover:bg-white/5 h-[120px] rounded-xl ${ownerIsAlive ? "border-2 border-mtn" : "border-white/20"} w-1/2 justify-center flex flex-col space-y-4`}>
                                        {
                                            ownerIsAlive && 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow" className="w-4 h-4 absolute top-4 right-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        }                                        

                                        <h4 className="text-white font-mtn text-sm">Alive</h4>
                                        <p className="text-white/60 font-mtn text-sm">Content creator is alive and active</p>
                            </div>

                            <div onClick={() => setOwnerIsAlive(false)} 
                                    className={`cursor-pointer p-6 relative hover:bg-white/5 h-[120px] rounded-xl ${!ownerIsAlive ? "border-2 border-mtn" : "border-white/20"} w-1/2 justify-center  flex flex-col space-y-4`}>
                                        {
                                            !ownerIsAlive && 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow" className="w-4 h-4 absolute top-4 right-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        }  
                                        <h4 className="text-white font-mtn text-sm">Deceased</h4>
                                        <p className="text-white/60 font-mtn text-sm">Content creator is alive and active</p>
                            </div>

                        </div>
                        
                    </div>
                    {
                        !ownerIsAlive && 
                        <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                            <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 bg-white/20 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </span> 
                            <div className="w-[250px] flex flex-col space-y-2">
                                <h4 className="font-mtn text-white text-md">Probate of will</h4>
                                <p className="text-white/60 text-sm">Must be based on our authorisation checklist.</p>
                                <div className="flex space-x-2 items-base">                                
                                </div>
                            </div>

                            <FileInput
                                id="probate_of_will"
                                doc_id="probate_of_will_doc"
                                label="Probate of Will"
                                value={data.probate_of_will}
                                onChange={handleFormChange}
                                errors={errors}
                                disabled={false}
                                style="flex-1"
                            />
                            
                        </div>
                    }
                    

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            2
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Authorisation letter from content owner to MTN</h4>
                            <p className="text-white/60 text-sm">Must be based on our authorisation checklist.</p>
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See letter checklist</span>
                            </div>
                        </div>

                        <FileInput
                            id="authorisation_letter"
                            doc_id="authorisation_letter_doc"
                            label="Authorization Letter"
                            value={data.authorisation_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            3
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Licensing Period</h4>
                            <p className="text-white/60 text-sm">Indicate the validity period granted by the content owner - as stated in the letter of authorisation.</p>                            
                        </div>

                        <div className="flex space-x-2 no-wrap items-center h-full">

                            <DatePicker
                                id="start_date"
                                label="Start date"
                                value={data.start_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={two_years_ago}
                                max={today}
                                disabled={false}
                            />

                            <DatePicker
                                id="end_date"
                                label="End date"
                                value={data.end_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={tomorrow}
                                max={max_expiry}
                                disabled={false}
                            />

                        </div>
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            4
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Video showing signing</h4>
                            <p className="text-white/60 text-sm">Must capture the content owner and the authorisation letter being signed.</p> 
                            <div className="flex space-x-2 items-base">
                                <span className="text-xs text-mtn">See video sample</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="authorisation_video"
                            doc_id="authorisation_video_doc"
                            label="Authorization Video"
                            value={data.authorisation_video}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            5
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Agreement between content creator and [agent]</h4>
                            <p className="text-white/60 text-sm">This is the short code associated with your service.</p> 
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">Get thhe checklist</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="agreement_letter"
                            doc_id="agreement_letter_doc"
                            label="Agreement Letter"
                            value={data.agreement_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            6
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Aggrement between [content owner] and [Dreamvile Digital Limited] VAS partner</h4>
                            <p className="text-white/60 text-sm"></p> 
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See agreement checklist</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="agreement_letter"
                            doc_id="agreement_letter_doc"
                            label="Agreement Letter"
                            value={data.agreement_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            7
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Content creator’s ID</h4>
                            <p className="text-white/60 text-sm">Submit a valid means of identification for the content creator. E.g International passport, driver’s license, voter’s card</p> 
                            <div className="flex space-x-2 items-base">
                                
                            </div>                           
                        </div>

                        <FileInput
                            id="content_creator_id"
                            doc_id="content_creator_id_doc"
                            label="Content creator ID"
                            value={data.content_creator_id}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            8
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Agent’s ID</h4>
                            <p className="text-white/60 text-sm">Submit a valid means of identification for the Agent. E.g International passport, driver’s license, voter’s card</p> 
                            <div className="flex space-x-2 items-base">
                                
                            </div>                           
                        </div>

                        <FileInput
                            id="agent_id"
                            doc_id="agent_id_doc"
                            label="Agent ID"
                            value={data.agent_id}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>



                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            9
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Other content proof of ownership (optional)</h4>
                            <p className="text-white/60 text-sm">Provide any other proof you may have for your content ownership.</p> 
                            <div className="flex space-x-2 items-base">
                            </div>                           
                        </div>

                        <FileInput
                            id="other_content_proof"
                            doc_id="other_content_proof_doc"
                            label="Other proof of ownership"
                            value={data.other_content_proof}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>


                </div>

                <div className="flex justify-end item-end py-8">
                    {
                        !submitting && 
                        <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => submitAllProof()}>Next</button>
                    }
                    {
                        submitting && 
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }
                </div>

                


            </div>
        </>
    )

  }

  function IsRecordLabel(){

    return (
        <>
            <div className="flex flex-col space-y-12 w-[850px] mb-24">

                <div className="text-center flex flex-col space-y-2">
                    <h2 className="text-4xl font-mtn text-white">Provide proof of ownership</h2>
                    <h4 className="text-white/60 font-mtn text-2xl">As furnished by a content creator</h4>
                </div>

                <div className="w-full flex flex-col space-y-6 flex-nowrap">

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            1
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Authorisation letter from content owner to MTN</h4>
                            <p className="text-white/60 text-sm">Must be based on our authorisation checklist.</p>
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See letter checklist</span>
                            </div>
                        </div>

                        <FileInput
                            id="authorisation_letter"
                            doc_id="authorisation_letter_doc"
                            label="Authorization Letter"
                            value={data.authorisation_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            2
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Licensing Period</h4>
                            <p className="text-white/60 text-sm">Indicate the validity period granted by the content owner - as stated in the letter of authorisation.</p>                            
                        </div>

                        <div className="flex space-x-2 no-wrap items-center h-full">

                            <DatePicker
                                id="start_date"
                                label="Start date"
                                value={data.start_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={two_years_ago}
                                max={today}
                                disabled={false}
                            />

                            <DatePicker
                                id="end_date"
                                label="End date"
                                value={data.end_date}
                                onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleChange(e)}
                                errors={errors}
                                min={tomorrow}
                                max={max_expiry}
                                disabled={false}
                            />

                        </div>
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            3
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Video showing signing</h4>
                            <p className="text-white/60 text-sm">Must capture the content owner and the authorisation letter being signed.</p> 
                            <div className="flex space-x-2 items-base">
                                <span className="text-xs text-mtn">See video sample</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="authorisation_video"
                            doc_id="authorisation_video_doc"
                            label="Authorization Video"
                            value={data.authorisation_video}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            4
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Agreement between content creator and [agent]</h4>
                            <p className="text-white/60 text-sm">This is the short code associated with your service.</p> 
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">Get thhe checklist</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="agreement_letter"
                            doc_id="agreement_letter_doc"
                            label="Agreement Letter"
                            value={data.agreement_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            5
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Aggrement between [content owner] and [Dreamvile Digital Limited] VAS partner</h4>
                            <p className="text-white/60 text-sm"></p> 
                            <div className="flex space-x-2 items-base">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span className="text-xs text-mtn">See agreement checklist</span>
                            </div>                           
                        </div>

                        <FileInput
                            id="agreement_letter"
                            doc_id="agreement_letter_doc"
                            label="Agreement Letter"
                            value={data.agreement_letter}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            6
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Content creator’s ID</h4>
                            <p className="text-white/60 text-sm">Submit a valid means of identification for the content creator. E.g International passport, driver’s license, voter’s card</p> 
                            <div className="flex space-x-2 items-base">
                                
                            </div>                           
                        </div>

                        <FileInput
                            id="content_creator_id"
                            doc_id="content_creator_id_doc"
                            label="Content creator ID"
                            value={data.content_creator_id}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            7
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Agent’s ID</h4>
                            <p className="text-white/60 text-sm">Submit a valid means of identification for the Agent. E.g International passport, driver’s license, voter’s card</p> 
                            <div className="flex space-x-2 items-base">
                                
                            </div>                           
                        </div>

                        <FileInput
                            id="agent_id"
                            doc_id="agent_id_doc"
                            label="Agent ID"
                            value={data.agent_id}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>

                    <div className="border-1 border-white/20 rounded-xl p-4 w-full flex flex-nowrap space-x-4 ">
                        <span className="border-2 w-10 h-10 rounded-full flex justify-center items-center text-white/80  bg-black border-white/20 ">
                            8
                        </span> 
                        <div className="w-[250px] flex flex-col space-y-2">
                            <h4 className="font-mtn text-white text-md">Other content proof of ownership (optional)</h4>
                            <p className="text-white/60 text-sm">Provide any other proof you may have for your content ownership.</p> 
                            <div className="flex space-x-2 items-base">
                            </div>                           
                        </div>

                        <FileInput
                            id="other_content_proof"
                            doc_id="other_content_proof_doc"
                            label="Other proof of ownership"
                            value={data.other_content_proof}
                            onChange={handleFormChange}
                            errors={errors}
                            disabled={false}
                            style="flex-1"
                        />
                        
                    </div>


                </div>

                <div className="flex justify-end item-end py-8">
                    {
                        !submitting && 
                        <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => submitAllProof()}>Next</button>
                    }
                    {
                        submitting && 
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }
                </div>


            </div>
        </>
    )

  }

}