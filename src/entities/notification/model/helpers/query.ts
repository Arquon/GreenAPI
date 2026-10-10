import {
   chatCountMessagesQueryKey,
   pushNewMessageToInfinityCache,
   updateMessageInInfinityCache,
   type Message,
} from "@/entities/message/@x/notification";
import { parseNotificationToMessage } from "./to-message-parser";
import type { Notification } from "../types";
import type { QueryClient } from "@tanstack/react-query";

interface ProceedTextMessageNotificationParams {
   notification: Notification;
   queryClient: QueryClient;
}

export function proceedTextMessageNotification({
   notification,
   queryClient,
}: ProceedTextMessageNotificationParams) {
   const messageObject = parseNotificationToMessage(notification);
   const {
      senderData: { chatId },
   } = notification;

   if (messageObject.type === "incoming") {
      queryClient.setQueryData<Message[]>(chatCountMessagesQueryKey({ chatId: chatId, count: 1 }), [
         messageObject,
      ]);

      pushNewMessageToInfinityCache({ chatId: chatId, messageObject, queryClient });
   } else {
      const updateCb = (message: Message) =>
         message.idMessage === messageObject.idMessage ? messageObject : message;

      updateMessageInInfinityCache({
         chatId: chatId,
         queryClient,
         cb: updateCb,
      });
      queryClient.setQueryData<Message[]>(chatCountMessagesQueryKey({ chatId: chatId, count: 1 }), [
         messageObject,
      ]);
   }
}
