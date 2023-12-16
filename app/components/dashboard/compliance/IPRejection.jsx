import usePartners from "@/hooks/usePartners";
import {useEffect, useState} from "react";
import RemoteEndpoints from "@/app/modules/endpoints";
import { useRouter } from "next/navigation";
import useUsers from "@/hooks/useUsers";
import IPCorrectionModal from "@/app/components/modals/IPCorrectionModal";


export default function IPRejection(){

    const router = useRouter();

    const {
        getIPStatus
    } = usePartners();

    const [showAlert, setShowAlert] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [rejected, setRejected] = useState([]);


    let rejectionArray = [];    

    const allApproved = (data) => {

        let result = true;

        // if(data["service-details"].status == "rejected"){
        //     //add
        //     if(!rejectionArray.includes("service_details")){
        //         rejectionArray.push("service_details");
        //         result = false;
        //     }
            
        // }

        if(data["aggregator-and-vas-requirements"].status == "rejected"){
            //add
            if(rejectionArray.includes("aggregator_and_vas_requirements")){
                rejectionArray.push("aggregator_and_vas_requirements");
                result = false;
            }
            
        }

        if(data["probate-of-will"].probate_of_will_status == "rejected"){
            //add 
            if(!rejectionArray.includes("probate_of_will")){
                rejectionArray.push("probate_of_will");
                result = false;
            }
            
        }

        if(data["authorization-letter"].authorization_letter_status == "rejected"){
            //add 
            if(!rejectionArray.includes("authorization_letter")){
                rejectionArray.push("authorization_letter");
                result = false;
            }
            
        }

        // if(data["licensing-period"].license_period_status == "rejected"){
        //     //add 
        //     if(!rejectionArray.includes("licensing_period")){
        //         rejectionArray.push("licensing_period");
        //         result = false;
        //     }
            
        // }

        if(data["video-file"].authorization_video_status == "rejected"){
            //add 
            if(!rejectionArray.includes("video_file")){
                rejectionArray.push("video_file");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-content-and-vas-partner"].agreement_letter_content_and_vas_partner_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_content_and_vas_partner")){
                rejectionArray.push("agreement_letter_btw_content_and_vas_partner");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-content-and-agent"].agreement_letter_content_and_agent_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_content_and_agent")){
                rejectionArray.push("agreement_letter_btw_content_and_agent");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-agent-and-vas-partner"].agreement_letter_agent_and_vas_partner_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_agent_and_vas_partner")){
                rejectionArray.push("agreement_letter_btw_agent_and_vas_partner");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-content-and-record-label"].agreement_letter_content_and_record_label_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_content_and_record_label")){
                rejectionArray.push("agreement_letter_btw_content_and_record_label");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-content-and-music-composer"].agreement_letter_content_and_music_composer_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_content_and_music_composer")){
                rejectionArray.push("agreement_letter_btw_content_and_music_composer");
                result = false;
            }
            
        }

        if(data["agreement-letter-btw-record-label-and-vas-partner"].agreement_letter_record_label_and_vas_partner_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agreement_letter_btw_record_label_and_vas_partner")){
                rejectionArray.push("agreement_letter_btw_record_label_and_vas_partner");
                result = false;
            }
            
        }

        if(data["means-of-identification"].means_of_id_status == "rejected"){
            //add 
            if(!rejectionArray.includes("content_creator_id_front")){
                rejectionArray.push("content_creator_id_front");
                result = false;
            }
            
        }

        if(data["means-of-agent-identification"].means_of_agent_id_status == "rejected"){
            //add 
            if(!rejectionArray.includes("agent_id_front")){
                rejectionArray.push("agent_id_front");
                result = false;
            }
        }

        if(data["other-content-proof-of-ownership"].other_content_proof_of_ownership_status == "rejected"){
            //add 
            if(!rejectionArray.push(["other_content_proof_of_ownership", "Additional Proof"])){
                rejectionArray.push("other_content_proof_of_ownership");
                result = false;
            }
            
        }
        return result;

    }

    useEffect(() => {
        getIPStatus()
            .then(resp => {

                if(resp.error){
                    console.log("ERROR", {error: resp.error});
                }else{

                    console.log("Rejection ARRAY", rejectionArray)

                    if(!allApproved(resp.data)){
                        setRejected(rejectionArray);
                        setShowAlert(true);
                    }

                    console.log("Rejection Array", rejectionArray);

                    // setContractId(resp.statuses.contract_id);

                    // process(resp.statuses);

                }

            });
    }, []);

    const {user} = useUsers();

    return ( showAlert && user.role == "superAdmin" && 
        <>
            <div className="min-h-[100px] bg-[#111111] border border-white/10 rounded-xl mt-16">
                <div className="p-[24px] ">
                    <div className="flex flex-row gap-3">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    d="M15 27.5C8.1125 27.5 2.5 21.8875 2.5 15C2.5 8.1125 8.1125 2.5 15 2.5C21.8875 2.5 27.5 8.1125 27.5 15C27.5 21.8875 21.8875 27.5 15 27.5ZM14.0625 20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V13.75C15.9375 13.2375 15.5125 12.8125 15 12.8125C14.4875 12.8125 14.0625 13.2375 14.0625 13.75V20ZM16.15 9.525C16.0875 9.3625 16 9.2375 15.8875 9.1125C15.7625 9 15.625 8.9125 15.475 8.85C15.325 8.7875 15.1625 8.75 15 8.75C14.8375 8.75 14.675 8.7875 14.525 8.85C14.375 8.9125 14.2375 9 14.1125 9.1125C14 9.2375 13.9125 9.3625 13.85 9.525C13.7875 9.675 13.75 9.8375 13.75 10C13.75 10.1625 13.7875 10.325 13.85 10.475C13.9125 10.625 14 10.7625 14.1125 10.8875C14.2375 11 14.375 11.0875 14.525 11.15C14.825 11.275 15.175 11.275 15.475 11.15C15.625 11.0875 15.7625 11 15.8875 10.8875C16 10.7625 16.0875 10.625 16.15 10.475C16.2125 10.325 16.25 10.1625 16.25 10C16.25 9.8375 16.2125 9.675 16.15 9.525Z"
                                    fill="#E44A34"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="text-gray-500 ">                            
                                <p>
                                    <span className="text-white">
                                    One or more of your Intellectual Properties submissions was rejected
                                    </span>
                                    <br />
                                    <span className="text-white/60">
                                    To resolve this issues, click below
                                    </span>                               
                                </p>
                                
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="h-[40px] w-[150px] text-white border border-white/10 rounded-[20px] float-left hover:border-white/30 hover:bg-white/10"
                                >
                                    Resolve now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal && 
                <IPCorrectionModal rejected={rejected} closeAction={() => setShowModal(false)} />
            }
           
        </>
       
    );
}