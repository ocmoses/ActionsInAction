"use client";
import { useState, useEffect, useRef } from "react";
import { getPartnerInitials } from "@/app/modules/utilities";
import { TailSpinPreloader } from "@/app/components/Icons";
import RemoteEndpoints from "@/app/modules/endpoints";
import { apikey } from "@/app/modules/constants";
import FilteringFlyout, {
  DownloadFlyout,
} from "@/app/components/dashboard/admin/filtering_component/AdminReportFilteringFlyout";
import PartnerStatisticsReport, {
  PartnerReportBarChart,
} from "@/app/components/dashboard/admin/AdminReport";
import axios from "axios";

import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";

function calculateDaysLeft(targetDate) {
  const currentDate = new Date();
  const targetDateObj = new Date(targetDate);
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(currentDate.getDate() + 30);

  if (targetDateObj < thirtyDaysFromNow) {
    // Calculate the difference in days
    const timeDifference = thirtyDaysFromNow - targetDateObj;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
  } else {
    return 0; // The provided date is not within the 30-day window
  }
}

export default function Reports() {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [reportStatistics, setReportStatistics] = useState(null);
  const [loadingReportStatistics, setLoadingReportStatistics] = useState(false);
  const fetchReport = async () => {
    try {
      setLoadingReportStatistics(true);
      const reportStatisticsResponse = await axios.get(
        RemoteEndpoints.PARTNER_STATISTICS,
        {
          headers: {
            apikey: apikey,
          },
        }
      );
      setReportStatistics(reportStatisticsResponse.data.data);
      setLoadingReportStatistics(false);
    } catch (error) {
      console.error("Error Loading Statistics data:", error);
      setLoadingReportStatistics(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const [downloadModal, setDownloadModal] = useState(false);
  const [loadingPartnerList, setLoadingPartnerList] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const statusColour = {
    active: "#2C9958",
    new: "#396587",
    in_review: "#396587",
    expired: "#FE0302",
    others: "#FFCB03",
  };

  useEffect(() => {
    const fetchPartnerList = async () => {
      try {
        setLoadingPartnerList(true);
        const partnerListResponse = await axios.get(
          RemoteEndpoints.PARTNER_LIST,
          {
            headers: {
              apikey: apikey,
            },
          }
        );
        setSearchedData(partnerListResponse.data.data);
        setLoadingPartnerList(false);
      } catch (error) {
        console.error("Error Loading Statistics data:", error);
        setLoadingPartnerList(false);
      }
    };

    fetchPartnerList();
  }, []);

  const filterRecord = (filtered) => {
    setFilteredData(filtered);
    setPagedData(filtered);
  };

  const [reportStat, setReportStat] = useState({
    onboarding: true,
    compliance: false,
    contracting: false,
  });

  return (
    <div id="reports" className="flex flex-cols pb-12 min-h-screen">
      <div className="w-full pt-[72px] px-12 mx-auto">
        <h2 className="text-4xl font-bold text-white">Partners</h2>

        {loadingReportStatistics && (
          <div className="flex justify-center items-center w-screen h-screen">
            <TailSpinPreloader width={72} height={72} fill="#efb703" />
          </div>
        )}

        {!loadingReportStatistics && reportStatistics && (
          <section className="border border-white/10 p-5 m-auto my-10 rounded-[7px] flex flex-col gap-6">
            <div className="p-2 bg-white/10 rounded-[20px] flex gap-3 w-[365px]">
              <button
                className={`${
                  reportStat.onboarding
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-gray-500"
                } py-1 px-3 rounded-[20px] cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 hover:text-white`}
                onClick={() => {
                  if (!reportStat.onboarding) {
                    setReportStat({
                      ...reportStat,
                      onboarding: true,
                      compliance: false,
                      contracting: false,
                    });
                  }
                }}
              >
                Onboarding
              </button>
              <button
                className={`${
                  reportStat.compliance
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-gray-500"
                } py-1 px-3 rounded-[20px] cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 hover:text-white`}
                onClick={() => {
                  if (!reportStat.compliance) {
                    setReportStat({
                      ...reportStat,
                      onboarding: false,
                      compliance: true,
                      contracting: false,
                    });
                  }
                }}
              >
                Compliance
              </button>
              <button
                className={`${
                  reportStat.contracting
                    ? "bg-white/20 text-white"
                    : "bg-transparent text-gray-500"
                } py-1 px-3 rounded-[20px] cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 hover:text-white`}
                onClick={() => {
                  if (!reportStat.contracting) {
                    setReportStat({
                      ...reportStat,
                      onboarding: false,
                      compliance: false,
                      contracting: true,
                    });
                  }
                }}
              >
                Contracting
              </button>
            </div>

            {reportStat.onboarding && (
              <div className="animate-[fade-in_1s_ease-in-out] flex flex-row gap-[10px] flex-wrap justify-between">
                <PartnerStatisticsReport
                  title="TOTAL PARTNER"
                  width="32.3%"
                  count={reportStatistics.onboarding_stats.partners.all}
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
                  title="NEW PARTNER"
                  width="32.3%"
                  count={reportStatistics.onboarding_stats.partners.new}
                  percentage={
                    reportStatistics.onboarding_stats.partners_past_month
                      .new === 0
                      ? "0.00"
                      : Math.abs(
                          (((reportStatistics.onboarding_stats.partners.new -
                            reportStatistics.onboarding_stats
                              .partners_past_month.new) /
                            reportStatistics.onboarding_stats
                              .partners_past_month.new) *
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
                  width="32.3%"
                  count={reportStatistics.onboarding_stats.partners.existing}
                  percentage={
                    reportStatistics.onboarding_stats.partners_past_month
                      .existing === 0
                      ? "0.00"
                      : Math.abs(
                          (((reportStatistics.onboarding_stats.partners
                            .existing -
                            reportStatistics.onboarding_stats
                              .partners_past_month.existing) /
                            reportStatistics.onboarding_stats
                              .partners_past_month.existing) *
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
              </div>
            )}

            {reportStat.compliance && (
              <div className="animate-[fade-in_1s_ease-in-out] flex flex-row gap-[10px] flex-wrap justify-between">
                <PartnerStatisticsReport
                  title="TOTAL PENDING"
                  width="32.3%"
                  count={0}
                  percentage={
                    reportStatistics.compliance_stats.compliance_past_month
                      .approved === 0
                      ? "0.00"
                      : Math.abs(0).toFixed(2)
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
                  title="TOTAL IN REVIEW"
                  width="32.3%"
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

                <PartnerStatisticsReport
                  title="TOTAL APPROVED"
                  width="32.3%"
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
              </div>
            )}

            {reportStat.contracting && (
              <div className="animate-[fade-in_1s_ease-in-out] flex flex-row gap-[10px] flex-wrap justify-between">
                <PartnerStatisticsReport
                  title="ACTIVE CONTRACTS"
                  width="24%"
                  count={reportStatistics.contracting_stats.contracts.active}
                  percentage={
                    reportStatistics.contracting_stats.contracts_past_month
                      .active === 0
                      ? "0.00"
                      : Math.abs(
                          (((reportStatistics.contracting_stats.contracts
                            .active -
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
                    reportStatistics.contracting_stats.contracts_past_month
                      .active
                      ? "DOWN"
                      : "UP"
                  }
                />
                <PartnerStatisticsReport
                  title="INACTIVE CONTRACTS"
                  width="24%"
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
                  title="LICENSE EXPIRING SOON"
                  width="24%"
                  count={0}
                  percentage={
                    reportStatistics.compliance_stats.compliance_past_month
                      .approved === 0
                      ? "0.00"
                      : Math.abs(0).toFixed(2)
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
                  title="CONTRACT EXPIRING SOON"
                  width="24%"
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
              </div>
            )}
          </section>
        )}

        {/*
              <section id="partner_reporting_bar_charts">
                  <div className="bg-white/10 min-h-[250px] min-w-[280px]">
                  
                    <PartnerReportBarChart/>
                  </div>
              </section>
        */}





      </div>
    </div>
  );
}
