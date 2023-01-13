import { ArrowRightCircle, TailSpinPreloader } from '@/app/components/Icons'
import { useOnboardingContext } from '@/hooks/useOnboardingContext'
import { outputDate } from '@/app/modules/utilities'
import ReviewTitle from './ReviewTitle'
import Button from '@/app/components/form/Button'
import Link from 'next/link'

export default function ReviewBox() {
  const {
    COUNTRIES,
    STATES,
    BANKS,
    partnerInfo,
    categories: categoryData
  } = useOnboardingContext()
  const { allcategories } = categoryData
  return (
    <>
      {/* Company info */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle
            title="Company information"
            href="/profile/companydetail"
          />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Company name
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_name}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Company type
                  </div>
                  <div className="flex justify-between gap-3">
                    <div className="text-white text-[14px]">
                      {typeof partnerInfo.category_id !== 'string' &&
                        partnerInfo.category_id?.length > 0 &&
                        allcategories &&
                        partnerInfo.category_id.map((cid) => (
                          <div key={cid}>
                            {allcategories[cid]?.category_name}
                          </div>
                        ))}
                    </div>
                    {typeof partnerInfo.category_id !== 'string' &&
                      partnerInfo.category_id?.length > 0 &&
                      allcategories && (
                        <Link
                          href="/profile/category"
                          className="text-white/25  hover:text-white/60"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Country
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.country &&
                      COUNTRIES.find((c) => c.value === partnerInfo.country)
                        ?.title}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Address
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_address}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    City
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_city}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    State
                  </div>
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
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Postal codes
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.company_postcode}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden"></div>
                  <div className="text-white text-[14px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Compliance detail */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle title="Compliance details" href="/profile/compliance" />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    RC. number
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.rc_no}{' '}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Tax identification number
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.tin_no}{' '}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    CAC registration cert.
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.rc_doc}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    MEMART certificate
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.memart_doc}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    TIN document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.tin_doc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NCC VAS Licence */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle title="NCC VAS Licence" href="/profile/ncclicense" />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    VAS License ID
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.vas_license_id}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Issuing date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.ncc_issue_date)}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Expiry date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.ncc_expiry_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    VAS document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.ncc_doc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NLRC Licence */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle title="NLRC" href="/profile/nlrclicense" />
          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    NLRC License number
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.nlrc_license_id}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Issuing date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.nlrc_issue_date)}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Expiry date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.nlrc_expiry_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    NLRC document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.nlrc_doc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Shortcode */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle title="Shortcode" href="/profile/shortcode" />

          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Shortcode
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.shortcode}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Shortcode Issuing date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.shortcode_issue_date)}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Shortcode Expiry date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.shortcode_expiry_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    NCC pricing approval Issuing date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.shortcode_price_issue_date)}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    NCC pricing approval Expiry date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.shortcode_price_expiry_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Shortcode document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.shortcode_doc}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    NCC pricing approval document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.shortcode_approval_doc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Indemnity Licence */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle
            title="Professional indemnity insurance"
            href="/profile/indemnity"
          />
          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Indemnity issue number
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.indemnity_no}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Issuing date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.indemnity_issue_date)}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Expiry date
                  </div>
                  <div className="text-white text-[14px]">
                    {outputDate(partnerInfo.indemnity_expiry_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Indemnity insurance document
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.indemnity_doc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Account info */}
      <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
        <div className="md:grid md:grid-cols-4 gap-12">
          <ReviewTitle title="Audited accounts" href="/profile/accountinfo" />
          <div className="md:col-span-3 divide-y divide-slate-400/25">
            <div className="pb-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Bank account name
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.account_name}{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                <div className="mb-2 sm:mb-0 sm:col-span-2">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Account number
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.account_no}{' '}
                  </div>
                </div>

                <div className="mb-2 sm:mb-0 sm:col-span-3">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Bank name
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.bank &&
                      BANKS.find((bank) => bank.code === partnerInfo.bank)
                        ?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Audited account 1
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.audited_account_1}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Audited account 2
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.audited_account_2}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="grid">
                <div className="">
                  <div className="text-[#999999] text-[12px] text-ellipsis overflow-hidden">
                    Audited account 3
                  </div>
                  <div className="text-white text-[14px]">
                    {partnerInfo.audited_account_3}
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
        <Button
          href="/profile/complete/application"
          label="Submit application"
        />
      </div>
    </>
  )
}
