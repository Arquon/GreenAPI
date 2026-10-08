import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Chat } from "../model/types";

interface GetChatsListParams extends DefaultRequestParams {}
interface GetChatAvatarParams extends DefaultRequestParams {
   chatId: string;
}

interface ChatEndpoints {
   getChatsList: (args: DefaultRequestParams) => string;
   getChatAvatarUrl: (args: DefaultRequestParams) => string;
}

const endPoints: ChatEndpoints = {
   getChatsList: ({ apiTokenInstance, idInstance }) =>
      `/waInstance${idInstance}/getChats/${apiTokenInstance}`,
   getChatAvatarUrl: ({ apiTokenInstance, idInstance }) =>
      `/waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
};

export const chatService = {
   getChatsList: async ({ apiTokenInstance, idInstance }: GetChatsListParams) => {
      const response = await httpService.get<Chat[]>(
         endPoints.getChatsList({ apiTokenInstance, idInstance })
      );

      return response.data;
   },
   getChatAvatar: async ({ apiTokenInstance, idInstance, chatId }: GetChatAvatarParams) => {
      const response = await httpService.post<{ urlAvatar: string }>(
         endPoints.getChatAvatarUrl({ apiTokenInstance, idInstance }),
         {
            chatId,
         }
      );

      return response.data;
   },
};
