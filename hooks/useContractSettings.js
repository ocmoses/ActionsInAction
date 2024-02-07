"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import useLogout from "@/hooks/useLogout";
import usePartners from "@/hooks/usePartners";
import useUsers from "@/hooks/useUsers";
import { useState, useEffect } from "react";

const useContractSettings = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const tabs = {
    CHANGE_SHORT_CODE: "Change short code",
    ADD_SHORT_CODE: "Add short code",
    ADD_VAS_LICENSE: "Add VAS license",
    CHANGE_ADDRESS: "Change address",
    ADD_SERVICE: "Add service",
    REVIEW_AND_SUBMIT: "Review & submit",
  };

  const { partner } = usePartners();

  //data for creating signatories
  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    service: "",
    shortcode: "",
    new_shortcode: "",
    new_shortcode_issue_date: "",
    new_shortcode_expiry_date: "",
    new_vas_license_id: "",
    new_vas_license_issue_date: "",
    new_vas_license_expiry_date: "",
    company_address: "",
    city: "",
    state: "",
    postal_code: "",
    bearer: "",
  });

  const { user } = useUsers();

  const isSuperadmin = () => user?.role == "superAdmin"; //or admin role is superadmin

  const { Logout } = useLogout();

  const { setProcessing } = useProcessing();

  const [requestChangesDialogue, setRequestChangesDialogue] = useState(false);
  const [requestChangesModal, setRequestChangesModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs.CHANGE_SHORT_CODE);

  let currentContract = null; //Is there a current contract

  const getAllContracts = async (page, perPage) => {
    try {
      setProcessing(true);
      const response = await fetch(`${RemoteEndpoints.GET_ALL_CONTRACTS}`, {
        cache: "no-store",
        next: { revalidate: 120 },
        headers: {
          token: states.admins.token,
          "Content-Type": "application/json",
          Authorization: `bearer ${states.admins.token}`,
        },
      });

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      setProcessing(false);
      if (result?.success) {
        const contracts = result.data?.contracts;

        return {
          contracts,
        };
      }
      return {
        error:
          result?.data?.message ??
          "Something went wrong. Please check your connection and try again",
      };
    } catch (error) {
      console.log({ error });
      return {
        error:
          error.message ??
          "Something went wrong. Please check your connection and try again",
      };
    }
  };

  const resetData = () => {
    setData({
      ...data,
      partner_uuid: partner?.uuid,
      phone: "000000000",
      firstname: "",
      lastname: "",
      email: "",
      role: "",
    });
  };

  useEffect(() => {}, []);

  return {
    ...states,
    ...actions,
    isSuperadmin,
    getAllContracts,
    ...usePartners(),
    currentContract,

    data,
    setData,
    resetData,
    requestChangesDialogue,
    setRequestChangesDialogue,
    requestChangesModal,
    setRequestChangesModal,

    tabs,
    currentTab,
    setCurrentTab,
  };
};

export default useContractSettings;
