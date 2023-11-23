
import GenericModal from "./GenericModal.jsx";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";


export default function ChooseSignatoryModal(){

    const {
        agreementModal, 
        setAgreementModal,
        acceptingAgreement, 
        setAcceptingAgreement

    } = useContext(ContractContext);

    const {user} = useUsers();

    const [{ errors, setError, clearErrors }] = useErrors(null);
    
    const [accepted, setAccepted] = useState(false);

    const handleChange = (e) => {
        if(e.target.checked){
            setAccepted(true);
        }else{
            setAccepted(false);
        }
    }

    const proceed = () => {

        setAcceptingAgreement(true);
        
        setTimeout(() => {
            setAgreementModal(false); 
            window.location = "/dashboard/contracts/annexures";
        }, 2000);

        // router.push("/dashboard/contracts/execution");

    }    

    useEffect(() => {

    }, []);


    return (agreementModal && 
            <GenericModal id="agreement_modal" width={600} height={500} closeAction={() => setAgreementModal(false)}>
                <>
                    <div className="flex pt-8 pb-4">
                        <div className="text-white text-2xl mb-4 flex-1">Accept Terms</div>              
                    </div>

                    <div className="overflow-y-scroll h-[300px] pb-16">
                    
                        <div className="flex flex-col space-y-2 pr-2">
                            <p className="text-gray-400">
                            Companies submitting a bid to MTN should confirm compliance with Trade Control Laws (as defined below) and applicable law in the country of operation of the MTN Operating Company ("Compliance Statement"). Said companies shall be required to provide sufficient detail in their Compliance Statement for what the following is concerned <br />
                            i) current or intended use of the software, hardware or technology (including components), <br />
                            ii) use of professional services, <br />
                            iii) shareholding of the Company and <br />
                            iv) any relevant current/potential arrangements. Trade Control Laws means <br />
                            (i) any economic or financial sanctions administered by the US Office of Foreign Assets Control, the US State Department, any other agency of the US government, the United Nations, the EU or any member state thereof, or any other national economic sanctions authority, and <br />
                            (ii) those Laws pertaining to use, export, re-export and transfer controls under US, EU, national and other Laws, including the US Export Administration Regulations</p>
                            <p className="text-gray-400">
                            I hereby certify as an authorized representative of the Company (with the delegation of authority to act on behalf of the Company) that all of the information contained within our response to MTN: Is accurate, correct, complete and true to the best of our knowledge. If any of the above information is changed, I will provide MTN as soon as possible with the updated information. <br />
                            I understand and agree that MTN relies on the information provided by me, as an authorized representative acting on behalf of the Company, and the Company shall indemnify MTN for any losses related to this Due Diligence Questionnaire. <br />
                            I hereby agree this document may be shared with MTN auditors, directors and other personnel as deemed required by MTN for contract enforcement, regulatory compliance or investigations</p>
                            
                        </div>

                    </div>

                    <div className="absolute z-20 left-0 bottom-0 border-t-1 bg-white/5 border-white/20 w-full p-4">
                        {!acceptingAgreement &&
                            <div className="flex py-4 px-2 space-x-4 justify-end">                    
                                <input type="checkbox" className="w-6 h-6 rounded bg-black/20" onChange={(e) => handleChange(e)} />
                                <label className="text-white ml-1">
                                    By clicking this checkbox, I agree to the terms in this document
                                </label>
                                <button className=" text-white bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full cursor-pointer" disabled={accepted == false} onClick={() => proceed()}>Proceed</button>
                            </div>
                        }
                        {acceptingAgreement &&
                            <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div>
                        }
                    </div>      
                </>
            </GenericModal>);

}