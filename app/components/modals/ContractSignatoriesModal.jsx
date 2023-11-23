
import GenericModal from "./GenericModal.jsx";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";
import { role_types } from "@/app/modules/constants.js";


export default function ContractSignatoriesModal(){

    const {
        data, 
        setData,
        resetData,        
        setNewSignatoryRole,
        selectNewSignatoryRole,

        partner,
        createPartner,
        partnerRoles,
        signatories,
        setSignatories,
        submitSignatories,
        contractSignatriesModal,
        setContractSignatriesModal,
        addSignatoryModal,
        setAddSignatoryModal,
        chooseSignatoryModal, 
        setChooseSignatoryModal,

        submitingContractSignatories,
        setSubmitingContractSignatories,
        submitingContractSignatures,
        setSubmitingContractSignatures,
        allowSubmitSignatories, 
        setAllowSubmitSignatories
    } = useContext(ContractContext);

    const [disableActiveButton, setDisableActiveButton] = useState(true);
    const [creatingPartner, setCreatingPartner] = useState(true);

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const create_partner = async (data) => {

        // console.log('create_data', data);
    
        let formData = new FormData();
    
        // console.log("Object.keys(data)", Object.keys(data));
    
        Object.keys(data).forEach(element => {
          formData.append(element, data[element]);
        });
    
        if (creatingPartner) return;
        setCreatingPartner(true);
        create_partner_response = await createPartner(formData);
    
        if (create_partner_response.error) setError({ error: create_partner_response.error })
        else {
            console.log('create_partner_response', create_partner_response);
            
            if(data.role == partnerRoles.find(role => role.role_name == 'director').uuid){
              setSignatories({...signatories, director: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }else if(data.role == partnerRoles.find(role => role.role_name == 'delegate').uuid){
              setSignatories({...signatories, delegate: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }else if(data.role == partnerRoles.find(role => role.role_name == 'witness').uuid){
              setSignatories({...signatories, witness: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }
            
        }
    
        setData({partner_uuid: partner.uuid, phone: '000000000', firstname: "", lastname: "", email: "", role: ""});
    
        setCreatingPartner(false);
        setAddDirectorModal(false);
        setAddDelegateModal(false);
        setAddWitnessModal(false);
        setContractSignatriesModal(true);
        setDisableActiveButton(true);
        // setNavigation(all_AdminRoles.navigation);
    }   
    
    const showAddSignatoryModal = (role) => {
        resetData();
        setNewSignatoryRole(role);
        setContractSignatriesModal(false); 
        selectNewSignatoryRole(role); 
        setAddSignatoryModal(true);
    }

    useEffect(() => {
        
    }, [partnerRoles]);

    return (contractSignatriesModal && 
            <GenericModal id="contract_signatories_modal" width={550} height={800} closeAction={() => setContractSignatriesModal(false)}>
                <>
                    <div className="flex pt-8 pb-4">
                        <div className="text-white text-2xl mb-4 flex-1">Add contract signatries</div>
                        <div className="cursor-pointer" onClick={() => setContractSignatriesModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div> 
                    </div>

                    {errors && errors["error"] && (
                    <div className="mb-6">
                    <FormErrors error={errors["error"]} />
                    </div>
                    )}

                    <div className="m-4 rounded-lg bg-white/20 flex flex-col p-4">

                        {/* Add Director */}
                        <div className="flex my-4">

                            <div className="w-12">
                                <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                                    {signatories.director &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    }
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center " >
                                <p className="text-white text-md mb-2">A company director</p>
                                {
                                    !signatories.director ?
                                    (<div className="flex flex-col group"  onClick={() => {setNewSignatoryRole(role_types.DIRECTOR); setContractSignatriesModal(false); setChooseSignatoryModal(true);}}>
                                
                                        <span className="text-gray-300 text-xs cursor-pointer group-hover:hidden" 
                                            onClick={() => {setNewSignatoryRole(role_types.DIRECTOR); setContractSignatriesModal(false); setChooseSignatoryModal(true);}}>
                                        A company director as stated in the company incorporation documents
                                        </span>
                                        <span className="text-yellow-500 text-xs hidden group-hover:block w-[200px] border-1 border-yellow-500 py-1 px-4 rounded-full cursor-pointer">
                                        Choose existing director
                                        </span>
                                    </div>):
                                    <span className="flex text-gray-300 text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>&nbsp;{`${signatories.director?.firstname} ${signatories.director?.lastname}`}
                                    </span>
                                }
                                                
                            </div>
                            
                            <div className="w-16 flex justify-center items-center">
                            {
                                !signatories.director ? 
                                (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" 
                                    onClick={() => {
                                        showAddSignatoryModal(role_types.DIRECTOR);
                                    }
                                    }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>):
                                <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                            }                            
                            </div>

                        </div>

                        <hr className="h-px bg-gray-500 border-0" />

                        {/* Add Delegate */}
                        <div className="flex my-4">

                            <div className="w-12">
                                <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                                    {signatories.delegate && 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg> 
                                    }
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                            <p className="text-white text-md mb-2">A company delegate</p>
                            {!signatories.delegate ?
                                (<span className="text-gray-300 text-xs cursor-pointer" 
                                        onClick={() => {setContractSignatriesModal(false); showAddSignatoryModal(role_types.DELEGATE);}}>
                                    A person nominated by the company to sign. Requires a board resolution document
                                </span>):
                                (<span className="flex text-gray-300 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>&nbsp;{`${signatories.delegate?.firstname} ${signatories.delegate?.lastname}`}
                                </span>) 
                            }
                        </div>
                        <div className="w-16 flex justify-center items-center">
                            {
                                !signatories.delegate ? 
                                (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" onClick={() => {setContractSignatriesModal(false); showAddSignatoryModal(role_types.DELEGATE)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>):
                                <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                            }     
                        </div>

                    </div>              

                    </div>

                    {/* Add Witness */}
                    <div className="m-4 rounded-lg bg-white/20 flex flex-col p-4">

                        <div className="flex my-4">

                            <div className="w-12">
                                <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                                    {signatories.witness && 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    }
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-white text-md mb-2">Add a witness</p>
                                {!signatories.witness ?
                                    (<span className="text-gray-300 text-xs cursor-pointer">
                                    A person who will sign as a witness to this contract
                                    </span>):
                                    (<span className="flex text-gray-300 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>&nbsp;{`${signatories.witness?.firstname} ${signatories.witness?.lastname}`}
                                    </span>)
                                }
                            </div>
                            <div className="w-16 flex justify-center items-center">
                                {
                                    !signatories.witness ? 
                                    (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" onClick={() => {setContractSignatriesModal(false); showAddSignatoryModal(role_types.WITNESS)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>):
                                    <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                                }                  
                            </div>

                        </div>
                    </div>

                    <div className="flex m-4">
                        <div className="w-12 flex justify-end mr-4">
                            <input onChange={(e) => e.target.checked ? setAllowSubmitSignatories(true) : setAllowSubmitSignatories(false)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
                        </div>
                        <div>
                            <p className="text-gray-500">By selecting this checkbox, I confirm that the entered user holds the position of director at my company and possesses the authoriized signatory rights to execute this contract on behalf of the company</p>
                        </div>
                    </div>

                    <div className="">
                        {!submitingContractSignatories &&
                            <div className="flex py-4 px-2 space-x-4 justify-end">
                            <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setContractSignatriesModal(false); }}>Back</button>
                            <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={!allowSubmitSignatories} onClick={() => {submitSignatories()}}>Submit</button>
                            </div>
                        }
                        {submitingContractSignatories &&
                            <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div>
                        }
                    </div>              
                </>
            </GenericModal>);

}