"use client";
import { useState, useEffect } from "react";
import {
  getPartnerInitials,
  ellipsify,
  titleCase,
} from "@/app/modules/utilities";

import { TailSpinPreloader } from "@/app/components/Icons";
import useProcessing from "@/hooks/useProcessing";
import useRoles from "@/hooks/useRoles";
import useErrors from "@/hooks/useErrors";
import useAdmins from "@/hooks/useAdmins";
import FormErrors from "@/app/components/FormErrors";
import { useRouter } from "next/navigation";
import useApp from "@/hooks/useApp";
import TextInput from "@/app/components/form/TextInput";

import Filter from "@/app/components/Filter";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

export default function AdminRoles({ allRoles }) {
  const { getAllAdmins } = useAdmins();
  const { getAllAdminRoles, getAllAdminPrivileges, deleteRole, createRole } =
    useRoles();
  const { processing, setProcessing } = useProcessing();
  const [{ errors, setError, clearErrors }] = useErrors(null);
  const [admins, setAdmins] = useState([]);
  const [adminRoles, setAdminRoles] = useState([]);
  const [adminPrivileges, setAdminPrivileges] = useState([]);

  const [fetchingAdmins, setFetchingAdmins] = useState(false);
  const [fetchingAdminRoles, setFetchingAdminRoles] = useState(false);
  const [fetchingAdminPrivileges, setFetchingAdminPrivileges] = useState(false);
  const [deletingRole, setDeletingRole] = useState(false);
  const [creatingRole, setCreatingRole] = useState(false);

  const router = useRouter();
  const { setRouteloading } = useApp();
  const [navigation, setNavigation] = useState(null);
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);

  const [currentRole, setCurrentRole] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [showActions, setShowActions] = useState(null);

  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [allFilteredRoles, setAllFilteredRoles] = useState([]);
  const [allPagedRoles, setAllPagedRoles] = useState([]);

  let all_Admins = null;
  let all_Admin_Roles = null;
  let all_Admin_Privileges = null;
  let delete_role_response = null;
  let create_role_response = null;

  const get_all_admins = async () => {
    if (fetchingAdmins) return;
    setFetchingAdmins(true);
    all_Admins = await getAllAdmins(page, perPage);
    if (all_Admins.status == 401) {
      window.location = "/admin/login";
    }
    setAdmins(all_Admins.admin_users);
    setFetchingAdmins(false);
    if (all_Admins.error) setError({ error: all_Admins.error });
  };

  const get_all_admin_roles = async () => {
    if (fetchingAdminRoles) return;
    setFetchingAdminRoles(true);
    all_Admin_Roles = await getAllAdminRoles(page, perPage)
      .then((resp) => {
        setAllFilteredRoles(resp.admin_roles);
      })
      .catch((error) => {
        console.log("Could not get all admin roles");
      });
    setAdminRoles(all_Admin_Roles?.admin_roles);
    setFetchingAdminRoles(false);
    if (all_Admin_Roles?.error) setError({ error: all_Admin_Roles?.error });
  };

  const get_all_admin_privileges = async () => {
    if (fetchingAdminPrivileges) return;
    setFetchingAdminPrivileges(true);
    all_Admin_Privileges = await getAllAdminPrivileges(page, perPage);
    setAdminPrivileges(all_Admin_Privileges.admin_privileges);
    setFetchingAdminPrivileges(false);
    if (all_Admin_Privileges.error)
      setError({ error: all_Admin_Privileges.error });
  };

  const delete_Role = async (uuid) => {
    if (deletingRole) return;
    setDeletingRole(true);
    delete_role_response = await deleteRole(uuid);
    setDeletingRole(false);
    setDeleteModalOpen(false);
    if (delete_role_response.error)
      setError({ error: delete_role_response.error });
    else {
      console.log("delete_role_response", delete_role_response);
      setSuccessMessage("Role deleted successfully");
      setDisplaySuccess(true);

      setTimeout(() => {
        setDisplaySuccess(false);
        location.reload();
      }, 3000);
    }
  };

  const create_Role = async (data) => {
    if (creatingRole) return;
    setCreatingRole(true);
    create_role_response = await createRole(data);
    setCreatingRole(false);
    setModalOpen(false);
    if (create_role_response.error)
      setError({ error: create_role_response.error });
    else {
      console.log("create_role_response", create_role_response);
      setSuccessMessage("Role created successfully");
      setDisplaySuccess(true);

      setTimeout(() => {
        setDisplaySuccess(false);
        location.reload();
      }, 3000);
    }
  };

  useEffect(() => {
    setProcessing(false);

    get_all_admin_roles();
    get_all_admin_privileges();
    get_all_admins();
  }, [page, perPage]);

  useEffect(() => {
    setProcessing(false);
    if (all_Admin_Roles) {
      setAdmins(all_Admin_Roles.admin_roles);
      if (all_Admin_Roles.error) {
        setProcessing(false);
        setError({ error: all_Admin_Roles.error });
      }
      setProcessing(false);
    }
  }, [all_Admin_Roles]);

  const viewRoleDetails = (uuid) => {
    setCurrentRole(adminRoles.find((role) => role.uuid == uuid));
    setDetailsModalOpen(true);
  };

  const displayDeleteModal = (uuid) => {
    setCurrentRole(adminRoles.find((role) => role.uuid == uuid));
    setDeleteModalOpen(true);
  };

  let data = {
    role_name: "",
    role_type: "admin",
    description: "",
    privileges: [],
  };

  const handleCreate = () => {
    if (data.role_name == "") {
      setError("Role name cannot be empty");
      return;
    }
    if (data.privileges.length == 0) {
      setError("You must select at least one privilege");
      return;
    }

    create_Role(data);
  };

  const getMembers = (role) => {
    return admins
      ? admins.filter((admin) => admin.role.role_name == role.role_name).length
      : "-";
  };

  return (
    <>
      <div
        className="flex flex-cols pb-12 min-h-screen"
        onClick={() => (showActions != null ? setShowActions(null) : {})}
      >
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Roles</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {allFilteredRoles?.length}
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 rounded-full pl-3 bg-white/10 p-2 pr-4 hover:bg-gray-500 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <span className="text-[12px] text-white">
                Create a custom role
              </span>
            </div>
          </div>

          <br />

          <div className="w-full">
            <Filter
              list={allFilteredRoles}
              filterAction={setAllFilteredRoles}
              keysArray={["uuid", "role_name", "description"]}
              msg={
                "Find an admin role by searching for their role name or description"
              }
            />

            {errors && errors["error"] && (
              <div className="mb-6">
                <FormErrors error={errors["error"]} />
              </div>
            )}

            <div className="rounded-[17px] border-1 border-white/20 overflow-x-auto">
              <table className="table w-full transparent">
                <tbody>
                  {/* head */}
                  <tr className="w-full bg-white/20 rounded-[5px]">
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

                  {allPagedRoles?.map((role) => (
                    <tr
                      key={role.uuid}
                      className="border-b border-b-white/10 cursor-pointer bg-transparent"
                    >
                      {/* Role */}
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                            <span className="text-white">
                              {getPartnerInitials(
                                role.role_name[0].toUpperCase()
                              )}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold text-white">
                              {role.role_name[0].toUpperCase() +
                                role.role_name.slice(1)}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Description */}
                      <td>
                        <div className="flex gap-0">
                          {role.privileges.description
                            ? role.privileges.description
                            : ellipsify(role.privileges.join(","))}
                        </div>
                      </td>
                      {/* Role members */}
                      <td>
                        <div>{role.number_of_users}</div>
                      </td>
                      <td>
                        <div
                          id={`action-${role.uuid}`}
                          className="flex gap-0"
                          onClick={() => {
                            setShowActions(`action-${role.uuid}`);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </div>
                        {showActions == `action-${role.uuid}` && (
                          <div className="absolute right-0 bg-[#323232] w-48 rounded-xl p-4 shadow-lg ">
                            <div
                              className="p-2 hover:bg-white/20 rounded-lg cursor-pointer flex space-x-4 w-full"
                              onClick={() => {
                                setShowActions(null);
                                viewRoleDetails(role.uuid);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="gray"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>{" "}
                              <span className="text-white">Role details</span>
                            </div>
                            <div
                              className="p-2 hover:bg-white/20 rounded-lg cursor-pointer flex space-x-4 w-full"
                              onClick={() => displayDeleteModal(role.uuid)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="gray"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                              </svg>{" "}
                              <span className="text-white">Delete role</span>
                            </div>
                          </div>
                        )}
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

              {allFilteredRoles.length == 0 && allPagedRoles.length == 0 ? (
                <EmptyTable list={"roles"} />
              ) : (
                <TablePager list={allFilteredRoles} action={setAllPagedRoles} />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div
          id="create_modal"
          className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80"
        >
          <div
            id="actualModal"
            className="border-2 border-gray-500 rounded-xl shadow-xl p-8 shadow-black bg-[#111111] inline-flex flex-col w-[450px] pb-4"
          >
            <h1 className="text-white font-mtn-bold text-2xl mb-4">
              Create custom role
            </h1>
            <TextInput
              id="role_name"
              label="Role name"
              onChange={(e) => {
                data.role_name = e.target.value.trim();
              }}
              errors={errors}
            />
            {errors && errors["error"] && (
              <div className="mb-6">
                <FormErrors error={errors["error"]} />
              </div>
            )}
            <TextInput
              id="description"
              label="Role description"
              onChange={(e) => {
                data.description = e.target.value.trim();
              }}
              errors={errors}
            />

            {adminPrivileges.length == 0 ? (
              <h1 className="text-gray-200 font-mtn-medium-italic">
                Getting privileges...
              </h1>
            ) : (
              adminPrivileges.map((privilegeGroup, index) => (
                <div className="flex space-x-4" key={index}>
                  <div className="w-[200px]">
                    <span className="text-gray-200 text-xs font-mtn-extralight">
                      {titleCase(privilegeGroup.role_class_name)}
                    </span>
                  </div>
                  <div className="flex flex-col w-[250px]">
                    {privilegeGroup.role_class.map((privilege, index) => (
                      <label
                        key={index}
                        for={"privilege-" + index}
                        className="text-white h-6 mb-4"
                      >
                        <input
                          type="checkbox"
                          id={"privilege-" + index}
                          onChange={(e) => {
                            e.target.checked
                              ? data.privileges.push(privilege.privilege)
                              : data.privileges.splice(
                                  data.privileges.indexOf(privilege.privilege),
                                  1
                                );
                          }}
                          className="rounded bg-gray-900 h-5 w-5 accent-yellow-500"
                        />
                        &nbsp;&nbsp; {privilege.privilege}
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
            {!creatingRole && (
              <div className="flex py-8 px-2 space-x-4 justify-center">
                <button
                  className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full"
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            )}
            {creatingRole && (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            )}
          </div>
        </div>
      )}
      {detailsModalOpen && (
        <div
          id="details_modal"
          className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80"
          onClick={(e) => {
            if (e.target.id == "delete_modal") setDeleteModalOpen(false);
          }}
        >
          <div
            id="actualModal"
            className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4"
          >
            <div className="p-8 space-x-4 flex">
              <div className="flex flex-0 justify-center items-center rounded-full w-16 h-16 bg-purple-600 text-white text-[28px]">
                <span>
                  {getPartnerInitials(
                    currentRole.role_name[0].toUpperCase() +
                      currentRole.role_name.slice(1)
                  )}
                </span>
              </div>
              <div>
                <h1 className="text-white text-xl">
                  {currentRole.role_name[0].toUpperCase() +
                    currentRole.role_name.slice(1)}
                </h1>
                <p className="text-gray-500 text-md">
                  {ellipsify(currentRole.privileges.join(","))}
                </p>
                <span className=" font-extralight text-[15px] inline-flex items-center justify-center bg-white/20 h-6 px-4 py-3 rounded-md text-white">
                  {getMembers(currentRole) == 1
                    ? `${getMembers(currentRole)} team member`
                    : `${getMembers(currentRole)} team members`}
                </span>
              </div>
            </div>
            <hr className="bg-gray-800" />
            <div className="p-8 pb-4  space-x-4 flex flex-col">
              <div className="text-white text-sm">
                <p className="text-gray-200 font-mtn-medium-italic text-sm">
                  Privileges
                </p>
              </div>
              <div>
                {adminPrivileges.map((privilegeGroup, index) => (
                  <div className="flex space-x-4" key={index}>
                    <div className="w-[200px]">
                      <span className="text-gray-200 text-xs font-mtn-extralight">
                        {titleCase(privilegeGroup.role_class_name)}
                      </span>
                    </div>
                    <div className="flex flex-col w-[250px]">
                      {privilegeGroup.role_class.map((privilege, index) =>
                        adminRoles
                          .find(
                            (role) => role.role_name == currentRole.role_name
                          )
                          .privileges.includes(privilege.privilege) ? (
                          <div
                            className="flex space-x-2 py-2 text-white"
                            key={index}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="green"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>{" "}
                            &nbsp;&nbsp; {privilege.privilege}
                          </div>
                        ) : (
                          <div
                            className="flex space-x-2 py-2 text-white"
                            key={index}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="red"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>{" "}
                            &nbsp;&nbsp; {privilege.privilege}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex py-8 px-2 space-x-4 justify-center">
              <button
                className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
                onClick={() => setDetailsModalOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div
          id="delete_modal"
          className="w-screen flex justify-center items-center h-screen fixed z-10 top-0 left-0 bg-black/80"
          onClick={(e) => {
            if (e.target.id == "confirm_delete_modal") {
              setConfirmDelete(false);
            }
          }}
        >
          <div
            id="actualModal"
            className="border-2 border-gray-500 rounded-xl shadow-xl  bg-[#111111] inline-flex flex-col w-[450px] pb-4"
          >
            <div className="p-8 pb-4">
              <p className="text-white text-2xl mb-4">
                Are you sure you want to delete the role:{" "}
                {currentRole.role_name[0].toUpperCase() +
                  currentRole.role_name.slice(1)}
              </p>
              <p className="text-sm text-gray-500 text-italic">{`Everyone with the ${
                currentRole.role_name[0].toUpperCase() +
                currentRole.role_name.slice(1)
              } role will be defaulted to a member role`}</p>
            </div>

            {!deletingRole && (
              <div className="flex py-4 px-2 space-x-4 justify-center">
                <button
                  className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full"
                  onClick={() => {
                    delete_Role(currentRole.uuid);
                  }}
                >
                  Yes, Remove
                </button>
              </div>
            )}
            {deletingRole && (
              <div className="flex px-4">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            )}
          </div>
        </div>
      )}
      {displaySuccess && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-end">
          <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;&nbsp; {successMessage}
          </div>
        </div>
      )}
    </>
  );
}
