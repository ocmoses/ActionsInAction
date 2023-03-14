"use client"
import { useState, useEffect } from "react"
import { getInitials } from "@/app/modules/utilities"
import useProcessing from "@/hooks/useProcessing"
import useAdminPartners from "@/hooks/admin/useAdminPartners"
import usePartners from "@/hooks/usePartners"
import useErrors from "@/hooks/useErrors"
import Image from "next/image"

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
                {Partners && (
                  <>
                    {Partners?.map((partner) => (
                      <tr
                        key={partner.uuid}
                        className="border-b border-b-white/10"
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
                            <div className="flex justify-center items-center rounded-full w-12 h-12 bg-[#396587] text-white text-[12px] mr-2">
                              <span>{getInitials(partner.company_name)}</span>
                            </div>
                            <div>
                              <div className="font-bold">
                                {partner.company_name}
                              </div>
                              <div className="text-sm opacity-50">
                                {partner.telephone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Zemlak, Daniel and Leannon
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            Desktop Support Technician
                          </span>
                        </td>
                        <td>Purple</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
                      </tr>
                    ))}
                  </>
                )}
                {/* row 2 */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
