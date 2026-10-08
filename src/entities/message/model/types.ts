import type { ChatType } from "@/entities/chat/@x/message";

type MessageDirection = "outgoing" | "incoming";
type MessageType = "textMessage";

interface BaseMessage {
   type: MessageDirection;
   idMessage: string;
   timestamp: number;
   sendByApi: boolean;
   typeMessage: MessageType;
   chatId: string;
   chatType: ChatType;
   isForwarded: boolean;
   forwardingScore: number;
   textMessage: string;
}

type OutgoingMessageStatus = "delivered" | "read";

interface OutgoingMessage extends BaseMessage {
   type: "outgoing";
   statusMessage: OutgoingMessageStatus;
}

type SenderType = "user" | "group" | "supergroup" | "channel" | "bot";

interface IncomingMessage extends BaseMessage {
   type: "incoming";
   senderName: string;
   senderType: SenderType;
   senderContactName: string;
}

export type Message = OutgoingMessage | IncomingMessage;
