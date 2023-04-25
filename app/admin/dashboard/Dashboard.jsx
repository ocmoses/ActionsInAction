"use client"
import { useState, useEffect } from "react"
import { getPartnerInitials } from "@/app/modules/utilities"
import { onboarding_type, status_type } from "@/app/modules/constants"

import { TailSpinPreloader } from "@/app/components/Icons"
import useProcessing from "@/hooks/useProcessing"
import useAdmins from "@/hooks/useAdmins"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import moment from "moment"
import { useRouter } from "next/navigation"
import useApp from "@/hooks/useApp"
import DropdownMenu from "@/app/components/dashboard/DropdownMenu"

export default function Dashboard() {
  const { getAllPartners } = useAdmins()
  const { processing, setProcessing } = useProcessing()
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const [Partners, setPartners] = useState([])
  const [allPartners, setAllPartners] = useState([])
  const [status, setStatus] = useState("processing")
  const [type, setType] = useState("all")

  const [listTypeArray, setListTypeArray] = useState([])
  const [listStatusArray, setListStatusArray] = useState([])
  const [listOptions, setListOptions] = useState([])
  const [fetchingPartners, setFetchingPartners] = useState(false)
  const router = useRouter()
  const { setRouteloading } = useApp()

  useEffect(() => {
    setProcessing(false)
    setRouteloading(false)
    clearErrors()
    const get_all_Partner = async () => {
      if (fetchingPartners) return
      setFetchingPartners(true)
      const All_Partners = await getAllPartners()
      console.log({ partners: All_Partners.partners })
      setAllPartners(All_Partners.partners)
      setListTypeArray(All_Partners.listTypes)
      setListStatusArray(All_Partners.listStatus)
      setFetchingPartners(false)
      if (All_Partners.error) setError({ compliance: All_Partners.error })
    }
    get_all_Partner()
  }, [])

  useEffect(() => {
    console.log({ allPartners })
    if (allPartners?.all?.length > 0) {
      const filterStatus = allPartners.all.filter((partner) => {
        return status === "all" || partner.contract_status === status
      })
      const typeStatus = filterStatus.filter((partner) => {
        return type === "all" || partner.onboarding_type === type
      })
      setPartners(typeStatus)
    }
  }, [allPartners, status, type])
  useEffect(() => {
    const listTypeOptions = []
    listTypeOptions.push({ value: "all", label: "All type" })
    listTypeArray?.length > 0 &&
      listTypeArray.map((type) =>
        listTypeOptions.push({ value: type, label: onboarding_type[type] })
      )
    const listStatusOptions = []
    listStatusOptions.push({ value: "all", label: "All status" })
    listStatusArray?.length > 0 &&
      listStatusArray.map((status) =>
        listStatusOptions.push({ value: status, label: status_type[status] })
      )

    setListOptions({
      type: listTypeOptions,
      status: listStatusOptions,
    })
  }, [listTypeArray, listStatusArray])

  const goToPartnerDetail = (uuid) => {
    setRouteloading(true)
    router.push(`admin/compliance/${uuid}`)
  }
  console.log({ Partners })
  return (
    <>
      <div id="compliance" className="flex flex-cols pb-12">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-start text-4xl font-bold text-white text-center md:text-start">
              <h2>Applicants</h2>
              <span className=" font-extralight text-[15px] flex items-center justify-center bg-white/20 h-6 w-6 px-4 py-3 rounded-md">
                {Partners?.length}
              </span>
            </div>
            <div className="flex items-center gap-2 grow-0">
              <DropdownMenu
                options={listOptions.status}
                defaultvalue={{
                  value: "processing",
                  label: status_type.processing,
                }}
                onselect={(option) => {
                  setStatus(option.value)
                }}
                align="right"
              />
              <DropdownMenu
                options={listOptions.type}
                defaultvalue={{
                  value: "all",
                  label: "All",
                }}
                onselect={(option) => {
                  setType(option.value)
                }}
                align="right"
              />
            </div>
          </div>

          {errors && errors["compliance"] && (
            <div className="mb-6">
              <FormErrors error={errors["compliance"]} />
            </div>
          )}

          <div className="overflow-x-auto w-full mt-10">
            {processing && (
              <div className="flex justify-center items-center">
                <TailSpinPreloader width={40} height={40} fill="#efb703" />
              </div>
            )}
            {!processing && (
              <table className="table w-full transparent">
                <tbody>
                  {/* head */}
                  <tr className="border-b border-b-white/40 text-11">
                    {/* <td className="bg-transparent">
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td> */}
                    <th>
                      <span className="text-[13px]">Company</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Categories</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Submitted on</span>
                    </th>
                    <th>
                      <span className="text-[13px]">Contributors</span>
                    </th>
                    {/* <th>Progress</th> */}
                  </tr>

                  {/* row 1 */}

                  {Partners &&
                    Partners?.map((partner) => (
                      <tr
                        key={partner.uuid}
                        className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/20"
                        onClick={() => goToPartnerDetail(partner.uuid)}
                      >
                        {/* <th>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox border-2 border-white/20 focus:border-mtn hover:border-mtn checked:border-mtn focus:font-mtn bg-transparent focus:bg-transparent focus:ring-mtn"
                            />
                          </label>
                        </th> */}
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                              <span>
                                {getPartnerInitials(partner.company_name)}
                              </span>
                            </div>
                            <div>
                              <div className="font-bold text-white">
                                {partner.company_name}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white/80">
                                {/* <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "} */}
                                {partner.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-0">
                            {partner?.categories?.length > 0 &&
                              partner?.categories.map((category) => (
                                <div className="flex gap-1 items-center">
                                  <div
                                    key={category.uuid}
                                    className="flex items-center rounded-full overflow-hidden w-[100px] z-0 relative h-[15px] border border-white/20 flex text-mtn text-[12px] bg-black items-center justify-center"
                                  >
                                    <div
                                      className={`left-0 top-0 z-10 absolute h-[15px] bg-[#FFCB03]`}
                                      style={{
                                        width: `${category.category_percentage}px`,
                                        backgroundColor: "#FFCB03",
                                      }}
                                    ></div>
                                    <div className="left-1 top-[-3px] z-20 px-2 absolute text-white h-[15px] bg-transparent">
                                      {category.category_percentage}%
                                    </div>
                                  </div>
                                  <span>{category.category_name}</span>
                                </div>
                              ))}
                          </div>
                        </td>
                        <td>
                          {/* <div>
                            {moment(partner?.submitted_on).format("DD/MM/YYYY")}
                          </div> */}
                        </td>
                        <td></td>
                        {/* <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th> */}
                      </tr>
                    ))}

                  {/* row 2 */}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
