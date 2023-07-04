import { PartnerMenu } from "@/app/modules/menu";
import { getPath } from "@/app/modules/utilities";
import { useSelectedLayoutSegments } from "next/navigation";
import useApp from "@/hooks/useApp";
import Link from "next/link";
import { useEffect } from "react";

export default function MobileMenuBar({ setMenuOpen }) {
  const segments = useSelectedLayoutSegments();
  const currentPath = segments?.reverse();
  const path = `/${getPath(currentPath)}`;
  const app = useApp();

  useEffect(() => {
    if (path === "/dashboard/getstarted") app.toggleGetstartedLink(true);
    else app.toggleGetstartedLink(false);
  }, [path]);

  return (
    <ul className="p-0 max-w-[90%] h-full">
      {app.showGetstartedLink && (
        <li key={"Get started"}>
          <Link
            href={"/dashboard/getstarted"}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121]"
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
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-start px-4 py-3 text-white gap-2 rounded-lg hover:bg-[#212121]"
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
              <span className="flex text-gray-100 transition-transform ease-in-out duration-500">
                {menu.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
