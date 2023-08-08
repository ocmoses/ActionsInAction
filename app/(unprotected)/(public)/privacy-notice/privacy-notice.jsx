"use client";
import Link from 'next/link'
import Navbar from "@/app/components/Navbar";
import useApp from "@/hooks/useApp";
import Footer from "@/app/components/public/Footer";
import { useEffect, useRef } from "react";
import  DocumentationH2Title, {DocumentationH3Title} from "@/app/components/public/DocumentationComponent";

export default function Privacy() {
 
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
      title:"Who are we?",
      sectionId: "section_1",
    },
    {
      id: 2,
      title:"Who does this notice apply to?",
      sectionId: "section_2",
    },
    {
      id: 3,
      title:"Important terms you need to understand when reading this notice?",
      sectionId: "section_3",
    },
    {
      id: 4,
      title:"What Personal Data does MTN collect and use?",
      sectionId: "section_4",
    },
    {
      id: 5,
      title:"Where does MTN collect my Personal Data from?",
      sectionId: "section_5",
    },
    {
      id: 6,
      title:"For what purposes does MTN use your Personal Data?",
      sectionId: "section_6",
    },
    {
      id: 7,
      title:"Is MTN allowed to Process my Personal Data?",
      sectionId: "section_7",
    },
    {
      id: 8,
      title:"Is it mandatory to provide MTN the Personal Data asked for?",
      sectionId: "section_8",
    },
    {
      id: 9,
      title:"How long does MTN keep my Personal Data for?",
      sectionId: "section_9",
    },
    {
      id: 10,
      title:"Does MTN transfer my Personal Data to third parties?",
      sectionId: "section_10",
    },
    {
      id: 11,
      title:"Does MTN transfer my Personal Data internationally?",
      sectionId: "section_11",
    },
    {
      id: 12,
      title:"How does MTN secure my Personal Data?",
      sectionId: "section_12",
    },
    {
      id: 13,
      title:"How does MTN handle Personal Data Breaches?",
      sectionId: "section_13",
    },
    {
      id: 14,
      title:"What are my rights?",
      sectionId: "section_14",
    },
    {
      id: 15,
      title:"Contact us",
      sectionId: "section_15",
    },
    {
      id: 16,
      title:"Changes to privacy policy",
      sectionId: "section_16",
    },
    
  ];




  return (
    <>
      <div className="flex flex-col font-mtn items-start px-8 xl:px-0 m-0 pb-2xl h-full w-full relative bg-[url('/assets/pic/privacy-notice.png')] bg-right-top bg-no-repeat">
        <div className="w-full mx-auto lg:max-w-[1158px] relative">
          <Navbar />
        </div>
        <div className="pt-8 lg:pt-[70px] flex flex-col items-start w-full">
          {/* Discover  Our Partner Portal */}
          <div className="w-full mx-auto lg:max-w-[1158px] relative">
            <div className="flex flex-col gap-0 w-full lg:max-w-[1170px] mx-auto">
              
              <h3 className="text-mtn text-center text-[20px] font-mtn font-semibold mb-6">
                MTN Partner Portal
              </h3>

              <p className=" text-white text-center tracking-[-4%] font-mtn-extrabold text-[24px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[80px] md:leading-[54px] pb-5">
              Privacy Notice
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
                  <p>We respect your right to privacy, it is very important to us, and we take the protection of your privacy and ensuring the security of your Personal Data very seriously.</p>
                  <br/>
                  <p>We are committed to the fair and transparent Processing of your Personal Data. This Privacy Notice describes how we Process your Personal Data, explain your rights in relation to the Personal Data we Process, and states our commitment when Processing your Personal Data in a compliant, ethical and secure manner.</p>
                
                    <section id="section_1">
                          <DocumentationH2Title text="Who are we?"/>
                          <p>In this privacy notice “MTN”, “we”, “our” and “us” refers to MTN Nigeria Communication Plc (“MTN”) a public limited liability company, incorporated in the Federal Republic of Nigeria with registration number 395010 and its principal office at MTN Plaza, Falomo Roundabout, Awolowo Road, Ikoyi, Lagos.</p>
                    </section>
                    
                    <section id="section_2">
                          <DocumentationH2Title text="Who does this notice apply to?"/>
                          <p>This notice applies to individuals that are:</p>
                          
                          <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                            <li>Any person(s) who contracts with us for the provision of products and services, or who purchases a product from us (“customers”), including potential customers to the extent MTN Processes your Personal Data;</li>
                            <li>Any person(s) who uses our website, mobile applications or any products or services (“users”);</li>
                            <li>All suppliers, contractors, partners and service providers of MTN (“suppliers”) including potential suppliers to the extent MTN Processes your Personal Data;</li>
                            <li>Resellers such a MTN distributors and agents as well as partners (“resellers”) including potential resellers to the extent MTN Processes your Personal Data;</li>
                            <li>All visitors of MTN premises whose details are captured via our visitors’ register, visitors management system, CCTV cameras etc; and</li>
                            <li>Any other persons (save for employees and job applicants) who share Personal Data with MTN including beneficiaries, trustees or donors to MTN trusts or charitable causes; MTN guests (“other Data Subjects”).</li>
                          </ul>
                    </section>

                    <section id="section_3">
                          <DocumentationH2Title text="Important terms you need to understand when reading this notice?"/>
                          <DocumentationH3Title text="Data Subject"/>
                            <p className="pl-10">Means an identified or identifiable natural person. An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier or one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person. It shall also include any additional persons afforded data privacy rights and protection of Personal Data in terms of Applicable Data Privacy Law(s).</p>
                            <DocumentationH3Title text="Local Regulatory Requirements"/>
                            <p className="pl-10">
                              Legal, statutory, regulatory, license conditions rules, guidelines, Ministerial/National Security orders or directives, and Directives relating to Public safety (where applicable) and Data Sovereignty*-related requirements with which MTN is required to comply by applicable authorities in the jurisdictions in which MTN operates or where Personal Data is Processed by MTN or on its behalf.
                              <br/><br/>
                              *Data Sovereignty relates to the laws and governance structures that Personal Data is subject to, due to the geographical location of where it is Processed.
                            </p>
                           
                            <DocumentationH3Title text="Personal Data"/>
                            <p className="pl-5">Means any information relating to a Data Subject. Examples of “Personal Data” includes, but is not limited to, the following:</p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>a name;</li>
                              <li>any identifying number, symbol;</li>
                              <li>contact information (e.g. e-mail address, postal address, telephone number);</li>
                              <li>location data or physical address;</li>
                              <li>online identifier or unique identifier such as but not limited to MAC address, IP address, IMEI number, IMSI number or other assignment to the person;</li>
                              <li>the biometric information of the Data Subject;</li>
                              <li>the personal opinions, views or preferences of the Data Subject;</li>
                              <li>correspondence sent by the Data Subject that is implicitly or explicitly of a private or confidential nature or further correspondence that would reveal the contents of the original correspondence;</li>
                              <li>the views or opinions of another person about the Data Subject;</li>
                              <li>the name of the Data Subject if it appears with other Personal Data relating to the Data Subject or if the disclosure of the name itself would reveal information about the Data Subject; and</li>
                              <li>Sensitive Personal Data.</li>
                            </ul>
                            
                            <DocumentationH3Title text="Processing"/>
                            <p className="pl-5">Any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, including collection, receipt, recording, organisation, structuring, collation, storage; adaptation or alteration, updating, retrieval, consultation, use, dissemination, disclosure by means of transmission; or otherwise making available, alignment or combination, merging, restriction, erasure, destruction, and/or degradation.</p>
                            <DocumentationH3Title text="Sensitive Personal Data"/>
                            <p className="pl-5">A sub-set of Personal Data which is considered more sensitive than other categories of Personal Data. Sensitive Personal Data includes but is not limited to Personal Data revealing a Data Subject’s racial or ethnic origin; political opinions or persuasions; religious or philosophical beliefs; trade union membership; criminal behaviour relating to the alleged commission of a crime or proceedings relating to the alleged commission of a crime; genetic data; biometric data; data concerning health; and/or data concerning a Data Subject’s sex life or sexual orientation.</p>
                            
                    </section>

                    <section id="section_4">
                          <DocumentationH2Title text="What Personal Data does MTN collect and use?"/>
                          <p className="pl-5">
                            To run our business, we may be required to collect, use, store and otherwise Process your Personal Data. The Personal Data that we may collect and Process can vary depending on the MTN products and services that you use, contract for or that you supply to us; how you may be using or delivering those products and services; and the means by which you may be interacting with us.
                            <br/><br/>
                            We will only collect the Personal Data of yours that is adequate, relevant and limited to what is needed in relation to the specific purposes for which we are collecting it, as described in this privacy notice.
                            <br/><br/>
                            The Personal Data collected and Processed by us may include:
                          </p>
                          <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>account and contact information: which may include your name, contact information (email address, postal address, residential address, telephone number), date of birth, identifying numbers (identity document number, passport numbers and/or national identification number (NIN) other national ID numbers as required); billing information; financial information; any other information required to comply with regulatory requirements;</li>
                              <li>location information: we collect information regarding your physical location / geolocation when you use your device, our products or services and they connect with cellphone towers, wifi routers, bluetooth, beacons, GPS satelites and/or other MTN technologies or infrastructure;</li>
                              <li>network performance: we collect information which inform our network performance such as your use of our products, services or equipment;</li>
                              <li>financial information: such as your bank account or credit card details; financial history (including information to determine your creditworthiness);</li>
                              <li>usage of your devices, our services and products: data usage (including browsing history); telephone records (including information regarding your incoming and outgoing telephone calls); text message records; video streaming (including your selected packages and usage); purchase activities; and other similar information;</li>
                              <li>web browsing and application usage: we collect your Personal Data when you visit our website or use our mobile applications. This may include, your IP address, browser type; operating system; mobile carrier; your ISP; URLs of sites from which you arrive or leave the website and mobile applications and sites that have our platform technology embedded; time you spend on our website or mobile applications; links or advertisements you see; purchases made through our website; first party cookies and other web tracking technologies. We may also collect information identifying or related to equipment accessing our networks including the software, configuration, equipment type and other unique identifiers (such as your username and password). Third party cookies will also be collected from our selected marketing technology partner(s), third party websites and applications.</li>
                              <li>supplier, reseller, contract and service provider information: which may include name, contact information, billing information, background checks, financial history, employment history, tax information, information related to your performance; any other information which may be required in terms of regulatory requirements applicable to MTN and/or our policies;</li>
                              <li>multimedia data: such as unaltered photographs, audio recordings, or video recordings;</li>
                              <li>social media information: we collect your information related to your interaction with our social media accounts, content and marketing campaigns (including your details when you enter into a competition or interact with an advertisements; your comments, your reactions (i.e. ‘likes’)), Personal Data available from your public profile and information you have allowed social media platforms to share with us in terms of your privacy preferences on that platform; and your social media handles;</li>
                              <li>biometric information: such as images of you, fingerprints, voice recording or voiceprint, scan of your face in order to identify you in respect of registration of your MSISDN, any form of account, or during your interaction with our customer service team etc;</li>
                              <li>demographic information: we may collect information related to your gender, race or ethnic origin, age, education, financial status;</li>
                              <li>views, opinions and interests: we collect information regarding your views, opinions and preferences (for example when you participate in a survey or when you provide feedback regarding our products or services or online based behaviour) as well as your interests. In the case of suppliers and resellers, we will obtain the views and opinions of others regarding your performance (e.g. references).</li>
                              <li>Cookies: We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies on our website.</li>
                              <li>
                                The cookies that are categorized as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site.
                                <br/><br/>
                                We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.
                                <br/><br/>
                                You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.
                              </li>
                              
                          </ul>
                    </section>






                    <section id="section_5">
                          <DocumentationH2Title text="Where does MTN collect my Personal Data from?"/>
                          <p className="pl-5">
                            In most circumstances we collect Personal Data directly from you, for instance, when you buy or use any of our products or services, visit our website or premises, interact with our customer services departments or enter into business relationship with us.
                            <br/>
                            In some instances, however, we will also collect your Personal Data indirectly from third parties, such as from:
                          </p>
                          <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Credit check or vetting agencies;</li>
                              <li>Social media platforms;</li>
                              <li>Marketing agencies;</li>
                              <li>Other entities within the MTN Group (e.g. based on the usage of their applications, websites and sharing of Personal Data);</li>
                              <li>Third parties providing supplier and reseller references.</li>
                          </ul>
                    </section>







                    <section id="section_6">
                          <DocumentationH2Title text="For what purposes does MTN use your Personal Data?"/>
                          <p className="pl-5">
                            MTN will use your Personal Data for purposes of:
                          </p>
                          <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Verification: we Process Personal Data necessary to verify your identity when you are purchasing our products and services, when you make contact with us, or when we contact you;</li>
                              <li>Credit checks: we perform credit checks, including using the services of a credit bureau, where you are applying for a contract for products and/or services with us, and to assess your application;</li>
                              <li>Contracting and processing orders: we Process your Personal Data in order to conclude and contract, to process your request to provide products and services and to keep you updated with your order progress and to provide our products and services to you;</li>
                              <li>Billing and collection: your Personal Data is Processed to perform billing of your account for your use of our products and services. We also Process your Personal Data to collect outstanding monies due to us through our collection processes;</li>
                              <li>Monitor and improve services: we perform research and statistical analysis on our customers’ and/or users’ behaviour for purposes of monitoring the performance of our network, products and services and maintaining or improving our products and services to you;</li>
                              <li>Improve value proposition: we analyse our customers and/or users preferences and interests based on their use of MTN websites, mobile applications, products, services and/or social media interactions to improve on our services, products, to perform marketing, online behavioural advertising and to develop new services or products which may be suitable to you;</li>
                              <li>Network performance: we Process your Personal Data to protect our network and manage the volume of calls, texts and other use of our network. For example, we identify peak periods of use, so we can ensure the network can handle the volume during those times.</li>
                              <li>Marketing: we use your Personal Data to promote and/or market our products and services to you by means of text and voice messaging, email, post, telephone calls, or through social media campaigns, but only if this is permitted in terms of our policies, laws and regulations and you have not opted-out from the type of direct marketing communications (e.g., where you have opted-out of certain categories of direct marketing but not all categories of direct marketing).</li>
                              <li>Fraud and crime prevention: we Process your Personal Data to detect and prevent fraud or criminal activity through the use of our products or services and to safeguard our IT systems, networks, assets, buildings and places of work;</li>
                              <li>Compliance and Reporting: we Process your Personal Data where this is required to comply with any legal obligations imposed on MTN by applicable law or in response to directives from law enforcement or court orders (for example “know your client” requirements) and to discharge any prescribe reporting obligations.</li>
                              <li>Customer service: we Process your Personal Data to provide you with customer services including to respond to any question, query, requests, concerns or complaints you may have about MTN, including our network, products, services, employees or our Processing activities.</li>
                            </ul> 
                              
                            <p className="pl-5">
                              MTN will not further Process Personal Data for any purpose that is incompatible with the original purpose that the Personal Data was collected for unless:
                            </p>   
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Such further Processing is authorized in terms of applicable data privacy laws;</li>
                              <li>We have obtained your consent to the further Processing;</li>
                              <li>The further Processing is necessary to comply with an obligation imposed by Local Regulatory Requirements or for conducting proceedings in a court or tribunal; or</li>
                          </ul>
                    </section>




                    <section id="section_7">
                          <DocumentationH2Title text="Is MTN allowed to Process my Personal Data?"/>
                          <p className="pl-5">
                          We are allowed to Process your Personal Data, so long as we have a legal basis to do so (i.e. there is a justification to Process your Personal Data in terms of laws applicable to MTN and/or our policies permit such Processing). When we Process your Personal Data, we will rely on one of the following legal bases, as appropriate, having regard to the purpose of Processing:
                          </p>
                          <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Performance of a contract: this is when the Processing of your Personal Data is necessary to conclude a contract or perform our obligations under a contract entered into with you</li>
                              <li>Legal obligation: this is when we are required to Process your Personal Data to comply with a legal obligation</li>
                              <li>Vital interests of the data subject or another natural person: the Processing is necessary to protect the vital interests of the relevant Data Subject or of another natural person</li>
                              <li>Public Interest: the Processing is necessary for the performance of a task carried out in the public interest</li>
                              <li>Your consent: in some cases, we will ask you for specific permission to Process some of your Personal Data. This consent may withdrawn at any time.</li>
                            </ul> 
                              
                            <p className="pl-5">
                            In those instances when we Process your Sensitive Personal Data, we will rely on one of the following legal bases as appropriate having regard to the purpose of Processing:
                            </p>   
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>You have given explicit consent to the Processing of your Sensitive Personal Data for one or more specified purposes. You may withdraw such consent at any time;</li>
                              <li>Processing is necessary to protect your vital interests or of another natural person and you are physically or legally incapable of giving consent;</li>
                              <li>Processing relates to Sensitive Personal Data which was intentionally made public by you;</li>
                              <li>Processing is necessary for the establishment, exercise or defense of legal claims or whenever courts are acting in their judicial capacity;</li>
                              <li>Processing is necessary for scientific or historical research purposes or statistical purposes provided such Processing is proportionate to the aim pursued, MTN respects the essence of the right to data protection and MTN provides for suitable and specific measures to safeguard your fundamental rights and the interests.</li>
                              <li>Processing of Personal Data related to criminal behaviour is obtained and used in accordance with Local Regulatory Requirements.</li>
                          </ul>
                    </section>



                    <section id="section_8">
                          <DocumentationH2Title text="Is it mandatory to provide MTN the Personal Data asked for?"/>
                          <p className="pl-5">
                          It is not mandatory for you to provide any Personal Data to us. However, failing to provide certain Personal Data to us, particularly where that Personal Data has been requested by us may impact our ability to, amongst other things:
                          </p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>provide our products or services to you;</li>
                              <li>to support you with and manage our products and services;</li>
                              <li>provide you full functionality to all our webpages;</li>
                              <li>on-board you as supplier, reseller, contractor or service provider;</li>
                              <li>to allow you access to our premises or buildings.</li>
                            </ul> 
                    </section>




                    <section id="section_9">
                          <DocumentationH2Title text="How long does MTN keep my Personal Data for?"/>
                          <p className="pl-5">
                            We will not retain your Personal Data for any longer than is necessary for achieving the purpose(s) for which the Personal Data is Processed, unless:
                          </p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>retention of the Personal Data is required or authorized by Local laws;</li>
                              <li>you have consented to the retention of the Personal Data; or</li>
                              <li>the Personal Data is required for historical, statistical or research purposes and provided that we have established appropriate safeguards against the Personal Data being used for any other purposes.</li>
                            </ul>

                          <p className="pl-5">
                          We will ensure that Personal Data which is no longer required, or which we are no longer authorised to retain, is as soon as reasonably practicable, de-identified or destroyed through secure means, alternatively through permanent erasure by appropriate and effective mechanisms.
                          </p>
                    </section>



                    <section id="section_10">
                          <DocumentationH2Title text="Does MTN transfer my Personal Data to third parties?"/>
                          <p className="pl-5">
                          Yes, we do share Personal Data with affiliated third parties, as necessary for our legitimate business needs, to carry out your requests, and/or as required or permitted by law. This would include:
                          </p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Our service providers: We transfer your Personal Data to our third-party service providers, such as our (IT) systems providers, our hosting providers, consultants (such as legal advisers) and other goods and services providers. These providers Process your Personal Data on behalf of MTN in terms of a binding agreement with appropriate security safeguards. MTN will only transfer Personal Data to such a service provider when they meet our strict standards on the Processing of data and security. We only share Personal Data that allows our service providers to provide their services and they are not allowed to Process your Personal Data for any other purpose.</li>
                              <li> If we are reorganized or sold to another organization: MTN may disclose Personal Data in connection with the sale, assignment, or other transfer of the business to which the data relates.</li>
                              <li>Courts, tribunals, law enforcement, or regulatory bodies: MTN may disclose Personal Data in order to respond to requests of courts, tribunals, government, or law enforcement agencies or where it is necessary or prudent to comply with applicable laws, court or tribunal orders or rules, or government regulations.</li>
                              <li>Audits: disclosures of Personal Data may also be needed by our auditors including to perform financial audits, data privacy or security audits and/or to investigate or respond to a complaint or security threat.</li>
                              <li>Insurers: our business requirements mean that we carry significant insurance cover in respect of business activities. There are several different participants in the insurance market (e.g., brokers, insurers, and reinsurers, as well as their professional advisors and other third parties involved should there be a claim). Some of these insurance market participants will require that we disclose Personal Data about you to them. The information will be used by the insurance market participants in the underwriting and ongoing administration of the insurance products, where there is a claim that you are relevant to and to allow the insurance market participants to comply with their legal and regulatory obligations. Some of these insurance market participants will handle this information on our behalf (like our service providers described above), but others will want to Process information about you independent of us.</li>
                              <li>Other third parties: we may share information with other third parties who use MTN platforms / systems to advertise their product. However, the Personal Data collected is anonymized and/or aggregated prior to sharing with such third parties.</li>
                            </ul>
                    </section>


                    <section id="section_11">
                          <DocumentationH2Title text="Does MTN transfer my Personal Data internationally?"/>
                          <p className="pl-5">
                          Yes, MTN transfers Personal Data outside of Nigeria but only if such transfers are permitted in terms of Local Regulatory Requirements.
                          <br/><br/>
                          MTN may transfer your Personal Data to other entities within the MTN group of companies. All MTN entities are bound by binding corporate rules which ensures that the MTN entity receiving your Personal Data protects your Personal Data in accordance with those binding corporate rules.
                          <br/><br/>
                          MTN also transfers certain Personal Data outside of Nigeria to third parties working with us or on our behalf for the purposes described in this Privacy Notice. When transferring Personal Data internationally to third parties we ensure your Personal Data will continue to be protected for example, by entering to binding data transfer agreements or by ensuring there are adequate data privacy laws, which requires the relevant third party to adhere to the data handling and data protection requirements, acceptable to MTN.
                          </p>
                    </section>



                    <section id="section_12">
                          <DocumentationH2Title text="How does MTN secure my Personal Data?"/>
                          <p className="pl-5">
                          MTN secures the integrity and confidentiality of the Personal Data in its possession or under its control by implementing appropriate, reasonable technical, physical, and organizational measures to prevent:
                          </p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>accidental loss of, damage to, or unauthorized destruction of your Personal Data;</li>
                              <li>unlawful or unauthorized access to your Personal Data; and</li>
                              <li>unlawful or unauthorized Processing of your Personal Data.</li>
                            </ul>
                          <p className="pl-5">
                          As part of its processes, MTN takes reasonable measures to regularly identify and assess all reasonably foreseeable internal and external risks to Personal Data in its possession or under its control and implements reasonable and appropriate technical, physical and organizational security measures to protect against the identified risks.
                          </p>
                    </section>


                    <section id="section_13">
                          <DocumentationH2Title text="How does MTN handle Personal Data Breaches?"/>
                          <p className="pl-5">
                          While MTN implements reasonable measures to prevent or reduce the likelihood and impact of Personal Data Breaches, this risk can’t be completely eliminated. If MTN becomes aware of or reasonably suspects a Personal Data Breach has occurred or that the integrity or confidentiality of Personal Data has been compromised, MTN adheres to its incident management Policies, Procedures and supporting documents governing the handling and reporting of Personal Data Breaches. MTN will report personal data breaches to the Data Privacy Regulator within 72 hours of knowledge of such breach.
                          </p>
                    </section>



                    <section id="section_14">
                          <DocumentationH2Title text="What are my rights?"/>
                          <p className="pl-5">
                          If MTN Processes Personal Data about you, you have the following rights:
                          </p>
                            <ul className="list-disc list-outside flex flex-col gap-[15px] py-[15px] p-0 pl-10">
                              <li>Access and correction: you have the right to access the Personal Data retained by MTN. This is sometimes called a ‘Data Subject Access Request’. If we agree that we are obliged to provide Personal Data to you, we will provide it to you free of charge. Before providing Personal Data to you, we may ask for proof of identity and sufficient information about your interactions with us that we can locate your Personal Data. If the Personal Data we hold about you is incorrect, you are entitled to ask us to correct any inaccuracies in the Personal Data.</li>
                              <li>Object to Processing: you have the right to object to us Processing your Personal Data, on grounds relating to your particular situation, under certain circumstances (including to receiving direct marketing from us). For example, if we are Processing your Personal Data on the basis that is necessary for purposes of our or a third party’s legitimate interest or in the public interest. You may also object if you believe there is no legal basis for us to Process your Personal Data anymore.</li>
                              <li>Withdraw consent: you also have the right to withdraw your consent at any time and we cease Processing your Personal Data unless there is an alternative legal basis to continue Processing your Personal Data. We will advise you if we intend to continue Processing your Personal Data in these circumstances.</li>
                              <li>Disposal / Restrictions: in addition, you may have rights to have your information deleted / destroyed if we are keeping it too long or have no legal basis to Process it. You may also request that the Processing of your Personal Data is restricted in certain circumstances.</li>
                              <li>Receive information: You have the right to receive your Personal Data in a commonly used and machine-readable format and the right to transmit these data to another Data Controller when the processing is based on (explicit) consent or when the processing is necessary for the performance of a contract.</li>
                              <li>Lodge complaints: you have the right to lodge a complaint regarding the way your Personal Data is being Processed with MTN or if you believe there has been a breach of MTN privacy policies and/or data privacy laws.</li>
                            </ul>
                          <p className="pl-5">
                          You can make a request or exercise these rights by contacting MTN at MTN Data Protection Officer (DPO) DPONigeria@mtn.com and we will make all reasonable and practical efforts to comply with your request, so long as it is consistent with applicable law and internal policies.
                          </p>
                    </section>


                    <section id="section_15">
                          <DocumentationH2Title text="Contact us"/>
                          <p className="pl-5">
                          If you have any questions or concerns regarding this Privacy Notice and would like further information about how we protect your information and/or when you want to contact your local Data Protection Officer (DPO), please email us at DPONigeria@mtn.com or visit the MTN Nigeria Communication Plc (“MTN”) at its principal office at MTN Plaza, Falomo Roundabout, Awolowo Road, Ikoyi, Lagos
                          </p>
                    </section>

                    <section id="section_16">
                          <DocumentationH2Title text="Changes to privacy policy"/>
                          <p className="pl-5">
                          MTN may modify this Privacy Notice from time to time to reflect our current privacy practices. When we make changes to this notice, we will revise the “effective” date at the top of this notice.
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
