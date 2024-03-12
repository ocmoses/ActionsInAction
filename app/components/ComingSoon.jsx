import React from "react";

function ComingSoon() {
  return (
    <div className="flex flex-row border border-gray-400 rounded-full p-4 mb-6 items-center gap-2 cursor-not-allowed">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="4" r="3.5" fill="#FFCB03" />
      </svg>

      <p className="text-mtn text-[14px] font-thin text-center">Coming soon</p>
    </div>
  );
}

export default ComingSoon;
