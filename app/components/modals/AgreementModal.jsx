
import GenericModal from "./GenericModal.jsx";
import FormErrors from "@/app/components/FormErrors";
import { TailSpinPreloader } from "@/app/components/Icons";
import { useEffect, useContext, useState } from "react";
import useErrors from "@/hooks/useErrors";
import useUsers from "@/hooks/useUsers";
import { ContractContext } from "../../(protected)/(partner)/dashboard/contracts/ContractProvider";
import { role_types } from "@/app/modules/constants";


export default function ChooseSignatoryModal(){

    const {
        agreementModal, 
        setAgreementModal,
        acceptingAgreement, 
        setAcceptingAgreement

    } = useContext(ContractContext);

    const {user} = useUsers();

    const [{ errors, setError, clearErrors }] = useErrors(null);
    
    const [disableActiveButton, setDisableActiveButton] = useState(true);

    useEffect(() => {

    }, []);


    return (agreementModal && 
            <GenericModal id="agreement_modal" width={600} height={500} closeAction={() => setAgreementModal(false)}>
                <>
                    <div className="flex pt-8 pb-4">
                        <div className="text-white text-2xl mb-4 flex-1">Accept Terms</div>              
                    </div>

                    <div className="overflow-y-scroll">
                    
                        <div className="flex flex-col space-y-2">
                            <p className="text-gray-400">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet odio commodo, hendrerit urna sed, mattis ex. Sed dignissim sapien id ipsum fermentum, non imperdiet sem condimentum. Pellentesque consequat et quam ut venenatis. Suspendisse dictum sapien id odio sodales pretium. Etiam fermentum augue vitae lectus iaculis condimentum. Curabitur sit amet libero ornare, facilisis enim quis, vulputate justo. Nunc semper nibh eu justo dignissim laoreet. Mauris et venenatis lectus, vel mattis dolor. Nulla aliquet feugiat semper. Cras enim libero, aliquet eu condimentum sed, tristique at tortor. Nam justo enim, vulputate id elit quis, tincidunt egestas mi.
                            </p>
                            <p className="text-gray-400">
                            Maecenas suscipit a sapien eu bibendum. Curabitur in urna non ligula facilisis bibendum id at sapien. In ut nulla turpis. Curabitur tristique turpis id laoreet malesuada. Nam tristique orci lectus, consectetur tempor ex rutrum vitae. Aenean congue fringilla auctor. Sed tempus sed tellus vel placerat. Donec pharetra arcu quis laoreet mollis. Nulla iaculis arcu nec quam laoreet elementum. Donec fermentum, neque ut vestibulum faucibus, metus ante varius ante, eu sodales ipsum tortor nec ipsum. Suspendisse ultrices justo id tincidunt interdum. Fusce vel ultricies elit.
                            </p>
                            <p className="text-gray-400">
                            Praesent molestie arcu eget pharetra tempus. Aenean placerat arcu libero, id consequat nulla mattis ut. Phasellus lacus felis, vehicula ac mauris id, dignissim maximus quam. Praesent at semper enim. Morbi id vehicula ligula. Quisque nec nisl in lorem condimentum mollis. Etiam dolor augue, convallis eget imperdiet eget, viverra et justo. Sed aliquet, magna nec gravida sollicitudin, nisi sem bibendum erat, ut tincidunt nibh ipsum eget nulla. Vestibulum et consequat ex. Donec sed nulla commodo, placerat augue sed, posuere lacus.
                            </p>
                        </div>

                    </div>

                    <div className="absolute z-10 left-0 bottom-0 border-t-1 border-white/20 w-full p-4">
                        {!acceptingAgreement &&
                            <div className="flex py-4 px-2 space-x-4 justify-end">                    
                                <input type="checkbox" className="w-6 h-6 rounded bg-black/20" />
                                <label className="text-white ml-1">
                                    By clicking this checkbox, I agree to the terms in this document
                                </label>
                                <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={disableActiveButton} onClick={() => {}}>Proceed</button>
                            </div>
                        }
                        {acceptingAgreement &&
                            <div className="flex px-4">
                            <TailSpinPreloader width={40} height={40} fill="#efb703" />
                            </div>
                        }
                    </div>      
                </>
            </GenericModal>);

}