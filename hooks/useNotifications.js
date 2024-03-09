import { useStoreState, useStoreActions } from "easy-peasy";
import RemoteEndpoints from "../app/modules/endpoints";
import useProcessing from "@/hooks/useProcessing";

export default function useNotifications() {
  const { notification, notifications } = useStoreState(
    (state) => state.notifications
  );
  const { setNotification, setNotifications } = useStoreActions(
    (action) => action.notifications
  );
  const partners = useStoreState((state) => state.partners);

  const users = useStoreState((state) => state.users);

  const { setProcessing } = useProcessing();

  const getNotifications = async (page, perPage) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.GET_ALL_NOTIFICATIONS.replace(
          ":user-uuid",
          partners.partner.user_uuid
        ).replace(":partner-portal-uuid", partners.partner.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_NOTIFICATION_APIKEY,
          },
        }
      );
      if (!response) {
        return {
          error: "This request has no response available",
        };
      }

      const result = await response.json();
      console.log("Notifications result", result);
      setProcessing(false);
      if (result?.success) {
        const notifications = result?.data;

        setNotifications(notifications);

        return {
          notifications,
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

  const tryArchive = async (uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.ARCHIVE_NOTIFICATION.replace(
          ":notification-uuid",
          uuid
        ).replace(":user-uuid", users.user.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_NOTIFICATION_APIKEY,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      const result = await response.json();
      setProcessing(false);
      if (result?.success) {
        return {
          success: result.success,
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

  const markUnarchived = async (uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.UNARCHIVE_NOTIFICATION.replace(
          ":notification-uuid",
          uuid
        ).replace(":user-uuid", users.user.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_NOTIFICATION_APIKEY,
          },
        }
      );

      if (!response)
        return {
          error: "This request has no response available",
        };

      const result = await response.json();
      console.log("Archive result", result);
      setProcessing(false);
      if (result?.success) {
        return {
          success: result.success,
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

  const markRead = async (uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.MARK_NOTIFICATION_READ.replace(
          ":notification-uuid",
          uuid
        ).replace(":user-uuid", users.user.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_NOTIFICATION_APIKEY,
          },
        }
      );

      if (!response) {
        return {
          error: "This request has no response available",
        };
      }
      const result = await response.json();
      console.log("Mark read result", result);
      setProcessing(false);
      if (result?.success) {
        return {
          success: result.success,
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

  const markUnread = async (uuid) => {
    try {
      setProcessing(true);
      const response = await fetch(
        `${RemoteEndpoints.MARK_NOTIFICATION_UNREAD.replace(
          ":notification-uuid",
          uuid
        ).replace(":user-uuid", users.user.uuid)}`,
        {
          cache: "no-store",
          next: { revalidate: 120 },
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_NOTIFICATION_APIKEY,
          },
        }
      );

      if (!response) {
        return {
          error: "This request has no response available",
        };
      }
      const result = await response.json();
      console.log("Mark read result", result);
      setProcessing(false);
      if (result?.success) {
        return {
          success: result.success,
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

  return {
    notification,
    notifications,
    setNotification,
    setNotifications,
    getNotifications,
    tryArchive,
    markRead,
    markUnarchived,
    markUnread,
  };
}
