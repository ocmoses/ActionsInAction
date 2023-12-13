"use client";
import { useState, useEffect, useRef } from "react";

import { TailSpinPreloader } from "@/app/components/Icons";
import { useStoreState } from "easy-peasy";
import { apikey } from "@/app/modules/constants";
import axios from "axios";
import RemoteEndpoints from "@/app/modules/endpoints";
import useApp from "@/hooks/useApp";
import Success from "@/app/components/toasts/Success";


export default function ShortCodeAlert({displayShortCodeAlert}) {
  return (
    <>
      <div className="border border-white/20 bg-white/10 mb-10 rounded-[7px] p-5 flex justify-between">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M15 27.5C8.1125 27.5 2.5 21.8875 2.5 15C2.5 8.1125 8.1125 2.5 15 2.5C21.8875 2.5 27.5 8.1125 27.5 15C27.5 21.8875 21.8875 27.5 15 27.5ZM14.0625 20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V13.75C15.9375 13.2375 15.5125 12.8125 15 12.8125C14.4875 12.8125 14.0625 13.2375 14.0625 13.75V20ZM16.15 9.525C16.0875 9.3625 16 9.2375 15.8875 9.1125C15.7625 9 15.625 8.9125 15.475 8.85C15.325 8.7875 15.1625 8.75 15 8.75C14.8375 8.75 14.675 8.7875 14.525 8.85C14.375 8.9125 14.2375 9 14.1125 9.1125C14 9.2375 13.9125 9.3625 13.85 9.525C13.7875 9.675 13.75 9.8375 13.75 10C13.75 10.1625 13.7875 10.325 13.85 10.475C13.9125 10.625 14 10.7625 14.1125 10.8875C14.2375 11 14.375 11.0875 14.525 11.15C14.825 11.275 15.175 11.275 15.475 11.15C15.625 11.0875 15.7625 11 15.8875 10.8875C16 10.7625 16.0875 10.625 16.15 10.475C16.2125 10.325 16.25 10.1625 16.25 10C16.25 9.8375 16.2125 9.675 16.15 9.525Z"
              fill="#E4B809"
            />
          </svg>
          <div className="flex flex-col">
            <h3 className="text-white font-mtn">
              Shortcode Confirmation Pending
            </h3>
            <p className="text-gray-500">
              You have 5 shortcode requests waiting for confirmation
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-mtn-600 text-black text-[16px] rounded-[30px] font-bold hover:bg-mtn-700" onClick={() => displayShortCodeAlert()}>
          Review
        </button>
      </div>
    </>
  );
}



function actionDate(targetDate) {
  const originalDate = new Date(targetDate);
  const formattedDate = originalDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}


export const ShortCodeFlyOut = ({
  closeShortCodeFlyOut,
  selectedRequest,
  successAction
}) => {

  const states = useStoreState((state) => state);

  const [tab, setTab] = useState({
    overview: true,
    activity: false,
  });


  const [errorMessage, setErrorMessage] = useState(null);
  const [sendAction, setSendAction] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  let [formData, setFormData] = useState({
    partner_uuid: selectedRequest.partner_uuid,
    shortcode: null,
    status: "",
  });
  
  const _approve = (code) => {
    clearError();
    formData.shortcode = code;
    formData.status = "approved";
    _action();
  };

  const _action = async (e) => {
    try {
      setSendAction(true);
      const response = await axios.post(
        RemoteEndpoints.APPROVE_SHORTCODE_ZERO_RATING,
        formData,
        {
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${states.admins.token}`,
          },
        }
      );
      console.log("response", response)
      setSuccessMessage(response.data.data.message);
      setSuccessToast(true);
    } catch (err) {
      console.log("err", err)
      setSendAction(false);
      setErrorMessage(err.response.data.data.message);
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <main
        id="GracePeriod_flyout"
        className="w-screen h-screen fixed z-[1000] top-0 left-0 bg-black/80 flex justify-right animate-[fade-in_1s_ease-in-out]"
        onClick={(e) => {
          e.target.id == "GracePeriod_flyout" && closeShortCodeFlyOut();
        }}
      >
        <div className="w-[475px] h-screen fixed right-0  top-0 bg-[#111111] animate-[slide-left_1s_ease-in-out]">
          <div className="p-5">
            <div className="h-[40px] flex flex-row justify-between ">
              <div className="flex gap-3 flex-wrap h-[40px] items-center">
                <div className="h-[40px] w-[40px] rounded-[100%] border border-white/20 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.8124 12C20.8124 12.1492 20.7531 12.2923 20.6476 12.3978C20.5421 12.5032 20.3991 12.5625 20.2499 12.5625H11.9999C11.8507 12.5625 11.7076 12.5032 11.6021 12.3978C11.4966 12.2923 11.4374 12.1492 11.4374 12C11.4374 11.8508 11.4966 11.7077 11.6021 11.6023C11.7076 11.4968 11.8507 11.4375 11.9999 11.4375H20.2499C20.3991 11.4375 20.5421 11.4968 20.6476 11.6023C20.7531 11.7077 20.8124 11.8508 20.8124 12ZM11.9999 6.56251H20.2499C20.3991 6.56251 20.5421 6.50324 20.6476 6.39775C20.7531 6.29226 20.8124 6.14919 20.8124 6.00001C20.8124 5.85082 20.7531 5.70775 20.6476 5.60226C20.5421 5.49677 20.3991 5.43751 20.2499 5.43751H11.9999C11.8507 5.43751 11.7076 5.49677 11.6021 5.60226C11.4966 5.70775 11.4374 5.85082 11.4374 6.00001C11.4374 6.14919 11.4966 6.29226 11.6021 6.39775C11.7076 6.50324 11.8507 6.56251 11.9999 6.56251ZM20.2499 17.4375H11.9999C11.8507 17.4375 11.7076 17.4968 11.6021 17.6023C11.4966 17.7077 11.4374 17.8508 11.4374 18C11.4374 18.1492 11.4966 18.2923 11.6021 18.3978C11.7076 18.5032 11.8507 18.5625 11.9999 18.5625H20.2499C20.3991 18.5625 20.5421 18.5032 20.6476 18.3978C20.7531 18.2923 20.8124 18.1492 20.8124 18C20.8124 17.8508 20.7531 17.7077 20.6476 17.6023C20.5421 17.4968 20.3991 17.4375 20.2499 17.4375ZM7.85237 4.10251L5.24987 6.70407L4.14737 5.60251C4.04074 5.50315 3.8997 5.44905 3.75398 5.45163C3.60825 5.4542 3.46921 5.51323 3.36615 5.61629C3.26309 5.71935 3.20406 5.85839 3.20149 6.00412C3.19892 6.14984 3.25301 6.29088 3.35237 6.39751L4.85237 7.89751C4.95784 8.00284 5.10081 8.06201 5.24987 8.06201C5.39893 8.06201 5.5419 8.00284 5.64737 7.89751L8.64737 4.89751C8.74673 4.79088 8.80082 4.64984 8.79825 4.50411C8.79568 4.35839 8.73665 4.21935 8.63359 4.11629C8.53053 4.01323 8.39149 3.9542 8.24576 3.95163C8.10004 3.94905 7.959 4.00315 7.85237 4.10251ZM7.85237 10.1025L5.24987 12.7041L4.14737 11.6025C4.09587 11.5472 4.03377 11.5029 3.96477 11.4722C3.89578 11.4414 3.82129 11.4249 3.74576 11.4236C3.67024 11.4222 3.59521 11.4361 3.52517 11.4644C3.45513 11.4927 3.39151 11.5348 3.33809 11.5882C3.28468 11.6416 3.24257 11.7053 3.21428 11.7753C3.18599 11.8453 3.17209 11.9204 3.17343 11.9959C3.17476 12.0714 3.19129 12.1459 3.22204 12.2149C3.25278 12.2839 3.29711 12.346 3.35237 12.3975L4.85237 13.8975C4.95784 14.0028 5.10081 14.062 5.24987 14.062C5.39893 14.062 5.5419 14.0028 5.64737 13.8975L8.64737 10.8975C8.74673 10.7909 8.80082 10.6498 8.79825 10.5041C8.79568 10.3584 8.73665 10.2193 8.63359 10.1163C8.53053 10.0132 8.39149 9.9542 8.24576 9.95162C8.10004 9.94905 7.959 10.0031 7.85237 10.1025ZM7.85237 16.1025L5.24987 18.7041L4.14737 17.6025C4.04074 17.5031 3.8997 17.4491 3.75398 17.4516C3.60825 17.4542 3.46921 17.5132 3.36615 17.6163C3.26309 17.7193 3.20406 17.8584 3.20149 18.0041C3.19892 18.1498 3.25301 18.2909 3.35237 18.3975L4.85237 19.8975C4.95784 20.0028 5.10081 20.062 5.24987 20.062C5.39893 20.062 5.5419 20.0028 5.64737 19.8975L8.64737 16.8975C8.74673 16.7909 8.80082 16.6498 8.79825 16.5041C8.79568 16.3584 8.73665 16.2193 8.63359 16.1163C8.53053 16.0132 8.39149 15.9542 8.24576 15.9516C8.10004 15.9491 7.959 16.0031 7.85237 16.1025Z" fill="white"/>
                </svg>
                </div>
                <h2 className="text-white">Confirm Shortcode Readiness?</h2>
              </div>

              <button
                className="h-[40px] w-[40px] flex justify-center items-center text-[18px] rounded-[100%] hover:bg-white/20 transition ease-in-out delay-150"
                onClick={() => closeShortCodeFlyOut()}
              >
                X
              </button>
            </div>
          </div>

          <div className="px-5 border-b border-white/20 flex gap-5">
            <button
              className={`${
                tab.overview
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.overview) {
                  setTab({
                    ...tab,
                    overview: true,
                    activity: false,
                  });
                }
              }}
            >
              Overview
            </button>

            <button
              className={`${
                tab.activity
                  ? "border-mtn-500 text-white"
                  : "border-transparent text-gray-400"
              }
              py-2 border-b text-[14px] hover:border-mtn-500 hover:text-white transition ease-in-out delay-150`}
              onClick={() => {
                if (!tab.activity) {
                  setTab({
                    ...tab,
                    overview: false,
                    activity: true,
                  });
                }
              }}
            >
              Activity
            </button>
          </div>

          <div className="p-5 pb-[200px] flex flex-col gap-10 h-[100%] w-[100%] overflow-auto">
                          {errorMessage && (
                            <p className="text-red-500 text-sm font-italic">
                              {errorMessage}
                            </p>
                          )}

          {selectedRequest.short_codes.map((code, index) => (

            <div className="flex flex-row gap-3" key={index}>
              <div className="h-[50px] w-[50px] bg-white/10 rounded-[5px] flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.76998 6.51166L1.78381 9.00001L4.76998 11.4884C4.81305 11.5237 4.8487 11.5671 4.87489 11.6163C4.90108 11.6654 4.91727 11.7193 4.92255 11.7747C4.92782 11.8301 4.92207 11.8861 4.90562 11.9393C4.88918 11.9925 4.86236 12.0419 4.82672 12.0847C4.79108 12.1275 4.74732 12.1628 4.69797 12.1886C4.64862 12.2144 4.59465 12.2301 4.53918 12.235C4.4837 12.2398 4.42782 12.2336 4.37475 12.2167C4.32168 12.1998 4.27248 12.1726 4.22998 12.1367L0.854979 9.32416C0.807452 9.28456 0.769212 9.235 0.74297 9.17899C0.716728 9.12297 0.703125 9.06187 0.703125 9.00001C0.703125 8.93816 0.716728 8.87706 0.74297 8.82104C0.769212 8.76503 0.807452 8.71547 0.854979 8.67587L4.22998 5.86337C4.31607 5.79282 4.42655 5.75915 4.53735 5.7697C4.64816 5.78024 4.7503 5.83414 4.82154 5.91966C4.89278 6.00519 4.92733 6.11539 4.91767 6.22628C4.90801 6.33716 4.85493 6.43974 4.76998 6.51166ZM17.145 8.67587L13.77 5.86337C13.7275 5.82739 13.6783 5.80018 13.6252 5.78331C13.5721 5.76644 13.5163 5.76024 13.4608 5.76507C13.4053 5.7699 13.3513 5.78567 13.302 5.81146C13.2526 5.83726 13.2089 5.87256 13.1732 5.91535C13.1376 5.95813 13.1108 6.00755 13.0943 6.06075C13.0779 6.11395 13.0721 6.16989 13.0774 6.22532C13.0827 6.28076 13.0989 6.3346 13.1251 6.38374C13.1513 6.43289 13.1869 6.47636 13.23 6.51166L16.2162 9.00001L13.23 11.4884C13.1869 11.5237 13.1513 11.5671 13.1251 11.6163C13.0989 11.6654 13.0827 11.7193 13.0774 11.7747C13.0721 11.8301 13.0779 11.8861 13.0943 11.9393C13.1108 11.9925 13.1376 12.0419 13.1732 12.0847C13.2089 12.1275 13.2526 12.1628 13.302 12.1886C13.3513 12.2144 13.4053 12.2301 13.4608 12.235C13.5163 12.2398 13.5721 12.2336 13.6252 12.2167C13.6783 12.1998 13.7275 12.1726 13.77 12.1367L17.145 9.32416C17.1925 9.28456 17.2307 9.235 17.257 9.17899C17.2832 9.12297 17.2968 9.06187 17.2968 9.00001C17.2968 8.93816 17.2832 8.87706 17.257 8.82104C17.2307 8.76503 17.1925 8.71547 17.145 8.67587ZM11.3941 2.41806C11.342 2.39916 11.2866 2.39073 11.2311 2.39326C11.1757 2.39579 11.1213 2.40923 11.0711 2.43281C11.0209 2.45639 10.9758 2.48964 10.9385 2.53067C10.9011 2.57169 10.8722 2.61968 10.8534 2.67189L6.35342 15.0469C6.31643 15.1521 6.32259 15.2676 6.37055 15.3683C6.41851 15.469 6.50436 15.5465 6.60935 15.5841C6.6545 15.6003 6.70203 15.6088 6.74998 15.6094C6.8366 15.6094 6.92112 15.5828 6.99207 15.5331C7.06301 15.4834 7.11695 15.4131 7.14654 15.3317L11.6465 2.95666C11.6655 2.90458 11.674 2.84928 11.6715 2.79392C11.6691 2.73856 11.6558 2.68423 11.6323 2.63401C11.6089 2.5838 11.5758 2.5387 11.5349 2.50129C11.494 2.46387 11.4462 2.43487 11.3941 2.41595V2.41806Z" fill="#8E8E8E"/>
              </svg>
              </div>

              <div className="flex flex-col gap-2  w-[100%]">
                <h3 className="text-white text-[14px]">Shortcode {index + 1}</h3>
                <div className="rounded-[3px] p-2  text-gray-400 text-[14px] border border-white/10 w-[100%] flex flex-row justify-between ">
                  <div className="flex gap-3 min-h-[20px] flex-wrap">
                    <div className="h-[20px] w-[20px flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clip-path="url(#clip0_10124_3503)">
                        <path d="M6.12549 9.40637C6.38391 9.40637 6.59424 9.19604 6.59424 8.93762C6.59424 8.6792 6.38391 8.46887 6.12549 8.46887C5.86707 8.46887 5.65674 8.6792 5.65674 8.93762C5.65674 9.19604 5.86707 9.40637 6.12549 9.40637Z" fill="#999999"/>
                        <path d="M6.12549 5.65637C6.38391 5.65637 6.59424 5.44604 6.59424 5.18762C6.59424 4.9292 6.38391 4.71887 6.12549 4.71887C5.86707 4.71887 5.65674 4.9292 5.65674 5.18762C5.65674 5.44604 5.86707 5.65637 6.12549 5.65637Z" fill="#666666"/>
                        <path d="M9.87549 5.65637C10.1339 5.65637 10.3442 5.44604 10.3442 5.18762C10.3442 4.9292 10.1339 4.71887 9.87549 4.71887C9.61707 4.71887 9.40674 4.9292 9.40674 5.18762C9.40674 5.44604 9.61707 5.65637 9.87549 5.65637Z" fill="#666666"/>
                        <path d="M9.87549 9.40637C10.1339 9.40637 10.3442 9.19604 10.3442 8.93762C10.3442 8.6792 10.1339 8.46887 9.87549 8.46887C9.61707 8.46887 9.40674 8.6792 9.40674 8.93762C9.40674 9.19604 9.61707 9.40637 9.87549 9.40637Z" fill="#666666"/>
                        <path d="M2.84424 11.3126H13.1567V2.81262H2.84424V11.3126ZM8.46924 5.18762C8.46924 4.41223 9.1001 3.78137 9.87549 3.78137C10.6509 3.78137 11.2817 4.41223 11.2817 5.18762C11.2817 5.79871 10.8899 6.3197 10.3442 6.51331V7.61194C10.8899 7.80554 11.2817 8.32654 11.2817 8.93762C11.2817 9.71301 10.6509 10.3439 9.87549 10.3439C9.1001 10.3439 8.46924 9.71301 8.46924 8.93762C8.46924 8.32654 8.86108 7.80554 9.40674 7.61194V6.51331C8.86108 6.3197 8.46924 5.79871 8.46924 5.18762ZM6.12549 3.78137C6.90088 3.78137 7.53174 4.41223 7.53174 5.18762C7.53174 5.96301 6.90088 6.59387 6.12549 6.59387C5.3501 6.59387 4.71924 5.96301 4.71924 5.18762C4.71924 4.41223 5.3501 3.78137 6.12549 3.78137ZM6.12549 7.53137C6.90088 7.53137 7.53174 8.16223 7.53174 8.93762C7.53174 9.71301 6.90088 10.3439 6.12549 10.3439C5.3501 10.3439 4.71924 9.71301 4.71924 8.93762C4.71924 8.16223 5.3501 7.53137 6.12549 7.53137Z" fill="#666666"/>
                        <path d="M2.84424 14.5939C2.84424 15.3693 3.4751 16.0001 4.25049 16.0001H11.7505C12.5259 16.0001 13.1567 15.3693 13.1567 14.5939V12.2501H2.84424V14.5939ZM7.06299 13.6564H8.93799V14.5939H7.06299V13.6564Z" fill="#666666"/>
                        <path d="M11.7505 0.00012207H4.25049C3.4751 0.00012207 2.84424 0.630981 2.84424 1.40637V1.87512H13.1567V1.40637C13.1567 0.630981 12.5259 0.00012207 11.7505 0.00012207Z" fill="#666666"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_10124_3503">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    </div>
                    <p className="text-white text-[10px]">
                      {code}
                    </p>
                  </div>
                  
                </div>
                {selectedRequest.status != "approved" && (
                        <div className="flex flex-row gap-3 w-[100%]">
                          {sendAction ? (
                            <TailSpinPreloader
                              width={40}
                              height={40}
                              fill="#efb703"
                            />
                          ) : (
                            <button
                              className="flex text-[12px] leading-[20px] gap-2 text-white hover:text-gray-400"
                              title="Approve"
                              onClick={() => _approve(code)}
                              
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.8313 5.95628L7.83128 15.9563C7.74339 16.0441 7.62425 16.0934 7.50003 16.0934C7.37581 16.0934 7.25667 16.0441 7.16878 15.9563L2.79378 11.5813C2.71098 11.4924 2.6659 11.3749 2.66804 11.2535C2.67018 11.132 2.71938 11.0161 2.80526 10.9303C2.89115 10.8444 3.00701 10.7952 3.12845 10.793C3.24989 10.7909 3.36742 10.836 3.45628 10.9188L7.50003 14.9617L17.1688 5.29378C17.2576 5.21098 17.3752 5.1659 17.4966 5.16804C17.618 5.17018 17.7339 5.21938 17.8198 5.30526C17.9057 5.39115 17.9549 5.50701 17.957 5.62845C17.9592 5.74989 17.9141 5.86742 17.8313 5.95628Z"
                                  fill="#4DCD97"
                                />
                              </svg>
                              <span>Approve</span>
                            </button>
                          )}
                        </div>
                  )}
                

   
              </div>
            </div>
          ))} 



                {selectedRequest.status === "approved" && (
                  <div className="flex flex-row gap-3 w-[100%]">
                    <p className="text-[10px] text-gray-400 w-[100%]">
                      <span className="text-[#2C9958]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="float-left mt-1 mr-1"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.74875 10.7475C8.50948 10.7475 10.7475 8.50948 10.7475 5.74875C10.7475 2.98802 8.50948 0.75 5.74875 0.75C2.98802 0.75 0.75 2.98802 0.75 5.74875C0.75 8.50948 2.98802 10.7475 5.74875 10.7475ZM8.58247 3.85827C8.76383 4.04292 8.76115 4.33963 8.5765 4.52099L5.39548 7.6452C5.21317 7.82425 4.92103 7.82425 4.73873 7.6452L2.921 5.85994C2.73635 5.67858 2.73367 5.38187 2.91503 5.19722C3.09639 5.01256 3.3931 5.00989 3.57775 5.19125L5.0671 6.654L7.91975 3.8523C8.1044 3.67094 8.40111 3.67361 8.58247 3.85827Z"
                            fill="#2C9958"
                          />
                        </svg>
                        Approved
                      </span>{" "}
                      on {actionDate(selectedRequest.approved_on)}
                    </p>
                  </div>
                )}

              
          </div>
        </div>
      </main>


      <Success
        message={successMessage}
        visible={successToast}
        action={successAction}
      />    
    </>
  );
};
