import { useNotification } from "../model/hooks/useNotification";

interface NotificationListenerProps {}

export const NotificationListener = ({}: NotificationListenerProps) => {
   useNotification();

   return null;
};
