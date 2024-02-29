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
                <div className="bg-black rounded-xl mb-4 flex flex-col">
                    <div className="text-sm uppercase text-white/60 p-4 pb-0" >Shortcodes</div>

                    {
                        partner?.shortcodes.map((shortcode, index) => (
                            <div className={`${index < partner?.shortcodes.length - 1 && 'border-b'} border-white/20 py-4 mx-4 flex`}>

                                <div className="flex space-x-2 items-center flex-1">
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

                                <div className="flex-1 flex flex-col justify-center space-y-1">

                                    <span className="text-white/40 text-sm ">Issued</span>

                                    <p className="text-white/80 text-sm">{shortcode.issue_date}</p>

                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-1">

                                    <span className="text-white/40 text-sm">Expires</span>

                                    <p className="text-white/80 text-sm">{shortcode.expiry_date}</p>

                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-1">

                                    <div className={`${shortcode.status == "active" ? "bg-green-600" : "bg-red-400" } ml-auto rounded px-2 py-1 text-xs text-white w-[64px]`}>
                                        {capitalizeFirst(shortcode.status)}
                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </div>
                
            }

            <div className="bg-black rounded-xl flex flex-col">
                <div className="flex justify-between items-center">
                    <div className="text-sm uppercase text-white/60 m-4 pb-0" >VAS License</div>

                    <span className="text-white text-sm px-2 py-1 flex items-center m-4
                          border-1 border-white/20 rounded-full cursor-pointer"
                          onClick={() => {}}>
                        Renew License
                    </span>
                </div>               

                {
                    
                    <div className={`border-white/20 pb-4 mx-4 flex`}>

                        <div className="flex space-x-2 items-center flex-1">
                            <span className="w-16 h-16 rounded-full bg-white/10 flex justify-center items-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.4141 16.8618H12.1255L11.6695 17.3178C11.5597 17.4277 11.4106 17.4894 11.2552 17.4894H8.74477C8.58934 17.4894 8.44031 17.4277 8.33047 17.3178L7.87449 16.8618H0.585938C0.262344 16.8618 0 17.1242 0 17.4478V18.1587C0 19.1875 0.835547 19.9998 1.84117 19.9998H18.1588C19.1877 19.9998 20 19.1643 20 18.1587V17.4478C20 17.1241 19.7377 16.8618 19.4141 16.8618Z" fill="white"/>
                                    <path d="M11.8408 0.828613V2.59373H13.6059L11.8408 0.828613Z" fill="white"/>
                                    <path d="M8.53197 15.8615L8.98795 16.3175H11.013L11.469 15.8615C11.5788 15.7516 11.7279 15.6898 11.8833 15.6898H18.1177V7.48933C18.1177 6.47413 17.2917 5.64819 16.2765 5.64819H15.6072V12.5935C15.6072 13.5628 14.8187 14.3513 13.8494 14.3513H6.15154C5.18228 14.3513 4.39373 13.5628 4.39373 12.5935V5.64819H3.72443C2.70924 5.64819 1.8833 6.47413 1.8833 7.48933V15.6898H8.11768C8.27307 15.6899 8.42213 15.7516 8.53197 15.8615Z" fill="white"/>
                                    <path d="M6.15088 13.1797H13.8488C14.1724 13.1797 14.4347 12.9173 14.4347 12.5938V3.76563H11.2551C10.9315 3.76563 10.6691 3.50328 10.6691 3.17969V0H6.15088C5.82729 0 5.56494 0.262344 5.56494 0.585938V12.5938C5.56494 12.9173 5.82725 13.1797 6.15088 13.1797ZM7.4894 2.51043H8.74459C9.52064 2.53898 9.52107 3.65359 8.74459 3.6823H7.4894C6.71334 3.65371 6.71291 2.53914 7.4894 2.51043ZM7.4894 5.02082H8.74459C9.52064 5.04938 9.52107 6.16399 8.74459 6.1927H7.4894C6.71334 6.16414 6.71291 5.04957 7.4894 5.02082ZM7.4894 7.53125H12.5102C12.8338 7.53125 13.0962 7.79359 13.0962 8.11719C13.0962 8.44078 12.8338 8.70313 12.5102 8.70313H7.4894C6.71439 8.67504 6.71193 7.56031 7.4894 7.53125ZM7.4894 10.0417H12.5102C12.8338 10.0417 13.0962 10.304 13.0962 10.6276C13.0962 10.9512 12.8338 11.2136 12.5102 11.2136H7.4894C6.71439 11.1855 6.71193 10.0707 7.4894 10.0417Z" fill="white"/>
                                </svg>
                            </span>

                            <span className="text-white/80">{partner?.vas_license?.license_code}</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-1">

                            <span className="text-white/40 text-sm ">Issued</span>

                            <p className="text-white/80 text-sm">{partner?.vas_license?.issue_date}</p>

                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-1">

                            <span className="text-white/40 text-sm">Expires</span>

                            <p className="text-white/80 text-sm">{partner?.vas_license?.expiry_date}</p>

                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-1">

                            <div className={`${partner?.vas_license?.status == "active" ? "bg-green-600" : "bg-red-400" } ml-auto rounded px-2 py-1 text-xs text-white w-[64px]`}>
                                {capitalizeFirst(partner?.vas_license?.status)}
                            </div>

                        </div>

                    </div>
                    
                }
            </div>
        </div>
    )
}