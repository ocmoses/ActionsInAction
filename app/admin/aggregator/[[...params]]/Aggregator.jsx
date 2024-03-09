"use client";

import { useState, useEffect } from "react";
import { Loading } from "@/app/components/Icons";
import AggregatorPage from "@/app/components/dashboard/admin/aggregator/AggregatorComponents";
export default function Aggregator({params}) {
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
        <AggregatorPage params={params} realTimePageReloader={realTimePageReloader} />
      )}
    </>
  );
}
