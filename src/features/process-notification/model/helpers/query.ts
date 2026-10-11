import {
   chatCountMessagesQueryKey,
   pushNewMessageToInfinityCache,
   updateMessageInInfinityCache,
   type Message,
} from "@/entities/message";
import { parseNotificationToMessage } from "./to-message-parser";
import type { Notification } from "@/entities/notification";
import type { QueryClient } from "@tanstack/react-query";

interface ProcessTextMessageNotificationParams {
   notification: Notification;
   queryClient: QueryClient;
}

export function processTextMessageNotification({
   notification,
   queryClient,
}: ProcessTextMessageNotificationParams) {
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
