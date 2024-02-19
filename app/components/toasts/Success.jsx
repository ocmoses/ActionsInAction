import React from "react";
import { useEffect, useState } from "react";

export default function Success({ visible = false, message, action = null }) {
  useEffect(() => {
    if (visible) {
      if (typeof action === "function") {
        action();
      }
    }
  }, [visible]);

  return (
    <div
      className={`fixed bottom-0 left-0 z-[1000] w-screen h-0 justify-center items-end ${
        visible ? "flex" : "hidden"
      }`}
    >
      <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clip-rule="evenodd"
          />
        </svg>
        &nbsp;&nbsp; {message}
      </div>
    </div>
  );
}









export const NewSuccess = ({ message, alert }) => {
  return (
    <>
      {alert ? (
        <div
          className={`fixed bottom-0 left-0 z-[1000] w-screen h-0 justify-center items-end flex`}
        >
          <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4 border border-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>
            &nbsp;&nbsp; {message}
          </div>
        </div>
      ) : (
        <div
          className={`fixed bottom-0 left-0 z-[1000] w-screen h-0 justify-center items-end flex`}
        >
          <div className="min-w-48 rounded-xl bg-gray-800 text-white p-4 mb-12 flex spacing-x-4 border border-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            &nbsp;&nbsp; {message}
          </div>
        </div>
      )}
    </>
  );
};
