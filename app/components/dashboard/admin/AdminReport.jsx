
import React, {useEffect }from 'react'
import {formatNumber} from "@/app/modules/utilities";
import { IncreaseArrow, DecreaseArrow } from "@/app/components/Icons";
import Chart from "chart.js";

export default function PartnerStatisticsReport({title,count,percentage,rate}){

  return(

    <div id="statistics" className=" w-[24%]  bg-white/10 min-h-[150px] min-w-[200px] rounded-lg animate-[slide-down-fade_1s_ease-in-out]">
      <div className="px-5 py-5 flex  flex-col">
          <div className="mb-[15px] text-gray-400">
          {title}
          </div>
          <h2 className="text-[30px] text-white font-mtn font-semibold">
          {formatNumber(parseInt(count))}
          </h2>
          <div className='text-gray-400'>
            {
              rate == 'UP' ? 
              <span className="text-green-400"><IncreaseArrow iconClass="float-left mt-[5px] mr-[5px]"/> {percentage}%</span>  
              :
              <span className="text-rose-400"><DecreaseArrow iconClass="float-left mt-[5px] mr-[5px]"/> {percentage}%</span>
            }
            &nbsp; Past Month      
        
          </div>

      </div>
    </div>

  )
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
            label: 'New Partner',
            backgroundColor: "#8E5F05",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: true,
            barThickness: 8,
            borderRadius: '10', // Added borderRadius here
          },
          {
            label: 'Existing Partner',
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

  return(
    <div className="min-h-[250px]">
    <canvas id="bar-chart"></canvas>
    </div>
  )
}


