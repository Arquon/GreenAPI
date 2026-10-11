import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Contact } from "../model/types";

const endPoints = {
   getContactInfo: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
   getAvatarUrl: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waIntance${idInstance}/getAvatar/${apiTokenInstance}`,
};

interface GetContactInfoParams extends DefaultRequestParams {
   chatId: string;
}

interface GetChatAvatarParams extends DefaultRequestParams {
   chatId: string;
}

export const contactService = {
   getContactInfo: async ({ apiTokenInstance, idInstance, chatId }: GetContactInfoParams) => {
      const response = await httpService.post<Contact>(
         endPoints.getContactInfo({ apiTokenInstance, idInstance }),
         {
            chatId,
         }
      );

      return response.data;
   },
   getAvatarUrl: async ({ apiTokenInstance, idInstance, chatId }: GetChatAvatarParams) => {
      const response = await httpService.post<{ urlAvatar: string }>(
         endPoints.getAvatarUrl({ apiTokenInstance, idInstance }),
         {
            chatId,
         }
      );

      return response.data;
   },
};
