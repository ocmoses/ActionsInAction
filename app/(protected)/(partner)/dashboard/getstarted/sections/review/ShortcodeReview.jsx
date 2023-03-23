import { outputDate } from "@/app/modules/utilities"
import Image from "next/image"
export default function ShortcodeReview({ shortcode, PreviewFile }) {
  return shortcode.map((sc, i) => {
    return (
      <div
        key={sc.shortcode_uuid}
        className={`relative z-0 w-full group ${
          shortcode.length > 0 && "mb-4"
        } ${
          i < shortcode.length - 1
            ? "border-b border-b-dashed border-b-white/20"
            : ""
        }`}
      >
        {/* <div className="border-1 border-dashed w-full rounded-[11px] bg-[#030303] border-[#333333] py-[24px] px-[16px]"> */}
        <div className="pb-3">
          <div className="grid">
            <div className="">
              <div className="text-[#999999] text-[12px] truncate">
                Shortcode document
              </div>
              <div
                onClick={() =>
                  PreviewFile(sc.shortcode?.shortcode_doc?.file_path ?? null)
                }
                className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
              >
                <Image
                  src="/assets/icons/fileicon.png"
                  alt=""
                  width={14}
                  height={16}
                />
                {sc.shortcode?.shortcode_doc?.file_name}
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="grid">
            <div className="">
              <div className="text-[#999999] text-[12px] truncate">
                Shortcode
              </div>
              <div className="text-white text-[14px]">
                {sc.shortcode?.shortcodes?.join(", ")}
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
            <div className="mb-2 sm:mb-0 sm:col-span-2">
              <div className="text-[#999999] text-[12px] truncate">
                Shortcode Issuing date
              </div>
              <div className="text-white text-[14px]">
                {outputDate(sc.shortcode?.shortcode_issue_date)}
              </div>
            </div>

            <div className="mb-2 sm:mb-0 sm:col-span-3">
              <div className="text-[#999999] text-[12px] truncate">
                Shortcode Expiry date
              </div>
              <div className="text-white text-[14px]">
                {outputDate(sc.shortcode?.shortcode_expiry_date)}
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="text-[#999999] text-[12px] truncate">
            NCC pricing approval document
          </div>
          <div
            onClick={() =>
              PreviewFile(sc.shortcode_pricing?.pricing_doc?.file_path ?? null)
            }
            className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
          >
            <Image
              src="/assets/icons/fileicon.png"
              alt=""
              width={14}
              height={16}
            />
            {sc.shortcode_pricing?.pricing_doc?.file_name}
          </div>
        </div>
        <div className="pb-3">
          <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
            <div className="mb-2 sm:mb-0 sm:col-span-2">
              <div className="text-[#999999] text-[12px] truncate">
                NCC pricing approval Issuing date
              </div>
              <div className="text-white text-[14px]">
                {outputDate(sc.shortcode_pricing?.pricing_issue_date)}
              </div>
            </div>

            <div className="mb-2 sm:mb-0 sm:col-span-3">
              <div className="text-[#999999] text-[12px] truncate">
                NCC pricing approval Expiry date
              </div>
              <div className="text-white text-[14px]">
                {outputDate(sc.shortcode_pricing?.pricing_expiry_date)}
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="grid">
            <div className="">
              <div className="text-[#999999] text-[12px] truncate">
                Shortcode with pricing approval
              </div>
              <div className="text-white text-[14px]">
                {sc.shortcode_pricing?.pricing_shortcodes?.join(", ")}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  })
}
