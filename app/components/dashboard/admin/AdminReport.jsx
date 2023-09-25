import React, { useEffect } from "react";
import { formatNumber } from "@/app/modules/utilities";
import { IncreaseArrow, DecreaseArrow } from "@/app/components/Icons";
import Chart from "chart.js";

export default function PartnerStatisticsReport({
  title,
  count,
  percentage,
  rate,
}) {
  return (
    <div
      id="statistics"
      className=" w-[24%]  bg-white/10 min-h-[150px] min-w-[200px] rounded-lg animate-[slide-down-fade_1s_ease-in-out]"
    >
      <div className="px-5 py-5 flex  flex-col">
        <div className="mb-[15px] text-gray-400">{title}</div>
        <h2 className="text-[30px] text-white font-mtn font-semibold">
          {formatNumber(parseInt(count))}
        </h2>
        <div className="text-gray-400">
          {rate == "UP" ? (
            <span className="text-green-400">
              <IncreaseArrow iconClass="float-left mt-[5px] mr-[5px]" />{" "}
              {percentage}%
            </span>
          ) : (
            <span className="text-rose-400">
              <DecreaseArrow iconClass="float-left mt-[5px] mr-[5px]" />{" "}
              {percentage}%
            </span>
          )}
          &nbsp; Past Month
        </div>
      </div>
    </div>
  );
}


















export const PartnerReportBarChart = () => {
  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "New Partner",
            backgroundColor: "#8E5F05",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: true,
            barThickness: 8,
            borderRadius: "10", // Added borderRadius here
          },
          {
            label: "Existing Partner",
            backgroundColor: "#F0DBA2",
            data: [27, 68, 86, 74, 10, 4, 87],
            fill: false,
            barThickness: 8,
            borderRadius: 50, // Added borderRadius here
            borderSkipped: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },

        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [5],
                borderDashOffset: [5],
                color: "rgba(255, 255, 255, .1)",
                zeroLineColor: "rgba(255, 255, 255, .1)",
                zeroLineBorderDash: [3],
                zeroLineBorderDashOffset: [5],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [5],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(255, 255, 255, .1)",
                zeroLineColor: "rgba(255, 255, 255, .1)",
                zeroLineBorderDash: [3],
                zeroLineBorderDashOffset: [5],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);

  return (
    <div className="min-h-[250px]">
      <canvas id="bar-chart"></canvas>
    </div>
  );
};
















































export const PartnerFilterList = () => {
  return (
    <section>
      <table className="table w-full transparent">
        <tbody>
          {/* head */}
          <tr className="border-b border-b-white/40 text-11">
            <th>
              <input
                type="checkbox"
                className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-5 outline-none appearance-none"
              />
              <span className="text-[13px]">Company</span>
            </th>
            <th>
              <span className="text-[13px]">Category</span>
            </th>
            <th>
              <span className="text-[13px]">Date</span>
            </th>
            <th>
              <span className="text-[13px]">Status</span>
            </th>
            <th>
              <span className="text-[13px]"></span>
            </th>
          </tr>
          {/* ======================================================================================================================================================= */}
          <tr className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/5">
            <td>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                />
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                  <span>M</span>
                </div>
                <div>
                  <div className="font-bold text-white">
                    MTN Nigeria Limited
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                    sunaf4real@gmail.com
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div className="flex flex-row">
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]">
                  <span>V</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                  <span>R</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                  <span>+1</span>
                </div>
              </div>
            </td>
            <td>
              <p>Jan 10, 2023</p>
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
                  <circle cx="4" cy="4" r="3" fill="#2C9958" />
                </svg>
                <span className="text-[12px] text-white">Active</span>
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
          {/* ======================================================================================================================================================= */}
          {/* ======================================================================================================================================================= */}
          <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
            <td>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                />
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                  <span>M</span>
                </div>
                <div>
                  <div className="font-bold text-white">
                    MTN Nigeria Limited
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                    sunaf4real@gmail.com
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div className="flex flex-row">
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]">
                  <span>V</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                  <span>R</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                  <span>+1</span>
                </div>
              </div>
            </td>
            <td>
              <p>Jan 10, 2023</p>
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
                  <circle cx="4" cy="4" r="3" fill="#396587" />
                </svg>
                <span className="text-[12px] text-white">In Review</span>
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
          {/* ======================================================================================================================================================= */}
          {/* ======================================================================================================================================================= */}
          <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
            <td>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                />
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                  <span>M</span>
                </div>
                <div>
                  <div className="font-bold text-white">
                    MTN Nigeria Limited
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                    sunaf4real@gmail.com
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div className="flex flex-row">
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]">
                  <span>V</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                  <span>R</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                  <span>+1</span>
                </div>
              </div>
            </td>
            <td>
              <p>Jan 10, 2023</p>
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
                  <circle cx="4" cy="4" r="3" fill="#FFCB03" />
                </svg>
                <span className="text-[12px] text-white">30 Days Left</span>
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
          {/* ======================================================================================================================================================= */}
          {/* ======================================================================================================================================================= */}
          <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
            <td>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                />
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                  <span>M</span>
                </div>
                <div>
                  <div className="font-bold text-white">
                    MTN Nigeria Limited
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                    sunaf4real@gmail.com
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div className="flex flex-row">
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]">
                  <span>V</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                  <span>R</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                  <span>+1</span>
                </div>
              </div>
            </td>
            <td>
              <p>Jan 10, 2023</p>
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
                  <circle cx="4" cy="4" r="3" fill="#FE0302" />
                </svg>
                <span className="text-[12px] text-white">Expired</span>
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
          {/* ======================================================================================================================================================= */}
          {/* ======================================================================================================================================================= */}
          <tr className="border-b border-b-white/10 cursor-pointer bg-transparent">
            <td>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded-lg bg-black/40 cursor-pointer mr-3 outline-none appearance-none"
                />
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                  <span>M</span>
                </div>
                <div>
                  <div className="font-bold text-white">
                    MTN Nigeria Limited
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                    sunaf4real@gmail.com
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div className="flex flex-row">
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#6DCCB1] text-[#030303] text-[12px]">
                  <span>V</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#79AAD9] text-[#030303] text-[12px] ml-[-8px]">
                  <span>R</span>
                </div>
                <div className="flex justify-center items-center rounded-full w-8 h-8 border-1 border-[#030303] bg-[#CCC] text-[#030303] text-[12px] ml-[-8px]">
                  <span>+1</span>
                </div>
              </div>
            </td>
            <td>
              <p>Jan 10, 2023</p>
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
                  <circle cx="4" cy="4" r="3" fill="#FFCB03" />
                </svg>
                <span className="text-[12px] text-white">30 Days Left</span>
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
          {/* ======================================================================================================================================================= */}
  
        </tbody>
      </table>
    </section>
  );
};














export const PartnerFilterTitle = ({ title }) => {

  return (
    <div className="rounded-[5px] p-2 text-white flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/10">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-[15px]"
      >
        <g id="vuesax/linear/arrow-up">
          <g id="arrow-up">
            <path
              id="Vector"
              d="M12.0072 9.71587L12.0072 3.99302L6.28433 3.99302"
              stroke="#888888"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              id="Vector_2"
              d="M3.99302 12.0068L11.9268 4.07309"
              stroke="#888888"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </g>
      </svg>
    {title}
  </div>
  );
};
