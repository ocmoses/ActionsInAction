
import {questionnaire_link} from "@/app/modules/constants";
import useQuestionnaire from "@/hooks/useQuestionnaire";
import useProcessing from "@/hooks/useProcessing";
import useErrors from "@/hooks/useErrors";
import usePartners from "@/hooks/usePartners";
import {useEffect, useState} from "react";
import ListIcon from "../icons/ListIcon";
import CancelIcon from "../icons/CancelIcon";
import FileInput from "../form/FileInput";
import Success from "@/app/components/toasts/Success";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import {previewFile} from "@/hooks/useFileViewer";

/**
 * 
 * @param hide The function called to hide the modal
 * @param action The action called after successfully uploading the form
 * @param rejectionReason Incase this quesionnaire was previously rejected, this reason will show.
 * @returns 
 */
export default function QuestionnaireModal({hide, action, rejectionReason=null}){

  // console.log("rejectionReason:", rejectionReason);
    
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({questionairre_doc: null});
  const [{ errors, setError, removeError, clearErrors }] = useErrors(data);
  const {sendQuestionnaire} = useQuestionnaire();
  const {partner} = usePartners();
  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [sendingQuestionnaire, setSendingQuestionnaire] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const successAction = () => setTimeout(() => { 
                                                  setSuccessToast(false),                                                   
                                                  action();
                                                  hide();
                                                }, 3000);

  const handleFormChange = (e) => {
    setData({...data, questionairre_doc: e.target.value});
    console.log("file", data.questionairre_doc);
  }

  const handleSubmission = async () => {

    if(!data.questionairre_doc){
      setError({error: "No file chosen"});
      return;
    }else{
      clearErrors();
    }

    if(!acceptedTerms){
        setError({error: "You must agree to the terms"});
        return; 
    }else{
        clearErrors();
    }
    
    let formData = new FormData();
    formData.append("partner_uuid", partner.uuid);
    formData.append("file", data.questionairre_doc);
    
    //normaly it will be checked
    formData.append("code_of_conduct", "YES");      

    setSendingQuestionnaire(true);
    let response = await sendQuestionnaire(formData);
    setSendingQuestionnaire(false);

    if(response.message){
      setSuccessMessage(response.message);
      setSuccessToast(true);
    }else{
      setError({error: response.error});
    }

  }

  useEffect(() => {
    clearErrors();
  }, []);
    
    return (
        <>
            <div id="questionare_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "questionare_modal") {hide()}}}>
                <div id="actualModal" className=" pb-12 relative px-10 rounded-xl shadow-xl bg-[#131313] inline-flex flex-col w-[550px]">
                    <CancelIcon action={() => hide()} />
                    <div className="flex pt-8 pb-4 justify-center w-full">
                        <ListIcon />                            
                    </div>

                    
                    <div className="w-full flex flex-col justify-center items-center">
                        
                        <p className="text-2xl mb-4 text-gray-300">MTN Supplier Qualification</p>

                        {
                            rejectionReason != null ? (

                            <div className="w-full flex flex-col p-4 bg-black rounded-lg space-y-2 border-1 border-white/20">
                                <div className="text-gray-400 text-md text-center space-x-2 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                    </svg> <p>Please correct the following issues and re-apply</p>
                                </div>
                                <p className="text-gray-300 text-sm pl-8">
                                    1.   {rejectionReason}
                                </p>
                            </div>) : (
                            <p className="text-gray-400 text-md mt-4 text-center">
                            In order to confirm your readiness to join the MTN supplier program, please download and complete the MTN supplier pre-qualification questionairre
                            </p> )
                        }

                    </div>

                    <div className="mt-16 w-full justify-center">
                        {!uploading && 
                        (<div className="flex space-x-4">
                            <div className="border-1 border-gray-500 rounded-xl p-4 flex flex-col items-center space-y-6">
                                <p className="text-gray-400">Download</p>
                                <a href={questionnaire_link} className="font-mtn text-md text-yellow-500 text-center underline">Download Supplier Questionairre</a>
                            </div>
                            <div className="border-1 border-gray-500 rounded-xl p-4 flex flex-col items-center space-y-6">
                                <p className="text-gray-400">Upload</p>
                                <span onClick={() => {setUploading(true);}} className="font-mtn text-md text-yellow-500 text-center underline cursor-pointer">Upload Supplier Questionairre</span>
                            </div>
                        </div>)
                        }
                        {uploading &&               
                        (<>
                            <div className="w-full relative">
                            <FileInput
                                id="questionnaire"
                                doc_id="questionnaire_doc"
                                label="Supplier Questionnaire"
                                value={data.questionairre_doc}
                                onChange={handleFormChange}
                                errors={errors}
                                disabled={false}
                            />
                            <span className="absolute -top-2 -right-2 p-1 bg-white/40 shadow rounded-full cursor-pointer" onClick={() => setUploading(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                            </div>
                        </>)
                        }
                        
                    </div>

                    <div className="w-full flex space-x-2">
                    
                        <input onChange={(e) => {e.target.checked ? setAcceptedTerms(true) : setAcceptedTerms(false); clearErrors();}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40 mt-4 ml-4" />
                        <p className="text-gray-400 text-sm mt-4">
                        By clicking "Submit and continue" I agree that I’ve read and understood <a href="https://dms.mtnnigeria.net/dms/PARTNER_ONBOARDING/Supplier-Code-of-Conduct-(3)_2023-10-31-04-04.pdf" target="_blank" className="text-white underline">MTN Supplier Code of Conduct.</a>. and agree to it.
                        </p>

                    </div>

                    <div className="w-full p-4 flex justify-center flex-col items-center">
                        {errors && errors["error"] && (
                            <div className="mb-6">
                            <FormErrors error={errors["error"]} />
                            </div>
                        )}
                        {
                            !uploading && (<button className="bg-black rounded-full py-4 px-12" disabled>Submit and Continue</button>)
                                            
                        }
                        {
                            uploading && !sendingQuestionnaire && 
                            <button className="bg-mtn rounded-full py-4 px-12 font-bold" onClick={() => handleSubmission()}>Submit and Continue</button>
                        }
                        {
                            uploading && sendingQuestionnaire &&
                            (
                            <div className="flex justify-center items-center">
                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div>
                            )
                        }
                        
                    </div>

                </div>
            </div>
            <Success message={successMessage} visible={successToast} action={successAction} />
        </>
     );
    
}