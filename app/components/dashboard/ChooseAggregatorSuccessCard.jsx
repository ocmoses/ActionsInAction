import Image from "next/image";

export default function ChooseAggregatorSuccessCard({ aggregator }) {
  return (
    <>
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
                  src="/assets/icons/mark.png"
                  alt=""
                  width={10}
                  height={10}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center sm:items-start h-full">
              <span className=" text-lg text-white">
                Your request was accepted
              </span>
              <span className="text-[#999999] text-[12px] text-center md:text-left">
                The aggregator, {aggregator} accepted your request. We’ll notify
                you once they complete your onboarding requirements.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
