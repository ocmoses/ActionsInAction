import { useStoreState, useStoreActions } from "easy-peasy";
import RemoteEndpoints from "../app/modules/endpoints";
import useProcessing from "@/hooks/useProcessing";
// import { cookies } from "next/headers";

export default function useNotifications(){

    const {notification, notifications} = useStoreState((state) => state.notifications);
    const {setNotification, setNotifications} = useStoreActions((action) => action.notifications);
    const partners = useStoreState((state) => state.partners);

    const users = useStoreState((state) => state.users);

    const { setProcessing } = useProcessing();

    // const nextCookies = cookies();
    // const token = nextCookies.has("auth-token")
    //   ? nextCookies.get("auth-token")?.value
    //   : null;

    console.log('users state from store ', users);
    console.log('partners state from store ', partners);
    // console.log('token', token);
    
    // const getNotifications = async () => {
    //     const response = await fetch(NextEndPoints.GET_NOTIFICATIONS);
    //     const res = await response.json();
        
    //     console.log('Notifications', res);

    //     setNotifications(res?.data?.data);
        
    // };

    const getNotifications = async (page, perPage) => {
        try {
          const params = [];
          if (page) params.push(`page=${page}`);
          if (perPage) params.push(`per_page=${perPage}`);
    
          setProcessing(true);
          const response = await fetch(
            `${RemoteEndpoints.GET_UNREAD_NOTIFICATIONS
                        .replace(':user-uuid', partners.partner.user_uuid)
                        .replace(':partner-portal-uuid', partners.partner.uuid)}`,
            {
              cache: "no-store",
              next: { revalidate: 120 },
              headers: {
                "Content-Type": "application/json",
                'X-API-KEY': process.env.NEXT_PUBLIC_APIKEY,
              },
            }
          );
          // if (response.status === 401) {
          //   redirect(NextEndPoints.LOGIN_ADMIN)
          //   return
          // }
          if (!response)
            return {
              error: "This request has no response available",
            };
          const result = await response.json();
          console.log('Notifications result', result);
          setProcessing(false);
          if (result?.success) {
            const notifications = result?.data;

            console.log('Notifications', notifications);
           
            // const navigation = {
            //   current_page: page,
            //   first_page_url: result?.data?.partners?.first_page_url,
            //   from: result?.data?.partners?.from,
            //   last_page: result?.data?.partners?.last_page,
            //   last_page_url: result?.data?.partners?.last_page_url,
            //   links: result?.data?.partners?.links,
            //   next_page_url: result?.data?.partners?.next_page_url,
            //   path: result?.data?.partners?.path,
            //   per_page: result?.data?.partners?.per_page,
            //   prev_page_url: result?.data?.partners?.prev_page_url,
            //   to: result?.data?.partners?.to,
            //   total: result?.data?.partners?.total,
            // };

            setNotifications(notifications);
    
            return {
                notifications
            };
          }
          return {
            error:
              result?.message ??
              "Something went wrong. Please check your connection and try again",
          };
        } catch (error) {
          console.log({ error });
          return {
            error:
              error.message ??
              "Something went wrong. Please check your connection and try again",
          };
        }
      };

    return {notification, notifications, setNotification, setNotifications, getNotifications};
}