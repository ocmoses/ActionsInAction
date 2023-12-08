import { useEffect, useContext, useState } from "react";
import { ContractSettingsContext } from "@/app/(protected)/(partner)/dashboard/settings/company/contracts/ContractSettingsProvider";
import AddShortcode from "./tabs/AddShortcode";
import ChangeShortcode from "./tabs/ChangeShortcode";
import AddVASLicense from "./tabs/AddVASLicense";
import ChangeAddress from "./tabs/ChangeAddress";
import AddService from "./tabs/AddService";
import Review from "./tabs/Review";


export default function RequestChangesModal({contract_id, rejected}){

    const {
        requestChangesModal,
        tabs,
        currentTab, 
        setCurrentTab
    } = useContext(ContractSettingsContext);

    let availableTabs = [];

    const [showTabs, setShowTabs] = useState([]);

    console.log("REJECTED", rejected);
    
    const rejectedArray = rejected?.split("%2C");

    console.log("REJECTED ARRAY", rejectedArray);

    console.log("REJECTED ARRAY LENGTH", rejectedArray?.length);
    
    if(rejectedArray?.length > 0){     
        
        availableTabs = [];

        for(let i = 0; i < rejectedArray; i++){
            console.log("REJECTED ARRAY ik", rejectedArray[i]);
            switch(rejectedArray[i]){
                case "add_new_service": if(!availableTabs.includes(tabs.ADD_SERVICE)){availableTabs.push(tabs.ADD_SERVICE)};
                    break;
                case "add_shortcode": if(!availableTabs.includes(tabs.ADD_SHORT_CODE)){availableTabs.push(tabs.ADD_SHORT_CODE)};
                    break;
                case "add_vas_license": if(!availableTabs.includes(tabs.ADD_VAS_LICENSE)){availableTabs.push(tabs.ADD_VAS_LICENSE)};
                    break;
                case "change_address": if(!availableTabs.includes(tabs.CHANGE_ADDRESS)){availableTabs.push(tabs.CHANGE_ADDRESS)};
                    break;
                case "change_shortcode": if(!availableTabs.includes(tabs.CHANGE_ADDRESS)){availableTabs.push(tabs.CHANGE_SHORT_CODE)};
                    break;  
                default: break;                  
            }
        }
    }else{
        availableTabs = [tabs.ADD_SERVICE, tabs.ADD_SHORT_CODE, tabs.ADD_VAS_LICENSE, tabs.CHANGE_ADDRESS, tabs.CHANGE_SHORT_CODE];
    }

    useEffect(() => {

        setShowTabs(availableTabs);

        console.log("AVAILABLE TABS", availableTabs);

    }, [rejected]);

    const nextTab = (tab) => {
        switch(tab){
            case tabs.CHANGE_SHORT_CODE: if(availableTabs && availableTabs.includes(tabs.ADD_SHORT_CODE)){setCurrentTab(tabs.ADD_SHORT_CODE)};
                break;
            case tabs.ADD_SHORT_CODE: if(availableTabs && availableTabs.includes(tabs.ADD_VAS_LICENSE)){setCurrentTab(tabs.ADD_VAS_LICENSE)};
                break;
            case tabs.ADD_VAS_LICENSE: if(availableTabs && availableTabs.includes(tabs.CHANGE_ADDRESS)){setCurrentTab(tabs.CHANGE_ADDRESS)};
                break;
            case tabs.CHANGE_ADDRESS: if(availableTabs && availableTabs.includes(tabs.ADD_SERVICE)){setCurrentTab(tabs.ADD_SERVICE)};
                break;
            case tabs.ADD_SERVICE: if(availableTabs && availableTabs.includes(tabs.REVIEW_AND_SUBMIT)){setCurrentTab(tabs.REVIEW_AND_SUBMIT)};
                break;
            default: data.change_order_request_type = "";
        }
    }
 
    
    
    return (requestChangesModal && 

        <div id="request_changes_modal" className="w-screen flex justify-center items-center h-screen fixed z-[999] top-0 left-0 bg-black/80" >
            <div id="actualModal" className={`relative border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[800px]`}>
            
                <div className="flex">
                    
                    <div className="w-[250px] bg-black/80 border-2 border-gray-500 rounded-l-xl p-4">
                        <ul className="mt-10 flex flex-col space-y-4">
                            {
                                showTabs && showTabs.includes(tabs.CHANGE_SHORT_CODE) &&

                                <li onClick={() => setCurrentTab(tabs.CHANGE_SHORT_CODE)} 
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.CHANGE_SHORT_CODE && "bg-white/10"} cursor-pointer`}>
                                    <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                    </svg>
                                    <span className="text-white/80 ml-2">Change shortcode</span>
                                    {currentTab == tabs.CHANGE_SHORT_CODE &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>
                            }
                            

                            {
                                showTabs && showTabs.includes(tabs.ADD_SHORT_CODE) &&

                                <li onClick={() => setCurrentTab(tabs.ADD_SHORT_CODE)} 
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.ADD_SHORT_CODE && "bg-white/10"} cursor-pointer`}>
                                    <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                    </svg>
                                    <span className="text-white/80 ml-2">Add shortcode</span>
                                    {currentTab == tabs.ADD_SHORT_CODE &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>

                            }

                            
                            {
                                 showTabs && showTabs.includes(tabs.ADD_VAS_LICENSE) && 

                                 <li onClick={() => setCurrentTab(tabs.ADD_VAS_LICENSE)}
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.ADD_VAS_LICENSE && "bg-white/10"} cursor-pointer`}>
                                    <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                    </svg>
                                    <span className="text-white/80 ml-2">Add VAS License</span>
                                    {currentTab == tabs.ADD_VAS_LICENSE &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>

                            }

                            

                            {
                                showTabs && showTabs.includes(tabs.CHANGE_ADDRESS) && 

                                <li onClick={() => setCurrentTab(tabs.CHANGE_ADDRESS)}
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.CHANGE_ADDRESS && "bg-white/10"} cursor-pointer`}>
                                    <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                    </svg>
                                    <span className="text-white/80 ml-2">Change address</span>
                                    {currentTab == tabs.CHANGE_ADDRESS &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>
                            }

                            
                            {
                                showTabs && showTabs.includes(tabs.ADD_SERVICE) && 

                                <li onClick={() => setCurrentTab(tabs.ADD_SERVICE)}
                                    className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.ADD_SERVICE && "bg-white/10"} cursor-pointer`}>
                                    <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                        <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                    </svg>
                                    <span className="text-white/80 ml-2">Add Service</span>
                                    {currentTab == tabs.ADD_SERVICE &&
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    
                                    }
                                </li>

                            }

                            <li onClick={() => setCurrentTab(tabs.REVIEW_AND_SUBMIT)}
                                className={`flex p-2 rounded-lg items-center w-full hover:bg-white/10 ${currentTab == tabs.REVIEW_AND_SUBMIT && "bg-white/10"} cursor-pointer`}>
                                <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                                </svg>
                                <span className="text-white/80 ml-2">Review & submit</span>
                                {currentTab == tabs.REVIEW_AND_SUBMIT &&
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4 ml-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                
                                }
                            </li>
                            
                        </ul>
                    </div>

                    <div className="relative w-[550px] h-[650px] flex flex-col mb-4">  
                        
                        {
                            currentTab == tabs.CHANGE_SHORT_CODE && 
                            <ChangeShortcode  contract_id={contract_id} action={ () => nextTab(tabs.CHANGE_SHORT_CODE)} />
                        }
                        {
                            currentTab == tabs.ADD_SHORT_CODE && 
                            <AddShortcode contract_id={contract_id} action={ () => nextTab(tabs.ADD_SHORT_CODE)} />
                        }
                        {
                            currentTab == tabs.ADD_VAS_LICENSE && 
                            <AddVASLicense contract_id={contract_id} action={ () => nextTab(tabs.ADD_VAS_LICENSE)} />
                        }
                        {
                            currentTab == tabs.CHANGE_ADDRESS && 
                            <ChangeAddress contract_id={contract_id} action={ () => nextTab(tabs.CHANGE_ADDRESS)} />
                        }
                        {
                            currentTab == tabs.ADD_SERVICE && 
                            <AddService contract_id={contract_id} action={ () => nextTab(tabs.ADD_SERVICE)} />
                        }
                        {
                            currentTab == tabs.REVIEW_AND_SUBMIT && 
                            <Review />
                        }
                    </div>
                </div>
                
           </div>
        </div>
        
    );

            


}