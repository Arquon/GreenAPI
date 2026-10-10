import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../api/notification.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import { proceedTextMessageNotification } from "../helpers/query";

export function useNotification() {
   const apiKeys = useApiKeys();
   const queryClient = useQueryClient();

   useQuery({
      queryKey: ["notification"],
      queryFn: async () => {
         const notificationResponse = await notificationService.receiveNotification({ ...apiKeys });
         if (!notificationResponse) return false;

         const { messageData } = notificationResponse.body;

         switch (messageData.typeMessage) {
            case "textMessage": {
               proceedTextMessageNotification({ notification: notificationResponse.body, queryClient });
            }
         }

         notificationService.deleteNotification({ ...apiKeys, receiptId: +notificationResponse.receiptId });

         return true;
      },
      retry: Infinity,
      staleTime: 0,
      gcTime: 0,
      refetchInterval: 1000,
   });
}
