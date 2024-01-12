"use client";

import { PartnerMenu, PartnerCompanySettingsMenu, PartnerPersonalSettingsMenu } from "@/app/modules/menu";
import { getPath, ellipsify } from "@/app/modules/utilities";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import useApp from "@/hooks/useApp";
import Link from "next/link";
import { getPartnerInitials } from "@/app/modules/utilities";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";
import ServiceConfigurationButton from "@/app/components/dashboard/ContractComponents";

export default function MenuBar({ open, openAction=null, closeAction=null }) {


  const { partners, getPartnerContractCurrentlyRunning, partnerCategories} = usePartners();

  // console.log("UsePartners in Menubar", usePartners());
  // console.log("partnerCategories", partnerCategories);

  const segments = useSelectedLayoutSegments();
  const currentPath = segments?.reverse();
  const path = `/${getPath(currentPath)}`;
  const app = useApp();

  const [openSecondaryMenu, setOpenSecondaryMenu] = useState(false);

  const { user } = useUsers();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [settingsMenu, setSettingsMenu] = useState(false);

  const getFullname = () => {
    try{
      setFullname(partners ? ellipsify(partners[0]?.company_name, 10): "");
      setEmail(ellipsify(partners[0]?.email));
    }catch(e){
    }    
  };

  useEffect(() => {
    if (path === "/dashboard/getstarted") app.toggleGetstartedLink(true);
    else app.toggleGetstartedLink(false);
    getFullname();
  }, [path]);

 

  return (
    <>
      {!settingsMenu ? (
        <ul className="p-0 flex-grow h-full py-[36px] px-3">
          {app.showGetstartedLink && (
            <li key={"Get started"}>
              <Link
                href={"/dashboard/getstarted"}
                className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                  !open && "tooltip tooltip-right tooltip-mtn"
                }`}
                data-tip={"Get started"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-[20px] h-[20px] ${
                    path === "/dashboard/getstarted" && "text-yellow-300"
                  } `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
                <span className="flex text-gray-100 transition-transform ease-in-out duration-500">
                  Get started
                </span>
              </Link>
            </li>
          )}

          {PartnerMenu.map((menu) =>  
            // Compliance page is hidden until user selects 1 or more categories
            menu.route == "/dashboard/compliance" && partnerCategories?.length == 0 ?
            <></> :
            <li key={menu.label}>
              <Link
                href={menu.route}
                className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                  !open && "tooltip tooltip-right tooltip-mtn"
                }`}
                data-tip={menu.label}
              >
                {menu.icon == "" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-[20px] h-[20px] ${
                      path === menu.route && "text-yellow-300"
                    } `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                    />
                  </svg>
                ) : (
                  menu.icon
                )}

                {open && (
                  <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                    {menu.label}
                  </span>
                )}
              </Link>
            </li>
          )}

          {user?.role == "superAdmin" && (
            <div className={`fixed z-[99] bottom-4 left-0 pl-2 bg-black`}>
              {/* The popup menu */}
              {openSecondaryMenu && (
                <div className="fixed bottom-10 left-3 z-10 bg-black border-1 border-gray-700 rounded-lg shadow-lg p-4 text-white w-72">
                  <div className="flex items-center space-x-3">
                    <div className="relative flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                      <span>{getPartnerInitials(fullname)}</span>
                    </div>
                    <div>
                      <div className="font-italic text-white">{fullname}</div>
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                        {email}
                      </div>
                    </div>
                    <div
                      className="cursor-pointer absolute top-0 right-0"
                      onClick={() => setOpenSecondaryMenu(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="gray"
                        className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>

                  <hr className="my-4 bg-white/200" />

                  <Link
                    href={"/dashboard/team"}
                    className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                      !open && "tooltip tooltip-right tooltip-mtn"
                    }`}
                    data-tip={"Team"}
                    onClick={() => {
                      setOpenSecondaryMenu(false);
                      window.location = "/dashboard/team";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-[20px] h-[20px]`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                      />
                    </svg>

                    <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                      Team
                    </span>
                  </Link>

                  <Link
                    href={"/dashboard/roles"}
                    className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                      !open && "tooltip tooltip-right tooltip-mtn"
                    }`}
                    data-tip={"Team"}
                    onClick={() => {
                      setOpenSecondaryMenu(false);
                      window.location = "/dashboard/roles";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-[20px] h-[20px]`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                      />
                    </svg>

                    <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                      Roles
                    </span>
                  </Link>
                </div>
              )}
              <hr className="mb-4 bg-gray-500" />
              <div
                className={`flex items-center space-x-3 pb-4 ${
                  open ? "pr-6" : "pr-4"
                }`}
              >
                <div
                  className="flex justify-center items-center cursor-pointer rounded-full w-10 h-10 bg-mtn text-white text-[12px]"
                  onClick={() => setOpenSecondaryMenu(!openSecondaryMenu)}
                >
                  <span className="w-10 h-10 flex justify-center items-center">
                    {getPartnerInitials(fullname)}
                  </span>
                </div>
                {open && (
                  <>
                    <div>
                      <div className="font-italic text-white">
                        {ellipsify(fullname, 12)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                        {ellipsify(email, 12)}
                      </div>
                    </div>
                    <div
                      className={`cursor-pointer`}
                      onClick={() => setOpenSecondaryMenu(!openSecondaryMenu)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="gray"
                        className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {user?.role == "superAdmin" && (
          <ServiceConfigurationButton open={open}/>
          )}

          {user?.role == "superAdmin" && (
            <li>
              <Link
                onClick={() => {
                  openAction();
                  setSettingsMenu(true);
                }}
                href="#"
                className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                  !open && "tooltip tooltip-right tooltip-mtn"
                }`}
                data-tip="Settings"
              >
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
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                {open && (
                  <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                    Settings
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>
      ) : (
        <div className="duration-300">
          <div className="bg-white/10 flex justify-between p-4">
            <span className="text-gray-400">SETTINGS</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="grey"
              className="w-6 h-6"
              onClick={() => setSettingsMenu(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="mt-4 p-4 border-b border-white/20">
            <p className="text-white/80">COMPANY</p>
          </div>

          <ul>
            {PartnerCompanySettingsMenu.map((menu) => (
              <li className="m-4" key={menu.label}>
                <Link
                  href={menu.route}
                  className={`flex items-center justify-between px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                    path == menu.route && "bg-[#212121]"
                  }`}
                  data-tip={menu.label}
                >
                  <span
                    className={`hidden md:flex hover:text-white/80 ${
                      path == menu.route ? "text-white/80" : "text-white/40"
                    } 
                    transition-transform ease-in-out duration-500`}
                  >
                    {menu.label}
                  </span>

                  {path == menu.route && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="yellow"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-4 border-b border-white/20">
            <p className="text-white/80">PERSONAL</p>
          </div>

          <ul>
            {PartnerPersonalSettingsMenu.map((menu) => (
              <li className="m-4" key={menu.label}>
                <Link
                  href={menu.route}
                  className={`flex items-center justify-between px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                    path == menu.route && "bg-[#212121]"
                  }`}
                  data-tip={menu.label}
                >
                  <span
                    className={`hidden md:flex ${
                      path == menu.route ? "text-white/80" : "text-white/40"
                    } transition-transform ease-in-out duration-500`}
                  >
                    {menu.label}
                  </span>

                  {path == menu.route && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="yellow"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
