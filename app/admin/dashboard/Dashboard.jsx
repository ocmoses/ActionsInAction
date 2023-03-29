"use client"
import { useState, useEffect } from "react"
import { getInitials } from "@/app/modules/utilities"
import { TailSpinPreloader } from "@/app/components/Icons"
import useProcessing from "@/hooks/useProcessing"
import useAdminPartners from "@/hooks/useAdminPartners"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import moment from "moment"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { getAllPartners } = useAdminPartners()
  const { processing, setProcessing } = useProcessing()
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const [Partners, setPartners] = useState([])
  const [fetchingPartners, setFetchingPartners] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setProcessing(false)
    const get_all_Partner = async () => {
      if (fetchingPartners) return
      setFetchingPartners(true)
      const allPartners = await getAllPartners()
      setPartners(allPartners.partners)
      setFetchingPartners(false)
      if (allPartners.error) setError({ compliance: allPartners.error })
    }
    get_all_Partner()
  }, [])
  const goToPartnerDetail = (uuid) => {
    router.push(`admin/compliance/${uuid}`)
  }
  return (
    <>
      <div id="compliance" className="flex flex-cols">
        <div className="w-full pt-[72px] px-12 mx-auto">
          <h2 className="text-4xl font-bold text-white text-center md:text-start">
            Applicants
          </h2>

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
                  <tr className="border-b border-b-white/40 text-12">
                    {/* <td className="bg-transparent">
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td> */}
                    <th>Partner</th>
                    <th>Categories</th>
                    <th>Submitted on</th>
                    <th>Contributors</th>
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
                              <span>{getInitials(partner.company_name)}</span>
                            </div>
                            <div>
                              <div className="font-bold">
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
                          <div className="flex flex-col gap-1">
                            {partner?.categories?.length > 0 &&
                              partner?.categories.map((category) => (
                                <div className="flex gap-2 items-center">
                                  <div
                                    key={category.uuid}
                                    className="w-[100px] z-0 relative h-[15px] border border-white/20 flex text-mtn text-[10px] bg-black items-center justify-center"
                                  >
                                    <div
                                      className={`left-0 top-0 z-10 absolute h-[15px] bg-[#FFCB03]`}
                                      style={{
                                        width: `${category.category_percentage}px`,
                                        backgroundColor: "#FFCB03",
                                      }}
                                    ></div>
                                    <div className="left-1 top-0 z-20 absolute text-white h-[15px] bg-transparent">
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
