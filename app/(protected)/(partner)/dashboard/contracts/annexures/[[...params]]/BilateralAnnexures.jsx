"use client"

import {useState, useRef, useEffect, useCallback} from "react";
import TextInput from "@/app/components/form/TextInput";
import useErrors from "@/hooks/useErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import usePartners from "@/hooks/usePartners";
import useUsers from "@/hooks/useUsers";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import Success from "@/app/components/toasts/Success";
import { capitalizeFirst } from "@/app/modules/utilities";
import useProcessing from "@/hooks/useProcessing";
import AnnexureH from "../AnnexureH";

export default function BilateralAnnexures({params}){
    
    const contract_id = params.params[0];

    const {
        partner,
        submitAnnexureResponses,
        getContractDynamicData        
    } = usePartners();

    const {
        user,
        refreshSession
     } = useUsers();

    const { processing, setProcessing } = useProcessing(); 
    const [{ errors, setError, clearErrors }] = useErrors(null);
    const router = useRouter();
    const [successDisplay, setSuccessDisplay] = useState(false);  
    const [signatoryRole, setSignatoryRole] = useState("");  
    const [fixed, setFixed] = useState(false);  
    const [focused, setFocused] = useState("annexureA"); 
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState({partner_uuid: partner?.uuid, contract_id: contract_id, 

                                        annexure_c: "", 
                                        annexure_e_four: "", annexure_e_five_a: "",
                                        annexure_e_five_b: "", annexure_e_five_c: "", 
                                        annexure_e_five_d: "", annexure_e_five_e: "", 
                                        annexure_e_five_f: "", annexure_e_five_g: "",
                                        annexure_e_five_h: "", annexure_e_five_i: "",
                                        annexure_e_six_a: "", annexure_e_six_b: "",
                                        annexure_e_six_c: "", annexure_e_six_d: "",
                                        annexure_h: "", annexure_h_ii: "" , annexure_h_iii: "" ,
                                        annexure_h_iv: "",  annexure_h_v: "", annexure_h_vi: "" ,
                                        annexure_h_vii: "", annexure_h_viii: "", annexure_h_ix: "",
                                        annexure_h_x: "", annexure_h_xi: "", annexure_h_xii: "",
                                        annexure_h_xiii: "", annexure_h_xiv: "", annexure_h_xv: "",
                                        annexure_h_xvi: "", annexure_h_xvii: "", annexure_h_xviii: "",
                                        annexure_h_xix: "", annexure_h_xx: "", annexure_h_xxi: "",
                                        annexure_h_xxii: "", annexure_h_xxiii: ""                                
                                    });

    const handleOnChange = (e, field) => {
        clearErrors();
        setData({...data, [field]: e.target.value});
    };

    const [dynamicData, setDynamicData] = useState(null);
    const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

    useEffect(() => {
        get_dynamic_content(contract_id).then(resp => {
            console.log("Dynamic shortcodes", dynamicData?.dynamic_details?.shortcodes[0]?.shortcodes);
        });
    }, []);


    useEffect(() => {
        
        let threshold = 80;

        const focus = function(){

            let scrollY = window.scrollY;

            if(scrollY >= threshold){
                setFixed(true);
            }else{
                setFixed(false);
            }

            let annexureAOffset = document.querySelector("#annexure-a").offsetTop;
            let annexureBOffset = document.querySelector("#annexure-b").offsetTop;
            let annexureCOffset = document.querySelector("#annexure-c").offsetTop;
            let annexureDOffset = document.querySelector("#annexure-d").offsetTop;
            let annexureEOffset = document.querySelector("#annexure-e").offsetTop;
            let annexureFOffset = document.querySelector("#annexure-f").offsetTop;
            let annexureGOffset = document.querySelector("#annexure-g").offsetTop;
            let annexureHOffset = document.querySelector("#annexure-h").offsetTop;

            let pageOffset = window.pageYOffset;

            // console.log("Offset annexure-a", document.querySelector("#annexure-a").offsetTop);
            // console.log("Offset annexure-b", document.querySelector("#annexure-b").offsetTop);
            // console.log("Page Offset", window.pageYOffset);

            if(pageOffset >= 0 && pageOffset < annexureBOffset){
                setFocused("annexureA");
            }else if(pageOffset >= annexureBOffset && pageOffset < annexureCOffset){
                setFocused("annexureB");
            }else if(pageOffset >= annexureCOffset && pageOffset < annexureDOffset){
                setFocused("annexureC");
            }else if(pageOffset >= annexureDOffset && pageOffset < annexureEOffset){
                setFocused("annexureD");
            }else if(pageOffset >= annexureEOffset && pageOffset < annexureFOffset){
                setFocused("annexureE");
            }else if(pageOffset >= annexureFOffset && pageOffset < annexureGOffset){
                setFocused("annexureF");
            }else if(pageOffset >= annexureGOffset && pageOffset < annexureHOffset){
                setFocused("annexureG");
            }else if(pageOffset >= annexureHOffset){
                setFocused("annexureH");
            }
            
        };

        window.addEventListener("scroll", focus);
        window.onload = focus;
      
    }, []);

    useEffect(() => {
        const href = location.href;
        if(href.includes("#")){
            let urlArray = href.split("#");

            if(urlArray.length == 2){
                const id = urlArray[1];

                const elem = document.querySelector("#" + id);

                elem.scrollIntoView();
            }
        }

    }, []);

    

    const submitResponses = async () => {

        if(user.role == 'witness'){
            router.push(`/dashboard/contracts/execution/${contract_id}`);
            return;
        }
        if(!validateResponses()){
            return;
        }

        clearErrors();

        setSubmitting(true);

        const response = await submitAnnexureResponses(data);

        if(response.error){
            setError({error: response.error});
        }else{
            setSuccessDisplay(true);
            router.push(`/dashboard/contracts/execution/${contract_id}`);
        }

        setSubmitting(false);
    }

    const validateResponses = () => {

        for(let i in data){
            if(!data[i] || data[i].trim() == ""){
                setError({error: i.split("_").join(" ") + " has no response"});
                return false;
            }
        }

        return true;
    }

    const get_dynamic_content = async (contract_id) => {
        if (gettingDynamicContent) return;
        setGettingDynamicContent(true);
        let dynamic_content_response = await getContractDynamicData(contract_id);
        setGettingDynamicContent(false);
        console.log('dynamic_content_response', dynamic_content_response);
        if (dynamic_content_response.error) {
            setError({ error: dynamic_content_response.error })
        } else {
            // console.log('dynamic_content_response', dynamic_content_response);
            setDynamicData(dynamic_content_response.data);
            
            setData({...data, 
                        annexure_c: dynamicData?.dynamic_details?.annexures?.annexure_c ?? "", 
                        annexure_e_four: dynamicData?.dynamic_details?.annexures?.annexure_e_four ?? "", 
                        annexure_e_five_a: dynamicData?.dynamic_details?.annexures?.annexure_e_five_a ?? "",
                        annexure_e_five_b: dynamicData?.dynamic_details?.annexures?.annexure_e_five_b ?? "", 
                        annexure_e_five_c: dynamicData?.dynamic_details?.annexures?.annexure_e_five_c ?? "", 
                        annexure_e_five_d: dynamicData?.dynamic_details?.annexures?.annexure_e_five_d ?? "", 
                        annexure_e_five_e: dynamicData?.dynamic_details?.annexures?.annexure_e_five_e ?? "", 
                        annexure_e_five_f: dynamicData?.dynamic_details?.annexures?.annexure_e_five_f ?? "", 
                        annexure_e_five_g: dynamicData?.dynamic_details?.annexures?.annexure_e_five_g ?? "",
                        annexure_e_five_h: dynamicData?.dynamic_details?.annexures?.annexure_e_five_h ?? "", 
                        annexure_e_five_i: dynamicData?.dynamic_details?.annexures?.annexure_e_five_i ?? "",
                        annexure_e_six_a: dynamicData?.dynamic_details?.annexures?.annexure_e_six_a ?? "", 
                        annexure_e_six_b: dynamicData?.dynamic_details?.annexures?.annexure_e_six_b ?? "",
                        annexure_e_six_c: dynamicData?.dynamic_details?.annexures?.annexure_e_six_c ?? "", 
                        annexure_e_six_d: dynamicData?.dynamic_details?.annexures?.annexure_e_six_d ?? "",
                        annexure_h: dynamicData?.dynamic_details?.annexures?.annexure_h ?? "", 
                        annexure_h_ii: dynamicData?.dynamic_details?.annexures?.annexure_h_ii ?? "" , 
                        annexure_h_iii: dynamicData?.dynamic_details?.annexures?.annexure_h_iii ?? "" ,
                        annexure_h_iv: dynamicData?.dynamic_details?.annexures?.annexure_h_iv ?? "",  
                        annexure_h_v: dynamicData?.dynamic_details?.annexures?.annexure_h_v ?? "", 
                        annexure_h_vi: dynamicData?.dynamic_details?.annexures?.annexure_h_vi ?? "" ,
                        annexure_h_vii: dynamicData?.dynamic_details?.annexures?.annexure_h_vii ?? "",                     
                        annexure_h_viii: dynamicData?.dynamic_details?.annexures?.annexure_h_viii ?? "", 
                        annexure_h_ix: dynamicData?.dynamic_details?.annexures?.annexure_h_ix ?? "",
                        annexure_h_x: dynamicData?.dynamic_details?.annexures?.annexure_h_x ?? "", 
                        annexure_h_xi: dynamicData?.dynamic_details?.annexures?.annexure_h_xi ?? "", 
                        annexure_h_xii: dynamicData?.dynamic_details?.annexures?.annexure_h_xii ?? "",
                        annexure_h_xiii: dynamicData?.dynamic_details?.annexures?.annexure_h_xiii ?? "", 
                        annexure_h_xiv: dynamicData?.dynamic_details?.annexures?.annexure_h_xiv ?? "", 
                        annexure_h_xv: dynamicData?.dynamic_details?.annexures?.annexure_h_xv ?? "",
                        annexure_h_xvi: dynamicData?.dynamic_details?.annexures?.annexure_h_xvi ?? "", 
                        annexure_h_xvii: dynamicData?.dynamic_details?.annexures?.annexure_h_xvii ?? "", 
                        annexure_h_xviii: dynamicData?.dynamic_details?.annexures?.annexure_h_xviii ?? "",
                        annexure_h_xix: dynamicData?.dynamic_details?.annexures?.annexure_h_xix ?? "", 
                        annexure_h_xx: dynamicData?.dynamic_details?.annexures?.annexure_h_xx ?? "", 
                        annexure_h_xxi: dynamicData?.dynamic_details?.annexures?.annexure_h_xxi ?? "",
                        annexure_h_xxii: dynamicData?.dynamic_details?.annexures?.annexure_h_xxii ?? "", 
                        annexure_h_xxiii: dynamicData?.dynamic_details?.annexures?.annexure_h_xxiii ?? ""
                });
        }
    }
    

    return <>
                <div className="flex flex-col justify-center items-center pt-8 space-y-4 relative">

                    {/* Floating side nav */}
                    <div className={`${fixed ? "fixed top-0 left-[60px]" : "absolute top-0 left-0"} z-10  flex-col space-y-2 p-2 hidden md:flex bg-black rounded-md`}>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-a`)}>
                            <span className={`flex w-6 h-6 text-white ${focused == "annexureA" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>1</span>
                            <span className={`${focused == "annexureA" ? "text-white" : "text-white/40"} text-white`}>Annexure A</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-b`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureB" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>2</span>
                            <span className={`${focused == "annexureB" ? "text-white" : "text-white/40"} text-white`}>Annexure B</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-c`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureC" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>3</span>
                            <span className={`${focused == "annexureC" ? "text-white" : "text-white/40"} text-white`}>Annexure C</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-d`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureD" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>4</span>
                            <span className={`${focused == "annexureD" ? "text-white" : "text-white/40"} text-white`}>Annexure D</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-e`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureE" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>5</span>
                            <span className={`${focused == "annexureE" ? "text-white" : "text-white/40"} text-white`}>Annexure E</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-f`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureF" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>6</span>
                            <span className={`${focused == "annexureF" ? "text-white" : "text-white/40"} text-white`}>Annexure F</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-g`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureG" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>7</span>
                            <span className={`${focused == "annexureG" ? "text-white" : "text-white/40"} text-white`}>Annexure G</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push(`/dashboard/contracts/annexures/${contract_id}#annexure-h`)}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureH" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>8</span>
                            <span className={`${focused == "annexureH" ? "text-white" : "text-white/40"} text-white`}>Annexure H</span>
                        </div>

                        {
                            document?.referer?.includes("/contracts/execution") && 
                            <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/execution/" + contract_id)}>
                                <span className={`flex w-6 h-6 text-white bg-white/20 rounded-full justify-center items-center`}>9</span>
                                <span className="text-white/60 text-white">Main Contract</span>
                            </div>
                        }

                        

                    </div>
                    
                    {/* Annexure A */}
                    <div id="annexure-a" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE A</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-4">Revenue Share Model</h4>

                        {/* Table here */}
                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/3 border-r border-white/40 p-2">Service</span>
                                    <span className="text-white w-1/3 border-r border-white/40 p-2">Revenue share to service provider</span>
                                    <span className="text-white w-1/3 p-2">Revenue share to MTN</span>
                                </div>
                                <div className="flex border border-white/20">
                                    
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">{dynamicData?.dynamic_details?.service_types[0]}</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">{dynamicData?.dynamic_details?.revenue_share?.content_provider_share}</span>
                                    <span className="text-white/60 w-1/3 p-2">{dynamicData?.dynamic_details?.revenue_share?.mtn_share}</span>
                                </div>
                                {/* <div className="flex border border-white/20">
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">Gold Standard VAS services</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">40%</span>
                                    <span className="text-white/60 w-1/3 p-2">60%</span>
                                </div> */}
                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.1</span>
                            <span className="text-white/60 flex-1">The Revenue sharing model only applies to premium rated content and services for rates as approved by the NCC. The Revenue share model shall be applied to monthly logs.</span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.2</span>
                            <span className="text-white/60 flex-1">
                            MTN shall on or before the tenth (10 th ) day of each subsequent month prepare and forward via email to the Service Provider an SMS Logs, in relation to the Services for each preceding month.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.3</span>
                            <span className="text-white/60 flex-1">
                            In the absence of any dispute on the logs, the Service Provider shall within three (3) Business Days from receipt of MTN’s generated logs, review and revert with an invoice to MTN based on MTN’s logs which shall be processed for payment.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.4</span>
                            <span className="text-white/60 flex-1">
                            MTN shall effect payment (in Naira) within thirty (30) days of receipt of Service Provider’s undisputed invoice for the SMS generated in each month in accordance with the agreed Revenue share.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.5</span>
                            <span className="text-white/60 flex-1">
                            Service provider shall revert to MTN on any dispute on logs forwarded within five (5) Business Days after receipt of logs from MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">A.6</span>
                            <div className="text-white/60 flex flex-col space-y-1 flex-1">
                                The Parties hereby agree that:<br />
                            
                                <div className="flex space-x-2">
                                    <span>i. </span>
                                    <span>
                                        The Service Provider shall be entitled to raise its invoice based on billed SMS Logs generated by MTN.
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <span>ii. </span>
                                    <span>
                                        In the event of a discrepancy between the SMS Logs generated and forwarded to the Service Provider by MTN and the Service Provider’s internally generated record of SMS Logs particularly where both SMS Logs were generated during the Service usage by MTN Subscribers and the discrepancy extends beyond the Acceptable Percentage, the Parties shall jointly reconcile the SMS Logs and shall amicably resolve any differences.
                                    </span>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <span>iii. </span>
                                    <span>
                                        Pending the resolution of any disagreement on the number of SMS Logs generated, MTN shall effect payment and the Service Provider shall be entitled to receive payment on the basis of the SMS Logs generated by MTN. 
                                    </span>
                                </div>
                            
                            </div>
                                    
                        </div>
                        

                        
                    </div>

                    {/* Annexure B */}
                    <div  id="annexure-b" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE B</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-2">Active Short Codes</h4>

                        <p className="text-lg text-center text-white/60 w-full mb-4">For the duration of this Agreement, the following Short codes shall be active and running on the MTN Network.</p>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/3 border-r border-white/40 p-2">S/N</span>
                                    <span className="text-white w-1/3 border-r border-white/40 p-2">Short Codes</span>
                                    <span className="text-white w-1/3 border-r border-white/40 p-2">Purpose/Services (Usage)</span>
                                    <span className="text-white w-1/3 p-2">Bearer (SMS/IVR/USSD)</span>
                                </div>
                                {
                                    dynamicData?.dynamic_details?.shortcodes[0]?.shortcodes?.map((shortcode, index) => 

                                        (
                                            <div className="flex border border-white/20">
                                                <span className="text-white/60 w-1/3 border-r border-white/40 p-2">{index + 1}</span>
                                                <span className="text-white/60 w-1/3 border-r border-white/40 p-2">{shortcode}</span>
                                                <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                                <span className="text-white/60 w-1/3 p-2">SMS</span>
                                            </div>
                                        )
                                    ) 
                                }                                                                
                            </div>
                        </div>
                        
                    </div>

                    {/* Annexure C */}
                    <div id="annexure-c" className="relative border-2 mb-8 border-white/20 bg-white/10 p-8 pb-16 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE C</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-4">Confidentiality and Non Disclosure Agreement</h4>

                        <div className="text-white/60">

                            <span className="text-white">THIS AGREEMENT</span> is made on this {dynamicData?.dynamic_details?.date_of_contract}.<br/><br/>

                            BETWEEN<br/><br/>

                            <span className="text-white">MTN NIGERIA COMMUNICATIONS PLC</span>, a public limited liability company incorporated under the laws of the Federal Republic of Nigeria, having its principal office at MTN Plaza, Falomo Roundabout, Ikoyi, Lagos (hereinafter referred to as “MTN” or “Disclosing Party”, which expression shall where the context so admits include its successors-in-title and assigns), of the one part;<br/><br/>

                            <span className="text-white">AND</span><br /><br />

                            <span className="text-white">{dynamicData?.dynamic_details?.company_name}</span>, a private limited liability company incorporated under the laws of the Federal<br /><br />
                            Republic of Nigeria, having its principal place of business at {dynamicData?.dynamic_details?.company_address} (hereinafter referred to as the “Receiving Party”, which expression shall where the context so admits include its successors- in-title and assigns) of the other part.<br /><br />

                            Both <span className="text-white">MTN</span> and the <span className="text-white">Receiving Party</span> are hereinafter jointly referred to as the “Parties” and individually as the “Party”.<br /><br />

                        </div>

                        <span className="text-white">Wheare as</span><br />

                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.1</span>
                            <span className="text-white/60  flex-1">
                            The Disclosing Party has entered into an Agreement with the Receiving Party for provision of value-added services to the Disclosing Party’s subscribers.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.2</span>
                            <span className="text-white/60 flex-1">
                            The Disclosing Party and the Receiving Party acknowledge that in the course of carrying out the Services stated in 1.1 above, the Receiving Party shall be exposed to and Disclosing Party shall disclose to the Receiving Party certain information of a sensitive and confidential nature
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.3</span>
                            <span className="text-white/60  flex-1">
                            The Parties wish to record the terms and conditions upon which the Disclosing Party shall disclose Confidential Information to the Receiving Party, which terms and conditions shall constitute a binding and enforceable agreement between the Parties and their agents.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.4</span>
                            <span className="text-white/60  flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.5</span>
                            <span className="text-white/60 flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>
                        <br />

                        <p className="text-white">NOW THEREFORE WITNESS that in consideration of the above-mentioned disclosure, Disclosing Party and Receiving Party agree as follows:</p><br />
                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2</span>
                            <span className="text-white flex-1">
                            The Confidential Information
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.1</span>
                            <span className="text-white/60 flex-1">
                            “Confidential Information” shall, for the purpose of this Agreement include, without limitation, any technical, scientific, commercial or financial information, know-how, trade secrets, processes, machinery, designs, drawings, technical specifications, and data in whatever form disclosed to or assessed by either Party during the course of his relationship with the other Party.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.2</span>
                            <span className="text-white/60  flex-1">
                            The Disclosing Party is listed on the Nigerian Stock Exchange. Any information disclosed under this agreement, in relation to the Disclosing Party, any of the Disclosing Party’s affiliates and/or any entities in which the Disclosing Party has an interest, constitutes inside information (as envisaged in the Investment and Securities Act, 2007, as amended or replaced from time to time (“ISA”), and the Receiving Party will treat and procure the treatment of the information disclosed to it pursuant to this Agreement as inside information as envisaged in the ISA and will not use such inside information in breach of the ISA. For the purposes of this Agreement an “affiliate” of a Party shall mean its direct and indirect subsidiaries, its direct and indirect holding companies and all direct and indirect subsidiaries of such holding companies. Each Party shall procure that its affiliates comply with the terms of this Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.3</span>
                            <span className="text-white/60 flex-1">
                            The Receiving Party shall treat the information stated in clause 2.1 above and any other information of a nature similar to the information contained in clause 2.1 above to which the Receiving Party may become exposed by reason of the arrangement between the Receiving Party and the Disclosing Party as confidential (“Confidential Information”)
                            </span>
                                
                        </div>

                        <div className="absolute bottom-0 left-0 mt-8 w-full flex space-x-2 bg-black/40 py-4 px-8">
                            {user.role != "witness" &&
                                <>
                                    <span className="text-white w-[50px]">
                                        <input onChange={(e) => e.target.checked ? setData({...data, annexure_c: "yes"}) : setData({...data, annexure_c: ""})} 
                                                type="checkbox" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" />
                                    </span>
                                    <span className="text-white/60 flex-1">
                                        By clicking this checkbox, I agree to MTN’s  <span className="text-white">Electronic Record and Signature Disclosure</span>
                                    </span>   
                                </>
                            }
                                                                 
                        </div>

                        
                    </div>

                    {/* Annexure D */}
                    <div id="annexure-d" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE D</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-4">Protective Clauses</h4>

                        <p className="text-white/60 w-full mb-4 text-sm">In addition to the provisions herein on the obligations of the Service Provider, the Service Provider shall ensure the insertion of the following in its agreement with the Content owner</p>
                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1</span>
                            <span className="text-white  flex-1">
                            Exemption Clause
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">a</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider does not own the requisite Platform for the use or distribution of its content.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">b</span>
                            <span className="text-white/60  flex-1">
                            The permission granted to the Service Provider includes the permission for the Service Provider to load its content on the Platform of MTN for publication to MTN’s subscribers
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">c</span>
                            <span className="text-white/60  flex-1">
                            The loading of the content herein licensed is done by the Service Provider or its agents.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">d</span>
                            <span className="text-white/60 flex-1">
                            MTN is not liable or responsible for any content uploaded on any platform by the Service Provider or any of its agents for publication by the MTN.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">e</span>
                            <span className="text-white/60 flex-1">
                            MTN is not liable or responsible for the unauthorized use of any content uploaded on its Platform by the Service Provider for publication.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">f</span>
                            <span className="text-white/60 flex-1">
                            The Content Owner shall hold the Service Provider liable for any content that is so loaded on the Platform for publication by MTN where although the use of the content is authorized, the use has however exceeded the authorization granted by the Content owner.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">g</span>
                            <span className="text-white/60 flex-1">
                            The Content Owner will promptly notify MTN in writing of any unauthorized loading or use of its content and will be satisfied with MTN where MTN immediately removes such content from its Platform
                            </span>
                                
                        </div>
                        <br />

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2</span>
                            <span className="text-white  flex-1">
                            Warranty and Indemnity
                            </span>
                                    
                        </div>

                        <p className="text-white/60 w-full mb-4 text-sm">The Content Owner:</p>
                        

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">a</span>
                            <span className="text-white/60 flex-1">
                            warrants that it is the owner of copyright in the content and that it has the authority to grant the rights herein granted; and
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">b</span>
                            <span className="text-white/60  flex-1">
                            hereby indemnifies and holds harmless the Service Provider and MTN against all actions and claims.
                            </span>
                                    
                        </div>
                        
                    </div>

                    {/* Annexure E */}
                    <div id="annexure-e" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE E</h2>

                        <p className="text-lg text-center text-white/60 w-full mb-4">Information, Data and Cyber security Annex</p>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1</span>
                            <span className="text-white  flex-1">
                            Scope</span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.1</span>
                            <span className="text-white/60 flex-1">
                            This Annex is applicable to all products, services, inclusive of managed services and/or software delivered to MTN by contractors, consultants, or any other service providers (the Service Provider). The Service Provider shall ensure the equipment, products, services and/or software are assessed against the requirements in this Annex prior to the delivery of the same to MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.2</span>
                            <span className="text-white/60  flex-1">
                            Information Security Compliance frameworks and/or best practices as well as Information Security controls will apply within the context and scope of supplies, products, services, and/or software per the agreement.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.4</span>
                            <span className="text-white/60  flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2</span>
                            <span className="text-white flex-1">
                            COMPLIANCE AND MTN’S RIGHT TO AUDIT
                            </span>
                                
                        </div>

                       <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.1</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider is, at no additional cost to MTN, required to provide MTN on an annual basis with an industry standard certification, attestation such as SSAE-16 or an equivalent. Where the Service Provider is unable to provide the above, MTN reserves the right to select auditors to perform a full system and process audit including information security in accordance with the audit provisions contained in the Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.2</span>
                            <span className="text-white/60 flex-1">
                            In the event that MTN reserves the right to audit as per above clause, any critical or high risks identified during the audit, the Service Provider will at its own cost be required to provide MTN with a remediation plan to address the risks in the form of a report within a mutually agreed time frame.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.3</span>
                            <span className="text-white/60  flex-1">
                            The Service Provider will be required to at their own cost, perform a re-assessment of the remedial actions taken, and provide the results in the form of a report to MTN within a mutually agreed time frame.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.4</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider will be required to provide a roadmap for rectification of non-compliance within a mutually agreed time frame in the event that the Service Provider is unable to fully comply with the requirements of this Annex upon commencement of the contract. This does not impair on MTN’s right to enforce non-compliance clauses.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3</span>
                            <span className="text-white flex-1">
                            AUDIT RIGHTS
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="text-white/60 flex-1 flex space-x-2">
                                <span className="w-[50px]">a) </span>
                                <span className="flex-1">
                                The Service Provider acknowledges and agrees that MTN may, from time to time, allow and appoint statutory auditors, internal auditors, consultants or MTN personnel to conduct technical audits of the equipment, products, software and/or the services and/or performance of this Agreement (and/or any of the Purchase Order(s)) by the Service Provider, which audits shall extend to a review of tool architecture, configurations, reconciliations, filters, alarms, security, and other similar system audit requirements and compliance to information security requirements.
                                </span>  
                            </div>                              
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="text-white/60 flex-1 flex space-x-2">
                                <span className="w-[50px]">b) </span>
                                <span className="flex-1">
                                The Service Provider shall accept that MTN has the right to audit the Service Provider’s contractual responsibilities or to have such audits carried out by a third party provided that such third party is not a competitor of the Service Provider. The Service Provider shall, also with regard to the Service Provider’s practices and procedures relating to the delivery, quality, data handling and information security (if applicable) and confidentiality aspects of this Agreement as well as access to information systems and facilities, accept that MTN has the right to audit contractual responsibilities.
                                 </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="text-white/60 flex-1 flex space-x-2">
                                <span className="w-[50px]">c) </span>
                                <span className="flex-1">
                                    The Service Provider agrees to correct any deficiencies found during such audit or inspection. The performance of such audits shall not relieve Service Provider of its obligations under this Agreement. If contractual deficiencies are not satisfactorily resolved, MTN reserves the right to apply such contractual remedies including but not limited to the application of liquidated damages, service level credits and consequences for breach as provided in this Agreement.
                                </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="text-white/60 flex-1 flex space-x-2">
                                <span className="w-[50px]">d) </span>
                                <span className="flex-1">
                                    MTN shall ensure that internal auditors, consultants and MTN personnel that are allowed access to any Confidential Information of the Service Provider are bound by confidentiality obligations no less onerous than those contained in this Agreement.
                                </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">4</span>
                            <span className="text-white flex-1">
                            INTEGRATION TO MTN’S OPERATIONS SECURITY SYSTEMS
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <p className="text-lg text-white/60 w-full mb-4">As a guide this clause applies to all software, products and services provided by the Service Provider where MTN requires access to perform business operations:
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-4/5 border-r border-white/40 p-2">Clause requirements</span>
                                    <span className="text-white w-1/5 border-r border-white/40 p-2">Applicable?</span>                                
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/60 w-4/5 border-r border-white/40 p-2">
                                    The Service Provider is required to integrate their relevant software, applications, equipment and products into the MTN security infrastructure as per applicable best industry practice at no additional cost. This includes identity management, authentication, authorization, compliance assessment and log monitoring integration points.
                                    </span>
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                        {
                                            dynamicData?.dynamic_details?.annexures?.annexure_e_four || user.role == "witness" ? 
                                            dynamicData?.dynamic_details?.annexures?.annexure_e_four : 
                                            (<>
                                                <label><input onChange={(e) => handleOnChange(e, "annexure_e_four")} name="annexure_e_four" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                                <label><input onChange={(e) => handleOnChange(e, "annexure_e_four")} name="annexure_e_four" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>
                                            </>)
                                        }
                                                                                                         
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5</span>
                            <span className="text-white flex-1">
                            PRIVACY
                            </span>
                                
                        </div>

                        <div className="mt-4 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <p className="text-lg text-white/60 w-full mb-4">
                            Further to the provisions of this Annex and in particular, the confidentiality or data subject protection clauses within this Agreement:    
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-4/5 border-r border-white/40 p-2">Clause requirements</span>
                                    <span className="text-white w-1/5 border-r border-white/40 p-2">Applicable?</span>                                
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        The Service Provider is required to integrate their relevant software, applications, equipment and products into the MTN security infrastructure as per applicable best industry practice at no additional cost. This includes identity management, authentication, authorization, compliance assessment and log monitoring integration points.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        {
                                            
                                                dynamicData?.dynamic_details?.annexures?.annexure_e_five_a || user.role == "witness" ? 
                                                dynamicData?.dynamic_details?.annexures?.annexure_e_five_a : 
                                                (<>
                                                    <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_a")} name="annexure_e_five_a" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                                    <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_a")} name="annexure_e_five_a" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
                                                </>)
                                        }
                                                               
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.1</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        Informing and gaining consent from end users on the terms of sharing of information and storing this consent for future reference, unless legally prohibited;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_b || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_b : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_b")} name="annexure_e_five_b" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_b")} name="annexure_e_five_b" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>        
                                        </>)
                                    }                       
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.2</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        Only sharing information where users have provided explicit content;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        {
                                            dynamicData?.dynamic_details?.annexures?.annexure_e_five_c || user.role == "witness" ? 
                                            dynamicData?.dynamic_details?.annexures?.annexure_e_five_c : 
                                            (<>
                                                <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_c")} name="annexure_e_five_c" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                                <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_c")} name="annexure_e_five_c" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>          
                                            </>)
                                        }
                                          
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.3</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        Using secure transport protocols on information exchange;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_d || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_d : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_d")} name="annexure_e_five_d" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_d")} name="annexure_e_five_d" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                            
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.4</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        Limiting staff and subcontractor access on need to know and monitoring transgressions;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_e || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_e : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_e")} name="annexure_e_five_e" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_e")} name="annexure_e_five_e" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                                
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.5</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        On-going monitoring of staff and subcontractor access and access rights;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_f || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_f : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_f")} name="annexure_e_five_f" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_f")} name="annexure_e_five_f" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                            
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.6</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        Abiding by in-country data retention, sovereignty and privacy laws where information flows occur;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_g || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_g : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_g")} name="annexure_e_five_g" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_g")} name="annexure_e_five_g" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                              
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white w-[50px] ml-2 mt-2">5.1.7</span>                            
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        The transfer of data cross – border is prohibited, unless where (a) the Service Provider provides MTN with a written confirmation of no in-country law violation and (b) MTN agrees per a written consent/agreement.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_h || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_h : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_h")} name="annexure_e_five_h" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_h")} name="annexure_e_five_h" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                              
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        The Service Provider shall comply to the applicable AU or EU or In- Country legislation where these contradict above principles.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_i || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_five_i : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_i")} name="annexure_e_five_i" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_i")} name="annexure_e_five_i" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                               
                                        </>)
                                    }
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6</span>
                            <span className="text-white flex-1">
                            APPLICANT INDICATOR FRAMEWORK AND COMPLIANCE
                            </span>
                                
                        </div>

                        <div className="mt-4 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <p className="text-lg text-white/60 w-full mb-4">
                            The Service Provider is required to meet the following compliance targets, as per applicability of the scope of products, software or services that are provided to MTN by the Service Provider:
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/4 border-r border-white/40 p-2">Services</span>
                                    <span className="text-white w-1/4 border-r border-white/40 p-2">Targeted framework/best practice compliance</span>      
                                    <span className="text-white w-1/4 border-r border-white/40 p-2">Guidelines for Roadmap as per clause 2.3</span> 
                                    <span className="text-white w-1/4 border-r border-white/40 p-2">Applicable to Service Provider</span>                           
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white w-[50px] ml-2 mt-2">6.1.1</span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        All Software/ Services/ Products
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white w-[30px] ml-2 mt-2">i</span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        Relevant ISO27001 controls (100%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/60 p-2 flex-1">
                                        80% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_a || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_a : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_a")} name="annexure_e_six_a" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_a")} name="annexure_e_six_a" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        NIST Cyber security framework controls (100%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/60 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_b || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_b : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_b")} name="annexure_e_six_b" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_b")} name="annexure_e_six_b" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                        
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        A) No NVD listed CVSS temporal 9 and above vulnerabilities on all in-scope system components <br />B) No NVD listed CVSS temporal 8 and above vulnerabilities
                                        </span>                            
                                    </div>

                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/60 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_c || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_c : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_c")} name="annexure_e_six_c" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_c")} name="annexure_e_six_c" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
                                        </>)
                                    }
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/60 p-2 flex-1">
                                        Available NIST800-70/CIS benchmarks for system components forming part of the agreement scope (90%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/60 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/60 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    {
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_d || user.role == "witness" ? 
                                        dynamicData?.dynamic_details?.annexures?.annexure_e_six_d : 
                                        (<>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_d")} name="annexure_e_six_d" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                            <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_d")} name="annexure_e_six_d" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
                                        </>)
                                    }
                                    </div>
                                </div>

                            </div>
                        </div>


                        
                    </div>

                    {/* Annexure F */}
                    <div  id="annexure-f" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE F</h2>

                        <h4 className="text-lg text-center text-white/80 w-full mb-2">Schedule of Infractions and Sanctions</h4>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">Infractions to be avoided by the Service Provider</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">Sanctions (All sanctions are applicable)</span>                                
                                </div>
                                <div className="flex border border-white/20">
                                    <div className="text-white/60 w-1/2 border-r border-white/40 p-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Failure to implement deactivation i.e. prevent subsequent charging, directives.</li>
                                            <li className="text-white/60">Use of unapproved notification messages on live services</li>
                                            <li className="text-white/60">Launching of a content service without official approval from VAS Products.</li>
                                            <li className="text-white/60">Delivery of inappropriate content (including but not limited to messages of a sexual, religion-intolerant, culture or race-intolerant or politically insidious nature).</li>
                                            <li className="text-white/60">Service Provider’s services fail the post-launch test (opt-in, opt-out, help function, unapproved notification) for two consecutive months.</li>
                                            <li className="text-white/60">The Service Provider cannot be contacted by MTN through the address or telephone number provided for the maintenance or repair of the Network which was affected by the said Service Provider.</li>
                                            <li className="text-white/60">Delivery of repeated or inaccurate content to MTN Subscribers subscribed to a service.</li>
                                            <li className="text-white/60">Failure to deliver VAS subscribed to and paid for by MTN Subscribers on the service.</li>
                                            <li className="text-white/60">Any other service compliance issues except unauthorized billing of  MTN Subscribers and failure to comply with a blacklist directive.</li>
                                            <li className="text-white/60">Inadequate resolution of requested changes within the defined period of the written warning.</li>
                                            <li className="text-white/60">Alteration of service menu, keyword (opt-in/out), notifications, service flow without requisite approval from the VAS team</li>
                                            <li className="text-white/60">Service provider fails to adhere to agreed SLAs to resolve issues</li>                                        
                                        </ul>
                                    </div>
                                    <div className="text-white w-1/2 border-r border-white/40 p-2 flex space-x-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Service Provider will be issued with an official warning letter.</li>
                                            <li className="text-white/60">Offending shortcode(s) will be immediately suspended from the Network for a period not less than two weeks, and not more than 4 weeks.</li>                                            
                                            <li className="text-white/60">Service Provider will not be permitted to provide any new services for 3 months.</li>                                            
                                            <li className="text-white/60">Infraction(s) and sanctions will be communicated to all internal and external partners.</li>                                            
                                            <li className="text-white/60">Service Provider will be reported to the NCC for further action.</li>                                          
                                        </ul>                                                            
                                    </div>
                                </div>
                                <div className="flex border border-white/20">
                                    <div className="text-white/60 w-1/2 border-r border-white/40 p-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">The Service Provider appears in the weekly top 10 complaint calls to the Call Center more than two times a month.</li>
                                            <li className="text-white/60">Validated cases of false activation on live services across all content bearers.</li>
                                            <li className="text-white/60">Failure to adhere to the 180-day rule for the permanent deactivation of third-party services on recycled MTN Subscribers MSISDNs.</li>
                                            <li className="text-white/60">The Service Provider does anything which affects the quality of, or overloads or disrupts the Network.</li>
                                            <li className="text-white/60">Service provider fails to send appropriate notifications on advise of charge (pre and post) or renewal (pre expiry, success, failed, suspend etc.)</li>
                                        </ul>
                                    </div>
                                    <div className="text-white w-1/2 border-r border-white/40 p-2 flex space-x-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Offending service and shortcode(s) will be permanently decommissioned from the Network.</li>
                                            <li className="text-white/60">Cost of MTN Subscribers refund of all improperly charged sums will be borne by the Service Provider.</li>
                                            <li className="text-white/60">Service Provider will not be permitted to provide any new services for 6 months.</li>
                                            <li className="text-white/60">All revenues generated on the billing shortcode(s) associated with the infraction will be forfeited as a fine.</li>
                                            <li className="text-white/60">Infraction(s) and sanctions will be communicated to all internal and external partners.</li>
                                            <li className="text-white/60">Service Provider will be reported to the NCC for further action.</li>
                                        </ul>                                                            
                                    </div>
                                </div>
                                <div className="flex border border-white/20">
                                    <div className="text-white/60 w-1/2 border-r border-white/40 p-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">The Service Provider uses the VAS illegally or for an illegal purpose or MTN Nigeria suspects that the VAS is/are being used illegally or for an illegal purpose.</li>
                                            <li className="text-white/60">The Service Provider commits a breach and/or act of non-compliance which is not capable of being remedied; or a breach and/or non-compliance which is of such a nature that MTN Nigeria is of the view that its relationship with the Service Provider has irretrievably broken down.</li>
                                            <li className="text-white/60">The Service Provider provides as part of its VAS, content or services that are declared under any law in force in Nigeria to be illegal or offensive to the public.</li>
                                            <li className="text-white/60">The Service Provider fails to provide a bona fide service in accordance with the stipulations of the Code of Conduct, or does anything which may prejudice the commercial interests of MTN Nigeria.</li>
                                            <li className="text-white/60">The Service Provider breaches a provision of this Agreement or fails to comply with any provision of the Act, Licence, Code of Conduct, or any other law.</li>                                            
                                        </ul>
                                    </div>
                                    <div className="text-white w-1/2 border-r border-white/40 p-2 flex space-x-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Service Provider will be suspended from the Network for 6 months.</li>
                                            <li className="text-white/60">Cost of MTN Subscribers refund of any improperly charged sums will be borne by the Service Provider.</li>
                                            <li className="text-white/60">All revenues generated by the Service Provider in the month the infraction was committed will be forfeited as a fine.</li>
                                            <li className="text-white/60">Infraction(s) and sanctions will be communicated to all internal and external partners.</li>
                                            <li className="text-white/60">Service Provider will be reported to the NCC for further action.</li>
                                            <li className="text-white/60">The VAS team will reserve the right to terminate the agreement of the indicted Service Provider.</li>                                            
                                        </ul>                                                            
                                    </div>
                                </div>
                                <div className="flex border border-white/20">
                                    <div className="text-white/60 w-1/2 border-r border-white/40 p-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Delivery of message(s) to MTN Subscribers on the ‘Do Not Disturb’ database.</li>
                                            <li className="text-white/60">Broadcast of messages (IVR, USSD, SMS, OTA) between 8pm - 8am in contravention of NCC regulations and directives.</li>
                                            <li className="text-white/60">Campaign messages not in the appropriate format with advise of charge, validity period, clear product information</li>
                                            <li className="text-white/60">Failure to apply triple opt in for web activations</li>
                                            <li className="text-white/60">Failure to apply DOI on applicable broadcast channels in accordance to MTN guidelines</li>
                                            <li className="text-white/60">Failure to get the requisite approval before campaigning via OTA</li>                                                 
                                        </ul>
                                    </div>
                                    <div className="text-white w-1/2 border-r border-white/40 p-2 flex space-x-2">
                                        <ul className="flex flex-col space-y-4 list-disc ml-4">
                                            <li className="text-white/60">Regulatory sanctions will be wholly borne by the offending Service Provider.</li>    
                                            <li className="text-white/60">N5million per unique MSISDN infraction.</li>
                                            <li className="text-white/60">N500,000 for each day the contravention exists.</li>
                                            <li className="text-white/60">Offending shortcode will be decommissioned from the Network.</li>
                                            <li className="text-white/60">Service Provider will be reported to the NCC for further action.</li>
                                        </ul>                                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Annexure G */}
                    <div  id="annexure-g" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE G</h2>

                        <h4 className="text-lg text-center text-white/80 w-full mb-2">MTN Business Continuity Management Policy</h4>

                        <p className="text-white/60 w-full mb-4 text-sm">Throughout the term of the Service Provider’s subsisting Agreement with MTN, the Service Provider shall in accordance with Good Industry Practice (including ISO 22301, ISO 22313, ISO 27031, and ISO 24762) and at no additional cost, comply with all policies forming part of MTN’s policies relating to business continuity and disaster recovery as set out in the subsequent clauses:</p>
                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider shall maintain, in accordance with Good Industry Practice and at no additional cost, documented business continuity and disaster recovery plans and shall ensure that it is able to execute and comply with such plans (including the periodic testing of such plans) at all times in accordance with its documented terms.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider shall consult with MTN in developing the business continuity and disaster recovery plans within 6-8months to ensure the recovery and continuance of the services in accordance with this Policy. The execution of the Service Provider’s business continuity and disaster recovery plans will be at no additional cost to MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider’s business continuity and disaster recovery plans shall provide a recovery solution which is sufficient to maintain the Services in accordance with the Service Provider’s subsisting Agreement with MTN, and effectively protect the Services from the consequences of an operational disruption.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">4</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider’s business continuity and disaster recovery plans must fully integrate with MTN’s own business continuity and disaster recovery arrangements where applicable.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider shall ensure that its Service Provider/Sub-contractors needed to deliver the Services in accordance with this Policy have appropriate business continuity and disaster recovery plans in place.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6</span>
                            <span className="text-white/60 flex-1">
                            The Service Provider shall undertake a test of their business continuity and disaster recovery plans no less than once per annum and submit a written test report (summarising the results of the tests) to MTN for approval. The Service Provider shall inform MTN when such tests are scheduled (providing at least one month’s notice).
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">7</span>
                            <span className="text-white/60  flex-1">
                            Subject to the clause above (i.e. clause 7), MTN may require the Service Provider to conduct additional tests of the business continuity and disaster recovery plans where MTN considers it necessary, including where there has been any change to the Services or any underlying business processes, or on the occurrence of any event which may increase the likelihood of the need to implement the business continuity or disaster recovery plans.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8</span>
                            <span className="text-white/60 flex-1">
                            If MTN requires additional tests of the business continuity or disaster recovery plans, MTN shall give the Service Provider reasonable written notice and the Service Provider shall conduct the test in accordance with MTN requirements and the relevant provisions of the business continuity and disaster recovery plans. The Service Provider’s costs of the additional test shall be borne by MTN unless the business continuity or disaster recovery plan fails the additional test, in which case the Service Provider’s cost of that failed test shall be borne by the Service Provider.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">9</span>
                            <span className="text-white/60  flex-1">
                            MTN reserves the right to attend any business continuity or disaster recovery test undertaken by the Service Provider and to invite the Service Provider to any relevant tests held by MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">10</span>
                            <span className="text-white/60  flex-1">
                            Where a planned downtime to manage an operational disruption is required, temporary workaround must be implemented and the Service Provider will inform MTN in advance and agree the date and time of the downtime. 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">11</span>
                            <span className="text-white/60  flex-1">
                            After any disruption to the Services in accordance with this Policy, and once normal Service has been resumed, the Service Provider shall promptly complete a root cause analysis report and provide it to MTN. The report shall include as a minimum the cause of the disruption, details of how the disruption was resolved and follow-up actions the Service Provider will implement to further mitigate impact of the disruption
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">12</span>
                            <span className="text-white/60  flex-1">
                            At any time during the term of the Service Provider’s subsisting Agreement with MTN, MTN may request from the Service Provider, and Service Provider shall provide to MTN, copies of the business continuity plan maintained in accordance with this Policy and such other information reasonably required by MTN to enable it to assess the Service Provider’s compliance with this Policy.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13</span>
                            <span className="text-white/60 flex-1">
                            MTN reserves the right to audit the Service Provider’s business continuity arrangements, but will accept audits that cover the Services, carried out by an independent certified ISO 22301 Lead Auditor, provided that the scope of the audit covers the Services in accordance with this Policy.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14</span>
                            <span className="text-white/60  flex-1">
                            At any time during the term of the Service Provider’s subsisting Agreement with MTN, the Service Provider shall comply with MTN’s reasonable requests for modifications to the Service Provider’s business continuity and disaster recovery plans and implement any actions or measures MTN considers necessary.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">15</span>
                            <span className="text-white/60  flex-1">
                            The Service Provider shall promptly (and in any case within three (3) months from date of notification) implement any actions or remedial measures which the Service Provider or MTN considers to be necessary as a result of audits, tests, business interruptions, emerging risks or change to the Services in accordance with this Policy.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">16</span>
                            <span className="text-white/60  flex-1">
                            The Service Provider shall, on an annual basis and at its cost, carry out an assessment of the Service Provider’s compliance with the provisions of this Policy within an agreed period of time. Following completion of such assessment, Service Provider shall produce a report detailing the results of this assessment, and provide such report to MTN with proposals for any remedial action to deal with any deficiencies in the Service Provider’s compliance with the said provisions (at Service Provider’s cost) as identified in the report, and timescales for completion of such remedial action.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">17</span>
                            <span className="text-white/60  flex-1">
                            Non-compliance to the requirements of the Policy entitles MTN to claim damages, to terminate or suspend the Service Provider’s subsisting Agreement with MTN in whole or partially, and/or request service credits in accordance with the subsisting Agreement between the parties.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">18</span>
                            <span className="text-white/60  flex-1">
                            The Service Provider shall indemnify MTN for all losses incurred or suffered by MTN as a result of a breach of this Policy in accordance with indemnity provisions of subsisting Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">19</span>
                            <span className="text-white/60  flex-1">
                            For the avoidance of doubt, the Service Provider’s obligations under this Policy are in addition to its obligations under the Service Provider’s subsisting Agreement with MTN.
                            </span>
                                
                        </div>
                        
                    </div>

                    {/* Annexure H */}
                    <div  id="annexure-h" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE H</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-2">Data Processing Schedule</h4>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1</span>
                            <span className="text-white  flex-1">
                            INTRODUCTION
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.1</span>
                            <span className="text-white/60  flex-1">
                            The Parties agree that in relation to the Personal Data Processed under the Agreement, MTN is the Controller, and the Supplier is the Processor. In giving effect to the obligations of the Agreement, the Processor shall Process Personal Data for or on behalf of the Controller.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">1.2</span>
                            <span className="text-white/60  flex-1">
                            To the extent the Processor may be required to Process Personal Data for or on behalf of the Controller under the Agreement, the Processor will do so in accordance with the terms and conditions set out in this Schedule and in accordance with Applicable Data Protection Law(s), as applicable. 
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2</span>
                            <span className="text-white  flex-1">
                            DESCRIPTION OF THE TRANSFER
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.1</span>
                            <span className="text-white/60  flex-1">
                            The details of the transfer(s), and in particular the categories of Personal Data transferred and the purpose(s) for which the Personal Data is transferred is described in Annexure A to this Schedule
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">2.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall Process the Personal Data only for the specific purpose(s) of the Processing, as set out in Annexure A to this Schedule, unless it receives further instructions from the Controller in writing
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3</span>
                            <span className="text-white  flex-1">
                            CONTROLLER INSTRUCTIONS
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall Process Personal Data only on the written instructions of the Controller. The Controller may provide the Processor with such instructions at any time throughout the duration of the Processing of Personal Data
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall immediately inform the Controller if it is unable to follow those instructions.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">3.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall immediately inform the Controller, if in the Processor’s reasonable opinion, the instructions given by the Controller infringe on any Applicable Data Protection Law(s).
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">4</span>
                            <span className="text-white  flex-1">
                            ACCURACY OF PERSONAL DATA
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">4.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall inform the Controller without delay if the Processor becomes aware that the Personal Data received or being Processed is inaccurate, misleading or has become outdated. In this case, the Processor shall co-operate with the Controller to destroy, delete or rectify the Personal Data, as instructed by the Controller
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">4.2</span>
                            <span className="text-white/60  flex-1">
                            Whilst the Controller has used its best endeavours to ensure the accuracy of the Personal Data being transferred to the Processor in terms of this Schedule, the Controller does not warrant the accuracy of such Personal Data and the Processor shall not have any right of recourse against the Controller as result of any inaccuracy of the Personal Data. 
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5</span>
                            <span className="text-white  flex-1">
                            SECURITY OF PROCESSING
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor and, during transmission, also the Controller, shall implement appropriate Technical and Organisational Security Measures to ensure the security of Personal Data, including protecting the Personal Data against a Personal Data Breach. In assessing the appropriate level of security, the Processor must consider the leading security technology and measures, the costs of implementation, the nature, scope, context and purposes of Processing and the risks involved in Processing for Data Subjects;
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5.2</span>
                            <span className="text-white/60  flex-1">
                            Without detracting from the Processor’s obligations in terms of clause 5.1, the Processor shall at minimum implement the Technical and Organisational Security Measures and/or specific restrictions set out in Annexure B to this Schedule as it pertains to Personal Data.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall carry out regular assessments to ensure that Technical and Organisational Security Measures implemented continue to provide an appropriate level of security and hereby undertakes to implement any additional Technical and Organisational Security Measures reasonably necessary in response to any risks and/or deficiencies identified in respect of its existing measures.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">5.4</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall ensure that:
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">5.4.1</span>
                                <span className="text-white/60  flex-1">
                                its employees are only granted access to Personal Data to the extent strictly necessary for the implementation, management and monitoring of the Agreement;
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">5.4.2</span>
                                <span className="text-white/60  flex-1">
                                all such employees are informed of the confidential nature of the Personal Data and are aware of the Processor’s obligations under this Schedule; and 
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">5.4.3</span>
                                <span className="text-white/60  flex-1">
                                all such employees are bound by confidentiality obligations and use restrictions in respect of the Personal Data
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6</span>
                            <span className="text-white  flex-1">
                            SECURITY OF PROCESSING
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall promptly and adequately deal with enquiries from the Controller that relate to the Processing under this Schedule
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor must be able to demonstrate compliance with the terms of this Schedule and shall make available to the Controller all information necessary to evidence such compliance
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall, at the request of the Controller, allow for and contribute to audits of the Processing activities governed by this Schedule, at reasonable intervals or if there are indications of non-compliance. In deciding on performing a review or an audit, the Controller may consider relevant certifications held by the Processor and/or reports received from the Processor
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">6.4</span>
                            <span className="text-white/60  flex-1">
                            The Controller may elect whether the audit shall be carried out by itself or by an independent auditor selected by the Controller provided that such independent auditor is bound by a duty of confidentiality to the Controller and Processor
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">7</span>
                            <span className="text-white  flex-1">
                            INTERNATIONAL TRANSFER
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">7.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall only transfer Personal Data outside Nigeria (“International Transfer”) on the prior written instructions of the Controller. 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">7.2</span>
                            <span className="text-white/60  flex-1">
                            In addition, the Personal Data may only be Internationally Transferred if the Processor has entered into a written agreement with the recipient of the Personal Data, which imposes, in substance, the same obligations on the third party as are imposed on the Processor under this Schedule
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8</span>
                            <span className="text-white  flex-1">
                            USE OF SUB PROCESSOR
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall not sub-contract any of its Processing activities performed for or on behalf of the Controller under the Agreement to a Sub-Processor without the prior specific written authorisation of the Controller. The Processor shall submit the request for specific authorisation at least [15] working days prior to the engagement of the Sub-Processor, together with the information necessary to enable the Controller to decide on the authorisation
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8.2</span>
                            <span className="text-white/60  flex-1">
                            Subject to clause 8.1, where the Processor subcontracts any Processing activities under the Agreement to a Sub-Processor, it must enter into a written agreement with the Sub-Processor which imposes, in substance, the same obligations on the Sub-Processor as are imposed on the Processor under this Schedule (the “Sub-Processing Agreement”)
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall ensure that the Sub-Processor complies with the obligations prescribed in the Sub-Processing Agreement and shall notify the Controller of any failure by the Sub-Processor to fulfil its contractual obligations insofar as it impacts the Processing of Personal Data
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8.4</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall remain fully responsible and liable to the Controller for the performance of the Sub-Processor's obligations under the Sub-Processing Agreement and any non-compliance by the Sub-Processor shall be deemed to be non-compliance by the Processor
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">8.5</span>
                            <span className="text-white/60  flex-1">
                            The Processor assigns any claim it may have against the Sub-Processor in terms of the Sub-Processing Agreement to the Controller where the Controller suffers damages directly or indirectly from non-compliance with the Sub-Processing Agreement. 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">9</span>
                            <span className="text-white  flex-1">
                            MANAGEMENT OF PERSONAL DATA BREACH
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">9.1</span>
                            <span className="text-white/60  flex-1">
                            In the event of a Personal Data Breach, or where there are reasonable grounds to believe that there has been a Personal Data Breach, concerning Personal Data Processed by the Processor in terms of this Schedule, the Processor shall take appropriate measures to address such Personal Data Breach, including measures to mitigate its adverse effects.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">9.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall immediately notify the Controller of such Personal Data Breach, or where there are reasonable grounds to believe that there has been a Personal Data Breach, after becoming aware of the breach or suspected Personal Data Breach and provide all relevant information known at the time. The information shared with the Controller should be supplemented with further information as it becomes available to the Processor without undue delay.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">9.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall cooperate with and assist the Controller and shall take all reasonable steps as are directed by the Controller to assist in the investigation, mitigation, notifications and communications, reporting and remediation of the Personal Data Breach
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">10</span>
                            <span className="text-white  flex-1">
                            DATA SUBJECT RIGHTS             
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">10.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall promptly notify the Controller of any request it has received from a Data Subject. The Processor shall not respond to that request itself unless it has been authorised to do so by the Controller
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">10.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall assist the Controller in fulfilling its obligations to respond to Data Subjects’ requests for the exercise of their rights in the manner instructed by Controller
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">10.3</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall inform Data Subjects in a transparent and easily accessible format, through individual notice or on its website, of a contact point authorised to handle complaints. It shall deal promptly with any complaints it receives from a Data Subject. The Processor shall maintain a detailed record of these complaints which shall be provided to the Controller on its request or at agreed intervals.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">11</span>
                            <span className="text-white  flex-1">
                            DISCLOSURES TO GOVERNMENTAL AGENCIES           
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">11.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall promptly notify the Controller and, where possible, the Data Subject, if it:
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">11.1.1</span>
                                <span className="text-white/60  flex-1">
                                receives a legally binding request for disclosure of the Personal Data by a Public Authority. Such notification shall include information about the Personal Data requested, the requesting Public Authority, the legal basis for the request and the response provided by the Processor to the Public Authority; or
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">11.1.2</span>
                                <span className="text-white/60  flex-1">
                                becomes aware of any direct access by a Public Authority to Personal Data Processed by the Processor which is subject to this Schedule. Such notification shall include all information available to the Processor on the matter.
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">11.2</span>
                            <span className="text-white/60  flex-1">
                            If the Processor is prohibited in terms of Local Law(s) from notifying the Controller and/or the Data Subject of the information set out in Clause 11.1 above, the Processor agrees to use its best efforts to obtain a waiver of the prohibition, with a view to communicating as much information as possible, and as soon as possible to the Controller and/or Data Subject. The Processor agrees to document its best efforts in order to be able to demonstrate them on request of the Controller.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">11.3</span>
                            <span className="text-white/60  flex-1">
                            In circumstances that the Processor is prohibited from notifying the Controller and/or the Data Subject of the information, the Processor agrees to review the legality of the request for disclosure and to challenge the request if it reasonably concludes that there are reasonable grounds to consider that the request is unlawful under Local Law(s), and applicable obligations under international law and principles of international comity. The Processor shall consider all legal rights as it if were the Controller including seeking interim relief and possibilities of appeal. It shall not disclose the Personal Data requested until required to do so under the applicable procedural rules and then only the minimum amount of information permissible should be shared with the Public Authority requesting it.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">12</span>
                            <span className="text-white  flex-1">
                            INABILITY TO COMPLY WITH THIS DATA PROCESSING SCHEDULE          
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">12.1</span>
                            <span className="text-white/60  flex-1">
                            The Processor warrants that it has no reason to believe that Local Laws and practices applicable to the Processor prevent the Processor from fulfilling its obligations under this Schedule.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">12.2</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall promptly notify the Controller if it is unable to comply with any provisions of this Schedule, for any reason including but not limited to changes in Local laws or practices applicable to the Processor
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">12.3</span>
                            <span className="text-white/60  flex-1">
                            Following a notification pursuant to Clause 12.2, or if the Controller otherwise has reason to believe that the Processor can no longer fulfil its obligations under this Schedule, the Controller shall promptly identify appropriate measures (e.g. technical or organisational measures to ensure security and confidentiality) to be adopted by the Controller and/or Processor to address the situation. The Controller shall suspend the Processing / transfer of Personal Data if it considers that no appropriate safeguards for such Processing / transfer can be ensured, or if instructed by the competent Supervisory Authority to do so. In this case, the Controller shall be entitled to terminate the Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13</span>
                            <span className="text-white  flex-1">
                            RETURN OR DELETION OF PERSONAL DATA          
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13.1</span>
                            <span className="text-white/60  flex-1">
                            On termination of the Agreement, the Processor shall, at the election of the Controller, immediately return or securely destroy / delete all the Personal Data that was transferred to and/or Processed by the Processor prior to termination of the Agreement, and the same shall apply to all copies thereof, by such manner and in such form as notified by the Controller, and within such time period as instructed by the Controller
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13.2</span>
                            <span className="text-white/60  flex-1">
                            On termination of the Agreement, the Processor will notify all Sub-Processors of the Controller’s instruction to either return all Personal Data or to destroy all Personal Data within the same period applicable to the Processor
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13.3</span>
                            <span className="text-white/60  flex-1">
                            In each case the Processor must provide a written certification to the Controller that it has returned or destroyed / deleted the Personal Data, as applicable. Similarly, written certification from each Sub-Processor should be made available to the Controller on its request.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13.4</span>
                            <span className="text-white/60  flex-1">
                            Until the Personal Data is deleted or returned, as contemplated above, the Processor shall continue to ensure compliance with this Schedule and, if applicable, compliance with the Sub-Processor Agreement(s) until Personal Data is deleted or returned thereunder
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">13.5</span>
                            <span className="text-white/60  flex-1">
                            In case that the Processor is legally prohibited, in terms of Local Law(s), from returning, destroying or deleting the Personal Data, as contemplated above, the Processor warrants that it will continue to ensure compliance with this Schedule and will only Process the Personal Data to the extent and for as long as required to meet such legal obligations. The same will apply mutatis mutandis to any Sub-Processor.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14</span>
                            <span className="text-white  flex-1">
                            BREACH AND LIABILITY          
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.1</span>
                            <span className="text-white/60  flex-1">
                            In the event that the Processor is in breach of any of its obligations under this Schedule or unable to comply with the obligations contained herein, the Controller may suspend the transfer of Personal Data, and instruct the Data Processor to cease all or specific Processing of Personal Data until the latter complies with the provisions of this Schedule. 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.2</span>
                            <span className="text-white/60  flex-1">
                            The Controller shall be entitled to terminate the Agreement if:
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">14.2.1</span>
                                <span className="text-white/60  flex-1">
                                the transfer and/or Processing of Personal Data by the Processor has been suspended by the Controller pursuant to Clause 12.3 or 14.1 and if compliance with this Schedule is not restored within a reasonable time and in any event within one month following the suspension;
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">14.2.2</span>
                                <span className="text-white/60  flex-1">
                                the Processor is in substantial or persistent breach of this Schedule and/or its obligations under Applicable Data Protection Law(s);
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">14.2.3</span>
                                <span className="text-white/60  flex-1">
                                the Processor fails to comply with the binding decision of a competent court or the Supervisory Authority regarding its obligations pursuant to this Schedule and/or Applicable Data Protection Law(s); or
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]"></span>
                            <div className="mt-8 w-full flex space-x-2">

                                <span className="text-white w-[50px]">14.2.4</span>
                                <span className="text-white/60  flex-1">
                                any Sub-Processor is non-compliant with the Processing requirements set out in the Sub-Processor Agreement and/or Applicable Data Protection Law(s) and fails to restore compliance within a reasonable time and in any event within two months of receiving notice to do so unless that relationship has been terminated by the Processor within that period.
                                </span>
                                        
                            </div>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.3</span>
                            <span className="text-white/60  flex-1">
                            Each Party shall be liable to the other Party for any damages it causes that other Party by any breach of any obligations in terms of this Schedule
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.4</span>
                            <span className="text-white/60  flex-1">
                            The Processor may not rely on a breach by a Sub-Processor of its obligations in order to avoid its liabilities in terms of this Schedule.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.5</span>
                            <span className="text-white/60  flex-1">
                            The Processor shall indemnify the Controller from and against all losses which the Controller may incur or suffer arising directly or indirectly as a result of, or related to a breach by the Processor, its employees or anyone acting for or on behalf of the Processor, including any Sub-Processor engaged by the Processor, of Applicable Data Protection Law(s) or the Processor’s obligations under this Schedule.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[50px]">14.6</span>
                            <span className="text-white/60  flex-1">
                            Where the Agreement contract involves more than two Parties, the Controller may exercise this right to termination only with respect to the relevant Party, unless the Parties have agreed otherwise. 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white  flex-1">
                            GLOSSARY OF TERMS APPLICABLE TO DATA PROCESSING SCHEDULE         
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Applicable Data Protection Law(s)”</span>
                            <span className="text-white/60  flex-1">
                            means, in relation to the Agreement and this Schedule, data privacy and data protection legislation and regulations applicable to the Processing of Personal Data carried out, and any other laws that may be agreed between the Parties in writing.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“the Agreement”</span>
                            <span className="text-white/60  flex-1">
                            means this Agreement concluded between the Controller and the Processor, in terms of the which the Processor is required to Process Personal Data and/or Sensitive Personal Data for and on behalf of the Controller, as part of the services rendered to the Controller.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Controller”</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection Law(s). In the absence of Applicable Data Protection Law(s) it shall mean a natural or legal person or entity, public authority, agency or any other body which alone or in conjunction with others, determines the purposes and means of the Processing of Personal Data. In terms of this schedule, the Controller is the party stated in Annexure A hereto.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Child”</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection Law(s) or other Local Law(s). In the absence of Applicable Data Protection Law(s) or in the absence of a clear definition within Local Law(s), it means a natural person under the age of 18 years who is not legally competent, without the assistance of a parent/legal guardian, to take any action or decision in respect of any matter concerning him or herself. “Children” shall have corresponding meaning as the above;
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Data Subject”</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection (Privacy) Law(s). In the absence of Applicable Data Protection Law(s) it means an identified or identifiable natural person. An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Employee”</span>
                            <span className="text-white/60  flex-1">
                            Persons employed by the relevant Party whether permanent, time-limited, full-time, or part-time including directors, trainees, secondees and external contractors.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Local Country”</span>
                            <span className="text-white/60  flex-1">
                            means Nigeria 
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Local Law(s)”</span>
                            <span className="text-white/60  flex-1">
                            means legal, statutory, regulatory, license conditions rules, guidelines, Ministerial/National Security orders or directives, and Directives relating to Public safety (where applicable), including Applicable Data Protection  Law(s).
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Parties”</span>
                            <span className="text-white/60  flex-1">
                            shall mean the Controller and the Processor.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Personal Data”</span>
                            <div className="text-white/60  flex-1">
                                shall have the meaning ascribed to “personal data” or “personal information”, as the case may be, under Applicable Data Protection Law(s). In the absence of Applicable Data Protection Law(s) it shall mean any information relating to a Data Subject. Examples of “personal data” includes, but is not limited to, the following:
                                
                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    any identifying number, symbol,
                                    </span>
                                        
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    contact information (e.g. e-mail address, postal address, telephone number);
                                    </span>
                                        
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    location information or physical address,
                                    </span>
                                        
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    online identifier or other assignment to the person;
                                    </span>
                                        
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    the biometric information of the person;
                                    </span>
                                    
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    the personal opinions, views or preferences of the person;
                                    </span>
                                    
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    correspondence sent by the person that is implicitly or explicitly of a private or confidential nature or further correspondence that would reveal the contents of the original correspondence;
                                    </span>
                                    
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    the views or opinions of another individual about the person; and
                                    </span>
                                    
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    the name of the person if it appears with other personal information relating to the person or if the disclosure of the name itself would reveal information about the person;
                                    </span>
                                    
                                </div>

                                <div className="mt-8 w-full flex space-x-2">

                                    <span className="text-white w-[50px]">-</span>
                                    <span className="text-white/60  flex-1">
                                    Sensitive Personal Data.
                                    </span>
                                    
                                </div>                            
                            
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Personal Data Breach”</span>
                            <span className="text-white/60  flex-1">
                            means a breach of security leading to the accidental or unlawful destruction, loss or damage, alteration, unauthorised disclosure of, or access to, Personal Data transmitted, stored or otherwise Processed.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Processing”</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection Law(s). In the absence of Applicable Data Protection Law(s) it shall mean any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, including collection, receipt, recording, organisation, structuring, collation, storage, adaptation or alteration, updating, retrieval, consultation, use, disclosure by means of transmission, dissemination or otherwise making available, alignment or combination,  merging, restriction, erasure, destruction, or degradation (“Process” and “Processed” shall have corresponding meanings).
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">“Processor”</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection Law(s). In the absence of Applicable Data Protection Law(s) it means the natural or legal person or entity, public authority, agency or other body which Processes Personal Data for or on behalf of, and under the authority of the Controller, under the terms of a contract or mandate.  In terms of this schedule, the Processor is the party stated in Annexure A hereto
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Pseudonymisation"</span>
                            <span className="text-white/60  flex-1">
                            the Processing of Personal Data in such a way that the Personal Data can no longer be attributed to a specific Data Subject without the use of additional information, as long as such additional information is kept separately and subject to technical and organizational measures to ensure non-attribution to an identified or identifiable individual.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Public Authority"</span>
                            <span className="text-white/60  flex-1">
                            means any governmental authority, regulatory authority, governmental agency, law enforcement authority, judicial authority, the Supervisory Authority or similar body.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Schedule"</span>
                            <span className="text-white/60  flex-1">
                            means this Data Processing Schedule and the Annexures hereto read together with the Agreement;
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Sensitive Personal Data"</span>
                            <span className="text-white/60  flex-1">
                            shall have the meaning ascribed thereto under Applicable Data Protection Law(s). In the absence of Applicable Data Protection Law(s) it shall mean a sub-set of Personal Data which is considered more sensitive than other categories of Personal Data. Sensitive Personal Data includes but is not limited to Personal Data revealing a Data Subject’s racial or ethnic origin, political opinions, religious or philosophical beliefs, trade-union membership, criminal behaviour relating to the alleged commission of a crime or proceedings relating to the alleged commission of a crime, genetic data, biometric data, data concerning health and/or data concerning a data subject’s sex life or sexual orientation.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Sub-Processor"</span>
                            <span className="text-white/60  flex-1">
                            means any third party engaged by the Processor to perform any Processing activities in respect of the Personal Data Processed for or on behalf of the Controller or otherwise acquired from the Controller. This term also includes any other person who is engaged by a Sub-Processor to Process Personal Data.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Supervisory Authority"</span>
                            <span className="text-white/60  flex-1">
                            means the relevant data protection authority or regulator which is competent to monitor compliance with the Applicable Data Protection Law(s) (if any).
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white w-[150px]">"Technical and Organisational Security Measures"</span>
                            <span className="text-white/60  flex-1">
                            means those measures aimed at protecting Personal Data against accidental or unlawful destruction, loss or damage, unauthorised alteration, unauthorised disclosure of or access to Personal Data and against all other unlawful forms of Processing.
                            </span>
                                
                        </div>

                        <div className="mt-12 w-full flex space-x-2">

                            <span className="text-white  flex-1">
                            ANNEXURE A TO THE DATA PROCESSING SCHEDULE– DETAILS OF THE PROCESSING
                            </span>
                                    
                        </div>

                        <p className="text-lg text-white/60 w-full mb-4">
                            This Annexure forms part of this Data Processing Schedule and must be completed and initialed by the parties.
                        </p>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Name of Controller</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">MTN Nigeria</span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Name of Processor</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Categories of Data Subjects whose Personal Data is Processed by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Categories of Personal Data Processed by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Sensitive Personal Data Processed (if applicable) by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Categories of Children’s Personal Data Processed by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Nature of the Processing by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Purpose(s) for which the Personal Data is Processed by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Duration of Processing by the Processor in terms of the Agreement</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">For Sub-Processors engaged by the Processor in terms of the Agreement (specify the subject matter, nature and duration of the Processing by Sub-Processor)</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2"></span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Processor’s Local Data Protection Officer</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">Name:
                                        <br />Email address:
                                        <br />Mobile Number:
                                        <br />Work Telephone Number:
                                    </span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Controller’s Local Data Protection Officer</span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">Name: Oluwatoyin Araromi
                                        <br />Email address: DPONigeria@mtn.com
                                    </span>                                
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/2 border-r border-white/40 p-2 font-bpld">Details and competent Supervisory Authorities applicable to the Processing Activities </span>
                                    <span className="text-white w-1/2 border-r border-white/40 p-2">Name: <strong>Nigerian Data Protection Bureau</strong>
                                        <br />Country: Nigeria	
                                        <br />Contact Details:
                                    </span>                                
                                </div>
                                
                            </div>
                        </div>

                        <div className="mt-12 w-full flex space-x-2">

                            <span className="text-white  flex-1">
                            ANNEXURE B TO THE DATA PROCESSING SCHEDULE– MINIMUM TECHNICAL AND ORGANISATIONAL MEASURES
                            </span>
                                    
                        </div>

                        <p className="text-lg text-white/60 w-full mb-4">
                            The Processor agrees and warrants that it has implemented and shall maintain the following minimum Technical and Organisational Security Measures to ensure the security of Personal Data:
                        </p>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20 text-center align-center">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">No.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 text-xs">Implemented at Effective Date</span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 text-xs">To be implemented by date specified </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 text-xs">Not required to be implemented, unless agreed otherwise </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">1.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures of Pseudonymisation and/or encryption of personal data at rest (during storage) and in transit. Provided that, in case of Pseudonymisation, the additional information for attributing the Personal Data to a specific Data Subject shall, where possible, remain under the exclusive control of the Controller.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">2.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring ongoing confidentiality, integrity, availability and resilience of processing systems and services</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">3.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">4.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Processes for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures in order to ensure the security of the processing</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iv" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iv" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_iv" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">5.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for logical access control to ensure that only authorised individuals have access to business applications, systems, networks and computing devices that contain personal data</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_v" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_v" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_v" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>
                                
                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">6.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring physical access controls are in place and physical security of locations at which personal data are processed </span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vi" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vi" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vi" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">7.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to regularly backup and perform tests to restore personal data</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_vii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">8.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to perform risk assessments and security assessments to identify vulnerabilities and remediate those vulnerabilities</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_viii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_viii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_viii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">9.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to perform and review logging on systems that process personal information to ensure event logs are monitored, reviewed and exceptions/anomalies are reported and addressed</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ix" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ix" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_ix" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">10.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to analyse, detect and prevent threats on systems that process Personal Data with the use of intrusion prevention/detection technologies</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_x" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_x" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_x" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">11.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for detecting, identifying, communicating/notifying, documenting, analysing and responding to incidents</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xi" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xi" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xi" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">12.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to keep track of incidents via an incident register where all incidents are reported</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">13.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to ensure effective malware protection software is installed, configured, and maintained</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">14.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures to apply information leakage protection mechanisms to systems and networks that process, store or transmit personal data</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiv" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiv" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xiv" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">15.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring that effective IT security governance and management processes are maintained</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xv" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xv" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xv" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">16.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Maintaining certification/assurance of processes and products to confirm that minimum controls are effectively designed and implemented</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvi" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvi" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvi" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">17.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">If transfers to Sub-Processors are performed, specific Technical and Organisational Measures to be taken by the Sub-Processors are defined and reviewed</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xvii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">18.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Description of the specific Technical and Organisational Measures to be taken by the Processor to be able to provide assistance to the Controller in the event of an incident involving personal data.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xviii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xviii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xviii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">19.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring system configuration, including default configuration.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xix" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xix" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xix" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">20.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for certification / assurance of processes and products.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xx" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xx" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xx" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">21.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring data minimization, data quality, limited data retention.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxi" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxi" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxi" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>


                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">22.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for ensuring accountability for data privacy and information security.</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                                <div className="flex border border-white/20">
                                    <span className="text-white w-1/12 border-r border-white/40 p-2 font-bpld">23.</span>
                                    <span className="text-white w-5/12 border-r border-white/40 p-2">Measures for allowing effective data destruction and data erasure</span>    
                                    <span className="text-white w-2/12 border-r border-white/40 p-2">                                        
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxiii" value="a" action={handleOnChange} />                                        
                                    </span>
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxiii" value="b" action={handleOnChange} />
                                    </span>                                
                                    <span className="text-white w-2/12 border-r border-white/40 p-2 ">
                                        <AnnexureH dynamicData={dynamicData} name="annexure_h_xxiii" value="c" action={handleOnChange} />
                                    </span>                               
                                </div>

                            </div>
                        </div>
                        

                        
                    </div>

                    {errors && errors["error"] && (
                        <div className="mb-6">
                        <FormErrors error={errors["error"]} />
                        </div>
                    )}

                    <div className="flex justify-center p-4">
                        {
                            submitting && 
                                <TailSpinPreloader width={40} height={40} fill="#efb703" />

                        }{
                            !submitting && 
                                <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => submitResponses()}>Review & Submit</button>

                        }
                        
                    </div>

                    <Success message="Annexures signed successfully" visible={successDisplay} action={() => setTimeout(() => {router.push("/dashboard/contracts/execution/" + contract_id)}, 2000)} />      

                </div>

        </>

    
}

