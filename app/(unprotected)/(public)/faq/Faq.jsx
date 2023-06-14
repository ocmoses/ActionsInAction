"use client"
import Navbar from "@/app/components/Navbar"
import Image from "next/image"
import useApp from "@/hooks/useApp"
import Footer from "@/app/components/public/Footer"
import RemoteEndpoints from "@/app/modules/endpoints"
import { TailSpinPreloader } from "@/app/components/Icons"
import { useEffect, useState } from "react"
import useErrors from "@/hooks/useErrors"
import FormErrors from "@/app/components/FormErrors"
import { apikey } from "@/app/modules/constants"

export default function Discover() {
  const { setRouteloading } = useApp()
  const [loading, setLoading] = useState(false)
  const [FAQ, setFAQ] = useState(false)
  const [active, setActive] = useState([])

  const [{ errors, setError, clearErrors }] = useErrors()

  const toggleFAQ = (uuid) => {
    if (active.includes(uuid))
      setActive((draft) => draft.filter((d) => d !== uuid))
    else setActive((draft) => [...draft, uuid])
  }

  useEffect(() => {
    setRouteloading(false)
    clearErrors()
    const fetchFAQ = async () => {
      try {
        if (loading) return
        setLoading(true)
        const response = await fetch(RemoteEndpoints.FAQ, {
          next: { revalidate: 120 },
          headers: {
            apikey: apikey,
          },
        })
        setLoading(false)
        if (!response)
          return setError({ faq: "No response received from server" })
        const results = await response.json()
        if (!results) return setError({ faq: "No data fetched from server" })
        if (results.success) {
          return setFAQ(results.data)
        } else {
          return setError({ faq: results.message })
        }
      } catch (err) {
        setLoading(false)
        return setError({ faq: err.message })
      }
    }

    fetchFAQ()
  }, [])

  return (
    <>
      <div className="flex flex-col font-mtn items-start px-8 xl:px-0 m-0 pb-2xl h-full w-full relative bg-[url('/assets/pic/faq-bg.png')] bg-left-top bg-no-repeat">
        <div className="w-full mx-auto lg:max-w-[1158px] relative">
          <Navbar />
        </div>
        <div className="pt-8 lg:pt-[70px] flex flex-col items-start w-full">
          {/* Discover  Our Partner Portal */}
          <div className="w-full mx-auto lg:max-w-[1158px] relative">
            <div className="flex flex-col gap-0 w-full lg:max-w-[1170px] mx-auto">
              {errors?.faq && (
                <div className="my-6 max-w-[400px] mx-auto text-center px-3 py-1 rounded-full bg-white/10">
                  <FormErrors error={errors.faq} />
                </div>
              )}
              <h3 className="text-mtn text-center text-[20px] font-mtn font-semibold mb-6">
                MTN Partner Portal FAQ
              </h3>

              <p className=" text-white text-center tracking-[-4%] font-mtn-extrabold text-[24px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[80px] md:leading-[54px] pb-5">
                How can we help?
              </p>
              <p className=" text-white/50 text-center font-mtn-extralight text-[18px] leading-[22px] sm:text-[16px] sm:leading-[28px] pb-4 sm:pb-0 max-w-[480px] mx-auto">
                Expand your reach and skyrocket your revenue with MTN Partner
                Portal. Learn about benefits, features, compliance, and support.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center w-full">
            <TailSpinPreloader fill="#efb703" />
          </div>
        ) : (
          <>
            {/* <div className="min-w-[215px] ">
            <div className="">Menu</div>
          </div> */}
            {FAQ?.length > 0 ? (
              <div className="flex flex-col md:flex-row w-full pt-[100px] gap-[23px] relative lg:max-w-[1158px] mx-auto min-h-[400px]">
                <div className="flex-1 flex  flex-col justify-start items-center w-full ">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px] w-full">
                    {FAQ.map((faq) => (
                      <div
                        key={faq.uuid}
                        className="flex flex-col items-start gap-[30px] px-[40px] py-[32px] w-full bg-gradient-to-b from-[#1B1B1B] to-transparent rounded-[27.30px]"
                      >
                        <span className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-black">
                          <Image
                            src={faq.faq_category_icon}
                            width={28}
                            height={28}
                            alt=""
                          />
                        </span>
                        <h3 className="text-white text-[30px] font-mtn-bold">
                          {faq.faq_category_name}
                        </h3>
                        <div className="flex flex-col items-start gap-[10px] w-full">
                          {faq.faq_questions.length > 0 &&
                            faq.faq_questions.map((que) => (
                              <div
                                key={que.uuid}
                                className={`flex flex-col gap-3 w-full px-[18px] py-[11px] rounded-[12px] ${
                                  active?.includes(que.uuid)
                                    ? "bg-white/10"
                                    : "bg-white/5 hover:bg-white/10"
                                }  cursor-pointer`}
                              >
                                <div
                                  onClick={() => toggleFAQ(que.uuid)}
                                  className="flex items-start gap-[11px] justify-between w-full cursor-pointer"
                                >
                                  <h4 className="text-[#C7C7C7] text-[14px]">
                                    {que.faq_question}
                                  </h4>
                                  <span className="min-w-[11px] min-h-[11px]">
                                    <Image
                                      src="/assets/icons/faq-plus.png"
                                      alt=""
                                      width={11}
                                      height={11}
                                    />
                                  </span>
                                </div>
                                {active?.includes(que.uuid) && (
                                  <div className="px-[16px] py-[14px] rounded-[12px] text-white bg-black">
                                    {que.faq_answer}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[400px] flex items-center justify-center w-full">
                {" "}
                <p className="text-[#999999] text-[24px]">No FAQ found</p>
              </div>
            )}
          </>
        )}

        <div className="w-full mt-20 mx-auto lg:max-w-[1158px] relative">
          <Footer />
        </div>
      </div>
    </>
  )
}
