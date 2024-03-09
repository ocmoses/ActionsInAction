"use client";
import { useState, useEffect } from "react";

import usePartners from "@/hooks/usePartners";
import AggregatorIPPage from "./AggregatorIPPage";
import NonAggregatorIPPage from "./NonAggregatorIPPage";

export default function IPPage({ params }) {
  const { partner } = usePartners();

  const [isAggregator, setIsAggregator] = useState(false);

  useEffect(() => {
    if (partner.aggregator == "Yes") {
      setIsAggregator(true);
    }
  }, []);

  return (
    <>
      {isAggregator && <AggregatorIPPage params={params} />}

      {!isAggregator && <NonAggregatorIPPage />}
    </>
  );
}
