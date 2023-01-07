import { ArrowRightCircle, TailSpinPreloader } from "@/app/components/Icons"
import { useOnboardingContext } from "@/hooks/useOnboardingContext"
import Image from "next/image"
import Link from "next/link"
import ReviewTitle from "./ReviewTitle"
export default function UpdateReviewBox() {
  const {
    COUNTRIES,
    STATES,
    partnerInfo,
    categories: categoryData,
  } = useOnboardingContext()
  const { allcategories } = categoryData
  return (
    <>
      {/* Company info */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle
            title="Company information"
            href="/profile/update/companyinfo"
          />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px]">Company name</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_name}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px]">Company type</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.category_id.length > 0 &&
                      allcategories &&
                      partnerInfo.category_id.map((cid) => (
                        <div key={cid}>{allcategories[cid]?.category_name}</div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px]">Country</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.country &&
                      COUNTRIES.find((c) => c.value === partnerInfo.country)
                        ?.title}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px]">Address</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_address}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px]">City</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_city}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px]">State</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_state &&
                      STATES.find(
                        (c) =>
                          c.country_code === partnerInfo.country &&
                          c.state_code === partnerInfo.company_state
                      )?.state_name}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px]">City</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_postcode}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px]"></div>
                  <div className="text-white text-[14px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact person */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle
            title="Contact person"
            href="/profile/update/contactperson"
          />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px]">First name</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.first_name}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px]">Last name</div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.last_name}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px]">
                    Email address
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px]">Telephone</div>
                  <div className="text-white text-[14px] flex items-center justify-start gap-2">
                    <span className="">
                      {partnerInfo.country && (
                        <Image
                          src={`/assets/flags/${partnerInfo.country.toLowerCase()}.svg`}
                          alt={partnerInfo.country}
                          width={36}
                          height={36}
                          priority
                        />
                      )}
                    </span>
                    <span className="text-white">
                      {partnerInfo.country &&
                        COUNTRIES.find((c) => c.value === partnerInfo.country)
                          ?.code}
                    </span>
                    <span> {partnerInfo.telephone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[400px] mx-auto text-center mt-10 text-[#666666] text-[12px]">
        By clicking submit application, I/We confirm that the information
        provided are accurate and truthful.
      </div>
      <div className="mt-3 pb-12 flex justify-center items-start w-full">
        <Link
          href=""
          className="rounded-full flex justify-between items-center text-black bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-3"
        >
          Finish setup <ArrowRightCircle iconClass="w-6 h-6 ml-4" />
        </Link>
      </div>
    </>
  )
}
