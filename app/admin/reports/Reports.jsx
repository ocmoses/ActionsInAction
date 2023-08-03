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


            <div>
              grhhhehe afoo
            </div>

           
          </div>
      </div>
  )}
