import { httpService, type DefaultRequestParams, type DefaultURLParams } from "@/shared/api";
import type { Message } from "../model/types";

const messagesEndPoints = {
   getChatMessages: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
   sendChatMessage: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
};

export interface GetChatMessagesParams extends DefaultRequestParams {
   chatId: string;
   count?: number;
}

interface SendChatMessageParams extends DefaultRequestParams {
   chatId: string;
   message: string;
}

export const messagesService = {
   getChatMessages: async ({
      keys: { apiTokenInstance, idInstance },
      chatId,
      count,
      signal,
   }: GetChatMessagesParams) => {
      const response = await httpService.post<Message[]>(
         messagesEndPoints.getChatMessages({ apiTokenInstance, idInstance }),
         { chatId, count },
         { signal }
      );

      return response.data;
   },
   sendChatMessage: async ({
      keys: { apiTokenInstance, idInstance },
      chatId,
      message,
      signal,
   }: SendChatMessageParams) => {
      const response = await httpService.post<{ idMessage: string }>(
         messagesEndPoints.sendChatMessage({ apiTokenInstance, idInstance }),
         {
            chatId,
            message,
         },
         { signal }
      );

      return response.data;
   },
};
