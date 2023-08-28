"use client"

import {useState, useRef, useEffect, useCallback} from "react";
import TextInput from "@/app/components/form/TextInput";
import useErrors from "@/hooks/useErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useRouter } from "next/navigation";
import usePartners from "@/hooks/usePartners";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";



export default function ContractSigning(){

    const {
        partner,
        signBilateralContract,
        getContractDynamicData,
        downloadContract
      } = usePartners();
    const [{ errors, setError, clearErrors }] = useErrors(null);
    const router = useRouter();
    const [submitingContractSignatures, setSubmitingContractSignatures] = useState(false);
    const [signingModal, setSigningModal] = useState(false);
    const [signing, setSigning] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [activeSigningTab, setActiveSigningTab] = useState({selectStyle: true, upload:false});
    const [disableActiveButton, setDisableActiveButton] = useState(true);
    const [data, setData] = useState({partner_uuid: partner.uuid, contract_type: "Bilateral VAS", 
                                        company_name: partner.company_name, click_wrap: "yes", signatory: "", signature: ""});
  
    const [clearCanvas, setClearCanvas] = useState(false);

    const canvas = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [position, setPosition] = useState(null);
    const [canvasWidth, canvasHeight] = [300, 100];

    const [dynamicData, setDynamicData] = useState({});
    const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

    
    let dynamic_content_response = null;
    let sign_bilateral_contract_response = null;
    

    const onDown = useCallback((event) => {
        
        const coordinates = getCoordinates(event)
        if (coordinates) {
          setPosition(coordinates)
          setDrawing(true)
        }
    }, [])

    const onUp = useCallback(() => {
    setDrawing(false)
    setPosition(null)
    }, [])

    const getCoordinates = (event) => {
    if (!canvas.current) {
        return null
    }

    const x = event.pageX || event.touches[0].pageX
    const y = event.pageY || event.touches[0].pageY

    return {
        x: x - canvas.current.offsetLeft,
        y: y - canvas.current.offsetTop
    }
    }

    const onMove = useCallback(
    (event) => {
        if (drawing) {
        const newPosition = getCoordinates(event)
        if (position && newPosition) {
            drawLine(position, newPosition)
            setPosition(newPosition)
        }
        }
    },
    [drawing, position]
    )

    const drawLine = (originalPosition, newPosition) => {
    if (!canvas.current) {
        return null
    }

    const context = canvas.current.getContext('2d')

    if (context) {
        context.strokeStyle = 'white'
        context.lineJoin = 'round'
        context.lineWidth = 3

        context.beginPath()
        context.moveTo(originalPosition.x, originalPosition.y)
        context.lineTo(newPosition.x, newPosition.y)
        context.closePath()

        context.stroke()
    //   handleDraw(context.getImageData(0, 0, width, height))
    }
    }
    
    const imageBase64 = ()  => {
      const newCanvas = canvas.current;//.getElementById('signature_canvas');
      return newCanvas.toDataURL("image/png");
    }

    const clear = (context) => {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    const signContract = () => {
        //
        if(activeSigningTab.selectStyle){
            //convert canvas content to base64            
            setData({...data, signature:imageBase64()});
        }

        console.log('data', data);

        sign_bilateral_contract(data);

        //sign contract

    }

    const get_dynamic_content = async () => {
        if (gettingDynamicContent) return;
        setGettingDynamicContent(true);
        dynamic_content_response = await getContractDynamicData();
        setGettingDynamicContent(false);
        console.log('dynamic_content_response', dynamic_content_response);
        if (dynamic_content_response.error) setError({ error: dynamic_content_response.error })
        else {
            // console.log('dynamic_content_response', dynamic_content_response);
            setDynamicData(dynamic_content_response.data);                
        }
    }

    const sign_bilateral_contract = async (data) => {
        if (signing) return;
        setSigning(true);
        sign_bilateral_contract_response = await signBilateralContract(data);
        setSigning(false);
        // console.log('sign_bilateral_contract_response', sign_bilateral_contract_response);
        if (sign_bilateral_contract_response.error) setError({ error: sign_bilateral_contract_response.error })
        else {
            // console.log('partner_select_service_response', partner_select_service_response);
            // setContractModal(false); 
            setSigningModal(false);
            //Do some stuff    
        }
    };

    const convertFile = (e) => {
        // Get a reference to the file
        const file = e.target.files[0];

        // Encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            // console.log('base64String', base64String);
            setData({...data, signature:base64String});
            // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(file);
    };

    const showDirectorSigning = () => {
        setData({...data, "signatory": "director"}); 
        setSigningModal(true), 
        window.scrollTo({top:0, behavior: "smooth"});
    }

    useEffect(() => {
        get_dynamic_content();
        if (canvas.current) {
            const context = canvas.current.getContext('2d');

            clear(context);

            // context.fillStyle = 'pink';
            // context.fillRect(0,0, 20, 30);
            
          }
        //
    }, [signingModal, clearCanvas]);
    

    return <>
                <div className="flex flex-col justify-center items-center pt-8">

                    <div className="mb-4 p-8 rounded-xl flex justify-end items-center pt-8 text-white w-4xl">
                        <button
                            onClick={downloadContract}
                            className="text-black font-bold rounded-full py-2 px-6 bg-yellow-600 text-sm cursor-pointer whitespace-nowrap hover:text-white ml-auto flex"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>&nbsp;Download
                        </button>
                    </div>
                    
                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">

                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>

                                <div>
                                    <div>
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <h3>
                            AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES
                        </h3>

                            <br /><br />
                            <br /><br />
                            <br /><br />

                        <h3>
                            BETWEEN
                        </h3>

                            <br /><br />
                            <br /><br />
                            <br /><br />

                        <h3>
                            MTN NIGERIA COMMUNICATIONS PLC <br />
                            (RC No. 395010)
                        </h3>

                            <br /><br />
                            <br /><br />
                            <br /><br />


                        <h3>
                            AND
                        </h3>

                            <br /><br />
                            <br /><br />
                            <br /><br />

                        <h3>
                            {dynamicData.company_name}
                            <br />
                            (RC No. {dynamicData.rc_no})
                        </h3>

                            <br /><br />
                            <br /><br />
                            <br /><br />
                            <br /><br />


                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 1 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                            <strong>TABLE OF CONTENT</strong>
                        </p>

                        <p>
                            1. Definitions <br />

                            2. Interpretations <br />

                            3. Commencement and Duration <br />

                            4. Obligations of the Service Provider <br />

                            5. Obligations of MTN <br />

                            6. Revenue Share <br />

                            7. Payment and Tax Deductions <br />

                            8. Taxes and Tax Exemption Certificates <br />

                            9. Information and Data Protection <br />

                            10. Conflict of Interest <br />

                            11. Representations, Warranties and Covenants <br />

                            12. Confidentiality <br />

                            13. Intellectual Property Rights <br />

                            14. Right of Audit <br />

                            15. Sub-Service Providers <br />

                            16. Assignment of Agreement <br />

                            17. Amendment/Variation/ Waiver <br />

                            18. Severability <br />

                            19. Release and Indemnity <br />

                            20. Limitation of Liability <br />

                            21. Conditions Precedent to Obligations of MTN <br />

                            22. Set Off  <br />

                            23. Termination <br />

                            24. Inducements, Fraud and Anti-Corruption <br />

                            25. Force Majeure <br />

                            26. Governing Law and Dispute Resolution <br />

                            27. Entire Agreement <br />

                            28. Partnership <br />

                            29. Notices <br />
                        </p>

                        <br /><br />

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 2 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        <strong>THIS AGREEMENT</strong> is made on this {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                        </p>

                        <p>
                        <strong>BETWEEN </strong>
                        </p>

                        <p>
                        <strong>MTN NIGERIA COMMUNICATIONS PLC,</strong> a public limited liability company incorporated under the laws of the Federal Republic of Nigeria with RC No. 395010, and having its registered office at MTN Plaza Building, Falomo Roundabout, Ikoyi, Lagos (hereinafter referred to as “MTN”, which expression shall where the context so admits include its successors-in-title and assigns), of the one part;
                        </p>

                        <p>
                        <strong>AND</strong>
                        </p>

                        <p>
                        <strong>{dynamicData.company_name?.toUpperCase()},</strong> a private limited liability company incorporated under the laws of the Federal Republic of Nigeria with RC No. :RC_NO, and having its registered office at :ADDRESS, (hereinafter referred to as the “Service Provider”, which expression shall where the context so admits include its successors- in-title and assigns) of the other part.
                        </p>

                        <p>
                        Both MTN and the Service Provider are hereinafter jointly referred to as the “Parties” and individually as “Party”.
                        </p>

                        <p>
                        <strong>WHEREAS:</strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            I.	MTN is an Information Communications Technology (ICT) Company licensed by the Nigerian Communications Commission (NCC) under the unified licence scheme to provide amongst other services, digital mobile cellular telephony and data services in Nigeria.
                            </p>

                            <p>
                            II.	The Service Provider is a digital content company engaged in the business of providing diverse telecoms value added services with emphasis on lifestyle and entertainment.
                            </p>

                            <p>
                            III. The Service Provider has offered to make available to MTN subscribers, value added services for information and lifestyle (“the Services”).
                            </p>

                            <p>
                            IV.	The Parties have agreed that the Service Provider shall provide the Services, leveraging on MTN’s network to drive uptake of the service by MTN subscribers.
                            </p>

                            <p>
                            V.	The Parties have agreed to execute this Agreement in accordance with the terms and conditions agreed hereunder.
                            </p>
                        </div>

                        <p>
                        <strong>THE PARTIES AGREE AS FOLLOWS:</strong>
                        </p>

                        <p>
                        1.	<strong>DEFINITIONS</strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            In this Agreement, the following terms shall have the meanings as set out hereunder:
                            </p>

                            <p>
                            1.1<strong>“Acceptable Percentage”</strong> means five percent (5%);
                            </p>

                            <p>
                            1.2.	<strong>"Agreement"</strong> means the Agreement for the provision of Value Added Services, between MTN and the Service Provider including the appendices and Annexures hereto and any other document (or parts thereof) specified by MTN or supplied in this Agreement;
                            </p>

                            <p>
                            1.3.	<strong>“AOL”</strong> means Annual Operating Levy representing two-point five percent (2.5%) or any other percentage of Revenue due to either of the Parties as prescribed by the Nigerian Communications Commission;
                            </p>

                            <p>
                            1.4. <strong>“Anti-Corruption Laws”</strong> means the applicable Nigerian laws and regulations including but not limited to the Corrupt Practices and Other Related Offences Act, 2004; Economic and Financial Crimes Commission (Establishment) Act, 2004; Money Laundering Prohibition Act, 2022. Criminal Code; and any other Applicable Law.
                            </p>

                            <p>
                            1.5.	<strong>“Business Days”</strong> means any day of the week other than Saturdays, Sundays or public holidays declared by the Federal Government of Nigeria from time to time;
                            </p>
                        </div>

                        <br />
                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 3 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            <p>
                            1.6.	<strong>“Confidential Information”</strong> means all information designated as such by either Party in writing and all other information which relates to the business, affairs, properties, assets, trading practices, Goods, Services, developments, trade secrets, know-how, personnel, customers, MTN Subscribers and Service Providers of either Party which may reasonably be regarded as the confidential information of the disclosing Party;
                            </p>

                            <p>
                            1.7.	<strong>“Content Owner”</strong> means the owner of the intellectual Property in the value-added services offered under this Agreement;
                            </p>

                            <p>
                            1.8.	<strong>“Customer Data”</strong> means all information held by MTN and the Service Provider whether transmitted by the MTN Subscribers or otherwise stored by either MTN or the Service Provider and includes Personal Data;
                            </p>

                            <p>
                            1.9.	<strong>“Effective Date”</strong> means {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")};
                            </p>

                            <p>
                            1.10.	“Force Majeure Event” means an event beyond the control of a Party including but not limited to war, rebellion, sabotage, riots, epidemic, floods, fire, national strikes, explosion, civil commotion, insurrection, computer hacking, computer crashing, and Acts of (i) God, (ii) nature, (iii) government or (iv) regulatory authority; in the case of the latter (iii) and (iv) such acts being extremely unusual and not reasonably foreseeable;
                            </p>

                            <p>
                            1.11.	“Intellectual Property” or “Intellectual Property Rights” means copyright, patents, inventions, trademarks, service marks, logos, design rights (whether registerable or otherwise), applications for any of the foregoing, database rights, domain names, trade or business names, and other similar rights or obligations whether registerable or not;
                            </p>

                            <p>
                            1.12.	“Material Breach” means a fundamental breach of this Agreement that is significant enough to impede MTN’s ability to obtain the services anticipated under this Agreement or significant enough to impede the continued performance of the services by the Service Providers, and shall include non-payment of the Revenue Share by MTN and the failure of the Service Provider to maintain a full and valid VAS Licence;
                            </p>

                            <p>
                            1.13.	<strong>“Month”</strong> means calendar month;
                            </p>

                            <p>
                            1.14.	<strong>“MTN Network”</strong> means the telecommunications network of MTN;
                            </p>

                            <p>
                            1.15.	<strong>“MTN Property”</strong> means any property, other than real property, issued or made available to the Service Provider by MTN in connection with this Agreement;
                            </p>

                            <p>
                            1.16.	<strong>“MTN Subscriber(s)”</strong> means target customers for the use of the Service;
                            </p>

                            <p>
                            1.17.	<strong>“Net Revenue”</strong> means the amount generated from the Services less deduction of all Taxes, levies and regulatory fees;
                            </p>

                            <p>
                            1.18.	<strong>“NITDA”</strong> means National Information Technology Development Agency;
                            </p>

                            <p>
                            1.19.	<strong>”NCC”</strong> means Nigerian Communications Commission;
                            </p>

                            <p>
                            1.20.	<strong>“Party”</strong> means a Party to this Agreement and “Parties” shall be construed accordingly;
                            </p>

                            <p>
                            1.21.	<strong>“Personal Data”</strong> means any personally identifiable information and data pertaining to MTNs Subscriber or customer who can be identified from those data or from other information in possession or likely to be in possession of MTN;
                            </p>

                            <p>
                            1.22.	<strong>“Revenue”</strong> means the gross amount generated from the Services to be provided under this Agreement;
                            </p>

                            <p>
                            1.23.	<strong>“Revenue Share”</strong> means the percentage of Net Revenue received by MTN to be paid to the Service Provider in accordance with the model set out in Annexure A (Revenue Share Model);
                            </p>

                            <p>
                            1.24.	<strong>“Services”</strong> means the value-added services to be provided by the Service Provider which shall include information, lifestyle and any other value-added services to be agreed in writing by the Parties, as provided in clause 4;
                            </p>
                            <br />

                            <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 4 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            <p>
                            1.25.	<strong>“Platform”</strong> means that part of MTN’s network that enables the Service to be accessed by MTN Subscribers being MTN’s subscription management infrastructure;
                            </p>

                            <p>
                            1.26.	<strong>“Short Code”</strong> means the short code numbers approved by NCC to be utilized for the delivery of SMS. The Short code shall have a two-way status that will enable the SMS platform receive messages from MTN Subscribers as well as transmit SMS to MTN Subscribers for the purposes of accessing the Services;
                            </p>

                            <p>
                            1.27.	“Solutions” includes
                            // Loop through services
                            :SERVICES_HERE
                            </p>

                            <p>
                            1.28.	<strong>“SMS”</strong> means the short message/text service(s) carried on the MTN Network and enabling MTN Subscribers to access the Services;
                            </p>

                            <p>
                            1.29.	<strong>“SMS Logs”</strong> means a list of SMS transactions captured by MTN systems as a result of MTN Subscribers entries to the Short code;
                            </p>

                            <p>
                            1.30.	<strong>“Staff”</strong> means all persons employed by the Service Provider to perform the Services together with the Service Provider's servants, agents and sub-Service Providers engaged in the performance of this Agreement;
                            </p>

                            <p>
                            1.31.	<strong>“System”</strong> means the System operated by the Service Provider and MTN (as applicable) for the purposes of the Services to be provided hereunder;
                            </p>

                            <p>
                            1.32.	<strong>“Taxes”</strong> means all taxes including but not limited to income tax, withholding tax, value added tax, stamp duties, tariffs, fiscal charges and other dues or any similar tax-related charges or levies of whatsoever nature imposed, levied or assessed by any governmental authority within Nigeria in accordance with present or future laws and/or regulations in Nigeria.
                            </p>

                            <p>
                            1.33.	<strong>“USSD”</strong> means Unstructured Supplementary Service Data; and
                            </p>

                            <p>
                            1.34.	<strong>“VAS Licence”</strong> means the Value-Added Services Licence issued by the NCC to the Service Provider authorising the Service Provider to provide the Services to the MTN subscribers under this Agreement.
                            </p>
                        </div>

                        <p>
                        2.	<strong>INTERPRETATIONS</strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            The interpretation and construction of this Agreement shall be subject to the following provisions:
                            </p>

                            <p>
                            2.1.	References to singular includes plural and vice versa while references to any gender includes reference to other gender(s) and vice versa; and references to any person shall include natural persons, partnerships, firms, incorporated bodies and all other legal persons of whatever kind and however constituted;
                            </p>

                            <p>
                            2.2.	Headings are included in this Agreement for ease of reference only and shall not affect the interpretation or construction of this Agreement; and
                            </p>

                            <p>
                            2.3.	The Annexures to this Agreement form an integral part hereof and terms defined in this Agreement shall bear, unless the context otherwise requires, the same meaning in such Annexure.
                            </p>
                        </div>

                        <p>
                        3.	<strong>COMMENCEMENT AND DURATION</strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            3.1.	This Agreement shall commence on the Effective Date and remain in force for a period of {moment(dynamicData.term_of_contract).format("DD/MM/YYYY")}, unless earlier terminated by either of the Parties in accordance with the terms of this Agreement.
                            </p>

                            <p>
                            3.2.	Notwithstanding the Effective Date, this Agreement and all the obligations, representations, covenants, and undertakings that have been exchanged by the Parties shall not take effect until the MTN Intellectual Property (IP) Team has confirmed receipt in writing of a validly existing license, assignments, and/or authorisations to use any third-party owned IP assets and/or rights from the Service Provider.
                            </p>
                        </div>

                        <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 5 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                        </div>
                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        4.	<strong>OBLIGATIONS OF THE SERVICE PROVIDER</strong>
                        </p>

                        <p>
                        The Service Provider undertakes to perform its obligations in addition to any other ancillary duties that may arise as a result of its contractual obligations under this Agreement in accordance with the following terms:
                        </p>

                        <div id="subcontent">
                            <p>
                            4.1.	The Service Provider shall ensure that its organisation and staff are fully compliant with NCC’s legal and regulatory framework (and with the requirement of other applicable regulatory bodies), including but not limited to financial obligations, permits licenses, guidelines and directives; and shall obtain, and maintain the requisite licences, approvals and permits including but not be limited to a valid VAS Licence.
                            </p>

                            <p>
                            4.2.	The Service Provider shall provide adequate training or information guidelines to equip MTN staff with the know-how and technical knowledge to deal with call queries received from MTN Subscribers in respect of the Services.
                            </p>

                            <p>
                            4.3.	,
                            </p>

                            <p>
                            4.4.	The Service Providers shall ensure that the active Short codes and Services as contained in Annexure B shall run on MTN’s Network for the duration of this Agreement and that it shall not send prepaid specific information to post-paid MTN Subscribers and vice versa.
                            </p>

                            <p>
                            4.5.	In the event that MTN removes or suspends the distribution of a specific content, MTN shall notify the Service Provider in writing (e-mail sufficient) and the removal or suspension shall be carried out by the Service Provider without undue delay.
                            </p>

                            <p>
                            4.6.	The Service Provider shall be bound by the standard terms and conditions applicable to MTN Value Added Service partners and all the annexures below:
                            </p>

                            <p>
                            Annexure A	-	Revenue Share Model <br />
                            Annexure B	-	Active Short Code <br />
                            Annexure C	-	Confidentiality and Non- Disclosure Agreement <br />
                            Annexure D	-	Protective Clauses	 <br />
                            Annexure E	-	Information Data and Cyber Security Annex <br />
                            Annexure F	-	Schedule of Infractions and Sanctions <br />
                            Annexure G	-	MTN Business Continuity Management Policy <br />
                            Annexure H 	– 	Data Protection Schedule <br />
                            </p>

                            <p>
                            4.7.	Notwithstanding any other remedies which MTN may have either in law or in equity, any occurrence of the infractions in Annexure F shall be treated as a Material Breach of this Agreement
                            </p>
                        </div>

                        <p>
                        5.	<strong>OBLIGATIONS OF MTN </strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            MTN shall perform the following obligations under this Agreement:
                            </p>

                            <p>
                            5.1.	MTN shall provide access to its Network and/or such other technology or Platform to enable the Service Provider to provide the Services. <br />
                            5.2.	Short codes configured for specific events shall be activated and deactivated, in accordance with extant laws and regulations.
                            </p>
                        </div>

                        <p>
                        6.	<strong>REVENUE SHARE </strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            6.1.	MTN shall pay the Service Provider for the Services according to the Revenue Share Model in Annexure A. The Revenue share models are calculated and paid out based on the Net Revenue. In determining the Net Revenue payable to the Service Provider, MTN shall deduct and remit all applicable Taxes and regulatory fees from the Service Provider’s own share of the Revenue.
                            </p>
                        </div>

                        <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 6 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            <p>
                            6.2.	The Parties agree that the Net Revenue payable to the Service Provider shall be inclusive of stamp duties. The Parties agree that the Service Provider shall bear the stamp duty cost and shall be responsible for the stamping of this Agreement with the relevant tax authority. <br /><br />

                            6.3.	MTN reserves the right to change and implement new Revenue sharing provisions upon giving thirty (30) days prior written notice to the Service Provider. <br /> <br />

                            6.4.	The Service Provider shall be liable to deduct and remit AOL at the applicable rate to NCC from the Service Provider’s share of the Revenue.  <br /><br />
                            </p>
                        </div>

                        <p>
                        7.	<strong>PAYMENT AND TAX DEDUCTIONS</strong>
                        </p>

                        <p>
                        7.1.	Payment shall be made by MTN within thirty (30) days from receipt of an undisputed invoice from the Service Provider, subject to regulatory approvals and in accordance with the Revenue Share set out under Annexure A of this Agreement and the payment terms below:
                        </p>

                        <div id="subcontent">
                            <p>
                            7.1.1.	MTN shall forward its generated logs to the Service Provider not later than the 3rd of every month and the Service Provider shall within twenty (20) Business Days from receipt of the said logs, revert with an invoice to MTN based on the logs.
                            <br /> <br />

                            7.1.2.	In the event of any dispute on the logs, the Service Provider shall within twenty (20) Business Days from receipt of the logs, notify MTN of such disputed which shall be investigated by MTN within three (3) Business Days of such notification.
                            <br /> <br />

                            7.1.3.	Invoices shall be subject to MTN internal payment authorization process, must be on the Service Provider’s letterhead, reference MTN’s log number(s), reflect the Service Provider’s account details
                            <br /> <br />

                            7.1.4.	All the Service Provider‘s billings, invoices and payments shall be in Naira.
                            </p>
                        </div>

                        <p>
                        7.2.	MTN shall within seven (7) Business Days of the discovery of any error on the submitted invoice notify the Service Provider of the error. Invoices with errors shall be returned for correction and payment shall be due thirty (30) Business Days after the corrected invoice is received by MTN.
                        </p>

                        <p>
                        7.3.	If MTN disputes any amount, MTN shall within thirty (30) days of receipt of the invoice, notify the Contractor of the details of the dispute. MTN shall be entitled to withhold payment of the difference between the amount invoiced and that payable and such dispute shall be referred to independent auditors nominated and agreed upon by the Parties. The auditors shall act as experts and not as arbitrators and their decision shall be final and binding on the Parties.  The costs of the auditors in resolving the dispute shall be borne by the Party found to have incorrectly disputed the amounts payable to the Service Provider.
                        </p>

                        <p>
                        7.4.	The Parties agree that pending the resolution of any dispute as to any amount payable by MTN to the Service Provider, the Parties shall continue to observe and perform their respective obligations to one another under this Agreement; and
                        </p>

                        <p>
                        8.	<strong>TAXES AND TAX EXEMPTION CERTIFICATES </strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            8.1.	Each Party shall bear its Tax obligations. Where a party bears Tax obligations on behalf of the other Party, the Party shall be entitled to recover from the Service Provider any such sums and all costs incurred in connection therewith. <br /><br />

                            8.2.	Where, under the provisions of any applicable laws, regulations or directives, MTN is required to deduct any amount or Tax, MTN shall deduct the amount or rate from any amount payable to the Service Provider, in accordance with the provisions of the relevant laws or regulations. Particularly, MTN having been appointed an agent of the Federal Inland Revenue Service (FIRS) for the collection and remittance of Value Added Tax (VAT) shall deduct VAT at the point of payment from any amount payable to the Service Provider. The Service Provider acknowledges that it shall be its responsibility to obtain the withholding credit notes from the FIRS Tax promax platform. <br /><br />

                            8.3.	Where the Service Provider claims to be exempted from any statutory deductions, it shall inform MTN and provide any necessary documentation to support its case, including a certificate of exemption from the relevant authority.
                            </p>
                        </div>

                        <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 7 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        9.	<strong>INFORMATION AND DATA PROTECTION</strong>
                        </p>

                        <div id="subcontent">

                            9.1.	The Service Provider shall respectively make or obtain throughout the term all necessary registrations or filings and notifications which it is obliged to obtain and maintain pursuant to applicable data protection laws, corporate security policies, procedures, standards. For the avoidance of doubt, the Service Provider shall comply with the Nigerian Data Privacy Regulations (NDPR) and other laws or regulations as may be released from time to time. <br /><br />

                            9.2.	In performing the Work, the Service Provider shall respect the fact that MTN shall exclusively determine the purposes of the processing of MTN data and the Service Provider shall not possess or exercise control of the purposes of such processing but shall process in accordance with MTN’s written instructions and in accordance with the terms of this Agreement. In performing the activities contemplated under this Agreement, the Service Provider shall comply with the requirements of a processor applicable to it under data protection laws, regulations and all related legislations and MTN shall comply with the requirements of a controller applicable to it under data protection laws. For the avoidance of doubt, the Parties agrees unequivocally that any customer’s data arising out of or in connection with this Agreement, its subject matter or formation shall be solely owned by MTN. <br /><br />

                            9.3.	In processing MTN data, the Service Provider agrees as part of its provision of the Work to comply with the requests of MTN as related to any obligations of MTN under applicable data protection laws, regulation, corporate security policies, procedures, standards, etc, associated with any duties MTN may have as a controller of data under data protection laws. <br /><br />

                            9.4.	The Service Provider shall not, and it shall ensure that its personnel shall not: <br /><br />
                            <div id="subcontent">
                                9.4.1.	process MTN data in any manner or for any purpose other than as set out in, or in accordance with, this Agreement; or <br />
                                9.4.2.	breach or contravene, or cause MTN to breach or contravene, the provisions of this clause.
                            </div>

                            9.5.	Any breach by the Service Provider of its obligations set out in this clause 9, shall be deemed to be a material breach of this Agreement and shall entitle MTN to terminate this Agreement in accordance with the provisions herein. <br /><br />

                            9.6.	The Service Provider shall supply on request from MTN, all relevant information including audit reports, remediation plan as required by MTN to assess and confirm the Service Provider’s compliance with its obligations in this clause 9. This information shall be provided promptly to MTN and in any event within five (5) Business Days of request at no additional cost. <br /><br />

                            9.7.	In respect of personal information processed in connection with this Agreement, the Service Provider shall: <br /><br />

                            <div id="subcontent">
                                9.7.1.	act only on instructions from MTN regarding the processing of that personal information, and ensure that appropriate technical and organisational measures shall be taken against unauthorised or unlawful processing of the personal information and against accidental loss or destruction of, or damage to, the personal information;
                                <br /> <br />

                                9.7.2.	from time to time comply with any reasonable request made by MTN to ensure compliance with the measures mentioned in clause 9.4;
                                <br /> <br />

                                9.7.3.	take the measures mentioned in clause 9.4 and having regard to the state of technological development and the cost of implementing the measures, so as to ensure a level of security appropriate to: (i) the harm that may result from breach of those measures; and (ii) the nature of the personal information to be protected; and
                                <br /> <br />

                                9.7.4.	take reasonable steps to ensure the reliability of any of its personnel who have access to the Personal Information. <br /><br />
                            </div>

                            9.8.	The Service Provider hereby indemnifies and holds MTN harmless from and against all losses which MTN may incur or suffer pursuant to any and all claims arising as a result of, or to the extent caused by a breach by the Service Provider of its obligations under this clause. <br /><br />
                        </div>

                        <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 8 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            9.9.	The Service Provider shall take all precautions necessary to preserve the integrity of MTN data and to prevent any unauthorised access, corruption or loss of MTN data in its possession or under its control or that of the Service Provider’s Personnel. <br /><br />

                            9.10.	The Service Provider shall not without MTN’s consent, store or transfer any MTN data including but not limited to information relating to its subscriber(s) or personnel outside the location where any of the Service is to be provided. <br /><br />

                            9.11.	Each party shall ensure full compliance with the NITDA Nigerian Data Protection Regulation and any other regulation in force and accepts liability for any breach of such regulation. It shall also ensure: <br /><br />

                            <div id="subcontent">
                                9.11.1.	that Customer Data is not hosted out of the territory of the Federal Republic of Nigeria or obtain NITDA’s approval to host the data where there is no alternative to hosting within the territory of the Federal Republic of Nigeria; <br /><br />

                                9.11.2.	that prior to entering of this Agreement, it discloses any record of data breach and subsequent to this Agreement discloses any data breach to MTN including Customer Data;
                                <br /><br />

                                9.11.3.	procure consent of MTN’s Subscribers prior to marketing or provision of the Services or transfer of the Customer Data and ensure that they have a right to withdraw their consent;
                                <br /><br />

                                9.11.4.	that the MTN’s Subscribers giving consent for the Services have the legal capacity to give the consent;
                                <br /><br />

                                9.11.5.	provide a copy of its privacy policy in a manner accessible to MTN’s Subscribers. <br /><br />

                                9.11.6.	Each party shall take appropriate, technical, and organizational measures to prevent the loss, damage, unauthorized use, or unauthorized destruction of, and unlawful access to data provided.
                                <br /><br />

                                9.11.7.	Each party shall take appropriate steps to identify all internal and external risks posed to data under their possession or control and establish and maintain safeguards against any risks identified. <br /><br />
                            </div>

                            9.12.	Each Party agrees to comply with and maintain adequate measures to ensure that it complies with the provisions and obligations contained under this clause 9.  <br /><br />

                            9.13.	Personal data acquired from both parties shall only be used solely for the purposes of this Agreement and for no other purpose.  <br /><br />

                            9.14.	Nothing in this Agreement shall oblige the Service Provider to disclose any information to the public if it is of the view that to do so would be a breach of this Agreement.  <br /><br />

                            9.15.	A breach of the terms of this clause shall constitute a material breach under this Agreement entitling the aggrieved party to terminate this Agreement. <br /><br />

                            9.16.	<strong><em>Retention of data records:</em></strong> MTN will, retain and use Service Provider’s Personal Information, for as long as it is necessary to maintain the relationship with respect to this transaction and comply with legal and business obligations, resolution of disputes and enforcement of this Agreement. <br /><br />

                            9.17.	MTN, in the implementation of its obligations under this Agreement shall collect personal information of the Service Provider and shall transfer such information to a third-party processor. In performing the activities contemplated under this Agreement, the Service Provider consents to MTN transferring its personal information to such third party with whom MTN has a valid contract, which provide adequate provisions to ensure the protection of the Service Providers personal information. MTN shall comply with the requirements of a data controller and shall ensure that the third-party processor complies with applicable data protection laws, regulations and all related legislations. <br /><br />
                        </div>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 9 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            9.18.	The Service Provider acknowledges that its personal information may be transferred to a jurisdiction outside of Nigeria and the Service Provider shall consent to such transfer, provided that MTN shall take every effort to ensure that the cross border transfer complies with Nigerian Data Protection Law.  <br /><br />

                            9.19.	For more information on our privacy policy and how we manage your data, please refer to https://www.mtnonline.com/about-us/who-we-are/about-us/privacy-and-data-protection-policy/
                                <br />

                            9.20.	<strong>Incidence Response:</strong> <br /><br />

                            <div id="subcontent">
                                9.20.1.	The Service Provider shall at no additional cost to MTN maintain a data breach incident point of contact for liaison with MTN’s Data Protection team. <br /><br />

                                9.20.2.	The Service Provider shall inform MTN of any data breach or suspicion thereof, as soon as technically possible, no later than forty-eight (48) hours after occurrence or suspicion thereof. The Service Provider shall take all steps to mitigate and contain or avoid such breach to prevent it from reoccurring. <br /><br />

                                9.20.3.	The Service Provider shall inform MTN’ of the breaches, cooperate with any supervisory authorities, or law enforcement and ensure that acknowledgement of notification is received from MTN. <br /><br />

                                9.20.4.	The Service Provider is required to provide MTN with updates on progress in resolving any incident until it has been fully mitigated or resolved, or until MTN is satisfied with the results in the form of a report provided by Service Provider . <br /><br />

                                9.20.5.	The Service Provider is required to provide MTN with a Root Cause Analysis (RCA) report on all incidents within twenty four (24) hours of closure of the incident, or within forty eight (48) hours of request from MTN. The RCA must at a minimum provide details of what went wrong, rectification/ remediation actions taken, and controls implemented to prevent reoccurrence of the incident. <br />
                            </div>

                            9.21.	Compliance with MTN’s Right to Audit <br />

                            <div id="subcontent">
                                9.21.1.	The Service Provider shall at no additional cost to MTN, required to provide MTN on an annual basis with a data protection attestation such as NDPR or an equivalent. Where Service Provider is unable to provide the above, MTN reserves the right to select auditors to perform a full system and process audit including data protection in accordance with the audit provisions contained in the Agreement. <br /><br />

                                9.21.2.	The Service Provider may be required to at their own cost and at no additional cost to MTN, perform a re-assessment of the remedial actions taken, and provide the results in form of a report to MTN within a mutually agreed time frame. <br /> <br />
                            </div>

                            9.22.	Each party shall ensure that their internal auditors, consultants, and personnel that are allowed access to any Confidential Information are bound by same confidential obligations as contained in this Agreement <br />
                        </div>

                        <p>
                        10.	CONFLICT OF INTEREST
                        </p>

                        <p>
                        The Service Provider shall take appropriate steps to ensure that neither it nor its Staff is placed in a position where there is or may be an actual, potential or perceived conflict,  between the interests of the Service Provider and MTN The Service Provider shall disclose to MTN full particulars of any such conflict of interest, which may arise including any additional information necessary to fully assess and address such conflict of interest and shall maintain high ethical standards at all times. The Service Provider shall accept any reasonable conflict mitigation strategy employed by the MTN, including but not limited to the use of an independent subservice provider(s) to perform the portion of the Service that gives rise to the actual or potential conflict.
                        </p>

                        <p>
                        11.	<strong>REPRESENTATIONS, WARRANTIES AND COVENANTS</strong>
                        </p>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 10 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkICAgKCgkLDhcPDg0NDhwUFREXIh4jIyEeICAlKjUtJScyKCAgLj8vMjc5PDw8JC1CRkE6RjU7PDn/wAALCABPAIwBAREA/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAcFBgMECAIB/8QATRAAAQIFAQMHBQkOBAcAAAAAAQIDAAQFBhEHEiExEyJBUWFxgQgUkaGxFSMyQlJicqKyFhckMzU2Q1Njc3SCwtI0N1aUdZKzwcPR4v/aAAgBAQAAPwB4wQQQR5WtDaStaglI4lRwBEJPXjbUgSJmvU1tQ4p85SVegHMQ7+q1kMZ2q62o/s2XFexMah1jskHdU3j3Srn/AKjI1q/ZDhwautH0pV3+2JGV1Is2aOG7hkk/vFFv7QET0jVqbURmRqEpND9i8lfsMbsEEEEEEEYpmYZlWFvzDzbLLYytxxQSlI6yTuELS5ta7epZWzS23as+ndtNnYaB+md58AR2wvZrVC/bofVL0VhbKTu5Ony5WvHao5I7xiPCNNNRLjUHaotxO0c7VQnNo/8AKCoj0RNyWgM8rBna/LtdYZl1L9ZKYmGNAqUB7/W55w/MbQj25jZToLbgG+p1Yn6bf9keHNBKAR73Vamk/OLZ/pER81oAwQfNbidQegOyoV6woRAz2hdySp5SRqEhM7O8c5TS/WMeuNLY1Vs3nD3WDCOo+dNAd3OAHoict/XidYUGq9Sm30jcp2VOwsd6TuJ8RDYte97fulAFMqCFP4yZdzmOp/lPHvGRFjgggim6gahUuzJbYc/Cqk4nLUohWDj5Sj8VPrPR04S7TF8atz5cWoiQQvirLcqz2Ab9o+k9cM61tF7cpKUO1Pbq00N55XmtA9iBx/mJhjSkpLSTCWJWXaYZT8FtpAQkeAjNBBBBBBBEBcNm29caVe6dKl3nD+mSnYcH84wYUV16JVCnKM9a86uZDZ20y7qgh5OPkrGAT6D3x8snV6p0Sc9yLwbfdabVyaphaCH2T88cVD63fD3k5uXnpVqalXkPMOpC0OIVlKgekGM0VjUO7GbPtt6oKSlyZWeSlmifhuEHGewYye7HTCW00sib1ArEzcFwPPOSIdy4pRwqac+SD0JG7OOwDs6Kk5SXkZVqVlWW2GGk7KG20hKUjqAEZoqGol8N2PJycy5ILnBMuKbwl0I2cDOd4MZ7AvWRvWlOTcs2qXeZXsPS6lBRR8k56QR09h6o19Q7+kbIlpZTzCpuamVEIYQsJOyOKid+BwHb4GIiX1VYesaZukUh0IYmxK+b8uMnOzztrHzuGIrv3/5T/Tr/APuk/wBsH3/5XH5uv/7pP9sWK89VWLVcpqHKQ7M+fSaZoEPhOxtZ5vA54cYt1o3JJXXQ2KrIkhDnNW2Tzmljik9o9YIPTFRujVVm3ruNvKpDr6wppPLB8JHPAPDHRmGPBFM1E0+p15SKl7KJeqtp94mgPqr60+sdHSCqNKLsn7Muddq1vbbk3XyyUOH/AAz2cAg/JUePRvB689FRzz5RlRceuanU7J5KWleVA+ctRB9SRDwtWks0O3KfTGEhKJdhKTjpVjKj4kk+MS0EJvykvyLR/wCJX9iFZYdyTtj3DKVFbTvmkwgcs1+uZJxlPWQQSO0Edcal3VuoXhW5+tvNrLScYSBlLDWcIT6/EkmHDofSKfXNOZySqcqiZllVFSi2vOCQhvHCILXS1aHb1NpTlJprMot55aVlvPOASMcTFp00sS16tYtJnp6jS78082ouOKKsqO2odB6hFK8ohluXuKkMMpCGm6eEISOAAWoARD6d3PO6eXSqUqiHG5GZ2EzTR37IIBQ6O4EHtBPZG1qg4h7V4OtLStta5RSVJOQoFKMEHqjpcR9gjn7yjKS1K1yl1VpIS5ONKbcI6VNkYPfhQHgIc1mVJyq2nSJ94kuvyja3CelWyMn05hNeUdSXGq3TKulJ5F9gy6iOAWgkjPeFeow4rHrjNxWrTqk0sFTjQS6B8VxIwoekegiJ6CE55SP5Fo38Sv7EYqTp/L3vpXbey+mUnpZLmw+UbWUFxeUkZGR0jq8TGveNky1k6Rz0qh0TE2/NMrmJgJ2dvCuaAOgAesk9MT3k7fmPNf8AEHPsNxGeUl+SaL/EOfZEXTSD/Leifulf9RUKryj/AM6aZ/A/+RUWrUexPuksum1ansg1WRkm+akb32ggEp7SN5HiOmEXSH3X65TS64pwoeZQkqOcJCgAO4COzxH2COd/KCrKKpdEjRpQl1Ug2QsJ3++uEc3vwE+mHlatLNHtql01fw5WWbbX9IJGfXmMN5W3KXXb8zSpvm8oNppwDJacHwVD/v1gkQgrSuOsaT3NM0qrSzipJahy7KTxHAOtE7ju9I3HBG7omh1qnV6nNz9Mmm5mWc4KQeB6iOIPYYkIrl52ZS7ylpZiprmUol1laOQWEnJGN+QYkbdosrbtFlqTJKdVLSwKUF1W0reSd5wOkxhuq3ZK6aOul1BTyZda0rJZUEqyk5G8gxis+1afaFMcp1NU+phbxeJeWFK2iAOIA3c0RhvOy6XeTEszU1zKUSyytHILCTkjBzkGJG3aNK29RpWkySnVS8skpQXVZVvJO84HXEFeWndEvGeZnKm5OJdZa5JPIOBIxknpB37zFpk5ZEpKMyzeS2yhLado5OAMD2RR57SO2Jutrq+zOMPreD5bZdCWwrOdw2TgE7+PTF+ghbam6oyVssPU6luNzVaIKcDnIlu1XWrqT6e2m6MWLNVSqJu+uJWpoLL0sHd6n3Sc8qc9AO8dZ39G99wRX7xs+kXfT/Nakx74jPIzCNzjR7D1dYO4wiqpad66Yz7lRpD7z0kOMzLJ2kKSOh1vfjxyOoxbrW12k3koZuKRVLOcDMSo22z2lB3jwzDQolzUOvICqXVJWaz8RDg2x3pO8eIiXggggggjw662y2px1xLbaRkqUcAeJik3FqvadEC0CfE/MJ/RSY5Tf2q+CPTCprup923rNGlW/KOyjTu7kpTK3lj5y+gd2O0xaLA0WblXG6jdRRMPDnJkUnaQD+0V8buG7rJhzISlCQhICUgYAAwAI+wQQRSrm0vta4lLddkfM5pXF+UIbJPWRjZPiMwsq1oTWJRZdotUl5tKTlKXQWXB3EZB9IiK2dWLV5o92uTR1fhTYH1gBGVjWm8qevk5xiSeUOIflihX1SPZEqxr9Ukj3+hSiz8x9SfaDG0nygXMc62k57J3/wCIxueUBMH8XbjSfpTZP9MR81r1X1giWpdNa7V7ayPrCND74OpVwcyn+dbKuiRkv6sEj0x6a041EuhwOVZx5CCc7dRmycfygqI9Ai6W9oRS5YpcrdRenVDeWWByTfcTvUfDENCjUSl0KV82pcgxKM9IaRgq7SeJPaYkIIIIIIIIIxPyzEynZfZbdT1LSFD1xFTFpW3M/jqBS3D1qlG8+yNU2DaJOfucpnhLpj21Y1qNHKbcpWe2VQfaIkZWh0iUIMtS5Fgj9XLoT7BG+ABwj7BBBBBH/9k=" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="subcontent">
                            11.1.	The Service Provider warrants and represents that it: <br /> <br />

                            <div id="subcontent">
                                11.1.1.	Has the full capacity, authority, all necessary licences, permits, authorizations, consents to enter into and perform this Agreement and the provision of the Service shall not infringe on any third party’s intellectual property rights  <br /> <br />
                                11.1.2.	this Agreement is executed by a duly authorised representative of the Service Provider. <br /><br />
                                11.1.3.	it is solely liable for and shall pay to the relevant collecting society or any licencing authority, all due rates that may be due from time to time. <br /><br />
                                11.1.4.	Is not in default in the payment of any due and payable Taxes or in the filing, registration or recording of any document or under any legal or statutory obligation or requirement which default might have a material adverse effect on its business, assets or financial condition or its ability to observe or perform its obligations under this Agreement. <br /> <br />
                                11.1.5.	Shall provide the Services through the designated Short codes provided by MTN and shall not impinge on any of MTN’s licence obligations or on MTN’s current policies on spam and the use of Short codes which policy shall be provided to the Service Provider upon request. <br /> <br />
                                11.1.6.	Shall be responsible for any delays, delivery system failures, or any other loss or damage resulting from the transfer of data over communications networks and facilities, including the MTN network, and shall be responsible for any limitations, delays and other problems inherent in the use of such communications facilities. <br /> <br />
                            </div>

                            11.2.	The Service Provider covenants not to approach any MTN subscribers directly for the purposes of marketing or selling them the Services or similar services for the duration of this Agreement, and in respect of any MTN Subscriber for the duration of such MTN Subscriber’s contract with MTN for the Service, and for a period of eighteen (18) months thereafter, without obtaining MTN’s prior written permission. <br /><br />

                            11.3.	The Service Provider guarantees the authenticity, accuracy, and integrity of all representations provided to MTN and undertakes to pay MTN for all extra costs occasioned by any discrepancies, errors or omissions therein. <br /><br />

                            11.4.	The Service Provider warrants that MTN and MTN Subscriber’s use of the Services under this Agreement will be uninterrupted and error-free and/or will meet MTN Subscribers’ or any End-User’s requirements; <br /><br />

                            11.5.	The Service Provider warrants that its agents, sub-Service Providers, staff and connected persons shall not use the Short codes provided by MTN under this Agreement for any other purpose(s) other than for the Services. <br /><br />

                            11.6.	The Service Provider covenants that it shall streamline all outgoing SMS messages to comply with the NCC guidelines and directives; including but not limited to restricting same to only informative, educative, reward loyalty schemes and must exclude all lotteries. <br />
                        </div>

                        <p>
                        12.	<strong>CONFIDENTIALITY</strong>
                        </p>

                        <div id="subcontent">
                            12.1.	In accordance with the provisions of the Confidentiality and Non-Disclosure Agreement in Annexure C of this Agreement, the information provided by or accessed from MTN pursuant to the provisions of this Agreement shall remain the property of MTN and are confidential.  The Service Provider shall not, without the prior written consent of MTN, use the information provided by MTN in furtherance hereof except for the implementation of this Agreement. The Service Provider shall ensure that third parties, its staff and sub-Service Providers who are necessarily given access to Confidential Information, trade secrets or any new technology developed or acquired in performing the Services, keep the information confidential. <br /><br />

                            12.2.	if required by Law or valid regulatory process, the Service Provider may disclose Confidential Information, with prior written notice to MTN and shall reasonably cooperate with MTN to maintain the confidentiality of such Confidential Information.  <br /><br />

                            12.3.	The provisions of this clause shall survive the termination of this Agreement for a period of one (1) year from the date of the termination of this Agreement. <br />
                        </div>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 11 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        13.	<strong>INTELLECTUAL PROPERTY RIGHTS</strong>
                        </p>

                        <div class="subcontent">
                            13.1.	The entire right, title and interest in and to all Intellectual Property shall be and remain vested with the Party who owns or controls such Intellectual Property, and nothing in this Agreement grants or purports to grant or shall be interpreted to imply the granting of any right, title or interest of whatever nature to a Party in the background Intellectual Property of the other Party otherwise than as explicitly provided for in this Agreement. All Intellectual Property subsequently created by Parties in connection with this Agreement shall vest in MTN. <br /><br />

                            13.2.	Parties shall obtain written consent before using the trademarks and brands of the other party and shall comply with the brand guidelines, and any other terms and conditions of the consent. <br /><br />

                            13.3.	The Indemnified Party shall notify the other Parties in writing of any Service Provider IPR Claim of which the Indemnified Party has received express written notice <br /><br />

                            13.4.	The Service Provider shall procure that its insurers (as relevant) shall, keep MTN updated at all times on all progress and developments relating to the Service Provider IPR Claim and any counterclaim. <br /><br />

                            13.5.	The Service Provider shall indemnify MTN, including its directors, officers, agents, employees, affiliates, independent Service Provider and sub-service provider to the fullest extent, for any incidental, indirect, special or consequential damages, or any loss of use, goodwill, revenue or profit, by any person, entity or organisation, including, without limitation, MTN or its affiliates, claimed or resulting from such claims. <br /><br />

                            13.6.	e Service Provider undertakes that it is unaware of any third-party copyright, trademark, patent or other IPRs that would be infringed by the use of the Licence by MTN. If MTN is charged with infringement of a third party’s patent, trademark, copyright or other intellectual property rights as a result of the use of the Licence, The Service Provider will, at no expense to MTN, a) take the place of MTN against such charge, claim or suit;  b) apply its best efforts to procure for MTN the right to continue the use of the Service, to the extent that this is legally permissible; or c) apply its best efforts to modify the Service so to cease, desist and cure the infringement, provided that such modification can be done without substantially impairing its functionality or performance of the Service provided to MTN. <br />
                        </div>

                        <p>
                        14.	<strong>RIGHT OF AUDIT </strong>
                        </p>

                        <div id="subcontent">
                            14.1.	MTN shall have the right to audit the Service Provider’s performance of the Services under this Agreement. The Service Provider shall arrange for MTN to have access to the premises and to all locations and documentation relevant to the Services. The Service Provider shall make available appropriate employees to assist MTN in the performance of its audit.  <br /><br />

                            14.2.	The Service Provider warrants to MTN that it has or will upon the coming into effect of this Agreement undertake a Systems audit to ensure adequate controls, safeguards, security and effective internal controls to protect the integrity of the information of MTN. <br /><br />

                            14.3.	The Service Provider undertakes that the systems audit shall be carried out in accordance with the International Standard on Auditing (ISA) 402 – (Audit Considerations Relating to Entities Using Service Organisations) or such other similar internationally recognized systems auditing standard. <br /><br />

                            14.4.	MTN shall reserve the right to appoint an independent auditor to conduct a systems audit of the Service Provider as it may require in its absolute discretion notwithstanding that the Service Provider has confirmed to MTN that it has conducted a Systems audit. <br /><br />

                            14.5.	The Service Provider shall establish and maintain a reasonable accounting system that enables MTN readily identify the Service Provider’s assets, expenses, costs of goods, and use of funds. MTN and its authorized representatives shall have the unrestricted right to audit, examine, and to make copies of, or extracts from all financial and related records (in whatever form they may be kept, whether written, electronic, or other) relating to or pertaining to this Agreement kept by or under the control of the Service Provider, including, but not limited to those kept by the Service Provider, its employees, agents, assigns, successors, and sub-Service Providers. Such records shall include, but not be limited to, accounting records, deposit slips, bank statements, all paid vouchers including those for out‐of‐pocket expenses, other reimbursement supported by invoices, original estimates, written policies and procedures and other correspondence.
                        </div>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 12 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">

                            14.6.	The Service Provider undertakes to permit MTN to conduct such other audits of its operations and processes as may be applicable or relevant to the performance of the Service Provider’s obligations under this Agreement. Such further audits shall be carried out under terms to be decided upon by MTN at its sole discretion. Provided however that the Service Provider may make specific requests to MTN for the exclusion of any information with respect to which the Service Provider has been placed under an obligation of confidentiality.  <br />
                        </div>

                        <p>
                        15.	SUB-SERVICE PROVIDERS
                        </p>

                        <div id="subcontent">
                            15.1.	Neither Party shall subcontract all or any part of its obligations under this Agreement without the other Parties’ prior written approval, unless such sub-contracting is made towards an affiliate company. In the latter case, the subcontracting Party shall inform the other Parties. Where approval is granted, each Party shall bind every subservice Provider to the terms of this Agreement but shall remain responsible to the others for any obligations which are performed by subservice Providers as if such obligations were performed by the Party.  <br /><br />

                            15.2.	No provision whatsoever of this Agreement will be deemed to create a contractual relationship between MTN and the subservice Provider, nor between MTN and employees of the Service Providers or any subservice Provider.   <br /><br />
                        </div>

                        <p>
                        16.	ASSIGNMENT OF AGREEMENT
                        </p>

                        <p>
                        The Service Provider shall not be entitled to cede its rights or delegate its obligations under this Agreement in whole or in part whether voluntarily or by operation of law, without the prior written consent of MTN, provided such consent shall not be unreasonably withheld; provided, however, that a Party shall be entitled to assign this Agreement to its Affiliates (where “Affiliate” means any entity that directly or indirectly controls or is controlled by, or is under common control with, a Party, upon written notification of such assignment to the other Parties.
                        </p>

                        <p>
                        17.	AMENDMENTS/VARIATION/WAIVER
                        </p>

                        <p>
                        No amendments, interpretation, or waiver of any of the provisions of this Agreement shall be effective unless reduced into writing and signed by duly authorized representatives of the Parties. Failure or delay on the part of a Party to exercise any right, power or privilege shall not operate as a waiver of such right, power or privilege.
                        </p>

                        <p>
                        18.	SEVERABILITY
                        </p>

                        <p>
                        If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be severed and the remainder of the provisions shall remain in full force and effect as if this Agreement has been executed with the invalid provision eliminated.  If any provision of this Agreement is so found to be invalid or unenforceable but would be valid or enforceable if some part of the provision were deleted, the provision in question shall apply with such modification as may be necessary to make it valid.
                        </p>

                        <p>
                        19.	RELEASE AND INDEMNITY
                        </p>

                        <div id="subcontent">
                            19.1.	The Service Provider shall be liable for and hereby indemnifies MTN against any liability, direct loss, claim and/or proceedings whatsoever, arising under any statute or at common law, in respect of any personal injury or death of any person howsoever arising pursuant to or during the implementation of this Agreement; provided that such injury or death is due to the negligent act or omission of the Service Provider, its servants, agents, personnel and/or key personnel or subservice provider, or a breach by the Service Provider  of any of the provisions of this Agreement. <br /><br />

                            19.2.	The Service Provider shall be liable for and hereby indemnifies MTN  against any expense, liability, direct loss, claim and/or proceedings in respect of any loss, injury or damage whatsoever to any property (movable or immovable) insofar as such loss, injury or damage arises out of or pursuant to the implementation of this Agreement; provided such loss, injury or damage arises out of any negligent act or omission by the Service Provider, its servants, agents or subservice provider, or any breach by the Service Provider of the provisions of this Agreement. <br /><br />
                        </div>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 13 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            19.3.	The Service Provider indemnifies MTN to the fullest extent for any breach of its obligations, representations and warranties contained in this Agreement; including but not limited to claims by any regulatory authority arising from a breach of the obligations of the Service Provider in obtaining the requisite licenses and/or third party claims for infringement of Intellectual Property Rights  in respect to the operation of the Services or use of the Confidential Information by the Service Provider contrary to the terms of this Agreement. <br /><br />
                        </div>

                        <p>
                        20.	LIMITATION OF LIABILITY
                        </p>

                        <div id="subcontent">
                            20.1.	Neither Party limits its liability for: <br /><br />

                            <div id="subcontent">
                                a.	Loss of property; <br />
                                b.	Loss of data provided by a Party;  <br />
                                c.	A claim of infringement of Intellectual Property of a Party or a third party;  <br />
                                d.	Confidential Information disclosed by a Party in accordance with the Confidentiality and Non-Disclosure Agreement in Annexure C;  <br />
                                e.	Negligence of a Party resulting in a loss incurred by the other Party;  <br />
                                f.	Death or personal injury caused by its negligence, or that of its employees, agents or subService Providers provided such death or injury is not caused by the acts, omission or negligence of the other Party; or   <br />
                                g.	fraud by it or its employees. <br /><br />
                            </div>

                            20.2.	Except as may be specifically provided in this Agreement, neither Party shall be liable to the other for any type of special, indirect and/or Consequential Losses or damages arising under statutory or common law, including but not limited to loss of profits, loss of business opportunities, loss of income, loss of use, loss of goodwill, loss of revenue or related third party claims.  <br />
                        </div>

                        <p>
                        21.	<strong>CONDITIONS PRECEDENT TO OBLIGATIONS OF MTN</strong>
                        </p>

                        <div id="subcontent">
                            21.1.	The Service Provider hereby agrees and acknowledges that: <br />

                            <div id="subcontent">
                                21.1.1.	the conclusion of copyright agreement(s) (or any other agreement whatsoever called) with the respective collecting societies, licencing authorities and artists after a due and diligent copyright clearance exercise shall be a condition precedent to uploading any   ringtones, caller tunez, wallpapers, videos and or any other content or value added service to be provided pursuant to this Agreement; <br /><br />

                                21.1.2.	MTN shall be provided a copy of such copyright agreement(s) for its review and concurrence; <br /><br />

                                21.1.3.	all copyright agreements with respective collecting societies, licencing authorities and artists and copyrights owners shall include the clauses expressed in and referred to as Protective Clauses in Annexure D to this agreement; <br /><br />

                                21.1.4.	MTN reserves the right to modify the Protective Clauses at anytime provided that such modification shall be communicated to the Service Provider in writing; <br /><br />

                                21.1.5.	It shall ensure a verbatim inclusion of any modification to the Protective Clauses in all copyright agreements used for the provision of service under this agreement within sixty (60) days of being advised by MTN of such modification; and  <br /><br />

                                21.1.6.	MTN reserves the right to suspend the publication of contents provided by the Service Provider in the event that the Protective Clauses in Annexure D are not included in the Copyright Agreements used for the provision of the Service under this Agreement.  <br /><br />
                            </div>

                            21.2.	The Service Provider further agrees and acknowledges that: <br />
                        </div>

                        <div class="footer" >
                                <table >
                                    <tr>
                                        <td >
                                            CONFIDENTIAL AND PROPRIETARY <br />
                                            MTN NIGERIA <br />
                                            MTNN0-CS-CL-CON- <br />
                                            NIO21- <br />
                                            Page 14 of 17
                                        </td>
                                        <td >
                                            MTN
                                        </td>
                                        <td >
                                            <br /><br />
                                            Service Provider
                                        </td>
                                        <td >
                                            INITIALS
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  >
                                            Sensitivity:MTN Group - internal
                                        </td>
                                    </tr>
                                </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="subcontent">
                            <div id="subcontent">
                                21.2.1.	MTN is not in the business of distributing or selling the Services including musical works. MTN only offers its network and or platform for the use by the Service Provider to upload non-infringing content including musical works that have been permitted by the owners of copyright in the said contents; and <br /><br />

                                21.2.2.	The permission granted by MTN to the Service Provider to deploy the Services or any other content on its platform is limited only to the uploading of non-infringing works, that is, any content that has been authorized by the owner of the copyright in the content. <br /><br />

                                21.2.3.	The Service Provider undertakes to clear the copyright to the content it uploads by obtaining the permission and/ or consent of the owner of the said copyrighted work in any content it uploads on the MTN platform. <br /><br />
                            </div>

                        </div>

                        <p>
                        22.	<strong>SET OFF</strong>
                        </p>

                        <p>
                        MTN shall have the right to set off any loss, damage, liability or claim, which it may have against the Service Provider against payment it, may owe the Service Provider.
                        </p>

                        <p>
                        23.	<strong>TERMINATION</strong>
                        </p>

                        <div id="subcontent">
                            23.1.	Either Party may terminate: <br /><br />
                            <div id="subcontent">
                                a.	by giving thirty (30) days prior written notice (in the case of MTN seeking to terminate) and ninety (90) days prior written notice (in the case of the Service Provider seeking to terminate) to the other Party; <br />
                                b.	by notice in writing to the other Party in the event of a provisional or final liquidation (otherwise than for the purpose of reconstruction or merger) or under provisional or final receivership or judicial management; or insolvency
                            </div>
                            <br /><br />

                            23.2.	MTN may terminate: <br /><br />
                            <div id="subcontent">
                                a.	With notice, if the Service Provider fails to take steps reasonably satisfactory to MTN to remedy a breach within five (5) days of receiving a notice from MTN specifying the nature of the breach and calling for it to be remedied. <br />
                                b.	without notice if the Service Provider commits a material breach (which impedes the delivery or receipt of the Services). <br />
                                c.	without notice if the Service Provider is guilty of any criminal offence which in MTN’s opinion affects the Service Provider’s Work in terms of this Agreement.  <br />
                                d.	without notice if the Service Provider is in persistent breach of any of the provisions of this Agreement (a breach that occurs more than two (2) times during the term of this Agreement).
                            </div>
                            <br /><br />

                            23.3.	This Agreement shall immediately terminate, without notice, where the Service Provider loses or does not renew the licence, permit or authority to provide the Services or where extant provision/regulatory requirements invalidate the transaction under this Agreement. <br /><br />

                            4.	Upon termination: <br /><br />
                            <div id="subcontent">
                                a.	Except as otherwise expressly provided herein, all rights and obligations contained herein shall cease, without prejudice to the rights and obligations relating to the period prior to such termination and any continuing obligations or liabilities under this Agreement or at Law. <br />
                                b.	Either Party shall return to the other Party all documents, property and information, acquired by the Party in the course of implementing this Agreement or destroy, and give a signed, written undertaking to the other Party that it has so destroyed, all information and documentation relating to this Agreement, which exists in any format.
                            </div>
                            <br /><br />

                            23.5.	MTN shall upon termination of this Agreement, deactivate all Short Codes configured and activated for the Services on the MTN Network. <br /><br />

                            23.6.	In the event of a withdrawal or suspension of the VAS Licence by the NCC at any time, the Service Provider shall be obliged to immediately inform MTN, and MTN shall be at liberty to immediately terminate this Agreement. <br />
                        </div>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 15 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        24.	<strong>INDUCEMENTS, FRAUD AND ANTI-CORRUPTION</strong>
                        </p>

                        <div id="subcontent">
                            24.1.	The Service Provider hereby undertakes that they will comply with all Anti-Corruption Laws and any other applicable law.  <br /><br />

                            24.2.	The Service Provider shall not offer any person any gift or consideration as an inducement or reward for doing or not doing any act in relation to this or any other Agreement. All cases of inducement involving an MTN employee or other third party,  should be reported by calling the MTN “tip-offs anonymous line +23408031230141 (toll free) and/or MTN Internal Fraud Hotline Number (+23408032005500) or by sending an email to MTNNFraudManagement@mtn.com. The Service Provider may also log on to www.tip-offs.com web site and make an anonymous report. <br /><br />

                            24.3.	The Service Provider further warrants that: it or any of its associated parties have not been found guilty, by any court or to the best of its knowledge been investigated for any criminal activities prior to the date of this Agreement. Where the Service Provider has been investigated as aforementioned, the Service Provider has disclosed such fact before the Effective Date of this Agreement. MTN may terminate this Agreement with immediate effect upon written notice-as of right and without any legal implication; if during the term of this Agreement, the Service Provider is suspected or convicted of any criminal offence even if not connected to this Agreement. <br /><br />

                            24.4.	To the extent permitted by the Applicable Laws, the Service Provider shall indemnify MTN, MTN Directors and officers, against any losses, liabilities, damages, costs (including legal fees) and expenses incurred by or awarded as a result of any breach of this clause and the entire Agreement. Furthermore, any breach of this clause by the Service Provider or by the Service Provider’s or its associated parties (whether with or without the knowledge of the Service Provider shall entitle MTN to terminate this Agreement in addition to other remedies available to MTN at law  <br /><br />
                        </div>

                        <p>
                        25.	<strong>FORCE MAJEURE</strong>
                        </p>

                        <div id="subcontent">
                            <p>
                            25.1.	The Parties shall not be liable for loss or damage arising out of any delay or failure of performance caused by a Force Majeure Event. However, the time within which the Service Provider is required to perform any act under this Agreement shall be extended where the delay in the performance of the act is due to any of the Force Majeure. In this regard, the Service Provider shall:
                            </p>

                            <div id="subcontent">
                                25.1.1.	Notify MTN promptly of the occurrence of the event resulting in the delay; <br /><br />

                                25.1.2.	Use its best endeavours to abate the delay, as far as possible; and <br /><br />

                                25.1.3.	Perform the act delayed immediately after the abatement of the unavoidable delay unless MTN had instructed it not to perform same, or the act delayed is no longer necessary in the opinion of MTN given changed circumstances.  In the latter case, the Service Provider shall, immediately after the abatement of the delay, confirm from MTN the necessity or otherwise of performing the delayed act.
                            </div>

                            <p>
                            25.2.	If the event constituting the force majeure continues for a period of sixty (60) days, then MTN shall be entitled to terminate this Agreement by giving two (2) weeks’ notice in writing to the Service Provider.
                            </p>
                        </div>

                        <p>
                        26.	<strong> GOVERNING LAW AND DISPUTE RESOLUTION</strong>
                        </p>

                        <p>
                        This Agreement shall be governed by and construed in accordance with the Laws of the Federal Republic of Nigeria. In the event of a dispute or difference between the Parties in connection with or in relation to this Agreement or its performance, construction or interpretation, the party alleging the dispute shall provide a written notice, giving particulars of the Dispute (the Notice of Dispute) to the other Party. Dispute resolution shall be by negotiation, followed by mediation if unresolved and litigation in it remains unresolved.
                        </p>

                        <p>
                        27.	<strong>ENTIRE AGREEMENT</strong>
                        </p>

                        <p>
                        This Agreement contains all the entire agreement reached by the Parties with regard to the subject matter of this Agreement and the Parties waive the right to rely on any other terms not contained in this Agreement.
                        </p>

                        <p>
                        28.	<strong>PARTNERSHIP</strong>
                        </p>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 16 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="border-2 mb-8 border-white/20 p-8 rounded-xl flex flex-col justify-center items-center pt-8 text-white max-w-4xl">
                        <div id="header-table">
                            <div class="table-header">
                                <div className="relative w-full mb-4">
                                    
                                    <img src="data:image/jpeg;base64,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" alt="" className="w-24 absolute left-0 top-0"  />
                                    
                                    <div className="flex justify-center flex-col w-full ">
                                        <p className="text-white text-center">Created: </p>
                                        <p className="text-white text-center">
                                            {moment(dynamicData.date_of_contract).format("DD/MM/YYYY")}.
                                        </p>
                                    </div>

                                </div>
                                <div>
                                    <div  >
                                        AGREEMENT FOR THE PROVISION OF VALUE-ADDED SERVICES BETWEEN MTN NIGERIA COMMUNICATIONS PLC AND {dynamicData.company_name?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>
                        Nothing in this Agreement shall be construed as creating a partnership, an employment relationship or a relationship of principal and agent between MTN and the Service Provider. For the provision of the Services under this Agreement, the Service Provider shall be strictly an independent Service Provider.
                        </p>

                        <p>
                        29.	<strong>NOTICES</strong>
                        </p>

                        <p>
                        29.1.	Any written notice in connection with this Agreement shall be addressed to the address provided in this Agreement and shall be addressed to
                        </p>

                        <div id="subcontent">
                            <p>
                            In the case of MTN to:
                            </p>

                                Attention: 	Chief Digital Officer <br />
                                Cc:		GM, Corporate Transactions
                            <br /><br />

                            <p>
                            In the case of the Service Provider to:
                            </p>
                                Attention: Chief Executive Officer
                        </div>

                        <p>
                        29.2.	A Party may change that Party's address, by prior notice in writing to the other Party:
                        </p>

                        <div id="subcontent">
                            29.2.1.	If any notice is to be sent by mail, it shall be sent by prepaid registered mail and shall then be deemed to have been received five (5) days after the date of posting until and unless the contrary is proved. <br />

                            29.2.2.	If any notice is delivered by hand, it will be deemed to have been received on proof of the date of delivery.
                        </div>

                        <p>
                        <strong>IN WITNESS WHEREOF</strong>, the Parties have duly executed two original copies of this Agreement as of the day and year first written above.
                        </p>

                        <table border="0">
                            <tr>

                                <td>
                                    <div class="signature">
                                        <p>
                                        For and on behalf of: <br />
                                        <strong>MTN NIGERIA COMMUNICATIONS PLC </strong>
                                        </p>
                                        <p>
                                            Name: MTN Signee
                                        </p>

                                        <p>
                                            Signature: <img src=":MTN_SIGNATURE" />
                                        </p>

                                        <p>
                                            Designation:
                                        </p>

                                        <p>
                                            Date: :WITNESS_SIGN_DATE
                                        </p>
                                    </div>
                                </td>

                                <td>
                                    <div class="signature">
                                        <p>
                                        For and on behalf of: <br />
                                        <strong>{dynamicData.company_name?.toUpperCase()} </strong>
                                        </p>
                                        <p>
                                            Name: :DIRECTOR_DELEGATE_NAME
                                        </p>

                                        <p>
                                            Signature: <img src=":DIRECTOR_DELEGATE_SIGNATURE" />
                                        </p>

                                        <p>
                                            Designation:
                                        </p>

                                        <p>
                                            Date: :DIRECTOR_DELEGATE_SIGN_DATE
                                        </p>
                                    </div>
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <div class="signature">
                                        <p>
                                            <strong>Witness:</strong>
                                        </p>
                                        <p>
                                            Name: MTN Signee
                                        </p>

                                        <p>
                                            Signature: <img src=":MTN_SIGNATURE_TWO" />
                                        </p>

                                        <p>
                                            Designation:
                                        </p>
                                    </div>
                                </td>

                                <td>
                                <div class="signature">
                                        <p>
                                            <strong>Witness:</strong>
                                        </p>
                                        <p>
                                            Name: :WITNESS_NAME
                                        </p>

                                        <p>
                                            Signature: <img src=":WITNESS_SIGN" />
                                        </p>

                                        <p>
                                            Designation:
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <div class="footer" >
                            <table >
                                <tr>
                                    <td >
                                        CONFIDENTIAL AND PROPRIETARY <br />
                                        MTN NIGERIA <br />
                                        MTNN0-CS-CL-CON- <br />
                                        NIO21- <br />
                                        Page 17 of 17
                                    </td>
                                    <td >
                                        MTN
                                    </td>
                                    <td >
                                        <br /><br />
                                        Service Provider
                                    </td>
                                    <td >
                                        INITIALS
                                    </td>
                                </tr>
                                <tr>
                                    <td  >
                                        Sensitivity:MTN Group - internal
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </div>

                    <div className="max-w-4xl px-0 my-4">
                        <h1 className="text-white text-2xl font-bold mb-4">Signatures</h1>
                        <div className="flex ">
                            <div className="w-10 flex mr-4">
                                <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" />
                            </div>
                            <div>
                                <p className="text-gray-300">By selecting this checkbox, I agree to MTN's <strong>Electronic Record and Signature Disclosure.</strong></p>
                            </div>
                        </div>

                        <div className="flex space-x-4 my-8">

                            <div className="p-4 w-1/2 h-80 bg-white/10 hover:bg-white/20  rounded-xl border-1 border-gray-500 flex flex-col">
                                <h1 className="text-white text-center text-xl font-bold">Director's signature</h1>

                                <div className="border-4 text-yellow-500 mouseover:flex border-yellow-500 w-full h-32 mt-8 flex justify-center items-center cursor-pointer" 
                                        onClick={() => showDirectorSigning()}>
                                    Click to Sign here
                                </div>
                            </div>

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">Witness's Signature</h1>
                                <p className="text-gray-300 text-center">Once a witness signs, their signature will appear here. The witness will be able to sign once the director has signed</p>

                            </div>

                        </div>

                        <div className="flex space-x-4 my-8">

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">MTN's Signature</h1>
                                <p className="text-gray-300 text-center">Once every party has signed, the signed contract from MTN will appear here</p>

                            </div>

                            <div className="w-1/2 h-80 bg-white/10 rounded-xl border-1 border-dashed hover:bg-white/20 border-gray-500 flex flex-col space-y-4 items-center justify-center">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-16 h-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                                <h1 className="text-white text-center text-xl font-bold p-4">MTN's Signature</h1>
                                <p className="text-gray-300 text-center">Once every party has signed, the signed contract from MTN will appear here</p>

                            </div>

                        </div>

                    </div>     

                    {!submitingContractSignatures &&
                        <div className="flex py-4 px-2 space-x-4 justify-end max-w-4xl">
                            <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {}}>Back</button>
                            <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {router.back()}}>Finish</button>
                        </div>
                    }
                    {submitingContractSignatures &&
                        <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                        </div>
                    }  

                    {signingModal && 
                        <div id="signing_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "signing_modal") {setSigningModal(false);}}}>
                            <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
                                <div className="flex pt-8 pb-4">
                                    <div className="text-white text-2xl mb-4 flex-1">Adopt a Signature</div>                                
                                </div>

                                {errors && errors["error"] && (
                                    <div className="mb-6">
                                        <FormErrors error={errors["error"]} />
                                    </div>
                                )}

                                <TextInput
                                    id="fullname"
                                    label="Full name"
                                    // value={data.role_name}
                                    onChange={(e) => {}
                                    }
                                    errors={errors}
                                />
                                
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                        <li className="mr-2" role="presentation" onClick={() => {if(!activeSigningTab.selectStyle) setActiveSigningTab({upload: false, selectStyle: true})}}>
                                            <button className={`inline-block p-4 border-b-2 ${activeSigningTab.selectStyle ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeSigningTab.selectStyle ? 'text-yellow-500' : 'text-white'}`} id="style-tab" data-tabs-target="#style" type="button" role="tab" aria-controls="style" aria-selected="false">Select style</button>
                                        </li>
                                        <li className="mr-2" role="presentation" onClick={() => {if(!activeSigningTab.upload) setActiveSigningTab({upload: true, selectStyle: false})}}>
                                            <button className={`inline-block p-4 border-b-2 ${activeSigningTab.upload ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeSigningTab.upload ? 'text-yellow-500' : 'text-white'}`} id="upload-tab" data-tabs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Upload</button>
                                        </li>
                                    </ul>
                                </div>


                                <div id="myTabContent">
                                    {/* First tab */}
                                    <div className={`${activeSigningTab.selectStyle ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="style" role="tabpanel" aria-labelledby="style-tab">
                                        <div className="mb-4 rounded-xl bg-white/20 flex flex-col p-4 space-y-4">    

                                            <div className="flex justify-between">

                                                <span className="text-gray-200">Preview</span>

                                                <span className="cursor-pointer text-yellow-500" onClick={() => setClearCanvas(!clearCanvas)}>Clear</span>

                                            </div>          

                                            <div className="rounded-xl bg-black border-1 border-dashed border-gray-200 flex p-2 w-full space-x-4 items-center justify-center">

                                                <canvas
                                                    ref={canvas}
                                                    onMouseDown={onDown}
                                                    onTouchStart={onDown}
                                                    onMouseUp={onUp}
                                                    onTouchEnd={onUp}
                                                    onMouseLeave={onUp}
                                                    onMouseMove={onMove}
                                                    onTouchMove={onMove}
                                                    width={canvasWidth}
                                                    height={canvasHeight}
                                                    id="signature_canvas"
                                                    className="border-1 border-gray-500"
                                                />
                                                
                                            </div>    
                                                                                 

                                        </div>
                                        <div className="flex m-4">
                                            <div className="w-12 flex justify-end mr-4">
                                                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
                                            </div>
                                            <div>
                                                <p className="text-gray-500">By selecting Adopt and sign, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legallyy binding contracts - just same as pen-and-paper signature or initial</p>
                                            </div>
                                        </div> 
                                        <div className="">
                                            {!signing &&
                                                <div className="flex py-4 px-2 space-x-4 justify-end">
                                                    <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setDisableActiveButton(true); setSigningModal(false);}}>Cancel</button>
                                                    <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full font-bold" disabled={disableActiveButton} onClick={() => {signContract()}}>Adopt Sign</button>
                                                </div>
                                            }
                                            {signing &&
                                                <div className="flex px-4">
                                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                                                </div>
                                            }
                                        </div> 
                                    </div>

                                    {/* Second tab */}
                                    <div className={`${activeSigningTab.upload ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="upload" role="tabpanel" aria-labelledby="upload-tab">
                                        
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
                                                    <p className="text-white text-md">Your signature</p>
                                                    <p className="text-gray-500 text-sm">Drag and drop here or</p>
                                                </div>

                                                <div className="flex flex-col justify-end space-between items-end space-y-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                                    </svg>
                                                    <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#uploaded_signature").click()}>Choose file</button>
                                                    <input type="file" className="opacity-0 w-1 h-1" id="uploaded_signature" accept=".png" onChange={(e) => {convertFile(e)}}/>                   
                                                </div>

                                            </div>          
                                            
                                        </div>

                                        <div className="flex m-4">
                                            <div className="w-12 flex justify-end mr-4">
                                                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />                                            
                                            </div>
                                            <div>
                                                <p className="text-gray-500">By clicking this checkbox I agree that the user I've entered is a delegate of the Company and is authorized to sign this contract on behalf of the company</p>
                                            </div>
                                        </div>

                                        <div className="">
                                            {!signing &&
                                                <div className="flex py-4 px-2 space-x-4 justify-end">
                                                    <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setDisableActiveButton(true); setSigningModal(false);}}>Cancel</button>
                                                    <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full font-bold" disabled={disableActiveButton} onClick={() => {signContract()}}>Adopt Sign</button>
                                                </div>
                                            }
                                            {signing &&
                                                <div className="flex px-4">
                                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    }  

                    {      
                        successModal && 
                        <div id="success_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "success_modal") {setSuccessModal(false);}}}>
                            <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4">
                                
                                <div className="flex pt-8 pb-4 justify-center items-center">
                                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                    </svg>  
                                </div>              
                                </div>
                                
                                <div className="flex pt-8 pb-4 flex-col space-y-4">
                                    <p className="text-white text-2xl mb-4 flex-1 text-center">You've finished signing</p>  
                                    <p className="text-gray-500 text-md mb-4 flex-1 text-center">You'll receive an email copy once everyone has signed</p>              
                                </div>

                                <div className="">              
                                    <div className="flex py-4 px-2 space-x-4 justify-center">
                                        <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {setSuccessModal(false); router.back()}}>Continue</button>
                                    </div>              
                                </div>

                            </div>
                        </div>        
                    }          

                </div>


                
           </>
}

