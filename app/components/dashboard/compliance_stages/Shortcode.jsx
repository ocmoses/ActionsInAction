import moment from "moment"

export default function Nlrclicense({ category, stage }) {
  return (
    category && (
      <>
        {category.shortcodes.length > 0 &&
          category.shortcodes.map((shtcd) => (
            <div key={shtcd.uuid} className="flex items-start gap-3">
              <div className="text-[#999999] w-18 h-18">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-4">
                {/* SHORTCODES */}
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">Shortcodes</span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode?.shortcodes?.length > 0 &&
                      shtcd.shortcode?.shortcodes?.join(", ")}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">
                    Shortcode Document
                  </span>
                  <span
                    onClick={() =>
                      previewFiles(
                        shtcd.shortcode?.shortcode_doc?.file_path ?? ""
                      )
                    }
                    className="text-white text-[14px] font-bold cursor-pointer"
                  >
                    {shtcd.shortcode?.shortcode_doc?.file_name}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">Issue date</span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode?.shortcode_issue_date &&
                      moment(shtcd.shortcode?.shortcode_issue_date).format(
                        "DD / MMM / YYYY"
                      )}
                  </span>
                </div>
                <div className="flex flex-col gap-0 mb-6">
                  <span className="text-[12px] text-[#999999]">
                    Expiry date
                  </span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode?.shortcode_expiry_date &&
                      moment(shtcd.shortcode?.shortcode_expiry_date).format(
                        "DD / MMM / YYYY"
                      )}
                  </span>
                </div>
                {/* PRICING */}
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">Shortcodes</span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode_pricing?.pricing_shortcodes?.length > 0 &&
                      shtcd.shortcode?.shortcodes?.join(", ")}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">
                    Shortcode Document
                  </span>
                  <span
                    onClick={() =>
                      previewFiles(
                        shtcd.shortcode?.shortcode_doc?.file_path ?? ""
                      )
                    }
                    className="text-white text-[14px] font-bold cursor-pointer"
                  >
                    {shtcd.shortcode?.shortcode_doc?.file_name}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">Issue date</span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode?.shortcode_issue_date &&
                      moment(shtcd.shortcode?.shortcode_issue_date).format(
                        "DD / MMM / YYYY"
                      )}
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-[12px] text-[#999999]">
                    Expiry date
                  </span>
                  <span className="text-white text-[14px] font-bold">
                    {shtcd.shortcode?.shortcode_expiry_date &&
                      moment(shtcd.shortcode?.shortcode_expiry_date).format(
                        "DD / MMM / YYYY"
                      )}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </>
    )
  )
}
