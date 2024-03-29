"use client";
import { useState, useEffect, useContext } from "react";
import {ProfileContext} from "./ProfileProvider";

import AggregatorProfile from "./AggregatorProfile";
import NonaggregatorProfile from "./NonaggregatorProfile";



export default function Profile() {

    const {
        partner
    } = useContext(ProfileContext);

  console.log("PARTNER-=-=", partner);
    
  const [profile, setProfile] = useState("NonAggregator");

  useEffect(() => {
    partner?.aggregator && partner.aggregator.toLowerCase() == "yes" ? 
            setProfile("Aggregator") : 
            setProfile("NonAggregator");
  }, []);
  
  return (
    profile == "Aggregator" ? 
        <AggregatorProfile /> :
        <NonaggregatorProfile /> 
  );

}