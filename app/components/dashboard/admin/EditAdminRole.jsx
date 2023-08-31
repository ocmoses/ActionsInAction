"use client";
import {DropdownMenu2} from "@/app/components/dashboard/DropdownMenu";




export default function EditAdminRole({ closePopUp, confirmRoleChanges }) {
  return (
    <section id="edit_admin_role">
      <div className="flex flex-col gap-2 justify-center  border-b-1 border-white/10 pb-4  mb-5">
        <div className="flex justify-center items-center m-auto rounded-full w-[70px] h-[70px] bg-[#421A75] text-white text-[30px] ">
          <span>MA</span>
        </div>

        <p className="flex justify-center items-center text-white">
          Mike Afolabi
        </p>

        <span className="flex justify-center items-center m-auto p-2 px-4 rounded-[10px] text-white bg-white/10 max-w-[100px] text-[11px]">
          Super Admin
        </span>
      </div>

      <div className="flex flex-col gap-2 justify-center  border-b-1 border-white/10 pb-4 mb-5">
        <p className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">Mike Afolabi</span>
          <br />
          Name
        </p>

        <p className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">sunaf4real@gmail.com</span>
          <br />
          Email
        </p>

        <div className="text-gray-500 text-[11px]">
          <span className="text-white text-[15px]">Role</span>
          <br />
          <div className="float-left">
          <DropdownMenu2
            options={[
              { value: "1", label: "superAdmin" },
              { value: "2", label: "Admin" },
              { value: "3", label: "Team Lead 1" },
             
            ]}
            defaultvalue={{
              value: "1", 
              label: "superAdmin",
            }}
            onselect={(option) => {
              setPage(1);
              setPerPage(option.value);
            }}
            align="left"
            optionwidth="200"
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

        <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full"
        onClick={confirmRoleChanges}>
          Save Change
        </button>
      </div>
    </section>
  );
}





export const ConfirmAdminRole = ({ closePopUp }) => {
  return (
    <div className="my-10 text-left animate-[slide-left_1s_ease-in-out]">
      <h2 className="text-white font-mtn-bold text-2xl my-4">
        Are you sure you want update this user’s role.
      </h2>
      <p className="mb-5 text-gray-500">
        Olajumoke O. will be able to access all aspects of the portal.
      </p>
      <div className="flex gap-2">
        <button
          className="border-1 border-gray-200 text-white bg-none hover:bg-gray-800 p-8 py-2 rounded-full"
          onClick={closePopUp}
        >
          Discard
        </button>

        <button className="border-1 border-mtn text-black bg-mtn  hover:bg-mtn-800 p-8 py-2 rounded-full" onClick={closePopUp}>
          Save Change
        </button>
      </div>
    </div>
  );
};