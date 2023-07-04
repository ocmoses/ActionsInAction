import useNotifications from '../../hooks/useNotifications';
import { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import useUsers from '@/hooks/useUsers';

export default function Notifications({count=0}){

    const {notifications, getNotifications} = useNotifications();
    
    const [previewNotifications, setPreviewNotifications] = useState(false);

    const [slice, setSlice] = useState([]);


    useEffect(() => {
        getNotifications().then((res) => setSlice(notifications.slice(0,3)) );        
    }, []);

    return (<div className="hidden md:flex text-[#888888] relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
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
                                className="absolute top-10 right-0 text-right w-[140px] bg-white/10 p-0 mt-3 rounded-lg shadow-lg w3-animate-opacity"
                            >
                                <div className="w-full flex flex-col justify-start items-start">
                                    {
                                        notifications.slice(0,3).length > 0 && 
                                        notifications.slice(0,3).map((item, index) => (<div
                                        className="w-full text-[12px] text-mtn hover:bg-white/20 m-0 px-3 py-2"
                                        >
                                        {item.subject}
                                        </div>))
                                    }
                                    
                                    <Link
                                    href="/notifications"
                                    className="w-full cursor-pointer text-[12px] text-mtn hover:bg-white/20 m-0 px-3 py-2"
                                    >
                                        Show more...
                                    </Link>                             
                                    
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>);
}
