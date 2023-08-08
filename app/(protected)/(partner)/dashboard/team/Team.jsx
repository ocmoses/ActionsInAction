"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  titleCase
} from "@/app/modules/utilities";
import { status_type, statusOptions } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";

import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import useRoles from "@/hooks/useRoles";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import TextInput from "@/app/components/form/TextInput";
import { ellipsify } from "@/app/modules/utilities";

export default function Team() {


  const { getAllAdminPartners,  createPartner, deletePartner, partner} = usePartners();
  const {getAllPartnerRoles, getAllPartnerPrivileges} = useRoles();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [adminPartners, setAdminPartners] = useState([]);
  const [creationError, setCreationError] = useState(null);

  const [partnerRoles, setPartnerRoles] = useState([]);
  const [partnerPrivileges, setPartnerPrivileges] = useState([]);
  const [intendedRole, setIntendedRole] = useState("");

  let [data, setData] = useState({
                                  firstname: "",
                                  lastname: "",
                                  partner_uuid: "",
                                  email: "",
                                  role: "",
                                  phone: ""
                                });

  const [fetchingAdminPartners, setFetchingAdminPartners] = useState(false);
  const [fetchingPartnerRoles, setFetchingPartnerRoles] = useState(false);
  const [fetchingPartnerPrivileges, setFetchingPartnerPrivileges] = useState(false);
  const [deletingPartner, setDeletingPartner] = useState(false);

  const router = useRouter();
  const { setRouteloading } = useApp();
  const [navigation, setNavigation] = useState(null);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [showAddPartner, setShowAddPartner] = useState(false);

  const [creatingPartner, setCreatingPartner] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);


  const [currentPartner, setCurrentPartner] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
        setData({...data, signature:base64String});
    };
    reader.readAsDataURL(file);
};

  let all_Admin_Partners = null;
  let all_Roles = null;
  let create_partner_response = null;
  let delete_partner_response = null;
  let all_Partner_Privileges = null;

  const get_all_admin_partners = async () => {
    if (fetchingAdminPartners) return;
    setFetchingAdminPartners(true);
    all_Admin_Partners = await getAllAdminPartners(page, perPage);
    setAdminPartners(all_Admin_Partners.admin_partners);
    setFetchingAdminPartners(false);
    if (all_Admin_Partners.error) setError({ error: all_Admin_Partners.error });
    setNavigation(all_Admin_Partners.navigation);
  };

  const get_all_partner_roles = async () => {
    if (fetchingPartnerRoles) return;
    setFetchingPartnerRoles(true);
    all_Roles = await getAllPartnerRoles();

    console.log("all_Roles", all_Roles);

    setPartnerRoles(all_Roles.partner_roles);
    setFetchingPartnerRoles(false);
    if (all_Roles.error) setError({ error: all_Roles.error, status: all_Roles.status });
    // setNavigation(all_Admins.navigation);
  };

  const get_all_partner_privileges = async () => {
    if (fetchingPartnerPrivileges) return;
    setFetchingPartnerPrivileges(true);
    all_Partner_Privileges = await getAllPartnerPrivileges(page, perPage);
    setPartnerPrivileges(all_Partner_Privileges.partner_privileges);
    setFetchingPartnerPrivileges(false);
    if (all_Partner_Privileges.error) setError({ error: all_Partner_Privileges.error });
    // setNavigation(all_AdminRoles.navigation);
  };

  const create_partner = async (data) => {
    if (creatingPartner) return;
    setCreatingPartner(true);
    create_partner_response = await createPartner(data);
    setCreatingPartner(false);
    setShowAddPartner(false);
    if (create_partner_response.error) setError({ error: create_partner_response.error })
    else {
        console.log('create_partner_response', create_partner_response);
        setSuccessMessage("Partner created successfully");
        setDisplaySuccess(true);
        
        setTimeout(() => {
            setDisplaySuccess(false);
            location.reload();
        }, 3000);

    }
    // setNavigation(all_AdminRoles.navigation);
  };
  
  const delete_partner = async (data) => {
    if (deletingPartner) return;
    setDeletingPartner(true);
    delete_partner_response = await deletePartner(data);
    setDeletingPartner(false);
    setConfirmDelete(false);
    if (delete_partner_response.error) setError({ error: delete_partner_response.error })
    else {
        console.log('delete_partner_response', delete_partner_response);
        setSuccessMessage("Partner deleted successfully");
        setDisplaySuccess(true);
        
        setTimeout(() => {
            setDisplaySuccess(false);
            location.reload();
        }, 3000);

    }
    // setNavigation(all_AdminRoles.navigation);
  };

  
  const handleCreate = () => {
    if(data.firstname == ""){
        setCreationError("Please enter user's first name");
        return;
    }
    if(data.lastname == ""){
      setCreationError("Please enter user's last name");
      return;
  }
    if(data.phone == ""){
      setCreationError("Please enter phone");
        return;
    }
    if(data.email == ""){
      setCreationError("Please enter user email");
      return;
    }

    if(data.role == ""){
      setCreationError("Please select a role");
      return;
    }

    create_partner(data);

  }

  const handleDelete = () => {
    delete_partner({partner_user_uuid: currentPartner.uuid});
  }

  useEffect(() => {

    setData({...data, partner_uuid: partner.uuid});
    
    get_all_admin_partners();
    get_all_partner_roles();
    get_all_partner_privileges();
    
  }, [page, perPage]);

  useEffect(() => {
    if (all_Admin_Partners) {
      
      setAdmins(all_Admin_Partners.admin_partners);
      if (all_Admin_Partners.error) {
        
        setError({ error: all_Admin_Partners.error });
      }
      setNavigation(all_Admin_Partners.navigation);
      
    }
  }, [all_Admin_Partners]);

  const clearCreationData = () => {
    
    setData(() => ({
      firstname: "",
      lastname: "",
      phone: "",
      partner_uuid: "",
      email: "",
      role: ""
    }));
  }

  const confirmDeletePartner = (partner) => {
    setDeleteModal(false);
    setDetailsModalOpen(false);
    setConfirmDelete(true);    
  }

  const clearError = () => {
    setCreationError(null);
  };

  return (
    <>
      <div id="team" className="flex flex-cols pb-12 min-h-screen">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Team</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {navigation?.total}
              </span>
            </div>
            <div className="flex items-center gap-6 grow-0">
              <div className="flex items-center gap-6 grow-0">
                <div className="flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer" onClick={() => setShowAddPartner(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  <span className="text-[12px] text-white">Add Team Member</span>                
                </div>
                <div className="flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer" onClick={() => router.push('/dashboard/roles')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[12px] text-white">Manage Roles</span>                
                </div>
              </div>
            </div>
          </div>

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="w-full mt-10">
            {/* {processing && (
              <div className="flex justify-center items-center">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            )}
            {!processing && ( */}
              <>
                <table className="table w-full transparent">
                  <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-11">
                      <th>
                        <span className="text-[13px]">Name</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Role</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Last Active</span>
                      </th>
                      <th>
                        <span className="text-[13px]"></span>
                      </th>                      
                    </tr>

                    {/* row 1 */}

                    {adminPartners &&
                      adminPartners?.map((adminPartner, index) => (
                        <tr
                          key={adminPartner.uuid ? adminPartner.uuid : 1000000000 * Math.random()}
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                          // onClick={() => goToAdminDetail(admin.uuid)}
                        >
                          {/* Name */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                <span>
                                  {getPartnerInitials(adminPartner.firstname + " " + adminPartner.lastname)}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-white">
                                  {adminPartner.firstname + " " + adminPartner.lastname}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/80">
                                  {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                                  {adminPartner.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Role */}
                          <td>
                            <div className="flex gap-0">
                              <span className="p-2 px-4 rounded-full text-white bg-gray-500">{adminPartner.role.role_name[0].toUpperCase() + adminPartner.role.role_name.slice(1)}</span>
                            </div>
                          </td>
                          {/* Last login */}
                          <td>
                            <div>
                              {moment(adminPartner?.updated_at ?? moment()).format(
                                "DD/MM/YYYY"
                              )}
                            </div>
                          </td>
                          <td>
                            <div id={`action-${adminPartner.uuid ?? index}`} className="flex gap-0" onClick={() => {setCurrentPartner(adminPartner); setDetailsModalOpen(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>                            
                          </td>
                          {/* <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th> */}
                        </tr>
                      ))}

                    {/* row 2 */}
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
            {/* )} */}
          </div>
        </div>
      </div>
      {      
        showAddPartner && 
        <div id="create_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "create_modal") setModalOpen(false)}}>
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl p-8 bg-[#111111] inline-flex flex-col w-[450px] pb-4">
            <h1 className="text-white font-mtn-bold text-2xl mb-4">Add Team Member</h1>
            {creationError && (
                <div className="mb-6">
                  <span className="text-red-500 text-sm font-italic">{creationError}</span>
                </div>
              )}
            
            <div className="flex space-x-2">
              <TextInput
                id="firstname"
                label="Firstname"
                // value={data.role_name}                
                onChange={(e) => {
                  setData(() => ({...data, firstname: e.target.value.trim(), fullname: data.firstname + " " + data.lastname}));
                    clearError();
                    console.log('data', data);
                    }
                }
                onBlur={(e) => {
                  setData(() => ({...data, firstname: e.target.value.trim(), fullname: data.firstname + " " + data.lastname}));
                    clearError();
                    console.log('data', data);
                    }
                }
              />
              <TextInput
                id="lastname"
                label="Lastname"         
                onChange={(e) => {
                    setData(() => ({...data, lastname: e.target.value.trim(), fullname: data.firstname + " " + data.lastname}));
                    clearError();
                    console.log('data', data);
                    }
                }
                onBlur={(e) => {
                  setData(() => ({...data, lastname: e.target.value.trim(), fullname: data.firstname + " " + data.lastname}));
                  clearError();
                  console.log('data', data);
                  }
              }
              />
            </div>
            
            <TextInput
              id="phone"
              label="Phone"
              type="text"              
              onChange={(e) => { 
                  setData({...data, phone: e.target.value.trim()});
                  clearError();
                  console.log('data', data);
                }
              }
              onBlur={(e) => { 
                setData({...data, phone: e.target.value.trim()});
                clearError();
                console.log('data', data);
              }
            }
            />
            <TextInput
              id="email"
              label="Email"
              type="email"               
              onChange={(e) => {
                  setData({...data, email: e.target.value.trim()});
                  clearError();
                  console.log('data', data);
                }
              }
              onBlur={(e) => {
                setData({...data, email: e.target.value.trim()});
                clearError();
                console.log('data', data);
              }
            }
            />

            {
              data.role == partnerRoles?.find((a_role) => a_role.role_name == 'delegate').uuid &&

                <div className="mb-4 rounded-lg bg-white/20 flex p-2">              

                  <div className="rounded-lg bg-black border-1 border-dashed border-gray-200 flex p-4 w-full space-x-4 items-center">

                    <div className="w-16 h-16 bg-white/20 flex items-center justify-center rounded-full">
                      
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                      </svg>

                    </div>

                    <div className="flex flex-col flex-1 space-y-.5 justify-center">                
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
              
            }
            
            <div className="flex space-x-2">
              {
                partnerRoles && partnerRoles.map((role) => 
                  <div key={`role-${role.uuid}`} 
                    className={`p-4 rounded-md text-white text-sm cursor-pointer  ${data.role == role.uuid ? 'text-mtn-500 border-1 border-yellow-500 bg-black' : 'bg-gray-600'}`}
                    onClick={() => {setData({...data, role: role.uuid}); console.log('data', data); 
                    clearError();}}>
                    {role.role_name[0].toUpperCase() + role.role_name.slice(1)}
                  </div>)
              }
            </div>
            {
              data.role != "" && 
                <div className="flex space-x-2 mt-4">
                  <p className="text-gray-500">{ellipsify(partnerRoles.find((a_role) => a_role.uuid == data.role)?.privileges?.join(', '), 100)}</p>
                </div>
            }            
                          
            {!creatingPartner && <div className="flex py-8 px-2 space-x-4 justify-center">
              <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => {clearCreationData(); setShowAddPartner(false); }}>Cancel</button>
              <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={handleCreate}>Create</button>
              </div>
            }
            {creatingPartner && 
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
            }
          </div>
        </div>
      }
      {      
        detailsModalOpen && 
        <div id="details_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "details_modal") {setDeleteModal(false); setDetailsModalOpen(false);}}}>
          <div id="actualDetailsModal" className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4" onClick={() => {if(e.target.id == "actualDetailsModal" && deleteModal) setDeleteModal(false)}}>
            <div className="p-8 space-x-4 flex">
              <div className="flex flex-0 justify-center items-center rounded-full w-16 h-16 bg-purple-600 text-white text-[28px]">
                <span className="text-white">
                  {getPartnerInitials(currentPartner.firstname + " "  + currentPartner.lastname)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-white text-xl">{currentPartner.firstname + " "  + currentPartner.lastname}</h1>
                <p className="text-gray-500 text-md">{currentPartner.email}</p>
                <span className=" font-extralight text-[15px] inline-flex items-center justify-center bg-white/20 h-6 px-4 py-3 rounded-md text-white">
                  {currentPartner.role.role_name}
                </span>
              </div>
              <div className="w-12 flex justify-right relative" onClick={() => deleteModal ? setDeleteModal(false) : setDeleteModal(true) }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {
                  deleteModal && 
                  <div className="absolute top-8 bg-[#323232] w-64 rounded-xl p-4 shadow-lg ">
                    {/* <div className="p-2 hover:bg-white/20 rounded-lg cursor-pointer inline-flex space-x-4 w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg> <span className="text-white">Edit user permissions</span>
                    </div> */}
                    <div className="p-2 hover:bg-white/20 rounded-lg cursor-pointer inline-flex space-x-4 w-full"
                      onClick={() => confirmDeletePartner(currentPartner)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg> <span className="text-white">Remove User</span>
                    </div>  
                  </div>
                }
              </div>
            </div>
            <hr className="bg-gray-800"/>
            <div className="p-8 pb-4  space-x-4 flex flex-col">
              <div className="text-white text-sm">
                <p className="text-gray-200 font-mtn-medium-italic text-sm">Privileges</p>
              </div>
              <div>
              {
                  partnerPrivileges.map((privilegeGroup, index) => 
                  
                  privilegeGroup.role_class.length > 0 ?                  
                  <div className="flex space-x-4">
                    <div className="w-[150px]">
                      <span className="text-gray-200 text-xs font-mtn-extralight">{titleCase(privilegeGroup.role_class_name)}</span>
                    </div>
                    <div className="flex flex-col w-[300px]">
                    {
                      privilegeGroup.role_class.map((privilege, index) => 
                      
                      partnerRoles.find(role => role.role_name == currentPartner.role.role_name).privileges.includes(privilege.privilege) ? 
                        (<div className="flex space-x-2 py-2 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg> &nbsp;&nbsp; {privilege.privilege}
                        </div>) : 
                        (<div className="flex space-x-2 py-2 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg> &nbsp;&nbsp; {privilege.privilege}
                        </div>)

                      )
                      
                    }                      
                    </div>
                    
                  </div> : "")
                }
              </div>
            </div>           

              
            <div className="flex py-8 px-2 space-x-4 justify-center">
              <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => {setDeleteModal(false); setDetailsModalOpen(false)}}>OK</button>
            </div>
          </div>
        </div>
      }
      {
        confirmDelete && 
        <div id="confirm_delete_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "confirm_delete_modal") {setConfirmDelete(false);}}}>
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4">
            <div className="p-8 pb-4">
              <p className="text-white text-2xl mb-4">Are you sure you want to delete this partner?</p>
              <p className="text-sm text-gray-500 text-italic">{`${currentPartner.firstname + " " + currentPartner.lastname} will lose access immediately and you can't re-invite them later`}</p>
            </div>
                              
            {!deletingPartner && <div className="flex py-4 px-2 space-x-4 justify-center">
                <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => {setConfirmDelete(false); }}>Cancel</button>
                <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={handleDelete}>Yes, Remove</button>
               </div>
            }
            {deletingPartner && 
                <div className="flex px-4">
                  <TailSpinPreloader width={40} height={40} fill="#efb703" />
                </div>
            }
          </div>
        </div>
      }
      {
        displaySuccess &&
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-end">
            <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>&nbsp;&nbsp; {successMessage}
            </div>
        </div>       
      }
    </>
  );
}
