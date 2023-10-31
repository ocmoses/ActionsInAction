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
  const [filterModal, setFilterModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [partnerData, setPartnerData] = useState([]);
  const [loadingPartnerList, setLoadingPartnerList] = useState(false);

  const [startDate, setStartDate] = useState(""); // Start date for the date range
  const [endDate, setEndDate] = useState(""); // End date for the date range



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
      setPartnerData(partnerListResponse.data.data);
      setLoadingPartnerList(false);
    } catch (error) {
      console.error("Error Loading Statistics data:", error);
      setLoadingPartnerList(false);
    }
  };

  useEffect(() => {
    fetchPartnerList();
    
  }, []);

  const closeFilterModal = () => {
  setFilterModal(false);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const filterDataByDateRange = () => {
    return partnerData.filter((partner) => {
      if (!startDate && !endDate) {
        return true; // No date range filter applied, return all data
      }

      const partnerDate = new Date(partner.date);
      if (startDate && partnerDate < startDate) {
        return false; // Partner date is earlier than the start date
      }

      if (endDate && partnerDate > endDate) {
        return false; // Partner date is later than the end date
      }

      return true; // Partner date falls within the selected date range
    });
  };

  const filteredData = filterDataByDateRange();

  const [selectedStatus, setSelectedStatus] = useState([]); // Array to hold selected status options
  const [selectedCategory, setSelectedCategory] = useState([]); // Array to hold selected category options

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus((prevSelectedStatus) => {
      if (prevSelectedStatus.includes(value)) {
        return prevSelectedStatus.filter((status) => status !== value);
      } else {
        return [...prevSelectedStatus, value];
      }
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory.includes(value)) {
        return prevSelectedCategory.filter((category) => category !== value);
      } else {
        return [...prevSelectedCategory, value];
      }
    });
  };

  return (
    <div id="reports" className="flex flex-cols pb-12 min-h-screen">
      <div className="w-full pt-[72px] px-12 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
            <h2>Partners</h2>
            <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md"></span>
          </div>
        </div>










        {loadingReportStatistics && (
          <div className="flex justify-center items-center w-screen h-screen">
            <TailSpinPreloader width={72} height={72} fill="#efb703" />
          </div>
        )}

        {reportStatistics && (
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
          </>
        )}






        {/*<section id="partner_reporting_bar_charts">
                  <div className="bg-white/10 min-h-[250px] min-w-[280px]">
                  
                    <PartnerReportBarChart/>
                  </div>
              </section>
            */}


















        {!loadingPartnerList && partnerData && (
          <>
            <section id="partner_reporting_filtering">
              <div className="bg-white/10 min-h-[250px] min-w-[280px] rounded-lg animate-[slide-down-fade_1s_ease-in-out]">
                <div className="flex flex-col  gap-3 px-5 py-5">
                  <h2 className="mb-[15px] text-white">PARTNER LIST</h2>

                  <div id="filtering" className="justify-between flex flex-row">
                    <div className="flex flex-row gap-3">
                      {/* Add Filter button */}
                      <div
                        className="flex items-center gap-2 rounded-full bg-white/10 p-1 px-3 hover:bg-gray-500 cursor-pointer"
                        onClick={() => setFilterModal(!filterModal)}
                      >
                        <span className="text-[12px] text-white">
                          Add Filter
                        </span>
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

                      {filterModal && <FilteringFlyout close={closeFilterModal} startDate={startDate} endDate={endDate} />}
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

                <table className="table w-full transparent" id="myTable">
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

                  {filteredData.map((partner, index) => (
                    <tr className="border-b border-b-white/40 text-11">
                      <td key={index}>
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-5 outline-none appearance-none"
                        />
                        <span className="text-[13px] font-bold">
                          {partner.company}
                        </span>
                      </td>
                      <td>
                        <span className="text-[13px] font-bold">
                          {partner.category}
                        </span>
                      </td>
                      <td>
                        <span className="text-[13px] font-bold">
                          {" "}
                          {partner.date}
                        </span>
                      </td>

                      <td>
                        <span className="text-[13px] font-bold">
                          {partner.status}
                        </span>
                      </td>
                      <td>
                        <span className="text-[13px] font-bold"></span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
