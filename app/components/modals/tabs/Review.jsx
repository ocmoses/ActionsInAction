import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import TextInput from "@/app/components/form/TextInput";
import DatePicker from "@/app/components/form/DatePicker";
import FormErrors from "@/app/components/FormErrors";
import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons"
import RemoteEndpoints from "@/app/modules/endpoints";
import { ContractSettingsContext } from "@/app/(protected)/(partner)/dashboard/settings/company/contracts/ContractSettingsProvider";
import {useRouter} from "next/navigation";


function Review({contract_id}){

    const {
        partner, 
        getAllServices,
        getAllShortcodes,
        getChangeOrderStatus
    } = usePartners();

    const {
        tabs,
        currentTab, 
        setCurrentTab,
        setRequestChangesModal    
    } = useContext(ContractSettingsContext);

    const {user} = useUsers();

    const router = useRouter();
       
    const [{ errors, setError, clearErrors }] = useErrors(null);
    
    const [processing, setProcessing] = useState(false);

    const [statuses, setStatuses] = useState(null);

    const [data, setData] = useState(null);

    useEffect(() => {
        getChangeOrderStatus().then(resp => resp.error ? setError({error: resp.error}) : setStatuses(resp.statuses) )
    }, []);

    const requestUpdate = async () => {
        
        setProcessing(true);

        setTimeout(() => {

            setProcessing(true);
            setRequestChangesModal(false);
            router.push("/dashboard/settings/company/contracts/" + contract_id)

        }, 2000);

       
    }

    return (
        <div className="flex flex-col space-y-4">

            <div className="w-full overflow-y-scroll h-[500px] flex flex-col space-y-4">

                <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                    <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                        <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                        </svg>
                        <span className="text-white/80 ml-2">Change shortcode</span>

                        <span onClick={() => setCurrentTab(tabs.CHANGE_SHORT_CODE)} 
                                className="cursor-pointer absolute right-4 px-2 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                            Edit
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4">

                        <p className="flex justify-between">
                            <span className="text-white/60">Service</span>
                            <span className="text-white">{statuses?.change_shortcode?.CSH_service ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">New Shortcode</span>
                            <span className="text-white">{statuses?.change_shortcode?.CSH_shortcode ?? ""}</span>
                        </p>

                    </div>
                    
                </div>

                <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                    <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                        <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                        </svg>
                        <span className="text-white/80 ml-2">Shortcode</span>

                        <span onClick={() => setCurrentTab(tabs.ADD_SHORT_CODE)} 
                                className="cursor-pointer absolute right-2 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                            Edit
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4">

                        <p className="flex justify-between">
                            <span className="text-white/60">Codes</span>
                            <span className="text-white">{statuses?.add_shortcode?.ASH_shortcodes ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Issue date</span>
                            <span className="text-white">{statuses?.add_shortcode?.ASH_issuing_date ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Expiry date</span>
                            <span className="text-white">{statuses?.add_shortcode?.ASH_expiring_date ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Shortcode document</span>
                            <span className="text-white">{statuses?.add_shortcode?.ASH_shortcode_file ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                : ""}
                            </span>
                        </p>

                    </div>
                    
                </div>

                <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                    <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                        <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                        </svg>
                        <span className="text-white/80 ml-2">NCC License</span>

                        <span onClick={() => setCurrentTab(tabs.ADD_VAS_LICENSE)} className="cursor-pointer absolute right-2 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                            Edit
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4">

                        <p className="flex justify-between">
                            <span className="text-white/60">VAS License ID</span>
                            <span className="text-white">{statuses?.add_vas_license?.AVL_vas_license_id ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Issue date</span>
                            <span className="text-white">{statuses?.add_vas_license?.AVL_issuing_date ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Expiry date</span>
                            <span className="text-white">{statuses?.add_vas_license?.AVL_expiring_date ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">NCC License document</span>
                            <span className="text-white">{statuses?.add_vas_license?.AVL_vas_license_file ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                : ""}
                            </span>
                        </p>

                    </div>
                    
                </div>

                <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                    <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                        <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                        </svg>
                        <span className="text-white/80 ml-2">Address</span>

                        <span onClick={() => setCurrentTab(tabs.CHANGE_ADDRESS)} 
                                className="cursor-pointer absolute right-2 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                            Edit
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4">

                        <p className="flex justify-between">
                            <span className="text-white/60">Address</span>
                            <span className="text-white">{statuses?.change_address?.CAD_company_address ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Country</span>
                            <span className="text-white">{statuses?.change_address?.CAD_country ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">State</span>
                            <span className="text-white">{statuses?.change_address?.CAD_state ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">City</span>
                            <span className="text-white">{statuses?.change_address?.CAD_city ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Postal code</span>
                            <span className="text-white">{statuses?.change_address?.postal_code ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Proof of address</span>
                            <span className="text-white">{statuses?.change_address?.CAD_proof_of_address_file ? 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                : ""}
                            </span>
                        </p>

                    </div>
                    
                </div>

                <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                    <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                        <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                        </svg>
                        <span className="text-white/80 ml-2">Add new service</span>

                        <span onClick={() => setCurrentTab(tabs.ADD_SERVICE)} 
                                className="cursor-pointer absolute right-2 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                            Edit
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4">

                        <p className="flex justify-between">
                            <span className="text-white/60">Service name</span>
                            <span className="text-white">{statuses?.add_new_service?.ANS_service_name ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Shortcode</span>
                            <span className="text-white">{statuses?.add_new_service?.ANS_shortcode ?? ""}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-white/60 ">Bearer</span>
                            <span className="text-white">{statuses?.add_new_service?.ANS_bearer ?? ""}</span>
                        </p>

                    </div>
                    
                </div>

            </div>

            <div className="flex justify-end item-end p-8">
                {
                    !processing && 
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => requestUpdate()}>Review & Submit</button>
                }
                {
                    processing && 
                    <div className="flex px-4">
                        <TailSpinPreloader width={40} height={40} fill="#efb703" />
                    </div>
                }
                
            </div>

        </div>
    );
}

export default Review;