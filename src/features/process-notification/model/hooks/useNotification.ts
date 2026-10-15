import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/entities/notification";
import { useApiKeys } from "@/shared/model/apiKeys";
import { processTextMessageNotification } from "../helpers/query";
import { useEffect, useState } from "react";

export function useNotification() {
   const apiKeys = useApiKeys();
   const queryClient = useQueryClient();

   const [isPollingEnabled, setIsPollingEnabled] = useState(true);

   const { data: notificationData } = useQuery({
      queryKey: ["notification"],
      queryFn: async ({ signal }) => {
         return notificationService.receiveNotification({ keys: { ...apiKeys }, signal });
      },
      retry: true,
      staleTime: 0,
      gcTime: 0,
      enabled: isPollingEnabled,
      refetchInterval: 1000,
      structuralSharing: false,
   });

   const { mutate: deleteNotification } = useMutation({
      mutationFn: (receiptId: number) =>
         notificationService.deleteNotification({ keys: { ...apiKeys }, receiptId }),
      onMutate: () => {
         setIsPollingEnabled(false);
      },
      onSettled: () => {
         setIsPollingEnabled(true);
      },
   });

   useEffect(() => {
      if (!notificationData) {
         return;
      }

      const { messageData } = notificationData.body;

      switch (messageData.typeMessage) {
         case "textMessage": {
            processTextMessageNotification({ notification: notificationData.body, queryClient });
            break;
         }
      }

      deleteNotification(+notificationData.receiptId);
   }, [notificationData, deleteNotification, queryClient]);
}
