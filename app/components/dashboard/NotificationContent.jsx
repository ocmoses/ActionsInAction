import CallToAction from "@/app/components/dashboard/partners/CallToAction";
import useNotifications from "@/hooks/useNotifications";
import moment from "moment/moment";
import {useState} from 'react';

export default function NotificationContent(){

    const {notifications, tryArchive, markRead, getNotifications} = useNotifications();

    const [activeTab, setActiveTab] = useState('messages');
    const [showActions, setShowActions] = useState(null);

    let messages = notifications.filter(notification => notification.archived_at == null);

    let archived = notifications.filter(notification => notification.archived_at != null);    

    const archive = (uuid) => {
      tryArchive(uuid)
        .then(res => {if(res) getNotifications()});
    }

    const mark = (uuid) => {
      markRead(uuid).then(res => {if(res) getNotifications()});
    }

    if(notifications?.length){
      notifications.sort((a,b) => {(a.read_at == null && b.read_at != null) ? 1 : (a.read_at != null && b.read_at == null) ? -1 : 0})
    }


    return  <div className="h-screen md:w-[768px] overflow-auto block m-auto my-8 pr-4" onClick={() => showActions != null ? setShowActions(null) : {}}>

              <h2 className="text-4xl mb-6 font-bold text-white text-center md:text-start">
                Notifications
              </h2>

              <div className="border-1 border-white/20 w-full p-4 rounded-lg">

                <div class="mb-4 border-b border-white/20 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li class="mr-2" role="presentation" onClick={() => {if(activeTab != 'messages') setActiveTab('messages')}}>
                            <button className={`inline-block p-4 border-b-2 ${activeTab == 'messages' ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeTab == 'messages' ? 'text-yellow-500' : 'text-white'}`} id="style-tab" data-tabs-target="#style" type="button" role="tab" aria-controls="style" aria-selected="false">Messages</button>
                        </li>
                        <li class="mr-2" role="presentation" onClick={() => {if(!activeTab != 'archived') setActiveTab('archived')}}>
                            <button className={`inline-block p-4 border-b-2 ${activeTab == 'archived' ? 'border-yellow-600' : 'border-transparent'} rounded-t-lg hover:text-yellow-600 hover:border-text-600 dark:hover:text-yellow-600 ${activeTab == 'archived'  ? 'text-yellow-500' : 'text-white'}`} id="upload-tab" data-tabs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="false">Archived</button>
                        </li>
                    </ul>
                </div>


                <div id="myTabContent">
                    <div className={`${activeTab == 'messages' ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="style" role="tabpanel" aria-labelledby="style-tab">
                      {
                        messages?.length > 0 ?
                        messages?.map((notification) => (
                            
                            <div className="py-8 border-b border-white/10 flex flex-col space-y-4 w-full">

                              <div className="flex justify-between">
                                
                                <div className="flex items-center space-x-8">
                                  <div className="text-white">{notification.subject}</div>
                                  <div className="text-sm text-gray-500 ml-8">{moment(notification.created_at).fromNow()} &nbsp; 
                                      <span className="w-2 h-4 rounded-full bg-yellow-500"></span>
                                  </div>
                                </div>

                                <div className="flex space-x-4 justify-right items-center relative">
                                  {notification.read_at == null && 
                                      <span className="w-3 h-3 bg-mtn rounded-full"></span>
                                      
                                  }

                                  <div id={`action-${notification.uuid}`} className="flex gap-0" onClick={() => {setShowActions(`action-${notification.uuid}`)}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-10 h-10 hover:bg-gray-700 hover:rounded-full p-2">
                                          <path strokeLinecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                      </svg>
                                  </div>
                                  {
                                    (showActions == `action-${notification.uuid}`) && 
                                    <div className="absolute right-0 top-8 bg-[#323232] w-[150px] rounded-xl p-4 shadow-lg ">
                                      {
                                        notification.read_at == null &&
                                          <div className="p-2 hover:bg-black rounded-lg cursor-pointer w-full" 
                                          onClick={() => {setShowActions(null); mark(notification.uuid)}}>
                                          <span className="text-white">Mark as Read</span>
                                        </div>                                      
                                      }
                                      <div className="p-2 hover:bg-black rounded-lg cursor-pointer flex space-x-4 w-full"
                                        onClick={() => {setShowActions(null); archive(notification.uuid)}}>
                                        <span className="text-white">Archive</span>
                                      </div>  
                                    </div>
                                  }

                                </div>
                                
                              </div>

                              <div className="text-white text-sm">
                                {notification.message}
                              </div>

                          </div>
                          )) : <div className="p-12 text-white/50 flex w-full justify-center items-center"> No notifications found</div>


                      }
                    </div>
                    <div className={`${activeTab == 'archived' ? 'block' : 'hidden'} p-4 rounded-xl  dark:bg-gray-800`} id="upload" role="tabpanel" aria-labelledby="upload-tab">
                      {
                        archived?.length > 0 ?
                        archived?.map((notification) => (

                            <div className="py-8 border-b border-white/10 flex flex-col space-y-4 pr-8 w-full">

                              <div className="flex justify-between">
                                <div className="text-white">{notification.subject}</div>
                                <div className="text-sm text-gray-500">{moment(notification.created_at).fromNow()} &nbsp; 
                                    <span className="w-2 h-4 rounded-full bg-yellow-500"></span>
                                </div>
                              </div>

                              <div className="text-white text-sm">
                                {notification.message}
                              </div>

                              

                            </div>
                          )): <div className="p-12 text-white/50 flex w-full justify-center items-center"> No notifications found</div>

                      }
                    </div>
                </div>

              </div>

              

            </div>;
          
}