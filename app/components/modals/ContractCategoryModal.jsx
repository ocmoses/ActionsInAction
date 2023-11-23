import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";
import useErrors from "@/hooks/useErrors";
import usePartners from "@/hooks/usePartners";
import {useEffect, useState, useContext} from "react";
import CancelIcon from "../icons/CancelIcon";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import GenericModal from "./GenericModal.jsx";



/**
 * 
 * @param hide The function called to hide the modal
 * @param action The action called after successfully uploading the form
 * @param rejectionReason Incase this quesionnaire was previously rejected, this reason will show.
 * @returns 
 */
export default function ContractCategoryModal(){

    const {
        showContractCategoryModal,
        setShowContractCategoryModal,
        setSelectServiceModal
    } = useContext(ContractContext);

  const [{ errors, setError, removeError, clearErrors }] = useErrors(null); 

  const [leftThick, setLeftThick] = useState("black");

  const [rightThick, setRightThick] = useState("black");

  const [selected, setSelected] = useState(false);
    
   
    return (showContractCategoryModal && 

        <GenericModal id="contract_signatories_modal" width={450} closeAction={() => setShowContractCategoryModal(false)}>
            <>
                <div className="flex flex-col pt-8 pb-4 relative">
                    <div className="text-white text-2xl mb-2 flex-1">Who’s your technical provider</div>
                    <p className="text-gray-400 text-md max-w-[450px]">A short description of what a technical provider/partner means goes here.</p>
                    <div className="absolute top-4 -right-4 cursor-pointer" onClick={() => setShowContractCategoryModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div> 
                </div>

                {errors && errors["error"] && (
                    <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                    </div>
                )}

                <div className="flex w-full space-x-2">
                    <div onMouseOver={() => setLeftThick("yellow")} 
                         onMouseOut={() => {if(!selected)setLeftThick("black")} }  
                         onClick={() => {setSelected(!selected); clearErrors();}}
                            className={`w-1/2 rounded-xl bg-black hover:bg-white/5 p-4 hover:border-2 ${selected ? "border-2 border-yellow-600" :''} group hover:border-yellow-600 cursor-pointer`}>
                        <div className="flex justify-between">

                            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-white/20 flex justify-center items-center">
                                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> 
                                    <path d="M22 19V22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19Z" fill="#ffffff" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> 
                                    <path d="M7 11H5V18H7V11Z" fill="#ffffff"></path> 
                                    <path d="M11 11H9V18H11V11Z" fill="#ffffff"></path> 
                                    <path d="M15 11H13V18H15V11Z" fill="#ffffff"></path> 
                                    <path d="M19 11H17V18H19V11Z" fill="#ffffff"></path> 
                                    <path d="M23 22.75H1C0.59 22.75 0.25 22.41 0.25 22C0.25 21.59 0.59 21.25 1 21.25H23C23.41 21.25 23.75 21.59 23.75 22C23.75 22.41 23.41 22.75 23 22.75Z" fill="#ffffff"></path> 
                                    <path d="M21.37 5.74984L12.37 2.14984C12.17 2.06984 11.83 2.06984 11.63 2.14984L2.63 5.74984C2.28 5.88984 2 6.29984 2 6.67984V9.99984C2 10.5498 2.45 10.9998 3 10.9998H21C21.55 10.9998 22 10.5498 22 9.99984V6.67984C22 6.29984 21.72 5.88984 21.37 5.74984ZM12 8.49984C11.17 8.49984 10.5 7.82984 10.5 6.99984C10.5 6.16984 11.17 5.49984 12 5.49984C12.83 5.49984 13.5 6.16984 13.5 6.99984C13.5 7.82984 12.83 8.49984 12 8.49984Z" fill="#ffffff"></path> 
                                    </g>
                                </svg>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={leftThick} className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>

                        </div>
                        <div className="mt-8 p-2">
                            <p className="text-white/80 text-sm">
                            Same company
                            </p>
                            <span className="text-white/40 text-sm">
                            Our in-house team handles all technical support needs.
                            </span>
                        </div>
                    </div>
                    <div title="Not yet available" 
                            className={`w-1/2 rounded-xl bg-black p-4 hover:border-2 group hover:border-yellow-600 cursor-not-allowed`}>
                        <div className="flex justify-between">

                            <div className="w-12 h-12 rounded-full bg-white/10 flex justify-center items-center">
                                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> 
                                    <path d="M22 19V22H2V19C2 18.45 2.45 18 3 18H21C21.55 18 22 18.45 22 19Z" fill="#ffffff" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> 
                                    <path d="M7 11H5V18H7V11Z" fill="#ffffff"></path> 
                                    <path d="M11 11H9V18H11V11Z" fill="#ffffff"></path> 
                                    <path d="M15 11H13V18H15V11Z" fill="#ffffff"></path> 
                                    <path d="M19 11H17V18H19V11Z" fill="#ffffff"></path> 
                                    <path d="M23 22.75H1C0.59 22.75 0.25 22.41 0.25 22C0.25 21.59 0.59 21.25 1 21.25H23C23.41 21.25 23.75 21.59 23.75 22C23.75 22.41 23.41 22.75 23 22.75Z" fill="#ffffff"></path> 
                                    <path d="M21.37 5.74984L12.37 2.14984C12.17 2.06984 11.83 2.06984 11.63 2.14984L2.63 5.74984C2.28 5.88984 2 6.29984 2 6.67984V9.99984C2 10.5498 2.45 10.9998 3 10.9998H21C21.55 10.9998 22 10.5498 22 9.99984V6.67984C22 6.29984 21.72 5.88984 21.37 5.74984ZM12 8.49984C11.17 8.49984 10.5 7.82984 10.5 6.99984C10.5 6.16984 11.17 5.49984 12 5.49984C12.83 5.49984 13.5 6.16984 13.5 6.99984C13.5 7.82984 12.83 8.49984 12 8.49984Z" fill="#ffffff"></path> 
                                    </g>
                                </svg>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={rightThick} className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>

                        </div>
                        <div className="mt-8 p-2">
                            <p className="text-white/80 text-sm">
                            Another company
                            </p>
                            <span className="text-white/40 text-sm">
                            Another company provides us with technical support.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                <button onClick={() => {if(selected){clearErrors(); setShowContractCategoryModal(false); setSelectServiceModal(true)} else {setError({error: "PLease select your contract type"})}} } className="bg-mtn hover:bg-yellow-600 rounded-full py-4 px-12 text-white font-bold">Finish</button>
                </div>
    
                
            </>
        </GenericModal>
    
    );

}