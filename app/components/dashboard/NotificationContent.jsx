import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import useNotifications from "@/hooks/useNotifications";

export default function NotificationContent(){

    const {notifications, getNotifications} = useNotifications();

    // useEffect(() => {
    //     getNotifications();        
    // }, []);

    return <div className="h-screen m-12 md:w-1/2">
                <h2 className="text-4xl mb-6 font-bold text-white text-center md:text-start">
                  Notifications
                </h2>
                {/* <CallToAction
                    message="Notifications go here"
                    description=""
                    label=""
                    color="text-[#FF9897]"
                    desccolor="text-[#999999]"
                    icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className=" w-[28px] h-[28px]"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>
                    }
                /> */}

                <table className="table w-full transparent">
                  <tbody>
                    {/* head */}
                    <tr className="border-b border-b-white/40 text-11">
                      <th>
                        <span className="text-[13px]">Subject</span>
                      </th>  
                      <th>
                        <span className="text-[13px]"></span>
                      </th>                    
                    </tr>

                    {/* row 1 */}

                    {notifications.length &&
                      notifications?.map((notification) => (
                        <tr
                          key={notification.id}
                          className="border-b border-b-white/10 cursor-pointer bg-transparent hover:bg-white/20"
                          onClick={() => {}}
                        >
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="flex justify-center items-center rounded-full w-10 h-10 bg-mtn text-white text-[12px] mr-2">
                                <span className="ml-48">
                                  {notification.subject}
                                </span>
                              </div>
                              
                            </div>
                          </td>
                          
                          {/* <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th> */}
                        <td>
                            <div className="flex items-right justify-right space-x-3">

                                <div className="flex-1"></div>
                                <div className="flex justify-right items-right text-white text-[12px] mr-2">
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-right">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    
                                </div>
                                
                            </div>
                        </td>
                    </tr>

                      ))
                    }

                  </tbody>
                </table>
            </div>;
}