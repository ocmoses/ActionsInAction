"use client";
import { useState, useEffect, useContext } from "react";
import {
  TailSpinPreloader,
  CompanyLogo,
  DialIcon,
} from "@/app/components/Icons";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import AggregatorIPPage from "./AggregatorIPPage";
import NonAggregatorIPPage from "./NonAggregatorIPPage";

export default function IPPage({ params }) {
  const { partner, partnerCategories } = usePartners();

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
