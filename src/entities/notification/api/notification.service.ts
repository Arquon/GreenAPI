import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Notification } from "../model/types";

const endPoints = {
   receiveNotifications: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
   deleteNotifications: ({ apiTokenInstance, idInstance, receiptId }: DeleteNotificationsParams) =>
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

interface DeleteNotificationsResponse {
   result: boolean;
   reason: string;
}

export const notificationService = {
   receiveNotification: async ({
      apiTokenInstance,
      idInstance,
      receiveTimeout,
   }: ReceiveNotificationsParams) => {
      const response = await httpService.get<ReceiveNotificationsResponse | null>(
         endPoints.receiveNotifications({ apiTokenInstance, idInstance }),
         {
            params: {
               receiveTimeout,
            },
         }
      );

      return response.data;
   },
   deleteNotification: async ({ apiTokenInstance, idInstance, receiptId }: DeleteNotificationsParams) => {
      const response = await httpService.delete<DeleteNotificationsResponse>(
         endPoints.deleteNotifications({ apiTokenInstance, idInstance, receiptId })
      );

      return response.data;
   },
};
