"use client"
import { TailSpinPreloader, CompanyLogo, DialIcon } from "@/app/components/Icons";
import {
    getPartnerInitials,
    filterPartner,
    Util,
    titleCase,
    getInitials,
    capitalizeFirst,
  } from "@/app/modules/utilities";
  import Image from "next/image";
  import {useEffect, useState} from "react";


export default function ServicesTab({partner}){

    const [services, setServices] = useState([]);

    const [currentService, setCurrentService] = useState(null);

    const cleanShortcodes = (shortcodes) => {
        return shortcodes.replace("[\"", "").replace("\"]", "").split("\",\"").join(",") + "";
    }

    useEffect(() => {
        if(partner.service){
            setServices(partner.service);
        } 
        
    }, []);

    return (
        <div className="flex flex-col p-4 py-16 overflow-y-auto">
            <p className="text-white text-3xl mb-4">Services ({services.length})</p>
            {
                services.map((service, index) => (
                    <div className="bg-black rounded-2xl mb-4">
                        <div className="rounded bg-black p-4 flex items-center">
                            <span className="w-8 h-8 rounded-full border-1 border-white/40 flex justify-center items-center text-white text-sm">
                                {index + 1}
                            </span>
                            <span className="text-white/80 ml-4">{service.service_name}</span>
                            <span className="bg-white/10 rounded py-1 px-2 text-sm ml-auto text-white">{service.category}</span>
                            <span className="cursor-pointer mx-4">
                            {
                                    currentService != service ? (
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => setCurrentService(service)}>
                                            <path d="M0.743999 1.244C0.646094 1.3418 0.568425 1.45793 0.515433 1.58577C0.462441 1.7136 0.435165 1.85062 0.435165 1.989C0.435165 2.12739 0.462441 2.26441 0.515433 2.39224C0.568425 2.52007 0.646094 2.63621 0.743999 2.734L5.291 7.291C5.38389 7.38413 5.49424 7.45802 5.61573 7.50843C5.73722 7.55884 5.86746 7.58479 5.999 7.58479C6.13053 7.58479 6.26078 7.55884 6.38227 7.50843C6.50376 7.45802 6.61411 7.38413 6.707 7.291L11.257 2.733C11.4543 2.53568 11.5652 2.26806 11.5652 1.989C11.5652 1.70995 11.4543 1.44232 11.257 1.245C11.0597 1.04768 10.7921 0.936829 10.513 0.936829C10.2339 0.936829 9.96632 1.04768 9.769 1.245L5.999 5.021L2.231 1.245C2.13339 1.14731 2.01749 1.06981 1.88991 1.01693C1.76234 0.964058 1.6256 0.936842 1.4875 0.936842C1.3494 0.936842 1.21266 0.964058 1.08508 1.01693C0.957508 1.06981 0.841605 1.14731 0.743999 1.245V1.244Z" fill="#8E8E8E"/>
                                        </svg>) : (
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => setCurrentService(null)}>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.294 1.20799L5.293 1.20899L0.744 5.76799C0.646296 5.86557 0.568768 5.98143 0.515841 6.10896C0.462914 6.2365 0.435625 6.37321 0.435532 6.51129C0.435439 6.64937 0.462544 6.78611 0.5153 6.91372C0.568055 7.04133 0.645428 7.15729 0.743 7.25499C0.940056 7.45231 1.20743 7.56327 1.48629 7.56346C1.62437 7.56355 1.76112 7.53645 1.88873 7.48369C2.01633 7.43094 2.1323 7.35357 2.23 7.25599L2.231 7.25499L6.001 3.47899L9.769 7.25499C9.86646 7.35272 9.98222 7.43028 10.1097 7.48323C10.2371 7.53618 10.3738 7.56348 10.5118 7.56357C10.6498 7.56366 10.7865 7.53655 10.914 7.48377C11.0415 7.43099 11.1574 7.35359 11.255 7.25599H11.256C11.4533 7.05853 11.5642 6.79085 11.5644 6.5117C11.5646 6.23255 11.454 5.96473 11.257 5.76699L6.709 1.20899C6.61619 1.11595 6.50596 1.04211 6.38459 0.991704C6.26323 0.941294 6.13312 0.9153 6.00171 0.915207C5.87029 0.915114 5.74015 0.940925 5.61871 0.991164C5.49728 1.0414 5.38694 1.11508 5.294 1.20799Z" fill="#8E8E8E"/>
                                        </svg>                                    
                                        )
                                    
                                } 
                            </span>
                            
                        </div>
                        {
                            currentService == service && (
                                <div className="text-white m-4 p-4 px-12 bg-white/10 rounded-md">

                                    <div className="border-b border-white/20 py-4 flex">
                                        <div className="text-sm uppercase text-white/60 min-w-[200px]" >Category</div>
                                        <span className="bg-white/10 rounded py-1 px-2 text-sm text-white">{service.category}</span>
                                    </div>

                                    <div className="border-b border-white/20 py-4 flex">
                                        <div className="text-sm uppercase text-white/60 min-w-[200px]" >Shortcode</div>
                                        <div className="flex flex-col space-y-1">
                                            {
                                                partner.compliance?.shortcodes.map(shortcode => (
                                                    <span className="bg-white/10 rounded py-1 px-2 text-sm text-white">{cleanShortcodes(shortcode.shortcodes)}</span>
                                                ))
                                            }
                                            
                                        </div>
                                        
                                    </div>

                                    <div className="py-4 flex">
                                        <div className="text-sm uppercase text-white/60 min-w-[200px]" >Revenue Share</div>
                                        <div className="flex flex-col space-y-2">
                                            {
                                                service.revenue_share && service.revenue_share.content_provider_share && (
                                                    <p className=""><span className="text-sm text-white">Content Provider Share</span> - <span className="text-sm text-white/60">{service.revenue_share.content_provider_share}</span></p>
                                                )
                                            }
                                            {
                                                service.revenue_share && service.revenue_share.technical_provider_share && (
                                                    <p className=""><span className="text-sm text-white">Technical Provider Share</span> - <span className="text-sm text-white/60">{service.revenue_share.technical_provider_share}</span></p>
                                                )
                                            }
                                             {
                                                service.revenue_share && service.revenue_share.mtn_share && (
                                                    <p className=""><span className="text-sm text-white">MTN Share</span> - <span className="text-sm text-white/60">{service.revenue_share.mtn_share}</span></p>
                                                )
                                            }
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}