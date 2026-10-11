import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/entities/notification";
import { useApiKeys } from "@/shared/model/apiKeys";
import { processTextMessageNotification } from "../helpers/query";

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
               processTextMessageNotification({ notification: notificationResponse.body, queryClient });
               break;
            }
         }

         await notificationService.deleteNotification({
            ...apiKeys,
            receiptId: +notificationResponse.receiptId,
         });

         return true;
      },
      retry: Infinity,
      staleTime: 0,
      gcTime: 0,
      refetchInterval: 1000,
   });
}
