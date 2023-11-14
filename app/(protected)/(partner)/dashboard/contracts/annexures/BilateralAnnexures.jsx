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



export default function BilateralAnnexures(){

    const {
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


    console.log("signatoryRole", signatoryRole);

    useEffect(() => {
      
    }, []);
    

    return <>
                <div className="flex flex-col justify-center items-center pt-8 space-y-4">

                    {/* <div className="mb-4 rounded-xl pt-8 text-white w-[848px]">
                        <a href={() => {}}
                            className="text-black font-bold rounded-full py-2 px-6 bg-yellow-600 text-sm cursor-pointer whitespace-nowrap hover:text-white float-right ml-auto inline-flex"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>&nbsp;Download
                        </a>
                    </div> */}
                    
                    {/* Annexure A */}
                    <div className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white/80 w-full my-2">ANNEXURE A</h2>

                        <h4 className="text-lg text-center text-white/40 w-full mb-4">Revenue Share Model</h4>

                        {/* Table here */}
                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white/80 w-1/3 border-r border-white/40 p-2">Service</span>
                                    <span className="text-white/80 w-1/3 border-r border-white/40 p-2">Revenue share to service provider</span>
                                    <span className="text-white/80 w-1/3 p-2">Revenue share to MTN</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">dOlly Media Services</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">30%</span>
                                    <span className="text-white/40 w-1/3 p-2">70%</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">Gold Standard VAS services</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">40%</span>
                                    <span className="text-white/40 w-1/3 p-2">60%</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.1</span>
                            <span className="text-white/40 flex-1">The Revenue sharing model only applies to premium rated content and services for rates as approved by the NCC. The Revenue share model shall be applied to monthly logs.</span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.2</span>
                            <span className="text-white/40 flex-1">
                            MTN shall on or before the tenth (10 th ) day of each subsequent month prepare and forward via email to the Service Provider an SMS Logs, in relation to the Services for each preceding month.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.3</span>
                            <span className="text-white/40 flex-1">
                            In the absence of any dispute on the logs, the Service Provider shall within three (3) Business Days from receipt of MTN’s generated logs, review and revert with an invoice to MTN based on MTN’s logs which shall be processed for payment.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.4</span>
                            <span className="text-white/40 flex-1">
                            MTN shall effect payment (in Naira) within thirty (30) days of receipt of Service Provider’s undisputed invoice for the SMS generated in each month in accordance with the agreed Revenue share.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.5</span>
                            <span className="text-white/40 flex-1">
                            Service provider shall revert to MTN on any dispute on logs forwarded within five (5) Business Days after receipt of logs from MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">A.6</span>
                            <div className="text-white/40 flex flex-col space-y-1 flex-1">
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
                    <div className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center items-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white/80 w-full my-2">ANNEXURE B</h2>

                        <h4 className="text-lg text-center text-white/40 w-full mb-2">Active Short Codes</h4>

                        <p className="text-lg text-center text-white/40 w-full mb-4">For the duration of this Agreement, the following Short codes shall be active and running on the MTN Network.</p>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white/80 w-1/3 border-r border-white/40 p-2">S/N</span>
                                    <span className="text-white/80 w-1/3 border-r border-white/40 p-2">Short Codes</span>
                                    <span className="text-white/80 w-1/3 border-r border-white/40 p-2">Purpose/Services (Usage)</span>
                                    <span className="text-white/80 w-1/3 p-2">Bearer (SMS/IVR/USSD)</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">1</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 p-2">-</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">2</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 p-2">-</span>
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">3</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 border-r border-white/40 p-2">-</span>
                                    <span className="text-white/40 w-1/3 p-2">-</span>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>

                    {/* Annexure C */}
                    <div className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white/80 w-full my-2">ANNEXURE C</h2>

                        <h4 className="text-lg text-center text-white/40 w-full mb-4">Confidentiality and Non Disclosure Agreement</h4>

                        <div className="text-white/40">

                            <span className="text-white/80">THIS AGREEMENT</span> is made on this XXXXXXXXXXXXXXX.<br/><br/>

                            BETWEEN<br/><br/>

                            <span className="text-white/80">MTN NIGERIA COMMUNICATIONS PLC</span>, a public limited liability company incorporated under the laws of the Federal Republic of Nigeria, having its principal office at MTN Plaza, Falomo Roundabout, Ikoyi, Lagos (hereinafter referred to as “MTN” or “Disclosing Party”, which expression shall where the context so admits include its successors-in-title and assigns), of the one part;<br/><br/>

                            <span className="text-white/80">AND</span><br /><br />

                            <span className="text-white/80">XXXXXXXXXXXXXXXXXXX</span>, a private limited liability company incorporated under the laws of the Federal<br /><br />
                            Republic of Nigeria, having its principal place of business at XXXXXXXXXXXXXXXXXX (hereinafter referred to as the “Receiving Party”, which expression shall where the context so admits include its successors- in-title and assigns) of the other part.<br /><br />

                            Both <span className="text-white/80">MTN</span> and the <span className="text-white/80">Receiving Party</span> are hereinafter jointly referred to as the “Parties” and individually as the “Party”.<br /><br />

                        </div>

                        <span className="text-white/80">Wheare as</span><br />

                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.1</span>
                            <span className="text-white/40  flex-1">
                            The Disclosing Party has entered into an Agreement with the Receiving Party for provision of value-added services to the Disclosing Party’s subscribers.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.2</span>
                            <span className="text-white/40 flex-1">
                            The Disclosing Party and the Receiving Party acknowledge that in the course of carrying out the Services stated in 1.1 above, the Receiving Party shall be exposed to and Disclosing Party shall disclose to the Receiving Party certain information of a sensitive and confidential nature
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.3</span>
                            <span className="text-white/40  flex-1">
                            The Parties wish to record the terms and conditions upon which the Disclosing Party shall disclose Confidential Information to the Receiving Party, which terms and conditions shall constitute a binding and enforceable agreement between the Parties and their agents.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.4</span>
                            <span className="text-white/40  flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.5</span>
                            <span className="text-white/40 flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>
                        <br />

                        <p className="text-white/80">NOW THEREFORE WITNESS that in consideration of the above-mentioned disclosure, Disclosing Party and Receiving Party agree as follows:</p><br />
                        
                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2</span>
                            <span className="text-white/80 flex-1">
                            The Confidential Information
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.1</span>
                            <span className="text-white/40 flex-1">
                            “Confidential Information” shall, for the purpose of this Agreement include, without limitation, any technical, scientific, commercial or financial information, know-how, trade secrets, processes, machinery, designs, drawings, technical specifications, and data in whatever form disclosed to or assessed by either Party during the course of his relationship with the other Party.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.2</span>
                            <span className="text-white/40  flex-1">
                            The Disclosing Party is listed on the Nigerian Stock Exchange. Any information disclosed under this agreement, in relation to the Disclosing Party, any of the Disclosing Party’s affiliates and/or any entities in which the Disclosing Party has an interest, constitutes inside information (as envisaged in the Investment and Securities Act, 2007, as amended or replaced from time to time (“ISA”), and the Receiving Party will treat and procure the treatment of the information disclosed to it pursuant to this Agreement as inside information as envisaged in the ISA and will not use such inside information in breach of the ISA. For the purposes of this Agreement an “affiliate” of a Party shall mean its direct and indirect subsidiaries, its direct and indirect holding companies and all direct and indirect subsidiaries of such holding companies. Each Party shall procure that its affiliates comply with the terms of this Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.3</span>
                            <span className="text-white/40 flex-1">
                            The Receiving Party shall treat the information stated in clause 2.1 above and any other information of a nature similar to the information contained in clause 2.1 above to which the Receiving Party may become exposed by reason of the arrangement between the Receiving Party and the Disclosing Party as confidential (“Confidential Information”)
                            </span>
                                
                        </div>


                        
                    </div>

                    {/* Annexure E */}
                    <div className="border-2 mb-8 border-white/20 bg-white/10 p-8 rounded-lg flex flex-col justify-center pt-8 text-white md:min-w-6xl w-[800px]">
                        
                        <h2 className="text-xl text-center text-white/80 w-full my-2">ANNEXURE E</h2>

                        <p className="text-lg text-center text-white/40 w-full mb-4">Information, Data and Cyber security Annex</p>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1</span>
                            <span className="text-white/80  flex-1">
                            Scope</span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.1</span>
                            <span className="text-white/40 flex-1">
                            This Annex is applicable to all products, services, inclusive of managed services and/or software delivered to MTN by contractors, consultants, or any other service providers (the Service Provider). The Service Provider shall ensure the equipment, products, services and/or software are assessed against the requirements in this Annex prior to the delivery of the same to MTN.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.2</span>
                            <span className="text-white/40  flex-1">
                            Information Security Compliance frameworks and/or best practices as well as Information Security controls will apply within the context and scope of supplies, products, services, and/or software per the agreement.
                            </span>
                                    
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">1.4</span>
                            <span className="text-white/40  flex-1">
                            This Agreement shall also bind the Parties, notwithstanding the date of signature hereof, in the event that the Disclosing Party shall have disclosed any Confidential Information to the Receiving Party prior to date of signature hereof.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2</span>
                            <span className="text-white/80 flex-1">
                            COMPLIANCE AND MTN’S RIGHT TO AUDIT
                            </span>
                                
                        </div>

                       <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.1</span>
                            <span className="text-white/40 flex-1">
                            The Service Provider is, at no additional cost to MTN, required to provide MTN on an annual basis with an industry standard certification, attestation such as SSAE-16 or an equivalent. Where the Service Provider is unable to provide the above, MTN reserves the right to select auditors to perform a full system and process audit including information security in accordance with the audit provisions contained in the Agreement.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.2</span>
                            <span className="text-white/40 flex-1">
                            In the event that MTN reserves the right to audit as per above clause, any critical or high risks identified during the audit, the Service Provider will at its own cost be required to provide MTN with a remediation plan to address the risks in the form of a report within a mutually agreed time frame.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.3</span>
                            <span className="text-white/40  flex-1">
                            The Service Provider will be required to at their own cost, perform a re-assessment of the remedial actions taken, and provide the results in the form of a report to MTN within a mutually agreed time frame.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">2.4</span>
                            <span className="text-white/40 flex-1">
                            The Service Provider will be required to provide a roadmap for rectification of non-compliance within a mutually agreed time frame in the event that the Service Provider is unable to fully comply with the requirements of this Annex upon commencement of the contract. This does not impair on MTN’s right to enforce non-compliance clauses.
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">3</span>
                            <span className="text-white/80 flex-1">
                            AUDIT RIGHTS
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <div className="text-white/40 flex-1 flex space-x-2">
                                <span className="w-[50px]">a) </span>
                                <span className="flex-1">
                                The Service Provider acknowledges and agrees that MTN may, from time to time, allow and appoint statutory auditors, internal auditors, consultants or MTN personnel to conduct technical audits of the equipment, products, software and/or the services and/or performance of this Agreement (and/or any of the Purchase Order(s)) by the Service Provider, which audits shall extend to a review of tool architecture, configurations, reconciliations, filters, alarms, security, and other similar system audit requirements and compliance to information security requirements.
                                </span>  
                            </div>                              
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <div className="text-white/40 flex-1 flex space-x-2">
                                <span className="w-[50px]">b) </span>
                                <span className="flex-1">
                                The Service Provider shall accept that MTN has the right to audit the Service Provider’s contractual responsibilities or to have such audits carried out by a third party provided that such third party is not a competitor of the Service Provider. The Service Provider shall, also with regard to the Service Provider’s practices and procedures relating to the delivery, quality, data handling and information security (if applicable) and confidentiality aspects of this Agreement as well as access to information systems and facilities, accept that MTN has the right to audit contractual responsibilities.
                                 </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <div className="text-white/40 flex-1 flex space-x-2">
                                <span className="w-[50px]">c) </span>
                                <span className="flex-1">
                                    The Service Provider agrees to correct any deficiencies found during such audit or inspection. The performance of such audits shall not relieve Service Provider of its obligations under this Agreement. If contractual deficiencies are not satisfactorily resolved, MTN reserves the right to apply such contractual remedies including but not limited to the application of liquidated damages, service level credits and consequences for breach as provided in this Agreement.
                                </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <div className="text-white/40 flex-1 flex space-x-2">
                                <span className="w-[50px]">d) </span>
                                <span className="flex-1">
                                    MTN shall ensure that internal auditors, consultants and MTN personnel that are allowed access to any Confidential Information of the Service Provider are bound by confidentiality obligations no less onerous than those contained in this Agreement.
                                </span>
                            </div>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">4</span>
                            <span className="text-white/80 flex-1">
                            INTEGRATION TO MTN’S OPERATIONS SECURITY SYSTEMS
                            </span>
                                
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <p className="text-lg text-white/40 w-full mb-4">As a guide this clause applies to all software, products and services provided by the Service Provider where MTN requires access to perform business operations:
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white/80 w-4/5 border-r border-white/40 p-2">Clause requirements</span>
                                    <span className="text-white/80 w-1/5 border-r border-white/40 p-2">Applicable?</span>                                
                                </div>
                                <div className="flex border border-white/20">
                                    <span className="text-white/40 w-4/5 border-r border-white/40 p-2">
                                    The Service Provider is required to integrate their relevant software, applications, equipment and products into the MTN security infrastructure as per applicable best industry practice at no additional cost. This includes identity management, authentication, authorization, compliance assessment and log monitoring integration points.
                                    </span>
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />                                
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">5</span>
                            <span className="text-white/80 flex-1">
                            PRIVACY
                            </span>
                                
                        </div>

                        <div className="mt-4 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <p className="text-lg text-white/40 w-full mb-4">
                            Further to the provisions of this Annex and in particular, the confidentiality or data subject protection clauses within this Agreement:    
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">
                                <div className="flex border border-white/20">
                                    <span className="text-white/80 w-4/5 border-r border-white/40 p-2">Clause requirements</span>
                                    <span className="text-white/80 w-1/5 border-r border-white/40 p-2">Applicable?</span>                                
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        The Service Provider is required to integrate their relevant software, applications, equipment and products into the MTN security infrastructure as per applicable best industry practice at no additional cost. This includes identity management, authentication, authorization, compliance assessment and log monitoring integration points.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.1</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        Informing and gaining consent from end users on the terms of sharing of information and storing this consent for future reference, unless legally prohibited;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.2</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        Only sharing information where users have provided explicit content;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.3</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        Using secure transport protocols on information exchange;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.4</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        Limiting staff and subcontractor access on need to know and monitoring transgressions;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.5</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        On-going monitoring of staff and subcontractor access and access rights;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.6</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        Abiding by in-country data retention, sovereignty and privacy laws where information flows occur;
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">5.1.7</span>                            
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        The transfer of data cross – border is prohibited, unless where (a) the Service Provider provides MTN with a written confirmation of no in-country law violation and (b) MTN agrees per a written consent/agreement.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-4/5">
                                        <span className="text-white/40 border-r border-white/40 p-2 flex-1">
                                        The Service Provider shall comply to the applicable AU or EU or In- Country legislation where these contradict above principles.
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/5 border-r border-white/40 p-2 flex space-x-2 justify-center items-center">
                                        <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                             
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="mt-8 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]">6</span>
                            <span className="text-white/80 flex-1">
                            APPLICANT INDICATOR FRAMEWORK AND COMPLIANCE
                            </span>
                                
                        </div>

                        <div className="mt-4 w-full flex space-x-2">

                            <span className="text-white/80 w-[50px]"></span>
                            <p className="text-lg text-white/40 w-full mb-4">
                            The Service Provider is required to meet the following compliance targets, as per applicability of the scope of products, software or services that are provided to MTN by the Service Provider:
                            </p>
                        </div>

                        <div className="border-1 border-white/20 rounded-md w-full">
                            <div className="w-full">

                                <div className="flex border border-white/20">
                                    <span className="text-white/80 w-1/4 border-r border-white/40 p-2">Services</span>
                                    <span className="text-white/80 w-1/4 border-r border-white/40 p-2">Targeted framework/best practice compliance</span>      
                                    <span className="text-white/80 w-1/4 border-r border-white/40 p-2">Guidelines for Roadmap as per clause 2.3</span> 
                                    <span className="text-white/80 w-1/4 border-r border-white/40 p-2">Applicable to Service Provider</span>                           
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2">6.1.1</span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        All Software/ Services/ Products
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white/80 w-[30px] ml-2 mt-2">i</span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        Relevant ISO27001 controls (100%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/40 p-2 flex-1">
                                        80% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                        
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white/80 w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        NIST Cyber security framework controls (100%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/40 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                        
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white/80 w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        A) No NVD listed CVSS temporal 9 and above vulnerabilities on all in-scope system components <br />B) No NVD listed CVSS temporal 8 and above vulnerabilities
                                        </span>                            
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/40 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                        
                                    </div>
                                </div>

                                <div className="flex border border-white/20 ">
                                    <div className="flex space-x-2 flex-1 w-1/4 border-r border-white/40">
                                        <span className="text-white/80 w-[50px] ml-2 mt-2"></span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        </span>
                                    </div>
                                    
                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex">
                                        <span className="text-white/80 w-[30px] ml-2 mt-2">ii</span>                            
                                        <span className="text-white/40 p-2 flex-1">
                                        Available NIST800-70/CIS benchmarks for system components forming part of the agreement scope (90%)
                                        </span>                            
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2">
                                        <span className="text-white/40 p-2 flex-1">
                                        70% within 9 months and 100% within 12 months
                                        </span>                           
                                    </div>

                                    <div className="text-white/40 w-1/4 border-r border-white/40 p-2 flex justify-center items-center space-x-2">
                                    <input onChange={() => {}} type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" /> <span className="text-white/80">Yes?</span>                        
                                    </div>
                                </div>

                            </div>
                        </div>


                        
                    </div>


                    <Success message="Annexures signed successfully" visible={successDisplay} action={() => setTimeout(() => {}, 3000)} />      

                </div>

           </>
}

