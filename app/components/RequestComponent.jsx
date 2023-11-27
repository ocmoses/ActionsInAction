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
