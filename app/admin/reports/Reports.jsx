"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import RemoteEndpoints from "@/app/modules/endpoints";
//import useAdmins from "@/hooks/useAdmins";
import { apikey } from "@/app/modules/constants";
import PartnerStatisticsReport, {
  PartnerReportBarChart,
  PartnerFilterList,
} from "@/app/components/dashboard/admin/AdminReport";
import axios from "axios";

export default function Approvals() {
  //const { fetchData }=  useAdmins()
  const [reportStatistics, setReportStatistics] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      // const api_key = apikey
      // const response = await fetchData(RemoteEndpoints.PARTNER_STATISTICS, api_key)
      // if(response.success){
      //   setReportStatistics(response.data);
      // } else {
      //   console.error("Error fetching data:", response.message);
      // }
      if (fetching) return;
      try {
        setFetching(true);
        const response = await axios.get(RemoteEndpoints.PARTNER_STATISTICS, {
          headers: {
            apikey: apikey,
          },
        });
        console.log("this is my response", response);
        setFetching(false);
        setReportStatistics(response.data.data);
      } catch (error) {
        setFetching(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div id="reports" className="flex flex-cols pb-12 min-h-screen">
      <div className="w-full pt-[72px] px-12 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
            <h2>Partners</h2>
          </div>
        </div>

        {reportStatistics && (
          <section id="partner_statistics">
            <div className="m-auto my-10  flex flex-row gap-[10px] flex-wrap">
              {/* Reports for partners */}
              <PartnerStatisticsReport
                title="NEW PARTNER"
                count={reportStatistics.onboarding_stats.partners.new}
                percentage={
                  reportStatistics.onboarding_stats.partners_past_month.new ===
                  0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.onboarding_stats.partners.new -
                          reportStatistics.onboarding_stats.partners_past_month
                            .new) /
                          reportStatistics.onboarding_stats.partners_past_month
                            .new) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.onboarding_stats.partners.new <
                  reportStatistics.onboarding_stats.partners_past_month.new
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="EXISTING PARTNER"
                count={reportStatistics.onboarding_stats.partners.existing}
                percentage={
                  reportStatistics.onboarding_stats.partners_past_month
                    .existing === 0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.onboarding_stats.partners.existing -
                          reportStatistics.onboarding_stats.partners_past_month
                            .existing) /
                          reportStatistics.onboarding_stats.partners_past_month
                            .existing) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.onboarding_stats.partners.new <
                  reportStatistics.onboarding_stats.partners_past_month.new
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="APPROVED PARTNER"
                count={reportStatistics.compliance_stats.compliance.approved}
                percentage={
                  reportStatistics.compliance_stats.compliance_past_month
                    .approved === 0
                    ? "0.00"
                    : Math.abs(
                        ((reportStatistics.compliance_stats.compliance
                          .approved -
                          reportStatistics.compliance_stats
                            .compliance_past_month.approved) /
                          reportStatistics.compliance_stats
                            .compliance_past_month.approved) *
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.compliance_stats.compliance.approved <
                  reportStatistics.compliance_stats.compliance_past_month
                    .approved
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="PARTNERS IN REVIEW"
                count={reportStatistics.compliance_stats.compliance.in_review}
                percentage={
                  reportStatistics.compliance_stats.compliance_past_month
                    .in_review === 0
                    ? "0.00"
                    : Math.abs(
                        ((reportStatistics.compliance_stats.compliance
                          .in_review -
                          reportStatistics.compliance_stats
                            .compliance_past_month.in_review) /
                          reportStatistics.compliance_stats
                            .compliance_past_month.in_review) *
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.compliance_stats.compliance.in_review <
                  reportStatistics.compliance_stats.compliance_past_month
                    .in_review
                    ? "DOWN"
                    : "UP"
                }
              />

              {/* Reports for contracts */}
              <PartnerStatisticsReport
                title="ACTIVE CONTRACTS"
                count={reportStatistics.contracting_stats.contracts.active}
                percentage={
                  reportStatistics.contracting_stats.contracts_past_month
                    .active === 0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.contracting_stats.contracts.active -
                          reportStatistics.contracting_stats
                            .contracts_past_month.active) /
                          reportStatistics.contracting_stats
                            .contracts_past_month.active) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.contracting_stats.contracts.active <
                  reportStatistics.contracting_stats.contracts_past_month.active
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="INACTIVE CONTRACTS"
                count={reportStatistics.contracting_stats.contracts.inactive}
                percentage={
                  reportStatistics.contracting_stats.contracts_past_month
                    .inactive === 0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.contracting_stats.contracts
                          .inactive -
                          reportStatistics.contracting_stats
                            .contracts_past_month.inactive) /
                          reportStatistics.contracting_stats
                            .contracts_past_month.inactive) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.contracting_stats.contracts.inactive <
                  reportStatistics.contracting_stats.contracts_past_month
                    .inactive
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="EXPIRING CONTRACTS"
                count={
                  reportStatistics.contracting_stats.contracts.expiring_soon
                }
                percentage={
                  reportStatistics.contracting_stats.contracts_past_month
                    .expiring_soon === 0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.contracting_stats.contracts
                          .expiring_soon -
                          reportStatistics.contracting_stats
                            .contracts_past_month.expiring_soon) /
                          reportStatistics.contracting_stats
                            .contracts_past_month.expiring_soon) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.contracting_stats.contracts.expiring_soon <
                  reportStatistics.contracting_stats.contracts_past_month
                    .expiring_soon
                    ? "DOWN"
                    : "UP"
                }
              />

              <PartnerStatisticsReport
                title="TOTAL CONTRACTS"
                count={
                  reportStatistics.contracting_stats.contracts.active +
                  reportStatistics.contracting_stats.contracts.inactive +
                  reportStatistics.contracting_stats.contracts.expiring_soon
                }
                percentage={
                  reportStatistics.contracting_stats.contracts_past_month
                    .expiring_soon === 0
                    ? "0.00"
                    : Math.abs(
                        (((reportStatistics.contracting_stats.contracts
                          .expiring_soon -
                          reportStatistics.contracting_stats
                            .contracts_past_month.expiring_soon) /
                          reportStatistics.contracting_stats
                            .contracts_past_month.expiring_soon) *
                          100) /
                          100
                      ).toFixed(2)
                }
                rate={
                  reportStatistics.contracting_stats.contracts.expiring_soon <
                  reportStatistics.contracting_stats.contracts_past_month
                    .expiring_soon
                    ? "DOWN"
                    : "UP"
                }
              />
            </div>
          </section>
        )}

        {/*<section id="partner_reporting_bar_charts">
          <div className="bg-white/10 min-h-[250px] min-w-[280px]">
          
            <PartnerReportBarChart/>
          </div>
      </section>*/}

        <section id="partner_reporting_filtering">
          <div className="bg-white/10 min-h-[250px] min-w-[280px] rounded-lg animate-[slide-down-fade_1s_ease-in-out]">
            <div className="flex flex-col  gap-3 px-5 py-5">
              <h2 className="mb-[15px] text-white">PARTNER LIST</h2>

              <div id="filtering" className="justify-between flex flex-row">
                <div className="flex flex-row gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 p-1 px-3 hover:bg-gray-500 cursor-pointer">
                    <span className="text-[12px] text-white">Add Filter</span>
                    <svg
                      className="w-4 h-4"
                      fill="white"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M30 6.749h-28c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM24 14.75h-16c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h16c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM19 22.75h-6.053c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h6.053c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z"></path>
                    </svg>
                  </div>

                  <div className="text-gray-700 border-l-1 border-white/10 p-1 px-3 relative right-0">
                    No filters applied
                  </div>
                </div>

                <button className="h-[35px] w-[130px] py-[8px] px-[15px] items-center  text-white text-[12px] rounded-full hover:bg-gray-500 cursor-pointer border-1 border-white/10 group/download">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-[14px]  inline-block mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download
                  {/*//===the help layer===========================================================================================================================*/}
                  <div className="absolute z-20 ml-[-36px] w-[150px] min-h-[70px] mt-3 rounded-[5px] bg-[#333333] hidden group-hover/download:block">
                    <div className=" flex flex-col text-[16px] ">
                      <div className="flex gap-3 py-[10px] px-[20px] rounded-[5px] hover:bg-white/10 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-[14px]  inline-block mr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                        PDF
                      </div>
                      <div className="flex gap-3 py-[10px] px-[20px] rounded-[5px] hover:bg-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.25 15.75V20.25H13.875" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.875 15.75L8.25 20.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 15.75L4.875 20.25" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.5 19.875C16.9063 20.1781 17.3994 20.3424 17.9062 20.3438C18.75 20.3437 19.5 20.0625 19.5 19.125C19.5 17.625 16.5 18.2812 16.5 16.875C16.5 16.125 17.0625 15.6562 17.9062 15.6562C18.4131 15.6576 18.9062 15.8219 19.3125 16.125" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.5 12V3.75C4.5 3.55109 4.57902 3.36032 4.71967 3.21967C4.86032 3.07902 5.05109 3 5.25 3H14.25L19.5 8.25V12" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.25 3V8.25H19.5" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                        XLS
                      </div>
                    </div>
                  </div>
                  {/*//==============================================================================================================================*/}
                </button>
              </div>
            </div>
            <PartnerFilterList />
          </div>
        </section>
      </div>
    </div>
  );
}
