"use client";

import React from "react";
import { AdminMenu } from "@/app/modules/menu";
import { getPath, ellipsify } from "@/app/modules/utilities";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import {
  getPartnerInitials
} from "@/app/modules/utilities";
import { useEffect } from "react";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import useAdmins from "@/hooks/useAdmins";



export default function MenuBar({ open }) {

  const [openSecondaryMenu, setOpenSecondaryMenu] = useState(false);

  
  const {admin} = useAdmins();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const segments = useSelectedLayoutSegments();
  const currentPath = segments?.reverse();
  const path = `/${getPath(currentPath)}`;


  const getFullname = () => {
    
    setFullname(ellipsify(admin?.fullname, 10));
    setEmail(ellipsify(admin?.email, 10));

    // setFullname("Moses Ocho");
    // setEmail(ellipsify("moses.ocho@mtn.com", 10));
  };
  
  useEffect(() => {
    getFullname();
  }, []);

  // console.log('useRoles', useRoles());
  // const [user, setUser] = useState(null);


  
  return (
    <ul className={`p-0 flex-grow h-full`}>
      {AdminMenu.map((menu) => {
        const path = `/${getPath(segments)}`;

        return (
          <li key={menu.label}>
            <Link
              href={menu.route}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={menu.label}
            >
              {
                menu.icon == "" ? 
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
                </svg> : 
                menu.icon
              }

              {open && (
                <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                  {menu.label}
                </span>
              )}
            </Link>
          </li>
        );
      })}

      <div className={`fixed z-[99] bottom-4 left-0 pl-2 bg-black`}>
        {/* The popup menu */}
        {openSecondaryMenu && <div className="fixed bottom-10 left-3 z-[9999] bg-black border-1 border-gray-700 rounded-lg shadow-lg p-4 text-white w-72">
          
          <div className="flex items-center space-x-3">
            <div className="relative flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
              <span>
                {getPartnerInitials(fullname)}
              </span>
            </div>
            <div>                      
              <div className="font-italic text-white">
                {fullname}
              </div>
              <div className="flex items-center gap-4 text-sm text-white/80">
                {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                {email}
              </div>                
            </div>
            <div className="cursor-pointer absolute top-0 right-0" onClick={() => setOpenSecondaryMenu(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div> 
          </div>

          <hr className="my-4 bg-gray-100" />

          <Link
              href={'/admin/dashboard/admins'}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={'Team'}
              onClick={() => {setOpenSecondaryMenu(false);}}
            >
              {
                path == "/admin/dashboard/admins" ? 
                (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" stroke="#efb703">
                  <path d="M6.10671 7.24671C6.04004 7.24004 5.96004 7.24004 5.88671 7.24671C4.30004 7.19337 3.04004 5.89337 3.04004 4.29337C3.04004 2.66004 4.36004 1.33337 6.00004 1.33337C7.63337 1.33337 8.96004 2.66004 8.96004 4.29337C8.95337 5.89337 7.69337 7.19337 6.10671 7.24671Z" stroke="#efb703" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.9399 2.66663C12.2333 2.66663 13.2733 3.71329 13.2733 4.99996C13.2733 6.25996 12.2733 7.28663 11.0266 7.33329C10.9733 7.32663 10.9133 7.32663 10.8533 7.33329" stroke="#efb703" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.77323 9.70663C1.1599 10.7866 1.1599 12.5466 2.77323 13.62C4.60657 14.8466 7.61323 14.8466 9.44657 13.62C11.0599 12.54 11.0599 10.78 9.44657 9.70663C7.6199 8.48663 4.61323 8.48663 2.77323 9.70663Z" stroke="#efb703" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.2266 13.3334C12.7066 13.2334 13.1599 13.04 13.5332 12.7534C14.5732 11.9734 14.5732 10.6867 13.5332 9.90671C13.1666 9.62671 12.7199 9.44004 12.2466 9.33337" stroke="#efb703" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>) : 
                (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" stroke="white">
                  <path d="M6.10671 7.24671C6.04004 7.24004 5.96004 7.24004 5.88671 7.24671C4.30004 7.19337 3.04004 5.89337 3.04004 4.29337C3.04004 2.66004 4.36004 1.33337 6.00004 1.33337C7.63337 1.33337 8.96004 2.66004 8.96004 4.29337C8.95337 5.89337 7.69337 7.19337 6.10671 7.24671Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.9399 2.66663C12.2333 2.66663 13.2733 3.71329 13.2733 4.99996C13.2733 6.25996 12.2733 7.28663 11.0266 7.33329C10.9733 7.32663 10.9133 7.32663 10.8533 7.33329" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.77323 9.70663C1.1599 10.7866 1.1599 12.5466 2.77323 13.62C4.60657 14.8466 7.61323 14.8466 9.44657 13.62C11.0599 12.54 11.0599 10.78 9.44657 9.70663C7.6199 8.48663 4.61323 8.48663 2.77323 9.70663Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.2266 13.3334C12.7066 13.2334 13.1599 13.04 13.5332 12.7534C14.5732 11.9734 14.5732 10.6867 13.5332 9.90671C13.1666 9.62671 12.7199 9.44004 12.2466 9.33337" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>)
              }

            <span className={`hidden md:flex ${path == '/admin/dashboard/admins' ? 'text-mtn' : 'text-gray-100'} transition-transform ease-in-out duration-500`}>
              Admins
            </span>
          </Link>

          <Link
              href={'/admin/dashboard/admin-roles'}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={'Team'}
              onClick={() => {setOpenSecondaryMenu(false);}}
            >
              {
                path === "/admin/dashboard/admin-roles" ? 
                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#efb703" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ):
                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )
              }

            <span className={`hidden md:flex  ${path == '/admin/dashboard/admin-roles' ? 'text-mtn' : 'text-gray-100'} transition-transform ease-in-out duration-500`}>
              Roles
            </span>
          </Link>
              
        </div>}
        <hr className="mb-4 bg-gray-500" />
        <div className={`flex items-center space-x-3 pb-4 ${open ? "pr-8" : "pr-2"}`}>
          <div className="flex justify-center items-center cursor-pointer rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2"
              onClick={() => setOpenSecondaryMenu(!openSecondaryMenu)}>
            <span>
              {getPartnerInitials(fullname)}
            </span>
          </div>
          {open && (
            <>
              <div>
                <div className="font-italic text-white">
                  {fullname}
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                  {email}
                </div>
              </div>
              <div className={`cursor-pointer`} onClick={() => setOpenSecondaryMenu(!openSecondaryMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                  <path strokeLinecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </div>            
            </>)
          }
          
        </div>
      </div>
    </ul>
  );
}