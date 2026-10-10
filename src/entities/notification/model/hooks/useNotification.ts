import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../api/notification.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import type { Message } from "@/entities/message";
import {
   chatCountMessagesQueryKey,
   pushNewMessageToInfinityCache,
   updateMessageInInfinityCache,
   type IncomingMessage,
   type OutgoingMessage,
} from "@/entities/message/@x/notification";

export function useNotification({}) {
   const apiKeys = useApiKeys();
   const queryClient = useQueryClient();

   const { error } = useQuery({
      queryKey: ["notification"],
      queryFn: async () => {
         const notificationResponse = await notificationService.receiveNotification({ ...apiKeys });
         if (!notificationResponse) return false;

         const { messageData, senderData, idMessage, timestamp, typeWebhook } = notificationResponse.body;
         // TO DO
         if (messageData.typeMessage === "textMessage") {
            if (typeWebhook === "incomingMessageReceived") {
               const messageObject: IncomingMessage = {
                  type: "incoming",
                  idMessage,
                  timestamp,
                  sendByApi: false,
                  typeMessage: "textMessage",
                  chatId: senderData.chatId,
                  chatType: senderData.senderType,
                  isForwarded: false,
                  forwardingScore: 0,
                  textMessage: messageData.textMessageData.textMessage,
                  senderName: senderData.senderName,
                  senderContactName: senderData.senderContactName,
                  senderType: senderData.senderType,
               };

               queryClient.setQueryData<Message[]>(
                  chatCountMessagesQueryKey({ chatId: senderData.chatId, count: 1 }),
                  [messageObject]
               );

               pushNewMessageToInfinityCache({ chatId: senderData.chatId, messageObject, queryClient });
            } else {
               const messageObject: OutgoingMessage = {
                  type: "outgoing",
                  statusMessage: "delivered",
                  idMessage,
                  timestamp,
                  sendByApi: false,
                  typeMessage: "textMessage",
                  chatId: senderData.chatId,
                  chatType: "user",
                  isForwarded: false,
                  forwardingScore: 0,
                  textMessage: messageData.textMessageData.textMessage,
               };

               const updateCb = (message: Message) =>
                  message.idMessage === messageObject.idMessage ? messageObject : message;

               updateMessageInInfinityCache({
                  chatId: senderData.chatId,
                  queryClient,
                  cb: updateCb,
               });
               queryClient.setQueryData<Message[]>(
                  chatCountMessagesQueryKey({ chatId: senderData.chatId, count: 1 }),
                  [messageObject]
               );
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

   console.log({ error });
}
