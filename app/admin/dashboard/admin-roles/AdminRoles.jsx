"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
  ellipsify
} from "@/app/modules/utilities";
import { status_type, statusOptions } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";

import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useRoles from "@/hooks/useRoles";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import { redirect, useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import TextInput from "@/app/components/form/TextInput";
import RemoteEndpoints from "../../../modules/endpoints";



export default function AdminRoles({ allRoles }) {
  const { getAllAdminRoles, getAllAdminPrivileges, deleteRole, createRole} = useRoles();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [adminRoles, setAdminRoles] = useState([]);
  const [adminPrivileges, setAdminPrivileges] = useState([]);

  const [fetchingAdminRoles, setFetchingAdminRoles] = useState(false);
  const [fetchingAdminPrivileges, setFetchingAdminPrivileges] = useState(false);
  const [deletingRole, setDeletingRole] = useState(false);
  const [creatingRole, setCreatingRole] = useState(false);

  const router = useRouter();
  const { setRouteloading } = useApp();
  const [navigation, setNavigation] = useState(null);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [currentRole, setCurrentRole] = useState(null); //the role being viewed

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [showActions, setShowActions] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
  let all_Admin_Roles = null;
  let all_Admin_Privileges = null;
  let delete_role_response = null;
  let create_role_response = null;

  const get_all_admin_roles = async () => {
    if (fetchingAdminRoles) return;
    setFetchingAdminRoles(true);
    all_Admin_Roles = await getAllAdminRoles(page, perPage);
    setAdminRoles(all_Admin_Roles.admin_roles);
    setFetchingAdminRoles(false);
    if (all_Admin_Roles.error) setError({ error: all_Admin_Roles.error });
    // setNavigation(all_AdminRoles.navigation);
  };

  const get_all_admin_privileges = async () => {
    if (fetchingAdminPrivileges) return;
    setFetchingAdminPrivileges(true);
    all_Admin_Privileges = await getAllAdminPrivileges(page, perPage);
    setAdminPrivileges(all_Admin_Privileges.admin_privileges);
    setFetchingAdminPrivileges(false);
    if (all_Admin_Privileges.error) setError({ error: all_Admin_Privileges.error });
    // setNavigation(all_AdminRoles.navigation);
  };

  const delete_Role = async (uuid) => {
    if (deletingRole) return;
    setDeletingRole(true);
    delete_role_response = await deleteRole(uuid);
    setDeletingRole(false);
    setDeleteModalOpen(false);
    if (delete_role_response.error) setError({ error: delete_role_response.error })
    else {
        console.log('delete_role_response', delete_role_response);
        setSuccessMessage("Role deleted successfully");
        setDisplaySuccess(true);
        
        setTimeout(() => {
            setDisplaySuccess(false);
            location.reload();
        }, 3000);

    }
    // setNavigation(all_AdminRoles.navigation);
  };

  const create_Role = async (data) => {
    if (creatingRole) return;
    setCreatingRole(true);
    create_role_response = await createRole(data);
    setCreatingRole(false);
    setModalOpen(false);
    if (create_role_response.error) setError({ error: create_role_response.error })
    else {
        console.log('create_role_response', create_role_response);
        setSuccessMessage("Role created successfully");
        setDisplaySuccess(true);
        
        setTimeout(() => {
            setDisplaySuccess(false);
            location.reload();
        }, 3000);

    }
    // setNavigation(all_AdminRoles.navigation);
  };

  useEffect(() => {
    
    get_all_admin_roles();
    get_all_admin_privileges();
    
  }, [page, perPage]);

  useEffect(() => {
    setProcessing(true);
    if (all_Admin_Roles) {
      
      setAdmins(all_Admin_Roles.admin_roles);
      if (all_Admin_Roles.error) {
        setProcessing(false);
        // if (allPartners.error === 401) {
        //   redirect(PageRoutes.adminlogin)
        //   return
        // }
        setError({ error: all_Admin_Roles.error });
      }
    //   setNavigation(all_Admin_Roles.navigation);
      setProcessing(false);
    }
  }, [all_Admin_Roles]);

  
  const viewRoleDetails = (uuid) => {
    setCurrentRole(adminRoles.find((role) => role.uuid == uuid));
    setDetailsModalOpen(true);
  }

  const displayDeleteModal = (uuid) => {
    setCurrentRole(adminRoles.find((role) => role.uuid == uuid));
    setDeleteModalOpen(true);
  }

  let data = {
    role_name: "",
    role_type: "admin",
    description: "",
    privileges: [],
  }

  const handleCreate = () => {
    if(data.role_name == ""){
        setError("Role name cannot be empty");
        return;
    }
    if(data.privileges.length == 0){
        setError("You must select at least one privilege");
        return;
    }

    create_Role(data);

  }

  
  return (
    <>
      <div className="flex flex-cols pb-12" onClick={() => showActions != null ? setShowActions(null) : {}}>
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Roles</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {adminRoles?.length}
              </span>
            </div>            
          </div><br/>
          <div className="inline-flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer" onClick={() => setModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            <span className="text-[12px] text-white">Create a custom role</span>                
          </div>

          {errors && errors["error"] && (
            <div className="mb-6">
              <FormErrors error={errors["error"]} />
            </div>
          )}

          <div className="w-full mt-10">
            {processing && (
              <div className="flex justify-center items-center">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            )}
            {!processing && (
              <>
                <table className="table w-full transparent">
                  <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-12">
                      <th>
                        <span className="text-[13px]">Role</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Description</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Team members</span>
                      </th>
                      <th>
                        <span className="text-[13px]">Action</span>
                      </th>                      
                    </tr>

                    {/* row 1 */}

                    {adminRoles &&
                      adminRoles?.map((role) => (
                        <tr
                          key={role.uuid}
                          className="border-b border-b-white/10 cursor-pointer bg-transparent"
                          
                        >
                          {/* Role */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                <span>
                                  {getPartnerInitials(role.role_name[0].toUpperCase())}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-white">
                                  {role.role_name[0].toUpperCase() + role.role_name.slice(1)}
                                </div>                                
                              </div>
                            </div>
                          </td>
                          {/* Description */}
                          <td>
                            <div className="flex gap-0">
                              {ellipsify(role.privileges.join(','))}
                            </div>
                          </td>
                          {/* Role members */}
                          <td>
                            <div>
                              {1}
                            </div>
                          </td>
                          <td>
                            <div id={`action-${role.uuid}`} className="flex gap-0" onClick={() => {setShowActions(`action-${role.uuid}`)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                            {(showActions == `action-${role.uuid}`) &&
                              <div className="rounded-xl flex flex-col shadow-xl absolute bg-gray-500 overflow-hidden">
                                <h1 className="px-8 text-white p-2 hover:bg-gray-800" onClick={() => {setShowActions(null); viewRoleDetails(role.uuid)}}>Details</h1>
                                <h1 className="px-8 bg-red-600 p-2 hover:bg-red-800 text-white" onClick={() => displayDeleteModal(role.uuid)}>Delete</h1>
                              </div>
                            }
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
                {/* For Nav links */}
                {/* <div className="w-full flex justify-end">
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
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
      {      
        modalOpen && 
        <div id="create_modal" 
            className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" 
            >
            
          {/* <div id="modal_background" className="w-screen h-screen bg-black/70" 
                onClick={(e) => {if(e.target.id == "modal_background") setModalOpen(false)}}>

          </div> */}
          
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl p-8 shadow-black bg-[#111111] inline-flex flex-col w-[450px] pb-4">
            <h1 className="text-white font-mtn-bold text-2xl mb-4">Create custom role</h1>
            <TextInput
                id="role_name"
                label="Role name"
                // value={data.role_name}
                onChange={(e) => {
                    data.role_name = e.target.value.trim(); 
                    // console.log('data', data);
                    }
                }
                errors={errors}
              />
              {errors && errors["error"] && (
                <div className="mb-6">
                <FormErrors error={errors["error"]} />
                </div>
              )}
              {/* <TextInput
                id="description"
                label="Role description"
                value={data.description}
                onChange={handleFormChange}
                errors={errors}
              /> */}

              {
                adminPrivileges.length == 0 ? 
                  (<h1 className="text-gray-200 font-mtn-medium-italic">Getting privileges...</h1>)                  
                  :  
                  adminPrivileges.map((privilege, index) => 
                  <label for={'privilege-' + index} className="text-white h-6 mb-4">
                    <input type="checkbox" id={'privilege-' + index} 
                        onChange={(e) => {
                            e.target.checked ? 
                            data.privileges.push(privilege.privilege) : 
                            data.privileges.splice(data.privileges.indexOf(privilege.privilege), 1);
                            // console.log('data', data) 
                            } 
                        } className="rounded bg-gray-900 h-6 w-6" />&nbsp;&nbsp; {privilege.privilege}
                  </label>
                    
                )
              }
              {!creatingRole && <div className="flex py-8 px-2 space-x-4 justify-center">
                <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => setModalOpen(false)}>Cancel</button>
                <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={handleCreate}>Create</button>
               </div>
              }
              {creatingRole && 
                    <TailSpinPreloader width={40} height={40} fill="#efb703" />
                }
          </div>
        </div>
      }
      {      
        detailsModalOpen && 
        <div id="details_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "details_modal") setDetailsModalOpen(false)}}>
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4">
            <div className="p-8 space-x-4 flex">
              <div className="flex flex-0 justify-center items-center rounded-full w-16 h-16 bg-purple-600 text-white text-[28px]">
                <span>
                  {getPartnerInitials(currentRole.role_name[0].toUpperCase() + currentRole.role_name.slice(1))}
                </span>
              </div>
              <div>
                <h1 className="text-white text-xl">{currentRole.role_name[0].toUpperCase() + currentRole.role_name.slice(1)}</h1>
                <p className="text-gray-500 text-md">{ellipsify(currentRole.privileges.join(','))}</p>
                <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 px-4 py-3 rounded-md text-white">
                  {`1 team member`}
                </span>
              </div>
            </div>
            <hr className="bg-gray-800"/>
            <div className="p-8 pb-4  space-x-4 flex">
              <div className="text-white text-sm">
                <p className="text-gray-200 font-mtn-medium-italic text-sm">Privileges</p>
              </div>
              <div>
                {
                  adminPrivileges.map((privilege, index) => 
                  currentRole.privileges.includes(privilege.privilege) ? 
                  <div className="flex space-x-2 py-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg> &nbsp;&nbsp; {privilege.privilege}
                  </div> : 
                  <div className="flex space-x-2 py-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> &nbsp;&nbsp; {privilege.privilege}

                  </div>
                  )
                }
              </div>
            </div>           

              
            <div className="flex py-8 px-2 space-x-4 justify-center">
              <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => setDetailsModalOpen(false)}>OK</button>
            </div>
          </div>
        </div>
      }
      {      
        deleteModalOpen && 
        <div id="delete_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80" onClick={(e) => {if(e.target.id == "delete_modal") setDeleteModalOpen(false)}}>
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[300px] pb-4">
            <div className="p-8 space-x-4 flex flex-col justify-center items-center text-center">
              
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" className="w-12 h-12">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <h1 className="text-white text-xl ">Are you sure you want to delete the role: {currentRole.role_name[0].toUpperCase() + currentRole.role_name.slice(1)}</h1>
                <p className="text-red-500 text-md font-italic">This action is irreversible</p>
                
            </div>
            <hr className="bg-gray-800"/>
                          
            <div className="flex py-4 px-2 space-x-4 justify-center">
                {!deletingRole && <>
                    <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                    <button className=" text-white bg-red-500 w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={() => {delete_Role(currentRole.uuid)}}>Yes, Delete</button>
                </>}
                {deletingRole && 
                    <TailSpinPreloader width={40} height={40} fill="#efb703" />
                }
            </div>
          </div>
        </div>
      }
      {
        displaySuccess &&
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-end">
            <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>&nbsp;&nbsp; {successMessage}
            </div>
        </div>
       
      }
    </>
  );
}
