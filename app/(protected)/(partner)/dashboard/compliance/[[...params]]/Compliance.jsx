"use client";
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer";
import ComplianceDetailPartners from "@/app/components/dashboard/partners/ComplianceDetailPartners";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import { useState, useEffect } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
import {
  filterCategory,
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
  getStatuses,
  partnerApprovals,
  base64
} from "@/app/modules/utilities";
import Image from "next/image";
import useApp from "@/hooks/useApp";
import ComplianceCategories from "@/app/components/dashboard/partners/ComplianceCategories";
import { useRouter } from "next/navigation";
import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import TextInput from "@/app/components/form/TextInput";
import { fieldsCounts, fieldCounts } from "@/app/modules/constants";
import useRoles from "@/hooks/useRoles";




export default function Compliance({ params }) {
  const router = useRouter();
  const {getAllPartnerRoles} = useRoles();
  const { processing, setProcessing } = useProcessing();  
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const {
    getStages,
    selectedCategory,
    setSelectedCategory,
    Stages,
    setStages,
    activeStage,
    setActiveStage,
    partner,
    categories,
    getAllAdminPartners,
    getAllServices,
    partnerSelectService,
    createPartner,
    submitAllSignatories
  } = usePartners();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setRouteloading } = useApp();

  const [allServices, setAllServices] = useState([]); 
  const [gettingServiceTypes, setGettingServiceTypes] = useState(false);

  // const [ApprovalStages, setApprovalStages] = useState(null)
  // const [Approvals, setApproval] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const [contractModal, setContractModal] = useState(false);
  const [contractSignatriesModal, setContractSignatriesModal] = useState(false);
  const [submitingContractSignatories, setSubmitingContractSignatories] = useState(false);
  const [selectDirectorModal, setSelectDirectorModal] = useState(false);  
  const [addDirectorModal, setAddDirectorModal] = useState(false);
  const [addingDirector, setAddingDirector] = useState(false);  
  const [addDelegateModal, setAddDelegateModal] = useState(false);
  const [addingDelegate, setAddingDelegate] = useState(false);
  const [addWitnessModal, setAddWitnessModal] = useState(false);
  const [addingWitness, setAddingWitness] = useState(false);
  const [contractSignatoriesSuccess, setContractSignatoriesSuccess] = useState(false);

  const [selectingService, setSelectingService] = useState(false);

  const [signatories, setSignatories] = useState({director: null, delegate: null, witness: null});

  const [creatingPartner, setCreatingPartner] = useState(false);
  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [fetchingAdminPartners, setFetchingAdminPartners] = useState(false);
  const [adminPartners, setAdminPartners] = useState([]);
  const [partnerRoles, setPartnerRoles] = useState([]);

  const [data, setData] = useState({partner_uuid: partner.uuid, phone: '', firstname: "", lastname: "", email: "", role: ""});
  const [disableActiveButton, setDisableActiveButton] = useState(true);

  const [allowSubmitSignatories, setAllowSubmitSignatories] = useState(false);


  let get_service_response = null;
  let partner_select_service_response = null;
  let create_partner_response = null;
  let all_Roles = null;
  let all_admin_partners_response = null;
  let submit_signatories_response = null;

  const get_service_types = async () => {
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

  const partner_select_service = async (data) => {
    if (selectingService) return;
    setSelectingService(true);
    partner_select_service_response = await partnerSelectService(data);
    setSelectingService(false);
    // console.log('partner_select_service_response', partner_select_service_response);
    if (partner_select_service_response.error) setError({ error: partner_select_service_response.error })
    else {
        // console.log('partner_select_service_response', partner_select_service_response);
        setContractModal(false); 
        setContractSignatriesModal(true);

    }
  };

  const get_all_partner_roles = async () => {
    if (fetchingPartnerRoles) return;
    setFetchingPartnerRoles(true);
    all_Roles = await getAllPartnerRoles();
    setPartnerRoles(all_Roles.partner_roles);
    setFetchingPartnerRoles(false);
    if (all_Roles.error) setError({ error: all_Roles.error });
    // setNavigation(all_Admins.navigation);
  };

  const get_all_admin_partners = async () => {
    if (fetchingAdminPartners) return;
    setFetchingAdminPartners(true);
    all_admin_partners_response = await getAllAdminPartners();
    setAdminPartners(all_admin_partners_response.admin_partners);
    setFetchingAdminPartners(false);
    if (all_admin_partners_response.error) setError({ error: all_admin_partners_response.error });
    // setNavigation(all_Admins.navigation);
  };

  const submit_signatories = async (signatories) => {

    let data = {"email": []};

    console.log("signatories", signatories);

    for(let prop in signatories){
      data.email.push(signatories[prop].email);
    }

    if(data.email.length == 3){
      if (submitingContractSignatories) return;
      setSubmitingContractSignatories(true);
      submit_signatories_response = await submitAllSignatories(data);
      setSubmitingContractSignatories(false);
      if (submit_signatories_response.error) setError({ error: submit_signatories_response.error });
    }else{
      setError({error: "Please select all signatories"});
    }
    
  };


  useEffect(() => {
    setProcessing(false);
    setRouteloading(false);
    get_service_types();
    get_all_partner_roles();
    get_all_admin_partners();
  }, []);

  useEffect(() => {
    fieldsCounts();
  }, [partner.approvalStages]);

  useEffect(() => {
    let html = document.getElementsByTagName("html");
    if (openDrawer) html[0].style["overflow-y"] = "hidden";
    else html[0].style["overflow-y"] = "auto";
  }, [openDrawer]);

  useEffect(() => {
    if (partner && params.params?.length > 0) {
      filterFields(partner);
      filterComplianceRequirements(partner);
      filterApprovalFields(partner);

      const [_category] = params.params;
      const _selectedCategory = partner?.categories?.find(
        (c) => c.category_uuid === _category
      );
      const _filtered_selectedCategory = filterCategory(
        _selectedCategory,
        partner
      );
      setSelectedCategory(_filtered_selectedCategory);
      const _stages = getStages(_filtered_selectedCategory, categories);
      setStages(_stages);
    }
    // console.log({ partner })
  }, [partner, params, selectedCategory]);

  
  const handleOpenDrawer = (stage) => {
    setActiveStage(stage);
    setOpenDrawer(true);
  };

  
  const showContracts = () => {
    //Get all contracts and display
    setContractModal(true);
  }

  const showAgreement = () => {
    //Get all contracts and display
    router.push("dashboard/contracts/")
  }

  const selectService = (name) => {
    //make server call...
    console.log("Partner here: ", partner);
    const data = {
                    partner_uuid: `${partner.uuid}`, 
                    service_type: [name]
                  };
    partner_select_service(data);
    
  }

  const submitSignatories = () => {
    submit_signatories(signatories);
  }

  const convertFile = (e) => {
    // Get a reference to the file
    const file = e.target.files[0];

    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        // console.log('base64String', base64String);
        setData({...data, file:base64String});
        // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
  };

  const create_partner = async (data) => {
    if (creatingPartner) return;
    setCreatingPartner(true);
    create_partner_response = await createPartner(data);

    //Just setting the signatories anyway
    if(data.role == partnerRoles.find(role => role.role_name == 'director').uuid){
      setSignatories({...signatories, director: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
    }else if(data.role == partnerRoles.find(role => role.role_name == 'delegate').uuid){
      setSignatories({...signatories, delegate: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
    }else{
      setSignatories({...signatories, witness: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
    }
    ///////////////////////////////////////
    
    if (create_partner_response.error) setError({ error: create_partner_response.error })
    else {
        console.log('create_partner_response', create_partner_response);

        if(data.role == partnerRoles.find(role => role.role_name == 'director').uuid){
          setSignatories({...signatories, director: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
        }else if(data.role == partnerRoles.find(role => role.role_name == 'delegate').uuid){
          setSignatories({...signatories, delegate: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
        }else{
          setSignatories({...signatories, witness: {email: data.email, firstname: data.firstname, lastname: data.lastname}});
        }
        
    }
    setCreatingPartner(false);
    setAddDirectorModal(false);
    setAddDelegateModal(false);
    setAddWitnessModal(false);
    setContractSignatriesModal(true);
    setDisableActiveButton(true);
    // setNavigation(all_AdminRoles.navigation);
  };

  const handleCreate = () => {
    console.log('data in handleCreate', data);
    console.log('allRoles', partnerRoles);
    if(data.firstname == ""){
        setError({error: "Please enter user's first name"});
        return;
    }
    if(data.lastname == ""){
      setError({error: "Please enter user's last name"});
      return;
    }
    
    if(data.email == ""){
      setError({error: "Please enter user email"});
      return;
    }

    create_partner(data);
  };

  return (
    // max-w-[1158px]
    <div className="mx-auto py-12 px-16 flex-grow">
      <div onClick={() => router.push("dashboard/")} className="mb-12">
        <span className="flex gap-4 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          Back
        </span>
      </div>
      {errors?.compliance && (
        <div className="my-6">
          <FormErrors error={errors.compliance} />
        </div>
      )}
      {/* Just for tests */}
      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{border: "1px solid rgba(255,255,255,.1)"}}
          message="Your contract is ready, click here to sign"
          description="Describe the event and give further instructions if needed, include a call to action"
          onclick={() => {showContracts()}}
          label="Sign your contract"
          color="text-green-700"
          desccolor="text-[#999999]"          
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-[28px] h-[28px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          }
        />
      </div>

      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{border: "1px solid rgba(255,255,255,.1)"}}
          message="Your contract is ready, click here to sign"
          description="Describe the event and give further instructions if needed, include a call to action"
          onclick={() => showAgreement()}
          label="Sign your contract"
          color="text-green-700"
          desccolor="text-[#999999]"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" w-[28px] h-[28px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          }
        />
      </div>

      <div className="my-8 max-w-6xl">
        <CallToAction
          style={{border: "1px solid rgba(255,255,255,.1)"}}
          message="Your contract has been signed"
          description="Outline contract conditions and give contract warrantees."
          onclick={() => showAgreement()}
          feedback={<div className="flex space-x-2 items-center">
            <div className="py-1 px-3 rounded-full bg-[#00FF0020] text-white flex justify-center items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg> &nbsp; Signed <span className="py-1 px-2 bg-black/40 text-white rounded-full">11/07/2023</span>
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
              </svg>
            </div> 
            <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
              </svg>
            </div>            
          </div>}
          color="text-gray-200"
          desccolor="text-[#999999]"
          bg='bg-white/10'
          border="border-transparent"
          icon={
            <div className="relative inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" className="w-12 h-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                  stroke="currentColor" className="w-6 h-6 absolute top-4 left-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" fill="currentColor" 
                  className="w-4 h-6 absolute top-8 right-2">
                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
              </svg>
            </div>            

          }
        />
      </div>
      
      {/* Just for testts ends here */}
      {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )}
      {!processing && selectedCategory && (
        <>
          <div className="grin grid-cols-1 space-y-3 sm:flex justify-between items-center space-x-3 mb-20">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center rounded-full w-[64px] h-[64px] bg-white/10 text-white text-[12px] mr-2">
                {selectedCategory && (
                  <Image
                    alt={selectedCategory.category_name}
                    src={selectedCategory?.icon}
                    width={29}
                    height={29}
                    priority
                  />
                )}
              </div>
              <div>
                <div className="font-bold text-[30px] text-white mb-1">
                  {selectedCategory.category_name}
                </div>
                <div className="flex items-center gap-2 text-[15px] text-[#999999]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>We are reviewing your application</span>
                </div>
              </div>
            </div>
          </div>
          <ComplianceCategories
            partner={partner}
            Stages={Stages}
            activeCategory={selectedCategory}
            onclick={handleOpenDrawer}
          />
          {activeStage && (
            <ComplianceDrawer
              activeStage={activeStage}
              category={selectedCategory}
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
            >
              {activeStage && openDrawer && (
                <ComplianceDetailPartners
                  activeStage={activeStage}
                  category={selectedCategory}
                  setOpenDrawer={setOpenDrawer}
                  openDrawer={openDrawer}
                />
              )}
            </ComplianceDrawer>
          )}
        </>
      )}
      {      
        contractModal && 
        <div id="contracts_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "contracts_modal") {setContractModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[500px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Select a service to renew</div>
              <div className="cursor-pointer" onClick={() => setContractModal(false)}>
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
                <div key={`${service.id}-index`} className="m-4 rounded-lg bg-white/20 flex cursor-pointer hover:bg-white/40 hover:border-1 hover:border-color-[#212121]" onClick={() => {selectService(service.name_of_service_type)}}>
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

            
                              
            {/* Add services here */}
          </div>
        </div>        
      }
      {      
        contractSignatriesModal && 
        <div id="contracts_signatries_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "contracts_signatries_modal") {setContractModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Add contract signatries</div>
              <div className="cursor-pointer" onClick={() => setContractSignatriesModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div> 
            </div>

            {errors && errors["error"] && (
              <div className="mb-6">
              <FormErrors error={errors["error"]} />
              </div>
            )}

            <div className="m-4 rounded-lg bg-white/20 flex flex-col p-4">

              {/* Add Director */}
              <div className="flex my-4">

                <div className="w-12">
                  <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                    {signatories.director &&
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    }
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center " onClick={() => setSelectDirectorModal(true)}>
                  <p className="text-white text-md mb-2">A company director</p>
                  {
                    !signatories.director ?
                    (<div className="flex flex-col group">
                   
                        <span className="text-gray-300 text-xs cursor-pointer group-hover:hidden" 
                              onClick={() => {setContractSignatriesModal(false); setSelectDirectorModal(true);}}>
                          A company director as stated in the company incorporation documents
                        </span>
                        <span className="text-yellow-500 text-xs hidden group-hover:block w-[200px] border-1 border-yellow-500 py-1 px-4 rounded-full cursor-pointer">
                          Choose existing director
                        </span>
                      </div>):
                      <span className="flex text-gray-300 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>&nbsp;{`${signatories.director?.firstname} ${signatories.director?.lastname}`}
                      </span>
                  }
                                    
                </div>
                
                <div className="w-16 flex justify-center items-center">
                  {
                    !signatories.director ? 
                    (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" 
                        onClick={() => {
                            setContractSignatriesModal(false); 
                            setData({...data, role: partnerRoles.find(a_role => a_role.role_name == 'director').uuid}); 
                            setAddDirectorModal(true);
                          }
                        }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>):
                      <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                  }
                  
                </div>

              </div>

              <hr className="h-px bg-gray-500 border-0" />

              {/* Add Delegate */}
              <div className="flex my-4">

                <div className="w-12">
                  <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                    {signatories.delegate && 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg> 
                    }
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-white text-md mb-2">A company delegate</p>
                  {!signatories.delegate ?
                    (<span className="text-gray-300 text-xs cursor-pointer" 
                            onClick={() => {setContractSignatriesModal(false); setSelectDelegateModal(true);}}>
                        A person nominated by the company to sign. Requires a board resolution document
                    </span>):
                    (<span className="flex text-gray-300 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>&nbsp;{`${signatories.delegate?.firstname} ${signatories.delegate?.lastname}`}
                    </span>) 
                  }
                </div>
                <div className="w-16 flex justify-center items-center">
                  {
                    !signatories.delegate ? 
                    (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" onClick={() => {setContractSignatriesModal(false); setData({...data, role: partnerRoles.find(a_role => a_role.role_name == 'delegate').uuid}); setAddDelegateModal(true);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>):
                      <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                  }     
                </div>

              </div>              

            </div>

            {/* Add Witness */}
            <div className="m-4 rounded-lg bg-white/20 flex flex-col p-4">

              <div className="flex my-4">

                <div className="w-12">
                  <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                  {signatories.witness && 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  }
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-white text-md mb-2">Add a witness</p>
                  {!signatories.witness ?
                    (<span className="text-gray-300 text-xs cursor-pointer">
                      A person who will sign as a witness to this contract
                    </span>):
                    (<span className="flex text-gray-300 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>&nbsp;{`${signatories.witness?.firstname} ${signatories.witness?.lastname}`}
                    </span>)
                  }
                </div>
                <div className="w-16 flex justify-center items-center">
                  {
                    !signatories.witness ? 
                    (<div className="w-12 h-12 flex justify-center items-center bg-yellow-600 rounded-full cursor-pointer" onClick={() => {setContractSignatriesModal(false); setData({...data, role: partnerRoles.find(a_role => a_role.role_name == 'witness').uuid}); setAddWitnessModal(true);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>):
                      <span className="underline text-white text-xs cursor-pointer" onClick={() => {}}>Edit</span>
                  }                  
                </div>

              </div>
            </div>

            <div className="flex m-4">
              <div className="w-12 flex justify-end mr-4">
                <input onChange={(e) => e.target.checked ? setAllowSubmitSignatories(true) : setAllowSubmitSignatories(false)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
              </div>
              <div>
                  <p className="text-gray-500">By selecting this checkbox, I confirm that the entered user holds the position of director at my company and possesses the authoriized signatory rights to execute this contract on behalf of the company</p>
              </div>
            </div>

            <div className="">
              {!submitingContractSignatories &&
                <div className="flex py-4 px-2 space-x-4 justify-end">
                  <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setContractSignatriesModal(false); }}>Back</button>
                  <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={!allowSubmitSignatories} onClick={() => {submitSignatories()}}>Submit</button>
                </div>
              }
              {submitingContractSignatories &&
                <div className="flex px-4">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
              }
            </div>
            
          </div>
        </div>        
      }
      {      
        selectDirectorModal && 
        <div id="contracts_directors_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "contracts_directors_modal") {setSelectDirectorModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Choose a director</div>
              <div className="cursor-pointer" onClick={() => {setSelectDirectorModal(false); setContractSignatriesModal(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div> 
            </div>

            {
              adminPartners && adminPartners.map(partner => partner.role.role_name == 'director' ? 
              
              (<div className="mb-4 rounded-lg bg-white/20 flex p-4 hover:bg-white/40 hover:border-px hover:border-gray-200" key={partner.uuid}
                    onClick={() => {
                      setSignatories({...signatories, director: {firstname: partner.firstname, lastname: partner.lastname, email: partner.email}}); 
                      setSelectDirectorModal(false); setContractSignatriesModal(true);
                      }
                    }>

                <div className="w-12">
                  <div className="w-8 h-8 flex bg-black rounded-full justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center cursor-pointer">
                  <p className="text-white text-md mb-2">{`${partner.firstname} ${partner.lastname}`}</p>
                  <span className="text-gray-300 text-xs">{partner.email}</span>
                  {/* <span className="text-yellow-500 text-xs hidden hover:inline-flex border-1 border-yellow-500 py-1 px-4 rounded-full">Add a director</span> */}
                </div>
              
              </div>) : "")
            }

            <div className="flex py-4 px-2 space-x-4 justify-end">
              <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setSelectDirectorModal(false); setContractSignatriesModal(true)}}>Back</button>
            </div>          
          </div>
        </div>        
      }
      {      
        addDirectorModal && 
        <div id="add_directors_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "add_directors_modal") {setAddDirectorModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Add a director</div>
              <div className="cursor-pointer">
                <p className="text-yellow-500 text-xs underline">I'm a director</p>
              </div> 
            </div>

            {errors && errors["error"] && (
              <div className="mb-6">
              <FormErrors error={errors["error"]} />
              </div>
            )}
 
            <TextInput
                id="name"
                label="Name"
                // value={data.role_name}
                onChange={
                  (e) => { 
                    try{
                      let [firstname, lastname] = e.target.value.trim().split(" ");
                      setData({...data, firstname, lastname })
                    }catch(ex){
                      setError({error: "Please enter user's first and last names"})
                    } 
                  }
                }
                errors={errors}
            />

            <TextInput
                id="email"
                label="Email"
                // value={data.role_name}
                onChange={
                  (e) => {
                    setData({...data, email: e.target.value.trim()});
                  }
                }
                errors={errors}
            />
            
            <div className="flex m-4">
              <div className="w-12 flex justify-end mr-4">
                  <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
              </div>
              <div>
                  <p className="text-gray-500">By clicking this checkbox I agree that the user I've entered is a director of the Company and is authorized to sign this contract on behalf of the company</p>
              </div>
            </div>

            <div className="">
              {!creatingPartner && partnerRoles.length > 0 &&
                <div className="flex py-4 px-2 space-x-4 justify-end">
                  <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setAddDirectorModal(false); setContractSignatriesModal(true);}}>Back</button>
                  <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={disableActiveButton} onClick={() => {handleCreate(partnerRoles.find(role => role.role_name == 'director').uuid);}}>Add</button>
                </div>
              }
              {(creatingPartner || partnerRoles.length == 0) &&
                <div className="flex px-4">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
              }
            </div>
          </div>
        </div>        
      }
      {      
        addDelegateModal && 
        <div id="add_delegate_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "add_delegate_modal") {setAddDelegateModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Add a delegate</div>
              <div className="cursor-pointer">
                <p className="text-yellow-500 text-xs underline">I'm a delegate</p>
              </div> 
            </div>

            {errors && errors["error"] && (
              <div className="mb-6">
              <FormErrors error={errors["error"]} />
              </div>
            )}
 
            <TextInput
                id="name"
                label="Name"
                // value={data.role_name}
                onChange={
                  (e) => { 
                    try{
                      let [firstname, lastname] = e.target.value.trim().split(" ");
                      setData({...data, firstname, lastname })
                    }catch(ex){
                      setError({error: "Please enter user's first and last names"})
                    } 
                  }
                }
                errors={errors}
            />

            <TextInput
                id="email"
                label="Email"
                // value={data.role_name}
                onChange={
                  (e) => {
                    setData({...data, email: e.target.value.trim()});
                  }
                }
                errors={errors}
            />

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
                  <p className="text-white text-md">Company board resolution</p>
                  <p className="text-gray-500 text-sm">Drag and drop here or</p>
                </div>

                <div className="flex flex-col justify-end space-between items-end space-y-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-end">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
                  <button className="border-1 border-white rounded-full py-1 px-4 text-white" onClick={() => document.querySelector("#resolution_document").click()}>Choose file</button>
                  <input type="file" className="opacity-0 w-1 h-1" id="resolution_document" accept=".pdf" onChange={(e) => {convertFile(e)}}/>                   
                </div>

              </div>          
            
            </div>

            <div className="flex m-4">
              <div className="w-12 flex justify-end mr-4">
                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
              </div>
              <div>
                  <p className="text-gray-500">By clicking this checkbox I agree that the user I've entered is a delegate of the Company and is authorized to sign this contract on behalf of the company</p>
              </div>
            </div>

            <div className="">
              {!creatingPartner && partnerRoles.length > 0 &&
                <div className="flex py-4 px-2 space-x-4 justify-end">
                  <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setAddDelegateModal(false); setContractSignatriesModal(true);}}>Back</button>
                  <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={disableActiveButton} onClick={() => {handleCreate(partnerRoles.find(role => role.role_name == 'delegate').uuid);}}>Add</button>
                </div>
              }
              {(creatingPartner || partnerRoles.length == 0) &&
                <div className="flex px-4">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
              }
            </div>
          </div>
        </div>        
      }
      {      
        addWitnessModal && 
        <div id="add_witness_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "add_witness_modal") {setAddWitnessModal(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[550px] pb-4">
            <div className="flex pt-8 pb-4">
              <div className="text-white text-2xl mb-4 flex-1">Add a witness</div>
              <div className="cursor-pointer">
                <p className="text-yellow-500 text-xs underline">I'm a witness</p>
              </div> 
            </div>
 
            <TextInput
                id="name"
                label="Name"
                // value={data.role_name}
                onChange={
                  (e) => { 
                    try{
                      let [firstname, lastname] = e.target.value.trim().split(" ");
                      setData({...data, firstname, lastname })
                    }catch(ex){
                      setError({error: "Please enter user's first and last names"})
                    } 
                  }
                }
                errors={errors}
            />

            <TextInput
                id="email"
                label="Email"
                // value={data.role_name}
                onChange={
                  (e) => {
                    setData({...data, email: e.target.value.trim()});
                  }
                }
                errors={errors}
            />
            
            <div className="flex m-4">
              <div className="w-12 flex justify-end mr-4">
                <input onChange={(e) => e.target.checked ? setDisableActiveButton(false) : setDisableActiveButton(true)} type="checkbox" className="h-8 w-8 rounded-lg bg-black/40"  />
              </div>
              <div>
                  <p className="text-gray-500">By clicking this checkbox I agree that the user I've entered is a witness of the Company and is authorized to sign this contract on behalf of the company</p>
              </div>
            </div>

            <div className="">
            {!creatingPartner && partnerRoles.length > 0 &&
                <div className="flex py-4 px-2 space-x-4 justify-end">
                  <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"  onClick={() => {setAddWitnessModal(false); setContractSignatriesModal(true);}}>Back</button>
                  <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" disabled={disableActiveButton} onClick={() => {handleCreate(partnerRoles.find(role => role.role_name == 'witness').uuid);}}>Add</button>
                </div>
              }
              {(creatingPartner || partnerRoles.length == 0) &&
                <div className="flex px-4">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
              }
            </div>
          </div>
        </div>        
      }
      {      
        contractSignatoriesSuccess && 
        <div id="contract_success_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "contract_success_modal") {setContractSignatoriesSuccess(false);}}}>
          <div id="actualModal" className="px-10 border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4">
            
            <div className="flex pt-8 pb-4 justify-center items-center">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>  
              </div>              
            </div>
            
            <div className="flex pt-8 pb-4">
              <p className="text-white text-2xl mb-4 flex-1 text-center">You've added your contract signatories</p>              
            </div>
 
            <div className="">              
              <div className="flex py-4 px-2 space-x-4 justify-center">
                <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {setContractSignatoriesSuccess(false);}}>Continue</button>
              </div>              
            </div>

          </div>
        </div>        
      }
    </div>
  );
}
