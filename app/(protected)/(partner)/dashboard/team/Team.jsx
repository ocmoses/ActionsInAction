"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  filterPartner,
  Util,
} from "@/app/modules/utilities";
import { status_type, statusOptions } from "@/app/modules/constants";
import { PageRoutes } from "@/app/modules/menu";

import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useAdmins from "@/hooks/useAdmins";
import useRoles from "@/hooks/useRoles";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import moment from "moment";
import { redirect, useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import TextInput from "@/app/components/form/TextInput";
import { ellipsify } from "@/app/modules/utilities";

export default function Team({ allTeam }) {
  const { getAllAdmins, createAdmin } = useAdmins();
  const {getAllAdminRoles} = useRoles();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [admins, setAdmins] = useState([]);

  const [adminRoles, setAdminRoles] = useState([]);
  const [intendedRole, setIntendedRole] = useState("");

  const [fetchingAdmins, setFetchingAdmins] = useState(false);
  const [fetchingAdminRoles, setFetchingAdminRoles] = useState(false);

  const router = useRouter();
  const { setRouteloading } = useApp();
  const [navigation, setNavigation] = useState(null);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [creatingAdmin, setCreatingAdmin] = useState(false);

  let all_Admins = null;
  let all_Roles = null;
  let create_admin_response = null;

  const get_all_admins = async () => {
    if (fetchingAdmins) return;
    setFetchingAdmins(true);
    all_Admins = await getAllAdmins(page, perPage);
    setAdmins(all_Admins.admin_users);
    setFetchingAdmins(false);
    if (all_Admins.error) setError({ error: all_Admins.error });
    setNavigation(all_Admins.navigation);
  };

  const get_all_admin_roles = async () => {
    if (fetchingAdminRoles) return;
    setFetchingAdminRoles(true);
    all_Roles = await getAllAdminRoles();
    setAdminRoles(all_Roles.admin_roles);
    setFetchingAdminRoles(false);
    if (all_Roles.error) setError({ error: all_Roles.error });
    // setNavigation(all_Admins.navigation);
  };

  const create_admin = async (data) => {
    if (creatingAdmin) return;
    setCreatingAdmin(true);
    create_admin_response = await createAdmin(data);
    setCreatingAdmin(false);
    setShowAddAdmin(false);
    if (create_admin_response.error) setError({ error: create_admin_response.error })
    else {
        console.log('create_admin_response', create_admin_response);
        setSuccessMessage("Admin created successfully");
        setDisplaySuccess(true);
        
        setTimeout(() => {
            setDisplaySuccess(false);
            location.reload();
        }, 3000);

    }
    // setNavigation(all_AdminRoles.navigation);
  };

  let data = {
    fullname: "",
    username: "",
    email: "",
    department: "",
    department_code: "",
    role: intendedRole
  }

  const handleCreate = () => {
    if(data.fullname == ""){
        setError("Please enter user's full name");
        return;
    }
    if(data.username == ""){
        setError("Please enter username");
        return;
    }
    if(data.email == ""){
      setError("Please enter user email");
      return;
    }

    if(data.department == ""){
      setError("Please enter department");
      return;
    }

    if(data.department_code == ""){
      setError("Please enter department code");
      return;
    }

    if(data.role == ""){
      setError("Please select a role");
      return;
    }

    create_admin(data);

  }

  useEffect(() => {
    
    get_all_admins();
    get_all_admin_roles();
    
  }, [page, perPage]);

  useEffect(() => {
    setProcessing(true);
    if (all_Admins) {
      
      setAdmins(all_Admins.admin_users);
      if (all_Admins.error) {
        setProcessing(false);
        setError({ error: all_Admins.error });
      }
      setNavigation(all_Admins.navigation);
      setProcessing(false);
    }
  }, [all_Admins]);

  const goToAdminDetail = (uuid) => {
    setRouteloading(true);
    router.push(`admin/details`);
  };
  return (
    <>
      <div id="compliance" className="flex flex-cols pb-12">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Admins</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {navigation?.total}
              </span>
            </div>
            <div className="flex items-center gap-6 grow-0">
              <div className="flex items-center gap-6 grow-0">
                <div className="flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer" onClick={() => setShowAddAdmin(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  <span className="text-[12px] text-white">Add Admin</span>                
                </div>
                <div className="flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer" onClick={() => router.push('/admin/dashboard/admin-roles')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

                    {admins &&
                      admins?.map((admin) => (
                        <tr
                          key={admin.uuid}
                          className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/20"
                        //   onClick={() => goToAdminDetail(admin.uuid)}
                        >
                          {/* Name */}
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                <span>
                                  {getPartnerInitials(admin.fullname)}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-white">
                                  {admin.fullname}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/80">
                                  {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                                  {admin.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* Role */}
                          <td>
                            <div className="flex gap-0">
                              <span className="p-2 px-4 rounded-full text-white bg-gray-500">{admin.role.role_name[0].toUpperCase() + admin.role.role_name.slice(1)}</span>
                            </div>
                          </td>
                          {/* Last login */}
                          <td>
                            <div>
                              {moment(admin?.updated_at).format(
                                "DD/MM/YYYY"
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
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
            )}
          </div>
        </div>
      </div>
      {      
        showAddAdmin && <div id="create_modal" className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black bg-opacity-80" onClick={(e) => {if(e.target.id == "create_modal") setModalOpen(false)}}>
          <div id="actualModal" className="border-2 border-gray-500 rounded-xl shadow-xl p-8 bg-black inline-flex flex-col w-[450px] pb-4">
            <h1 className="text-white font-mtn-bold text-2xl mb-4">Add Admin</h1>
            {errors && errors["error"] && (
                <div className="mb-6">
                <FormErrors error={errors["error"]} />
                </div>
              )}
            <TextInput
                id="fullname"
                label="Fullname"
                // value={data.role_name}                
                onChange={(e) => {
                    data.fullname = e.target.value.trim(); 
                    console.log('data', data);
                    }
                }
            />
            <div className="flex space-x-2">
              <TextInput
                id="username"
                label="Username"
                // value={data.role_name}                
                onChange={(e) => {
                    data.username = e.target.value.trim(); 
                    console.log('data', data);
                    }
                }
              />
              <TextInput
                id="email"
                label="Email"
                type="email"               
                onChange={(e) => {
                    data.email = e.target.value.trim(); 
                    console.log('data', data);
                    }
                }
              />
            </div>
            <TextInput
                id="department"
                label="Department"
                // value={data.role_name}                
                onChange={(e) => {
                    data.department = e.target.value.trim(); 
                    console.log('data', data);
                    }
                }
            />
            <TextInput
                id="department_code"
                label="Department Code"
                // value={data.role_name}                
                onChange={(e) => {
                    data.department_code = e.target.value.trim(); 
                    console.log('data', data);
                    }
                }
            />
            <div className="flex space-x-2">
              {
                adminRoles && adminRoles.map((role) => 
                  <div key={`role-${role.uuid}`} 
                    className={`p-4 rounded-md text-white text-sm cursor-pointer  ${intendedRole == role.uuid ? 'text-mtn-500 border-1 border-yellow-500 bg-black' : 'bg-gray-600'}`}
                    onClick={() => setIntendedRole(role.uuid)}>
                    {role.role_name[0].toUpperCase() + role.role_name.slice(1)}
                  </div>)
              }
            </div>
            {
              intendedRole && <div className="flex space-x-2 mt-4">
                <p className="text-gray-500">{ellipsify(adminRoles.find((a_role) => a_role.uuid == intendedRole)?.privileges?.join(', '), 100)}</p>
                </div>

            }
            
            
              
              {/* <TextInput
                id="description"
                label="Role description"
                value={data.description}
                onChange={handleFormChange}
                errors={errors}
              /> */}

              
              {!creatingAdmin && <div className="flex py-8 px-2 space-x-4 justify-center">
                <button className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full" onClick={() => setShowAddAdmin(false)}>Cancel</button>
                <button className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full" onClick={handleCreate}>Create</button>
               </div>
              }
              {creatingAdmin && 
                    <TailSpinPreloader width={40} height={40} fill="#efb703" />
                }
          </div>
        </div>
      }
    </>
  );
}
