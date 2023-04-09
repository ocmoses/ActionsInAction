export default function DiscoverComplianceList({ image, text }) {
  return (
    <>
      <div className="flex items-center gap-[24px] px-[18px] py-[15px]">
        {image}
        <p className="font-normal text-[16px] leading-[18px] text-white/60">
          {text}
        </p>
      </div>
    </>
  )
}
