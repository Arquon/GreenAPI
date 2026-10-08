// TO DO - notification type

interface SenderData {
   chatId: string;
   chatName: string;
   sender: string;
   senderName: string;
   senderContactName: string;
   senderPhoneNumber: number;
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

type TypeWebhook = "incomingMessageReceived";
type TypeInstance = "telegram";

export interface MessageDTO extends Notification {
   typeWebhook: TypeWebhook;
   instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: TypeInstance;
   };
}
