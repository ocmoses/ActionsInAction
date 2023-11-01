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
import { fieldsCounts, user_statuses } from "@/app/modules/constants";
import useRoles from "@/hooks/useRoles";
import useUsers from "@/hooks/useUsers";
import {useStoreState} from 'easy-peasy';
import moment from "moment";


export default function Compliance({ params }) {
  const users = useStoreState((state) => state.users);
  // console.log("usePartners:....", usePartners());
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
    getContractDynamicData
    
  } = usePartners();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setRouteloading } = useApp();
  const {role} = useUsers();
  
  // const [ApprovalStages, setApprovalStages] = useState(null)
  // const [Approvals, setApproval] = useState(null)



  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [fetchingAdminPartners, setFetchingAdminPartners] = useState(false);
  const [gettingDynamicContent, setGettingDynamicContent] = useState(false);

  const [adminPartners, setAdminPartners] = useState([]);
  const [partnerRoles, setPartnerRoles] = useState([]);

  const [agreementModal, setAgreementModal] = useState(false);
  const [acceptingAgreement, setAcceptingAgreement] = useState(false);
  const [disableActiveButton, setDisableActiveButton] = useState(true);

  
  const [dynamicData, setDynamicData] = useState(null);


  let all_Roles = null;
  let all_admin_partners_response = null;
  let dynamic_content_response =  null;


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
      // console.log("Admin_partners", all_admin_partners_response.admin_partners);
      setAdminPartners(all_admin_partners_response.admin_partners);

      //update signing director, delegate or witness
      confirmSignatories(selected_admin_users, all_admin_partners_response.admin_partners);
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
   setProcessing(false);
    
    setProcessing(false);
    setRouteloading(false);
    
    if(role == 'superAdmin'){

      get_service_types();
      get_all_partner_roles();
        
    }    
    get_all_admin_partners();
    // get_dynamic_content();
    
    // if(signingDirector){
    //   setSignatories({...signatories, director: {email: signingDirector.email, firstname: signingDirector.firstname, lastname: signingDirector.lastname}});
    // }else if(signingDelegate){
    //   setSignatories({...signatories, delegate: {email: signingDelegate.email, firstname: signingDelegate.firstname, lastname: signingDelegate.lastname}});
    // }else if(signingWitness){
    //   setSignatories({...signatories, witness: {email: signingWitness.email, firstname: signingWitness.firstname, lastname: signingWitness.lastname}});
    // }
    
  }, []);

  useEffect(() => {
   setProcessing(false);
  }, [partner.approvalStages, Stages]);

  useEffect(() => {
   setProcessing(false);
    let html = document.getElementsByTagName("html");
    if (openDrawer) html[0].style["overflow-y"] = "hidden";
    else html[0].style["overflow-y"] = "auto";
  }, [openDrawer]);

  useEffect(() => {
   setProcessing(false);
    
    if (partner && params.params?.length > 0) {
      filterFields(partner);
      filterComplianceRequirements(partner);
      filterApprovalFields(partner);

      const [_category] = params.params; //partner.uuid
      const _selectedCategory = partner?.categories?.find(
        (c) => c.category_uuid === _category
      );
      const _filtered_selectedCategory = filterCategory(
        _selectedCategory,
        partner
      );

      // console.log("_selectedCategory", _selectedCategory);
      // console.log("_filtered_selectedCategory", _filtered_selectedCategory);

      setSelectedCategory(_filtered_selectedCategory);
      const _stages = getStages(_filtered_selectedCategory, categories);

      console.log("_stages", _stages);

      setStages(_stages);
    }else{
      router.push(`/dashboard/compliance/${partner?.categories[0].category_uuid}`);
    }
    // console.log({ partner })


  }, [partner, params, selectedCategory]);

  
  const handleOpenDrawer = (stage) => {
    setActiveStage(stage);
    setOpenDrawer(true);
  };


  const showAgreement = () => {
    //Get all contracts and display
    // if(weHaveAgreed){
    //   setAgreementModal(true);
    // }else{
      router.push("/dashboard/contracts/execution")
    // }
    
  }


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

      {/* {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )} */}
      
      {selectedCategory && (
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
      
      {/* {      
        agreementModal && 
        <div id="agreement_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "agreement_modal") {setAgreementModal(false);}}}>
          <div id="actualModal" className=" pb-28 relative px-10 border-2 border-gray-500 rounded-xl shadow-xl bg-[#111111] inline-flex flex-col w-[600px] h-[500px]">
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
          </div>
        </div>  
      } */}
    </div>
  );
}
