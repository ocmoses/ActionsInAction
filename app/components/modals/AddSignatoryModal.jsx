
import GenericModal from "./GenericModal.jsx";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";
import { role_types } from "@/app/modules/constants";
import TextInput from "../form/TextInput.jsx";


export default function AddSignatoryModal(){

    const {
        data,
        setData,
        resetData,

        partner,
        createPartner,
        partnerRoles,
        signatories,
        setSignatories,
        addSignatoryModal,
        setAddSignatoryModal,
        contractSignatriesModal,
        setContractSignatriesModal,

        newSignatoryRole,
    } = useContext(ContractContext);

    const {user} = useUsers();

    console.log("partnerRoles", partnerRoles);

    const confirmMessage = {
        director: "By clicking this checkbox I agree that the user I've entered is a director of the Company and is authorized to sign this contract on behalf of the company",
        delegate: "By clicking this checkbox I agree that the user I've entered is a delegate of the Company and is authorized to sign this contract on behalf of the company",
        witness: "By clicking this checkbox I agree that the user I've entered is a witness of the Company and is authorized to sign this contract on behalf of the company"
    };

    const [disableActiveButton, setDisableActiveButton] = useState(true);
    const [creatingPartner, setCreatingPartner] = useState(false);
    
    const [uploadedFile, setUploadedFile] = useState(false);
    const [reset, setReset] = useState(Date.now());

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const handleCreate = () => {
        console.log('data in handleCreate', data);
        console.log('allRoles', partnerRoles);
        if(data.firstname.trim() == ""){
            setError({error: "Please enter user's first name"});
            return;
        }
        if(data.lastname === undefined || data.lastname.trim() == ""){
          setError({error: "Please enter user's last name"});
          return;
        }
        
        if(data.email.trim() == ""){
          setError({error: "Please enter user email"});
          return;
        }

        if(data.phone.trim() == ""){
            setError({error: "Please enter user phone number"});
            return;
          }
    
        //delegates require board resolution documents
        if(data.role == partnerRoles.find((role) => role.role_name == role_types.DELEGATE).uuid && !uploadedFile){
            setError({error: "Please select a file"});
            return;
        }
    
        create_partner(data);
    }

    
    const create_partner = async (data) => {

        // console.log('create_data', data);
    
        let formData = new FormData();
    
        // console.log("Object.keys(data)", Object.keys(data));
    
        Object.keys(data).forEach(element => {
          formData.append(element, data[element]);
        });
    
        if (creatingPartner) return;
        setCreatingPartner(true);
        let create_partner_response = await createPartner(formData);
    
        if (create_partner_response.error) setError({ error: create_partner_response.error })
        else {
            console.log('create_partner_response', create_partner_response);
            
            if(data.role == partnerRoles.find(role => role.role_name == role_types.DIRECTOR).uuid){
              setSignatories({...signatories, director: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }else if(data.role == partnerRoles.find(role => role.role_name == role_types.DELEGATE).uuid){
              setSignatories({...signatories, delegate: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }else if(data.role == partnerRoles.find(role => role.role_name == role_types.WITNESS).uuid){
              setSignatories({...signatories, witness: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
            }
            
        }
    
        resetData();
    
        setCreatingPartner(false);
        setAddSignatoryModal(false);
        setContractSignatriesModal(true);
        setDisableActiveButton(true);
        // setNavigation(all_AdminRoles.navigation);
    }  
    
    useEffect(() => {

    }, [partnerRoles, newSignatoryRole, data]);


    return (addSignatoryModal && 
            <GenericModal id="contract_signatories_modal" width={500} height={550} closeAction={() => setAddSignatoryModal(false)}>
                <>
                    <div className="flex pt-8 pb-4">
                        <div className="text-white text-2xl mb-4 flex-1">Add a {newSignatoryRole}</div>
                        {newSignatoryRole == role_types.DIRECTOR && 
                            <div className="cursor-pointer" onClick={() => {
                                    setSignatories({...signatories, director: {firstname: user.first_name, lastname: user.last_name, email: user.email}}); 
                                    setAddSignatoryModal(false); 
                                    setContractSignatriesModal(true);
                                }
                              }>
                                <p className="text-yellow-500 text-xs underline">I'm a director</p>
                            </div> 
                        }
                        
                    </div>

                    {errors && errors["error"] && (
                        <div className="mb-6">
                            <FormErrors error={errors["error"]} />
                        </div>
                    )}
        
                    <TextInput
                        id="name"
                        label="Full name"
                        // value={data.role_name}
                        onChange={
                            (e) => { 
                                try{
                                    clearErrors();
                                    let [firstname, lastname] = e.target.value.trim().split(" ");
                                    setData({...data, firstname, lastname })
                                }catch(ex){
                                    setError({error: "Please enter user's first and last names"})
                                } 
                            }
                        }
                        onBlur={
                            (e) => { 
                                try{
                                    clearErrors();
                                    let [firstname, lastname] = e.target.value.trim().split(" ");
                                    setData({...data, firstname, lastname })
                                }catch(ex){
                                    setError({error: "Please enter user's first and last names"})
                                } 
                            }
                        }
                        errors={errors}
                    />

                    <TextInput
                        id="email"
                        label="Email"
                        // value={data.role_name}
                        onChange={
                            (e) => {
                                clearErrors();
                                setData({...data, email: e.target.value.trim()});
                            }
                        }
                        onBlur={
                            (e) => {
                                clearErrors();
                                setData({...data, email: e.target.value.trim()});
                            }
                        }
                        errors={errors}
                    />

                    <TextInput
                        id="phone"
                        label="Phone"
                        // value={data.phone}
                        onChange={
                            (e) => {
                                clearErrors();
                                setData({...data, phone: e.target.value.trim()});
                            }
                        }
                        onBlur={
                            (e) => {
                                clearErrors();
                                setData({...data, phone: e.target.value.trim()});
                            }
                        }
                        errors={errors}
                    />

                    { newSignatoryRole == role_types.DELEGATE &&
                        <div className="mb-4 rounded-lg bg-white/20 flex p-2">              

                            <div className="rounded-lg bg-black border-1 border-dashed border-gray-200 flex p-4 w-full space-x-4 items-center">

                                <div className="w-16 h-16 bg-white/20 flex items-center justify-center rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                </svg>

                                </div>

                                <div className="flex flex-col flex-1 space-y-1 justify-center">                
                                <p className="text-gray-500 text-sm">Upload</p>
                                <p className="text-white text-md">Company board resolution</p>
                                <p className="text-gray-500 text-sm">Drag and drop here or</p>
                                </div>

                                <div className="flex flex-col justify-end space-between items-end space-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                </svg>
                                {uploadedFile ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => {setReset(Date.now()); setUploadedFile(false); }}>
                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                        :
                                <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#resolution_document").click()}>Choose file</button>}
                                <input type="file" className="opacity-0 w-1 h-1" id="resolution_document" accept=".pdf" onChange={(e) => {setData({...data, file: e.target.files[0]}); setUploadedFile(true); console.log("data", data)}}/>                   
                                </div>

                            </div>          
                        
                        </div>
                    }
                    

                    <div className="flex m-4">
                        <div className="w-12 flex justify-end mr-4">
                            <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
                        </div>
                        <div>
                            <p className="text-gray-500">{confirmMessage[newSignatoryRole]}</p>
                        </div>
                    </div>

                    <div className="">
                    {!creatingPartner && partnerRoles?.length > 0 &&
                        <div className="flex py-4 px-2 space-x-4 justify-end">
                        <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  
                            onClick={() => {setAddSignatoryModal(false); setContractSignatriesModal(true);}}>Back</button>
                        <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" 
                            disabled={disableActiveButton} 
                            onClick={() => {handleCreate(partnerRoles.find(role => role.role_name == newSignatoryRole).uuid);}}>Add</button>
                        </div>
                    }
                    {(creatingPartner || partnerRoles?.length == 0) &&
                        <div className="flex px-4">
                        <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }
                    </div>       
                </>
            </GenericModal>);

}