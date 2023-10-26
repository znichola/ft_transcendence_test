import { ReactNode, createContext, useState } from "react";
import { INotification } from "../interfaces";
import { AxiosInterceptors } from "../api/AxiosInterceptors";
import { randString } from "../functions/utils";

interface INotifContext {
  notifications: INotification[];
  addNotif: (notif: INotification) => void;
  removeNotif: (index: number) => void;
}

export const NotificationContext = createContext<INotifContext>({
  notifications: [],
  addNotif: () => {},
  removeNotif: () => {},
});

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotif = (notif: INotification) => {
    // console.log("notification href", window.location.pathname, `/${notif.to?.split("#")[0]}`);
    if (window.location.pathname !== `/${notif.to?.split("#")[0]}`) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { ...notif, id: randString(8) },
      ]);
    }
  };

  const removeNotif = (index: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index),
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, removeNotif, addNotif }}
    >
      <AxiosInterceptors>{children}</AxiosInterceptors>
    </NotificationContext.Provider>
  );
}
