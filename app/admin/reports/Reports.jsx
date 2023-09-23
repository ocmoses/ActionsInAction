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
  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState({
    date: true,
    keyword: false,
    status: false,
  });
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
                  <div
                    className="flex items-center gap-2 rounded-full bg-white/10 p-1 px-3 hover:bg-gray-500 cursor-pointer"
                    onClick={() => setFilterModal(!filterModal)}
                  >
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

                  {filterModal && (
                    <div
                      className={`border-1 border-white/20 w-[600px] absolute mt-[38px] z-[9999] bg-[#121212] rounded-xl shadow-xl `}
                    >
                      <div className="flex">
                        <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col  space-y-4">
                          <div
                            className={`${
                              search.date ? "bg-white/20" : ""
                            } rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                            onClick={() => {
                              if (!search.date) {
                                setSearch({
                                  ...search,
                                  date: true,
                                  keyword: false,
                                  status: false,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>{" "}
                            &nbsp; &nbsp;
                            <span className="flex-1">Date</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>

                          <div
                            className={`${
                              search.keyword ? "bg-white/20" : ""
                            } rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                            onClick={() => {
                              if (!search.keyword) {
                                setSearch({
                                  ...search,
                                  date: false,
                                  keyword: true,
                                  status: false,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                            </svg>
                            &nbsp; &nbsp;
                            <span className="flex-1">Keyword</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>

                          <div
                            className={`${
                              search.status ? "bg-white/20" : ""
                            } rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20`}
                            onClick={() => {
                              if (!search.status) {
                                setSearch({
                                  ...search,
                                  date: false,
                                  keyword: false,
                                  status: true,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="white"
                              className="w-6 h-6"
                            >
                              <path
                                d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            &nbsp; &nbsp;
                            <span className="flex-1">Status</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 p-4 h-[300px]">
                          {search.date && (
                            <div className="flex flex-col space-y-4">
                              <div className="p-2 rounded-xl border-1 border-white/20 flex text-white items-center justify-center">
                                <input
                                  id="search-from"
                                  onFocus={() =>
                                    (document.getElementById(
                                      "search-from"
                                    ).type = "date")
                                  }
                                  onBlur={() =>
                                    (document.getElementById(
                                      "search-from"
                                    ).type = "text")
                                  }
                                  className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]"
                                  placeholder="From"
                                />{" "}
                                -
                                <input
                                  id="search-from2"
                                  onFocus={() =>
                                    (document.getElementById(
                                      "search-from2"
                                    ).type = "date")
                                  }
                                  onBlur={() =>
                                    (document.getElementById(
                                      "search-from2"
                                    ).type = "text")
                                  }
                                  className="border-0 bg-white/60 text-white rounded-xl color-white p-2 w-[150px]"
                                  placeholder="To"
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 ml-auto"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                  />
                                </svg>
                              </div>
                              <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                                <span className="flex-1">Last 30 days</span>
                              </div>
                              <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                                <span className="flex-1">This month</span>
                              </div>
                              <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                                <span className="flex-1">Last month</span>
                              </div>
                              <div className="rounded-lg p-2 text-white flex w-full items-center cursor-pointer hover:bg-white/20">
                                <span className="flex-1">This year</span>
                              </div>
                            </div>
                          )}
                          {search.keyword && (
                            <div className="flex flex-col space-y-4 px-2">
                              <div className="border-1 border-white/20 rounded-xl p-2 flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="gray"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                  />
                                </svg>
                                <input
                                  onBlur={() => {
                                    /* Search here*/
                                  }}
                                  placeholder="Search for a partner"
                                  className="border-0 bg-transparent focus:border-0 focus:border-transparent active:border-0 active:border-transparent text-white p-2 w-full ml-2"
                                />
                              </div>
                              <span className="text-gray-400 text-sm">
                                Find a contract by searching for a partner by
                                their name
                              </span>
                            </div>
                          )}
                          {search.status && (
                            <div className="flex flex-col space-y-4">
                              <div className="flex ">
                                <div className="w-10 flex mr-1">
                                  <input
                                    type="checkbox"
                                    className="h-6 w-6 rounded-lg bg-black/40"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-300">Active</p>
                                </div>
                              </div>
                              <div className="flex ">
                                <div className="w-10 flex mr-1">
                                  <input
                                    type="checkbox"
                                    className="h-6 w-6 rounded-lg bg-black/40"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-300">Suspended</p>
                                </div>
                              </div>
                              <div className="flex ">
                                <div className="w-10 flex">
                                  <input
                                    type="checkbox"
                                    className="h-6 w-6 rounded-lg bg-black/40"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-300">Pending</p>
                                </div>
                              </div>
                              <div className="flex ">
                                <div className="w-10 flex mr-1">
                                  <input
                                    type="checkbox"
                                    className="h-6 w-6 rounded-lg bg-black/40"
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-300">Expired</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.25 15.75V20.25H13.875"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.875 15.75L8.25 20.25"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 15.75L4.875 20.25"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.5 19.875C16.9063 20.1781 17.3994 20.3424 17.9062 20.3438C18.75 20.3437 19.5 20.0625 19.5 19.125C19.5 17.625 16.5 18.2812 16.5 16.875C16.5 16.125 17.0625 15.6562 17.9062 15.6562C18.4131 15.6576 18.9062 15.8219 19.3125 16.125"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.5 12V3.75C4.5 3.55109 4.57902 3.36032 4.71967 3.21967C4.86032 3.07902 5.05109 3 5.25 3H14.25L19.5 8.25V12"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.25 3V8.25H19.5"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
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
