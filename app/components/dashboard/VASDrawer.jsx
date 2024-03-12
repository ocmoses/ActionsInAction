import Image from "next/image";
import useAdmins from "@/hooks/useAdmins";
import Button from "@/app/components/form/Button";
import { useState, useEffect } from "react";
import usePartners from "@/hooks/usePartners";
import { TailSpinPreloader } from "@/app/components/Icons";

const Card = ({ title, subtitle, checked, onChange }) => {
  return (
    <div className="rounded-lg p-4 mb-4 bg-[#111111]" onClick={onChange}>
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
  onTypeSelect,
}) {
  const { getVasTypes } = usePartners();
  const [selectedCard, setSelectedCard] = useState(null);
  const [vasTypes, setVasTypes] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const handleCardSelect = (type, uuid, index) => {
    setSelectedCard(index);
    onTypeSelect(type, uuid);
  };

  const { setActiveApproval } = useAdmins();
  const closeDrawer = () => {
    setActiveApproval(null);
    setOpenDrawer(false);
  };

  useEffect(() => {
    setShowLoading(true);
    getVasTypes()
      .then((res) => {
        setVasTypes(res.result);
      })
      .then(() => {
        setShowLoading(false);
      });
  }, [category]);

  const isButtonDisabled = selectedCard === null;

  return (
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
            " w-screen max-w-[380px] right-0 absolute border-l-2 border-l-white/20 bg-[#030303]/90 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
            (openDrawer ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen max-w-[380px] pb-10 h-full">
            <div
              onClick={closeDrawer}
              className="absolute z-50 text-[#999999] cursor-pointer hover:text-white top-[30px] right-[40px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="p-0 h-full pt-[50px]">
              <div className="h-full overflow-x-hidden scrollbar scrollbar-thumb-[#FFCB03] scrollbar-track-[#212121] !scrollbar-w-[4px]">
                <div className="w-full px-6">
                  <div className="flex justify-center items-center w-[60px] h-[60px] text-[#FFCB03] rounded-full bg-white/20">
                    {category?.icon ? (
                      <Image
                        src={category.icon}
                        alt=""
                        width={40}
                        height={40}
                      />
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
                      {showLoading ? (
                        <div className="h-full flex justify-center items-center mt-4 mb-4">
                          <TailSpinPreloader
                            width={50}
                            height={50}
                            fill="#efb703"
                          />
                        </div>
                      ) : (
                        vasTypes
                          ?.slice()
                          .sort((a, b) =>
                            a.type === "CRBT" ? 1 : b.type === "CRBT" ? -1 : 0
                          )
                          .map((type, index) => (
                            <Card
                              key={type.uuid}
                              title={type.type}
                              subtitle={type.descr}
                              checked={selectedCard === index}
                              onChange={() =>
                                handleCardSelect(type.type, type.uuid, index)
                              }
                            />
                          ))
                      )}
                    </div>
                  </div>
                  <div>
                    <Button
                      label="Get started"
                      onClick={action}
                      disabled={isButtonDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      }
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={closeDrawer}
      ></section>
    </main>
  );
}
