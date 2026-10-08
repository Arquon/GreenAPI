import type { ChatType } from "@/entities/chat/@x/contact";

export interface Contact {
   avatar: string;
   name: string;
   contactName: string;
   chatId: string;
   chatType: ChatType;
   lastSeen: number;
   phoneNumber: number;
   username: string;
   isPremium: boolean;
   isVerified: boolean;
   isScam: boolean;
   description: string;
}
