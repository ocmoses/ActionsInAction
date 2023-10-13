import useNotifications from '../../hooks/useNotifications';
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import useUsers from '@/hooks/useUsers';
import {ellipsify} from "@/app/modules/utilities";
import moment from 'moment/moment';
import { useRouter } from "next/navigation";

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export default function Notifications({count=0}){

    const {notifications, getNotifications} = useNotifications();
    
    const [previewNotifications, setPreviewNotifications] = useState(false);

    const [slice, setSlice] = useState([]);

    const router = useRouter();

    let previousNotificationCount = 0;




    useEffect(() => {
        // NotificationManager.info(message, title, timeOut, callback, priority);
        setInterval(function(){
            getNotifications().then((res) => {
                
                if(notifications?.length){

                    if(notifications.length > previousNotificationCount){
                        NotificationManager.info('You have some messages', null, 3000, () => router.push('/dashboard/notifications'));     
                        previousNotificationCount = notifications.length;
                    }

                    notifications.sort((a,b) => {(a.read_at == null && b.read_at != null) ? 1 : (a.read_at != null && b.read_at == null) ? -1 : 0})
                }
                if(notifications.length >= 3){

                    setSlice(notifications.slice(0,3));                    
                    
                }else{
                    setSlice(notifications)
                }
                
            } ); 
        }, 60000);               
    }, []);

    return (<div className="hidden md:flex text-[#888888] relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => {window.location = "/dashboard/notifications"}}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
                {count > 0 && 
                    <div onClick={() => previewNotifications ? setPreviewNotifications(false) : setPreviewNotifications(true)}>                    
                        <span className="absolute" 
                            style={{
                                    top: '-10px', fontSize: '12px', left: '10px', minWidth: '20px', padding: '0px 2px', 
                                    borderRadius: '10px', background: 'yellow', display: 'block', textAlign: 'center',
                                    cursor: 'pointer'
                            }}>
                            {count}
                        </span>                        

                        {
                            previewNotifications &&
                            <div                            
                                className="absolute z-10 top-10 right-0 w-[250px] bg-[#212121] p-4 mt-3 rounded-lg shadow-lg w3-animate-opacity"
                            >
                                <div className="border-b border-gray-500 pb-4">
                                    <p className="text-white">Notifications</p>
                                </div>
                                <div className="w-full flex flex-col justify-start items-start pt-4 space-y-4">
                                    {
                                        notifications.slice(0,3).length > 0 && 
                                        notifications.slice(0,3).map((item, index) => (<div
                                        className="w-full flex text-[12px]  space-x-4"
                                        >
                                            {/* <div className="p4 inline-flex text-lg">
                                                <span className="flex rounded-full w-10 h-10 text-white bg-pink-900 justify-center items-center">I</span>
                                            </div> */}
                                            <div className="flex-1">
                                                <h1 className="text-md text-white">{item.subject}</h1>
                                                <p className="text-md text-white/50">{ellipsify(item.message, 60)}</p>
                                                <span className="text-white/15 text-xs">{moment(item.created_at).fromNow()}</span>
                                            </div>

                                            <div className="w-2 h-2 rounded-full bg-yellow-500">
                                            </div>
                                        
                                        </div>))
                                    }
                                    
                                    <Link
                                    href="/dashboard/notifications"
                                    className="w-full text-center cursor-pointer text-mtn text-[12px] px-3 py-2 pt-4 border-t border-gray-500"
                                    >
                                        All notifications
                                    </Link>                             
                                    
                                </div>
                            </div>
                        }
                    </div>
                }

                <NotificationContainer />
            </div>);
}
