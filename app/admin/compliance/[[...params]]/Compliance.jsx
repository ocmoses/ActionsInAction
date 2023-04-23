"use client"
import ComplianceDrawer from "@/app/components/dashboard/ComplianceDrawer"
import ComplianceDetail from "@/app/components/dashboard/ComplianceDetail"
import useProcessing from "@/hooks/useProcessing"
import useAdmins from "@/hooks/useAdmins"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import RemoteEndpoints from "@/app/modules/endpoints"
import SelectInput from "@/app/components/form/SelectInput"
import SelectInputOption from "@/app/components/form/SelectInputOption"
import DropdownMenu from "@/app/components/dashboard/DropdownMenu"
import { useState, useEffect, Suspense } from "react"
import { TailSpinPreloader } from "@/app/components/Icons"
import {
  getPartnerInitials,
  filterCategory,
  filterPartner,
} from "@/app/modules/utilities"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useApp from "@/hooks/useApp"
import ComplianceCategories from "@/app/components/dashboard/compliance/ComplianceCategories"

export default function Compliance({ params }) {
  const router = useRouter()
  const { processing, setProcessing } = useProcessing()
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const {
    admin,
    categories,
    allCategories,
    token,
    getStages,
    activeCategory,
    setActiveCategory,
    partner,
    setPartner,
    Stages,
    setStages,
    activeStage,
    setActiveStage,
  } = useAdmins()

  const [category, setCategory] = useState()
  const [openDrawer, setOpenDrawer] = useState(false)
  const { setRouteloading } = useApp()

  useEffect(() => {
    setProcessing(false)
    setRouteloading(false)
    console.log(admin)
  }, [])
  useEffect(() => {
    let html = document.getElementsByTagName("html")
    if (openDrawer) html[0].style["overflow-y"] = "hidden"
    else html[0].style["overflow-y"] = "auto"
  }, [openDrawer])

  useEffect(() => {
    if (partner && category) {
      const _activeCategory = partner?.categories?.find(
        (c) => c.category_uuid === category
      )
      setActiveCategory(filterCategory(_activeCategory, partner))
      setCategory(_activeCategory.category_uuid)
      const _stages = getStages(_activeCategory, categories)
      setStages(_stages)
    }
  }, [partner, category])
  useEffect(() => {
    clearErrors()
    const getPartnerInfo = async (uuid) => {
      setProcessing(true)
      const response = await fetch(
        `${RemoteEndpoints.ADMIN_PARTNETINFO}/${uuid}`,
        {
          cache: "no-store",
          next: { revalidate: 0 },
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      )
      const result = await response.json()
      setProcessing(false)
      if (result?.success) {
        const partnerInfo = result.data?.partner
        console.log({ partnerInfo })
        filterPartner(partnerInfo, categories)
        setPartner(partnerInfo)
        if (partnerInfo?.categories?.length > 0) {
          const _category = filterCategory(
            partnerInfo?.categories[0],
            partnerInfo
          )
          setCategory(_category.category_uuid)
          setActiveCategory(_category)
        }
        return
      }
      return setError(
        result?.data?.message ??
          "Something went wrong. Please check your connection and try again"
      )
    }
    if (params?.params?.length > 0) getPartnerInfo(params.params[0])
  }, [params])

  const handleOpenDrawer = (stage) => {
    setActiveStage(stage)
    setOpenDrawer(true)
  }
  return (
    <div className="max-w-[1158px] mx-auto py-12 px-16">
      <div onClick={() => router.push("admin/dashboard/")} className="mb-12">
        <span className="flex gap-4 items-center text-[13px] cursor-pointer text-[#999999] hover:text-white/80">
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
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          Applications
        </span>
      </div>
      {errors?.compliance && (
        <div className="my-6">
          <FormErrors error={errors.compliance} />
        </div>
      )}
      {processing && (
        <div className="flex justify-center items-center">
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        </div>
      )}
      {!processing && partner && (
        <>
          <div className="grin grid-cols-1 space-y-3 sm:flex justify-between items-center space-x-3 mb-20">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center rounded-full w-[64px] h-[64px] bg-mtn text-white text-[12px] mr-2">
                <span className="text-[24px]">
                  {getPartnerInitials(partner?.company_name)}
                </span>
              </div>
              <div>
                <div className="font-bold text-[30px] text-white mb-1">
                  {partner?.company_name}
                </div>
                <div className="flex items-center gap-2 text-[16px] text-white/80">
                  {partner?.categories?.length > 0 && (
                    <Image
                      alt={`${partner?.categories[0].country}`}
                      src={`/assets/flags/${
                        partner?.categories[0].country?.toLowerCase() ?? "ng"
                      }.svg`}
                      className={"inline mr-2 h-4 rounded-sm h-auto"}
                      width={24}
                      height={15}
                      priority
                    />
                  )}
                  <span>{partner?.email}</span>
                </div>
              </div>
            </div>
            {partner?.categories?.length > 0 && (
              <div className="py-3">
                <DropdownMenu
                  options={partner?.categories.map((cat) => ({
                    key: cat.category_uuid,
                    value: cat.category_uuid,
                    label: allCategories[cat.category_uuid]?.category_name,
                  }))}
                  defaultvalue={{
                    value: partner?.categories[0]?.category_uuid,
                    label: partner?.categories[0]?.category_name,
                  }}
                  onselect={(option) => {
                    setCategory(option.value)
                  }}
                  align="right"
                  optionwidth={240}
                />

                {/* <SelectInput
                  label=""
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  classes="!py-2 !px-3 cursor-pointer min-w-[200px] overflow-visible"
                  fontsize="14px"
                  style={{ width: "240px" }}
                >
                  {partner?.categories.map((cat) => (
                    <SelectInputOption
                      key={cat.category_uuid}
                      value={cat.category_uuid}
                      label={allCategories[cat.category_uuid]?.category_name}
                    />
                  ))}
                </SelectInput> */}
              </div>
            )}
          </div>
          <ComplianceCategories
            partner={partner}
            Stages={Stages}
            activeCategory={activeCategory}
            onclick={handleOpenDrawer}
          />
          <ComplianceDrawer
            activeStage={activeStage}
            category={activeCategory}
            setOpenDrawer={setOpenDrawer}
            openDrawer={openDrawer}
          >
            {activeStage && openDrawer && (
              <ComplianceDetail
                activeStage={activeStage}
                category={activeCategory}
                setOpenDrawer={setOpenDrawer}
                openDrawer={openDrawer}
              />
            )}
          </ComplianceDrawer>
        </>
      )}
    </div>
  )
}
