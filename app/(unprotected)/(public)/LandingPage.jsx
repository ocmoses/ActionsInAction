"use client";
import Navbar from "@/app/components/Navbar";
import Typewriter from "typewriter-effect";
import Button from "@/app/components/form/Button";
import Image from "next/image";
import useApp from "@/hooks/useApp";
import Footer from "@/app/components/public/Footer";
import { useEffect, useState } from "react";
import { PageRoutes } from "@/app/modules/menu";

export default function LandingPage() {
  const { setRouteloading } = useApp();
  const [faq, setFaq] = useState([
    {
      id: "1",
      faq: "What is the MTN Partner Portal for?",
      ans: "The MTN Partner Portal is designed for developers, content creators/providers, licensed VAS aggregators, and e-commerce vendors.",
    },
    {
      id: "2",
      faq: "What do I need to register?",
      ans: `They are specific requirements needed to partner with us.  <a className="hover:text-white" href="${PageRoutes.register}">Kindly click on this link to get the detailed requirement</a>.`,
      ans: `They are specific requirements needed to partner with us.  <a className="hover:text-white" href="${PageRoutes.register}">Kindly click on this link to get the detailed requirement</a>.`,
    },
    {
      id: "3",
      faq: "How long does the documentation verification take?",
      ans: `In 14 days, all documents submitted will be verified. To check the status of your document verification, <a className="hover:text-white" href="${PageRoutes.login}">click here</a>.`,
      ans: `In 14 days, all documents submitted will be verified. To check the status of your document verification, <a className="hover:text-white" href="${PageRoutes.login}">click here</a>.`,
    },
    {
      id: "4",
      faq: "How do I reset my password?",
      ans: "Kindly log in to your dashboard and click on the reset button. A password reset email will be shared.",
    },
    {
      id: "5",
      faq: "Is there a limit to the number of products or services I can promote on the MTN Partner Portal?",
      ans: "The number of products or services that can be promoted on the platform would depend on the terms and conditions of the contract. Partners should check the terms and conditions page on the MTN Partner Portal website for more details.",
    },
  ]);
  const [openFaq, setOpenFaq] = useState("");
  const toggleFaq = (id) => {
    if (id === openFaq) setOpenFaq("");
    else setOpenFaq(id);
  };
  useEffect(() => {
    setRouteloading(false);
  }, []);

  return (
    <>
      <main className="flex flex-col items-start  xl:px-0 m-0 pb-2xl w-full relative bg-[url('/assets/pic/hero-bg.png')] bg-contain  sm:bg-right-top bg-no-repeat">
      <Navbar />
       <div className="w-full h-full mx-auto max-w-[1158px] relative px-8">
          <div className="font-mtn z-20 relative mt-[80px]">
            {/* Hero Box */}
            <div className="flex flex-col items-center w-full">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                MTN Partner Portal
              </h3>
              <div className="typeanimation mx-auto max-w-[680px] text-[34px] sm:text-[54px] md:text-[72px] text-white text-center font-mtn-extrabold leading-[0.9] pb-5">
                <div className="block md:inline">Hello partner,</div>{" "}
                <div className="inline">
                  meet{" "}
                  <Typewriter
                    options={{
                      strings: [
                        "growth!",
                        "success!",
                        "next level!",
                        "profit!",
                        "support!",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      skipAddStyles: false,
                      wrapperClassName: "inline text-[#FFCB03]",
                      cursorClassName:
                        " text-[28px] sm:text-[48px] md:text-[66px] text-white/20 animate-pulse",
                    }}
                  />
                </div>
              </div>

              <div className="text-white/70 max-w-[594px]">
                <p className="font-mtn-extralight text-[14px] leading-[22px] sm:text-[18px] sm:leading-[28px] text-center">
                  Increase your revenue and reach millions of customers in
                  Nigeria with the MTN Partner Portal. Our range of offers and
                  services helps you grow your businesses and increase
                  performance.
                </p>
              </div>
              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-4 mt-8">
                <Button
                  href={PageRoutes.register}
                  label="Partner with us"
                  className="rounded-full flex justify-between items-center px-[42px] py-2 text-black bg-mtn hover:bg-mtn-400 border-2 border-mtn"
                  noicon="yes"
                />
                
                <Button
                  href={"/discover"}
                  label="Discover more"
                  className="rounded-full flex justify-between items-center px-[42px] py-2 bg-black/50 hover:bg-white/20 text-white border-2 border-white"
                  outline="yes"
                  outlinecolor="border-white/80"
                  noicon="yes"
                />
              </div>
            </div>
            {/* PARTNER LOGOS */}
            {/* <div className="pt-16 lg:pt-[200px]">
              <p className="flex justify-center text-[16px] sm:text-[20px] text-white/40 mb-4 md:mb-10">
                Our Partners Who Love Us
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 flex md:flex justify-center sm:justify-between items-center w-full max-w-[1158px]">
                <Image
                  src="/assets/brand/jumia.svg"
                  width={122.67}
                  height={23}
                  alt=""
                />
                <Image
                  src="/assets/brand/Bolt.svg"
                  width={54.71}
                  height={31}
                  alt=""
                />
                <Image
                  src="/assets/brand/konga.svg"
                  width={93.03}
                  height={29}
                  alt=""
                />
                <Image
                  src="/assets/brand/seedbuilders.svg"
                  width={166.33}
                  height={35}
                  alt=""
                />
                <Image
                  src="/assets/brand/alt-school.svg"
                  width={45.88}
                  height={24.23}
                  alt=""
                />
                <Image
                  src="/assets/brand/softcom.svg"
                  width={121.76}
                  height={25}
                  alt=""
                />
              </div>
            </div> */}
            {/* Largest mobile phone user community */}
            <div className="w-full lg:max-w-[1158px]  pt-16 lg:pt-[150px] mb-20">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                The MTN Partner Experience
              </h3>
              <div className="max-w-[360px] sm:max-w-[505px] md:max-w-[685px] pb-5">
                <p className="text-[40px] sm:text-[50px] md:text-[60px] text-white font-mtn-extrabold leading-[44px] md:leading-[54.3px] pb-5">
                  Largest mobile phone user community
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end">
                <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] text-white/50 font-mtn-extralight text-[18px] leading-[24px] sm:text-[22px] sm:leading-[32px] pb-4 sm:pb-0">
                  Worry less about how to reach your customers. Reach millions
                  of people and bring life to your business goals.
                </p>
                <Button href={PageRoutes.register} label="Get started" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col items-end rounded-3xl overflow-hidden h-full bg-gradient-to-b from-[#1B1B1B] to-transparent">
                  <Image
                    src="/assets/illustrations/data-analytics-img.png"
                    alt=""
                    width={441}
                    height={382}
                    className=""
                  />
                  <div className="pl-12 pr-10 pb-6">
                    <p className="font-mtn-bold text-white text-[30px]">
                      Data analytics and insights
                    </p>
                    <p className="text-[22px] leading-[29px] text-white/60">
                      Get access to valuable data analytics that will help
                      inform your business decisions that will help grow your
                      business like a Pro.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 flex flex-col space-y-20 h-full relative">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between rounded-3xl overflow-hidden h-fit bg-gradient-to-b from-[#1B1B1B] to-transparent">
                  <div className="px-10 py-8 flex items-center h-fit">
                    <div>
                      <p className="font-mtn-bold text-white text-[30px]">
                        Audience analysis
                      </p>
                      <p className="text-[21px] leading-[29px] text-white/60">
                        Get access to a 360-degree view of your audiences by
                        analysing data signals across user attributes and
                        behaviours.
                      </p>
                    </div>
                  </div>
                  <Image
                    src="/assets/illustrations/audience-analytics-img.png"
                    alt=""
                    width={257}
                    height={251}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between rounded-3xl overflow-hidden h-fit bg-gradient-to-b from-[#1B1B1B] to-transparent">
                  <div className="px-10 py-8 flex items-center h-fit">
                    <div>
                      <p className="font-mtn-bold text-white text-[30px]">
                        Campaign analysis
                      </p>
                      <p className="text-[21px] leading-[29px] text-white/60">
                        Insights into the behaviours that make up campaign
                        interactions and how those attributes impact the path to
                        conversion.
                      </p>
                    </div>
                  </div>
                  <Image
                    src="/assets/illustrations/campaign.png"
                    alt=""
                    width={287}
                    height={274}
                  />
                </div>
              </div>
            </div>
            {/*  For Developers */}
            <div className="flex flex-col items-center w-full lg:max-w-[1158px]  pt-16 lg:pt-[150px] mb-20">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-6">
                For Developers
              </h3>
              <p className="text-[40px] sm:text-[50px] md:text-[60px] text-white font-mtn-extrabold leading-[44px] md:leading-[54.3px] pb-10 max-w-[687px] text-center">
                Dynamic Sandbox environment
              </p>
              <Image
                className=""
                src="/assets/illustrations/sandbox.png"
                alt=""
                priority
                width={969}
                height={557.42}
              />
              <p className="max-w-[643px] md:-mt-10 text-[18px] leading-[26px] md:text-[25px] md:leading-[36px] text-white/60 text-center">
                Developers love our sandbox environment that lets you test
                software and run programs without affecting your platform.
              </p>
            </div>
            {/* Icon box */}
            <div className="flex flex-col md:flex-row gap-6 w-full h-fit mb-[80px]">
              <div className="rounded-3xl p-8 border border-white/10 w-full">
                <Image
                  className="mb-4"
                  src="/assets/illustrations/lp-icon-1.png"
                  alt=""
                  priority
                  width={58}
                  height={58}
                />
                <h4 className="text-white text-[21px] leading-[89%] font-mtn-bold max-w-[200px] pb-4">
                  Customized payment channel
                </h4>
                <p className="text-[18px] leading-[24px] text-white/60 max-w-[260px] font-mtn-extralight">
                  Create plans from 1MB to Unlimited, depending on your use
                  case.
                </p>
              </div>
              <div className="rounded-3xl p-8 border border-white/10 w-full">
                <Image
                  className="mb-4"
                  src="/assets/illustrations/lp-icon-2.png"
                  alt=""
                  priority
                  width={58}
                  height={58}
                />
                <h4 className="text-white text-[21px] leading-[89%] font-mtn-bold max-w-[200px] pb-4">
                  Seamless payment experience
                </h4>
                <p className="text-[18px] leading-[24px] text-white/60 max-w-[260px] font-mtn-extralight">
                  Bill your customer directly from their MTN wallet with ease.
                </p>
              </div>
              <div className="rounded-3xl p-8 border border-white/10 w-full">
                <Image
                  className="mb-4"
                  src="/assets/illustrations/lp-icon-3.png"
                  alt=""
                  priority
                  width={58}
                  height={58}
                />
                <h4 className="text-white text-[21px] leading-[89%] font-mtn-bold max-w-[200px] pb-4">
                  100% success rates:
                </h4>
                <p className="text-[18px] leading-[24px] text-white/60 max-w-[260px] font-mtn-extralight">
                  See payments & history, manage refunds, & discounts and
                  promotions. All in one place.
                </p>
              </div>
            </div>
            {/* AB Testing */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-[80px]">
              <div className="flex flex-col flex-1 items-start gap-6">
                <h4 className="text-white text-[60px] leading-[60px] font-mtn-bold">
                  A/B <br />
                  testing
                </h4>
                <p className="text-[18px] leading-[24px] text-white/60 max-w-[410px] font-mtn-extralight">
                  Don’t know where to start with A/B testing? Get access to
                  tools that help you create personalised experiences
                </p>
                <Button href={PageRoutes.register} label="Get started" />
              </div>
              <Image
                className="mb-4 sm:w-[50%] lg:w-auto"
                src="/assets/illustrations/lp-icon-4.png"
                alt=""
                priority
                width={575}
                height={559}
              />
            </div>
            {/* Easy Registration */}
            <div className="w-full h-fit relative mb-0">
              <div className="flex flex-col items-start gap-6 sm:absolute z-10 inset-0">
                <div className="w-full h-full flex items-center justify-end">
                  <div className="w-full sm:w-[55%] flex flex-col gap-2 sm:gap-4 items-start pt-8 pr-8">
                    <p className="text-mtn text-[13px] leading-[18px] sm:text-[14px] sm:leading-[20px] lg:text-[16px] lg:leading-[22px] xl:text-[16px] xl:leading-[24px] font-mtn font-semibold">
                      Easy Registration
                    </p>
                    <h4 className="text-white text-[20px] leading-[20px] sm:text-[30px] sm:leading-[30px] lg:text-[40px] lg:leading-[40px] xl:text-[50px] xl:leading-[50px] font-mtn-bold">
                      Seamless onboarding and service integration
                    </h4>
                    <p className="text-[13px] leading-[18px] sm:text-[14px] sm:leading-[20px] lg:text-[16px] lg:leading-[22px] xl:text-[16px] xl:leading-[24px] text-white/60 max-w-[410px] font-mtn-extralight">
                      Our services are plug-and-play. Integrate seamlessly with
                      the tools you are already familiar with. Enjoy a seamless
                      onboarding experience integrating our service.
                    </p>
                    <Button href={PageRoutes.register} label="Get started" />
                  </div>
                </div>
              </div>
              <Image
                className="hidden sm:flex z-0 bg-right-top relative"
                src="/assets/illustrations/phones-bg.png"
                alt=""
                priority
                width={1183}
                height={835}
              />
            </div>
            {/*  Resources & Documentation */}
            <div className="flex flex-col items-center w-full lg:max-w-[1158px]  pt-16 lg:pt-[150px]">
              <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-4">
                Resources & Documentation
              </h3>
              <p className="text-[30px] sm:text-[40px] md:text-[50px] text-white font-mtn-extrabold leading-[40px] md:leading-[54.3px] max-w-[693px] text-center mb-4">
                Grow faster with resources to get started!
              </p>
              <p className="max-w-[643px] mb-16 text-[18px] leading-[26px] md:text-[25px] md:leading-[36px] text-white/60 text-center">
                We have added the resources you need to start, run, and grow
                your business.
              </p>
              <Image
                className=""
                src="/assets/illustrations/video.png"
                alt=""
                priority
                width={1153}
                height={617}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-start sm:justify-between items-start max-w-[917px] mx-auto -mt-6 mb-12">
              <div className="flex justify-start items-start flex-col gap-4">
                <Image
                  className="w-full"
                  src="/assets/illustrations/thumb-1.png"
                  alt=""
                  priority
                  width={286}
                  height={147}
                />
                <div className="p-4 w-full">
                  <p className="text-white text-[16px] leading-[24px]">
                    Read the documentation
                  </p>
                  <p className="text-white/60 text-[14px] leading-[20px]">
                    Explore our guides, API references and code examples
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-start flex-col gap-4">
                <Image
                  className="w-full"
                  src="/assets/illustrations/thumb-2.png"
                  alt=""
                  priority
                  width={286}
                  height={147}
                />
                <div className="p-4 w-full">
                  <p className="text-white text-[16px] leading-[24px]">
                    Discover the right Metrics
                  </p>
                  <p className="text-white/60 text-[14px] leading-[20px]">
                    Learn to monitor system performance by selecting relevant
                    metrics, collecting and analyzing data that matters most to
                    you.
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-start flex-col gap-4">
                <Image
                  className="w-full"
                  src="/assets/illustrations/thumb-3.png"
                  alt=""
                  priority
                  width={286}
                  height={147}
                />
                <div className="p-4 w-full">
                  <p className="text-white text-[16px] leading-[24px]">
                    Write Custom Codes
                  </p>
                  <p className="text-white/60 text-[14px] leading-[20px]">
                    Build custom code tailored to your unique needs, integrating
                    with existing systems and creating powerful new
                    functionality from scratch.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center pt-6 mb-[100px]">
              <Button href={PageRoutes.register} label="Get started" />
            </div>
            {/* Support */}
            <div
              id="supportsection"
              className="flex flex-col sm:flex-row justify-start sm:justify-between items-start gap-6 pt-6 mb-[100px]"
            >
              <div className="flex flex-col flex-1 max-w-[400px] ">
                <h3 className="text-mtn text-[20px] font-mtn font-semibold mb-4">
                  Support
                </h3>
                <p className="text-[30px] sm:text-[40px] md:text-[50px] text-white font-mtn-extrabold leading-[40px] md:leading-[54.3px] mb-4">
                  You have questions? <br />
                  We have the answers!
                </p>
              </div>
              <div className="w-full md:w-[55%]">
                <div className="flex flex-col gap-2 w-full">
                  {faq.map((f) => (
                    <div key={f.id} className="rounded-lg bg-[#1B1B1B] p-4">
                      <div
                        className="flex flex-row justify-between items-center px-2 py-2 cursor-pointer"
                        onClick={() => toggleFaq(f.id)}
                      >
                        <span className="text-white text-[16px] leading-[22px]">
                          {f.faq}
                        </span>
                        <div>
                          {openFaq === f.id ? (
                            <Image
                              src="/assets/illustrations/icon-minus.png"
                              alt=""
                              priority
                              width={31}
                              height={31}
                              className="min-w-[31px] max-w-[31px] h-auto"
                            />
                          ) : (
                            <Image
                              src="/assets/illustrations/icon-plus.png"
                              alt=""
                              priority
                              width={31}
                              height={31}
                              className="min-w-[31px] max-w-[31px] h-auto"
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`${
                          openFaq === f.id ? "flex" : "hidden"
                        } rounded-lg bg-black px-3 py-4`}
                      >
                        <p
                          className="text-white/60 font-mtn-extralight text-[18px] leading-[24px]"
                          dangerouslySetInnerHTML={{ __html: f.ans }}
                        ></p>
                        <p
                          className="text-white/60 font-mtn-extralight text-[18px] leading-[24px]"
                          dangerouslySetInnerHTML={{ __html: f.ans }}
                        ></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
           
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
