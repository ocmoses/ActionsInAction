"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import usePartners from "@/hooks/usePartners";
import useUsers from "@/hooks/useUsers";

import { useState, useEffect } from "react";

const useCompanyProfile = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const { partner } = usePartners();

  const { user } = useUsers();

  const [changeAddressDialogue, setChangeAddressDialogue] = useState(false);
  const [changeAddressModal, setChangeAddressModal] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [addShortcodeDialogue, setAddShortcodeDialogue] = useState(false);
  const [addShortcodeModal, setAddShortcodeModal] = useState(false);

  const [addVASLicenseDialogue, setAddVASLicenseDialogue] = useState(false);
  const [addVASLicenseModal, setAddVASLicenseModal] = useState(false);

  const isSuperadmin = () => user?.role == "superAdmin"; //or admin role is superadmin

  useEffect(() => {}, []);

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
    setAddVASLicenseModal,
  };
};

export default useCompanyProfile;
