"use client";
import React from "react";
import { useEffect } from "react";
import FilteringFlyout from "@/app/components/dashboard/partners/requests/PartnerRequestComponents";
import TablePager from "@/app/components/TablePager";
import EmptyTable from "@/app/components/EmptyTable";
import { CompanyInitial } from "@/app/components/Icons";
import {
  getInitials,
  ellipsify,
  capitalizeFirst,
} from "@/app/modules/utilities";
export default function Requests() {
  return (
    <>
      <div id="reports" className="flex flex-cols pb-12 min-h-screen">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Requests</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                25
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              <FilteringFlyout />
            </div>

            <div className="rounded-[10px] border-1 border-white/20 overflow-x-auto">
              <table className="table w-full transparent rounded-[10px]">
                <tbody>
                  {/* head */}
                  <tr className="bg-white/20">
                    <th>
                      <span className="text-[13px]">Company</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Request ID</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Phone</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Request Date</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Status</span>
                    </th>
                    <th>
                      <span className="text-[13px]"></span>
                    </th>
                  </tr>

                  <tr className="border-b border-b-white/10 bg-transparent  hover:bg-white/5 cursor-pointer">
                    <td>
                      <div className="flex items-center font-bold space-x-4">
                        <CompanyInitial
                          initials={getInitials(
                            "StockMax Limited"
                          ).toUpperCase()}
                        />
                        <div className="flex flex-col">
                          <p>StockMax Limited</p>
                          <span className="text-sm text-gray-500">
                            sunaf4real@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>FR748959</td>

                    <td>08131252996</td>

                    <td>Feb 2024</td>

                    <td>
                      <div
                        className={` py-1 px-2 rounded text-white inline-flex text-sm bg-white/20`}
                      >
                        {capitalizeFirst("pending")}
                      </div>
                    </td>

                    <td><div className="w-[50px] h-[50px] bg-slate-500"></div></td>
                  </tr>

                  <tr className="border-b border-b-white/10 bg-transparent  hover:bg-white/5 cursor-pointer">
                    <td>
                      <div className="flex items-center font-bold space-x-4">
                        <CompanyInitial
                          initials={getInitials(
                            "StockMax Limited"
                          ).toUpperCase()}
                        />
                        <div className="flex flex-col">
                          <p>StockMax Limited</p>
                          <span className="text-sm text-gray-500">
                            sunaf4real@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>FR748959</td>

                    <td>08131252996</td>

                    <td>Feb 2024</td>

                    <td>
                      <div
                        className={` py-1 px-2 rounded text-white inline-flex text-sm bg-[#AD2B19]`}
                      >
                        {capitalizeFirst("declined")}
                      </div>
                    </td>

                    <td>--</td>
                  </tr>

                  <tr className="border-b border-b-white/10 bg-transparent  hover:bg-white/5 cursor-pointer">
                    <td>
                      <div className="flex items-center font-bold space-x-4">
                        <CompanyInitial
                          initials={getInitials(
                            "StockMax Limited"
                          ).toUpperCase()}
                        />
                        <div className="flex flex-col">
                          <p>StockMax Limited</p>
                          <span className="text-sm text-gray-500">
                            sunaf4real@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>FR748959</td>

                    <td>08131252996</td>

                    <td>Feb 2024</td>

                    <td>
                      <div
                        className={` py-1 px-2 rounded text-white inline-flex text-sm bg-[#216E4E]`}
                      >
                        {capitalizeFirst("completed")}
                      </div>
                    </td>

                    <td>--</td>
                  </tr>

                  <tr className="border-b border-b-white/10 bg-transparent  hover:bg-white/5 cursor-pointer">
                    <td>
                      <div className="flex items-center font-bold space-x-4">
                        <CompanyInitial
                          initials={getInitials(
                            "StockMax Limited"
                          ).toUpperCase()}
                        />
                        <div className="flex flex-col">
                          <p>StockMax Limited</p>
                          <span className="text-sm text-gray-500">
                            sunaf4real@gmail.com
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>FR748959</td>

                    <td>08131252996</td>

                    <td>Feb 2024</td>

                    <td>
                      <div
                        className={` py-1 px-2 rounded text-white inline-flex text-sm bg-[#E2B204]`}
                      >
                        {capitalizeFirst("in progress")}
                      </div>
                    </td>

                    <td>--</td>
                  </tr>
                </tbody>
              </table>
              <EmptyTable list={"Requests"} />
              <TablePager list="" action="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
