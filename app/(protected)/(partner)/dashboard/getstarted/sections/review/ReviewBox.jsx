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
import { TailSpinPreloader } from "@/app/components/Icons"
import { useState, useEffect } from "react"

export default function ReviewBox({ setIsOnboarding, setTmpCat }) {
  const { setForm, moveToNextForm } = useProcessing()
  const { partner, category, registerPartner } = usePartners()
  const [{ errors, setError, clearErrors }] = useErrors()
  const showSection = (section) =>
    category?.validation &&
    category.validation[section] &&
    (category.validation[section] === "r" ||
      category.validation[section] === "o")

  const [isMaster, setIsMaster] = useState({
    compliance: false,
    companydetail: false,
    ncclicense: false,
    nlrclicense: false,
    shortcode: false,
    indemnity: false,
    accountinfo: false,
  })
  const [complianceCategory, setComplianceCategory] = useState(null)
  const [companydetailCategory, setCompanydetailCategory] = useState(null)
  const [ncclicenseCategory, setNcclicenseCategory] = useState(null)
  const [nlrclicenseCategory, setNlrclicenseCategory] = useState(null)
  const [shortcodeCategory, setShortcodeCategory] = useState(null)
  const [indemnityCategory, setIndemnityCategory] = useState(null)
  const [accountinfoCategory, setAccountinfoCategory] = useState(null)
  useEffect(() => {
    const Stages = [
      "compliance",
      "companydetail",
      "ncclicense",
      "shortcode",
      "indemnity",
      "accountinfo",
    ]
    if (category) {
      setIsMaster((oldState) => {
        Stages.map((stage) => {
          oldState[stage] =
            partner?.master &&
            partner.sections[partner?.master.category_uuid] &&
            partner.sections[partner?.master.category_uuid][stage] &&
            category.category_uuid !== partner?.master.category_uuid
              ? true
              : false
        })
        return oldState
      })
    }
  }, [category])

  useEffect(() => {
    setComplianceCategory(isMaster.compliance ? partner?.master : category)
    setCompanydetailCategory(
      isMaster.companydetail ? partner?.master : category
    )
    setNcclicenseCategory(isMaster.ncclicense ? partner?.master : category)
    setNlrclicenseCategory(isMaster.nlrclicense ? partner?.master : category)
    setShortcodeCategory(isMaster.shortcode ? partner?.master : category)
    setIndemnityCategory(isMaster.indemnity ? partner?.master : category)
    setAccountinfoCategory(isMaster.accountinfo ? partner?.master : category)
  }, [isMaster])

  const [showModal, setShowModal] = useState(false)
  const [filePath, setFilePath] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const saveForm = async () => {
    clearErrors()
    if (isSaving) return
    setIsSaving(true)
    const result = await registerPartner("complete_registration", {
      partner_uuid: category.partner_uuid,
      category_uuid: category.category_uuid,
      user_uuid: category.user_uuid,
      action_completed: "category_registration",
    })

    if (result) {
      scrollToTop("onboardinglayout")
      if (result?.error) {
        setIsSaving(false)
        return setError({ review: result.error })
      }
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

  const moveTo = (section, category) => {
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
      {showSection("companydetail") && companydetailCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.companydetail}
              title="Company information"
              onClick={() => moveTo("companydetail")}
            />

            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      Company name
                    </div>
                    <div className="text-white text-[14px]">
                      {companydetailCategory?.company_name}
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
                      {companydetailCategory?.country &&
                        COUNTRIES.find(
                          (c) => c.value === companydetailCategory?.country
                        )?.title}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Address
                    </div>
                    <div className="text-white text-[14px]">
                      {companydetailCategory?.company_address}
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
                      {companydetailCategory?.company_city}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      State
                    </div>
                    <div className="text-white text-[14px]">
                      {companydetailCategory?.company_state &&
                        STATES.find(
                          (c) =>
                            c.country_code === companydetailCategory?.country &&
                            c.state_code ===
                              companydetailCategory?.company_state
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
                      {companydetailCategory?.company_postcode}
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
      {showSection("compliance") && complianceCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.compliance}
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
                      {complianceCategory?.rc_no}{" "}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Tax identification number
                    </div>
                    <div className="text-white text-[14px]">
                      {complianceCategory?.tin_no}{" "}
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
                        PreviewFile(
                          complianceCategory?.cac_doc?.file_path ?? null
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
                      {complianceCategory?.cac_doc?.file_name}
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
                        PreviewFile(
                          complianceCategory?.memart_doc?.file_path ?? null
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
                      {complianceCategory?.memart_doc?.file_name}
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
                        PreviewFile(
                          complianceCategory?.tin_doc?.file_path ?? null
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
                      {complianceCategory?.tin_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* NCC VAS Licence */}
      {showSection("ncclicense") && ncclicenseCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.ncclicense}
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
                      {ncclicenseCategory?.vas_license_id}
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
                      {outputDate(ncclicenseCategory?.ncc_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(ncclicenseCategory?.ncc_expiry_date)}
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
                        PreviewFile(
                          ncclicenseCategory?.ncc_doc?.file_path ?? null
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
                      {ncclicenseCategory?.ncc_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* NLRC Licence */}
      {showSection("nlrclicense") && nlrclicenseCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.nlrclicense}
              title="NLRC"
              onClick={() => moveTo("nlrclicense")}
            />
            <div className="md:col-span-3 divide-y divide-slate-400/25">
              <div className="pb-3">
                <div className="grid">
                  <div className="">
                    <div className="text-[#999999] text-[12px] truncate">
                      NLRC License number
                    </div>
                    <div className="text-white text-[14px]">
                      {nlrclicenseCategory?.nlrc_license_id}{" "}
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
                      {outputDate(nlrclicenseCategory?.nlrc_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(nlrclicenseCategory?.nlrc_expiry_date)}
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
                        PreviewFile(
                          nlrclicenseCategory?.nlrc_doc?.file_path ?? null
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
                      {nlrclicenseCategory?.nlrc_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Shortcode */}
      {showSection("shortcode") && shortcodeCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.shortcode}
              title="Shortcode"
              onClick={() => moveTo("shortcode")}
            />
            {shortcodeCategory?.shortcodes?.length > 0 && (
              <div className="md:col-span-3">
                <ShortcodeReview
                  shortcode={shortcodeCategory?.shortcodes}
                  PreviewFile={PreviewFile}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Indemnity Licence */}
      {showSection("indemnity") && indemnityCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.indemnity}
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
                      {indemnityCategory?.indemnity_no}{" "}
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
                      {outputDate(indemnityCategory?.indemnity_issue_date)}
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-0 sm:col-span-3">
                    <div className="text-[#999999] text-[12px] truncate">
                      Expiry date
                    </div>
                    <div className="text-white text-[14px]">
                      {outputDate(indemnityCategory?.indemnity_expiry_date)}
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
                        PreviewFile(
                          indemnityCategory?.indemnity_doc?.file_path ?? null
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
                      {indemnityCategory?.indemnity_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Account info */}
      {showSection("accountinfo") && accountinfoCategory && (
        <div className="bg-[#111111] rounded-[8px] p-[24px] mb-4">
          <div className="md:grid md:grid-cols-4 gap-12">
            <ReviewTitle
              isMaster={isMaster.accountinfo}
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
                          accountinfoCategory?.audited_account_1_doc
                            ?.file_path ?? null
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
                      {accountinfoCategory?.audited_account_1_doc?.file_name}
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
                          accountinfoCategory?.audited_account_2_doc
                            ?.file_path ?? null
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
                      {accountinfoCategory?.audited_account_2_doc?.file_name}
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
                          accountinfoCategory?.audited_account_3_doc
                            ?.file_path ?? null
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
                      {accountinfoCategory?.audited_account_3_doc?.file_name}
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
                          accountinfoCategory?.job_evidence_doc?.file_path ??
                            null
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
                      {accountinfoCategory?.job_evidence_doc?.file_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {category.status === "open" && (
        <>
          <div className="max-w-[400px] mx-auto text-center mt-10 text-[#666666] text-[12px]">
            By clicking submit application, I/We confirm that the information
            provided are accurate and truthful.
          </div>
          <div className="mt-3 pb-12 flex justify-center items-start w-full">
            {isSaving ? (
              <TailSpinPreloader width={40} height={40} fill="#efb703" />
            ) : (
              <Button
                onClick={saveForm}
                label="Submit category"
                paddingclass="pl-12 pr-4 py-3"
                textsizecss="inline-flex text-[14px] whitespace-nowrap"
              />
            )}
          </div>
        </>
      )}
      {category.status === "pending" && (
        <div className="mt-3 pb-12 flex flex-col space-y-1 justify-center items-center w-full">
          <p className="text-[24px] text-[#999999]">In review</p>
          <p
            onClick={() => {
              setIsOnboarding(false)
              setTmpCat(null)
              setForm(null)
            }}
            className="text-[14px] text-#666666] hover:text-[#999999] cursor-pointer"
          >
            Close
          </p>
        </div>
      )}
    </>
  )
}
