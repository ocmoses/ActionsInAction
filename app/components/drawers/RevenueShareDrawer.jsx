"use client";
import { useState, useEffect, useCallback } from "react";
import TextInput from "@/app/components/form/TextInput";
import SideDrawer from "@/app/components/dashboard/SideDrawer";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import useAdmins from "@/hooks/useAdmins";
import Success from "@/app/components/toasts/Success";
import { TailSpinPreloader } from "@/app/components/Icons";



export default function RevenueShareDrawer({request, openDrawer, closeAction}){

  const {approveRevenueShare, approvals} = useAdmins();

  // console.log("REVENUE SHARE REQUEST", request);
  
  const [approving, setApproving] = useState(false);  

  const [data, setData] = useState({partner_uuid: request.uuid, exclusive_content: "no", 
                                    premium_content: "no", licensed_content: "no", 
                                    content_provider_share: "", mtn_share: "", 
                                    status: "approved"});

  const [{ errors, setError, clearErrors }] = useErrors(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false);
                                                  location.reload();
                                                }, 3000);

  
  const handleFormChange = (e) => {
    clearErrors();
    const field = e.target.id;
    setData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const validateData = () => {
    
    if(data.content_provider_share.trim() == ""){

      setError({error: "Please enter a content provider share"});

      return false;

    }else if(isNaN(parseInt(data.content_provider_share))){

      setError({error: "Please enter a valid content provider share"});

      return false;

    }else if(parseInt(data.content_provider_share) >= 100){
      
      setError({error: "Content provider percentage cannot be higher than 100%"});

      return false;

    }
    // else if(parseInt(data.content_provider_share) > 40){
      
    //   setError({error: "Content provider's share should be 40% or lower"});

    //   return false;

    // }
    else if(data.mtn_share.trim() == ""){

      setError({error: "Please enter MTN's share"});

      return false;

    }else if(isNaN(parseInt(data.mtn_share))){

      setError({error: "Please enter a valid MTN'sshare"});

      return false;

    }else if(parseInt(data.mtn_share) >= 100){
      
      setError({error: "MTN's share cannot be higher than 100%"});

      return false;
    }
    // else if(parseInt(data.mtn_share) < 60){
      
    //   setError({error: "MTN share can't be less than 60%"});

    //   return false;

    // }
    else if(parseInt(data.content_provider_share) + parseInt(data.mtn_share) != 100){
      
      setError({error: "These percentages don't add up"});

      return false;
    }

    return true;
  }

  // console.log("DATA", data);

  const approve = async () => {

    clearErrors();

    if(!validateData()){
      return;
    }

    if (approving) return;
    setApproving(true);
    
    let approve_request_response = await approveRevenueShare(data);
      

    setApproving(false);

    if (approve_request_response.message) {
      //display success
      setSuccessMessage(approve_request_response.message);
      //set selected brd to null
      setSuccessToast(true);
    } else {
      //set errors
      setError({ error: approve_request_response.error });
    }

    if (approve_request_response.error)
      setError({ error: approve_request_response.error });

  }

    return (
        <SideDrawer request={request} openDrawer={openDrawer} 
                  closeAction={() => closeAction()}>
          <div className="flex flex-col space-y-8 border-b border-white/20 pb-8">

            <div className="flex space-x-4">
              <p className="text-white">{request?.request_type}</p>
              <span className="border-1 border-white/20 px-2 py-1 text-mtn text-sm bg-white/5 rounded-full">Basic</span>
            </div>

            <div className="flex space-x-2 justify-between">

              <div>
                <p className="text-white">Exclusive content</p>
                <span className="text-white/40">Offers exclusive content</span>
              </div> 

              <div className="flex space-x-4">
                <button onClick={() => setData({...data, exclusive_content: "yes"})} className={`text-white border-1 text-sm py-2 w-16 hover:bg-white/5 cursor-pointer ${data["exclusive_content"] == "yes" ? 'border-yellow-300' : 'border-white/40'} rounded`}>YES</button>
                <button onClick={() => setData({...data, exclusive_content: "no"})}  className={`text-white border-1 text-sm p2-2 w-16 hover:bg-white/5 cursor-pointer ${data["exclusive_content"] == "no" ? 'border-yellow-300' : 'border-white/40'} rounded`}>NO</button>
              </div>

            </div>

            <div className="flex space-x-2 justify-between">

              <div>
                <p className="text-white">Premium content</p>
                <span className="text-white/40">Offers premium content</span>
              </div> 

              <div className="flex space-x-4">
                <button onClick={() => setData({...data, premium_content: "yes"})} className={`text-white border-1 text-sm py-2 w-16 hover:bg-white/5 cursor-pointer ${data["premium_content"] == "yes" ? 'border-yellow-300' : 'border-white/40'} rounded`}>YES</button>
                <button onClick={() => setData({...data, premium_content: "no"})} className={`text-white border-1 text-sm p2-2 w-16 hover:bg-white/5 cursor-pointer ${data["premium_content"] == "no" ? 'border-yellow-300' : 'border-white/40'} rounded`}>NO</button>
              </div>

            </div>

            <div className="flex space-x-2 justify-between">

              <div>
                <p className="text-white">Licensed content</p>
                <span className="text-white/40">Offers licensed content</span>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setData({...data, licensed_content: "yes"})} className={`text-white border-1 text-sm py-2 w-16 hover:bg-white/5 cursor-pointer ${data["licensed_content"] == "yes" ? 'border-yellow-300' : 'border-white/40'} rounded`}>YES</button>
                <button onClick={() => setData({...data, licensed_content: "no"})} className={`text-white border-1 text-sm p2-2 w-16 hover:bg-white/5 cursor-pointer ${data["licensed_content"] == "no" ? 'border-yellow-300' : 'border-white/40'} rounded`}>NO</button>
              </div>


            </div>
            
          </div>

          <div className="flex flex-col space-y-1">

            <div className="flex space-x-4 my-6">
              <p className="text-white">Revenue allocation</p>
            </div>

            <div className="flex space-x-2 justify-between">

              <div>
                <p className="text-white">Content provider’s share</p>
                {/* <span className="text-white/40">0% to 40%</span> */}
              </div> 

              <div className="flex space-x-4 w-24 relative">
                <TextInput
                  id="content_provider_share"
                  label=""
                  value={data.content_provider_share}
                  onChange={handleFormChange}
                  onBlur={handleFormChange}
                  errors={errors}
                  disabled={false}
                />
                <p className="absolute right-2 top-2 py-3 px-2 rounded bg-white/20 text-white">%</p>
              </div>

              
            </div>

            <div className="flex space-x-2 justify-between">

              <div>
                <p className="text-white">MTN share</p>
                {/* <span className="text-white/40">60%</span> */}
              </div> 

              <div className="flex space-x-4 w-24 relative">
                <TextInput
                  id="mtn_share"
                  label=""
                  value={data.mtn_share}
                  onChange={handleFormChange}
                  onBlur={handleFormChange}
                  errors={errors}
                  disabled={false}
                />
                <p className="absolute right-2 top-2 py-3 px-2 rounded bg-white/20 text-white">%</p>
              </div>
              
            </div>
            
          </div>
          

          {
            !approving && 
            <div className="flex between w-full">
              <div className="w-1/2">
                {errors && errors["error"] && (
                  <div className="mb-6">
                    <FormErrors error={errors["error"]} />
                  </div>
                )}
              </div>
              {approvals && approvals.can_approve.includes("revenue_share") &&
                request.status != "approved" &&
                  <div className="w-1/2 flex justify-end h-[34px]">
                    <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => approve()}>Finish</button>
                  </div>
              }
            </div>            
          }
          {
            approving && 
            <div className="flex px-4">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
            </div>
          }

          <Success message={successMessage} visible={successToast} action={successAction} />

        </SideDrawer>
    );
}