"use client";
import { useState, useEffect } from "react";
import RemoteEndpoints from "@/app/modules/endpoints";
//import useAdmins from "@/hooks/useAdmins";
import { apikey } from "@/app/modules/constants";


import PartnerStatisticsReport from "@/app/components/dashboard/admin/AdminReport";
import axios from "axios";

export default function Approvals() {
//const { fetchData }=  useAdmins()
  const [reportStatistics, setReportStatistics] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      // const api_key = apikey
      // const response = await fetchData(RemoteEndpoints.PARTNER_STATISTICS, api_key)
      // if(response.success){
      //   setReportStatistics(response.data);
      // } else {
      //   console.error("Error fetching data:", response.message);
      // }
      try {
        const response = await axios.get(
          RemoteEndpoints.PARTNER_STATISTICS,
          {
            headers: {
              apikey: apikey,
            },
          }
        );
        console.log("this is my response", response);
        setReportStatistics(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReport();
  }, []);


  return (
    <div id="reports" className="flex flex-cols pb-12">
      <div className="w-full pt-[72px] px-12 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
            <h2>Reports</h2>
          </div>
        </div>

        {reportStatistics && (
          <section id="partner_statistics">
            
              <div className="m-auto my-10  flex flex-row gap-[15px] flex-wrap">

                <PartnerStatisticsReport
                  title="NEW PARTNER"
                  count={
                    reportStatistics.onboarding_stats.partners.new
                  }
                  percentage={
                    reportStatistics.onboarding_stats.partners_past_month.new === 0
                    ? "0.00" :
                    Math.abs((((reportStatistics.onboarding_stats.partners.new -
                    reportStatistics.onboarding_stats.partners_past_month.new) /
                    reportStatistics.onboarding_stats.partners_past_month.new) * 100)/100).toFixed(2)
                  }
                  rate={
                    reportStatistics.onboarding_stats.partners.new >
                    reportStatistics.onboarding_stats.partners_past_month.new
                      ? "DOWN"
                      : "UP"
                  }
                />


                <PartnerStatisticsReport
                  title="EXISTING PARTNER"
                  count={
                    reportStatistics.onboarding_stats.partners.existing
                  }
                  percentage={
                    reportStatistics.onboarding_stats.partners_past_month.existing === 0
                    ? "0.00" :
                    Math.abs((((reportStatistics.onboarding_stats.partners.existing -
                    reportStatistics.onboarding_stats.partners_past_month.existing) /
                    reportStatistics.onboarding_stats.partners_past_month.existing) * 100)/100).toFixed(2)
                  }
                  rate={
                    reportStatistics.onboarding_stats.partners.new <
                    reportStatistics.onboarding_stats.partners_past_month.new
                      ? "DOWN"
                      : "UP"
                  }
                />


                <PartnerStatisticsReport
                  title="EXPIRING PARTNER"
                  count={
                    reportStatistics.contracting_stats.licenses.expiring_soon
                  }
                  percentage={
                    reportStatistics.contracting_stats.licenses_past_month.expiring_soon === 0
                    ? "0.00" :
                    Math.abs(((reportStatistics.contracting_stats.licenses.expiring_soon -
                    reportStatistics.contracting_stats.licenses_past_month.expiring_soon) /
                    reportStatistics.contracting_stats.licenses_past_month.expiring_soon) * 100).toFixed(2)
                  }
                  rate={
                    reportStatistics.contracting_stats.licenses.expiring_soon <
                    reportStatistics.contracting_stats.licenses_past_month.expiring_soon
                      ? "DOWN"
                      : "UP"
                  }
                />


                <PartnerStatisticsReport
                  title="IN REVIEW"
                  count={
                    reportStatistics.compliance_stats.compliance.in_review
                  }
                  percentage={
                    reportStatistics.compliance_stats.compliance_past_month.in_review === 0
                    ? "0.00" :
                    Math.abs(((reportStatistics.compliance_stats.compliance.in_review -
                    reportStatistics.compliance_stats.compliance_past_month.in_review) /
                    reportStatistics.compliance_stats.compliance_past_month.in_review) * 100).toFixed(2)
                  }
                  rate={
                    reportStatistics.compliance_stats.compliance.in_review <
                    reportStatistics.compliance_stats.compliance_past_month.in_review
                      ? "DOWN"
                      : "UP"
                  }
                />
              </div>
           
          </section>
        )}
      </div>
    </div>
  );
}
