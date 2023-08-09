
import React from 'react'
import {formatNumber} from "@/app/modules/utilities";
import { IncreaseArrow, DecreaseArrow } from "@/app/components/Icons";

export default function PartnerStatisticsReport({title,count,percentage,rate}){

  return(

    <div id="statistics" className=" w-[22%]  bg-white/10 min-h-[150px] min-w-[280px]">
    <div className="px-5 py-5 flex  flex-col">
        <div className="mb-[15px]">
        {title}
        </div>
        <h2 className="text-[30px] text-white font-mtn font-semibold">
        {formatNumber(parseInt(count))}
        </h2>
        <div>
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

// export const DocumentationH3Title = ({text}) => {
//   return(
//     <h3 className="border-white/10 border-y p-2 m-4">
//       {text}
//     </h3>
//   )
// }


