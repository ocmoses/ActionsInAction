
import GenericModal from "./GenericModal";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";


export default function SelectServiceModal({visible, closeAction, callback}){

    const {
        partner,
        partnerSelectService,
        getAllServices,
        selectServiceModal,
        setSelectServiceModal,
        contractSignatriesModal, 
        setContractSignatriesModal
    } = useContext(ContractContext);

    const [allServices, setAllServices] = useState([]);
    const [gettingServiceTypes, setGettingServiceTypes] = useState(false);
    const [selectingService, setSelectingService] = useState(false);
    const [{ errors, setError, clearErrors }] = useErrors(null);

    let get_service_response = null;
    let partner_select_service_response = null;

    const get_service_types = async () => {
        clearErrors();
        if (gettingServiceTypes) return;
        setGettingServiceTypes(true);
        get_service_response = await getAllServices();
        setGettingServiceTypes(false);
        // console.log('get_service_response', get_service_response);
        if (get_service_response.error) setError({ error: get_service_response.error })
        else {
            // console.log('get_service_response', get_service_response);
            setAllServices(get_service_response.service_types);
        }
    };

    const selectService = (name) => {
        //make server call...
        // console.log("Partner here: ", partner);
        const data = {
                        partner_uuid: `${partner.uuid}`, 
                        service_type: [name]
                      };
        partner_select_service(data);
        
    }

    const partner_select_service = async (data) => {

        clearErrors();
        if (selectingService) return;
        setSelectingService(true);
        partner_select_service_response = await partnerSelectService(data);
        setSelectingService(false);
        // console.log('partner_select_service_response', partner_select_service_response);
        if (partner_select_service_response.error) setError({ error: partner_select_service_response.error })
        else {
            // console.log('partner_select_service_response', partner_select_service_response);
            
            setSelectServiceModal(false); 
            setContractSignatriesModal(true);
    
        }
    };

    useEffect(() => {
        get_service_types();
    }, []);

    return (selectServiceModal && 
            <GenericModal id="select_service_modal" width={500} closeAction={closeAction}>
                <>
                    <div className="flex pt-8">
                        <div className="text-white text-2xl mb-4 flex-1">Select a service to renew</div>
                        <div className="cursor-pointer" onClick={closeAction}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div> 
                    </div>

                    {errors && (
                        <div className="my-6">
                            <FormErrors error={errors.error} />
                        </div>
                    )}

                    {
                        gettingServiceTypes ? (
                            <div className="flex justify-center items-center h-76">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div>
                        ): (
                            allServices.map(service => 
                            <div key={`${service.id}-index`} className="m-4 rounded-lg bg-white/20 flex cursor-pointer hover:bg-white/40 hover:border-1 hover:border-color-[#212121]" 
                                onClick={() => selectService(service.name_of_service_type)}>
                                <div className="w-16 h-16 flex justify-center items-center p-4 m-4 bg-white/20 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-8 h-8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <div className="p-4 flex flex-col items-center justify-center space-y-2">
                                    <p className="text-white text-md">{service.name_of_service_type}</p>
                                    <span className="text-xs color-black px-2 py-1 rounded bg-green-200 inline-flex">Active</span>
                                </div>
                            </div>)
                        )
                    }                
                </>
            </GenericModal>);

}