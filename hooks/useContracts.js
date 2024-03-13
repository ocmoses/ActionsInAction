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
import {
  apikey,
  role_types,
  questionnaire_pending,
} from "@/app/modules/constants";
import { useState, useEffect } from "react";

const useContracts = () => {
  const actions = useStoreActions((action) => action);
  const states = useStoreState((state) => state);

  const {
    partner,

    submitAllSignatories,
    downloadSignedContract,

    getAllAdminPartners,
  } = usePartners();

  const { getAllPartnerRoles } = useRoles();
  const { getQuestionnaireStatus } = useQuestionnaire();

  const [partnerRoles, setPartnerRoles] = useState([]);
  const [signatories, setSignatories] = useState({
    director: null,
    delegate: null,
    witness: null,
  });
  const [newSignatoryRole, setNewSignatoryRole] = useState("");
  const [adminPartners, setAdminPartners] = useState([]);

  const [agreementModal, setAgreementModal] = useState(false);
  const [selectServiceModal, setSelectServiceModal] = useState(false);
  const [addSignatoryModal, setAddSignatoryModal] = useState(false);
  const [selectSignatoryModal, setSelectSignatoryModal] = useState(false);
  const [contractSignatriesModal, setContractSignatriesModal] = useState(false);
  const [chooseSignatoryModal, setChooseSignatoryModal] = useState(false);

  const [acceptingAgreement, setAcceptingAgreement] = useState(false);
  const [allowSubmitSignatories, setAllowSubmitSignatories] = useState(false);
  const [submitingContractSignatories, setSubmitingContractSignatories] =
    useState(false);
  const [submitingContractSignatures, setSubmitingContractSignatures] =
    useState(false);
  const [contractSignatoriesSuccess, setContractSignatoriesSuccess] =
    useState(false);

  const [showContractCategoryModal, setShowContractCategoryModal] =
    useState(false);

  const [{ setError }] = useErrors(null);

  //data for creating signatories
  const [data, setData] = useState({
    partner_uuid: partner?.uuid,
    phone: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const { user } = useUsers();

  const { Logout } = useLogout();

  const { admin } = useAdmins();

  const { setProcessing } = useProcessing();

  const [questionnaireAlert, setQuestionnaireAlert] = useState(false);

  const [toFillQuestionnaire, setToFillQuestionnaire] = useState(false);

  const [annexuresLink, setAnnexuresLink] = useState("");

  const [hasContractToSign, setHasContractToSign] = useState(false);

  const [contract, setContract] = useState(null);

  const contractStatus = partner?.contract_status; //What is the user's contract status
  const userStatus = partner?.status; //What is the user's status
  const vasPartnerStatus = partner?.vas_partner_contract_status;
  let selectedAllRequiredSignatories = false; //has all required signatories been selected
  let isASignatory = false; //Is this user a signatory for the current contract?
  let signatoryRole = null; //The user's role as a signatory
  let allHaveSigned = false; //have all selected sugnatories signed?
  let hasSigned = false; //has this user signed?
  const isPartner = partner != null; //Is this an MTN admin or a partner?

  

  //This only works for bilateral contract
  const selected_admin_users = partner?.selected_partner_admin_users;
  console.log("selected_admin_users==", selected_admin_users);
  
  let signingDirector = selected_admin_users?.find(
    (user) => user.role == "director" && user.contract_id == contract?.contract_id
  );
  let signingDelegate = selected_admin_users?.find(
    (user) => user.role == "delegate" && user.contract_id == contract?.contract_id
  );
  let signingWitness = selected_admin_users?.find(
    (user) => user.role == "witness" && user.contract_id == contract?.contract_id
  );

  console.log("signingDirector==", signingDirector);
  console.log("signingDelegate==", signingDelegate);
  console.log("signingWitness==", signingWitness);

  //Have we selected all required signatories?
  selectedAllRequiredSignatories =
    (signingDirector || signingDelegate) && signingWitness;

  //Has each of the roles signed?
  const directorSigned = signingDirector
    ? signingDirector?.has_user_signed != "no"
    : false;
  const delegateSigned = signingDelegate
    ? signingDelegate?.has_user_signed != "no"
    : false;
  const witnessSigned = signingWitness
    ? signingWitness?.has_user_signed != "no"
    : false;

  //Setting signatory role here
  //And whether user has signed
  if (signingDirector?.email.includes(user.email)) {
    isASignatory = true;
    signatoryRole = role_types.DIRECTOR;
    if (directorSigned) {
      hasSigned = true;
    }
  } else if (signingDelegate?.email.includes(user.email)) {
    isASignatory = true;
    signatoryRole = role_types.DELEGATE;
    if (delegateSigned) {
      hasSigned = true;
    }
  } else if (signingWitness?.email.includes(user.email)) {
    isASignatory = true;
    signatoryRole = role_types.WITNESS;
    if (witnessSigned) {
      hasSigned = true;
    }
  }

  //Has everyone signed?
  allHaveSigned = (directorSigned || delegateSigned) && witnessSigned;

  const isSuperadmin = () => user?.role == "superAdmin"; //or admin role is superadmin

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

  const partnerGetAllContracts = async (page, perPage) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.PARTNER_GET_ALL_CONTRACTS.replace(
          ":partner_uuid",
          partner.uuid
        )}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey,
            token: user.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        }
      );

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
        contracts.forEach((c) => (c.status = c.contract_status));

        console.log("All CONTRACTS", contracts);

        let contractToSign = contracts.find(c => c.contract_id != null && c.contract_id != "null" && 
                        c.contract_status == "not_active" || (c.contract_status == "started" && !hasSigned));

        setHasContractToSign(contractToSign != null && contractToSign != undefined);

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

  const selectNewSignatoryRole = (role) => {
    setNewSignatoryRole(role);

    switch (role) {
      case role_types.DIRECTOR:
        setData({
          ...data,
          role: partnerRoles?.find((r) => r.role_name == role_types.DIRECTOR)
            ?.uuid,
        });
        break;
      case role_types.DELEGATE:
        setData({
          ...data,
          role: partnerRoles?.find((r) => r.role_name == role_types.DELEGATE)
            ?.uuid,
        });
        break;
      case role_types.WITNESS:
        setData({
          ...data,
          role: partnerRoles?.find((r) => r.role_name == role_types.WITNESS)
            ?.uuid,
        });
        break;
      default:
        break;
    }
  };

  const submitSignatories = () => {
    submit_signatories(signatories);
  };

  const submit_signatories = async (signatories) => {
    let data = { email: [], contract_id: contract?.contract_id };

    console.log("signatories", signatories);

    for (let prop in signatories) {
      if (signatories[prop]) {
        data.email.push(signatories[prop].email);
      }
    }

    if ((signatories.director || signatories.delegate) && signatories.witness) {
      if (submitingContractSignatories) return;
      setSubmitingContractSignatories(true);
      let submit_signatories_response = await submitAllSignatories(data);
      setSubmitingContractSignatories(false);
      if (submit_signatories_response.error) {
        setError({ error: submit_signatories_response.error });
      } else {
        setContractSignatriesModal(false);
        setContractSignatoriesSuccess(true);
        refreshSession();
      }
    } else {
      setError({
        error: "You must choose a director or delegate and a witness",
      });
    }
  };

  const checkQuestionnaireStatus = () =>
    getQuestionnaireStatus()
      .then((response) => {
        console.log("Questionnaire status response", response);
        console.log("response.status", response.status);
        console.log("response.error", response.error);
        if (response.status == "rejected") {
          setQuestionnaireAlert(true);
          setRejectionReason(response.rejectionReason);
        } else if (response.error && response.error == questionnaire_pending) {
          setQuestionnaireAlert(true);
        } else if (
          response.message &&
          response.message == questionnaire_pending
        ) {
          setQuestionnaireAlert(true);
        } else {
          setQuestionnaireAlert(false);
          setToFillQuestionnaire(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setError({ error: error.message });
      });

  useEffect(() => {
    if (!admin) {
      getAllPartnerRoles()
        .then((resp) =>
          resp.partner_roles
            ? setPartnerRoles(resp.partner_roles)
            : setError({ error: resp.error })
        )
        .catch((error) => setError({ error: "Error fetching roles" }));

      getAllAdminPartners()
        .then((resp) =>
          resp.admin_partners
            ? setAdminPartners(resp.admin_partners)
            : setError({ error: resp.error })
        )
        .catch((error) => setError({ error: "Error fetching admin partners" }));
    }
  }, []);

  const getContractBeingSigned = async () => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_CONTRACT_BEING_SIGNED.replace(
          ":partner_uuid",
          partner.uuid
        )}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            apikey,
            token: user.token,
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      if (response.status === 401) {
        Logout();
        return;
      }

      const result = await response.json();

      console.log("CONTRACT BEING SIGNED", result);
      setProcessing(false);
      if (result?.success) {
        const contract = result.data;
        return {
          contract,
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

  return {
    ...states,
    ...actions,
    isSuperadmin,
    getAllContracts,
    ...usePartners(),
    contract,
    contractStatus,
    userStatus,
    vasPartnerStatus,
    selectedAllRequiredSignatories,
    isASignatory,
    signatoryRole,
    allHaveSigned,
    hasSigned,
    isPartner,
    signingDirector,
    signingDelegate,
    signingWitness,
    partnerGetAllContracts,
    partnerRoles,
    adminPartners,

    data,
    setData,
    resetData,
    newSignatoryRole,
    setNewSignatoryRole,
    selectNewSignatoryRole,

    signatories,
    setSignatories,
    agreementModal,
    setAgreementModal,
    selectServiceModal,
    setSelectServiceModal,
    selectSignatoryModal,
    setSelectSignatoryModal,
    addSignatoryModal,
    setAddSignatoryModal,
    contractSignatriesModal,
    setContractSignatriesModal,
    chooseSignatoryModal,
    setChooseSignatoryModal,

    acceptingAgreement,
    setAcceptingAgreement,
    allowSubmitSignatories,
    setAllowSubmitSignatories,
    submitingContractSignatories,
    setSubmitingContractSignatories,
    submitSignatories,
    submitingContractSignatures,
    setSubmitingContractSignatures,
    contractSignatoriesSuccess,
    setContractSignatoriesSuccess,

    downloadSignedContract,
    checkQuestionnaireStatus,

    showContractCategoryModal,
    setShowContractCategoryModal,

    toFillQuestionnaire,
    setToFillQuestionnaire,

    getContractBeingSigned,

    annexuresLink,
    setAnnexuresLink,

    hasContractToSign,
    contract,
    setContract
  };
};

export default useContracts;
