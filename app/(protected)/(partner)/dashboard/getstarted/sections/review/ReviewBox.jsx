import { outputDate, scrollToTop } from "@/app/modules/utilities"
import ReviewTitle from "@/app/components/dashboard/ReviewTitle"
import Button from "@/app/components/form/Button"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import useProcessing from "@/hooks/useProcessing"
import { COUNTRIES } from "@/app/modules/countries"
import { STATES } from "@/app/modules/states"
import Image from "next/image"
import ShortcodeReview from "./ShortcodeReview"
import FilePreviewModal from "@/app/components/FilePreviewModal"
import { useState } from "react"

export default function ReviewBox() {
  const { setForm, moveToNextForm } = useProcessing()
  const { category, registerPartner } = usePartners()
  const [{ errors, setError, clearErrors }] = useErrors()
  const showSection = (section) =>
    category?.validation &&
    category.validation[section] &&
    (category.validation[section] === "r" ||
      category.validation[section] === "o")

  const [showModal, setShowModal] = useState(false)
  const [filePath, setFilePath] = useState("")
  const saveForm = async () => {
    clearErrors()
    console.log({ category })
    const result = await registerPartner("complete_registration", {
      partner_uuid: category.partner_uuid,
      category_uuid: category.category_uuid,
      user_uuid: category.user_uuid,
      action_completed: "category_registration",
    })

    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) return setError({ review: result.error })
    }
    setForm("complete")
  }
  const PreviewFile = (url) => {
    if (url) {
      setFilePath(url)
      setShowModal(true)
    }
  }

  function handleCloseModal() {
    setFilePath("")
    setShowModal(false)
  }

  const moveTo = (section) => {
    moveToNextForm([section, true])
    scrollToTop("onboardinglayout")
  }
  return (
    <>
      {showModal && (
        <FilePreviewModal filePath={filePath} closeModal={handleCloseModal} />
      )}

      {errors && (
        <div className="mb-6">
          <FormErrors error={errors["compliance"]} />{" "}
        </div>
      )}

      {/* Company info */}
      {showSection("companydetail") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="Company information"
              onClick={() => moveTo("companydetail")}
            />

            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Company name
                    </div>
                    <div className="text-white text-[14px]">
                      {category.company_name}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Company type
                    </div>
                    <div className="flex justify-between gap-3">
                      <div className="text-white text-[14px]">
                        {category.category_name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Country
                    </div>
                    <div className="text-white text-[14px]">
                      {category.country &&
                        COUNTRIES.find((c) => c.value === category.country)
                          ?.title}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Address
                    </div>
                    <div className="text-white text-[14px]">
                      {category.company_address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      City
                    </div>
                    <div className="text-white text-[14px]">
                      {category.company_city}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      State
                    </div>
                    <div className="text-white text-[14px]">
                      {category.company_state &&
                        STATES.find(
                          (c) =>
                            c.country_code === category.country &&
                            c.state_code === category.company_state
                        )?.state_name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Postal codes
                    </div>
                    <div className="text-white text-[14px]">
                      {category.company_postcode}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate"></div>
                    <div className="text-white text-[14px]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Compliance detail */}
      {showSection("compliance") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="Compliance details"
              onClick={() => moveTo("compliance")}
            />

            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      RC. number
                    </div>
                    <div className="text-white text-[14px]">
                      {category.rc_no}{" "}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Tax identification number
                    </div>
                    <div className="text-white text-[14px]">
                      {category.tin_no}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      CAC registration cert.
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.cac_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.cac_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      MEMART certificate
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.memart_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.memart_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      TIN document
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.tin_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.tin_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* NCC VAS Licence */}
      {showSection("ncclicense") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="NCC VAS Licence"
              onClick={() => moveTo("ncclicense")}
            />

            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      VAS License ID
                    </div>
                    <div className="text-white text-[14px]">
                      {category.vas_license_id}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Issuing date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.ncc_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.ncc_expiry_date)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      VAS document
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.ncc_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.ncc_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* NLRC Licence */}
      {showSection("nlrclicense") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle title="NLRC" onClick={() => moveTo("nlrclicense")} />
            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      NLRC License number
                    </div>
                    <div className="text-white text-[14px]">
                      {category.nlrc_license_id}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Issuing date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.nlrc_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.nlrc_expiry_date)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      NLRC document
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.nlrc_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.nlrc_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Shortcode */}
      {showSection("shortcode") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="Shortcode"
              onClick={() => moveTo("shortcode")}
            />
            {category.shortcodes?.length > 0 && (
              <div className="md:col-span-3 divide-y divide-slate-400/25">
                <ShortcodeReview
                  shortcode={category.shortcodes}
                  PreviewFile={PreviewFile}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Indemnity Licence */}
      {showSection("indemnity") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="Professional indemnity insurance"
              onClick={() => moveTo("indemnity")}
            />
            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Indemnity issue number
                    </div>
                    <div className="text-white text-[14px]">
                      {category.indemnity_no}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="sm:grid mb-2 sm:mb-0 sm:grid-cols-5">
                  <div className="mb-2 sm:mb-0 sm:col-span-2">
                    <div className="text-[#999999] text-[12px] truncate">
                      Issuing date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.indemnity_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(category.indemnity_expiry_date)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Indemnity insurance document
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(category.indemnity_doc?.file_path ?? null)
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.indemnity_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Account info */}
      {showSection("accountinfo") && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              title="Audited accounts"
              onClick={() => moveTo("accountinfo")}
            />
            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Audited account 1
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(
                          category.audited_account_1_doc?.file_path ?? null
                        )
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.audited_account_1_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Audited account 2
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(
                          category.audited_account_2_doc?.file_path ?? null
                        )
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.audited_account_2_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Audited account 3
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(
                          category.audited_account_3_doc?.file_path ?? null
                        )
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.audited_account_3_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Evidence of job done
                    </div>
                    <div
                      onClick={() =>
                        PreviewFile(
                          category.job_evidence_doc?.file_path ?? null
                        )
                      }
                      className="text-white text-[14px] flex items-center gap-3 cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/fileicon.png"
                        alt=""
                        width={14}
                        height={16}
                      />
                      {category.job_evidence_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[400px] mx-auto text-center mt-10 text-[#666666] text-[12px]">
        By clicking submit application, I/We confirm that the information
        provided are accurate and truthful.
      </div>
      <div className="mt-3 pb-12 flex justify-center items-start w-full">
        <Button onClick={saveForm} label="Submit application" />
      </div>
    </>
  )
}
