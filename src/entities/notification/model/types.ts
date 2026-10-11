import type { ChatType } from "@/entities/chat/@x/notification";
import type { SenderType, MessageData } from "@/entities/message/@x/notification";

interface SenderData {
   chatId: string;
   chatName: string;
   sender: string;
   senderName: string;
   chatType: ChatType;
   senderType: SenderType;
   senderContactName: string;
   senderPhoneNumber: number;
}

type TypeWebhook = "incomingMessageReceived" | "outgoingAPIMessageReceived";
type TypeInstance = "telegram";

export interface Notification {
   typeWebhook: TypeWebhook;
   idMessage: string;
   instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: TypeInstance;
   };
   timestamp: number;
   senderData: SenderData;
   messageData: MessageData;
}
