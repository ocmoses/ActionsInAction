"use client";
import React, { useEffect } from "react";

export default function FilterTag({message, action}){

  return (<div className="border-1 border-white/20 rounded-lg h-full flex items-center text-xs text-gray-400 mr-2 px-2">
              {message} &nbsp; <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                  strokeWidth={1.5} stroke="gray" className="w-4 h-4 hover:w-5 hover:h-5"
                                  onClick={() => action()}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                               </svg>

          </div>); 
};


export const PartnerFilterTitle = ({ title, action }) => {
  return (
    <div
      onClick={action}
      className="rounded-[5px] p-2 text-white flex w-full items-center cursor-pointer transition ease-in-out delay-150 hover:bg-white/10"
    >
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
              strokeWidth="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M3.99302 12.0068L11.9268 4.07309"
              stroke="#888888"
              strokeWidth="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
      {title}
    </div>
  );
};

export const PartnerFilterCheck = ({
  title,
  summary,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className="flex ">
      <div className="w-10 flex mr-1">
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          className="h-6 w-6 rounded-lg bg-black/40"
        />
      </div>
      <div>
        <span className="text-white">{title}</span>
        <br />
        <span className="text-gray-400 text-[13px]">{summary}</span>
      </div>
    </div>
  );
};



