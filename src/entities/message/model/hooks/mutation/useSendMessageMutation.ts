import { useApiKeys } from "@/shared/model/apiKeys";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { messagesService } from "../../../api/messages.service";
import type { Message, MessagesQueryPage, OutgoingLoadingMessage } from "../../types";
import { v4 as uuidv4 } from "uuid";
import {
   chatInfinityMessagesQueryKey,
   pushNewMessageToInfinityCache,
   updateMessageInInfinityCache,
} from "../../helpers/query";

interface SendMessageParams {
   chatId: string;
   message: string;
}

export function useSendMessageMutation() {
   const apiKeys = useApiKeys();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ chatId, message }: SendMessageParams) =>
         messagesService.sendChatMessage({ chatId, message, ...apiKeys }),
      onMutate: async ({ chatId, message }) => {
         await queryClient.cancelQueries({ queryKey: chatInfinityMessagesQueryKey(chatId) });

         const previousData = queryClient.getQueryData<InfiniteData<MessagesQueryPage, number>>(
            chatInfinityMessagesQueryKey(chatId)
         );

         const tempId = uuidv4();

         const messageObject: OutgoingLoadingMessage = {
            type: "outgoing",
            statusMessage: "loading",
            idMessage: tempId,
            timestamp: new Date().getTime(),
            sendByApi: false,
            typeMessage: "textMessage",
            chatId,
            chatType: "user",
            isForwarded: false,
            forwardingScore: 0,
            textMessage: message,
         };

         pushNewMessageToInfinityCache({ queryClient, chatId, messageObject });

         return { previousData, tempId };
      },
      onError(_err, { chatId }, context) {
         if (context?.previousData) {
            queryClient.setQueryData<InfiniteData<MessagesQueryPage, number>>(
               chatInfinityMessagesQueryKey(chatId),
               context.previousData
            );
         }
      },
      onSettled: async (response, _err, { chatId }, context) => {
         if (!response) return;
         if (!context) return;

         const { idMessage } = response;
         const { tempId } = context;

         const updateCb = (message: Message) =>
            message.idMessage === tempId ? { ...message, idMessage } : message;

         updateMessageInInfinityCache({ chatId, queryClient, cb: updateCb });
      },
   });
}
