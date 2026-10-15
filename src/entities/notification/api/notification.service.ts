import { httpService, type DefaultRequestParams, type DefaultURLParams } from "@/shared/api";
import type { Notification } from "../model/types";

const endPoints = {
   receiveNotifications: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
   deleteNotifications: ({ apiTokenInstance, idInstance, receiptId }: DeleteNotificationsURLParams) =>
      `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
};

interface ReceiveNotificationsParams extends DefaultRequestParams {
   receiveTimeout?: number;
}
interface ReceiveNotificationsResponse {
   receiptId: string;
   body: Notification;
}

interface DeleteNotificationsParams extends DefaultRequestParams {
   receiptId: number;
}
interface DeleteNotificationsURLParams extends DefaultURLParams {
   receiptId: number;
}

interface DeleteNotificationsResponse {
   result: boolean;
   reason: string;
}

export const notificationService = {
   receiveNotification: async ({
      keys: { apiTokenInstance, idInstance },
      signal,
      receiveTimeout,
   }: ReceiveNotificationsParams) => {
      const response = await httpService.get<ReceiveNotificationsResponse | null>(
         endPoints.receiveNotifications({ apiTokenInstance, idInstance }),
         {
            params: {
               receiveTimeout,
            },
            signal,
         }
      );

      return response.data;
   },
   deleteNotification: async ({
      keys: { apiTokenInstance, idInstance },
      signal,
      receiptId,
   }: DeleteNotificationsParams) => {
      const response = await httpService.delete<DeleteNotificationsResponse>(
         endPoints.deleteNotifications({ apiTokenInstance, idInstance, receiptId }),
         { signal }
      );

      return response.data;
   },
};
