import React from "react";
import MenuBar from "@/app/components/dashboard/MenuBar";
export default function LayoutContent({ children }, open, setOpen) {
  return (
    <>
      <div className="flex">
        <div
          className={` ${
            open ? "w-[250px]" : "w-[100px] "
          } flex h-full py-[36px] px-4 duration-300 border-r border-r-white/20 bg-[#111111]`}
        >
          <div className="flex-1 flex-grow">
            <MenuBar open={open} />
          </div>
        </div>
        <div className="mx-auto flex-1 relative">{children}</div>
      </div>
    </>
  );
}
