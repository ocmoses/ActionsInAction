import { action, computed, thunk } from "easy-peasy";
const notifications = {
  notification: null,
  notifications: [],

  clear: action((state) => {
    state.notification = null,
    state.notifications = []
  }),
  
  count: computed((state) => state.notifications
              .filter(notification => notification.deleted_at == null 
                                      && notification.read_at == null
                                      && notification.archived_at == null).length),
  
  setNotification: action((state, notification) => {
    state.notification = notification;
  }),
  setNotifications: action((state, notifications) => {
    state.notifications = notifications;
  }),
};
export default notifications;
