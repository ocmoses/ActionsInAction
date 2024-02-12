import Image from "next/image";

export default function ChooseAggregatorCard({
  aggregator,
  action,
  dismissAction,
}) {
  return (
    <div
      className={`flex flex-col gap-4 max-w-[837px] mt-16 w3-animate-opacity`}
    >
      <div
        onClick={() => {}}
        className={`flex flex-col cursor-pointer items-center md:flex-row justify-between gap-6 cursor bg-[#111111] p-[24px] border border-white/10 rounded-xl`}
      >
        <div className="flex flex-col justify-start sm:flex-row sm:justify-center gap-6 items-start">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-[20px] h-[20px] text-[#FFCB03] rounded-full bg-white/10">
              <Image
                src="/assets/icons/info-circle.png"
                alt=""
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start h-full">
            <span className=" text-lg text-white">Choose aggregator</span>
            <span className="text-[#999999] text-[12px] text-center md:text-left">
              {aggregator} rejected your request. Please choose another
              aggregator from the list of registered partners.
            </span>
            <br></br>
            <div className="flex space-x-4 justify-end">
              <button
                className=" text-black bg-mtn w-200 hover:bg-mtn-800 p-4 py-2 rounded-full"
                onClick={action}
              >
                Choose aggregator
              </button>
              <button
                className="border-1 border-gray-200 w-200 text-white hover:bg-gray-800 p-4 py-2 rounded-full"
                onClick={dismissAction}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
