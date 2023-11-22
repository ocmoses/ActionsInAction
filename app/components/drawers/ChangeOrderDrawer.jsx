"use client";
import { useState, useEffect, useCallback } from "react";
import SideDrawer from "@/app/components/dashboard/SideDrawer";
import useErrors from "@/hooks/useErrors";
import useAdmins from "@/hooks/useAdmins";
import useContractSettings from "@/hooks/useContractSettings";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import FileViewer from "@/app/components/modals/FileViewer";
import Success from "@/app/components/toasts/Success";
import { TailSpinPreloader } from "@/app/components/Icons";
import FormErrors from "@/app/components/FormErrors";



export default function ChangeOrderDrawer({request, openDrawer, closeAction, refresh}){

    const {
        approveChangeOrder,
        rejectChangeOrder        
    } = useAdmins();

    const {tabs} = useContractSettings();

    const [expanded, setExpanded] = useState(null);

    const [declining, setDeclining] = useState(null);

    //Used to control the action of approving or declining
    const [approving, setApproving] = useState(false);

    const [typedReason, setTypedReason] = useState("");

    const [fileViewer, setFileViewer] = useState(null);
    
    const [data, setData] = useState({partner_uuid: request?.partner_uuid, contract_id: request?.contract_id, 
                                        status: "", change_order_request_type: "", reasons_for_rejection: ""});
  

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [successToast, setSuccessToast] = useState(false);
    const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false);
                                                  refresh();
                                                }, 3000);

    const reasons = [
        "",
        "It doesn't exist",
        "I can see this clearly",
        "Something else entirely",
        "Others"
    ];
    
    const handleChange = (e) => {
        setTypedReason(e.target.value);
        console.log("Typed reason", typedReason);
    };

    const approve = () => {

        clearErrors();        

        setApprovalType();

        setApproving(true);

        data.reasons_for_rejection = "";
        data.status = "approved";

        setTimeout(() => {

            approveChangeOrder(data)
                .then(resp => {setApproving(false); resp.error ? setError({error: resp.error}) : showSuccess(resp.message)})
                .catch(error => {console.log(error); setError({error: "An error occurred"})});

        }, 500);

        

    }

    const reject = () => {

        clearErrors();

        setApprovalType();

        setApproving(true);

        data.status = "rejected";

        if(typedReason.trim().length == 0 && data.reasons_for_rejection.trim().length == 0){
            setError({error: "You must select or enter a rejection reason"});
            return;
        }

        
        if(typedReason.trim().length > 5){ //talk about magikkkk numbers
            setData({...data, reasons_for_rejection: typedReason});
        }

        setTimeout(() => {

            rejectChangeOrder(data)
                .then(resp => {setApproving(false); resp.error ? setError({error: resp.error}) : showSuccess(resp.message)})
                .catch(error => {console.log(error); setError({error: "An error occurred"})});
            
        }, 500);

    }

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setSuccessToast(true);
    }
    
    const setApprovalType = () => {
        console.log("Expanded is: ", expanded);
        switch(expanded){
            case tabs.CHANGE_SHORT_CODE: data.change_order_request_type = "CSH";
                break;
            case tabs.ADD_SHORT_CODE: data.change_order_request_type = "ASH";
                break;
            case tabs.ADD_VAS_LICENSE: data.change_order_request_type = "AVL";
                break;
            case tabs.CHANGE_ADDRESS: data.change_order_request_type = "CAD";
                break;
            case tabs.ADD_SERVICE: data.change_order_request_type = "ANS";
                break;
            default: data.change_order_request_type = "";
        }
    }

    

    return (

        <>
            <SideDrawer request={request} openDrawer={openDrawer} closeAction={() => closeAction()}>

                <div className="flex flex-col space-y-8 border-b h-[600px] border-white/20 pb-8 pr-4 overflow-y-scroll">

                    <div className="flex space-x-4">
                    <p className="text-white">{request?.request_type}</p>
                    <span className="border-1 border-white/20 px-2 py-1 text-mtn text-sm bg-white/5 rounded-full">Basic</span>
                    </div>

                    <div className="flex space-x-2 items-start w-full">

                        <span className="p-2 rounded-md bg-white/10 inline-flex">
                            <svg className="w-6 h-6" viewBox="0 0 16 15" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>

                        <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                            <div className={`p-2  ${expanded == tabs.CHANGE_SHORT_CODE && 'border-b pb-4'} border-white/20 flex space-x-2 items-center w-full relative`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">Change shortcode</span>

                                <span className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer" 
                                        onClick={() => {clearErrors(); expanded == tabs.CHANGE_SHORT_CODE ? setExpanded(null) : setExpanded(tabs.CHANGE_SHORT_CODE)}}>
                                    {
                                        expanded == tabs.CHANGE_SHORT_CODE ? 
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>)
                                    :  
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg> )
                                    }
                                    
                                </span>
                            </div>
                            {
                                expanded == tabs.CHANGE_SHORT_CODE && (
                                    <div className="flex flex-col space-y-4 p-4">

                                        <p className="flex justify-between">
                                            <span className="text-white/60">Service</span>
                                            <span className="text-white">{request.change_shortcode.CSH_service}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">New Shortcode</span>
                                            <span className="text-white">{request.change_shortcode.CSH_shortcode}</span>
                                        </p>

                                        {errors && errors["error"] && (
                                            <div className="mb-6">
                                                <FormErrors error={errors["error"]} />
                                            </div>
                                        )}


                                        <div className="pt-4 border-t border-dashed border-white/20 flex justify-center items-center space-x-4">
                                            {
                                                request.change_shortcode.status_CSH == "approved" ? <Approved /> : request.change_shortcode.status_CSH == "rejected" ? <Declined /> : <ApprovalActions />
                                            }                                       
                                        </div>

                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>

                    <div className="flex space-x-2 items-start w-full">

                        <span className="p-2 rounded-md bg-white/10 inline-flex">
                            <svg className="w-6 h-6" viewBox="0 0 16 15" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>

                        <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                            <div className={`p-2  ${expanded == tabs.ADD_SHORT_CODE && 'border-b pb-4'} border-white/20 flex space-x-2 items-center w-full relative`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">Add shortcode</span>

                                <span className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer" 
                                        onClick={() => {clearErrors(); expanded == tabs.ADD_SHORT_CODE ? setExpanded(null) : setExpanded(tabs.ADD_SHORT_CODE)}}>
                                    {
                                        expanded == tabs.ADD_SHORT_CODE ? 
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>)
                                    :  
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg> )
                                    }
                                    
                                </span>
                            </div>
                            {
                                expanded == tabs.ADD_SHORT_CODE && (
                                    <div className="flex flex-col space-y-4 p-4">

                                        <p className="flex justify-between">
                                            <span className="text-white/60">Codes</span>
                                            <span className="text-white">{request.add_shortcode.ASH_shortcodes ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Issue date</span>
                                            <span className="text-white">{request.add_shortcode.ASH_issuing_date ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Expiry date</span>
                                            <span className="text-white">{request.add_shortcode.ASH_expiring_date ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Shortcode document</span>
                                            <span className="text-white">{request.add_shortcode.ASH_shortcode_file ? 
                                                <svg onClick={() => setFileViewer(request.add_shortcode.ASH_shortcode_file)}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                                : ""}
                                            </span>
                                        </p>

                                        {errors && errors["error"] && (
                                            <div className="mb-6">
                                                <FormErrors error={errors["error"]} />
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-dashed border-white/20 flex justify-center items-center space-x-4">
                                            {
                                                request.add_shortcode.status_ASH == "approved" ? <Approved /> : request.add_shortcode.status_ASH == "rejected" ? <Declined /> : <ApprovalActions />
                                            } 
                                            
                                        </div>

                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>

                    <div className="flex space-x-2 items-start w-full">

                        <span className="p-2 rounded-md bg-white/10 inline-flex">
                            <svg className="w-6 h-6" viewBox="0 0 16 15" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>

                        <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                            <div className={`p-2  ${expanded == tabs.ADD_VAS_LICENSE && 'border-b pb-4'} border-white/20 flex space-x-2 items-center w-full relative`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">NCC VAS License</span>

                                <span className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer" 
                                        onClick={() => {clearErrors(); expanded == tabs.ADD_VAS_LICENSE ? setExpanded(null) : setExpanded(tabs.ADD_VAS_LICENSE)}}>
                                    {
                                        expanded == tabs.ADD_VAS_LICENSE ? 
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>)
                                    :  
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg> )
                                    }
                                    
                                </span>
                            </div>
                            {
                                expanded == tabs.ADD_VAS_LICENSE && (
                                    <div className="flex flex-col space-y-4 p-4">

                                        <p className="flex justify-between">
                                            <span className="text-white/60">VAS License ID</span>
                                            <span className="text-white">{request.add_vas_license.AVL_vas_license_id ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Issue date</span>
                                            <span className="text-white">{request.add_vas_license.AVL_issuing_date ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Expiry date</span>
                                            <span className="text-white">{request.add_vas_license.AVL_expiring_date ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">NCC License document</span>
                                            <span className="text-white">{request.add_vas_license.AVL_vas_license_file ? 
                                                <svg onClick={() => setFileViewer(request.add_vas_license.AVL_vas_license_file)}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                                : ""}
                                            </span>
                                        </p>

                                        {errors && errors["error"] && (
                                            <div className="mb-6">
                                                <FormErrors error={errors["error"]} />
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-dashed border-white/20 flex justify-center items-center space-x-4">
                                            {
                                                request.add_vas_license.status_AVL == "approved" ? <Approved /> : request.add_vas_license.status_AVL == "rejected" ? <Declined /> : <ApprovalActions />
                                            } 
                                            
                                        </div>

                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>
                    
                    <div className="flex space-x-2 items-start w-full">

                        <span className="p-2 rounded-md bg-white/10 inline-flex">
                            <svg className="w-6 h-6" viewBox="0 0 16 15" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>

                        <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                            <div className={`p-2  ${expanded == tabs.CHANGE_ADDRESS && 'border-b pb-4'} border-white/20 flex space-x-2 items-center w-full relative`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">Change Address</span>

                                <span className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer" 
                                        onClick={() => {clearErrors(); expanded == tabs.CHANGE_ADDRESS ? setExpanded(null) : setExpanded(tabs.CHANGE_ADDRESS)}}>
                                    {
                                        expanded == tabs.CHANGE_ADDRESS ? 
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>)
                                    :  
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg> )
                                    }
                                    
                                </span>
                            </div>
                            {
                                expanded == tabs.CHANGE_ADDRESS && (
                                    <div className="flex flex-col space-y-4 p-4">

                                        <p className="flex justify-between">
                                            <span className="text-white/60">Address</span>
                                            <span className="text-white">{request.change_address.CAD_company_address ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Country</span>
                                            <span className="text-white">{request.change_address.CAD_country ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">State</span>
                                            <span className="text-white">{request.change_address.CAD_state ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">City</span>
                                            <span className="text-white">{request.change_address.CAD_city ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Postal code</span>
                                            <span className="text-white">{request.change_address.CAD_postal_code ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Proof of address</span>
                                            <span className="text-white">{request.change_address.CAD_proof_of_address_file ? 
                                                <svg onClick={() => setFileViewer(request.change_address.CAD_proof_of_address_file)}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                                : ""}
                                            </span>
                                        </p>

                                        {errors && errors["error"] && (
                                            <div className="mb-6">
                                                <FormErrors error={errors["error"]} />
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-dashed border-white/20 flex justify-center items-center space-x-4">
                                            {
                                                request.change_address.status_CAD == "approved" ? <Approved /> : request.change_address.status_CAD == "rejected" ? <Declined /> : <ApprovalActions />
                                            }                                             
                                        </div>

                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>

                    <div className="flex space-x-2 items-start w-full">

                        <span className="p-2 rounded-md bg-white/10 inline-flex">
                            <svg className="w-6 h-6" viewBox="0 0 16 15" fill="gray" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.24751 7.11244L6.39501 8.96494C5.36751 9.99244 5.36751 11.6499 6.39501 12.6774C7.42251 13.7049 9.08001 13.7049 10.1075 12.6774L13.025 9.75994C15.0725 7.71244 15.0725 4.38244 13.025 2.33494C10.9775 0.287441 7.64751 0.287441 5.60001 2.33494L2.42001 5.51494C0.66501 7.26994 0.66501 10.1199 2.42001 11.8824" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>

                        <div className="flex-1 p-2 rounded-lg border-2 border-white/20 ml-4 flex flex-col space-y-4">
                            <div className={`p-2  ${expanded == tabs.ADD_SERVICE && 'border-b pb-4'} border-white/20 flex space-x-2 items-center w-full relative`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">Add Service</span>

                                <span className="absolute right-4 px-4 py-1 hover:bg-white/10 rounded-full cursor-pointer" 
                                        onClick={() => {clearErrors(); expanded == tabs.ADD_SERVICE ? setExpanded(null) : setExpanded(tabs.ADD_SERVICE)}}>
                                    {
                                        expanded == tabs.ADD_SERVICE ? 
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>)
                                    :  
                                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                        </svg> )
                                    }
                                    
                                </span>
                            </div>
                            {
                                expanded == tabs.ADD_SERVICE && (
                                    <div className="flex flex-col space-y-4">

                                        <p className="flex justify-between">
                                            <span className="text-white/60">Bearer</span>
                                            <span className="text-white">{request.add_new_service.ANS_bearer ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Service name</span>
                                            <span className="text-white">{request.add_new_service.ANS_service_name ?? ""}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-white/60 ">Shortcode</span>
                                            <span className="text-white">{request.add_new_service.ANS_shortcode ?? ""}</span>
                                        </p>

                                        {errors && errors["error"] && (
                                            <div className="mb-6">
                                                <FormErrors error={errors["error"]} />
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-dashed border-white/20 flex justify-center items-center space-x-4">
                                            {
                                                request.add_new_service.status_ANS == "approved" ? <Approved /> : request.add_new_service.status_ANS == "rejected" ? <Declined /> : <ApprovalActions />
                                            } 
                                            
                                        </div>

                                    </div>
                                )
                            }
                            
                            
                        </div>

                    </div>

                </div>

                

            </SideDrawer>
            { fileViewer && 
                <FileViewer id="file_viewer" link={fileViewer} closeAction={() => setFileViewer(null)} />
            }

            <Success message={successMessage} visible={successToast} action={successAction} />

        </>
        
    );

    function Approved(){
        return (
            <div className="flex space-x-2 text-green-600 text-xs items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-4 h-4">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                <span>Approved</span>
            </div>
        )
    }

    function Declined(){
        return (
            <div className="flex space-x-2 text-red-600 text-xs items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
                <span>Declined</span>
            </div>
        )
    }

    function ApprovalActions(){
        return  declining != request  ?
            (
                <>
                    <span 
                        onClick={() => approve()} 
                        className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                        <span className="text-white">Approve</span>
                    </span>
                    <span 
                        onClick={() => setDeclining(request)}  
                        className="flex space-x-2 px-2 py-1 rounded-full cursor-pointer hover:bg-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        <span className="text-white">Reject</span>
                    </span>
                </>
            ) : (
                <>

                    <div className="border-1 border-white/20 rounded-xl flex flex-col relative w-full">
                        
                        <div className="m-2 -mb-4">
                            <SelectInput
                                id="service"
                                label="Select reason"
                                value={data.reasons_for_rejection}
                                onChange={(e) => {
                                    setData({...data, reasons_for_rejection: e.target.value});
                                    setSelectField("reason");
                                }}
                                errors={errors}
                                disabled={false}
                                >
                                {reasons.map((r) => (
                                    <SelectInputOption key={r} value={r} label={r} />
                                ))}
                            </SelectInput>   
                        </div>
                                                                        
                        <textarea
                            onKeyUp={(e) => handleChange(e)}
                            onBlur={(e) => handleChange(e)}
                            className="rounded p-4 mb-4 border-1 border-white/20 bg-white/10 text-white m-4"
                            rows="6"
                        ></textarea>

                        <div className="border-t border-white/40 py-2 px-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="orange"
                                className="w-6 h-6"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>

                            <span className="text-sm text-white/80 ml-2">
                                Partner will be notified
                            </span>

                            <div className=" ml-auto">
                                {!approving && (
                                <>
                                    <span
                                        onClick={() => {
                                            setDeclining(false);
                                            setTypedReason("");
                                        }}
                                        className="border-1 border-white/20 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer"
                                    >
                                        Cancel
                                    </span>

                                    <span
                                        onClick={() => reject()}
                                        className="border-1 border-red-200 p-2 px-4 rounded-full text-white text-sm hover:bg-white/20 cursor-pointer ml-2"
                                    >
                                        Decline
                                    </span>
                                </>
                                )}
                                {approving && (
                                <TailSpinPreloader width={40} height={40} fill="#efb703" />
                                )}
                            </div>
                        </div>
                    </div>

                </>
            );
        
    }
}