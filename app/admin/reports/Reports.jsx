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
          <>
            <section id="partner_statistics">
              <div className="m-auto my-10  flex flex-row gap-[10px] flex-wrap">
                {/* Reports for partners */}
                <PartnerStatisticsReport
                  title="NEW PARTNER"
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

                <PartnerStatisticsReport
                  title="TOTAL PARTNER"
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

                {/* Reports for contracts */}
                <PartnerStatisticsReport
                  title="ACTIVE CONTRACTS"
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
                    reportStatistics.contracting_stats.contracts.inactive
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
          </>
        )}

        {/*
              <section id="partner_reporting_bar_charts">
                  <div className="bg-white/10 min-h-[250px] min-w-[280px]">
                  
                    <PartnerReportBarChart/>
                  </div>
              </section>
        */}

        {!loadingPartnerList && filteredData && (
          <section id="partner_reporting_filtering">
            <div className="bg-white/10 min-h-[250px] min-w-[280px] rounded-lg animate-[slide-down-fade_1s_ease-in-out]">
              <div className="flex flex-col  gap-3 px-5 py-5">
                <h2 className="mb-[15px] text-white">PARTNER LIST</h2>

                <div id="filtering" className="justify-between flex flex-row">
                  <div className="flex flex-row gap-3">
                    {/* Add Filter button */}
                    <FilteringFlyout
                      filterRecord={filterRecord}
                      searchedData={searchedData}
                    />
                  </div>

                  <button
                    className="h-[35px] w-[130px] py-[8px] px-[15px] items-center  text-white text-[12px] rounded-full hover:bg-gray-500 cursor-pointer border-1 border-white/10"
                    onClick={() => setDownloadModal(!downloadModal)}
                  >
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
                    {downloadModal && <DownloadFlyout />}
                  </button>
                </div>
              </div>

              {/*//==============================================================================================================================*/}

              <table className="table w-full transparent">
                <tr className="border-b border-b-white/40 text-11">
                  <td>
                    <input
                      type="checkbox"
                      className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-5 outline-none appearance-none"
                    />
                    <span className="text-[13px] font-bold">Company</span>
                  </td>
                  <td>
                    <span className="text-[13px] font-bold">Category</span>
                  </td>
                  <td>
                    <span className="text-[13px] font-bold"> Date</span>
                  </td>

                  <td>
                    <span className="text-[13px] font-bold">Status</span>
                  </td>
                  <td>
                    <span className="text-[13px] font-bold"></span>
                  </td>
                </tr>

                {filteredData.slice(0, 5).map((partner, index) => (
                  <tr className="border-b border-b-white/40 text-11 hover:bg-white/5 cursor-pointer transition ease-in-out delay-150">
                    <td key={index}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                        />
                        <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                          <span>{getPartnerInitials(partner.company)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-[#ccc]">
                            {partner.company}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            {partner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row">
                        <div
                          title={partner.category}
                          className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]"
                        >
                          <span>{getPartnerInitials(partner.category)}</span>
                        </div>

                        {/*
                        <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                          <span>R</span>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                          <span>+1</span>
                        </div>
                        */}
                      </div>
                    </td>
                    <td>
                      <span className="text-[13px] font-bold">
                        {partner.status == "expired"
                          ? partner.expiration
                          : partner.date}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-2 rounded-full bg-white/10 p-2 px-3 cursor-pointer float-left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle
                            cx="4"
                            cy="4"
                            r="3"
                            fill={
                              partner.status == "active" &&
                              calculateDaysLeft(partner.expiration) !== 0
                                ? statusColour["others"]
                                : statusColour[partner.status]
                            }
                          />
                        </svg>
                        <span className="text-[12px] text-[#ccc]">
                          {partner.status == "active" &&
                          calculateDaysLeft(partner.expiration) !== 0 ? (
                            <p>
                              {calculateDaysLeft(partner.expiration)} days left
                            </p>
                          ) : (
                            <p>{partner.status}</p>
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </table>

              {pagedData.length == 0 && filteredData.length == 0 ? (
                <EmptyTable list={"Record"} />
              ) : (
                <TablePager list={pagedData} action={setFilteredData} />
              )}
            </div>

            {/* for PDF and CSV download purpose*/}
            <table className="table w-full transparent hidden " id="myTable">
              <tr>
                <td> Company </td>
                <td> Email </td>
                <td> Category </td>
                <td> Date </td>
                <td> Status </td>
              </tr>
              {pagedData.map((partner, index) => (
              <tr key={index}>
                <td> {partner.company} </td>
                <td> {partner.email} </td>
                <td> {partner.category} </td>
                <td> {partner.date} </td>
                <td> {partner.status} </td>
              </tr>
              ))}
            </table>
             {/* end for PDF and CSV download purpose*/}
          </section>
        )}
      </div>
    </div>
  );
}
