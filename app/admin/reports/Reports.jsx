"use client";
import { useEffect } from "react";
import useProcessing from "@/hooks/useProcessing";


export default function Approvals() {
  const { setProcessing } = useProcessing();
  useEffect(() => {
    setProcessing(false);
    
  }, []);

  return (
  
      <div id="approvals" className="flex flex-cols pb-12">
          <div className="w-full pt-[72px] px-12 mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
                <h2>Reports</h2>
              </div>
            </div>


            <section id="partner_statistics">
              <div className="m-auto my-10  flex flex-row gap-[15px]">

                  <div id="statistics" className=" w-[25%]  bg-white/10 min-h-[150px] min-w-[280px]">
                    <div className="px-5 py-5 flex  flex-col ">
                        <div className="mb-[15px]">
                          NEW PARTNER
                        </div>
                        <h2 className="text-[30px] text-white font-mtn font-semibold">
                          1,210
                        </h2>
                        <div>
                          <span className="text-green-400">0.54%</span>  Past Month
                        </div>

                    </div>
                  </div>


                  <div id="statistics" className=" w-[25%]  bg-white/10 min-h-[150px] min-w-[280px]">
                    <div className="px-5 py-5 flex  flex-col ">
                        <div className="mb-[15px]">
                          EXISTING PARTNER
                        </div>
                        <h2 className="text-[30px] text-white font-mtn font-semibold">
                          750,650
                        </h2>
                        <div>
                          <span className="text-rose-400">0.54%</span>  Past Month
                        </div>

                    </div>
                  </div>




                  <div id="statistics" className=" w-[25%]  bg-white/10 min-h-[150px] min-w-[280px]">
                    <div className="px-5 py-5 flex  flex-col ">
                        <div className="mb-[15px]">
                          EXPIRING PARTNER
                        </div>
                        <h2 className="text-[30px] text-white font-mtn font-semibold">
                         40
                        </h2>
                        <div>
                          <span className="text-green-400">0.54%</span>  Past Month
                        </div>

                    </div>
                  </div>





                  <div id="statistics" className=" w-[25%]  bg-white/10 min-h-[150px] min-w-[280px]">
                    <div className="px-5 py-5 flex  flex-col ">
                        <div className="mb-[15px]">
                          IN REVIEW
                        </div>
                        <h2 className="text-[30px] text-white font-mtn font-semibold">
                          400
                        </h2>
                        <div>
                          <span className="text-green-400">0.54%</span>  Past Month
                        </div>

                    </div>
                  </div>

                  
               
              </div>
            </section>

           
          </div>
      </div>
  )}
