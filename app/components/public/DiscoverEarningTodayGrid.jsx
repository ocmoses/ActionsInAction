export default function DiscoverEarningTodayGrid({
  image,
  text,
  subtext,
  span,
}) {
  return (
    <>
      <div
        className={`flex flex-col w-full sm:col-span-${span} md:col-span-${span} justify-start items-start gap-[24px] px-[18px] py-[15px]`}
      >
        {image}
        <div>
          <p className="font-normal text-[20px] leading-[21px] text-white mb-2">
            {text}
          </p>
          <p className="font-normal text-[14px] leading-[18px] text-white/70">
            {subtext}
          </p>
        </div>
      </div>
    </>
  )
}
