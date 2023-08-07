"use client";
import { useEffect } from "react";
import useProcessing from "@/hooks/useProcessing";
import PartnerStatisticsReport from "@/app/components/dashboard/admin/AdminReport"


export default function Approvals() {
  const { setProcessing } = useProcessing();
  useEffect(() => {
    setProcessing(false);
    
  }, []);

  return (
  
      <div id="reports" className="flex flex-cols pb-12">
          <div className="w-full pt-[72px] px-12 mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
                <h2>Reports</h2>
              </div>
            </div>

            <section id="partner_statistics">
              <div className="m-auto my-10  flex flex-row gap-[15px]">
                <PartnerStatisticsReport title="NEW PARTNER" count="1210" percentage="0.54" rate="UP"/>
                <PartnerStatisticsReport title="EXISTING PARTNER" count="750650" percentage="0.54" rate="DOWN"/>
                <PartnerStatisticsReport title="EXPIRING PARTNER" count="40" percentage="0.54" rate="UP"/>
                <PartnerStatisticsReport title="IN REVIEW" count="400" percentage="0.54" rate="UP"/>
              </div>
            </section>
           
          </div>
      </div>
  )}
