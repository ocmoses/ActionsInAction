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
import { capitalizeFirst } from "../../../../../modules/utilities";
import useProcessing from "@/hooks/useProcessing";




export default function BilateralAnnexures({contract_id}){

    const {
        partner,
        submitAnnexureResponses
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
    const [data, setData] = useState({partner_uuid: partner?.uuid, contract_id: "TESTD-2023-10AA09", 

                                        annexure_c: "", 

                                        annexure_e_four: "", annexure_e_five_a: "",
                                        annexure_e_five_b: "", annexure_e_five_c: "", 
                                        annexure_e_five_d: "", annexure_e_five_e: "", 
                                        annexure_e_five_f: "", annexure_e_five_g: "",
                                        annexure_e_five_h: "", annexure_e_five_i: "",
                                        annexure_e_six_a: "", annexure_e_six_b: "",
                                        annexure_e_six_c: "", annexure_e_six_d: ""                                    
                                    });

    const handleOnChange = (e, field) => {
        clearErrors();
        setData({...data, [field]: e.target.value});
    };


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

    

    const submitResponses = async () => {
        if(!validateResponses()){
            return;
        }

        clearErrors();

        setSubmitting(true);

        const response = await submitAnnexureResponses(data);

        if(response.error){
            setError({error: response.error});
        }else{
            router.push("/dashboard/contracts/execution");
        }

        setSubmitting(false);
    }

    const validateResponses = () => {


        for(let i in data){
            if(data[i].trim() == ""){
                setError({error: i.split("_").join(" ") + " has no response"});
                return false;
            }
        }

        return true;
    }
    

    return <>
                <div className="flex flex-col justify-center items-center pt-8 space-y-4 relative">

                    {/* Floating side nav */}
                    <div className={`${fixed ? "fixed top-0 left-[60px]" : "absolute top-0 left-0"} z-10  flex-col space-y-2 p-2 hidden md:flex bg-black rounded-md`}>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-a")}>
                            <span className={`flex w-6 h-6 text-white ${focused == "annexureA" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>1</span>
                            <span className={`${focused == "annexureA" ? "text-white" : "text-white/40"} text-white`}>Annexure A</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-b")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureB" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>2</span>
                            <span className={`${focused == "annexureB" ? "text-white" : "text-white/40"} text-white`}>Annexure B</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-c")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureC" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>3</span>
                            <span className={`${focused == "annexureC" ? "text-white" : "text-white/40"} text-white`}>Annexure C</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-d")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureD" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>4</span>
                            <span className={`${focused == "annexureD" ? "text-white" : "text-white/40"} text-white`}>Annexure D</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-e")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureE" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>5</span>
                            <span className={`${focused == "annexureE" ? "text-white" : "text-white/40"} text-white`}>Annexure E</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-f")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureF" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>6</span>
                            <span className={`${focused == "annexureF" ? "text-white" : "text-white/40"} text-white`}>Annexure F</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-g")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureG" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>7</span>
                            <span className={`${focused == "annexureG" ? "text-white" : "text-white/40"} text-white`}>Annexure G</span>
                        </div>

                        <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/annexures#annexure-h")}>
                             <span className={`flex w-6 h-6 text-white ${focused == "annexureH" ? "bg-mtn" : "bg-white/20"} rounded-full justify-center items-center`}>8</span>
                            <span className={`${focused == "annexureH" ? "text-white" : "text-white/40"} text-white`}>Annexure H</span>
                        </div>

                        {
                            document?.referer?.includes("/contracts/execution") && 
                            <div className="flex space-x-2 items-center cursor-pointer" onClick={() => router.push("/dashboard/contracts/execution")}>
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
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">dOlly Media Services</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">30%</span>
                                    <span className="text-white/60 w-1/3 p-2">70%</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">Gold Standard VAS services</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">40%</span>
                                    <span className="text-white/60 w-1/3 p-2">60%</span>
                                </div>
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
                                <div className="flex border border-white/20">
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">1</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 p-2">-</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">2</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 p-2">-</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">3</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/60 w-1/3 p-2">-</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                    {/* Annexure C */}
                    <div id="annexure-c" className="relative border-2 mb-8 border-white/20 bg-white/10 p-8 pb-16 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE C</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-4">Confidentiality and Non Disclosure Agreement</h4>

                        <div className="text-white/60">

                            <span className="text-white">THIS AGREEMENT</span> is made on this XXXXXXXXXXXXXXX.<br/><br/>

                            BETWEEN<br/><br/>

                            <span className="text-white">MTN NIGERIA COMMUNICATIONS PLC</span>, a public limited liability company incorporated under the laws of the Federal Republic of Nigeria, having its principal office at MTN Plaza, Falomo Roundabout, Ikoyi, Lagos (hereinafter referred to as “MTN” or “Disclosing Party”, which expression shall where the context so admits include its successors-in-title and assigns), of the one part;<br/><br/>

                            <span className="text-white">AND</span><br /><br />

                            <span className="text-white">XXXXXXXXXXXXXXXXXXX</span>, a private limited liability company incorporated under the laws of the Federal<br /><br />
                            Republic of Nigeria, having its principal place of business at XXXXXXXXXXXXXXXXXX (hereinafter referred to as the “Receiving Party”, which expression shall where the context so admits include its successors- in-title and assigns) of the other part.<br /><br />

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

                            <span className="text-white w-[50px]">
                                <input onChange={(e) => e.target.checked ? setData({...data, annexure_c: "yes"}) : setData({...data, annexure_c: ""})} 
                                        type="checkbox" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" />
                            </span>
                            <span className="text-white/60 flex-1">
                                By clicking this checkbox, I agree to MTN’s <span className="text-white">Electronic Record and Signature Disclosure</span>
                            </span>                                        
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_four")} name="annexure_e_four" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_four")} name="annexure_e_four" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                                                                 
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_a")} name="annexure_e_five_a" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_a")} name="annexure_e_five_a" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                          
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_b")} name="annexure_e_five_b" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_b")} name="annexure_e_five_b" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                               
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_c")} name="annexure_e_five_c" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_c")} name="annexure_e_five_c" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                         
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_d")} name="annexure_e_five_d" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_d")} name="annexure_e_five_d" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                            
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_e")} name="annexure_e_five_e" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_e")} name="annexure_e_five_e" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                                
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_f")} name="annexure_e_five_f" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_f")} name="annexure_e_five_f" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                            
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_g")} name="annexure_e_five_g" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_g")} name="annexure_e_five_g" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                              
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_h")} name="annexure_e_five_h" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_h")} name="annexure_e_five_h" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                              
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/60 border-r border-white/40 p-2 flex-1">
                                        The Service Provider shall comply to the applicable AU or EU or In- Country legislation where these contradict above principles.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_i")} name="annexure_e_five_i" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_five_i")} name="annexure_e_five_i" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                               
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_a")} name="annexure_e_six_a" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_a")} name="annexure_e_six_a" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_b")} name="annexure_e_six_b" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_b")} name="annexure_e_six_b" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>                        
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_c")} name="annexure_e_six_c" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_c")} name="annexure_e_six_c" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
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
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_d")} name="annexure_e_six_d" type="radio" value="yes" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> Yes</label>
                                        <label><input onChange={(e) => handleOnChange(e, "annexure_e_six_d")} name="annexure_e_six_d" type="radio" value="no" className="h-6 w-6 rounded-lg bg-black/40 focus:ring-mtn focus:border-2 text-mtn" /> No</label>   
                                    </div>
                                </div>

                            </div>
                        </div>


                        
                    </div>

                    {/* Annexure F */}
                    <div  id="annexure-f" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE F</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-2">TODO</h4>

                        <p className="text-lg text-center text-white/60 w-full mb-4">For the duration of this Agreement, the following Short codes shall be active and running on the MTN Network.</p>
                        
                    </div>

                    {/* Annexure G */}
                    <div  id="annexure-g" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE G</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-2">TODO</h4>

                        <p className="text-lg text-center text-white/60 w-full mb-4">For the duration of this Agreement, the following Short codes shall be active and running on the MTN Network.</p>
                        
                    </div>

                    {/* Annexure H */}
                    <div  id="annexure-h" className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white w-full my-2">ANNEXURE H</h2>

                        <h4 className="text-lg text-center text-white/60 w-full mb-2">TODO</h4>

                        <p className="text-lg text-center text-white/60 w-full mb-4">For the duration of this Agreement, the following Short codes shall be active and running on the MTN Network.</p>

                        
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

                    <Success message="Annexures signed successfully" visible={successDisplay} action={() => setTimeout(() => {}, 3000)} />      

                </div>

           </>
}

