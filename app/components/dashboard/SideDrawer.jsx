import {useState} from "react";

export default function SideDrawer({title, openDrawer, closeAction, children}){

  const [view, setView] = useState("overview");

  return (
      <>          
        <main
          className={
            "fixed overflow-hidden z-10 bg-black bg-opacity-75 inset-0 transform ease-in-out " +
            (openDrawer
              ? " transition-opacity opacity-100 duration-500 translate-x-0  "
              : " transition-all delay-50 opacity-0 translate-x-full ")
          }
        >            
          <section
          className={
              " w-screen h-full max-w-[480px] right-0 absolute border-l-2 border-l-white/20 bg-[#030303]/90 shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
              (openDrawer ? " translate-x-0 " : " translate-x-full ")
          }
          >
          <div className="relative flex-none flex flex-col w-screen max-w-[480px] h-full border-l border-l-white/40">
              <div className="p-6 w-full flex justify-between">
                <p className="text-white">{title ?? ""}</p>
                <svg onClick={() => closeAction()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-8 h-8 cursor-pointer">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>

              </div>
              <div className="grow-0 flex justify-start items-start gap-6 border-b border-b-white/20 px-6">
                <div
                  onClick={() => setView("overview")}
                  className={`text-[14px] py-3 border-b-2 cursor-pointer ${
                    view === "overview"
                      ? "text-white border-b-[#FFCB03]"
                      : "text-white/50 hover:white/70  border-b-transparent hover:border-white/40"
                  }`}
                >
                  Overview
                </div>
                <div
                  onClick={() => setView("activities")}
                  className={`text-[14px] py-3 border-b-2 cursor-pointer ${
                    view === "activities"
                      ? "text-white border-b-[#FFCB03]"
                      : "text-white/50 hover:white/70  border-b-transparent hover:border-white/40"
                  }`}
                >
                  Activities
                </div>
              </div>
              {
                view == "overview" &&
                <div className="p-6">
                  {children}
                </div>

              }
              
              
          </div>
          </section>
          
          <section
            className=" w-screen h-full cursor-pointer "
            onClick={() => closeAction()}
          ></section>
        </main>
      </>
  );

}