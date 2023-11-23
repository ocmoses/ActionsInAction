"use client";
import { useState, useEffect, useContext } from "react";
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import useErrors from "@/hooks/useErrors";
import useProcessing from "@/hooks/useProcessing";
import usePartners from "@/hooks/usePartners";
import AggregatorIPPage from "./AggregatorIPPage";
import NonAggregatorIPPage from "./NonAggregatorIPPage";



export default function IPPage() {

    const {
        partner,
        partnerCategories,
    } = usePartners();

  // console.log("Partner", partner);

  const [isAggregator, setIsAggregator] = useState(true);

  useEffect(() => {

    for (const category in partnerCategories){
        if(category.category_name == "VAS Aggregator"){
            setIsAggregator(true);
            break;
        }
    }

  }, []);
   
    
  return (

    <>

        {
            isAggregator && 
            <AggregatorIPPage />
        }

        {
            !isAggregator && 
            <NonAggregatorIPPage />
        }

    </>

    
  );



}