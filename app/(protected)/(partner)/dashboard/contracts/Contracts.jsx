"use client";
import { useState, useEffect, useRef } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase
} from "@/app/modules/utilities";
import { status_type, statusOptions } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";
import {capitalizeFirst} from "@/app/modules/utilities";
import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useContracts from "@/hooks/useContracts";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import useApp from "@/hooks/useApp";
import Confirm from "@/app/components/Confirm";
import Success from "@/app/components/toasts/Success";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";
import {useStoreState} from 'easy-peasy';
import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import FilterTag from "@/app/components/FilterTag";

export default function Contracts() {
  const {partnerGetAllContracts} = useContracts();
  const [contracts, setContracts] = useState(null);
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [selectedBrd, setSelectedBrd] = useState(null);
  const users = useStoreState((state) => state.users);
  const {
    partner,
    getAllAdminPartners,
    getAllServices,
    partnerSelectService,
    createPartner,
    submitAllSignatories,
    downloadSignedContract,
    getContractDynamicData
  } = usePartners();

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const successAction = () => setTimeout(() => {
                                                  setSuccessToast(false),                                                   
                                                  setApprove(false);
                                                  setReject(false);
                                                  setSelectedBrd(null); 
                                                  get_brds();
                                                  setOpenDrawer(false);
                                                }, 3000);


  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  let [approvalData, setApprovalData] = useState({
                                          board_document_uuid: "",
                                          partner_uuid: "",
                                          delegate_email: "",
                                          status: ""
                                        });


  const router = useRouter();
  const [navigation, setNavigation] = useState([]);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);

  const {user, role, refreshSession} = useUsers();

  // console.log("usePartners() from compliance", usePartners());
  // console.log("useUsers() from compliance", useUsers());

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
  const [signatoryRole, setSignatoryRole ] = useState("");

  const [creatingPartner, setCreatingPartner] = useState(false);
  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [fetchingAdminPartners, setFetchingAdminPartners] = useState(false);
  const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

  const [adminPartners, setAdminPartners] = useState([]);
  const [partnerRoles, setPartnerRoles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(false);

  const [agreementModal, setAgreementModal] = useState(false);
  const [acceptingAgreement, setAcceptingAgreement] = useState(false);

  const [data, setData] = useState({partner_uuid: partner.uuid, phone: '000000000', firstname: "", lastname: "", email: "", role: ""});
  const [disableActiveButton, setDisableActiveButton] = useState(true);

  const [allowSubmitSignatories, setAllowSubmitSignatories] = useState(false);


  const userStatus = partner.status;

  const APPROVED = "active";
  const [selectedAllRequiredSignatories, setSelectedAllRequiredSignatories ] = useState(true);
  let directorSigned = false;
  let delegateSigned = false;
  let witnessSigned = false;

  const [isASignatory, setIsASignatory ] = useState(false);
  const [hasNotSigned, setHasNotSigned] = useState(false);
  const [allHaveSigned, setAllHaveSigned] = useState(false);

  const [dynamicData, setDynamicData] = useState(null);

  const filterRef = useRef(null);

  let selected_admin_users = partner.selected_partner_admin_users;
  let signingDirector = selected_admin_users.find(user => user.role == 'director');
  let signingDelegate = selected_admin_users.find(user => user.role == 'delegate');
  let signingWitness = selected_admin_users.find(user => user.role == 'witness');

    
  // console.log("selected_admin_users", selected_admin_users);
  // console.log("signingDirector", signingDirector);

  let get_service_response = null;
  let partner_select_service_response = null;
  let create_partner_response = null;
  let all_Roles = null;
  let all_admin_partners_response = null;
  let submit_signatories_response = null;
  let dynamic_content_response =  null;

  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState({date: true, keyword: false, status: false});

  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const [searchTags, setSearchTags] = useState({
                      date_range: {from:"", to:""},
                      keywords: [],
                      status: []                  
                    });
  const [filterTags, setFilterTags] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);

  const doSearch = () => {
    //To be impl    
    console.log("searchTags", searchTags); 
    console.log("contracts", contracts); 
    console.log("filteredContracts", filteredContracts); 

    displayFilters(); 
    let filtered = contracts ?? [];
    if(searchTags.date_range.from != "" && searchTags.date_range.to != ""){
      filtered = filtered
                  .filter(contract => moment(contract.created_at)
                                              .isBetween(searchTags.date_range.from, searchTags.date_range.to)
                          );
    }
    if(searchTags.keywords.length != 0){
      searchTags.keywords.forEach(keyword => {
        filtered = filtered
                      .filter(contract => contract.contract_id.toLowerCase().includes(keyword.toLowerCase()) 
                                          || contract.contract.toLowerCase().includes(keyword.toLowerCase()));
      });      
    }

    if(searchTags.status.length != 0){
      searchTags.status.forEach(aStatus => {
        filtered = filtered.filter(contract => contract.contract_status == aStatus);
      });      
    }

    setFilteredContracts(filtered);
  };

  const displayFilters = () => {
    let filterTags = [];
    if(searchTags.date_range.from != "" && searchTags.date_range.to != ""){
      filterTags.push(<FilterTag message={`From ${searchTags.date_range.from} to ${searchTags.date_range.to}`} action={() => {removeFilter("date_range")}} />);
    }
    if(searchTags.keywords.length != 0){
      searchTags.keywords.forEach(keyword => {
        filterTags.push(<FilterTag message={`${keyword}`} action={() => {removeFilter(`keyword***${keyword}`)}} />);
      });      
    }

    if(searchTags.status.length != 0){
      searchTags.status.forEach(aStatus => {
        filterTags.push(<FilterTag message={`${aStatus}`} action={() => {removeFilter(`status***${aStatus}`)}} />);
      });      
    }

    if(!filterTags.length){
      setFilterTags(<span className="text-sm text-gray-500">No filters applied</span>);
    }else{
      setFilterTags(filterTags);
    }    
  };

  const removeFilter = (filter) => {
    
    if(filter =='date_range'){
      setSearchTags({...searchTags, date_range: {from:"", to:""}});       
    }else if(filter.includes('keyword***')){
      const key = filter.split("***")[1];
      setSearchTags({...searchTags, keywords: searchTags.keywords.filter(k => k != key)}); 
    }else if(filter.includes('status***')){
      const key = filter.split("***")[1];
      setSearchTags({...searchTags, status: searchTags.status.filter(k => k != key)}); 
    }
    
    
  };

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
        setContractModal(false); 
        setContractSignatriesModal(true);

    }
  };

  const get_all_partner_roles = async () => {
    clearErrors();
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
    setFetchingAdminPartners(false);

    if (all_admin_partners_response.error) {
      setError({ error: all_admin_partners_response.error });
    }else{
      // setNavigation(all_Admins.navigation);
      console.log("Admin_partners", all_admin_partners_response.admin_partners);
      setAdminPartners(all_admin_partners_response.admin_partners);

      //update signing director, delegate or witness
      confirmSignatories(selected_admin_users, all_admin_partners_response.admin_partners);
    }

     
  };

  const confirmSignatories = function(selected_admin_users, admin_partners){
    const selected_director_email = selected_admin_users.find(a => a.role == 'director') ? selected_admin_users.find(a => a.role == 'director').email : null;
    const selected_delegate_email = selected_admin_users.find(a => a.role == 'delegate') ? selected_admin_users.find(a => a.role == 'delegate').email : null;
    const selected_witness_email = selected_admin_users.find(a => a.role == 'witness') ? selected_admin_users.find(a => a.role == 'witness').email : null;
    
    let admin_partners_emails = admin_partners.map(a => a.email);
    
    //Adding superadmin
    admin_partners_emails.push(user.email);

    // console.log("selected_admin_users", selected_admin_users);
    // console.log("selected_director_email", selected_director_email);
    // console.log("selected_delegate_email", selected_delegate_email);
    // console.log("selected_witness_email", selected_witness_email);
    // console.log("admin_partners_emails", admin_partners_emails);

    // console.log("admin_partners_emails.includes(selected_director_email)", admin_partners_emails.includes(selected_director_email));
    // console.log("admin_partners_emails.includes(selected_witness_email)", admin_partners_emails.includes(selected_witness_email));
    // console.log("(admin_partners_emails.includes(selected_director_email) || admin_partners_emails.includes(selected_delegate_email)) && admin_partners_emails.includes(selected_witness_email)", 
    //               (admin_partners_emails.includes(selected_director_email) || 
    //               admin_partners_emails.includes(selected_delegate_email)) &&
    //               admin_partners_emails.includes(selected_witness_email));

    

    if((selected_director_email && admin_partners_emails.includes(selected_director_email) || 
                (selected_delegate_email && admin_partners_emails.includes(selected_delegate_email))) &&
                (selected_witness_email && admin_partners_emails.includes(selected_witness_email))){
      setSelectedAllRequiredSignatories(true);
    }else{
      setSelectedAllRequiredSignatories(false);
    }

    if(selected_director_email && selected_director_email.includes(user.email)){
      setIsASignatory(true);
    }else if(selected_delegate_email && selected_delegate_email.includes(user.email)){
      setIsASignatory(true);
    }else if(selected_witness_email && selected_witness_email.includes(user.email)){
      setIsASignatory(true);
    }else{
      setIsASignatory(false);
    }

    if(selected_admin_users.length){
      setHasNotSigned(selected_admin_users.find(u => u.email == user.email) ? 
          selected_admin_users.find(u => u.email == user.email).has_user_signed == "no" :
          true);

      setAllHaveSigned(selected_admin_users.filter(u => u.has_user_signed != 'no').length >= 2);
    }

    console.log("selected_admin_users", selected_admin_users);
    console.log("allHaveSigned", allHaveSigned);
    
    setSignatoryRole(selected_admin_users.find(u => u.email == user.email)?.role);
    

    directorSigned = selected_admin_users.find(u => u.role == "director") ? selected_admin_users.find(u => u.role == "director").has_user_signed != "no" : false;
    delegateSigned = selected_admin_users.find(u => u.role == "delegate") ? selected_admin_users.find(u => u.role == "delegate").has_user_signed != "no" : false;
    witnessSigned = selected_admin_users.find(u => u.role == "witness") ? selected_admin_users.find(u => u.role == "witness").has_user_signed != "no" : false;   

  }

  const submit_signatories = async (signatories) => {

    let data = {"email": []};

    console.log("signatories", signatories);

    for(let prop in signatories){
      if(signatories[prop]){
        data.email.push(signatories[prop].email);
      }      
    }

    if((signatories.director || signatories.delegate) && signatories.witness){
      if (submitingContractSignatories) return;
      setSubmitingContractSignatories(true);
      submit_signatories_response = await submitAllSignatories(data);
      setSubmitingContractSignatories(false);
      if (submit_signatories_response.error) {
        setError({ error: submit_signatories_response.error });
      }else{
        setContractSignatriesModal(false);
        setContractSignatoriesSuccess(true);
        refreshSession();
      }
    }else{
      setError({error: "You must choose a director or delegate and a witness"});
    }
    
  };

  const get_dynamic_content = async () => {
    if (gettingDynamicContent) return;
    setGettingDynamicContent(true);
    dynamic_content_response = await getContractDynamicData();
    setGettingDynamicContent(false);
    console.log('dynamic_content_response', dynamic_content_response);
    if (dynamic_content_response.error) {
        setError({ error: dynamic_content_response.error })
    } else {
        // console.log('dynamic_content_response', dynamic_content_response);
        setDynamicData(dynamic_content_response.data);                
    }
  }

    
  useEffect(() => {
    clearErrors();
    setProcessing(false);
    

    if(role == 'superAdmin'){

      get_service_types();
      get_all_partner_roles();
        
    }    
    get_all_admin_partners();
    get_dynamic_content();
    
    if(signingDirector){
      setSignatories({...signatories, director: {email: signingDirector.email, firstname: signingDirector.firstname, lastname: signingDirector.lastname}});
    }else if(signingDelegate){
      setSignatories({...signatories, delegate: {email: signingDelegate.email, firstname: signingDelegate.firstname, lastname: signingDelegate.lastname}});
    }else if(signingWitness){
      setSignatories({...signatories, witness: {email: signingWitness.email, firstname: signingWitness.firstname, lastname: signingWitness.lastname}});
    }

    partnerGetAllContracts().then(resp => {
      console.log("resp", resp);
      setContracts(resp.contracts); 
      setNavigation(resp.navigation)
    });

    document.addEventListener('click', function(e){
      if(filterRef.current && !filterRef.current.contains(e.target)){
        setFilterModal(false);
      }
    }, true);
    
  }, [isASignatory]);

  
  useEffect(() => {
    clearErrors();
    setProcessing(false);
    displayFilters();
    doSearch();
  }, [searchTags, selectedDateRange]);

  return (
    <>
      <div id="contract_page" className="flex flex-cols pb-12 min-h-screen" onClick={(e) => {if(filterModal && e.target.id == 'contract_page'){setFilterModal(false)}}}>
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Contracts</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {navigation?.total}
              </span>
            </div>
            
          </div>

          {/* Only when we have not selected all signees */}
          {users.role == 'superAdmin' && 
            userStatus == APPROVED && !selectedAllRequiredSignatories ? 

            <div className="my-8 max-w-6xl">          
              <CallToAction
                style={{border: "1px solid rgba(255,255,255,.1)", marginBottom: "50px"}}
                message="Your contract is ready click here to sign"
                description="Outline contract conditions and give contract warrantees."
                onclick={() => {showContracts()}}
                button={'Sign your contract'}
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
                        viewBox="0 0 24 24" fill="yellow" 
                        className="w-4 h-6 absolute top-8 right-2">
                      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                    </svg>
                  </div>            

                }
              />                        
            </div> : (
              allHaveSigned ? 

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
                      </svg> &nbsp; Signed <span className="py-1 px-2 bg-black/40 text-white rounded-full"> {moment(dynamicData?.date_of_contract).format("DD/MM/YYYY")}</span>
                    </div>
                    <a href={downloadSignedContract()} target="_blank">
                      <div className="w-8 h-8 rounded-full hover:bg-black/40 cursor-pointer flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </a>               
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

              </div> : (
                ( (users.role == 'superAdmin' && selectedAllRequiredSignatories && !allHaveSigned) ||
              
                (userStatus == APPROVED && 
                selectedAllRequiredSignatories && 
                //You were selected 
                // isASignatory && 
                //you have not signed 
                hasNotSigned
                ) ) ? 
      
              <div className="my-8 max-w-6xl">  
                <CallToAction
                  style={{border: "1px solid rgba(255,255,255,.1)", marginBottom: "50px"}}
                  message="Your contract is ready click here to sign"
                  description="Outline contract conditions and give contract warrantees."
                  onclick={() => {showAgreement()}}
                  button={'Sign your contract'}
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
                          viewBox="0 0 24 24" fill="yellow" 
                          className="w-4 h-6 absolute top-8 right-2">
                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                      </svg>
                    </div>
                        
                  }
                />
              </div> : ""
              )
            )
          }
          {/* Just for tests ends here */}

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="my-4 w-full relative flex" >
            <div className="border-1 border-white/20 rounded-full py-2 inline-flex items-center justify-center cursor-pointer" 
                  onClick={() => setFilterModal(!filterModal)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 ml-6 mt-1">
                <path d="M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z"/>
              </svg>  <span className="mr-6 text-white">Add Filter</span>
            </div>
            <div className="ml-4 border-l-2 border-white/20 flex-1 my-1 px-4 flex items-center">
              {
                filterTags
              }
            </div>
            {
              filterModal && 
              <div id="filter_modal" ref={filterRef} className={`border-1 border-white/20 w-[600px] absolute left-4 z-[9999] bg-[#121212] rounded-xl shadow-xl flex mt-10`}>
                <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col  space-y-4">
                  
                  <div className={`${search.date ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                      onClick={() => {if(!search.date){setSearch({...search, date: true, keyword: false, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg> &nbsp; &nbsp; 
                    <span className="flex-1">Date</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  <div className={`${search.keyword ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                        onClick={() => {if(!search.keyword){setSearch({...search, date: false, keyword: true, status: false});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    &nbsp; &nbsp; 
                    <span className="flex-1">Keyword</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                  <div className={`${search.status ? 'bg-white/20' : ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`} 
                        onClick={() => {if(!search.status){setSearch({...search, date: false, keyword: false, status: true});}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                      
                      <path d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      </path> 
                     
                    </svg>
                    &nbsp; &nbsp; 
                    <span className="flex-1">Status</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                </div>
                <div className="flex-1 p-4 h-[300px]">
                  {
                    search.date && 
                    <div className="flex flex-col space-y-4">
                      <div className="p-2 rounded-xl border-1 border-white/20 flex text-white items-center justify-center">
                        <input id="search-from" 
                                value={`${searchTags.date_range.from}`}
                                onFocus={() => document.getElementById("search-from").type = "date"} 
                                onBlur={() => document.getElementById("search-from").type = "text"} 
                                onChange={(e) => {
                                            setSearchTags({...searchTags, date_range : {...searchTags.date_range, from: e.target.value}});                                 
                                            setSelectedDateRange('from_to');
                                            doSearch(); 
                                          }
                                        } 
                                className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]" 
                                placeholder="From" /> - 
                        <input id="search-from2" 
                                value={`${searchTags.date_range.to}`}
                                onFocus={() => document.getElementById("search-from2").type = "date"} 
                                onBlur={() => document.getElementById("search-from2").type = "text"} 
                                onChange={(e) => {
                                                setSearchTags({...searchTags, date_range: {...searchTags.date_range, to: e.target.value}});
                                                setSelectedDateRange('from_to')
                                                doSearch();
                                              }
                                          }
                                className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]" 
                                placeholder="To" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                      </div>
                      <div className={`${selectedDateRange == 'last_30_days' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().subtract(30, 'd').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('last_30_days');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">Last 30 days</span>
                      </div>
                      <div className={`${selectedDateRange == 'this_month' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().format('YYYY-MM-01'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('this_month');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">This month</span>
                      </div>
                      <div className={`${selectedDateRange == 'last_month' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().subtract(1, 'months').format('YYYY-MM-01'), to: moment().subtract(1, 'months').format('YYYY-MM-') + moment().subtract(1, 'months').daysInMonth()} });  
                                          setSelectedDateRange('last_month');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">Last month</span>
                      </div>
                      <div className={`${selectedDateRange == 'this_year' ? 'bg-white/20 m-2': ''} rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                        onClick={(e) => {
                                          setSearchTags({...searchTags, date_range: {...searchTags.date_range, from: moment().format('YYYY-01-01'), to: moment().format('YYYY-MM-DD')} });  
                                          setSelectedDateRange('this_year');
                                          doSearch(); 
                                        }
                                }>
                        <span className="flex-1">This year</span>
                      </div>
                    </div>
                  }
                  {
                    search.keyword && 
                    <div className="flex flex-col space-y-4 px-2">
                      <div className="border-1 border-white/20 rounded-xl p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input onBlur={() => {/* Search here*/}} placeholder="Search for a partner"
                          onKeyUp={(e) => {
                            if(e.key == 'Enter'){
                              setSearchTags({...searchTags, keywords: [...searchTags.keywords, e.target.value]}); 
                              doSearch(); 
                              e.target.value = ""; 
                            }
                          }}
                          className="border-0 bg-transparent focus:border-0 focus:border-transparent active:border-0 active:border-transparent text-white p-2 w-full ml-2" />
                      </div>
                      <span className="text-gray-400 text-sm">Find a contract by searching for a partner by their name</span>
                    </div>
                  }
                  {
                    search.status && 
                    <div className="flex flex-col space-y-4">
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" 
                              onChange={(e) => {
                                if(e.target.checked){
                                  setSearchTags({...searchTags, status: [...searchTags.status, 'active']});
                                }else{
                                  setSearchTags({...searchTags, status: searchTags.status.filter(a => a != 'active')});                                  
                                }
                                doSearch();
                              }} checked={`${searchTags.status.includes('active') ? 'checked' : ''}`}/>
                        </div>
                        <div>
                            <p className="text-gray-300">Active</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" 
                              onChange={(e) => {
                                if(e.target.checked){
                                  setSearchTags({...searchTags, status: [...searchTags.status, 'suspended']});
                                }else{
                                  setSearchTags({...searchTags, status: searchTags.status.filter(a => a != 'suspended')});                                  
                                }
                                doSearch();
                              }} checked={`${searchTags.status.includes('suspended') ? 'checked' : ''}`}/>
                        </div>
                        <div>
                            <p className="text-gray-300">Suspended</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" 
                              onChange={(e) => {
                                if(e.target.checked){
                                  setSearchTags({...searchTags, status: [...searchTags.status, 'pending']});
                                }else{
                                  setSearchTags({...searchTags, status: searchTags.status.filter(a => a != 'pending')});                                  
                                }
                                doSearch();
                              }} checked={`${searchTags.status.includes('pending') ? 'checked' : ''}`}/>
                        </div>
                        <div>
                            <p className="text-gray-300">Pending</p>
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="w-10 flex mr-1">
                            <input type="checkbox" className="h-6 w-6 rounded-lg bg-black/40" 
                              onChange={(e) => {
                                if(e.target.checked){
                                  setSearchTags({...searchTags, status: [...searchTags.status, 'expired']});
                                }else{
                                  setSearchTags({...searchTags, status: searchTags.status.filter(a => a != 'expired')});                                  
                                }
                                doSearch();
                              }} checked={`${searchTags.status.includes('expired') ? 'checked' : ''}`}/>
                        </div>
                        <div>
                            <p className="text-gray-300">Expired</p>
                        </div>
                      </div>
                    </div>
                  }
                  
                  
                </div>
              </div>
            }
            
          </div>

          <div className="w-full mt-10 border-1 border-white/20 rounded-lg">
            
              <>
                <table className="table w-full transparent ">
                  <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-11 bg-white/20 ">
                      <th>
                        <span className="text-[13px]">Contract</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Status</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Start date</span>
                      </th> 
                      <th>
                        <span className="text-[13px]">End date</span>
                      </th> 
                      <th>
                        <span className="text-[13px]">PDF</span>
                      </th>                     
                    </tr>

                    {contracts?.map(contract => 
                      <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
                            {/* Company */}
                            <td>
                              <div className="flex flex-col">
                                
                                  <div className=" text-white">
                                    {contract.title}
                                  </div> 
                                  <span className="text-sm">abscdagah.io</span>                               
                                
                              </div>                              
                            </td>
                            {/* Contract status */}
                            <td>
                              <div className="flex gap-0 flex-col">
                                <span className={`text-white text-sm px-1 inline-block w-16 rounded ${contract.contract_status == "expired" ? 'bg-red-400' : (contract.contract_status == "pending" ? 'bg-grey-500' : 'bg-green-700')}`}>{capitalizeFirst(contract.contract_status)}</span>
                                {/* <span className="text-gray-500">Value added services</span> */}
                              </div>
                            </td>
                            <td>
                              <div>
                              {
                                moment(contract.created_at ?? moment())
                                .format("DD/MM/YYYY")
                              }
                              </div>
                            </td>
                            <td>
                              <div>
                              {
                                moment(contract.due_date ?? moment())
                                .format("DD/MM/YYYY")
                              }
                              </div>
                            </td>
                            
                            <td>
                              <div className="inline-flex items-center space-x-2 cursor-pointer rounded-full hover:bg-white/10 px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg> <span className="text-white text-sm">Download</span>
                              </div>
                            </td>
                            
                      </tr>)
                    }
                  </tbody>
                </table>
                <div className="w-full flex justify-end">
                  {!Util.isEmpty(navigation) &&
                    navigation.links?.length > 0 &&
                    navigation.links.map((nav, index) => {
                      let link = null;
                      if (index === 0) {
                        if (nav.url) {
                        }
                        link = (
                          <div className="flex p-2 text-white">
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
                          </div>
                        );
                      } else if (index === navigation.links.length - 1) {
                        link = (
                          <div className="flex p-2 text-white">
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
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                              />
                            </svg>
                          </div>
                        );
                      } else {
                        if (nav.url) {
                          link = nav.active ? (
                            <div className="flex p-2 text-white bg-white/30">
                              {index}
                            </div>
                          ) : (
                            <div
                              onClick={() => setPage(index)}
                              className="flex p-2 text-white cursor-pointer hover:bg-white/10"
                            >
                              {index}
                            </div>
                          );
                        } else {
                          link = (
                            <div className="flex p-2 text-white">
                              {nav.label}
                            </div>
                          );
                        }
                      }

                      return link;
                    })}
                </div>
              </>
            
          </div>
        </div>
      </div>
      
      <Success message={successMessage} visible={successToast} action={successAction} />
    </>
  );
}
