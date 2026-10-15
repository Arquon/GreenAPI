import { httpService, type DefaultRequestParams, type DefaultURLParams } from "@/shared/api";
import type { Contact } from "../model/types";

const endPoints = {
   getContactInfo: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
   getAvatarUrl: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
};

interface GetContactInfoParams extends DefaultRequestParams {
   chatId: string;
}

interface GetChatAvatarParams extends DefaultRequestParams {
   chatId: string;
}

export const contactService = {
   getContactInfo: async ({
      keys: { apiTokenInstance, idInstance },
      chatId,
      signal,
   }: GetContactInfoParams) => {
      const response = await httpService.post<Contact>(
         endPoints.getContactInfo({ apiTokenInstance, idInstance }),
         {
            chatId,
         },
         {
            signal,
         }
      );

      return response.data;
   },
   getAvatarUrl: async ({ keys: { apiTokenInstance, idInstance }, chatId, signal }: GetChatAvatarParams) => {
      const response = await httpService.post<{ urlAvatar: string }>(
         endPoints.getAvatarUrl({ apiTokenInstance, idInstance }),
         {
            chatId,
         },
         {
            signal,
         }
      );

      return response.data;
   },
};
