"use client";
import { useState, useEffect } from "react";
import { getPartnerInitials } from "@/app/modules/utilities";
import {DropdownMenu2} from "@/app/components/dashboard/DropdownMenu";
import RemoteEndpoints from "@/app/modules/endpoints";
import axios from "axios";
import { TailSpinPreloader } from "@/app/components/Icons";
import useAdmins from "@/hooks/useAdmins";






export default function EditAdminRole({closePopUp,confirmRoleChanges,currentAdmin, adminRoles}) {
  const [newAdminRole, setNewAdminRole] = useState("");


  const proceedConfirmRoleChanges = () => {
    confirmRoleChanges(newAdminRole);
  };
  return (
    <section id="edit_admin_role">
      <div className="flex flex-col gap-2 justify-center  border-b-1 border-white/10 pb-4  mb-5">
        <div className="flex justify-center items-center m-auto rounded-full w-[70px] h-[70px] bg-[#421A75] text-white text-[30px] ">
          <span>{getPartnerInitials(currentAdmin.fullname)}</span>
        </div>

        <p className="flex justify-center items-center text-white">
          {currentAdmin.fullname}
        </p>

        <span className="flex justify-center items-center m-auto p-2 px-4 rounded-[10px] text-white bg-white/10 max-w-[100px] text-[11px]">
          {currentAdmin.role.role_name}
        </span>
      </div>

      <div className="flex flex-col gap-2 justify-center  border-b-1 border-white/10 pb-4 mb-5">
        <p className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">
            {currentAdmin.fullname}
          </span>
          <br />
          Name
        </p>

        <p className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">{currentAdmin.email}</span>
          <br />
          Email
        </p>

        <div className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">Role</span>
          <br />
          <div className="float-left">
            <DropdownMenu2
              options={adminRoles?.map((role) => ({
                value: role.uuid,
                label: role.role_name,
              }))}
              defaultvalue={{
                value: `${currentAdmin.role.uuid}`,
                label: `${currentAdmin.role.role_name}`,
              }}
              onselect={(option) => {
                setNewAdminRole(option.value);
              }}
              align="left"
              optionwidth="150"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Cancel
        </button>

        <button
          className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={proceedConfirmRoleChanges}
        >
          Save Change
        </button>
      </div>
    </section>
  );
}
























export const ConfirmAdminRole = ({ closePopUp,currentAdmin, newAdminRole }) => {
  console.log("all use admin - ", useAdmins());
  
  const {token} = useAdmins();
  const [errorMessage, setErrorMessage] = useState(null);
  const [sendAction, setSendAction] = useState(false);

  const [formData, setFormData] = useState({
    admin_user_uuid: currentAdmin.uuid,
    role_uuid:newAdminRole,
  });
  console.log("The token is - ", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setSendAction(true);
        const response = await axios.put(
          RemoteEndpoints.UPDATE_ADMIN_USER_ROLE,
          formData,
          {
            cache: "no-store",
            next: { revalidate: 120 },
            headers: {
              token: token,
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );
        window.location.reload();
        console.log(response);
     
    } catch (err) {
      setSendAction(false);
      setErrorMessage("There is an error on the try");
      console.log(setErrorMessage, err);
    }
  };


  return (
    <div className="my-10 text-left animate-[slide-left_1s_ease-in-out]">
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Are you sure you want update this user’s role.
      </h2>
      <p className="mb-5 text-gray-500">
      {currentAdmin.fullname} will be able to access all aspects of the portal.
      </p>

      {errorMessage && (
        <p className="text-red-500 text-sm font-italic">{errorMessage}</p>
      )}

      <div className="flex gap-2">
        <button
          className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Discard
        </button>

        {sendAction ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <button
          className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
          onClick={handleSubmit}
        >
          Save Change
        </button>
        )}
       
      </div>
    </div>
  );
};
