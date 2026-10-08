import { createBrowserRouter, type RouteObject } from "react-router";
import { App } from "../App";
import { MainPage } from "@/pages/main";
import { ChatLayout } from "../layout/ChatLayout";
import { appRoutes } from "@/shared/config";
import { ChatPage } from "@/pages/chat";

const routes: RouteObject[] = [
   {
      element: <App />,
      children: [
         {
            element: <ChatLayout />,
            path: appRoutes.mainPage,
            children: [
               {
                  index: true,
                  element: <MainPage />,
               },
               {
                  path: appRoutes.chat,
                  element: <ChatPage />,
               },
            ],
         },
      ],
   },
];

export const appRouter = createBrowserRouter(routes);
