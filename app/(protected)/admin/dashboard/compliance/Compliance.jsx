"use client"
import { useState, useEffect, Suspense } from "react"
import { getInitials } from "@/app/modules/utilities"
import useProcessing from "@/hooks/useProcessing"
import useAdminPartners from "@/hooks/admin/useAdminPartners"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import UserPercentage from "@/app/components/UserPercentage"
import { PhoneIcon } from "@heroicons/react/24/solid"
import moment from "moment"

export default function Compliance() {
  const { getAllPartners } = useAdminPartners()
  const { categories } = usePartners()
  const { setForm, setProcessing } = useProcessing()
  const [{ errors, setError, clearErrors }] = useErrors(null)
  const [Partners, setPartners] = useState([])

  useEffect(() => {
    setProcessing(false)
    const get_all_Partner = async () => {
      const allPartners = await getAllPartners()
      console.log(allPartners.partners)
      setPartners(allPartners.partners)
      if (allPartners.error) setError({ compliance: allPartners.error })
    }
    get_all_Partner()
  }, [])
  const goToPartnerDetail = (uuid) => {}
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
            <table className="table w-full transparent">
              <tbody>
                {/* head */}
                <tr className="border-b border-b-white/40 text-12">
                  <td className="bg-transparent">
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <th>Company</th>
                  <th>Submitted on</th>
                  <th>Contributors</th>
                  <th>Progress</th>
                </tr>

                {/* row 1 */}
                <Suspense
                  fallback={<p className="text-white p-4">Loading...</p>}
                >
                  {Partners &&
                    Partners?.map((partner) => (
                      <tr
                        key={partner.uuid}
                        className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/20"
                        onClick={() => goToPartnerDetail(partner.uuid)}
                      >
                        <th>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox border-2 border-white/20 focus:border-mtn hover:border-mtn checked:border-mtn focus:font-mtn bg-transparent focus:bg-transparent focus:ring-mtn"
                            />
                          </label>
                        </th>
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
                                <PhoneIcon className="h-3 w-3 text-mtn-500" />{" "}
                                {partner.telephone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-3">
                            {partner?.categories?.length > 0 &&
                              partner?.categories.map((category) => (
                                <div className="flex justify-between">
                                  <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 border border-white/20 rounded-full flex text-mtn text-[12px] bg-black items-center justify-center">
                                      {category.category_percentage}%
                                    </div>
                                    <span>{category.category_name}</span>
                                  </div>
                                  <div>
                                    {moment(category.submitted_on).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </td>
                        <td>Purple</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
                      </tr>
                    ))}
                </Suspense>
                {/* row 2 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
