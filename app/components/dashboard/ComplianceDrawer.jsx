import Image from "next/image";
import { forms } from "@/app/modules/constants";
import FilePreviewModal from "@/app/components/FilePreviewModal";
import useApp from "@/hooks/useApp";
import useAdmins from "@/hooks/useAdmins";

export default function ComplianceDrawer({
  children,
  activeStage,
  category,
  setOpenDrawer,
  openDrawer,
}) {
  const { setActiveApproval } = useAdmins();
  const closeDrawer = () => {
    setActiveApproval(null);
    setOpenDrawer(false);
  };

  const { is_previewing_doc, doc_preview_path, handleCloseModal } = useApp();
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
        {activeStage && (
          <section
            className={
              " w-screen h-full max-w-[480px] right-0 absolute border-l-2 border-l-white/20 bg-[#030303]/90 shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
              (openDrawer ? " translate-x-0 " : " translate-x-full ")
            }
          >
            <div className="relative flex-none flex flex-col w-screen max-w-[480px] h-full border-l border-l-white/40">
              <div className="flex flex-none justity-between items-center w-full pl-4 pr-2 pt-6 mb-4">
                <div className="flex-1 flex justity-start gap-3 items-center ">
                  <div className="flex justify-center items-center w-[40px] h-[40px] text-[#FFCB03] rounded-full bg-white/20">
                    {category?.icon && (
                      <Image
                        src={category.icon}
                        alt=""
                        width={18}
                        height={18}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className=" text-white text-[16px]">
                      {forms[activeStage]?.shortname ?? activeStage}
                    </span>
                    <span className=" text-[#999999] text-[12px]">
                      {category?.category_name}
                    </span>
                  </div>
                </div>
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
              {children}
            </div>
          </section>
        )}
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={closeDrawer}
        ></section>
      </main>
    </>
  );
}
