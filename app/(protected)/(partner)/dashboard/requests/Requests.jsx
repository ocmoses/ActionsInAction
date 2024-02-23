"use client";
import React, { useEffect, useState } from "react";
import { Loading } from "@/app/components/Icons";
import AggregatorPage from "@/app/components/dashboard/partners/requests/PartnerRequestComponents";
/////////////////////////////////////////////////////////////////////////////////////
export default function Requests() {
  const [pageLoading, setPageLoading] = useState(true);
  const realTimePageReloader = () => {
    setPageLoading(true);
    const delayTimer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);
    return () => clearTimeout(delayTimer);
  };
  useEffect(() => {
    realTimePageReloader();
  }, []);
  return (
    
    <>
     {pageLoading ? (
        <div className="w-[100%] flex justify-center">
          <Loading style="h-[600px]" />
        </div>
      ) : (
        <AggregatorPage realTimePageReloader={realTimePageReloader} />
      )}
    </>
  );
}
