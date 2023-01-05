export default function ReviewBox() {
  return (
    <div className="bg-[#111111] rounded-[8px] p-[24px]">
      <div className="grid grid-cols-4 gap-12">
        <div className="text-[#999999]">Company information</div>

        <div className="col-span-3">
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              <div className="text-[#999999] text-[12px]">Company name</div>
              <div className="text-white text-[14px]">Hostnaija.com</div>
            </div>

            <div className="col-span-3">
              <div className="text-[#999999] text-[12px]">Company type</div>
              <div className="text-white text-[14px]">Aggregator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
