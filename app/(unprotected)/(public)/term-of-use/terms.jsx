"use client";
import Link from 'next/link'
import Navbar from "@/app/components/Navbar";
import useApp from "@/hooks/useApp";
import Footer from "@/app/components/public/Footer";
import { useEffect, useRef } from "react";
import  DocumentationH2Title, {DocumentationH3Title} from "@/app/components/public/DocumentationComponent";

export default function Terms() {
 
  const { setRouteloading } = useApp();
  useEffect(() => {
    setRouteloading(false);
  }, []);

  const handleClickScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const LinkList=[
    {
      id: 1,
      title:"Binding Agreement",
      sectionId: "section_1",
    },
    {
      id: 2,
      title:"Service Provider Representations",
      sectionId: "section_2",
    },
    {
      id: 3,
      title:"Account Registration",
      sectionId: "section_3",
    },
    {
      id: 4,
      title:"Use of the Service",
      sectionId: "section_4",
    },
    {
      id: 5,
      title:"Prohibited Activities",
      sectionId: "section_5",
    },
    {
      id: 6,
      title:"Intellectual Property Rights",
      sectionId: "section_6",
    },
    {
      id: 7,
      title:"Privacy",
      sectionId: "section_7",
    },
    {
      id: 8,
      title:"Service Management",
      sectionId: "section_8",
    },
    {
      id: 9,
      title:"Term and Termination",
      sectionId: "section_8",
    },
    {
      id: 10,
      title:"Electronic Communications",
      sectionId: "section_10",
    },
    {
      id: 11,
      title:"Modifications and Interruptions",
      sectionId: "section_11",
    },
    {
      id: 12,
      title:"Non-Disclosure and Confidentiality",
      sectionId: "section_12",
    },
    {
      id: 13,
      title:"Assignment",
      sectionId: "section_13",
    },
    {
      id: 14,
      title:"Indemnity",
      sectionId: "section_14",
    },
    {
      id: 15,
      title:"Governing Law",
      sectionId: "section_15",
    },
    {
      id: 16,
      title:"Dispute Resolution",
      sectionId: "section_16",
    },
    {
      id: 17,
      title:"Further Terms",
      sectionId: "section_17",
    },
    {
      id: 18,
      title:"Severability",
      sectionId: "section_18",
    },
    {
      id: 19,
      title:"Disclaimer",
      sectionId: "section_19",
    },
    {
      id: 20,
      title:"Contact Us",
      sectionId: "section_20",
    },
    
  ];




  return (
    <>
      <div className="flex flex-col font-mtn items-start px-8 xl:px-0 m-0 pb-2xl h-full w-full relative bg-[url('/assets/pic/terms.png')] bg-right-top bg-no-repeat">
        <div className="w-full mx-auto lg:max-w-[1158px] relative">
          <Navbar />
        </div>
        <div className="pt-8 lg:pt-[70px] flex flex-col items-start w-full">
          {/* Discover  Our Partner Portal */}
          <div className="w-full mx-auto lg:max-w-[1158px] relative">
            <div className="flex flex-col gap-0 w-full lg:max-w-[1170px] mx-auto">
              
              <h3 className="text-mtn text-center text-[20px] font-mtn font-semibold mb-6">
              MTN Partner Portal  T & C
              </h3>

              <p className=" text-white text-center tracking-[-4%] font-mtn-extrabold text-[24px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[80px] md:leading-[54px] pb-5">
              Terms of Use
              </p>
              <p className=" text-white text-center font-mtn-extralight text-[18px] leading-[22px] sm:text-[16px] sm:leading-[28px] p-4 sm:pb-0 max-w-[480px] mx-auto font-semibold">
                Last Updated: May 7, 2023
              </p>
            </div>
          </div>
        </div>


        <div className="border-1 border-white/10 border-solid rounded-3xl w-full relative lg:max-w-[1158px] mx-auto min-h-[400px] mt-20">
            <div className="px-10 py-10 flex  flex-row gap-[23px]">
                <ul className="h-auto w-[208px] border-r-1 border-white/10 border-solid list-disc list-outside flex flex-col gap-[30px] px-[12px] py-[15px] max-[700px]:hidden">
                  {LinkList.map((title)=>(
                      
                        <li 
                          key={title.id}
                          className="text-[18px]  text-white/60 hover:text-mtn-400 transition ease-out 500 cursor-pointer"
                          onClick={() => handleClickScroll(title.sectionId)}
                        >
                          {title.title}
                        </li>
                      
                    ))}
                </ul>

                <div className="min-h-[400px] md:w-[calc(100%-208px)] text-[16px] text-white/70  font-mtn-light">
                  <p>
                  The MTN Partner Portal (the “Portal”) is a platform where MTN establishes and manages its contractual relationship with its Service Providers.
                    <br/><br/>
                  These Terms and Conditions govern your relationship with us and specify how you are permitted to access and use the Portal. Your use of the Portal is subject to your acceptance without modification of the terms, conditions, and notices contained in these Terms and which form part of these Terms. You also agree to comply with all applicable laws and regulations, as well as all rules or restrictions that are posted on the Portal. If you disagree with these Terms or any part thereof, you are expressly prohibited from using the Portal and you must discontinue immediately.
                  <br/><br/>
                  The following terms shall have the specific meanings assigned to them in these Terms and Conditions:
                  <br/><br/>
                  <strong>"Service Provider", "you" and “your”</strong> refers to the value-added services provider, aggregator, technical provider and content provider using the Portal and accepting the Terms and Conditions.
                  <br/><br/>
                  <strong>"MTN/we/us/our"</strong>, refers to MTN Nigeria Communications PLC.
                  <br/><br/>
                  <strong>“Personal Information”</strong> shall refer to any information relating to an identified or identifiable natural person, including those identified under clause 13 and as defined under the Nigerian Data Protection Regulation; and
                  <br/><br/>
                  <strong>“Privacy Policy”</strong> shall refer to MTN’s privacy policy which is accessible below.
                  <br/><br/>
                  <strong>“Service”</strong> refers to MTN Partner Portal and all other services connected to the Portal.
                  <br/><br/>
                  <strong>“Terms”</strong> shall refer to these terms and conditions.
                  </p>
                
                    <section id='section_1'>
                        <DocumentationH2Title text="1. Binding Agreement"/>
                        <p>You agree that the use of the Portal constitutes Your acceptance of these Terms. These Terms form a binding legal agreement between you and MTN with respect to the use of the Portal. All requirements within these Terms will be strictly enforced. Therefore, please ensure you understand and agree to be bound by these Terms. Also, note that MTN reserves the right to refuse access to the Portal to any Service Provider for any reason and at any time.</p>
                    </section>
                    
                    <section id='section_2'>
                          <DocumentationH2Title text="2. Service Provider Representations"/>
                          <p>
                            By using the Portal, you represent and warrant the following:
                            <br/><br/>
                            2.1. All registration information you submit will be true, accurate, current and complete;
                            <br/><br/>
                            2.2. You will maintain the accuracy of such information and promptly update such registration information as necessary;
                            <br/><br/>
                            2.3. You have the legal capacity and you are duly authorised by your legal entity to register and accept these Terms.
                            <br/><br/>
                            2.4. You will be solely responsible for your acts on the Portal including those conducted under the username assigned to you.
                            <br/><br/>
                            2.5. You will not use the Portal for any illegal or unauthorized purpose.
                            <br/><br/>
                            2.6. Your use of the Portal will not violate any applicable law or regulation.
                            <br/><br/>
                            2.7. If you provide any information that is untrue, inaccurate, not current or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Portal (or any portion thereof).
                          </p>
                    </section>


                    <section id='section_3'>
                          <DocumentationH2Title text="3. Account Registration"/>
                          <p>3.1. In order to use the Portal, you must create an account and provide accurate and complete registration information such as the following:</p>
                          
                          <ul className="flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                            <div>a. Your company's registered name</div>
                            <div>b. Your company's incorporation documents.</div>
                            <div>c. Your company's registered email address and Phone number</div>
                            <div>d. Your user Identity and password.</div>
                            <div>e. Current tax clearance certificate of the Service Provider.</div>
                            <div>f. Your account contact information.</div>
                            <div>g. Any other documentation and/or information required to complete your registration on the Portal.</div>
                          </ul>
                          <p>
                          3.2. You are solely responsible for maintaining the confidentiality of your login credentials, and you are fully
                          responsible for all activities that occur under your account. You shall not grant the rights over your account to
                          any third party. If you provide permission to any third party to manage your account on your behalf this shall
                          be at your own risk.
                          <br/><br/>
                          3.3. You must notify MTN immediately of any unauthorized use of your account or any other breach of security.
                          <br/><br/>
                          3.4. We may suspend or cancel your account for the following reasons:
                          </p>
                          <ul className="flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                            <div>a. Breach of the material terms of your agreement with MTN.</div>
                            <div>b. Failure to obtain or renew your licenses as applicable.</div>
                            <div>c. A breach of the terms of your agreement with MTN</div>
                          </ul>
                    </section>


                    <section id='section_4'>
                        <DocumentationH2Title text="4. Use of the Service"/>
                        <p>
                          MTN grants you a limited, revocable, non-transferable, non-sub-licensable, non-exclusive license to access and use the Portal (including any updates or upgrades) via the website 
                          {' '}<Link href="/" title="MTN Digital Partner Portal" className="text-mtn-400 underline">MTN Digital Partner Portal | MTN Digital Partner</Link> {' '}
                           or your use as a Service Provider, for non-commercial-purposes only and subject to these Terms. The license is limited to you alone and cannot be transferred by you to a third party.
                          <br/>
                          Internet access is necessary to use, access, or view the Portal. Any fees your service provider or other third parties may charge you for utilizing data, phone, or text services while using the Service are your responsibility.
                        </p>
                    </section>



                    <section id='section_5'>
                          <DocumentationH2Title text="5. Prohibited Activities"/>
                          
                          <p>
                          You may not access or use the Portal for any purpose other than that for which we make the Services
                          available. The Portal may not be used in connection with any commercial activities except those that are
                          specifically endorsed or approved by MTN. As a user of the Portal, you shall not, and shall not permit others to
                          do the following:
                          <br/><br/><br/>
                          5.1. Systematically retrieve data or other content from the Portal to create or compile, directly or indirectly, a
                          collection, compilation, database, or directory without written permission from MTN.
                          <br/><br/>
                          5.2. Circumvent, disable, or otherwise interfere with security related features of the Portal, including features
                          that prevent or restrict the use or copying of any content or enforce limitations on the use of the Portal and/or
                          the content contained therein.
                          <br/><br/>
                          5.3. Upload or transmit (or attempt to upload or to transmit) viruses, trojan horses, spamming or other material
                          that interferes with any Service Provider s uninterrupted use and enjoyment of the Portal or modifies, impairs,
                          disrupts, alters or interferes with the use, features, functions, operation or maintenance the Portal.
                          <br/><br/>
                          5.4. Attempt to impersonate another Service Provider or use the username of another Service Provider.
                          <br/><br/>
                          5.5. Access or use the account of another Service Provider without permission.
                          <br/><br/>
                          5.6. Falsely states, misrepresents, or conceals your affiliation with another person or entity
                          <br/><br/>
                          5.7. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing services to
                          you on the Portal.
                          <br/><br/>
                          5.8. Interfere with, hack, disrupt or create an undue burden on the Portal or the networks or services
                          connected to the Portal.
                          <br/><br/>
                          5.9. Attempt to bypass any measures designed to prevent or restrict access to the Portal or any services
                          connected to the Portal.
                          <br/><br/>
                          5.10. Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the
                          software comprising or in any way making up part of the Portal.
                          <br/><br/>
                          5.11. Use the Portal as part of any effort to compete with MTN.
                          <br/><br/>
                          5.12. Use the Portal for benchmarking, or to compile information for a product or service
                          </p>
                    </section>


                    <section id='section_6'>
                        <DocumentationH2Title text="6. Intellectual Property Rights"/>
                        <p>
                          the Portal, all related trademarks, logos, tag lines, trade names, copyrights, and all other intellectual property
                          assets, right(s), and features within the Portal are protected by intellectual property rights belonging to MTN or
                          to its licensors. No license is granted under this agreement in respect of any such rights.
                          <br/><br/>
                          MTN provides the Portal for non commercial, non exclusive, non transferable, restricted personal use and the
                          Portal may be used for no other purpose without the prior written consent of MTN.
                        </p>
                    </section>


                    <section id='section_7'>
                        <DocumentationH2Title text="7. Privacy"/>
                        <p>
                          MTN may collect certain Personal Information which is required and appropriate for the use of The Portal.
                          Such information shall include your name, location, mailing address, phone number and email address. All
                          personal information shall be stored, processed and dealt with in line with MTN’s Privacy Policy, the Nigerian
                          Data Protection Regulations and any other applicable extant regulations.
                          <br/><br/>
                          For more information on our privacy policy and how we manage your data, please refer to MTN’s Privacy Policy
                          which is accessible below.
                        </p>
                    </section>



                    <section id='section_8'>
                          <DocumentationH2Title text="8. Service Management"/>
                          <p>
                            MTN reserves the right but not the obligation to do the following:
                            <br/><br/>
                            8.1. Monitor the Portal for violations of these Terms;
                            <br/><br/>
                            8.2. Take appropriate legal action against any Service Provider who in our sole discretion, violates the law or
                            these terms, including without limitation, reporting such Service Provider to law enforcement authorities;
                            <br/><br/>
                            8.3. In our sole discretion, without limitation, or liability and without notice to the Service Provider, remove from
                            the Portal or otherwise disable all files and content that are excessive in size or are in any way burdensome to
                            our systems.
                            <br/><br/>
                            8.4. Manage the Portal in a manner designed to protect our rights and property and to facilitate the proper
                            functioning of the Portal.
                          </p>
                    </section>



                    <section id='section_9'>
                        <DocumentationH2Title text="9. Term and Termination"/>
                        <p>
                          These Terms shall remain in full force and effect while you use the Portal. Without limiting any other provision
                          of these Terms, we reserve the right to in our sole discretion and without notice or liability, deny access to and
                          use of the Portal to any Service Provider for breach of any representation, warranty or covenant contained in
                          these Terms or any applicable law or regulation. MTN may in its sole discretion, terminate your use of the
                          Portal or delete your account and any content or information that you posted at any time with reasonable
                          notice to you.
                          <br/><br/>
                          If we terminate or suspend your account for any reason, you are prohibited from registering and creating a
                          new account under your name, a fake or borrowed name, or the name of any third party, even if you may be
                          acting on behalf of the third party.
                        </p>
                    </section>


                    <section id='section_10'>
                        <DocumentationH2Title text="10. Electronic Communications"/>
                        <p>
                          You agree to receive all communications, agreements and notices that we provide in connection with the
                          Portal, including, but not limited to, communications concerning the delivery of the Services on the Portal via
                          electronic means, including by email, text, in product notifications, or by posting them on the Portal. You
                          agree that all communications we provide to you electronically satisfy any legal requirement that such
                          communications be in writing or be delivered in a particular manner and you agree to keep your account
                          contact information current.
                        </p>
                    </section>



                    <section id='section_11'>
                        <DocumentationH2Title text="11. Modifications and Interruptions"/>
                        <p>
                          We reserve the right to change, modify, or remove the contents of the Portal at any time or for any reason at
                          our sole discretion without notice. However, we have no obligation to update any information on the Portal. We
                          also reserve the right to discontinue all or part of the services on the Portal with reasonable notice to you. We
                          will not be liable to you or any third party for any modification, suspension or discontinuance of the services
                          connected to the Portal.
                          <br/><br/>
                          We cannot guarantee the Portal will always be available. We may experience hardware, software or other
                          problems or need to perform maintenance on the Portal, resulting in interruptions, delays or errors. You agree
                          that we have no liability whatsoever for any loss, damage or inconvenience caused by your inability to access
                          or use the Portal during any downtime or discontinuance.
                          <br/><br/>
                          There may be information on the Portal that may contain typographical errors, inaccuracies, or omissions, we
                          reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on
                          the Portal at any time without prior notice.
                        </p>
                    </section>


                    <section id='section_12'>
                        <DocumentationH2Title text="12. Non-Disclosure and Confidentiality"/>
                        <p>
                          Every information, content or incident related to the use of the Portal (<span className='text-mtn-400'>"Confidential Information"</span>) shall be
                          treated with the utmost secrecy and confidentiality by you. Except where authorized by MTN in writing, you
                          shall not disclose such Confidential Information) to any third party whatsoever.
                          <br/><br/>
                          Where Confidential Information is released to or accessed by you in accordance with the requirements as
                          provided above, you shall take all reasonable precautions to preserve the integrity and prevent any corruption
                          or loss, damage or destruction of data and Confidential Information; except to a third party who is bound by a
                          similar confidential obligation and upon prior written authorization of MTN.
                          <br/><br/>
                          The provision of this clause 11 shall continue to apply even after your use of the Portal. Upon receiving MTN’s
                          instruction, you shall erase or cause to be erased all Confidential Information and data provided to you by
                          MTN. You shall provide written confirmation of the deletion to MTN.
                          <br/><br/>
                          Additionally, if so required by law or valid legal or regulatory process, you may disclose such Confidential
                          Information, but only by providing notice to MTN of the requirement to disclose and reasonable cooperation
                          with any attempt by MTN to maintain the confidentiality of such Confidential Information
                        </p>
                    </section>

                    <section id='section_13'>
                        <DocumentationH2Title text="13. Assignment"/>
                        <p>
                          You may not assign your rights or obligations or delegate your responsibilities hereunder without our prior
                          written consent. If consent is given by MTN, these Terms will bind your successors and assigns. Any attempt by
                          you to transfer your rights, duties, or obligations under these Terms except as expressly provided in these
                          Terms is void. MTN may, at any time, freely assign its rights, duties, and obligations hereunder without notice
                          to you.
                        </p>
                    </section>

                    <section id='section_14'>
                        <DocumentationH2Title text="14. Indemnity"/>
                        <p>
                          You shall indemnify MTN and its officers, directors, employees, servants, agents or contractors or other
                          persons against any loss, damage, liability, claim or demand by third parties in relation to your breach of these
                          Terms.
                        </p>
                    </section>

                    <section id='section_15'>
                        <DocumentationH2Title text="15. Governing Law"/>
                        <p>
                          These Terms shall be governed by, subject to, and construed in accordance with the laws of the Federal
                          Republic of Nigeria.
                        </p>
                    </section>

                    <section id='section_16'>
                        <DocumentationH2Title text="16. Dispute Resolution"/>
                        <p>
                          In the event of a dispute or difference in connection with or in relation to these Terms or its performance,
                          construction or interpretation, the party alleging the dispute shall provide a written notice, giving particulars
                          of the dispute (“the Notice of Dispute”) to the other party. Dispute resolution shall be by negotiation, followed
                          by mediation if unresolved by negotiation within fourteen (14) business days of service of the Notice of
                          Dispute. If the dispute is still not resolved after fourteen (14) business days of it being referred to mediation,
                          the dispute shall then be resolved by litigation.
                        </p>
                    </section>


                    <section id='section_17'>
                        <DocumentationH2Title text="17. Further Terms"/>
                        <p>
                          MTN is neither responsible nor liable for any direct, indirect, incidental, consequential, special, exemplary,
                          punitive or other damages arising out of or relating in any way to Your use of the Portal.
                        </p>
                    </section>

                    <section id='section_18'>
                        <DocumentationH2Title text="18. Severability"/>
                        <p>
                          If any of the provisions of these Terms is deemed not enforceable by law, all other provisions outlined in these
                          Terms will still apply.
                        </p>
                    </section>

                    <section id='section_19'>
                        <DocumentationH2Title text="19. Disclaimer"/>
                        <p>
                          Except as expressly provided herein, MTN shall not be liable to you for any liability or expenses, damages, or
                          injuries suffered as a result or in connection with the use of the Portal.
                        </p>
                    </section>

                    <section id='section_20'>
                        <DocumentationH2Title text="20. Contact Us"/>
                        <p>
                        In order to resolve a complaint regarding the services offered on the Portal or to receive further information
                        regarding the use of the Portal, please contact us at <Link href="mailto:VASDigitalProposals@mtn.com" title="Mail" className="text-mtn-400">VASDigitalProposals@mtn.com</Link>.
                        </p>
                    </section>

                </div>
            </div>
        </div>

        <div className="w-full mt-20 mx-auto lg:max-w-[1158px] relative">
          <Footer />
        </div>
      </div>
    </>
  );
}
