"use client";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import useApp from "@/hooks/useApp";
import Footer from "@/app/components/public/Footer";
import { useEffect, useState } from "react";
import Button from "@/app/components/form/Button";
import DiscoverGridBox from "@/app/components/public/DiscoverGridBox";
import DiscoverComplianceList from "@/app/components/public/DiscoverComplianceList";
import DiscoverEarningTodayGrid from "@/app/components/public/DiscoverEarningTodayGrid";

export default function Discover() {
  const { setRouteloading } = useApp();
  useEffect(() => {
    setRouteloading(false);
  }, []);

  return (
    <>
      <main className="flex flex-col items-start  xl:px-0 m-0 pb-2xl w-full sm:bg-right-top bg-no-repeat">
        <Navbar />
        <div className="w-full h-full mx-auto max-w-[1158px] relative px-8">
          <div className="pt-8 lg:pt-[50px] flex flex-col items-start w-full">
            {/* Discover  Our Partner Portal */}
            <div className="w-full mx-auto lg:max-w-[1158px] relative">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                Discover Our Partner Portal
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-8 w-full">
                <p className="sm:max-w-[50%] text-white font-mtn-extrabold text-[24px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[46px] md:leading-[54px] tracking-[-4%] pb-5">
                  Resources to Help You Succeed on the MTN Partner Portal
                </p>

                <p className="sm:max-w-[50%] lg:max-w-[410px] text-white/50 font-mtn-extralight text-[14px] leading-[22px] sm:text-[16px] sm:leading-[28px] pb-4 sm:pb-0">
                  Are you looking to expand your reach and grow your business?
                  The MTN Partner Portal is the perfect platform for developers,
                  content creators, licensed VAS aggregators, and e-commerce
                  vendors to promote their products and services to a large user
                  base of MTN subscribers in Nigeria.
                </p>
              </div>
            </div>
            <Image
              className="w-full h-auto mt-[66px]"
              src={
                "/assets/pic/african-american-person-analyzing-financial-statis.png"
              }
              width={1440}
              height={460}
              alt=""
            />
          </div>
          <div className="w-full mx-auto lg:max-w-[1158px] relative">
            {/* Join Our Community */}
            <div className="pt-8 lg:pt-[50px] flex flex-col justify-start items-center w-full">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                Join Our Community
              </h3>
              <p className="max-w-[475px] text-white text-center tracking-[-4%] font-mtn-extrabold text-[38px] leading-[36.5px] md:text-[46px] md:leading-[42.5px] pb-5">
                What It Takes to Be an MTN Partner
              </p>

              <p className="max-w-[700px] text-white/50 text-center font-mtn-extralight text-[14px] leading-[22px] sm:text-[16px] sm:leading-[28px] pb-4 sm:pb-0">
                The MTN Partner Portal offers an unparalleled opportunity for
                businesses to expand their reach and maximize their potential in
                Nigeria's dynamic telecommunications market. By becoming an MTN
                Partner, you will have access to a suite of powerful tools and
                resources that can help you streamline your operations and
                attract new customers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[66px] gap-[32px]">
                <DiscoverGridBox
                  image={
                    <Image
                      src="/assets/icons/user-group.svg"
                      width={41.38}
                      height={41.38}
                      alt=""
                    />
                  }
                  text="Access to a large user base of MTN subscribers"
                />
                <DiscoverGridBox
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/seamless.svg"
                      width={40}
                      height={40}
                      alt=""
                    />
                  }
                  text="Seamless integration with MTN services"
                />
                <DiscoverGridBox
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/cloud.svg"
                      width={36.88}
                      height={33.03}
                      alt=""
                    />
                  }
                  text="Access to powerful APIs and tools"
                />
                <DiscoverGridBox
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/chart.svg"
                      width={37.68}
                      height={40}
                      alt=""
                    />
                  }
                  text="Insights and analytics dashboard"
                />
              </div>
            </div>
            {/* General Compliance Details: */}
            <div className="mt-[66px] rounded-t-3xl w-full h-fit bg-gradient-to-b from-slate-800 from-10% to-transparent p-px">
              <div className="rounded-t-3xl w-full h-fit bg-[#030303] overflow-hidden">
                <Image
                  className="w-full"
                  src={
                    "/assets/pic/serious-african-american-man-sitting-at-table-near.png"
                  }
                  width={1149}
                  height={266.98}
                  alt=""
                />
                <div className="flex flex-col gap-10 px-6 pt-6 pb-1 md:pb-2 md:pt-[85px] md:px-[85px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
                    <div className="flex flex-col w-full">
                      <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                        General Compliance Details:
                      </h3>
                      <p className="max-w-[400px] text-white tracking-[-4%] font-mtn-extrabold text-[36px]  md:text-[44px] leading-[89%] pb-5">
                        Compliance Requirements for MTN Partners
                      </p>

                      <p className="max-w-[500px] text-[#999999] text-[14px]  md:text-[16px] leading-[24px] pb-5">
                        Compliance Requirements for MTN Partners As an MTN
                        Partner, you'll need to meet certain compliance
                        requirements depending on the services you're offering.
                        Here's a list of the compliance details you may need to
                        provide:
                      </p>
                    </div>
                    <div className="flex justify-center w-full h-fit">
                      <div className="max-w-[390px] flex flex-col gap-[12px]">
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/personal-assistant.svg"
                              width={26}
                              height={26}
                              alt=""
                            />
                          }
                          text="Company Registration Number"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/tax.svg"
                              width={25}
                              height={25}
                              alt=""
                            />
                          }
                          text="Tax Identification Number (TIN)"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/certificate.svg"
                              width={24}
                              height={24}
                              alt=""
                            />
                          }
                          text="Corporate Affairs Commission (CAC) 
                        Registration Certificate"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/memorandum.svg"
                              width={27}
                              height={22.68}
                              alt=""
                            />
                          }
                          text="Memorandum and Articles of Association Certificate (Memart)"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full h-fit gap-10">
                    <div className="sm:max-w-[50%] flex flex-col gap-6 py-[30px] sm:py-[36px] px-[36px] sm:px-[51px] border border-white/10 rounded-[22px] w-full">
                      <p className="sm:max-w-[303px] font-mtn-bold text-white text-[28px] leading-[89%] sm:text-[32px]">
                        Compliance Details for{" "}
                        <span className="text-mtn whitespace-nowrap">
                          VAS Providers
                        </span>{" "}
                        and Aggregators
                      </p>
                      <p className="text-md text-white/70 sm:max-w-[400px]">
                        If you're a licensed VAS provider or aggregator, you'll
                        also need to provide the following compliance details:
                      </p>
                      <div className="max-w-[390px] flex flex-col gap-[4px]">
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="NCC VAS License"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="VAS License Number"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="VAS License Issue Date"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="VAS License Expiry Date"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="VAS Document"
                        />
                      </div>
                    </div>
                    <div className="sm:max-w-[50%] flex flex-col gap-6 py-[30px] sm:py-[36px] px-[36px] sm:px-[51px] border border-white/10 rounded-[22px] w-full">
                      <p className="sm:max-w-[303px] font-mtn-bold text-white text-[28px] leading-[89%] sm:text-[32px]">
                        Compliance Details for{" "}
                        <span className="text-mtn whitespace-nowrap">
                          Short Code
                        </span>{" "}
                        Providers
                      </p>
                      <p className="text-md text-white/70 sm:max-w-[400px]">
                        If you're a licensed VAS provider or aggregator, you'll
                        also need to provide the following compliance details:
                      </p>
                      <div className="max-w-[390px] flex flex-col gap-[4px]">
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="Short Code"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="Short Code Issue Date"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="Short Code Expiry Date"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="Short Code Document"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="NCC Pricing Approval Issue Date"
                        />
                        <DiscoverComplianceList
                          image={
                            <Image
                              src="/assets/icons/accept.svg"
                              width={22.88}
                              height={22.88}
                              alt=""
                            />
                          }
                          text="NCC Pricing Approval Document"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-10 py-[30px] sm:py-[36px] px-[36px] sm:px-[51px] border border-white/10 rounded-[22px] w-full">
                    <div>
                      <p className="sm:max-w-[403px] font-mtn-bold text-white text-[28px] leading-[89%] sm:text-[32px] mb-4">
                        Professional{" "}
                        <span className="text-mtn whitespace-nowrap">
                          Indemnity Insurance
                        </span>
                      </p>
                      <p className="text-md text-white/70">
                        If applicable, you'll need to provide the following
                        details:
                      </p>
                    </div>
                    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-[4px] w-full">
                      <DiscoverComplianceList
                        image={
                          <Image
                            src="/assets/icons/accept.svg"
                            width={22.88}
                            height={22.88}
                            alt=""
                          />
                        }
                        text="Professional Indemnity Insurance Number"
                      />
                      <DiscoverComplianceList
                        image={
                          <Image
                            src="/assets/icons/accept.svg"
                            width={22.88}
                            height={22.88}
                            alt=""
                          />
                        }
                        text="Professional Indemnity Insurance Issue Date and Expiry Date"
                      />
                      <DiscoverComplianceList
                        image={
                          <Image
                            src="/assets/icons/accept.svg"
                            width={22.88}
                            height={22.88}
                            alt=""
                          />
                        }
                        text="Professional Indemnity Insurance Issue Date and Expiry Date"
                      />
                    </div>
                  </div>
                  <p className="px-10 text-white/70 text-sm">
                    Please note that these compliance requirements may vary
                    depending on the services you're offering. To ensure you're
                    meeting all the necessary compliance requirements, please
                    contact our support team. We'll be happy to assist you in
                    getting the necessary compliance documents and information.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-[100px] relative bg-[url('/assets/pic/abstract_shape.png')] bg-left-top bg-no-repeat">
            {/* Start Earning Today */}
            <div className="flex flex-col justify-start items-center w-full mx-auto lg:max-w-[1158px] relative">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                Start Earning Today
              </h3>
              <p className="max-w-[475px] text-white text-center tracking-[-4%] font-mtn-extrabold text-[38px] leading-[36.5px] md:text-[46px] md:leading-[42.5px] pb-5">
                How to Make Money from Your Content as an MTN Partner
              </p>

              <p className="max-w-[700px] text-white/50 text-center font-mtn-extralight text-[14px] leading-[22px] sm:text-[16px] sm:leading-[28px] pb-4 sm:pb-0">
                As an MTN Partner, there are several ways to monetize your
                content and reach a large audience. Here are some tips on how to
                make money as an MTN Partner:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[66px] gap-[32px]">
                <DiscoverEarningTodayGrid
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/chart.svg"
                      width={38}
                      height={40}
                      alt=""
                    />
                  }
                  text="Use the insights and analytics"
                  subtext="Using the insights and analytics dashboard to understand your audience and optimize your products and services."
                  span="1"
                />
                <DiscoverEarningTodayGrid
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/api.svg"
                      width={41}
                      height={41}
                      alt=""
                    />
                  }
                  text="Powerful APIs and tools"
                  subtext="Take advantage of the powerful APIs and tools to create innovative products and services."
                  span="1"
                />
                <DiscoverEarningTodayGrid
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/mobilead.svg"
                      width={41}
                      height={41}
                      alt=""
                    />
                  }
                  text="MTN mobile ad network"
                  subtext="Utilize the MTN mobile ad network to run targeted ad campaigns at potential customers who are already on the MTN network."
                  span="1"
                />
                <DiscoverEarningTodayGrid
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/paymentchannel.svg"
                      width={41}
                      height={41}
                      alt=""
                    />
                  }
                  text="Payment channel"
                  subtext="Use the MTN Partner Portal to create your own payment channel
                using MTN."
                  span="1"
                />
                <DiscoverEarningTodayGrid
                  image={
                    <Image
                      className="h-auto"
                      src="/assets/icons/sandbox.svg"
                      width={41}
                      height={41}
                      alt=""
                    />
                  }
                  text="Sandbox environment"
                  subtext="Use the MTN Partner Portal's sandbox environment to test software products before launch, ensuring functionality and customer satisfaction, which can lead to monetization opportunities and business growth."
                  span="2"
                />
              </div>
              <p className="mt-20 text-white/70 text-sm">
                By following these tips, you can leverage the resources provided
                by MTN to grow your business and maximize your revenue
                potential. If you have any questions or need further assistance,
                please contact our support team.
              </p>
            </div>
          </div>
          <br />
          <br />
        </div>
        <Footer />
      </main>
    </>
  );
}
