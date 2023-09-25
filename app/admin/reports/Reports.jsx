"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import RemoteEndpoints from "@/app/modules/endpoints";
import TextInput from "@/app/components/form/TextInput";
//import useAdmins from "@/hooks/useAdmins";
import { apikey } from "@/app/modules/constants";
import PartnerStatisticsReport, {
  PartnerReportBarChart,
  PartnerFilterList,
  PartnerFilterTitle,
} from "@/app/components/dashboard/admin/AdminReport";
import axios from "axios";

export default function Approvals() {
  //const { fetchData }=  useAdmins()
  const [reportStatistics, setReportStatistics] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [search, setSearch] = useState({
    date: true,
    category: false,
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
                      className={`border-1 border-white/20 w-[650px] absolute mt-[38px] z-[9999] bg-[#121212] rounded-xl shadow-xl `}
                    >
                      <div className="flex">
                        <div className="w-[250px] p-4 border-r-1 border-white/20 flex flex-col gap-1">
                          <div
                            className={`${
                              search.date ? "bg-white/20 text-white" : ""
                            }
                            rounded-[5px] py-3 px-4  flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
                            onClick={() => {
                              if (!search.date) {
                                setSearch({
                                  ...search,
                                  date: true,
                                  category: false,
                                  status: false,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14 4V3.006C14 2.45 13.55 2 12.994 2H11V3H10V2H6V3H5V2H3.006C2.45 2 2 2.45 2 3.006V12.994C2 13.55 2.45 14 3.006 14H12.994C13.55 14 14 13.55 14 12.994V5H2V4H14ZM11 1H12.994C14.102 1 15 1.897 15 3.006V12.994C15.0001 13.2575 14.9483 13.5184 14.8476 13.7618C14.7468 14.0053 14.599 14.2264 14.4127 14.4127C14.2264 14.599 14.0053 14.7468 13.7618 14.8476C13.5184 14.9483 13.2575 15.0001 12.994 15H3.006C2.74253 15.0001 2.48162 14.9483 2.23818 14.8476C1.99474 14.7468 1.77355 14.599 1.58725 14.4127C1.40095 14.2264 1.25319 14.0053 1.15243 13.7618C1.05167 13.5184 0.999869 13.2575 1 12.994V3.006C1 1.898 1.897 1 3.006 1H5V0H6V1H10V0H11V1ZM4 7H6V8H4V7ZM7 7H9V8H7V7ZM10 7H12V8H10V7ZM4 9H6V10H4V9ZM7 9H9V10H7V9ZM10 9H12V10H10V9ZM4 11H6V12H4V11ZM7 11H9V12H7V11ZM10 11H12V12H10V11Z"
                                fill="#888888"
                              />
                            </svg>
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
                              search.category ? "bg-white/20 text-white" : ""
                            }
                            rounded-[5px] py-3 px-4 flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
                            onClick={() => {
                              if (!search.category) {
                                setSearch({
                                  ...search,
                                  date: false,
                                  category: true,
                                  status: false,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                d="M15.3334 11.94C15.3467 12.44 15.2134 12.9133 14.9734 13.32C14.84 13.56 14.66 13.78 14.46 13.96C14 14.3867 13.3934 14.6467 12.72 14.6667C11.7467 14.6867 10.8867 14.1867 10.4134 13.42C10.16 13.0267 10.0067 12.5533 10 12.0533C9.98003 11.2133 10.3534 10.4533 10.9534 9.95333C11.4067 9.58 11.98 9.34667 12.6067 9.33334C14.08 9.30001 15.3 10.4667 15.3334 11.94Z"
                                stroke="#888888"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.6267 12.02L12.3 12.66L13.6934 11.3133"
                                stroke="#888888"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M2.1134 4.96002L8.00006 8.36668L13.8467 4.98"
                                stroke="#888888"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8 14.4067V8.36002"
                                stroke="#888888"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M14.4067 6.11335V9.8867C14.4067 9.92003 14.4067 9.94667 14.4 9.98C13.9334 9.57334 13.3334 9.33336 12.6667 9.33336C12.04 9.33336 11.46 9.55336 11 9.92003C10.3867 10.4067 10 11.16 10 12C10 12.5 10.14 12.9734 10.3867 13.3734C10.4467 13.48 10.52 13.58 10.6 13.6734L9.38005 14.3467C8.62005 14.7734 7.38004 14.7734 6.62004 14.3467L3.06004 12.3734C2.25337 11.9267 1.59338 10.8067 1.59338 9.8867V6.11335C1.59338 5.19335 2.25337 4.07336 3.06004 3.62669L6.62004 1.65334C7.38004 1.22668 8.62005 1.22668 9.38005 1.65334L12.94 3.62669C13.7467 4.07336 14.4067 5.19335 14.4067 6.11335Z"
                                stroke="#888888"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            &nbsp; &nbsp;
                            <span className="flex-1">Category</span>
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
                              search.status ? "bg-white/20 text-white" : ""
                            }
                            rounded-[5px] py-3 px-4  flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/20 `}
                            onClick={() => {
                              if (!search.status) {
                                setSearch({
                                  ...search,
                                  date: false,
                                  category: false,
                                  status: true,
                                });
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_7467_2654)">
                                <path
                                  d="M6.25466 14.9697L0.996535 9.71156C0.681335 9.39636 0.599855 9.24924 0.54625 9.07239C0.492645 8.89553 0.492645 8.71466 0.54625 8.5378C0.599856 8.36094 0.681336 8.21382 0.996535 7.89862L7.43011 1.46504C7.61269 1.28246 7.68246 1.22592 7.7686 1.17205C7.85473 1.11818 7.94233 1.0819 8.04132 1.05908C8.14032 1.03627 8.22964 1.02692 8.48784 1.02692L13.6606 1.02692C14.1056 1.02692 14.267 1.07313 14.4298 1.15998C14.5926 1.24683 14.7204 1.37431 14.8077 1.53685C14.895 1.69938 14.9417 1.86063 14.943 2.30565L14.958 7.45589C14.9588 7.71475 14.9496 7.80437 14.9269 7.90372C14.9042 8.00307 14.8679 8.09101 14.814 8.17747C14.76 8.26392 14.7034 8.33394 14.5203 8.51699L8.0676 14.9697C7.7524 15.2849 7.60529 15.3664 7.42843 15.42C7.25157 15.4736 7.0707 15.4736 6.89384 15.42C6.71698 15.3664 6.56986 15.2849 6.25466 14.9697ZM7.3605 14.2626L13.8132 7.80988C13.9054 7.71769 13.9393 7.6819 13.9548 7.66289C13.9572 7.63849 13.9584 7.58918 13.958 7.4588L13.943 2.30856C13.9425 2.12775 13.9401 2.06363 13.9348 2.03431C13.9055 2.02913 13.8414 2.02692 13.6606 2.02692H8.48784C8.35764 2.02692 8.30839 2.02822 8.28402 2.03069C8.26503 2.04618 8.22929 2.08008 8.13722 2.17215L1.70364 8.60573C1.57566 8.73371 1.53183 8.78067 1.51475 8.80509C1.53183 8.82952 1.57566 8.87647 1.70364 9.00446L6.96177 14.2626C7.08975 14.3906 7.13671 14.4344 7.16113 14.4515C7.18556 14.4344 7.23251 14.3906 7.3605 14.2626ZM12.3327 3.6556C13.1138 4.43665 13.1138 5.70298 12.3327 6.48402C11.5517 7.26507 10.2853 7.26507 9.50428 6.48402C8.72323 5.70298 8.72323 4.43665 9.50428 3.6556C10.2853 2.87455 11.5517 2.87455 12.3327 3.6556ZM11.6256 4.3627C11.2351 3.97218 10.6019 3.97218 10.2114 4.3627C9.82086 4.75323 9.82086 5.38639 10.2114 5.77692C10.6019 6.16744 11.2351 6.16744 11.6256 5.77692C12.0161 5.38639 12.0161 4.75323 11.6256 4.3627ZM6.80758 11.28L4.68626 9.15865C4.491 8.96338 4.491 8.6468 4.68626 8.45154C4.88152 8.25628 5.1981 8.25628 5.39337 8.45154L7.51469 10.5729C7.70995 10.7681 7.70995 11.0847 7.51469 11.28C7.31942 11.4752 7.00284 11.4752 6.80758 11.28ZM8.22179 9.86575L6.10047 7.74443C5.90521 7.54917 5.90521 7.23259 6.10047 7.03733C6.29573 6.84206 6.61232 6.84206 6.80758 7.03733L8.9289 9.15865C9.12416 9.35391 9.12416 9.67049 8.9289 9.86575C8.73364 10.061 8.41706 10.061 8.22179 9.86575Z"
                                  fill="#888888"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_7467_2654">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
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

                        <div className="flex-1 p-4 min-h-[300px] bg-white/5">
                          {search.date && (
                            <div className="flex flex-col space-y-4">
                              <div className=" flex flex-row justify-between gap-2 border-b-1 border-white/20 text-white ">
                                <TextInput
                                  id="name"
                                  label="From"
                                  type="date"
                                  name="name"
                                />

                                <TextInput
                                  id="name"
                                  label="To"
                                  type="date"
                                  name="name"
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <h3>Show results for</h3>
                                <PartnerFilterTitle title="Last 30 Days"/>
                                <PartnerFilterTitle title="This Month"/>
                                <PartnerFilterTitle title="Last Month"/>
                                <PartnerFilterTitle title="This Year"/>
                                <PartnerFilterTitle title="Last Year"/>
                                <PartnerFilterTitle title="All Time"/>
                              </div>
                            </div>
                          )}
                          {search.category && (
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
