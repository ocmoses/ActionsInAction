"use client"

import { PartnerMenu } from "@/app/modules/menu";
import { getPath, ellipsify } from "@/app/modules/utilities";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import useApp from "@/hooks/useApp";
import Link from "next/link";
import {
  getPartnerInitials
} from "@/app/modules/utilities";
import useUsers from "@/hooks/useUsers";
import usePartners from "@/hooks/usePartners";


export default function MenuBar({ open }) {
  const {partners} = usePartners();

  const segments = useSelectedLayoutSegments();
  const currentPath = segments?.reverse();
  const path = `/${getPath(currentPath)}`;
  const app = useApp();

  const [openSecondaryMenu, setOpenSecondaryMenu] = useState(false);

  const {session} = useUsers();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");


  const getFullname = () => {
    setFullname(partners[0]?.company_name);
    setEmail(ellipsify(partners[0]?.email));
  };

  useEffect(() => {
    if (path === "/dashboard/getstarted") app.toggleGetstartedLink(true);
    else app.toggleGetstartedLink(false);
    getFullname();
  }, [path]);

  return (
    <ul className="p-0 flex-grow h-full">
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
      {PartnerMenu.map((menu) => {
        return (
          <li key={menu.label}>
            <Link
              href={menu.route}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={menu.label}
            >
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

              {open && (
                <span className="hidden md:flex text-gray-100 transition-transform ease-in-out duration-500">
                  {menu.label}
                </span>
              )}
            </Link>
          </li>
        );
      })}

      <div className={`absolute bottom-0 left-0 pl-2`}>
        {/* The popup menu */}
        {openSecondaryMenu && <div className="fixed bottom-10 left-3 z-10 bg-black border-1 border-gray-700 rounded-lg shadow-lg p-4 text-white w-72">
          
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
                  <path strokeLinecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div> 
          </div>

          <hr className="my-4 bg-white/200" />

          <Link
              href={'/dashboard/team'}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={'Team'}
              onClick={() => {setOpenSecondaryMenu(false); window.location = '/dashboard/team'}}
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
              href={'/dashboard/roles'}
              className={`flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121] ${
                !open && "tooltip tooltip-right tooltip-mtn"
              }`}
              data-tip={'Team'}
              onClick={() => {setOpenSecondaryMenu(false); window.location = '/dashboard/roles'}}
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
              
        </div>}
        <hr className="mb-4 bg-gray-500" />
        <div className="flex items-center space-x-4 pr-8 pb-4">
          <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px]">
            <span className="w-10 h-10 flex justify-center items-center">
              {getPartnerInitials(fullname)}
            </span>
          </div>
          <div>
            <div className="font-italic text-white">
              {ellipsify(fullname, 12)}
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
              {ellipsify(email, 12)}
            </div>
          </div>
          <div className={`cursor-pointer`} onClick={() => setOpenSecondaryMenu(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 ml-4 hover:bg-gray-700 hover:rounded-full p-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>
    </ul>
  );
}