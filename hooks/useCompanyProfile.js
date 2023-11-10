"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import useLogout from "@/hooks/useLogout";
import usePartners from "@/hooks/usePartners";
import useUsers from "@/hooks/useUsers";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import { apikey, role_types, questionnaire_pending} from "@/app/modules/constants";
import {useState, useEffect} from "react";


const useCompanyProfile = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  console.log("states from useCompanyProfile", states);
  
  const {
    partner
  } = usePartners();


  const [{ errors, setError, clearErrors }] = useErrors(null);

 
  const {user} = useUsers();

  const {Logout, LogoutAdmin} = useLogout();

  const [changeAddressDialogue, setChangeAddressDialogue] = useState(false);
  const [changeAddressModal, setChangeAddressModal] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [addShortcodeDialogue, setAddShortcodeDialogue] = useState(false);
  const [addShortcodeModal, setAddShortcodeModal] = useState(false);


  const [addVASLicenseDialogue, setAddVASLicenseDialogue] = useState(false);
  const [addVASLicenseModal, setAddVASLicenseModal] = useState(false);

  
  const {admin} = useAdmins();

  // console.log('User from within useContracts', states.users);

  const { setProcessing } = useProcessing();  

  const isSuperadmin = () => user?.role == 'superAdmin'; //or admin role is superadmin

  useEffect(() => {
    
  }, []);
 
  return { 
    ...states, 
    ...actions, 
    isSuperadmin,  
    partner,
    changeAddressDialogue, 
    setChangeAddressDialogue,
    changeAddressModal, 
    setChangeAddressModal,
    profileSuccess,
    setProfileSuccess,
    addShortcodeDialogue, 
    setAddShortcodeDialogue,
    addShortcodeModal, 
    setAddShortcodeModal,
    addVASLicenseDialogue, 
    setAddVASLicenseDialogue,
    addVASLicenseModal, 
    setAddVASLicenseModal

  };
};

export default useCompanyProfile;
