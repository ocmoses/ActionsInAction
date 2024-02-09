"use client";

import Image from "next/image";
import FilePreviewModal from "@/app/components/FilePreviewModal";
import useApp from "@/hooks/useApp";
import useAdmins from "@/hooks/useAdmins";
import Button from "@/app/components/form/Button";
import { useState, useEffect } from "react";
import usePartners from "@/hooks/usePartners";

const Card = ({ title, subtitle, checked, onChange }) => {
  return (
    <div className="rounded-lg p-4 mb-4 bg-[#111111]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-white text-[16px]">{title}</span>
        </div>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="rounded bg-gray-900 h-5 w-5 accent-yellow-500"
        />
      </div>
      <p className="text-[#999999] text-[12px]">{subtitle}</p>
    </div>
  );
};

export default function VASDrawer({
  action,
  category,
  setOpenDrawer,
  openDrawer,
}) {
  const { getVasTypes } = usePartners();
  const [selectedCard, setSelectedCard] = useState(null);
  const [vasTypes, setVasTypes] = useState([]);

  const handleCardSelect = (index) => {
    setSelectedCard(index);
  };

  const { setActiveApproval } = useAdmins();
  const closeDrawer = () => {
    setActiveApproval(null);
    setOpenDrawer(false);
  };

  const { is_previewing_doc, doc_preview_path, handleCloseModal } = useApp();

  useEffect(() => {
    getVasTypes().then((res) => {
      setVasTypes(res.result);
    });
  }, []);

  return (
    <>
      {is_previewing_doc && (
        <FilePreviewModal
          filePath={doc_preview_path}
          closeModal={handleCloseModal}
        />
      )}

      <main
        className={
          "fixed overflow-hidden z-10 bg-black bg-opacity-75 inset-0 transform ease-in-out " +
          (openDrawer
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-50 opacity-0 translate-x-full ")
        }
      >
        {
          <section
            className={
              " w-screen h-full max-w-[480px] right-0 absolute border-l-2 border-l-white/20 bg-[#030303]/90 shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
              (openDrawer ? " translate-x-0 " : " translate-x-full ")
            }
          >
            <div className="relative flex-none flex flex-col space-y-5 w-screen max-w-[480px] h-full border-l border-l-white/40 p-[32px]">
              <div className="flex flex-none justify-between items-end w-full pl-4 pr-2 pt-6 mb-4">
                <div></div>
                <div
                  onClick={closeDrawer}
                  className="text-[#999999] cursor-pointer hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center items-center w-[60px] h-[60px] text-[#FFCB03] rounded-full bg-white/20">
                {category?.icon ? (
                  <Image src={category.icon} alt="" width={40} height={40} />
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col">
                <span className=" text-white text-[16px]">
                  {category?.category_name} ({category.category_code})
                </span>
                <span className=" text-[#999999] text-[12px]">
                  {category?.description}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[16px] mb-2">
                  Choose your VAS type
                </span>

                <div>
                  {vasTypes?.length > 0 &&
                    vasTypes.map((type, index) => (
                      <Card
                        title={type.type}
                        subtitle={type.descr}
                        checked={selectedCard === index}
                        onChange={() => handleCardSelect(index)}
                      />
                    ))}
                  {/* <Card
                    title="Other VAS"
                    subtitle="Help text describing other VAS service"
                    checked={selectedCard === 2}
                    onChange={() => handleCardSelect(2)}
                  />
                  <Card
                    title="CRBT"
                    subtitle="Help text describing CRBT VAS service"
                    checked={selectedCard === 3}
                    onChange={() => handleCardSelect(3)}
                  /> */}
                </div>
              </div>
              <div>
                <Button label="Get started" onClick={action} />
              </div>
            </div>
          </section>
        }
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={closeDrawer}
        ></section>
      </main>
    </>
  );
}
