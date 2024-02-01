
import GenericModal from "./GenericModal.jsx";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import FileInput from "@/app/components/form/FileInput";
import usePartners from "@/hooks/usePartners";
import Success from "@/app/components/toasts/Success";
import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";


export default function IPDynamicFieldModal({dynamic, closeAction}){

    console.log("Dynamic ARRAY", dynamic);

    const {
        partner,
        dynamicFileUpload
    } = usePartners();

    const {user} = useUsers();

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const [submitting, setSubmitting] = useState(false);


    const [successMessage, setSuccessMessage] = useState("Submitted successfully");
    const [successToast, setSuccessToast] = useState(false);
    const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false)                                              
                                                }, 3000);
   

    const validateFiles = () => {

        console.log("FILES", files);

        for(const i of dynamic){
            if(!files[i[2]]){
                setError({error: `${i[0]} file was not uploaded`});
                return false;
            }
        }

        return true;

    }

    const sendUpdate = () => {

        if(!validateFiles()){
            return;
        }

        setSubmitting(true);

        setSuccessToast(true);

        setTimeout(() => {

            setSubmitting(false);

            closeAction();

            location.reload();

        }, 2000)

        
    }

    const [files, setFiles] = useState({ });

    const uploadFile = (number, file) => {   
        
        let formData = new FormData();
        formData.append("partner_uuid", partner?.uuid);
        formData.append("dynamic_field_number", number);
        formData.append("file", file);


        setSubmitting(true);

        clearErrors();

        dynamicFileUpload(formData)
            .then(resp => {
                console.log(resp.message);
                console.log(resp.message);
                setSubmitting(false);
                if(resp.error){
                    setError({[file_title]: resp.error});
                }else{
                    setFiles({...files, [number]:true});                    
                }
            })
            .catch(error => {console.log(error.response), setSubmitting(false)});    
    }

    
    
    return (<GenericModal id="ip_dynamic_modal" width={550} height={450} closeAction={() => {}}>
                <>
                    <div className="flex flex-col pt-8 pb-4 relative">
                        <div className="text-white text-2xl mb-4 flex-1">Upload documents</div>
                        <div className="text-white/40 text-xl mb-4 flex-1">Please provide the following required documents</div>
                        <div className="absolute top-4 -right-4 cursor-pointer" onClick={() => {clearErrors(); closeAction()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div> 
                    </div>

                    <div className="my-4 flex text-white flex-col h-[350px] overflow-y-scroll">
                        {
                            dynamic.map(aDynamic => (
                                <div className="flex flex-col">                                    

                                        <div className="my-2 flex flex-col space-y-1">

                                            <p className="text-white font-mtn-bold">
                                                {aDynamic[0]}
                                            </p>
                                            {
                                                aDynamic[1] == "video" ? 
                                                (<FileInput
                                                    id="authorization_video"
                                                    doc_id="authorization_video_doc"
                                                    label={`${aDynamic[0]} Video`}
                                                    value={files[aDynamic[2]]}
                                                    onChange={(e) => uploadFile(aDynamic[2], e.target.value)}
                                                    allowedtypes={["video/3gpp", "video/mpeg","video/mp4", "video/quicktime"]}
                                                    errors={errors}
                                                    maxSize={40 * 1024 * 1024}
                                                    disabled={false}
                                                    style="flex-1"
                                                />) : 
                                                <FileInput
                                                    id="dynamic_field"
                                                    doc_id={`${'dynamic_field'}_doc`}
                                                    label={aDynamic[0]}
                                                    value={files[aDynamic[2]]}
                                                    onChange={(e) => uploadFile(aDynamic[2], e.target.value)}
                                                    errors={errors}
                                                    disabled={false}
                                                    style="flex-1"
                                                />
                                            }

                                        </div>
                                    
                                </div>
                            ))
                        }
                    </div>

                    {errors && errors["error"] && (
                        <div className="mb-6">
                            <FormErrors error={errors["error"]} />
                        </div>
                    )}

                    <div className="flex py-4 px-2 space-x-4 justify-end">
                        {
                            submitting ? 
                            <div className="flex justify-center items-center">
                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div> : 
                            <>
                                <button className="ml-auto border-1 border-white/20 inline-flex  cursor-pointer text-white/80 hover:bg-white/10 p-4 py-2 rounded-full"  onClick={() => closeAction()}>Cancel</button>
                                <button className="ml-4  inline-flex text-white cursor-pointer bg-yellow-600 hover:bg-yellow-700 p-4 py-2 rounded-full"  onClick={() => {clearErrors(); sendUpdate()}}>Submit</button>
                            </>
                        }
                        
                    </div>  

                    <Success message={successMessage} visible={successToast} action={successAction} />

                </>
            </GenericModal>);

}