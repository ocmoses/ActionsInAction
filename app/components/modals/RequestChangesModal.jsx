import GenericModal from "./GenericModal.jsx";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractSettingsContext } from "../../(protected)/(partner)/dashboard/settings/company/contracts/ContractSettingsProvider";
import SelectInput from "@/app/components/form/SelectInput";
import SelectInputOption from "@/app/components/form/SelectInputOption";
import TextInput from "@/app/components/form/TextInput";
import DatePicker from "@/app/components/form/DatePicker";
import FormErrors from "@/app/components/FormErrors";



export default function RequestChangesModal(){

    const {
        partner,
        requestChangesDialogue,
        setRequestChangesDialogue,
        requestChangesModal,
        setRequestChangesModal,
        tabs,
        currentTab, 
        setCurrentTab,
        data,
        setData
    } = useContext(ContractSettingsContext);

    const {user} = useUsers();

    
    
    const [uploadedFile, setUploadedFile] = useState(false);
    const [reset, setReset] = useState(Date.now());

    const [{ errors, setError, clearErrors }] = useErrors(null);

    const shortcodes = [
        {value: "12345"},
        {value: "87654"},
        {value: "34254"}
    ];

    const services = [
        {value: "service_a", title: "Service A"},
        {value: "service_b", title: "Service B"},
    ];

    const bearers = [
        {value: "sms", title: "SMS"},
        {value: "ivr", title: "IVR"},
        {value: "ussd", title: "USSD"},
    ];

    const [selectField, setSelectField] = useState(null);

    const handleFormChange = (e) => {
        const field = e.target.id;
        setData((prevState) => ({
          ...prevState,
          [field]: e.target.value,
        }));
      };

    // const handleChangeAddress = () => {
    //     // setChangeAddressModal(false);    
    //     // setProfileSuccess(true);  

    //     setUpdatingAddress(true);
    //     console.log('data in handleChange', data);
    //     if(!data.companyAddress || data.companyAddress.trim() == ""){
    //         setError({error: "Please enter the new address"});
    //         setUpdatingAddress(false);
    //         return;
    //     }
    //     if(!data.city || data.city.trim() == ""){
    //       setError({error: "Please enter your city"});
    //       setUpdatingAddress(false);
    //       return;
    //     }
        
    //     if(!data.state || data.state.trim() == ""){
    //         setError({error: "Please enter your state"});
    //         setUpdatingAddress(false);
    //         return;
    //     }

    //     if(!data.postal_code || data.postal_code.trim() == ""){
    //         setError({error: "Please enter your postal code"});
    //         setUpdatingAddress(false);
    //         return;
    //     }
    
    //     if(!uploadedFile){
    //         setError({error: "Please upload a proof of current address"});
    //         setUpdatingAddress(false);
    //         return;
    //     }
    
    //     // changeAddress(data);
    // }

    
    // const changeAddress = async (data) => {

    //     // console.log('update_data', data);
    
    //     let formData = new FormData();
    
    //     // console.log("Object.keys(data)", Object.keys(data));
    
    //     Object.keys(data).forEach(element => {
    //       formData.append(element, data[element]);
    //     });
    
    //     if (updatingAddress) return;
    //     let update_address_response = await updateAddress(formData);

    //     setUpdatingAddress(false);
            
    //     if (update_address_response.error) setError({ error: update_address_response.error })
    //     else {
    //         console.log('update_address_response', update_address_response); 
    //         setChangeAddressModal(false);    
    //          //display success message   
    //          setProfileSuccess(true);   
    //     }
       
    // }  
    
    useEffect(() => {

    }, []);


    return (requestChangesModal && 

        <div id="request_changes_modal" className="w-screen flex justify-center items-center h-screen fixed z-[999] top-0 left-0 bg-black/80" >
            <div id="actualModal" className={`relative border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[800px]`}>
            
                <div className="flex">
                    
                    <div className="w-[250px] bg-black/80 border-2 border-gray-500 rounded-l-xl p-4">
                        <ul className="mt-10 flex flex-col space-y-4">
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

                        {errors && errors["error"] && (
                            <div className="mb-6">
                                <FormErrors error={errors["error"]} />
                            </div>
                        )}                      

                        {
                            currentTab == tabs.CHANGE_SHORT_CODE && 
                            <ChangeShortCode />
                        }
                        {
                            currentTab == tabs.ADD_SHORT_CODE && 
                            <AddShortCode />
                        }
                        {
                            currentTab == tabs.ADD_VAS_LICENSE && 
                            <AddVASLicense />
                        }
                        {
                            currentTab == tabs.CHANGE_ADDRESS && 
                            <ChangeAddress />
                        }
                        {
                            currentTab == tabs.ADD_SERVICE && 
                            <AddService />
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


    function ShortCode({value}){
        return (
            <div onClick={() => setData({...data, shortcode: value})} className={`p-4 text-white/80 w-1/3 border-2 ${data.shortcode == value ? "border-mtn" : "border-white/20"} rounded-md flex items-center justify-center cursor-pointer`}>
                {value}
            </div>
        );
    }

    function Bearer({value}){
        return (
            <div onClick={() => setData({...data, bearer: value})} className={`p-4 text-white/80 w-1/3 border-2 ${data.bearer == value ? "border-mtn" : "border-white/20"} rounded-md flex items-center justify-center cursor-pointer`}>
                {value}
            </div>
        );
    }

    function ChangeShortCode(){

        return (
            <>
                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setRequestChangesModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
                    <h2 className="text-white text-2xl font-mtn">Change short code</h2>

                    <div className="text-white/60 flex flex-col space-y-3">
                        <label className="text-md">Select a service</label>
                        <SelectInput
                            id="service"
                            label="Select Service"
                            value={data.service}
                            onChange={(e) => {
                                handleFormChange(e);
                                setSelectField("country");
                            }}
                            errors={errors}
                            disabled={false}
                            >
                            {services.map((s) => (
                                <SelectInputOption key={s.value} value={s.value} label={s.title} />
                            ))}
                        </SelectInput>

                    </div>

                    <div className="text-white/60 flex flex-col space-y-3">
                        <label className="text-md">Choose a shortcode</label>

                        <div className="flex space-x-4 flex-NOwrap w-full">
                            {
                                shortcodes.map(s => <ShortCode key={s.value} value={s.value} />)
                            }
                        </div>

                        <span onClick={() => setCurrentTab(tabs.ADD_SHORT_CODE)} 
                                className="text-mtn text-md cursor-pointer">+ Add new shortcode</span>                                

                    </div>
                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>
                            
            </>
        );
    }

    function AddShortCode(){
        
        let today = new Date();
        const tomorrow = new Date().setDate(today.getDate() + 1);
        const two_years_ago = new Date().setDate(today.getDate() - 739);
        const max_expiry = new Date().setDate(data.issue_date + 739);

        const [uploadedFile, setUploadedFile] = useState(false);
        const [reset, setReset] = useState(Date.now());
        
        return (
            <>
                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setRequestChangesModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
                    <h2 className="text-white text-2xl font-mtn">Add short code</h2>

                    <div className="flex flex-col space-y-2">
                        <label className="text-md text-white/60">Enter applicable short codes</label>
                        <TextInput
                            id="new_shortcodes"
                            label="Short codes"
                            onChange={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let shortcodes = e.target.value.trim().split(",");
                                        for(let shortcode of shortcodes){
                                            shortcode = shortcode.trim();
                                        }
                                        setData({...data, shortcodes: shortcodes.join(",") });
                                    }catch(ex){
                                        setError({error: "Please add new shortcode(s)"})
                                    } 
                                }
                            }
                            onBlur={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let shortcodes = e.target.value.trim().split(",");
                                        for(let shortcode of shortcodes){
                                            shortcode = shortcode.trim();
                                        }
                                        setData({...data, shortcodes: shortcodes.join(",") });
                                    }catch(ex){
                                        setError({error: "Please add new shortcode(s)"})
                                    } 
                                }
                            }
                            errors={errors}
                        />
                    </div>
                    

                    <div className="flex space-x-2 no-wrap">

                        <DatePicker
                            id="new_shortcode_issue_date"
                            label="Issue date"
                            value={data.new_shortcode_issue_date}
                            onChange={handleFormChange}
                            onBlur={() => {}}
                            errors={errors}
                            min={two_years_ago}
                            max={today}
                            disabled={false}
                        />

                        <DatePicker
                            id="new_shortcode_expiry_date"
                            label="Expiry date"
                            value={data.new_shortcode_expiry_date}
                            onChange={handleFormChange}
                            onBlur={() => {}}
                            errors={errors}
                            min={tomorrow}
                            max={max_expiry}
                            disabled={false}
                        />

                    </div>

                    
                    {/* <p className="text-white/80 text-xl mb-2">Upload shortcode </p> */}
                    
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
                            <p className="text-white text-md">Short code document</p>
                            <p className="text-gray-500 text-sm">Drag and drop here or</p>
                            </div>

                            <div className="flex flex-col justify-end space-between items-end space-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                            </svg>
                            {uploadedFile ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => {setReset(Date.now()); setUploadedFile(false); }}>
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                    </svg>
                                    :
                            <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#shortcode_proof").click()}>Choose file</button>}
                            <input type="file" className="opacity-0 w-1 h-1" id="shortcode_proof" accept=".pdf" onChange={(e) => {setData({...data, file: e.target.files[0]}); setUploadedFile(true); console.log("data", data)}}/>                   
                            </div>

                        </div>          
                    
                    </div>
                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>
            </>
        )
    }

    function AddVASLicense(){
        
        let today = new Date();
        const tomorrow = new Date().setDate(today.getDate() + 1);
        const two_years_ago = new Date().setDate(today.getDate() - 739);
        const max_expiry = new Date().setDate(data.issue_date + 739);

        const [uploadedFile, setUploadedFile] = useState(false);
        const [reset, setReset] = useState(Date.now());
        
        return (
            <>
                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setRequestChangesModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
                    <h2 className="text-white text-2xl font-mtn">Add VAS License</h2>

                    <div className="flex flex-col space-y-2">
                        {/* <label className="text-md text-white/60">Enter applicable short codes</label> */}
                        <TextInput
                            id="vas_license_id"
                            label="VAS License ID"
                            onChange={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let new_vas_license_id = e.target.value.trim();
                                       
                                        setData({...data, new_vas_license_id });
                                    }catch(ex){
                                        setError({error: "Please add new VAS license id"})
                                    } 
                                }
                            }
                            onBlur={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let new_vas_license_id = e.target.value.trim();
                                       
                                        setData({...data, new_vas_license_id });
                                    }catch(ex){
                                        setError({error: "Please add new VAS license id"})
                                    } 
                                }
                            }
                            errors={errors}
                        />
                    </div>
                    

                    <div className="flex space-x-2 no-wrap">

                        <DatePicker
                            id="new_vas_license_issue_date"
                            label="Issue date"
                            value={data.new_vas_license_issue_date}
                            onChange={handleFormChange}
                            onBlur={() => {}}
                            errors={errors}
                            min={two_years_ago}
                            max={today}
                            disabled={false}
                        />

                        <DatePicker
                            id="new_vas_license_expiry_date"
                            label="Expiry date"
                            value={data.new_vas_license_expiry_date}
                            onChange={handleFormChange}
                            onBlur={() => {}}
                            errors={errors}
                            min={tomorrow}
                            max={max_expiry}
                            disabled={false}
                        />

                    </div>

                    
                    {/* <p className="text-white/80 text-xl mb-2">Upload shortcode </p> */}
                    
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
                            <p className="text-white text-md">NCC VAS License</p>
                            <p className="text-gray-500 text-sm">Drag and drop here or</p>
                            </div>

                            <div className="flex flex-col justify-end space-between items-end space-y-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                            </svg>
                            {uploadedFile ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => {setReset(Date.now()); setUploadedFile(false); }}>
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                    </svg>
                                    :
                            <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#shortcode_proof").click()}>Choose file</button>}
                            <input type="file" className="opacity-0 w-1 h-1" id="shortcode_proof" accept=".pdf" onChange={(e) => {setData({...data, file: e.target.files[0]}); setUploadedFile(true); console.log("data", data)}}/>                   
                            </div>

                        </div>          
                    
                    </div>
                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>
            </>
        )
    }

    function ChangeAddress(){

        const [uploadedFile, setUploadedFile] = useState(false);
        const [reset, setReset] = useState(Date.now());

        return (
            <>

                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setRequestChangesModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
                    <h2 className="text-white text-2xl font-mtn">Change address</h2>

                    <div className="flex flex-col space-y-2">
                        <TextInput
                            id="company_address"
                            label="Company address"
                            onChange={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let companyAddress = e.target.value.trim();
                                        setData({...data, companyAddress })
                                    }catch(ex){
                                        setError({error: "Please enter your new address"})
                                    } 
                                }
                            }
                            onBlur={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let companyAddress = e.target.value.trim();
                                        setData({...data, companyAddress })
                                    }catch(ex){
                                        setError({error: "Please enter your new address"})
                                    } 
                                }
                            }
                            errors={errors}
                        />

                        <div className="flex space-x-2 no-wrap">

                            <TextInput
                                id="city"
                                label="City"
                                // value={data.role_name}
                                onChange={
                                    (e) => {
                                        clearErrors();
                                        setData({...data, city: e.target.value.trim()});
                                    }
                                }
                                onBlur={
                                    (e) => {
                                        clearErrors();
                                        setData({...data, city: e.target.value.trim()});
                                    }
                                }
                                errors={errors}
                            />

                            <TextInput
                                id="state"
                                label="State"
                                // value={data.phone}
                                onChange={
                                    (e) => {
                                        clearErrors();
                                        setData({...data, state: e.target.value.trim()});
                                    }
                                }
                                onBlur={
                                    (e) => {
                                        clearErrors();
                                        setData({...data, state: e.target.value.trim()});
                                    }
                                }
                                errors={errors}
                            />

                        </div>

                        <TextInput
                            id="postal_code"
                            label="Postal Code"
                            onChange={
                                (e) => {
                                    clearErrors();
                                    setData({...data, postal_code: e.target.value.trim()});
                                }
                            }
                            onBlur={
                                (e) => {
                                    clearErrors();
                                    setData({...data, postal_code: e.target.value.trim()});
                                }
                            }
                            errors={errors}
                        />                   

                        
                        <p className="text-white/60 mb-2">Upload a proof of address</p>
                        
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
                                <p className="text-white text-md">Proof of address</p>
                                <p className="text-gray-500 text-sm">Drag and drop here or</p>
                                </div>

                                <div className="flex flex-col justify-end space-between items-end space-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                </svg>
                                {uploadedFile ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => {setReset(Date.now()); setUploadedFile(false); }}>
                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>
                                        :
                                <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#address_proof").click()}>Choose file</button>}
                                <input type="file" className="opacity-0 w-1 h-1" id="address_proof" accept=".pdf" onChange={(e) => {setData({...data, file: e.target.files[0]}); setUploadedFile(true); console.log("data", data)}}/>                   
                                </div>

                            </div>          
                        
                        </div>
                    </div>

                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>

            </>
        );
    }

    function AddService(){

        return (
            <>
                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setRequestChangesModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-white/20 hover:rounded-full p-2 absoolute right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="text-white mb-4 flex-1 mt-12 px-8 relative flex flex-col space-y-8">
                    <h2 className="text-white text-2xl font-mtn">Add new service</h2>

                    <div className="text-white/60 flex flex-col space-y-3">
                        <label className="text-md">Service name</label>
                        <TextInput
                            id="new_service_name"
                            label="Service name"
                            onChange={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let new_service_name = e.target.value.trim();
                                        setData({...data, new_service_name })
                                    }catch(ex){
                                        setError({error: "Please enter your new service name"})
                                    } 
                                }
                            }
                            onBlur={
                                (e) => { 
                                    try{
                                        clearErrors();
                                        let new_service_name = e.target.value.trim();
                                        setData({...data, new_service_name })
                                    }catch(ex){
                                        setError({error: "Please enter your new service name"})
                                    } 
                                }
                            }
                            errors={errors}
                        />

                    </div>

                    <div className="text-white/60 flex flex-col space-y-3">
                        <p className="text-white">Short code</p>
                        <span className="text-md">This is the short code associated with this service.</span>

                        <div className="flex space-x-4 flex-NOwrap w-full">
                            {
                                shortcodes.map(s => <ShortCode key={s.value} value={s.value} />)
                            }
                        </div>

                        <span onClick={() => setCurrentTab(tabs.ADD_SHORT_CODE)} 
                                className="text-mtn text-md cursor-pointer">+ Add new shortcode</span>                                

                    </div>

                    <div className="text-white/60 flex flex-col space-y-3">
                        <p className="text-white">Bearer</p>
                        <span className="text-md">This is the bearer associated with this service.</span>

                        <div className="flex space-x-4 flex-NOwrap w-full">
                            {
                                bearers.map(b => <Bearer key={b.value} value={b.title} />)
                            }
                        </div>

                    </div>
                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>
                            
            </>
        );
    }

    function Review(){
        return (
            <div className="flex flex-col space-y-4">

                <div className="w-full overflow-y-scroll h-[500px] flex flex-col space-y-4">

                    <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                        <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                            <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                            </svg>
                            <span className="text-white/80 ml-2">Change shortcode</span>

                            <span className="absolute right-4 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                                Edit
                            </span>
                        </div>
                        <div className="flex flex-col space-y-4">

                            <p className="flex justify-between">
                                <span className="text-white/60">Service</span>
                                <span className="text-white">{data.new_service}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">New Shortcode</span>
                                <span className="text-white">{data.short_code}</span>
                            </p>

                        </div>
                        
                    </div>

                    <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                        <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                            <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                            </svg>
                            <span className="text-white/80 ml-2">Shortcode</span>

                            <span className="absolute right-4 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                                Edit
                            </span>
                        </div>
                        <div className="flex flex-col space-y-4">

                            <p className="flex justify-between">
                                <span className="text-white/60">Codes</span>
                                <span className="text-white">{data.new_shortcodes}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Issue date</span>
                                <span className="text-white">{data.new_shortcodes_issue_date}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Expiry date</span>
                                <span className="text-white">{data.new_shortcodes_expiry_date}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Shortcode document</span>
                                <span className="text-white">{data.new_shortcodes_expiry_date}</span>
                            </p>

                        </div>
                        
                    </div>

                    <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                        <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                            <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                            </svg>
                            <span className="text-white/80 ml-2">NCC License</span>

                            <span className="absolute right-4 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                                Edit
                            </span>
                        </div>
                        <div className="flex flex-col space-y-4">

                            <p className="flex justify-between">
                                <span className="text-white/60">VAS License ID</span>
                                <span className="text-white">{data.vas_license_id}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Issue date</span>
                                <span className="text-white">{data.vas_license_issue_date}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Expiry date</span>
                                <span className="text-white">{data.vas_license_expiry_date}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">NCC License document</span>
                                <span className="text-white">{data.vas_license_document}</span>
                            </p>

                        </div>
                        
                    </div>

                    <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                        <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                            <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                            </svg>
                            <span className="text-white/80 ml-2">Address</span>

                            <span className="absolute right-4 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                                Edit
                            </span>
                        </div>
                        <div className="flex flex-col space-y-4">

                            <p className="flex justify-between">
                                <span className="text-white/60">Address</span>
                                <span className="text-white">{data.company_address}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Country</span>
                                <span className="text-white">{data.country}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">State</span>
                                <span className="text-white">{data.state}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">City</span>
                                <span className="text-white">{data.city}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Postal code</span>
                                <span className="text-white">{data.postal_code}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Proof of address</span>
                                <span className="text-white">{data.address_file}</span>
                            </p>

                        </div>
                        
                    </div>

                    <div className="p-4 rounded-lg border-2 border-white/20 m-4 flex flex-col space-y-4">
                        <div className="p-2 pb-4 border-b border-white/20 flex space-x-2 items-center w-full relative">
                            <svg viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M5.4375 6C5.4375 5.85082 5.49676 5.70774 5.60225 5.60225C5.70774 5.49676 5.85082 5.4375 6 5.4375H12C12.1492 5.4375 12.2923 5.49676 12.3977 5.60225C12.5032 5.70774 12.5625 5.85082 12.5625 6C12.5625 6.14918 12.5032 6.29226 12.3977 6.39775C12.2923 6.50324 12.1492 6.5625 12 6.5625H6C5.85082 6.5625 5.70774 6.50324 5.60225 6.39775C5.49676 6.29226 5.4375 6.14918 5.4375 6ZM6 9.5625H12C12.1492 9.5625 12.2923 9.50324 12.3977 9.39775C12.5032 9.29226 12.5625 9.14919 12.5625 9C12.5625 8.85082 12.5032 8.70774 12.3977 8.60225C12.2923 8.49676 12.1492 8.4375 12 8.4375H6C5.85082 8.4375 5.70774 8.49676 5.60225 8.60225C5.49676 8.70774 5.4375 8.85082 5.4375 9C5.4375 9.14919 5.49676 9.29226 5.60225 9.39775C5.70774 9.50324 5.85082 9.5625 6 9.5625ZM9 11.4375H6C5.85082 11.4375 5.70774 11.4968 5.60225 11.6023C5.49676 11.7077 5.4375 11.8508 5.4375 12C5.4375 12.1492 5.49676 12.2923 5.60225 12.3977C5.70774 12.5032 5.85082 12.5625 6 12.5625H9C9.14919 12.5625 9.29226 12.5032 9.39775 12.3977C9.50324 12.2923 9.5625 12.1492 9.5625 12C9.5625 11.8508 9.50324 11.7077 9.39775 11.6023C9.29226 11.4968 9.14919 11.4375 9 11.4375ZM17.8125 1.5V11.6897C17.8128 11.8621 17.779 12.0329 17.7131 12.1922C17.6471 12.3514 17.5502 12.4961 17.4281 12.6178L12.6178 17.4281C12.4961 17.5502 12.3514 17.6471 12.1922 17.7131C12.0329 17.779 11.8621 17.8128 11.6897 17.8125H1.5C1.1519 17.8125 0.818064 17.6742 0.571922 17.4281C0.325781 17.1819 0.1875 16.8481 0.1875 16.5V1.5C0.1875 1.1519 0.325781 0.818064 0.571922 0.571922C0.818064 0.325781 1.1519 0.1875 1.5 0.1875H16.5C16.8481 0.1875 17.1819 0.325781 17.4281 0.571922C17.6742 0.818064 17.8125 1.1519 17.8125 1.5ZM1.5 16.6875H11.4375V12C11.4375 11.8508 11.4968 11.7077 11.6023 11.6023C11.7077 11.4968 11.8508 11.4375 12 11.4375H16.6875V1.5C16.6875 1.45027 16.6677 1.40258 16.6326 1.36742C16.5974 1.33225 16.5497 1.3125 16.5 1.3125H1.5C1.45027 1.3125 1.40258 1.33225 1.36742 1.36742C1.33225 1.40258 1.3125 1.45027 1.3125 1.5V16.5C1.3125 16.5497 1.33225 16.5974 1.36742 16.6326C1.40258 16.6677 1.45027 16.6875 1.5 16.6875ZM15.8925 12.5625H12.5625V15.8925L15.8925 12.5625Z" fill="#8E8E8E"/>
                            </svg>
                            <span className="text-white/80 ml-2">Add new service</span>

                            <span className="absolute right-4 px-4 py-1 rounded-full border-1 border-white/20 text-white/60 hover:bg-white/10">
                                Edit
                            </span>
                        </div>
                        <div className="flex flex-col space-y-4">

                            <p className="flex justify-between">
                                <span className="text-white/60">Service name</span>
                                <span className="text-white">{data.new_service}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Shortcode</span>
                                <span className="text-white">{data.new_service_shortcode}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Dearer</span>
                                <span className="text-white">{data.bearer}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">City</span>
                                <span className="text-white">{data.city}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Postal code</span>
                                <span className="text-white">{data.postal_code}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-white/60 ">Proof of address</span>
                                <span className="text-white">{data.address_file}</span>
                            </p>

                        </div>
                        
                    </div>

                </div>

                <div className="flex justify-end item-end p-8">
                    <button className=" text-black font-bold bg-mtn w-200 hover:bg-mtn-800 p-8 py-4 rounded-full" onClick={() => {}}>Review & Submit</button>
                </div>

            </div>
        );
    }

}