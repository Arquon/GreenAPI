import type { BaseMessage, Message, IncomingMessage, OutgoingMessage } from "@/entities/message";
import type { Notification } from "@/entities/notification";

export const parseNotificationToMessage = (notification: Notification): Message => {
   const baseMessage: BaseMessage = {
      type: notification.typeWebhook === "incomingMessageReceived" ? "incoming" : "outgoing",
      idMessage: notification.idMessage,
      timestamp: notification.timestamp,
      sendByApi: false,
      typeMessage: "textMessage",
      chatId: notification.senderData.chatId,
      chatType: notification.senderData.chatType, // ?
      isForwarded: false,
      forwardingScore: 0,
      textMessage: notification.messageData.textMessageData.textMessage,
   };

   if (baseMessage.type === "incoming") {
      const message: IncomingMessage = {
         ...baseMessage,
         type: "incoming",
         senderName: notification.senderData.senderName,
         senderType: notification.senderData.senderType,
         senderContactName: notification.senderData.senderType,
      };
      return message;
   }

   const message: OutgoingMessage = {
      ...baseMessage,
      type: "outgoing",
      statusMessage: "delivered",
   };
   return message;
};
