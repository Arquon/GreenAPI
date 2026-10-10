import { useContactInfoQuery } from "@/entities/contact/@x/chat";
import { useInfiniteChatMessagesQuery } from "@/entities/message/@x/chat";

interface useCurrentChatQueryQueryParams {
   chatId: string;
}

export function useCurrentChatQuery({ chatId }: useCurrentChatQueryQueryParams) {
   const contactQuery = useContactInfoQuery({ chatId });

   const messagesQuery = useInfiniteChatMessagesQuery({ chatId });

   return [contactQuery, messagesQuery] as const;
}
