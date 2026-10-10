import type { ChatType } from "@/entities/chat/@x/notification";

interface SenderData {
   chatId: string;
   chatName: string;
   sender: string;
   senderName: string;
   senderContactName: string;
   senderPhoneNumber: number;
   senderType: ChatType;
}

interface BaseMessageData {
   typeMessage: string;
}

interface TextMessageData extends BaseMessageData {
   typeMessage: "textMessage";
   textMessageData: {
      textMessage: string;
   };
}

type MessageData = TextMessageData;

export interface Notification {
   timestamp: number;
   senderData: SenderData;
   messageData: MessageData;
}

type TypeWebhook = "incomingMessageReceived" | "outgoingAPIMessageReceived";
type TypeInstance = "telegram";

export interface NotificationDTO extends Notification {
   typeWebhook: TypeWebhook;
   idMessage: string;
   instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: TypeInstance;
   };
}
