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
  import {useState} from "react";


export default function ComplianceTab({partner}){

    const [currentService, setCurrentService] = useState(null);

    return (
        <div className="flex flex-col p-4 py-16 overflow-y-auto">
            <p className="text-white text-3xl mb-4">Compliance</p>
            {
                <div className="bg-black rounded-2xl mb-4 flex flex-col">
                    <div className="text-sm uppercase text-white/60 p-4" >Shortcodes</div>

                    {
                        partner?.shortcodes.map(shortcode => (
                            <div className={`${'border-b'} border-white/20 p-4`}>

                                <div className="flex space-x-2 items-center">
                                    <span className="w-16 h-16 rounded-full bg-white/10 flex justify-center items-center">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_11315_100854)">
                                            <path d="M7.65662 11.7579C7.97964 11.7579 8.24255 11.495 8.24255 11.172C8.24255 10.8489 7.97964 10.586 7.65662 10.586C7.33359 10.586 7.07068 10.8489 7.07068 11.172C7.07068 11.495 7.33359 11.7579 7.65662 11.7579Z" fill="#686868"/>
                                            <path d="M7.65662 7.0704C7.97964 7.0704 8.24255 6.8075 8.24255 6.48447C8.24255 6.16144 7.97964 5.89853 7.65662 5.89853C7.33359 5.89853 7.07068 6.16144 7.07068 6.48447C7.07068 6.8075 7.33359 7.0704 7.65662 7.0704Z" fill="#686868"/>
                                            <path d="M12.3441 7.0704C12.6671 7.0704 12.9301 6.8075 12.9301 6.48447C12.9301 6.16144 12.6671 5.89853 12.3441 5.89853C12.0211 5.89853 11.7582 6.16144 11.7582 6.48447C11.7582 6.8075 12.0211 7.0704 12.3441 7.0704Z" fill="#686868"/>
                                            <path d="M12.3441 11.7579C12.6671 11.7579 12.9301 11.495 12.9301 11.172C12.9301 10.8489 12.6671 10.586 12.3441 10.586C12.0211 10.586 11.7582 10.8489 11.7582 11.172C11.7582 11.495 12.0211 11.7579 12.3441 11.7579Z" fill="#686868"/>
                                            <path d="M3.55505 14.1407H16.4457V3.51572H3.55505V14.1407ZM10.5863 6.48447C10.5863 5.51523 11.3749 4.72665 12.3441 4.72665C13.3134 4.72665 14.1019 5.51523 14.1019 6.48447C14.1019 7.24832 13.6121 7.89957 12.9301 8.14157V9.51486C13.6121 9.75687 14.1019 10.4081 14.1019 11.172C14.1019 12.1412 13.3134 12.9298 12.3441 12.9298C11.3749 12.9298 10.5863 12.1412 10.5863 11.172C10.5863 10.4081 11.0761 9.75687 11.7582 9.51486V8.14157C11.0761 7.89957 10.5863 7.24832 10.5863 6.48447ZM7.65662 4.72665C8.62585 4.72665 9.41443 5.51523 9.41443 6.48447C9.41443 7.4537 8.62585 8.24228 7.65662 8.24228C6.68738 8.24228 5.8988 7.4537 5.8988 6.48447C5.8988 5.51523 6.68738 4.72665 7.65662 4.72665ZM7.65662 9.41415C8.62585 9.41415 9.41443 10.2027 9.41443 11.172C9.41443 12.1412 8.62585 12.9298 7.65662 12.9298C6.68738 12.9298 5.8988 12.1412 5.8988 11.172C5.8988 10.2027 6.68738 9.41415 7.65662 9.41415Z" fill="#686868"/>
                                            <path d="M3.55505 18.2423C3.55505 19.2115 4.34363 20.0001 5.31287 20.0001H14.6879C15.6571 20.0001 16.4457 19.2115 16.4457 18.2423V15.3126H3.55505V18.2423ZM8.82849 17.0704H11.1722V18.2423H8.82849V17.0704Z" fill="#686868"/>
                                            <path d="M14.6879 9.15527e-05H5.31287C4.34363 9.15527e-05 3.55505 0.788666 3.55505 1.7579V2.34384H16.4457V1.7579C16.4457 0.788666 15.6571 9.15527e-05 14.6879 9.15527e-05Z" fill="#686868"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_11315_100854">
                                                    <rect width="20" height="20" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>

                                    <span className="text-white/80">{shortcode.shortcode}</span>
                                </div>

                            </div>
                        ))
                    }
                </div>
                
            }
        </div>
    )
}