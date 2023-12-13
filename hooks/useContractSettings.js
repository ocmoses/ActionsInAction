"use client";
import { useStoreActions, useStoreState } from "easy-peasy";
import useProcessing from "@/hooks/useProcessing";
import RemoteEndpoints from "@/app/modules/endpoints";
import useLogout from "@/hooks/useLogout";
import usePartners from "@/hooks/usePartners";
import useRoles from "@/hooks/useRoles";
import useUsers from "@/hooks/useUsers";
import useAdmins from "@/hooks/useAdmins";
import useErrors from "@/hooks/useErrors";
import useQuestionnaire from "@/hooks/useQuestionnaire";
import { apikey, role_types, questionnaire_pending} from "@/app/modules/constants";
import {useState, useEffect} from "react";


const useContractSettings = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  // console.log("states from useContracts", states);

  const tabs = {
    CHANGE_SHORT_CODE: "Change short code",
    ADD_SHORT_CODE: "Add short code",
    ADD_VAS_LICENSE: "Add VAS license",
    CHANGE_ADDRESS: "Change address",
    ADD_SERVICE: "Add service",
    REVIEW_AND_SUBMIT: "Review & submit"
  };
  
  const {
    partner,
    partnerSelectService,
    createPartner,
    submitAllSignatories,
    downloadSignedContract,
    getContractDynamicData,
    getStages,
    selectedCategory,
    setSelectedCategory,
    Stages,
    setStages,
    activeStage,
    setActiveStage,
    categories,
    getAllAdminPartners,
    getAllServices,
  } = usePartners();

  const [{ errors, setError, clearErrors }] = useErrors(null);

  //data for creating signatories
  const [data, setData] = useState({partner_uuid: partner?.uuid, service: "", shortcode: "",
                                      new_shortcode: "", new_shortcode_issue_date: "", new_shortcode_expiry_date: "",
                                      new_vas_license_id: "", new_vas_license_issue_date: "", new_vas_license_expiry_date: "",
                                      company_address: "", city: "", state: "", postal_code: "", bearer: ""});
  
  
  const {user} = useUsers();

  const isSuperadmin = () => user?.role == 'superAdmin'; //or admin role is superadmin

  const {Logout, LogoutAdmin} = useLogout();

  const {admin} = useAdmins();

  // console.log('User from within useContracts', states.users);

  const { setProcessing } = useProcessing();

  const [questionnaireAlert, setQuestionnaireAlert] = useState(false);

  const [requestChangesDialogue, setRequestChangesDialogue] = useState(false);
  const [requestChangesModal, setRequestChangesModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs.CHANGE_SHORT_CODE);

  let currentContract = null; //Is there a current contract
  
  const getAllContracts = async (page, perPage) => {

    // return [{
    //     title: "CVE0-003",
    //     contract_status: "expired",
    //     contract_id: "123esrs",
    //     company: "ABC",
    //     start_date: "today",
    //     due_date: "tomorrow"
    // }, 
    // {
    //     title: "CVE0-180",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-000",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // },
    // {
    //     title: "CVE0-123",
    //     contract_status: "active",
    //     contract_id: "123esrs",
    //     company: "XYZ",
    //     start_date: "today",
    //     due_date: "11/11/2023"
    // }];
    try {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (perPage) params.push(`per_page=${perPage}`);

      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_CONTRACTS}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            token: states.admins.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${states.admins.token}`,
          },
        }
      );
      
      if (!response)
      return {
        error: "This request has no response available",
      };

      if (response.status === 401 ) {
        Logout();
        return;
      }

      const result = await response.json();

      // console.log('RemoteEndpoints.GET_ALL_CONTRACTS', RemoteEndpoints.GET_ALL_CONTRACTS);
      // console.log('ALL CONTRACTS', result);
      // console.log('states.admins.token', states.admins.token);

      setProcessing(false);
      if (result?.success) {
        const contracts = result.data?.contracts;
        
        // console.log('Admin roles retrieved', admin_roles);
        
        return {
          contracts
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
    setData({...data, partner_uuid: partner?.uuid, phone: '000000000', firstname: "", lastname: "", email: "", 
                  role: ""});
  }

  useEffect(() => {
    
  }, []);
 
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
    setCurrentTab

  };
};

export default useContractSettings;
